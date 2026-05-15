# -*- coding: utf-8 -*-
"""
QA 더미 데이터 일괄 생성기.

qa-script-templates.json 을 단일 소스로 삼아
  - assets/dummy-data/evaluations.json
  - assets/dummy-data/manual-evaluations.json
  - assets/dummy-data/dashboard-stats.json
세 파일을 정합성 있게 재생성하고, all-data.js 의 인라인 블록과
pages/agent/my-evaluations.html 의 하드코딩된 allEvals 블록도 동기화한다.

페이지 코드(레이아웃·필터·모달 동작)는 일절 수정하지 않는다.
"""
from __future__ import annotations

import json
import random
import re
from collections import Counter, defaultdict
from pathlib import Path
from typing import Any

# ---------------------------------------------------------------------------
# 경로 정의
# ---------------------------------------------------------------------------
ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "assets" / "dummy-data"

TEMPLATES_PATH = DATA_DIR / "qa-script-templates.json"
USERS_PATH = DATA_DIR / "users.json"
CENTERS_PATH = DATA_DIR / "centers.json"
FORMS_PATH = DATA_DIR / "evaluation-forms.json"
ITEMS_PATH = DATA_DIR / "evaluation-items.json"

EVALUATIONS_PATH = DATA_DIR / "evaluations.json"
MANUAL_EVAL_PATH = DATA_DIR / "manual-evaluations.json"
DASHBOARD_PATH = DATA_DIR / "dashboard-stats.json"

ALL_DATA_PATH = DATA_DIR / "all-data.js"
MY_EVALS_HTML = ROOT / "pages" / "agent" / "my-evaluations.html"

# ---------------------------------------------------------------------------
# 시드 고정 (재실행 시 동일 결과)
# ---------------------------------------------------------------------------
random.seed(20260515)

# ---------------------------------------------------------------------------
# 시나리오 가중치 (전체 자동평가 ~80건 기준)
# ---------------------------------------------------------------------------
AUTO_DISTRIBUTION = [
    ("qa-01-account-open-ok", 240),
    ("qa-02-account-open-privacy-miss", 120),
    ("qa-03-minor-account", 90),
    ("qa-04-fund-recommend-ok", 180),
    ("qa-05-fund-unsuitable", 60),
    ("qa-06-els-explanation-ok", 150),
    ("qa-07-els-explanation-miss", 90),
    ("qa-08-credit-trade-risk", 150),
    ("qa-09-suitability-redo", 180),
    ("qa-10-elder-protection", 120),
    ("qa-11-overseas-stock", 210),
    ("qa-12-hts-install", 240),
    ("qa-13-system-claim", 120),
    ("qa-14-fss-complaint", 90),
    ("qa-15-happy-call", 210),
    ("qa-16-vip-portfolio", 120),
    ("qa-17-profanity-fail", 30),
]

MANUAL_DISTRIBUTION = [
    ("qa-18-newbie", 90),
    ("qa-07-els-explanation-miss", 45),
    ("qa-02-account-open-privacy-miss", 45),
    ("qa-13-system-claim", 30),
    ("qa-15-happy-call", 60),
    ("qa-16-vip-portfolio", 45),
    ("qa-14-fss-complaint", 30),
    ("qa-08-credit-trade-risk", 45),
]

# ---------------------------------------------------------------------------
# 가상 추가 상담사 명단 (users.json 외 더미 — 시연용 다양성 확보)
# ---------------------------------------------------------------------------
EXTRA_AGENTS = {
    # team_id : [(agent_name, agent_id), ...]
    "team-vip": [("김유진", "agent101"), ("서태원", "agent102")],
    "team-general": [
        ("이도현", "agent201"), ("박서연", "agent202"),
        ("정하늘", "agent203"), ("한지석", "agent204"),
    ],
    "team-tech": [
        ("오민재", "agent301"), ("배지훈", "agent302"),
        ("황현지", "agent303"),
    ],
    "team-general2": [
        ("임수경", "agent401"), ("조성훈", "agent402"),
        ("문가영", "agent403"),
    ],
    "team-happycall": [("백시영", "agent501"), ("권나윤", "agent502")],
    "team-cs": [
        ("남궁준", "agent601"), ("류재훈", "agent602"),
        ("표지원", "agent603"),
    ],
    "team-ob": [("도현철", "agent701"), ("선우민", "agent702")],
}

# ---------------------------------------------------------------------------
# 헬퍼
# ---------------------------------------------------------------------------
def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, payload: Any) -> None:
    path.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )


def add_seconds(start: int, delta: int) -> tuple[int, str]:
    new = start + delta
    return new, f"{new // 60}:{new % 60:02d}"


def random_time_in_business_hours() -> str:
    hour = random.randint(9, 17)
    minute = random.choice([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55])
    return f"{hour:02d}:{minute:02d}"


def pick_recent_date() -> str:
    # 2025-01-15 ~ 2025-01-27 분포
    day = random.randint(15, 27)
    return f"2025-01-{day:02d}"


# ---------------------------------------------------------------------------
# 상담사 풀 구성 (users.json + EXTRA_AGENTS + centers.json agent_count 까지 자동 충원)
# ---------------------------------------------------------------------------
# 가짜 상담사 이름 풀 (시연용 — 81명 충원 대비)
_FILLER_SURNAMES = [
    "김", "이", "박", "최", "정", "강", "조", "윤", "장", "임",
    "한", "오", "서", "신", "권", "황", "안", "송", "유", "전",
]
_FILLER_GIVEN = [
    "민서", "지호", "서연", "예준", "하윤", "도윤", "지유", "시우", "수아", "은우",
    "지안", "건우", "윤서", "현우", "다은", "준서", "서윤", "지환", "예린", "민준",
    "서아", "재윤", "유나", "주원", "지원", "선우", "민재", "다현", "태윤", "서현",
    "동현", "가은", "성민", "지수", "현서", "수빈", "지율", "도현", "예나", "재훈",
]

# 센터 prefix 매핑 (사번 자동 부여용)
_CENTER_PREFIX = {
    "ct-seoul": "S-1",
    "ct-busan": "S-2",
    "ct-daegu": "S-3",
}


def _gen_filler_name(idx: int) -> str:
    """seed 고정된 random 환경에서 결정론적으로 이름 생성."""
    return _FILLER_SURNAMES[idx % len(_FILLER_SURNAMES)] + _FILLER_GIVEN[idx // len(_FILLER_SURNAMES) % len(_FILLER_GIVEN)]


def build_agent_pool(users: list[dict], centers: list[dict]) -> dict[str, list[dict]]:
    """team_id 별 상담사 목록 반환. centers.json agent_count 만큼 자동 충원하여 정합성 확보."""
    team_to_center = {}
    for c in centers:
        for t in c["teams"]:
            team_to_center[t["id"]] = {
                "center": c["name"],
                "center_id": c["id"],
                "team": t["name"],
                "agent_count": t["agent_count"],
            }
    pool: dict[str, list[dict]] = defaultdict(list)
    used_names: set[str] = set()

    # 1) users.json AGENT 등록 + employee_id 박기 (team_id 기준 일련번호)
    for u in users:
        if u.get("role") != "AGENT":
            continue
        tid = u["team_id"]
        meta = team_to_center.get(tid, {})
        seq = len(pool[tid]) + 1
        emp_id = f"{_CENTER_PREFIX.get(meta.get('center_id'), 'S-X')}{tid_seq(tid)}{seq:02d}"
        pool[tid].append({
            "agent_id": u["id"],
            "agent_name": u["name"],
            "employee_id": emp_id,
            "team_id": tid,
            "team": u["team"],
            "center": meta.get("center", u.get("center", "")),
            "center_id": meta.get("center_id", u.get("center_id", "")),
        })
        used_names.add(u["name"])

    # 2) EXTRA_AGENTS 추가 (사용자 정의 가짜 상담사)
    for tid, extras in EXTRA_AGENTS.items():
        meta = team_to_center.get(tid, {})
        for name, aid in extras:
            seq = len(pool[tid]) + 1
            emp_id = f"{_CENTER_PREFIX.get(meta.get('center_id'), 'S-X')}{tid_seq(tid)}{seq:02d}"
            pool[tid].append({
                "agent_id": aid,
                "agent_name": name,
                "employee_id": emp_id,
                "team_id": tid,
                "team": meta.get("team", ""),
                "center": meta.get("center", ""),
                "center_id": meta.get("center_id", ""),
            })
            used_names.add(name)

    # 3) centers.json agent_count 까지 자동 충원 (시연 풍부도 확보)
    filler_global_idx = 0
    for tid, meta in team_to_center.items():
        target = meta["agent_count"]
        while len(pool[tid]) < target:
            # 결정론적 이름 생성 (중복 방지)
            attempt = 0
            while True:
                nm = _gen_filler_name(filler_global_idx + attempt)
                if nm not in used_names:
                    break
                attempt += 1
                if attempt > 800:  # 안전 가드
                    nm = nm + str(filler_global_idx)
                    break
            filler_global_idx += attempt + 1
            used_names.add(nm)
            seq = len(pool[tid]) + 1
            aid = f"agent{tid_seq(tid)}{seq:02d}f"  # f = filler
            emp_id = f"{_CENTER_PREFIX.get(meta.get('center_id'), 'S-X')}{tid_seq(tid)}{seq:02d}"
            pool[tid].append({
                "agent_id": aid,
                "agent_name": nm,
                "employee_id": emp_id,
                "team_id": tid,
                "team": meta.get("team", ""),
                "center": meta.get("center", ""),
                "center_id": meta.get("center_id", ""),
            })
    return pool


# 팀별 사번/agent_id seq 번호 prefix (팀마다 unique 해야 ID 충돌 없음)
_TEAM_SEQ = {
    "team-vip": "0",        # 서울/VIP고객팀     → S-10xx
    "team-general": "1",    # 서울/주식상담팀     → S-11xx
    "team-tech": "2",       # 서울/HTS기술지원팀  → S-12xx
    "team-general2": "3",   # 부산/펀드상담팀     → S-23xx
    "team-happycall": "4",  # 부산/해피콜팀       → S-24xx
    "team-cs": "5",         # 대구/CS상담팀       → S-35xx
    "team-ob": "6",         # 대구/아웃바운드팀   → S-36xx
}


def tid_seq(tid: str) -> str:
    return _TEAM_SEQ.get(tid, "9")


# ---------------------------------------------------------------------------
# 시나리오 → 가용 팀 매핑
# ---------------------------------------------------------------------------
SCENARIO_TEAM_PREF = {
    "form-ib-vip": ["team-vip"],
    "form-ib-general": [
        "team-general", "team-tech", "team-general2", "team-cs",
    ],
    # OB 시나리오: 전담 OB 팀(가중치 3배) + 일반 상담팀 보조(2배) + VIP/기술팀 일부(1배) — 모든 팀에 OB 분포 보장
    "form-ob-tele": [
        "team-happycall", "team-happycall", "team-happycall",  # 부산 전담
        "team-ob", "team-ob", "team-ob",                       # 대구 전담
        "team-general", "team-general",                         # 서울 보조
        "team-general2", "team-general2",                       # 부산 보조
        "team-cs", "team-cs",                                   # 대구 보조
        "team-vip",                                             # 서울 VIP follow-up 콜
        "team-tech",                                            # 서울 기술팀 보조
    ],
}

# 특정 카테고리는 팀 편향 강화
CATEGORY_TEAM_BIAS = {
    "기술지원": ["team-tech"],
    # FAIL은 모든 팀에 발생 가능 — 일부 팀에만 쏠리지 않도록 전팀 포함
    "FAIL": ["team-tech", "team-general", "team-vip", "team-general2", "team-happycall", "team-cs", "team-ob"],
    "신입": ["team-vip", "team-general"],
    "민원": ["team-vip", "team-general"],
    # 모든 팀에 OB·기타 카테고리 데이터 최소 분포 보장 — 전담 팀 + 보조 팀 1~2개
    "해피콜": ["team-happycall", "team-ob", "team-cs", "team-tech"],
    "적합성진단": ["team-general", "team-general2", "team-tech", "team-cs"],
    "설명의무": ["team-vip", "team-general", "team-tech"],
    "상품권유": ["team-vip", "team-general2", "team-happycall", "team-cs", "team-tech"],
}


def pick_team_for_template(template: dict) -> str:
    form_id = template["target_form"]
    teams = SCENARIO_TEAM_PREF.get(form_id, ["team-general"]).copy()
    bias = CATEGORY_TEAM_BIAS.get(template["category"], [])
    # FAIL은 form 제약을 무시하고 bias 팀 전체에 분배 (모든 팀에 FAIL 데이터 분포 보장)
    if template["category"] == "FAIL" and bias:
        return random.choice(bias)
    if bias:
        candidates = [t for t in teams if t in bias] or teams
    else:
        candidates = teams
    return random.choice(candidates)


# ---------------------------------------------------------------------------
# 점수 분배 (시나리오 → 평가표 항목별 점수 + 사유 + evidence)
# ---------------------------------------------------------------------------
EVIDENCE_TEMPLATES = {
    "first-greeting": {
        "pass": "발화 0:01~0:03 구간에서 '안녕하세요', 'ECS증권', '{team}', '{agent}' 키워드 모두 탐지",
        "fail": "도입부 발화에 'ECS증권' 회사명이 누락되거나 호명 형식이 표준 스크립트와 불일치",
    },
    "last-greeting": {
        "pass": "통화 종료 직전 '감사합니다', '좋은 하루' 등 마무리 인사 키워드 탐지",
        "fail": "마무리 인사 없이 통화 종료, '네 끊을게요' 등 비격식 종결 감지",
    },
    "required-privacy": {
        "pass": "성함·생년월일·본인 여부 3개 항목 모두 발화 0:30 이내 확인 완료",
        "fail": "성함 또는 생년월일 확인 누락, 본인 확인 절차 1개 이하 수행",
    },
    "profanity": {
        "pass": "금지어 사전 매칭 결과 0건",
        "fail": "금지어 1회 이상 탐지 — 전체 점수 0점 처리",
    },
    "professional-speech": {
        "pass": "비언어 발화('어', '음', '아') 5회 미만, 비전문적 호응 3회 미만",
        "warn": "비언어 발화 5~7회 또는 비전문적 호응 3회 이상",
        "fail": "비언어 발화 8회 이상 + 비전문적 호응 빈발",
    },
    "speed": {
        "pass": "고객 발화 종료 후 평균 응답 지연 0.6초",
        "warn": "응답 지연 1~3초 구간 2회 이상 탐지",
        "fail": "응답 지연 3초 초과 구간 1회 이상 탐지",
    },
    "pos-neg-empathy": {
        "pass": "고객 불만 발화 직후 '죄송합니다', '걱정되셨겠습니다' 등 공감 표현 즉시 탐지",
        "warn": "공감 표현은 있으나 단답형('네') 또는 형식적",
        "fail": "고객 부정 감정 표현에 공감 발화 미탐지",
    },
    "problem-solve": {
        "pass": "고객 의도 모두 인지 후 구체적 안내·대안 제시 (수치/절차/시한 포함)",
        "warn": "고객 의도 인지했으나 구체 안내 부족, 일반론으로 응대",
        "fail": "고객 핵심 문의에 대한 안내 미제공, '상품설명서 참조' 등 회피",
    },
    "easy-explanation": {
        "pass": "내부용어 사용 2회 이하, 고객 재질의 0회",
        "warn": "내부용어 사용 3회 이상 또는 고객 재질의 1회",
        "fail": "내부용어 빈발, 고객 재질의 2회 이상",
    },
    "active-response": {
        "pass": "고객 요청에 적극 대응, 대안 제시 또는 추가 안내 포함",
        "warn": "기본 응대는 진행했으나 규정 외/예외적/셀프 표현 1~2회",
        "fail": "'규정상 불가' 류 답변 3회 이상, 대안 미제시",
    },
    "tone": {
        "pass": "전체 톤 정중, 불편 어조 미탐지",
        "warn": "불편 어조 1~2회 탐지",
        "fail": "불편 어조 3회 이상, '짜증', '그만 좀' 등 부정 표현",
    },
    "customer-discomfort": {
        "pass": "고객 불편 표현에 즉시 공감·사과 멘트 발화",
        "warn": "공감 표현 단답형 또는 지연 발화",
        "fail": "고객 불편 표현 무시 또는 회피",
    },
    "customer-greeting-reply": {
        "pass": "고객 인사에 대해 화답 표현 즉시 발화",
        "warn": "화답 표현 단답형('네')",
        "fail": "고객 인사에 무응답",
    },
    "simultaneous-speech": {
        "pass": "동시 발화 0회 또는 발생 시 즉시 양보·사과",
        "warn": "동시 발화 1회 발생 후 일시 멈춤",
        "fail": "동시 발화 후 상담사 발화 지속(덮어씀)",
    },
    "no-acknowledge": {
        "pass": "15초 이상 무응답 0회 또는 양해 멘트 3개 이상",
        "warn": "15초 이상 무응답 발생 시 양해 멘트 1개 이하",
        "fail": "15초 이상 무응답 + 양해 멘트 없음",
    },
    "interruption": {
        "pass": "고객 발화 중 개입 0회",
        "fail": "고객 발화 중 개입으로 5초 이상 발화 중단 1회 이상",
    },
    "customer-focus": {
        "pass": "무시/무관심 발화 미탐지",
        "fail": "'됐고요', '그래서요?' 등 무시 표현 1회 이상",
    },
    "speech-ending": {
        "pass": "공손한 종결 어미(~습니다, ~세요) 사용",
        "fail": "비격식 발화(~해, ~거든) 3회 이상",
    },
    "proactiveness": {
        "pass": "회피/추측 발화 미탐지",
        "fail": "회피/추측성 발화 1회 이상",
    },
    "convenience": {
        "pass": "고객 정보 재질의 0회",
        "fail": "이름/연락처 중복 질의 1회 이상",
    },
}

REASON_TEMPLATES = {
    "first-greeting": {
        "fail": "도입부 'ECS증권' 회사명 누락. 표준 스크립트 미준수로 첫인사 항목 감점 처리",
    },
    "professional-speech": {
        "warn": "12초·47초 구간 '어…음…' 비언어 발화 다수, 직후 고객 재질의 발생 → 전문성 저하로 경미 감점",
        "fail": "비언어 발화 8회 이상 + 비전문적 호응 빈발로 전문성 결여 판정",
    },
    "speed": {
        "warn": "고객 발화 종료 후 응답 지연 평균 2.3초, 3구간에서 3초 초과 발생",
    },
    "pos-neg-empathy": {
        "warn": "고객 부정 감정 표현에 단답형('네')으로만 응대, 공감 표현 부족",
        "fail": "고객 강한 불만에도 공감 발화 전혀 없음, 즉시 사실 확인으로만 진행",
    },
    "problem-solve": {
        "warn": "고객 핵심 질문(원금손실 비율 등)에 대해 '상품설명서 참조' 답변, 구체 안내 부족",
        "fail": "고객 의도 인지 부족, 구체적 해결 안내 미제공",
    },
    "easy-explanation": {
        "warn": "ELS·녹인·기초자산 등 내부용어 다수 사용, 고객 재질의 1회 발생",
    },
    "active-response": {
        "warn": "'규정상 어렵습니다' 표현 사용, 대안 안내 부족",
        "fail": "'규정상 불가' 표현 3회 이상, 대안 미제시로 적극성 결여",
    },
    "required-privacy": {
        "fail": "본인 확인 절차 중 성함만 확인, 생년월일 미확인으로 개인정보 확인 절차 위반",
    },
    "profanity": {
        "fail": "'짜증나니까' 표현 탐지 (5:14 구간), 금지어 사전 매칭. 전 항목 0점 자동 처리",
    },
    "customer-discomfort": {
        "fail": "고객의 강한 불만 표출에도 사과·공감 멘트 없이 사실 확인만 진행",
    },
    "tone": {
        "fail": "'짜증', '그만 좀' 등 부정 어조 발화 다수, 어조 항목 미달 판정",
    },
}


def expand_evidence(text: str, *, team: str, agent: str) -> str:
    return text.replace("{team}", team).replace("{agent}", agent)


def make_full_score_block(form: dict, template: dict, agent_info: dict) -> tuple[dict, int, list[str], list[str]]:
    """평가표(I/B 일반/VIP, O/B) 의 모든 item_id 에 대해 점수·사유·evidence 채움.

    전략: 먼저 목표 총점을 시나리오 범위 내에서 추첨하고, 각 항목에 비례 분배.
    명시 감점 항목은 0점/절반 점수로 강제, 나머지 정상 항목에서 나머지 점수를 분배.

    반환: (scores_dict, total_score, fail_items_list, issues_list)
    """
    fail_flags = set(template["fail_flags"])
    is_profanity_fail = "profanity" in fail_flags
    issues: list[str] = []
    fail_items: list[str] = []

    # 평가표의 모든 item 수집 (sections + fail_rule)
    all_items: list[dict] = []
    for section in form["sections"]:
        for item in section["items"]:
            all_items.append(item)
    # 평가표의 fail_rule(욕설) 도 항상 점수 객체에 포함 (max=0)
    fail_rule_item = form.get("fail_rule")
    if fail_rule_item:
        all_items.append({
            "item_id": fail_rule_item["item_id"],
            "name": fail_rule_item["name"],
            "score": 0,
            "type": "NLP",
        })

    scores: dict[str, dict] = {}

    # 2) 정상/감점/FAIL 시나리오: 항목별 실 평가 + profanity 항목만 FAIL 처리
    # FAIL 콜이라도 첫인사·공감 등 실제 응대 잘한 항목은 정상 점수로 표시해
    # 항목별 점수가 실제 통화 내용과 일치하도록 한다. profanity 항목만 별도 0점/FAIL.
    lo, hi = template["expected_score_range"]
    target_total = random.randint(lo, hi)
    max_total = sum(it["score"] for it in all_items)
    ratio = target_total / max_total if max_total else 1.0

    # FAIL(욕설) 시나리오에서 transcript 흐름상 "잘한 항목 / 못한 항목"을 명시.
    # 일률적 비례 분배 대신 시나리오 의도에 맞게 항목별 차등 분배해 실 응대 품질을 반영한다.
    PROFANITY_GOOD_ITEMS = {
        "first-greeting",            # "안녕하세요, ECS증권 ... 정민호입니다." 정상
        "last-greeting",             # 다음 상담사 이관 멘트로 마무리
        "customer-greeting-reply",
        "customer-discomfort",       # "불편을 드려 죄송합니다."
        "required-privacy",          # 형식적이지만 본인 확인 시도
        "simultaneous-speech",
        "interruption",
        "convenience",
    }
    PROFANITY_POOR_ITEMS = {
        "professional-speech",       # 짜증 표현 발화
        "speech-ending",             # 비격식 발화
        "customer-focus",            # 무관심 표현
        "tone",                      # 불편 어조
        "pos-neg-empathy",           # 후반 공감 부족
        "proactiveness",             # 회피
        "active-response",           # 대안 미제시
        "problem-solve",             # 해결 미흡
        "easy-explanation",
        "speed",
        "no-acknowledge",
    }

    # 항목별 기본 점수 계산
    raw_scores: dict[str, int] = {}
    for item in all_items:
        iid = item["item_id"]
        max_score = item["score"]
        if iid == "profanity":
            # 욕설/금지어는 항상 0점 — FAIL 시나리오 여부와 무관 (탐지 시 별도 is_fail 처리)
            raw_scores[iid] = 0
        elif is_profanity_fail:
            # FAIL 시나리오: 시나리오 의도대로 잘한/못한 항목 차등 분배
            if iid in PROFANITY_GOOD_ITEMS:
                # 만점 또는 만점-1 (실제로 잘 한 항목)
                raw_scores[iid] = max(max_score - random.choice([0, 0, 0, 1]), 0)
            elif iid in PROFANITY_POOR_ITEMS:
                # 절반 이하 (감점 항목)
                raw_scores[iid] = max(0, round(max_score * random.choice([0.3, 0.4, 0.4, 0.5])))
            else:
                raw_scores[iid] = max(0, round(max_score * 0.6))
        elif iid in fail_flags:
            # 명시 감점 항목: 0점 또는 절반
            if iid in ("first-greeting", "required-privacy"):
                raw_scores[iid] = 0
            else:
                raw_scores[iid] = max(0, max_score // 2)
        elif max_score == 0:
            raw_scores[iid] = 0
        else:
            # 비례 분배 후 ±1 변동
            base = round(max_score * ratio)
            jitter = random.choice([-1, 0, 0, 0, 1]) if max_score >= 5 else 0
            raw_scores[iid] = max(0, min(max_score, base + jitter))

    # 총점 보정 (목표와 ±2 이상 차이날 경우)
    # FAIL 시나리오는 항목별 차등 분배를 우선해 보정을 건너뜀
    current = sum(raw_scores.values())
    diff = 0 if is_profanity_fail else (target_total - current)
    if diff != 0:
        # 정상 항목 중에서 ±1씩 조정
        normal_keys = [k for k in raw_scores if k not in fail_flags and raw_scores[k] != 0 or (raw_scores[k] == 0 and k not in fail_flags)]
        # max_score 0 인 fail_rule 항목 제외
        item_max = {it["item_id"]: it["score"] for it in all_items}
        normal_keys = [k for k in normal_keys if item_max[k] > 0 and k not in fail_flags]
        random.shuffle(normal_keys)
        idx = 0
        guard = 0
        while diff != 0 and guard < 200:
            guard += 1
            k = normal_keys[idx % len(normal_keys)] if normal_keys else None
            if not k:
                break
            idx += 1
            if diff > 0 and raw_scores[k] < item_max[k]:
                raw_scores[k] += 1
                diff -= 1
            elif diff < 0 and raw_scores[k] > 0:
                raw_scores[k] -= 1
                diff += 1

    # 점수 객체 구성
    total = 0
    item_max_map = {it["item_id"]: it["score"] for it in all_items}
    item_name_map = {it["item_id"]: it["name"] for it in all_items}
    item_type_map = {it["item_id"]: it["type"] for it in all_items}
    for iid, score in raw_scores.items():
        max_score = item_max_map[iid]
        itype = item_type_map[iid]
        is_fail_item = iid in fail_flags
        if is_fail_item and iid in ("first-greeting", "required-privacy"):
            status = "fail"
            status_key = "fail"
        elif is_fail_item:
            status = "warn"
            status_key = "warn"
        elif max_score == 0:
            status = "pass"
            status_key = "pass"
        elif score == max_score:
            status = "pass"
            status_key = "pass"
        elif score >= max_score * 0.7:
            status = "warn"
            status_key = "warn"
        else:
            status = "fail"
            status_key = "fail"

        evidence_dict = EVIDENCE_TEMPLATES.get(iid, {})
        evidence = evidence_dict.get(status_key) or evidence_dict.get("pass", "")
        evidence = expand_evidence(evidence, team=agent_info["team"], agent=agent_info["agent_name"])

        reason = ""
        if status != "pass" and is_fail_item:
            reason = REASON_TEMPLATES.get(iid, {}).get(status_key, "해당 항목 기준 미달")
            fail_items.append(item_name_map[iid])
            issues.append(f"{item_name_map[iid]}: {reason[:40]}")
        elif status == "warn":
            reason = "기준점 대비 경미한 감점 (1회 탐지)"
            issues.append(f"{item_name_map[iid]}: 기준점 대비 경미한 감점")
        elif status == "fail" and not is_fail_item:
            reason = REASON_TEMPLATES.get(iid, {}).get("fail", "해당 항목 기준 미달")
            fail_items.append(item_name_map[iid])
            issues.append(f"{item_name_map[iid]}: {reason[:40]}")

        score_obj = {
            "score": score,
            "max": max_score,
            "type": itype,
            "status": status,
        }
        if itype == "AI":
            score_obj["confidence"] = random.randint(82, 96) if status == "pass" else random.randint(58, 80)
        if iid == "profanity":
            # 욕설/금지어는 FAIL 시나리오에서만 is_fail=true 로 마킹.
            # 다른 항목은 정상 점수를 유지해 실제 응대 품질이 항목별 점수에 반영되게 한다.
            score_obj["is_fail"] = is_profanity_fail
            score_obj["status"] = "fail" if is_profanity_fail else "pass"
            if is_profanity_fail:
                score_obj["reason"] = REASON_TEMPLATES["profanity"]["fail"]
                score_obj["evidence"] = EVIDENCE_TEMPLATES["profanity"]["fail"]
                if item_name_map[iid] not in fail_items:
                    fail_items.append(item_name_map[iid])
                # 이슈 라벨 (중복 방지)
                fail_label = "욕설/금지어 탐지로 FAIL 처리"
                if fail_label not in issues:
                    issues.append(fail_label)
        elif reason:
            score_obj["reason"] = reason
        if evidence and iid != "profanity":
            score_obj["evidence"] = evidence
        scores[iid] = score_obj
        total += score

    return scores, total, fail_items, issues


# ---------------------------------------------------------------------------
# AI 피드백 생성 (시나리오·점수·감점에 따라 3~5줄)
# ---------------------------------------------------------------------------
FEEDBACK_OPENERS = {
    "high": [
        "전반적으로 매우 우수한 상담입니다.",
        "고객 응대의 모든 영역에서 안정적인 수행이 확인됩니다.",
        "표준 스크립트 준수도와 고객 응대 품질 모두 우수합니다.",
    ],
    "mid": [
        "전반적인 응대는 양호하나 일부 영역에서 개선이 필요합니다.",
        "기본 응대는 적절하나 전문성 표현에 개선 여지가 있습니다.",
        "고객 의도 파악은 정확했으나 일부 표현이 단조롭습니다.",
    ],
    "low": [
        "전반적으로 응대 품질이 기준에 미달하며 즉시 개선이 필요합니다.",
        "핵심 응대 영역에서 다수 미흡 사항이 확인되어 재교육 권장됩니다.",
        "고객 응대의 기본 절차에서 누락이 발견되어 코칭이 필요합니다.",
    ],
    "fail": [
        "본 상담은 금지어 탐지로 FAIL 처리되었으며, 즉시 코칭과 사유 확인이 필요합니다.",
    ],
}

FEEDBACK_CLOSERS = {
    "high": [
        "현재 응대 수준을 유지하시면 우수 사례로 활용 가능합니다.",
        "장기적으로 신입 상담사 멘토링 사례로 공유 추천드립니다.",
        "다음 평가에서도 동일 수준 유지하시면 우수 상담사 표창 대상입니다.",
    ],
    "mid": [
        "다음 평가까지 해당 항목 중점 코칭 진행 권장드립니다.",
        "팀장 1:1 코칭 1회 진행 후 재평가 추천드립니다.",
        "표준 스크립트 재숙지 후 동일 시나리오 재평가 권장됩니다.",
    ],
    "low": [
        "팀장 면담 후 재교육 프로그램 배정이 필요합니다.",
        "이의 제기 절차 안내와 함께 즉시 코칭 실시 권장됩니다.",
        "재평가 일정은 코칭 완료 후 2주 이내로 설정 권장됩니다.",
    ],
    "fail": [
        "금지어 발화 경위 확인 후 시말서 작성 및 보호조치 검토 필요합니다.",
    ],
}


CATEGORY_STRENGTHS = {
    "계좌개설": [
        "본인 확인 절차(성함·생년월일)가 명확히 수행되었고, 비대면 절차 안내가 단계별로 제시되었습니다.",
        "신분증 인식·1원 인증 등 핵심 절차의 순서와 소요 시간을 정확히 안내했습니다.",
    ],
    "상품권유": [
        "투자자 성향 확인 절차가 권유 직전에 수행되어 적합성 원칙이 준수되었습니다.",
        "수익률 안내 시 과거 성과와 미래 보장의 분리 표현이 명확하게 발화되었습니다.",
    ],
    "설명의무": [
        "원금손실 가능성, 중도해지 조건, 기초자산 변동성 등 핵심 고지 항목이 빠짐없이 발화되었습니다.",
        "상품설명서 발송과 추가 검토 권장 안내가 자연스럽게 이어졌습니다.",
    ],
    "적합성진단": [
        "5단계 성향 분류와 가입 가능 상품 범위의 차이를 구체적으로 안내했습니다.",
        "기존 보유 상품과 신규 가입 시 적용 기준의 분리 설명이 명확했습니다.",
    ],
    "거래지원": [
        "환율·세금·결제일 등 거래 부대 요건이 수치와 함께 정확히 안내되었습니다.",
        "야간거래·프리마켓 등 거래 가능 시간대를 구체적으로 발화했습니다.",
    ],
    "기술지원": [
        "오류 메시지를 먼저 확인한 뒤 단계별 해결 절차를 순차적으로 안내했습니다.",
        "공동인증서 경로 문제 등 자주 발생하는 원인에 대한 즉시 해결책이 제공되었습니다.",
    ],
    "민원": [
        "이관 절차와 회신 시한, 민원 접수번호 등 후속 처리에 필요한 정보가 명확히 전달되었습니다.",
        "금감원 분쟁조정 등 외부 절차에 대한 안내가 적절히 병행되었습니다.",
    ],
    "해피콜": [
        "통화 시작 직후 가능 여부 확인과 소요 시간 안내가 정중하게 수행되었습니다.",
        "고객 의견 청취 후 개선 의견 접수와 추천 의향(NPS) 질문이 자연스럽게 진행되었습니다.",
    ],
    "FAIL": [
        "금지어 발화 직전·직후 통화 흐름을 청취하여 발화 경위와 고객 반응을 정확히 확인해야 합니다.",
    ],
    "신입": [
        "표준 스크립트의 도입부 인사·본인 확인 절차 숙지가 우선되어야 합니다.",
        "비격식 종결 어미(~해, ~끊을게요)는 공손 어미(~겠습니다, ~드리겠습니다)로 교정 필요합니다.",
    ],
}

CATEGORY_FOCUS = {
    "계좌개설": "비대면 절차 중 신분증 인식 실패 등 자주 발생하는 페인포인트에 대한 즉시 대안 제시 표현을 표준 스크립트에 반영하면 더 우수해집니다.",
    "상품권유": "권유 직전 적합성 진단 결과의 명시적 확인 발화 빈도를 높이고, 부적합 등급 발견 시 부적합 확인서 절차를 자연스럽게 안내하는 표현을 보완하면 좋습니다.",
    "설명의무": "핵심 고지 항목 5개(원금손실/중도해지/기초자산/예금자보호 미적용/녹취)의 발화 누락 여부를 체크리스트로 자가 점검하는 습관을 권장합니다.",
    "적합성진단": "성향 진단 갱신 안내 후 가입 가능 상품 변화 시뮬레이션을 함께 제시하면 고객 이해도가 향상됩니다.",
    "거래지원": "환율·세금 수치는 영업일 기준 변동성을 함께 언급해 정확성에 대한 신뢰를 높일 수 있습니다.",
    "기술지원": "원격 화면 안내 도구 활용을 권유하거나 영상 가이드 링크를 발송해 재인입을 줄이는 후속 조치를 권장합니다.",
    "민원": "민원 이관과 별개로 1차 응대에서 정서적 공감 표현을 우선 발화하면 고객 불만 수위를 효과적으로 낮출 수 있습니다.",
    "해피콜": "고객 부정 의견 청취 시 즉시 접수와 회신 시한을 함께 안내하면 만족도 향상에 효과적입니다.",
    "FAIL": "금지어 발화 경위 확인 후 시말서 작성, 코칭 의무 이수, 30일 내 재평가 일정 수립이 필요합니다.",
    "신입": "주간 1회 멘토 동석 청취 후 다음 주 동일 시나리오 모의 콜을 진행해 점진적 개선을 도모하는 것을 권장합니다.",
}


def make_feedback(total: int, fail_items: list[str], template: dict) -> str:
    if total == 0:
        bucket = "fail"
    elif total >= 80:
        bucket = "high"
    elif total >= 60:
        bucket = "mid"
    else:
        bucket = "low"

    opener = random.choice(FEEDBACK_OPENERS[bucket])
    closer = random.choice(FEEDBACK_CLOSERS[bucket])
    middle_parts: list[str] = []

    # 강점 1줄 (항상 1개 포함)
    strength_pool = CATEGORY_STRENGTHS.get(template["category"], [
        "응대 톤·속도·구조가 균형 있게 유지되어 시나리오 기준에 부합합니다.",
    ])
    middle_parts.append("강점으로는 " + random.choice(strength_pool))

    # 감점 표현 (해당 시)
    if fail_items:
        middle_parts.append(
            "감점 항목으로 "
            + ", ".join(fail_items[:3])
            + " 등이 확인되어 해당 영역의 표현 보완이 시급합니다."
        )

    # 카테고리별 포커스 코멘트 (항상 1개)
    focus = CATEGORY_FOCUS.get(template["category"])
    if focus:
        if bucket == "high":
            middle_parts.append("개선 포커스: " + focus)
        else:
            middle_parts.append("개선 포커스: " + focus)

    return " ".join([opener] + middle_parts + [closer])


# ---------------------------------------------------------------------------
# transcript 합성
# ---------------------------------------------------------------------------
def build_transcript(template: dict, agent_info: dict, seq: int) -> tuple[list[dict], str]:
    """시나리오의 transcript_blocks 를 실제 시각·치환된 텍스트로 변환.

    각 발화에 5~12초의 무작위 길이를 부여하여 자연스러운 통화 시간 산출.
    """
    transcript = []
    cur = 0
    for block in template["transcript_blocks"]:
        text = block["text"]
        text = text.replace("{team}", agent_info["team"])
        text = text.replace("{agent}", agent_info["agent_name"])
        text = text.replace("{seq}", f"{seq:05d}")
        # 발화 시작 시각
        t = f"{cur // 60}:{cur % 60:02d}"
        transcript.append({
            "speaker": block["speaker"],
            "time": t,
            "text": text,
        })
        # 다음 발화까지 5~12초
        cur += random.randint(5, 12)
    duration = f"{cur // 60}:{cur % 60:02d}"
    return transcript, duration


# ---------------------------------------------------------------------------
# 자동 평가 레코드 1건 생성
# ---------------------------------------------------------------------------
def make_auto_evaluation(
    template: dict,
    form: dict,
    agent_info: dict,
    seq: int,
) -> dict:
    transcript, duration = build_transcript(template, agent_info, seq)
    scores, total, fail_items, issues = make_full_score_block(form, template, agent_info)
    ai_feedback = make_feedback(total, fail_items, template)

    eval_id = f"AE-2025-{seq:05d}"
    date = pick_recent_date()
    call_time = random_time_in_business_hours()

    # 태그: 종목 + 상담유형 분해 + 평가표 단축명 + 카테고리
    consultation_parts = [p.strip() for p in template["consultation_type"].split(">")]
    tags = []
    for prod in template["products"][:2]:
        tags.append(f"종목:{prod}")
    tags.append(f"유형:{consultation_parts[0]}")
    if len(consultation_parts) >= 2:
        tags.append(f"세부:{consultation_parts[1]}")
    tags.append(f"카테고리:{template['category']}")

    confidence = "High" if total >= 80 else ("Medium" if total >= 60 else "Low")

    record = {
        "id": eval_id,
        "agent_id": agent_info["agent_id"],
        "agent_name": agent_info["agent_name"],
        "employee_id": agent_info.get("employee_id", "-"),
        "center": agent_info["center"],
        "center_id": agent_info["center_id"],
        "team": agent_info["team"],
        "team_id": agent_info["team_id"],
        "call_type": template["channel"],
        "date": date,
        "call_time": call_time,
        "duration": duration,
        "total_score": total,
        "max_score": form["total_score"],
        "confidence": confidence,
        "scenario_id": template["id"],
        "scenario_category": template["category"],
        "products": template["products"],
        "tags": tags,
        "scores": scores,
        "fail_items": fail_items,
        "issues": issues,
        "ai_feedback": ai_feedback,
        "transcript": transcript,
        "eval_form": f"{form['name']} {form['version']}",
        "consultation_type": template["consultation_type"],
        "outcome": template["outcome"],
    }
    return record


# ---------------------------------------------------------------------------
# 수동 평가 레코드 1건 생성 (manual-evaluations.json 스키마: 간소화된 item-* 사용)
# ---------------------------------------------------------------------------
MANUAL_PLANS = [
    {
        "plan": "2025년 1분기 신입 상담사 수동 평가",
        "criteria": "근무일수 30일 미만",
        "weight": 0.35,
    },
    {
        "plan": "2025년 2월 품질 샘플링 검증",
        "criteria": "샘플링 10%",
        "weight": 0.30,
    },
    {
        "plan": "2025년 2월 AI 저점수 재평가",
        "criteria": "AI 점수 60점 미만",
        "weight": 0.20,
    },
    {
        "plan": "특정 상담사 집중 모니터링",
        "criteria": "특정 상담사 지정",
        "weight": 0.15,
    },
]


def pick_manual_plan(template: dict) -> dict:
    if template["category"] == "신입":
        return MANUAL_PLANS[0]
    if template["expected_score_range"][1] < 60:
        return MANUAL_PLANS[2]
    weights = [p["weight"] for p in MANUAL_PLANS]
    return random.choices(MANUAL_PLANS, weights=weights, k=1)[0]


MANUAL_ITEM_DEFS = [
    {"id": "item-greeting", "type": "NLP", "max": 10, "label": "인사·도입"},
    {"id": "item-empathy", "type": "AI", "max": 10, "label": "공감·경청"},
    {"id": "item-solution", "type": "AI", "max": 15, "label": "문제 해결"},
    {"id": "item-closing", "type": "NLP", "max": 10, "label": "종결·마무리"},
    {"id": "item-forbidden", "type": "NLP", "max": 10, "label": "금지어"},
]


COACHING_PLANS = [
    "1) 표준 스크립트 재숙지 (1주 내)\n2) 시나리오별 롤플레잉 3회 진행\n3) 재평가 일정: 2주 후",
    "1) 금융 상품 설명 의무 핵심 5개 항목 재교육 이수\n2) ELS·신용거래 시나리오 모의 콜 평가\n3) 멘토 1:1 코칭 주 1회 (4주)",
    "1) 고령투자자 응대 가이드라인 학습\n2) 컴플라이언스 부서 합동 코칭 1회\n3) 재평가 후 결과 본부 보고",
    "1) 공감 표현·고객 감정 응대 워크숍 참여\n2) 민원 응대 시나리오 5건 청취·분석\n3) 1개월 후 재평가",
]


def make_manual_evaluation(
    template: dict,
    form: dict,
    agent_info: dict,
    seq: int,
    auto_total: int,
) -> dict:
    transcript, duration = build_transcript(template, agent_info, seq)
    plan = pick_manual_plan(template)
    is_completed = random.random() < 0.45  # 45% 완료, 55% 대기

    # 간소화된 item-* 스키마 점수 분배
    scores = {}
    is_profanity_fail = "profanity" in template["fail_flags"]
    if is_profanity_fail:
        # 금지어 항목만 0
        for it in MANUAL_ITEM_DEFS:
            if it["id"] == "item-forbidden":
                scores[it["id"]] = {
                    "type": it["type"], "score": 0, "max": it["max"],
                    "status": "fail", "confidence": 99,
                    "reason": "금지어 탐지 — 전체 FAIL 처리",
                    "evidence": EVIDENCE_TEMPLATES["profanity"]["fail"],
                }
            else:
                scores[it["id"]] = {
                    "type": it["type"], "score": 0, "max": it["max"],
                    "status": "fail", "confidence": 95,
                }
    else:
        lo, hi = template["expected_score_range"]
        target = random.randint(lo, hi)
        ratio = target / 100.0
        for it in MANUAL_ITEM_DEFS:
            base = int(it["max"] * ratio)
            jitter = random.randint(-1, 1)
            score = max(0, min(it["max"], base + jitter))
            if score >= it["max"] * 0.85:
                status = "pass"
            elif score >= it["max"] * 0.6:
                status = "warn"
            else:
                status = "fail"
            obj = {
                "type": it["type"], "score": score, "max": it["max"],
                "status": status, "confidence": random.randint(75, 95),
            }
            if status != "pass":
                obj["reason"] = f"{it['label']} 영역에서 기준점 대비 부족"
            scores[it["id"]] = obj
        # 금지어 항목은 정상 시 만점
        scores["item-forbidden"] = {
            "type": "NLP", "score": 10, "max": 10,
            "status": "pass", "confidence": 99,
        }

    total_score = sum(s["score"] for s in scores.values()) if is_completed else 0
    if is_profanity_fail:
        total_score = 0

    eval_id = f"ME-2025-{seq:05d}"
    date = pick_recent_date()
    call_time = random_time_in_business_hours()

    qa_comment = (
        f"수동평가 사유: {plan['criteria']}. "
        f"통화 청취 결과 {template['category']} 카테고리 시나리오로 분류되며, "
        f"AI 자동평가({auto_total}점)와 수동평가 결과의 편차는 "
        f"{'미미한 수준' if not is_profanity_fail else 'FAIL 항목 일치'}입니다. "
        f"코칭 권장 사항: {plan['plan']} 가이드라인 준수."
    )

    record: dict = {
        "id": eval_id,
        "date": date,
        "call_time": call_time,
        "center": agent_info["center"],
        "center_id": agent_info["center_id"],
        "team": agent_info["team"],
        "team_id": agent_info["team_id"],
        "agent_id": agent_info["agent_id"],
        "agent_name": agent_info["agent_name"],
        "employee_id": agent_info.get("employee_id", "-"),
        "call_type": template["channel"],
        "duration": duration,
        "total_score": total_score,
        "eval_form": f"{form['name']} {form['version']}",
        "consultation_type": template["consultation_type"],
        "scenario_id": template["id"],
        "scenario_category": template["category"],
        "products": template["products"],
        "manual_plan": plan["plan"],
        "manual_plan_criteria": plan["criteria"],
        "eval_status": "completed" if is_completed else "pending",
        "issues": [f"{template['category']} 시나리오 감점 항목 다수"] if total_score and total_score < 60 else [],
        "ai_feedback": (
            f"AI 자동 평가 점수: {auto_total}점. "
            f"{plan['criteria']} 기준으로 수동 평가 대상에 포함되었습니다. "
            f"시나리오 카테고리: {template['category']}, 결과: {template['outcome']}."
        ),
        "qa_comment": qa_comment,
        "scores": scores,
        "transcript": transcript,
    }

    if template["category"] in ("신입", "민원") or (total_score and total_score < 60):
        record["coaching_plan"] = random.choice(COACHING_PLANS)

    if is_completed:
        record["manual_review"] = {
            "reviewed_at": f"{date} {(int(call_time[:2]) + 2) % 24:02d}:30",
            "reviewer": random.choice(["박팀장", "김관리자", "이평가"]),
            "modified_items": [],
            "comment": qa_comment[:80] + "…",
        }
    return record


# ---------------------------------------------------------------------------
# 메인 생성 흐름
# ---------------------------------------------------------------------------
def generate_all() -> tuple[list[dict], list[dict], dict]:
    templates_payload = load_json(TEMPLATES_PATH)
    templates = {t["id"]: t for t in templates_payload["templates"]}
    users = load_json(USERS_PATH)
    centers = load_json(CENTERS_PATH)
    forms_list = load_json(FORMS_PATH)
    forms = {f["id"]: f for f in forms_list}

    pool = build_agent_pool(users, centers)

    # 평가 제외 상담사 선정 — 각 팀 마지막 1명을 결정론적으로 평가 제외 처리 (총 7명)
    # 사유: 신입 교육중 / 휴직 / 평가 제외 사유 보유 등 시연용
    excluded_agent_ids: set[str] = set()
    for tid, lst in pool.items():
        if lst:
            excluded_agent_ids.add(lst[-1]["agent_id"])

    # 자동 평가 생성
    auto_records: list[dict] = []
    seq = 1
    for tpl_id, count in AUTO_DISTRIBUTION:
        tpl = templates[tpl_id]
        form = forms[tpl["target_form"]]
        for _ in range(count):
            team_id = pick_team_for_template(tpl)
            agent = random.choice(pool[team_id])
            rec = make_auto_evaluation(tpl, form, agent, seq)
            rec["excluded"] = agent["agent_id"] in excluded_agent_ids
            auto_records.append(rec)
            seq += 1

    # 자동 평가 → AI 점수 lookup (수동 평가 ai_feedback 에 노출)
    auto_index_by_agent = defaultdict(list)
    for r in auto_records:
        auto_index_by_agent[r["agent_id"]].append(r["total_score"])

    # 수동 평가 생성
    manual_records: list[dict] = []
    mseq = 1
    for tpl_id, count in MANUAL_DISTRIBUTION:
        tpl = templates[tpl_id]
        form = forms[tpl["target_form"]]
        for _ in range(count):
            team_id = pick_team_for_template(tpl)
            agent = random.choice(pool[team_id])
            # 동일 상담사의 평균 자동평가 점수 (없으면 50점 기준)
            auto_scores = auto_index_by_agent.get(agent["agent_id"], [])
            auto_avg = sum(auto_scores) // max(1, len(auto_scores)) if auto_scores else random.randint(55, 75)
            mrec = make_manual_evaluation(tpl, form, agent, mseq, auto_avg)
            mrec["excluded"] = agent["agent_id"] in excluded_agent_ids
            manual_records.append(mrec)
            mseq += 1

    # 정렬: 날짜 desc + 시간 desc
    auto_records.sort(key=lambda r: (r["date"], r["call_time"]), reverse=True)
    manual_records.sort(key=lambda r: (r["date"], r["call_time"]), reverse=True)

    # 대시보드 통계 집계
    dashboard = build_dashboard(auto_records, manual_records, centers)
    return auto_records, manual_records, dashboard


# ---------------------------------------------------------------------------
# 대시보드 통계 집계
# ---------------------------------------------------------------------------
TEAM_COLORS = {
    "VIP고객팀": "#0F766E",
    "주식상담팀": "#2196F3",
    "HTS기술지원팀": "#FF9800",
    "펀드상담팀": "#7E57C2",
    "해피콜팀": "#9C27B0",
    "CS상담팀": "#4CAF50",
    "아웃바운드팀": "#EF5350",
}


def build_dashboard(auto: list[dict], manual: list[dict], centers: list[dict]) -> dict:
    # 평균 점수 (FAIL 0점은 평균 계산에서 제외 안 함 — 실제 KPI 반영)
    avg_score = round(sum(r["total_score"] for r in auto) / max(1, len(auto)), 1)
    avg_ib = [r for r in auto if r["call_type"] == "I/B"]
    avg_ob = [r for r in auto if r["call_type"] == "O/B"]
    completed_manual = [r for r in manual if r["eval_status"] == "completed"]

    def avg(lst): return round(sum(r["total_score"] for r in lst) / max(1, len(lst)), 1)

    # 팀별 점수
    team_scores_map = defaultdict(list)
    team_call_counts = Counter()
    team_meta: dict[str, dict] = {}
    for c in centers:
        for t in c["teams"]:
            team_meta[t["id"]] = {
                "center": c["name"], "center_id": c["id"],
                "team": t["name"], "agent_count": t["agent_count"],
            }
    for r in auto + manual:
        team_scores_map[r["team_id"]].append(r["total_score"])
        team_call_counts[r["team_id"]] += 1

    team_scores = []
    for tid, meta in team_meta.items():
        scores_list = team_scores_map.get(tid, [])
        if scores_list:
            team_scores.append({
                "team": meta["team"],
                "score": round(sum(scores_list) / len(scores_list), 1),
                "color": TEAM_COLORS.get(meta["team"], "#90A4AE"),
            })
    team_scores.sort(key=lambda x: -x["score"])

    # FAIL/이슈 집계 — 페이지의 issue-filter 와 산식 일치
    # FAIL: scores.profanity.is_fail 가 true 인 콜
    fail_profanity = sum(1 for r in auto if r["scores"].get("profanity", {}).get("is_fail"))
    fail_profanity += sum(1 for r in manual if r["scores"].get("profanity", {}).get("is_fail"))
    # 기준미달: 0 < total_score < 60 (FAIL 0점 제외, manual 은 완료된 것만)
    below_threshold = sum(1 for r in auto if 0 < r["total_score"] < 60)
    below_threshold += sum(1 for r in manual
                           if r.get("eval_status") == "completed"
                           and 0 < (r.get("total_score") or 0) < 60)
    # 이의 제기 대기 — pages/admin/dispute-inbox.html 의 하드코딩된 disputes 배열 중
    # status='대기' 인 건수와 일치시킨다 (현재 5건). dispute-inbox 데이터가 바뀌면 이 값도 갱신 필요.
    dispute_pending = 5

    # 감점 항목 Top5 (auto 기준)
    item_deductions = Counter()
    item_team_map = defaultdict(Counter)
    item_label = {}
    for r in auto:
        for iid, sobj in r["scores"].items():
            if sobj.get("status") in ("warn", "fail") and sobj.get("score", 0) < sobj.get("max", 0):
                item_deductions[iid] += 1
                item_team_map[iid][r["team_id"]] += 1
                # 항목 라벨 캐싱 (시나리오 카테고리 활용)
    # 항목명 매핑 (evaluation-items.json 의 짧은 이름)
    items_payload = load_json(ITEMS_PATH)
    for cat in items_payload["categories"]:
        for sub in cat.get("children", []):
            for item in sub.get("items", []):
                item_label[item["id"]] = item["name"]

    top5_raw = item_deductions.most_common(5)
    improvement_top5 = []
    rank = 0
    for iid, cnt in top5_raw:
        if not iid:
            continue
        rank += 1
        top_team = item_team_map[iid].most_common(1)[0][0] if item_team_map[iid] else None
        meta = team_meta.get(top_team, {})
        improvement_top5.append({
            "rank": rank,
            "center": meta.get("center", "전체"),
            "team": meta.get("team", "전체"),
            "team_id": top_team or "",
            "item": item_label.get(iid, iid),
            "item_id": iid,
            "category": "응대품질" if iid not in ("required-privacy", "problem-solve", "easy-explanation", "active-response") else "응대내용",
            "calls": cnt,
            "status": "danger" if cnt >= 5 else "warning",
        })

    # 최다 감점 콜 Top5 (점수 오름차순)
    # 후보 정책:
    #   - manual pending(평가 미완료, score=0)은 제외
    #   - profanity FAIL(0점) 콜은 별도 FAIL 카드로 노출되므로 여기서 제외
    #   - 점수 1~79점 구간의 저점수 콜만 코칭 우선 대상으로 표시
    def _is_fail_call(rec):
        return bool(rec.get("scores", {}).get("profanity", {}).get("is_fail"))

    fail_candidates = [r for r in auto
                       if (r.get("total_score") or 0) > 0 and not _is_fail_call(r)]
    fail_candidates += [r for r in manual
                        if r.get("eval_status") == "completed"
                        and (r.get("total_score") or 0) > 0
                        and not _is_fail_call(r)]
    fail_candidates_sorted = sorted(fail_candidates, key=lambda r: r["total_score"])

    seen_agents = set()
    fail_list = []
    for r in fail_candidates_sorted:
        if r["total_score"] >= 80:
            break
        aid = r["agent_id"]
        if aid in seen_agents:
            continue
        seen_agents.add(aid)
        reason_parts = []
        if 0 < r["total_score"] < 60:
            reason_parts.append("기준 미달")
        if r.get("fail_items"):
            reason_parts.append(r["fail_items"][0] + " 미흡")
        if not reason_parts:
            reason_parts.append("일부 항목 경미 감점")
        fail_list.append({
            "name": r["agent_name"],
            "center": r["center"],
            "team": r["team"],
            "score": r["total_score"],
            "reason": " + ".join(reason_parts[:2]),
        })
        if len(fail_list) >= 5:
            break

    # 팀별 상세
    teams_detail = []
    for c in centers:
        for t in c["teams"]:
            tid = t["id"]
            tscores = team_scores_map.get(tid, [])
            issues_list = []
            team_auto = [r for r in auto if r["team_id"] == tid]
            t_profanity = sum(1 for r in team_auto if r["scores"].get("profanity", {}).get("is_fail"))
            t_below = sum(1 for r in team_auto if 0 < r["total_score"] < 60)
            if t_profanity:
                issues_list.append({"type": "FAIL(금지어)", "count": t_profanity})
            if t_below:
                issues_list.append({"type": "기준 미달", "count": t_below})

            # 실 레코드 카운트 기반 (정합성 우선) — 인위적 부풀림 제거
            team_call_total = team_call_counts[tid]
            teams_detail.append({
                "center": c["name"],
                "center_id": c["id"],
                "team": t["name"],
                "team_id": tid,
                "calls": team_call_total,
                "evaluations": team_call_total,
                "avg_score": round(sum(tscores) / len(tscores), 1) if tscores else 80.0,
                "agent_count": t["agent_count"],
                "issues": issues_list,
            })

    total_agents = sum(t["agent_count"] for c in centers for t in c["teams"])

    # quality_trend_30days — 자동 평가의 일별 평균
    by_date = defaultdict(list)
    for r in auto:
        by_date[r["date"]].append(r["total_score"])
    trend = []
    for d in sorted(by_date.keys()):
        mm, dd = d.split("-")[1:]
        trend.append({"date": f"{mm}/{dd}", "score": round(sum(by_date[d]) / len(by_date[d]), 1)})

    # 실 레코드 기반 KPI — 인위적 스케일링 제거, 모든 화면(대시보드/통합현황/상세분석)이 동일 값 공유
    calls_auto_ib = sum(1 for r in auto if r["call_type"] == "I/B")
    calls_auto_ob = sum(1 for r in auto if r["call_type"] == "O/B")
    calls_manual = len(manual)
    calls_auto_ib_done = calls_auto_ib  # auto 는 즉시 완료로 간주
    calls_auto_ob_done = calls_auto_ob
    calls_manual_done = len(completed_manual)

    summary = {
        "total_agents": total_agents,
        "total_agents_prev": max(0, total_agents - 8),
        "total_calls": calls_auto_ib + calls_auto_ob + calls_manual,
        "total_calls_prev": max(0, calls_auto_ib + calls_auto_ob + calls_manual - 80),
        "calls_auto_ib": calls_auto_ib,
        "calls_auto_ib_done": calls_auto_ib_done,
        "calls_auto_ib_prev": max(0, calls_auto_ib - 30),
        "calls_auto_ib_done_prev": max(0, calls_auto_ib_done - 30),
        "calls_auto_ob": calls_auto_ob,
        "calls_auto_ob_done": calls_auto_ob_done,
        "calls_auto_ob_prev": max(0, calls_auto_ob - 12),
        "calls_auto_ob_done_prev": max(0, calls_auto_ob_done - 12),
        "calls_manual": calls_manual,
        "calls_manual_done": calls_manual_done,
        "calls_manual_prev": max(0, calls_manual - 10),
        "calls_manual_done_prev": max(0, calls_manual_done - 10),
        "avg_score": avg_score,
        "avg_score_prev": round(avg_score - 1.3, 1),
        "avg_score_auto_ib": avg(avg_ib),
        "avg_score_auto_ib_prev": round(avg(avg_ib) - 1.2, 1),
        "avg_score_auto_ob": avg(avg_ob),
        "avg_score_auto_ob_prev": round(avg(avg_ob) - 1.2, 1),
        "avg_score_manual": avg(completed_manual) if completed_manual else 78.0,
        "avg_score_manual_prev": round((avg(completed_manual) if completed_manual else 78.0) - 1.4, 1),
        "avg_duration": "6:32",
        "avg_duration_prev": "6:48",
        "excluded_agents": len({r["agent_id"] for r in (auto + manual) if r.get("excluded")}),
        "excluded_agents_prev": max(0, len({r["agent_id"] for r in (auto + manual) if r.get("excluded")}) - 1),
        "urgent_issues": fail_profanity + below_threshold + dispute_pending,
        "urgent_issues_prev": max(0, fail_profanity + below_threshold + dispute_pending - 3),
        "top_deduction": {
            "item": improvement_top5[0]["item"] if improvement_top5 else "공감 표현 부족",
            "calls": improvement_top5[0]["calls"] if improvement_top5 else 0,
            "pct": round((improvement_top5[0]["calls"] / max(1, len(auto))) * 100) if improvement_top5 else 0,
        },
        "low_score_calls": below_threshold,
        "low_score_pct": round(below_threshold / max(1, len(auto)) * 100, 1),
    }

    return {
        "summary": summary,
        "channel_distribution": {
            "IB": calls_auto_ib,
            "OB": calls_auto_ob,
        },
        "quality_trend_30days": trend,
        "team_scores": team_scores,
        "urgent_issues": [
            {"type": "FAIL(금지어)", "count": fail_profanity, "team": "전체"},
            {"type": "기준 미달", "count": below_threshold, "team": "전체"},
            {"type": "이의 제기 대기", "count": dispute_pending, "status": "pending"},
        ],
        "fail_agents": fail_list,
        "improvement_needed_top5": improvement_top5,
        "teams": teams_detail,
    }


# ---------------------------------------------------------------------------
# all-data.js 인라인 블록 동기화
# ---------------------------------------------------------------------------
ALL_DATA_KEYS = [
    "dashboard-stats.json",
    "evaluations.json",
    "manual-evaluations.json",
]


def sync_all_data_js(payloads: dict[str, Any]) -> None:
    text = ALL_DATA_PATH.read_text(encoding="utf-8")
    for key, payload in payloads.items():
        json_str = json.dumps(payload, ensure_ascii=False, indent=2)
        # 두 가지 따옴표 스타일 모두 지원 (작은따옴표 또는 큰따옴표)
        pattern_single = rf"(window\.AICC_DATA\['{re.escape(key)}'\]\s*=\s*)[\s\S]*?(\n;)"
        pattern_double = rf'(window\.AICC_DATA\["{re.escape(key)}"\]\s*=\s*)[\s\S]*?(\n;)'
        replacement = lambda m: f"{m.group(1)}\n{json_str}\n;"
        new_text, n1 = re.subn(pattern_single, replacement, text)
        if n1 == 0:
            new_text, n2 = re.subn(pattern_double, replacement, text)
            if n2 == 0:
                # 블록이 ;로 끝나지 않는 경우: 다음 'window.AICC_DATA[' 또는 EOF 까지 매칭
                pattern_alt_s = rf"(window\.AICC_DATA\['{re.escape(key)}'\]\s*=\s*)[\s\S]*?(;\s*\nwindow\.AICC_DATA\[|;\s*$)"
                new_text, n3 = re.subn(pattern_alt_s, lambda m: f"{m.group(1)}\n{json_str}\n{m.group(2) if m.group(2).startswith(';') else ';'}\n", text)
                if n3 == 0:
                    raise RuntimeError(f"all-data.js 에서 {key} 블록을 찾지 못했습니다.")
        text = new_text
    ALL_DATA_PATH.write_text(text, encoding="utf-8")


# ---------------------------------------------------------------------------
# my-evaluations.html 의 hardcoded allEvals 블록 동기화 (홍길동 평가 15건)
# ---------------------------------------------------------------------------
def patch_my_evaluations_html(auto: list[dict]) -> None:
    target_id = "agent001"
    target_records = [r for r in auto if r["agent_id"] == target_id][:15]
    if len(target_records) < 8:
        # 홍길동 명의 레코드가 부족하면 다른 agent 의 레코드 일부를 빌려와 채움
        rest_needed = 15 - len(target_records)
        borrowed = [r for r in auto if r["agent_id"] != target_id][:rest_needed]
        # 빌려온 레코드는 홍길동 명의로 표기 변경 (소속 등은 본인 정보 사용)
        for r in borrowed:
            r = dict(r)  # 얕은 복제
            r["agent_id"] = target_id
            r["agent_name"] = "홍길동"
            r["team_id"] = "team-vip"
            r["team"] = "VIP고객팀"
            r["center"] = "서울센터"
            r["center_id"] = "ct-seoul"
            target_records.append(r)

    # my-evaluations.html 의 allEvals 스키마로 변환
    items_payload = load_json(ITEMS_PATH)
    item_label_map: dict[str, str] = {}
    for cat in items_payload["categories"]:
        for sub in cat.get("children", []):
            for item in sub.get("items", []):
                item_label_map[item["id"]] = item["name"]

    converted = []
    for idx, r in enumerate(target_records):
        items_list = []
        for iid, sobj in r["scores"].items():
            items_list.append({
                "name": item_label_map.get(iid, iid),
                "score": sobj["score"],
                "max": sobj["max"],
                "type": sobj["type"],
                "status": sobj["status"],
            })
        first_issue = r["issues"][0] if r["issues"] else "-"
        # 짧게 자르기
        issue_short = first_issue.split(":")[0] if ":" in first_issue else first_issue
        converted.append({
            "id": r["id"],
            "date": r["date"],
            "time": r["call_time"],
            "type": r["call_type"],
            "duration": r["duration"],
            "score": r["total_score"],
            "confidence": r["confidence"],
            "issue": "-" if r["total_score"] >= 80 and not r["fail_items"] else (issue_short[:24] if first_issue != "-" else "-"),
            "eval_form": r["eval_form"],
            "consultation_type": r["consultation_type"],
            "feedback": r["ai_feedback"],
            "items": items_list,
            "transcript": r["transcript"],
        })

    # JSON 문자열로 직렬화 후 my-evaluations.html 의 `const allEvals = [...]` 블록 교체
    arr_json = json.dumps(converted, ensure_ascii=False, indent=2)

    html = MY_EVALS_HTML.read_text(encoding="utf-8")
    # allEvals = [ ... ]; 의 닫는 ]; 위치를 찾아 교체.
    # 들여쓰기 형태에 무관하도록 \s*\];?\s*$ 까지 매칭한 뒤 `\n    let filteredEvals` 직전까지로 한정한다.
    pattern = re.compile(
        r"(const allEvals = )\[[\s\S]*?\n\s*\];",
        re.MULTILINE,
    )
    new_block = f"\\1{arr_json};"
    new_html, n = pattern.subn(new_block, html, count=1)
    if n == 0:
        raise RuntimeError("my-evaluations.html 에서 allEvals 블록을 찾지 못했습니다.")
    MY_EVALS_HTML.write_text(new_html, encoding="utf-8")


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------
def main() -> None:
    auto, manual, dashboard = generate_all()
    write_json(EVALUATIONS_PATH, auto)
    write_json(MANUAL_EVAL_PATH, manual)
    write_json(DASHBOARD_PATH, dashboard)
    sync_all_data_js({
        "dashboard-stats.json": dashboard,
        "evaluations.json": auto,
        "manual-evaluations.json": manual,
    })
    patch_my_evaluations_html(auto)
    print(f"[OK] auto={len(auto)}건  manual={len(manual)}건")
    print(f"     dashboard.summary.avg_score = {dashboard['summary']['avg_score']}")
    print(f"     FAIL(금지어) {dashboard['urgent_issues'][0]['count']}건 / 기준미달 {dashboard['urgent_issues'][1]['count']}건 / 이의대기 {dashboard['urgent_issues'][2]['count']}건")

    # 데모 페이지 시연 효과 — VIP고객팀 윤민서의 상위 5건을 풍성한 시나리오로 덮어쓰기
    try:
        import inject_vip_demo
        print("\n[데모 보강] 윤민서 상위 5건 풍성한 시나리오 적용 중...")
        inject_vip_demo.main()
    except Exception as e:
        print(f"[WARN] inject_vip_demo 실행 실패: {e}")


if __name__ == "__main__":
    main()
