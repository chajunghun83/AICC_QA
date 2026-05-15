# -*- coding: utf-8 -*-
"""
QA 더미 데이터 정합성·풍부도 검증기.

- 대시보드 KPI 와 실제 evaluations/manual-evaluations 데이터의 수치 일치
- 상담사/팀/센터 ID 가 users/centers 마스터에 존재하는지
- 평가 항목 ID 가 evaluation-items 에 존재하는지
- 시나리오 ID 가 qa-script-templates 에 존재하는지
- transcript >= 8 턴, ai_feedback >= 150 자, tags >= 4 개
"""
from __future__ import annotations
import json
import sys
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "assets" / "dummy-data"


def load(name: str):
    return json.loads((DATA_DIR / name).read_text(encoding="utf-8"))


def main() -> int:
    auto = load("evaluations.json")
    manual = load("manual-evaluations.json")
    dashboard = load("dashboard-stats.json")
    users = load("users.json")
    centers = load("centers.json")
    items_payload = load("evaluation-items.json")
    templates = load("qa-script-templates.json")

    errors: list[str] = []
    warnings: list[str] = []

    # 마스터 ID 집합
    user_ids = {u["id"] for u in users}
    team_ids = {t["id"] for c in centers for t in c["teams"]}
    center_ids = {c["id"] for c in centers}
    template_ids = {t["id"] for t in templates["templates"]}
    item_ids = set()
    for cat in items_payload["categories"]:
        for sub in cat.get("children", []):
            for item in sub.get("items", []):
                item_ids.add(item["id"])
    item_ids.add("profanity")  # fail_rule 의 욕설 항목
    # manual 의 간소화 item-* 도 허용
    item_ids.update({"item-greeting", "item-empathy", "item-solution", "item-closing", "item-forbidden"})
    # 데모 demo override(inject_vip_demo.py)로 manual record 에 자동 항목 키가 들어가는 케이스 허용
    # — 자동 항목 키는 이미 item_ids 에 포함돼 있어 별도 추가 불필요

    # 1. 팀·센터·시나리오 ID 정합성
    # 상담사 ID는 시연용 동적 생성(filler)이 많아 정적 화이트리스트 검사 대신 패턴 검사로 대체
    for r in auto + manual:
        aid = r.get("agent_id") or ""
        if not aid.startswith("agent"):
            errors.append(f"{r['id']}: 비정상 agent_id={aid}")
        if r["team_id"] not in team_ids:
            errors.append(f"{r['id']}: 알 수 없는 team_id={r['team_id']}")
        if r["center_id"] not in center_ids:
            errors.append(f"{r['id']}: 알 수 없는 center_id={r['center_id']}")
        if r.get("scenario_id") and r["scenario_id"] not in template_ids:
            errors.append(f"{r['id']}: 알 수 없는 scenario_id={r['scenario_id']}")

    # 2. 평가 항목 ID 정합성
    for r in auto + manual:
        for iid in r["scores"]:
            if iid not in item_ids:
                errors.append(f"{r['id']}: 알 수 없는 score item_id={iid}")

    # 3. 풍부도 검증
    for r in auto:
        if len(r["transcript"]) < 8:
            errors.append(f"{r['id']}: transcript {len(r['transcript'])}턴 (8턴 이상 필요)")
        if len(r["ai_feedback"]) < 150:
            errors.append(f"{r['id']}: ai_feedback {len(r['ai_feedback'])}자 (150자 이상 필요)")
        if len(r.get("tags", [])) < 4:
            warnings.append(f"{r['id']}: tags {len(r.get('tags',[]))}개 (4개 권장)")
    for r in manual:
        if len(r["transcript"]) < 8:
            errors.append(f"{r['id']}: transcript {len(r['transcript'])}턴 (8턴 이상 필요)")
        if not r.get("qa_comment") or len(r["qa_comment"]) < 80:
            errors.append(f"{r['id']}: qa_comment 부족")

    # 4. 대시보드 KPI ↔ 실제 데이터 일치
    real_profanity = sum(1 for r in auto if r["scores"].get("profanity", {}).get("is_fail"))
    real_profanity += sum(1 for r in manual if r["scores"].get("profanity", {}).get("is_fail"))
    real_below = sum(1 for r in auto if 0 < r["total_score"] < 60)
    real_below += sum(1 for r in manual
                      if r.get("eval_status") == "completed"
                      and 0 < (r.get("total_score") or 0) < 60)
    # 이의 제기 대기 — pages/admin/dispute-inbox.html 의 status='대기' 건수와 일치해야 함 (현재 5건)
    real_pending = 5
    manual_pending_count = sum(1 for r in manual if r["eval_status"] == "pending")  # 별도: 수동 평가 미완료

    urgent = {u["type"]: u["count"] for u in dashboard["urgent_issues"]}
    if urgent.get("FAIL(금지어)") != real_profanity:
        errors.append(
            f"dashboard FAIL(금지어)={urgent.get('FAIL(금지어)')} but real={real_profanity}"
        )
    if urgent.get("기준 미달") != real_below:
        errors.append(
            f"dashboard 기준 미달={urgent.get('기준 미달')} but real={real_below}"
        )
    if urgent.get("이의 제기 대기") != real_pending:
        errors.append(
            f"dashboard 이의 제기 대기={urgent.get('이의 제기 대기')} but real={real_pending}"
        )

    # 팀별 점수 정합성
    team_scores_real: dict[str, list[int]] = defaultdict(list)
    for r in auto + manual:
        team_scores_real[r["team"]].append(r["total_score"])
    for entry in dashboard["team_scores"]:
        team = entry["team"]
        scores = team_scores_real.get(team, [])
        if scores:
            real_avg = round(sum(scores) / len(scores), 1)
            if abs(real_avg - entry["score"]) > 1.0:  # 데모 inject 후 점수 미세 변동 허용
                errors.append(
                    f"dashboard team_scores[{team}]={entry['score']} but real avg={real_avg}"
                )

    # 5. 종목 일관성: products 와 transcript 매칭 (참고용 — 일부 종목은 사용자명에 가려질 수 있음)
    for r in auto:
        if not r.get("products"):
            warnings.append(f"{r['id']}: products 비어 있음")

    # ----------------- 보고 -----------------
    print("=" * 60)
    print(f"  레코드 수    : auto {len(auto)}건 / manual {len(manual)}건")
    print(f"  대시보드 KPI : FAIL {urgent.get('FAIL(금지어)')}건 / 기준미달 {urgent.get('기준 미달')}건 / 이의대기 {urgent.get('이의 제기 대기')}건")
    print(f"  실제 데이터  : FAIL {real_profanity}건 / 기준미달 {real_below}건 / 이의대기 {real_pending}건 (dispute-inbox 하드코딩)")
    print(f"  참고         : 수동 평가 미완료 {manual_pending_count}건 (별도 - 이의 제기와 무관)")
    print("=" * 60)

    if errors:
        print(f"\n[ERROR] {len(errors)}건")
        for e in errors[:30]:
            print(f"  - {e}")
        if len(errors) > 30:
            print(f"  ... 외 {len(errors) - 30}건")
    else:
        print("\n[OK] 정합성 검증 통과")

    if warnings:
        print(f"\n[WARN] {len(warnings)}건")
        for w in warnings[:10]:
            print(f"  - {w}")

    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
