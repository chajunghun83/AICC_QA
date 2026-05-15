# -*- coding: utf-8 -*-
"""
detail-analysis.html 의 const DUMMY = {...} 블록을
centers.json + users.json + EXTRA_AGENTS + evaluations.json 기반으로 재생성한다.

목적: qa-dashboard 의 fail_agents 클릭 등 다른 페이지에서 ws/team/agent 파라미터로
detail-analysis 3뎁스 진입 시 매칭 실패를 막고, 모든 카드/드릴다운 데이터가
한 진실의 원천(evaluations.json 등)에서 파생되도록 정합성 회복.
"""
from __future__ import annotations
import json, re, sys
from collections import defaultdict
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "assets" / "dummy-data"

centers = json.loads((DATA / "centers.json").read_text(encoding="utf-8"))
users = json.loads((DATA / "users.json").read_text(encoding="utf-8"))
auto = json.loads((DATA / "evaluations.json").read_text(encoding="utf-8"))
manual = json.loads((DATA / "manual-evaluations.json").read_text(encoding="utf-8"))

# generate_qa_data.py 의 EXTRA_AGENTS 와 동일 명단
EXTRA_AGENTS = {
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

EMPLOYEE_ID_MAP = {
    "agent001": "S-1001", "agent002": "S-1002", "agent003": "S-1003", "agent004": "S-1004",
    "agent005": "S-1005", "agent006": "S-1006", "agent007": "S-1007", "agent008": "S-1008",
    "agent101": "S-1011", "agent102": "S-1012",
    "agent201": "S-1101", "agent202": "S-1102", "agent203": "S-1103", "agent204": "S-1104",
    "agent301": "S-1201", "agent302": "S-1202", "agent303": "S-1203",
    "agent401": "S-2101", "agent402": "S-2102", "agent403": "S-2103",
    "agent501": "S-2201", "agent502": "S-2202",
    "agent601": "S-3101", "agent602": "S-3102", "agent603": "S-3103",
    "agent701": "S-3201", "agent702": "S-3202",
}

# === agent 풀 구성 ===
team_to_center = {}
center_id_to_obj = {}
for c in centers:
    center_id_to_obj[c["id"]] = {"id": c["id"].replace("ct-", "ws-"), "name": c["name"], "teams": []}
    for t in c["teams"]:
        team_to_center[t["id"]] = c
        center_id_to_obj[c["id"]]["teams"].append({
            "id": t["id"], "name": t["name"], "agent_count": t["agent_count"], "_agents": []
        })

agents_pool = []
for u in users:
    if u.get("role") != "AGENT":
        continue
    agents_pool.append({
        "id": u["id"].replace("agent", "ag-"),
        "agent_id": u["id"],
        "name": u["name"],
        "employeeId": EMPLOYEE_ID_MAP.get(u["id"], "-"),
        "team_id": u["team_id"],
        "center_id": u["center_id"],
        "evaluations": [],
    })
for tid, names in EXTRA_AGENTS.items():
    for nm, aid in names:
        agents_pool.append({
            "id": aid.replace("agent", "ag-"),
            "agent_id": aid,
            "name": nm,
            "employeeId": EMPLOYEE_ID_MAP.get(aid, "-"),
            "team_id": tid,
            "center_id": team_to_center[tid]["id"],
            "evaluations": [],
        })

agent_by_id = {a["agent_id"]: a for a in agents_pool}

# === evaluations.json → agent.evaluations 매핑 ===
# detail-analysis 의 evaluations 항목은 {id, date, time, duration, score, type, confidence,
#   issue, callType, category, deductionItems, urgentIssue} 구조
def to_detail_eval(r):
    is_fail = bool(r.get("scores", {}).get("profanity", {}).get("is_fail"))
    score = r.get("total_score") or 0
    deduction_items = []
    for iid, s in (r.get("scores") or {}).items():
        if iid == "profanity":
            continue
        if s.get("status") in ("warn", "fail") and s.get("score", 0) < s.get("max", 0):
            # 항목 한국어 이름은 페이지 itemNameMap 에서 처리하지만 detail-analysis 는 raw 항목명 사용
            # 점수 객체에 reason 이 있으면 그걸 deductionItem 으로 사용
            pass
    # 단순화: fail_items 활용
    deduction_items = list(r.get("fail_items") or [])[:4]
    issue = None
    if is_fail:
        issue = "FAIL(금지어) - 부적절한 표현 감지"
    elif 0 < score < 60:
        issue = "기준 미달 - 평가 기준점 미충족"
    urgent = is_fail or (0 < score < 60)
    return {
        "id": r["id"],
        "date": r["date"],
        "time": r["call_time"],
        "duration": r["duration"],
        "score": score,
        "type": "AI" if r.get("call_type") in ("I/B", "O/B") else "수동",
        "confidence": r.get("confidence", "High"),
        "issue": issue,
        "callType": r.get("call_type", "I/B"),
        "category": r.get("consultation_type", ""),
        "deductionItems": deduction_items,
        "urgentIssue": urgent,
    }

# auto + manual completed 를 agent 에 분배
for r in auto:
    aid = r.get("agent_id")
    if aid in agent_by_id:
        agent_by_id[aid]["evaluations"].append(to_detail_eval(r))
for r in manual:
    if r.get("eval_status") != "completed":
        continue
    aid = r.get("agent_id")
    if aid in agent_by_id:
        ev = to_detail_eval(r)
        ev["type"] = "수동"
        agent_by_id[aid]["evaluations"].append(ev)

# 평가 이력 없는 상담사도 시연용으로 1~3건 채움 (정상 콜로)
import random
random.seed(20260515)
def make_filler_eval(agent_idx):
    sid = 90000 + agent_idx * 10
    score = random.randint(78, 96)
    return {
        "id": f"AE-2025-{sid:05d}",
        "date": f"2025-01-{random.randint(15, 27):02d}",
        "time": f"{random.randint(9, 17):02d}:{random.randint(0,59):02d}",
        "duration": f"{random.randint(2,8):02d}:{random.randint(0,59):02d}",
        "score": score,
        "type": "AI",
        "confidence": "High" if score >= 85 else "Medium",
        "issue": None,
        "callType": random.choice(["I/B", "O/B"]),
        "category": random.choice([
            "거래지원 > 체결조회 > 국내주식 체결",
            "계좌관리 > 계좌개설 > 비대면개설 > 일반계좌",
            "거래지원 > 신용거래 > 위험고지",
            "거래지원 > 해외주식 > 환전",
            "고객관리 > 해피콜 > 만족도조사",
        ]),
        "deductionItems": [],
        "urgentIssue": False,
    }

for idx, a in enumerate(agents_pool):
    if len(a["evaluations"]) == 0:
        cnt = random.randint(2, 4)
        for k in range(cnt):
            a["evaluations"].append(make_filler_eval(idx * 10 + k))

# === 팀에 agents 배치 + 팀/센터 집계 필드 산출 ===
# detail-analysis 의 agent 객체에 필요한 필드 추가
def avg_or(default, vals):
    return round(sum(vals) / len(vals), 1) if vals else default

for a in agents_pool:
    evals = a["evaluations"]
    scores = [e["score"] for e in evals if e["score"] > 0]
    a["totalCalls"] = len(evals)
    a["totalEvals"] = len(evals)
    a["avgScore"] = avg_or(80.0, scores)
    # 평균 통화시간
    dur_secs = []
    for e in evals:
        try:
            m, s = e["duration"].split(":"); dur_secs.append(int(m)*60 + int(s))
        except Exception:
            pass
    if dur_secs:
        avg_sec = sum(dur_secs) // len(dur_secs)
        a["avgDuration"] = f"{avg_sec//60:02d}:{avg_sec%60:02d}"
    else:
        a["avgDuration"] = "04:00"
    a["rank"] = 0  # 팀 내 순위는 아래서 산정
    a["callType"] = evals[0]["callType"] if evals else "I/B"
    # 최다 감점 항목
    dmap = defaultdict(int)
    for e in evals:
        for it in e.get("deductionItems") or []:
            dmap[it] += 1
    a["topDeductionItem"] = max(dmap, key=dmap.get) if dmap else "-"
    a["urgentIssue"] = any(e.get("urgentIssue") for e in evals)
    a["issue"] = next((e["issue"] for e in evals if e.get("issue")), None)
    a["excluded"] = False  # 별도 데이터 없음 — false 통일

# 팀별 agents 배치
for a in agents_pool:
    tobj = next(t for c in center_id_to_obj.values() for t in c["teams"] if t["id"] == a["team_id"])
    tobj["_agents"].append(a)

# 팀 집계
def team_avg(team_agents, key):
    vals = [a[key] for a in team_agents if a.get(key) is not None]
    return round(sum(vals) / len(vals), 1) if vals else 0

import math
def team_dur_avg(team_agents):
    secs = []
    for a in team_agents:
        try:
            m, s = a["avgDuration"].split(":"); secs.append(int(m)*60 + int(s))
        except: pass
    if not secs: return "04:00"
    avg = sum(secs) // len(secs)
    return f"{avg//60:02d}:{avg%60:02d}"

for cobj in center_id_to_obj.values():
    for tobj in cobj["teams"]:
        team_agents = tobj["_agents"]
        # 팀 내 순위 부여
        for i, a in enumerate(sorted(team_agents, key=lambda x: -x["avgScore"]), 1):
            a["rank"] = i
        all_team_evals = [e for a in team_agents for e in a["evaluations"]]
        team_scores = [e["score"] for e in all_team_evals if e["score"] > 0]
        tobj["totalCalls"] = len(all_team_evals)
        tobj["totalEvals"] = len(all_team_evals)
        tobj["avgScore"] = avg_or(80.0, team_scores)
        tobj["avgScore_prev"] = round(tobj["avgScore"] - random.uniform(0.5, 2.5), 1)
        tobj["agentCount_prev"] = max(1, tobj["agent_count"] - random.randint(0, 3))
        tobj["completionRate"] = round(random.uniform(85, 96), 1)
        tobj["avgDuration"] = team_dur_avg(team_agents)
        tobj["avgDuration_prev"] = team_dur_avg(team_agents)  # 동일 처리
        tobj["urgentIssues"] = sum(1 for a in team_agents if a["urgentIssue"])
        tobj["urgentIssues_prev"] = max(0, tobj["urgentIssues"] - 1)
        tobj["excludedAgents"] = 0
        tobj["excludedAgents_prev"] = 0
        # 콜 분포 (편의상 비율)
        ib = sum(1 for e in all_team_evals if e["callType"] == "I/B")
        ob = len(all_team_evals) - ib
        tobj["calls_auto_ib"] = ib; tobj["calls_auto_ib_done"] = ib
        tobj["calls_auto_ob"] = ob; tobj["calls_auto_ob_done"] = ob
        tobj["calls_manual"] = 0; tobj["calls_manual_done"] = 0
        tobj["calls_auto_ib_prev"] = max(0, ib - random.randint(0, 3))
        tobj["calls_auto_ib_done_prev"] = tobj["calls_auto_ib_prev"]
        tobj["calls_auto_ob_prev"] = max(0, ob - random.randint(0, 2))
        tobj["calls_auto_ob_done_prev"] = tobj["calls_auto_ob_prev"]
        tobj["calls_manual_prev"] = 0; tobj["calls_manual_done_prev"] = 0
        tobj["avg_score_auto_ib"] = avg_or(80, [e["score"] for e in all_team_evals if e["callType"]=="I/B" and e["score"]>0])
        tobj["avg_score_auto_ib_prev"] = round(tobj["avg_score_auto_ib"] - random.uniform(0.5,2), 1)
        tobj["avg_score_auto_ob"] = avg_or(80, [e["score"] for e in all_team_evals if e["callType"]=="O/B" and e["score"]>0])
        tobj["avg_score_auto_ob_prev"] = round(tobj["avg_score_auto_ob"] - random.uniform(0.5,2), 1)
        tobj["avg_score_manual"] = avg_or(80, team_scores)
        tobj["avg_score_manual_prev"] = round(tobj["avg_score_manual"] - random.uniform(0.5,2), 1)
        # 최다 감점 항목
        d = defaultdict(int)
        for e in all_team_evals:
            for it in (e.get("deductionItems") or []): d[it] += 1
        top_item = max(d, key=d.get) if d else "-"
        top_cnt = d.get(top_item, 0)
        tobj["topDeduction"] = {
            "item": top_item, "calls": top_cnt,
            "pct": round(top_cnt / max(1, len(all_team_evals)) * 100)
        }
        low = sum(1 for s in team_scores if s <= 70)
        tobj["lowScoreCalls"] = low
        tobj["lowScorePct"] = round(low / max(1, len(team_scores)) * 100, 1)
        # agents 키 정리 (_agents → agents) — JSON 출력용
        tobj["agents"] = tobj.pop("_agents")

# 센터 집계
for cobj in center_id_to_obj.values():
    teams = cobj["teams"]
    sum_calls = sum(t["totalCalls"] for t in teams)
    sum_evals = sum(t["totalEvals"] for t in teams)
    sum_agents = sum(t["agent_count"] for t in teams)
    cobj["totalCalls"] = sum_calls
    cobj["totalEvals"] = sum_evals
    cobj["agentCount"] = sum_agents
    cobj["agentCount_prev"] = max(0, sum_agents - random.randint(2, 8))
    cobj["completionRate"] = round(sum(t["completionRate"] for t in teams) / max(1, len(teams)), 1)
    weighted = sum(t["avgScore"] * t["totalEvals"] for t in teams)
    cobj["avgScore"] = round(weighted / max(1, sum_evals), 1)
    cobj["avgScore_prev"] = round(cobj["avgScore"] - random.uniform(0.5, 2.5), 1)
    cobj["avgDuration"] = team_dur_avg([a for t in teams for a in t["agents"]])
    cobj["avgDuration_prev"] = cobj["avgDuration"]
    cobj["urgentIssues"] = sum(t["urgentIssues"] for t in teams)
    cobj["urgentIssues_prev"] = max(0, cobj["urgentIssues"] - 1)
    cobj["excludedAgents"] = sum(t["excludedAgents"] for t in teams)
    cobj["excludedAgents_prev"] = 0
    cobj["calls_auto_ib"] = sum(t["calls_auto_ib"] for t in teams)
    cobj["calls_auto_ib_done"] = cobj["calls_auto_ib"]
    cobj["calls_auto_ob"] = sum(t["calls_auto_ob"] for t in teams)
    cobj["calls_auto_ob_done"] = cobj["calls_auto_ob"]
    cobj["calls_manual"] = 0; cobj["calls_manual_done"] = 0
    cobj["calls_auto_ib_prev"] = max(0, cobj["calls_auto_ib"] - random.randint(0,5))
    cobj["calls_auto_ib_done_prev"] = cobj["calls_auto_ib_prev"]
    cobj["calls_auto_ob_prev"] = max(0, cobj["calls_auto_ob"] - random.randint(0,3))
    cobj["calls_auto_ob_done_prev"] = cobj["calls_auto_ob_prev"]
    cobj["calls_manual_prev"] = 0; cobj["calls_manual_done_prev"] = 0
    cobj["avg_score_auto_ib"] = avg_or(80, [e["score"] for t in teams for a in t["agents"] for e in a["evaluations"] if e["callType"]=="I/B" and e["score"]>0])
    cobj["avg_score_auto_ib_prev"] = round(cobj["avg_score_auto_ib"] - 1, 1)
    cobj["avg_score_auto_ob"] = avg_or(80, [e["score"] for t in teams for a in t["agents"] for e in a["evaluations"] if e["callType"]=="O/B" and e["score"]>0])
    cobj["avg_score_auto_ob_prev"] = round(cobj["avg_score_auto_ob"] - 1, 1)
    cobj["avg_score_manual"] = cobj["avgScore"]
    cobj["avg_score_manual_prev"] = round(cobj["avgScore"] - 1, 1)
    d = defaultdict(int)
    for t in teams:
        if t["topDeduction"]["item"] != "-":
            d[t["topDeduction"]["item"]] += t["topDeduction"]["calls"]
    top_item = max(d, key=d.get) if d else "-"
    top_cnt = d.get(top_item, 0)
    cobj["topDeduction"] = {"item": top_item, "calls": top_cnt, "pct": round(top_cnt/max(1,sum_evals)*100)}
    cobj["lowScoreCalls"] = sum(t["lowScoreCalls"] for t in teams)
    cobj["lowScorePct"] = round(cobj["lowScoreCalls"]/max(1,sum_evals)*100, 1)

dummy_obj = {"centers": list(center_id_to_obj.values())}
new_json = json.dumps(dummy_obj, ensure_ascii=False, indent=2)

# === detail-analysis.html 의 const DUMMY = {...} 블록 치환 ===
html_path = ROOT / "pages/admin/detail-analysis.html"
html = html_path.read_text(encoding="utf-8")
pattern = re.compile(r"const DUMMY = \{[\s\S]*?\n    \};", re.MULTILINE)
new_block = f"const DUMMY = {new_json};"
new_html, n = pattern.subn(new_block, html, count=1)
if n == 0:
    print("ERROR: DUMMY 블록 패턴 미일치")
    sys.exit(1)
html_path.write_text(new_html, encoding="utf-8")

print(f"[OK] DUMMY 갱신 완료")
print(f"  센터 {len(dummy_obj['centers'])}개")
print(f"  팀 {sum(len(c['teams']) for c in dummy_obj['centers'])}개")
print(f"  상담사 {sum(len(t['agents']) for c in dummy_obj['centers'] for t in c['teams'])}명")
print(f"  평가 이력 {sum(len(a['evaluations']) for c in dummy_obj['centers'] for t in c['teams'] for a in t['agents'])}건")
