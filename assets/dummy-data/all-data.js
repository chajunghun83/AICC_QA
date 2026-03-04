/**
 * AICC QA - All Dummy Data (Inline)
 * file:// 프로토콜에서는 fetch로 JSON을 로드할 수 없으므로
 * 모든 JSON 더미 데이터를 window.AICC_DATA에 인라인으로 할당
 * DataLoader가 이 객체를 우선 참조하여 로컬 환경에서도 정상 동작
 *
 * 포함 데이터: workspaces, users, dashboard-stats,
 *   evaluation-items, evaluation-forms, evaluations
 */
window.AICC_DATA = {};

window.AICC_DATA['workspaces.json'] = 
[
  {
    "id": "ws-seoul",
    "name": "서울센터",
    "teams": [
      { "id": "team-vip", "name": "VIP상담팀", "agent_count": 12 },
      { "id": "team-general", "name": "일반상담팀", "agent_count": 25 },
      { "id": "team-tech", "name": "기술지원팀", "agent_count": 18 }
    ]
  },
  {
    "id": "ws-busan",
    "name": "부산센터",
    "teams": [
      { "id": "team-general2", "name": "일반상담팀", "agent_count": 20 },
      { "id": "team-happycall", "name": "해피콜팀", "agent_count": 10 }
    ]
  },
  {
    "id": "ws-daegu",
    "name": "대구센터",
    "teams": [
      { "id": "team-cs", "name": "CS상담팀", "agent_count": 15 },
      { "id": "team-ob", "name": "아웃바운드팀", "agent_count": 8 }
    ]
  }
]
;

window.AICC_DATA['users.json'] = 
[
  { "id": "admin001", "name": "김관리자", "role": "ADMIN", "team": "QA팀", "workspace": "전체", "status": "active" },
  { "id": "admin002", "name": "박팀장", "role": "QA_MANAGER", "team": "QA팀", "workspace": "서울센터", "status": "active" },
  { "id": "agent001", "name": "홍길동", "role": "AGENT", "team": "VIP상담팀", "team_id": "team-vip", "workspace": "서울센터", "workspace_id": "ws-seoul", "status": "active" },
  { "id": "agent002", "name": "이영희", "role": "AGENT", "team": "VIP상담팀", "team_id": "team-vip", "workspace": "서울센터", "workspace_id": "ws-seoul", "status": "active" },
  { "id": "agent003", "name": "김철수", "role": "AGENT", "team": "일반상담팀", "team_id": "team-general", "workspace": "서울센터", "workspace_id": "ws-seoul", "status": "active" },
  { "id": "agent004", "name": "박지민", "role": "AGENT", "team": "일반상담팀", "team_id": "team-general", "workspace": "서울센터", "workspace_id": "ws-seoul", "status": "active" },
  { "id": "agent005", "name": "최수진", "role": "AGENT", "team": "기술지원팀", "team_id": "team-tech", "workspace": "서울센터", "workspace_id": "ws-seoul", "status": "active" },
  { "id": "agent006", "name": "정민호", "role": "AGENT", "team": "기술지원팀", "team_id": "team-tech", "workspace": "서울센터", "workspace_id": "ws-seoul", "status": "active" },
  { "id": "agent007", "name": "강현우", "role": "AGENT", "team": "일반상담팀", "team_id": "team-general2", "workspace": "부산센터", "workspace_id": "ws-busan", "status": "active" },
  { "id": "agent008", "name": "윤서연", "role": "AGENT", "team": "해피콜팀", "team_id": "team-happycall", "workspace": "부산센터", "workspace_id": "ws-busan", "status": "active" }
]
;

window.AICC_DATA['dashboard-stats.json'] = 
{
  "summary": {
    "total_agents": 48,
    "total_agents_prev": 45,
    "total_calls": 1523,
    "total_calls_prev": 1487,
    "avg_score": 82.5,
    "avg_score_prev": 81.2,
    "avg_duration": "6:32",
    "avg_duration_prev": "6:48"
  },
  "channel_distribution": {
    "IB": 890,
    "OB": 357
  },
  "quality_trend_30days": [
    { "date": "01/01", "score": 79.2 },
    { "date": "01/03", "score": 80.1 },
    { "date": "01/05", "score": 79.8 },
    { "date": "01/07", "score": 81.5 },
    { "date": "01/09", "score": 80.8 },
    { "date": "01/11", "score": 82.1 },
    { "date": "01/13", "score": 81.5 },
    { "date": "01/15", "score": 83.0 },
    { "date": "01/17", "score": 82.5 },
    { "date": "01/19", "score": 82.8 },
    { "date": "01/21", "score": 81.9 },
    { "date": "01/23", "score": 83.2 },
    { "date": "01/25", "score": 82.7 },
    { "date": "01/27", "score": 83.5 },
    { "date": "01/29", "score": 82.5 }
  ],
  "team_scores": [
    { "team": "VIP상담팀", "score": 85.2, "color": "#0F766E" },
    { "team": "일반상담팀", "score": 84.8, "color": "#2196F3" },
    { "team": "기술지원팀", "score": 69.8, "color": "#FF9800" },
    { "team": "해피콜팀", "score": 88.1, "color": "#9C27B0" },
    { "team": "CS상담팀", "score": 81.5, "color": "#4CAF50" }
  ],
  "urgent_issues": [
    { "type": "FAIL(금지어)", "count": 1, "team": "VIP상담팀", "agent": "이영희" },
    { "type": "과락", "count": 3, "team": "기술지원팀" },
    { "type": "이의 제기 대기", "count": 5, "status": "pending" }
  ],
  "fail_agents": [
    { "name": "최수진", "team": "기술지원팀", "score": 45.2, "reason": "공감 부족 + 과락" },
    { "name": "정민호", "team": "기술지원팀", "score": 52.1, "reason": "신속성 미달" },
    { "name": "이영희", "team": "VIP상담팀", "score": 58.0, "reason": "FAIL(금지어)" }
  ],
  "improvement_needed_top5": [
    {
      "rank": 1,
      "workspace": "서울센터",
      "team": "기술지원팀",
      "team_id": "team-tech",
      "item": "긍/부정 공감",
      "item_id": "pos-neg-empathy",
      "category": "응대품질 > 공감 멘트",
      "score": 55,
      "status": "danger"
    },
    {
      "rank": 2,
      "workspace": "서울센터",
      "team": "VIP상담팀",
      "team_id": "team-vip",
      "item": "전문적 상담 화법",
      "item_id": "professional-speech",
      "category": "응대품질 > 전문적 상담 태도",
      "score": 58,
      "status": "danger"
    },
    {
      "rank": 3,
      "workspace": "서울센터",
      "team": "기술지원팀",
      "team_id": "team-tech",
      "item": "신속한 응대",
      "item_id": "speed",
      "category": "응대품질 > 전문적 상담 태도",
      "score": 72,
      "status": "warning"
    },
    {
      "rank": 4,
      "workspace": "서울센터",
      "team": "일반상담팀",
      "team_id": "team-general",
      "item": "고객 불편 공감",
      "item_id": "customer-discomfort",
      "category": "응대품질 > 화답인사",
      "score": 78,
      "status": "warning"
    },
    {
      "rank": 5,
      "workspace": "서울센터",
      "team": "VIP상담팀",
      "team_id": "team-vip",
      "item": "쉬운 설명",
      "item_id": "easy-explanation",
      "category": "응대내용 > 해결력",
      "score": 79,
      "status": "warning"
    }
  ],
  "teams": [
    {
      "workspace": "서울센터",
      "workspace_id": "ws-seoul",
      "team": "VIP상담팀",
      "team_id": "team-vip",
      "calls": 380,
      "evaluations": 312,
      "avg_score": 85.2,
      "agent_count": 12,
      "issues": [{ "type": "FAIL(금지어)", "count": 1 }]
    },
    {
      "workspace": "서울센터",
      "workspace_id": "ws-seoul",
      "team": "일반상담팀",
      "team_id": "team-general",
      "calls": 702,
      "evaluations": 580,
      "avg_score": 84.8,
      "agent_count": 25,
      "issues": [{ "type": "공감 부족", "count": 2 }]
    },
    {
      "workspace": "서울센터",
      "workspace_id": "ws-seoul",
      "team": "기술지원팀",
      "team_id": "team-tech",
      "calls": 268,
      "evaluations": 215,
      "avg_score": 69.8,
      "agent_count": 18,
      "issues": [{ "type": "과락", "count": 3 }]
    },
    {
      "workspace": "부산센터",
      "workspace_id": "ws-busan",
      "team": "일반상담팀",
      "team_id": "team-general2",
      "calls": 520,
      "evaluations": 438,
      "avg_score": 83.1,
      "agent_count": 20,
      "issues": []
    },
    {
      "workspace": "부산센터",
      "workspace_id": "ws-busan",
      "team": "해피콜팀",
      "team_id": "team-happycall",
      "calls": 185,
      "evaluations": 172,
      "avg_score": 88.1,
      "agent_count": 10,
      "issues": []
    },
    {
      "workspace": "대구센터",
      "workspace_id": "ws-daegu",
      "team": "CS상담팀",
      "team_id": "team-cs",
      "calls": 310,
      "evaluations": 265,
      "avg_score": 81.5,
      "agent_count": 15,
      "issues": [{ "type": "공감 부족", "count": 1 }]
    },
    {
      "workspace": "대구센터",
      "workspace_id": "ws-daegu",
      "team": "아웃바운드팀",
      "team_id": "team-ob",
      "calls": 158,
      "evaluations": 132,
      "avg_score": 79.3,
      "agent_count": 8,
      "issues": []
    }
  ]
}
;

window.AICC_DATA['evaluation-items.json'] = 
{
  "categories": [
    {
      "id": "response-quality",
      "name": "응대품질",
      "children": [
        {
          "id": "greeting",
          "name": "인사",
          "items": [
            { "id": "first-greeting", "name": "첫인사", "full_name": "스크립트 첫인사 내용대로 발화", "type": "NLP", "default_score": 6, "description": "안녕, 무신사, 서포터 중 포함 여부 확인", "criteria": [{"score": 6, "label": "정상", "desc": "스크립트 인사 발화 포함"}, {"score": 0, "label": "감점", "desc": "첫인사 누락 또는 미흡"}], "used_in": ["I/B 일반 상담 평가표 v2.1", "I/B VIP 평가표 v1.0"], "score_type": "deduction", "is_active": true, "nlp_config": {"method": "script_match", "reference_scripts": ["안녕하세요, 무신사 서포터 OOO입니다. 무엇을 도와드릴까요?"], "keywords": ["안녕", "무신사", "서포터"], "matching_desc": "키워드 중 2개 이상 포함 시 정상 판정"} },
            { "id": "last-greeting", "name": "끝인사", "full_name": "스크립트 끝인사 내용대로 발화", "type": "NLP", "default_score": 6, "description": "마무리 인사 발화 포함 여부 확인", "criteria": [{"score": 6, "label": "정상", "desc": "끝인사 발화 포함"}, {"score": 0, "label": "감점", "desc": "끝인사 누락"}], "used_in": ["I/B 일반 상담 평가표 v2.1"], "score_type": "deduction", "is_active": true, "nlp_config": {"method": "script_match", "reference_scripts": ["감사합니다. 좋은 하루 되세요, 무신사 서포터 OOO이었습니다."], "keywords": ["감사", "좋은 하루", "무신사"], "matching_desc": "마무리 인사 키워드 1개 이상 포함 시 정상 판정"} }
          ]
        },
        {
          "id": "reply-greeting",
          "name": "화답인사",
          "items": [
            { "id": "customer-greeting-reply", "name": "고객 인사 화답", "full_name": "고객의 인사에 대한 적절한 화답", "type": "AI", "default_score": 6, "description": "고객이 인사했을 때 상담사의 적절한 화답 여부 평가", "criteria": [{"score": 6, "label": "정상", "desc": "의미적 유사 화답 표현 포함"}, {"score": 3, "label": "경미", "desc": "단답형 응대 또는 형식적 반응"}, {"score": 0, "label": "심각", "desc": "인사에 무응답"}], "used_in": ["I/B 일반 상담 평가표 v2.1", "I/B VIP 평가표 v1.0"], "score_type": "deduction", "is_active": true, "ai_prompt": "당신은 AICC 품질 관리 전문가입니다.\n고객이 인사를 했을 때 상담사가 적절하게 화답했는지 평가해주세요.\n\n평가 기준:\n1. 의미적으로 유사한 화답 표현이 포함되어 있는지\n2. 단답형이 아닌 자연스러운 화답인지\n\n반드시 근거를 명시하여 응답하세요." },
            { "id": "customer-discomfort", "name": "고객 불편 공감", "full_name": "고객의 불편에 대한 적절한 공감", "type": "AI", "default_score": 6, "description": "고객이 불편을 표현했을 때 공감 여부 평가", "criteria": [{"score": 6, "label": "정상", "desc": "의미적 유사 공감 표현 포함"}, {"score": 3, "label": "경미", "desc": "단답형 응대"}, {"score": 0, "label": "심각", "desc": "고객 불편 무시"}], "used_in": ["I/B 일반 상담 평가표 v2.1"], "score_type": "deduction", "is_active": true, "ai_prompt": "당신은 AICC 품질 관리 전문가입니다.\n고객이 불편을 표현했을 때 상담사가 적절하게 공감했는지 평가해주세요.\n\n평가 기준:\n1. 공감 표현이 포함되어 있는지\n2. 단답형이 아닌 진심 어린 공감인지\n\n반드시 근거를 명시하여 응답하세요." }
          ]
        },
        {
          "id": "empathy",
          "name": "공감 멘트",
          "items": [
            { "id": "pos-neg-empathy", "name": "긍/부정 공감", "full_name": "긍/부정 상황에 대한 충분한 공감", "type": "AI", "default_score": 5, "description": "고객이 긍정 또는 부정의 감정을 표현했을 때 상담사가 충분한 공감과 배려 있는 응대를 했는지 평가", "criteria": [{"score": 5, "label": "정상", "desc": "적절한 공감/호응어 포함"}, {"score": 2, "label": "경미", "desc": "단답형/미미한 수준의 공감"}, {"score": 0, "label": "심각", "desc": "공감 발화 전혀 없음"}], "used_in": ["I/B 일반 상담 평가표 v2.1", "I/B VIP 평가표 v1.0"], "score_type": "deduction", "is_active": true, "ai_prompt": "당신은 AICC 품질 관리 전문가입니다.\n고객이 긍정 또는 부정의 감정을 표현했을 때 상담사가 충분한 공감과 배려 있는 응대를 했는지 평가해주세요.\n\n반드시 근거를 명시하여 응답하세요." }
          ]
        },
        {
          "id": "overlap",
          "name": "말겹침",
          "items": [
            { "id": "simultaneous-speech", "name": "동시 발화", "full_name": "동시 발화가 이루어지지 않게 함", "type": "NLP", "default_score": 6, "description": "상담사와 고객의 동시 발화 발생 시 대처 방식 평가", "criteria": [{"score": 6, "label": "정상", "desc": "말겹침 후 사과/배려 표현"}, {"score": 4, "label": "경미", "desc": "겹침 후 일시 멈춤"}, {"score": 0, "label": "심각", "desc": "상담사 발화 지속(덮어씀)"}], "used_in": ["I/B 일반 상담 평가표 v2.1"], "score_type": "deduction", "is_active": true, "nlp_config": {"method": "pattern_detect", "keywords": ["죄송", "말씀하세요", "네 먼저"], "matching_desc": "상담사-고객 음성 겹침 구간 감지 후, 겹침 이후 상담사의 사과/배려 표현 여부 판정"} }
          ]
        },
        {
          "id": "no-response",
          "name": "무응답",
          "items": [
            { "id": "no-acknowledge", "name": "양해 없는 무응답", "full_name": "고객 양해 없는 무응답 방지", "type": "NLP", "default_score": 5, "description": "15초 이상 무응답 시 양해 멘트 유무 평가", "criteria": [{"score": 5, "label": "정상", "desc": "15초 미만 또는 양해 멘트 3개"}, {"score": 2, "label": "경미", "desc": "15초↑ 무응답, 양해 멘트 ≤1개"}, {"score": 0, "label": "심각", "desc": "15초↑ 무응답, 양해 멘트 없음"}], "used_in": ["I/B 일반 상담 평가표 v2.1"], "score_type": "deduction", "is_active": true, "nlp_config": {"method": "time_measure", "reference_scripts": ["잠시만 기다려주시겠어요?", "확인 중이오니 잠시만요", "잠깐만 기다려주세요"], "keywords": ["잠시만", "기다려", "확인 중"], "matching_desc": "15초 이상 무응답 구간 감지 후, 양해 멘트 키워드 포함 여부 판정"} }
          ]
        },
        {
          "id": "fail",
          "name": "FAIL",
          "items": [
            { "id": "profanity", "name": "욕설/금지어", "full_name": "욕설, 금지어 표현 일체", "type": "NLP", "default_score": 0, "is_fail": true, "description": "욕설, 금지어, 비속어, 한숨/짜증 표현 탐지 시 전 항목 0점 처리", "criteria": [{"score": 0, "label": "FAIL", "desc": "탐지 시 전 항목 0점"}, {"score": 0, "label": "PASS", "desc": "미검출 - 정상 평가 유지"}], "used_in": ["I/B 일반 상담 평가표 v2.1", "I/B VIP 평가표 v1.0", "O/B 텔레마케팅 평가표 v1.3"], "score_type": "deduction", "is_active": true, "nlp_config": {"method": "keyword_detect", "keywords": ["씨발", "개새끼", "지랄", "병신", "한숨", "짜증"], "matching_desc": "금지어 키워드 1개 이상 감지 시 FAIL 판정"} }
          ]
        },
        {
          "id": "professional-attitude",
          "name": "전문적 상담 태도",
          "items": [
            { "id": "interruption", "name": "말끊기", "full_name": "상담원의 의도적인 말겹침", "type": "NLP", "default_score": 5, "description": "고객 발화 중 상담원 개입으로 인한 발화 중단 평가", "criteria": [{"score": 5, "label": "정상", "desc": "정상 청취"}, {"score": 0, "label": "감점", "desc": "고객 발화 중단 → 5초↑ 무발화"}], "used_in": ["I/B 일반 상담 평가표 v2.1"], "score_type": "deduction", "is_active": true, "nlp_config": {"method": "pattern_detect", "keywords": [], "matching_desc": "고객 발화 중 상담사 개입으로 고객 발화가 5초 이상 중단되는 패턴 감지"} },
            { "id": "customer-focus", "name": "고객향 상담", "full_name": "무시/무관심 발화 금지", "type": "AI", "default_score": 5, "description": "무시/무관심 발화 여부 평가 (됐고요, 그래서요? 등)", "criteria": [{"score": 5, "label": "정상", "desc": "무시/무관심 발화 없음"}, {"score": 0, "label": "감점", "desc": "무시 발화 1회 이상"}], "used_in": ["I/B 일반 상담 평가표 v2.1"], "score_type": "deduction", "is_active": true, "ai_prompt": "당신은 AICC 품질 관리 전문가입니다.\n상담사가 고객을 무시하거나 무관심한 발화를 했는지 평가해주세요.\n예: '됐고요', '그래서요?', '그건 제가 알 바 아닙니다' 등\n\n반드시 근거를 명시하여 응답하세요." },
            { "id": "speech-ending", "name": "상담 어미", "full_name": "전문적인 상담 어미", "type": "NLP", "default_score": 5, "description": "공손한 종결 어미 사용 여부 평가 (~습니다, ~세요 등)", "criteria": [{"score": 5, "label": "정상", "desc": "공손한 종결 어미 사용"}, {"score": 0, "label": "감점", "desc": "비격식 발화 ≥3회"}], "used_in": ["I/B 일반 상담 평가표 v2.1"], "score_type": "deduction", "is_active": true, "nlp_config": {"method": "keyword_detect", "keywords": ["~요", "~거든", "~잖아", "~ㅋ"], "matching_desc": "비격식 종결 어미(~요, ~거든, ~잖아 등) 3회 이상 사용 시 감점"} },
            { "id": "professional-speech", "name": "전문적 화법", "full_name": "전문적인 상담 화법", "type": "NLP", "default_score": 5, "description": "비언어 발화(어, 음) 및 비전문적 호응(네네네) 빈도 평가", "criteria": [{"score": 5, "label": "정상", "desc": "비언어 <5회 AND 비전문적 <3회"}, {"score": 4, "label": "경미", "desc": "비전문적 호응 ≥3회"}, {"score": 2, "label": "중간", "desc": "비언어 ≥5회"}, {"score": 0, "label": "복합", "desc": "비언어 ≥5회 AND 비전문적 ≥3회"}], "used_in": ["I/B 일반 상담 평가표 v2.1"], "score_type": "deduction", "is_active": true, "nlp_config": {"method": "keyword_detect", "keywords": ["어", "음", "아", "네네네", "네네", "응응"], "matching_desc": "비언어 발화(어, 음, 아) 5회 이상 또는 비전문적 호응(네네네 등) 3회 이상 시 감점"} },
            { "id": "proactiveness", "name": "적극성(회피)", "full_name": "회피성/추측성 발화 금지", "type": "AI", "default_score": 5, "description": "회피성 또는 추측성 발화 여부 평가", "criteria": [{"score": 5, "label": "정상", "desc": "회피/추측 발화 없음"}, {"score": 2, "label": "감점", "desc": "회피/추측 발화 1회 이상"}], "used_in": ["I/B 일반 상담 평가표 v2.1"], "score_type": "deduction", "is_active": true, "ai_prompt": "당신은 AICC 품질 관리 전문가입니다.\n상담사가 회피성 또는 추측성 발화를 했는지 평가해주세요.\n예: '잘 모르겠는데요', '아마 될 거예요' 등\n\n반드시 근거를 명시하여 응답하세요." },
            { "id": "convenience", "name": "편리(재질의)", "full_name": "고객 정보 재질의 금지", "type": "NLP", "default_score": 5, "description": "이름/연락처/인입사유 중복 질의 여부 평가", "criteria": [{"score": 5, "label": "정상", "desc": "재질의 없음"}, {"score": 0, "label": "감점", "desc": "중복 질의 1회 이상"}], "used_in": ["I/B 일반 상담 평가표 v2.1"], "score_type": "deduction", "is_active": true, "nlp_config": {"method": "pattern_detect", "keywords": ["성함", "이름", "연락처", "전화번호", "어떤 건"], "matching_desc": "이름/연락처/인입사유 관련 키워드가 2회 이상 반복 질의되는 패턴 감지"} },
            { "id": "speed", "name": "신속성", "full_name": "신속한 응대", "type": "NLP", "default_score": 5, "description": "상담사 응답 지연 시간 평가", "criteria": [{"score": 5, "label": "정상", "desc": "1.0초 이내 응답"}, {"score": 2, "label": "경미", "desc": "1.0~3.0초 지연"}, {"score": 0, "label": "중대", "desc": "3.0초 이상 지연"}], "used_in": ["I/B 일반 상담 평가표 v2.1"], "score_type": "deduction", "is_active": true, "nlp_config": {"method": "time_measure", "keywords": [], "matching_desc": "고객 발화 종료 후 상담사 응답까지의 시간 측정 (1.0초 이내 정상, 3.0초 이상 중대)"} },
            { "id": "tone", "name": "어조", "full_name": "불편 어조 금지", "type": "AI", "default_score": 5, "description": "불편 어조 빈도 평가 (하세요, 됩니다 등)", "criteria": [{"score": 5, "label": "정상", "desc": "불편 어조 <3회"}, {"score": 0, "label": "감점", "desc": "불편 어조 ≥3회"}], "used_in": ["I/B 일반 상담 평가표 v2.1"], "score_type": "deduction", "is_active": true, "ai_prompt": "당신은 AICC 품질 관리 전문가입니다.\n상담사의 어조가 불편하거나 불친절하지 않은지 평가해주세요.\n\n반드시 근거를 명시하여 응답하세요." }
          ]
        }
      ]
    },
    {
      "id": "response-content",
      "name": "응대내용",
      "children": [
        {
          "id": "privacy",
          "name": "개인정보처리방침",
          "items": [
            { "id": "required-privacy", "name": "개인정보 확인", "full_name": "필수 개인 정보 확인", "type": "NLP", "default_score": 5, "description": "구매자명, 연락처, 본인 여부 3가지 확인 수행", "criteria": [{"score": 5, "label": "정상", "desc": "필수 항목 3개 모두 수행"}, {"score": 0, "label": "감점", "desc": "0~2개만 수행"}], "used_in": ["I/B 일반 상담 평가표 v2.1"], "score_type": "deduction", "is_active": true, "nlp_config": {"method": "keyword_detect", "reference_scripts": ["고객님 성함을 말씀해주시겠어요?", "연락 받으실 번호 확인 부탁드립니다", "본인 확인 부탁드리겠습니다"], "keywords": ["성함", "이름", "연락처", "전화번호", "본인"], "matching_desc": "구매자명, 연락처, 본인 여부 확인 키워드 3가지 모두 포함 시 정상 판정"} }
          ]
        },
        {
          "id": "resolution",
          "name": "해결력",
          "items": [
            { "id": "problem-solve", "name": "문제 해결", "full_name": "고객의 문의나 궁금증에 대한 해결", "type": "AI", "default_score": 5, "description": "모든 의도에 구체적/정확한 안내 제공 여부", "criteria": [{"score": 5, "label": "완전", "desc": "모든 의도에 안내 제공"}, {"score": 3, "label": "미흡", "desc": "의도 인지, 구체 안내 없이 종료"}, {"score": 0, "label": "미해결", "desc": "안내 전혀 없음"}], "used_in": ["I/B 일반 상담 평가표 v2.1", "I/B VIP 평가표 v1.0"], "score_type": "deduction", "is_active": true, "ai_prompt": "당신은 AICC 품질 관리 전문가입니다.\n고객의 문의나 궁금증에 대해 상담사가 구체적이고 정확한 안내를 제공했는지 평가해주세요.\n\n반드시 근거를 명시하여 응답하세요." },
            { "id": "easy-explanation", "name": "쉬운 설명", "full_name": "고객이 이해할 수 있는 설명", "type": "AI", "default_score": 5, "description": "내부용어 사용 빈도 및 고객 재질의 여부 평가", "criteria": [{"score": 5, "label": "정상", "desc": "재질의 없음, 내부용어 ≤2회"}, {"score": 3, "label": "경미", "desc": "내부용어 ≥3회"}, {"score": 0, "label": "심각", "desc": "고객 재질의 ≥2회"}], "used_in": ["I/B 일반 상담 평가표 v2.1"], "score_type": "deduction", "is_active": true, "ai_prompt": "당신은 AICC 품질 관리 전문가입니다.\n상담사가 고객이 이해할 수 있는 쉬운 설명을 제공했는지 평가해주세요.\n내부용어 사용 빈도와 고객 재질의 여부를 확인하세요.\n\n반드시 근거를 명시하여 응답하세요." },
            { "id": "active-response", "name": "적극적 응대", "full_name": "고객 편의를 위한 적극적 상담", "type": "AI", "default_score": 6, "description": "고객 요청 시 적극 대응/대안 제시 여부 평가", "criteria": [{"score": 6, "label": "정상", "desc": "적극 대응/대안 제시"}, {"score": 4, "label": "경미", "desc": "규정 외/예외적/셀프 표현 사용"}, {"score": 2, "label": "심각", "desc": "규정상 불가 류 3회 이상"}], "used_in": ["I/B 일반 상담 평가표 v2.1", "I/B VIP 평가표 v1.0"], "score_type": "deduction", "is_active": true, "ai_prompt": "당신은 AICC 품질 관리 전문가입니다.\n상담사가 고객 요청에 적극적으로 대응하고 대안을 제시했는지 평가해주세요.\n\n반드시 근거를 명시하여 응답하세요." }
          ]
        }
      ]
    },
    {
      "id": "service",
      "name": "서비스",
      "status": "추후확장",
      "children": [
        {
          "id": "accuracy",
          "name": "정확성",
          "items": [
            { "id": "cancel-fee", "name": "취소 환불 수수료", "type": "AI", "default_score": 5, "description": "취소 환불 수수료 안내 정확성", "criteria": [], "used_in": [], "score_type": "deduction", "is_active": false },
            { "id": "cancel-amount", "name": "취소 금액 안내", "type": "AI", "default_score": 5, "description": "취소 금액 안내 정확성", "criteria": [], "used_in": [], "score_type": "deduction", "is_active": false },
            { "id": "cancel-timing", "name": "취소 가능 시점", "type": "AI", "default_score": 5, "description": "취소 가능 시점 안내 정확성", "criteria": [], "used_in": [], "score_type": "deduction", "is_active": false },
            { "id": "product-info", "name": "상품정보", "type": "AI", "default_score": 5, "description": "상품정보 안내 정확성", "criteria": [], "used_in": [], "score_type": "deduction", "is_active": false }
          ]
        }
      ]
    }
  ]
}
;

window.AICC_DATA['evaluation-forms.json'] = 
[
  {
    "id": "form-ib-general",
    "name": "I/B 일반 상담 평가표",
    "version": "v2.1",
    "type": "I/B",
    "status": "active",
    "total_score": 100,
    "created_at": "2024-01-01",
    "updated_at": "2024-01-14",
    "created_by": "김관리자",
    "sections": [
      {
        "id": "sec-greeting",
        "name": "인사 및 안내",
        "total_score": 24,
        "fail_threshold": null,
        "items": [
          { "item_id": "first-greeting", "name": "첫인사", "score": 6, "type": "NLP" },
          { "item_id": "last-greeting", "name": "끝인사", "score": 6, "type": "NLP" },
          { "item_id": "customer-greeting-reply", "name": "고객 인사 화답", "score": 6, "type": "AI" },
          { "item_id": "customer-discomfort", "name": "고객 불편 공감", "score": 6, "type": "AI" }
        ]
      },
      {
        "id": "sec-empathy",
        "name": "고객 공감",
        "total_score": 11,
        "fail_threshold": 5,
        "items": [
          { "item_id": "pos-neg-empathy", "name": "긍/부정 공감", "score": 5, "type": "AI" },
          { "item_id": "simultaneous-speech", "name": "동시 발화", "score": 6, "type": "NLP" }
        ]
      },
      {
        "id": "sec-professional",
        "name": "전문적 상담 태도",
        "total_score": 45,
        "fail_threshold": null,
        "items": [
          { "item_id": "no-acknowledge", "name": "양해 없는 무응답", "score": 5, "type": "NLP" },
          { "item_id": "interruption", "name": "말끊기", "score": 5, "type": "NLP" },
          { "item_id": "customer-focus", "name": "고객향 상담", "score": 5, "type": "AI" },
          { "item_id": "speech-ending", "name": "상담 어미", "score": 5, "type": "NLP" },
          { "item_id": "professional-speech", "name": "전문적 화법", "score": 5, "type": "NLP" },
          { "item_id": "proactiveness", "name": "적극성(회피)", "score": 5, "type": "AI" },
          { "item_id": "convenience", "name": "편리(재질의)", "score": 5, "type": "NLP" },
          { "item_id": "speed", "name": "신속성", "score": 5, "type": "NLP" },
          { "item_id": "tone", "name": "어조", "score": 5, "type": "AI" }
        ]
      },
      {
        "id": "sec-content",
        "name": "응대내용",
        "total_score": 21,
        "fail_threshold": null,
        "items": [
          { "item_id": "required-privacy", "name": "개인정보 확인", "score": 5, "type": "NLP" },
          { "item_id": "problem-solve", "name": "문제 해결", "score": 5, "type": "AI" },
          { "item_id": "easy-explanation", "name": "쉬운 설명", "score": 5, "type": "AI" },
          { "item_id": "active-response", "name": "적극적 응대", "score": 6, "type": "AI" }
        ]
      }
    ],
    "fail_rule": { "item_id": "profanity", "name": "욕설/금지어", "description": "탐지 시 전 항목 0점 처리" },
    "pass_threshold": 60,
    "applied_to": ["ws-seoul", "ws-busan"],
    "applied_teams": "전체"
  },
  {
    "id": "form-ib-vip",
    "name": "I/B VIP 평가표",
    "version": "v1.0",
    "type": "I/B",
    "status": "active",
    "total_score": 100,
    "created_at": "2024-01-05",
    "updated_at": "2024-01-12",
    "created_by": "김관리자",
    "sections": [
      {
        "id": "sec-greeting-vip",
        "name": "VIP 인사",
        "total_score": 30,
        "fail_threshold": 15,
        "items": [
          { "item_id": "first-greeting", "name": "첫인사", "score": 8, "type": "NLP" },
          { "item_id": "customer-greeting-reply", "name": "고객 인사 화답", "score": 10, "type": "AI" },
          { "item_id": "pos-neg-empathy", "name": "긍/부정 공감", "score": 12, "type": "AI" }
        ]
      },
      {
        "id": "sec-resolve-vip",
        "name": "문제 해결력",
        "total_score": 40,
        "fail_threshold": 20,
        "items": [
          { "item_id": "problem-solve", "name": "문제 해결", "score": 15, "type": "AI" },
          { "item_id": "easy-explanation", "name": "쉬운 설명", "score": 10, "type": "AI" },
          { "item_id": "active-response", "name": "적극적 응대", "score": 15, "type": "AI" }
        ]
      },
      {
        "id": "sec-manner-vip",
        "name": "상담 매너",
        "total_score": 30,
        "fail_threshold": null,
        "items": [
          { "item_id": "customer-focus", "name": "고객향 상담", "score": 10, "type": "AI" },
          { "item_id": "tone", "name": "어조", "score": 10, "type": "AI" },
          { "item_id": "professional-speech", "name": "전문적 화법", "score": 10, "type": "NLP" }
        ]
      }
    ],
    "fail_rule": { "item_id": "profanity", "name": "욕설/금지어", "description": "탐지 시 전 항목 0점 처리" },
    "pass_threshold": 70,
    "applied_to": ["ws-seoul"],
    "applied_teams": "VIP상담팀"
  },
  {
    "id": "form-ob-tele",
    "name": "O/B 텔레마케팅 평가표",
    "version": "v1.3",
    "type": "O/B",
    "status": "active",
    "total_score": 100,
    "created_at": "2023-12-15",
    "updated_at": "2024-01-10",
    "created_by": "박팀장",
    "sections": [
      {
        "id": "sec-opening-ob",
        "name": "오프닝",
        "total_score": 25,
        "fail_threshold": null,
        "items": [
          { "item_id": "first-greeting", "name": "첫인사", "score": 10, "type": "NLP" },
          { "item_id": "required-privacy", "name": "개인정보 확인", "score": 15, "type": "NLP" }
        ]
      },
      {
        "id": "sec-persuasion-ob",
        "name": "설득력",
        "total_score": 45,
        "fail_threshold": null,
        "items": [
          { "item_id": "problem-solve", "name": "상품 설명", "score": 15, "type": "AI" },
          { "item_id": "easy-explanation", "name": "쉬운 설명", "score": 15, "type": "AI" },
          { "item_id": "active-response", "name": "적극적 제안", "score": 15, "type": "AI" }
        ]
      },
      {
        "id": "sec-closing-ob",
        "name": "클로징",
        "total_score": 30,
        "fail_threshold": null,
        "items": [
          { "item_id": "last-greeting", "name": "끝인사", "score": 10, "type": "NLP" },
          { "item_id": "customer-focus", "name": "고객향 상담", "score": 10, "type": "AI" },
          { "item_id": "tone", "name": "어조", "score": 10, "type": "AI" }
        ]
      }
    ],
    "fail_rule": { "item_id": "profanity", "name": "욕설/금지어", "description": "탐지 시 전 항목 0점 처리" },
    "pass_threshold": 60,
    "applied_to": ["ws-busan", "ws-daegu"],
    "applied_teams": "아웃바운드팀, 해피콜팀"
  }
]
;

window.AICC_DATA['evaluations.json'] = 
[
  {
    "id": "2024-01-10-0001",
    "agent_id": "agent001",
    "agent_name": "홍길동",
    "workspace": "서울센터",
    "workspace_id": "ws-seoul",
    "team": "VIP상담팀",
    "team_id": "team-vip",
    "call_type": "I/B",
    "date": "2024-01-10",
    "call_time": "09:15",
    "duration": "5:42",
    "total_score": 96,
    "max_score": 100,
    "confidence": "High",
    "scores": {
      "first-greeting": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "customer-greeting-reply": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 96
      },
      "pos-neg-empathy": {
        "score": 5,
        "max": 5,
        "type": "AI",
        "status": "pass",
        "confidence": 94
      },
      "simultaneous-speech": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "no-acknowledge": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "profanity": {
        "score": 0,
        "max": 0,
        "type": "NLP",
        "status": "pass",
        "is_fail": true
      },
      "interruption": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "customer-focus": {
        "score": 5,
        "max": 5,
        "type": "AI",
        "status": "pass",
        "confidence": 91
      },
      "speech-ending": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "professional-speech": {
        "score": 5,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "비언어 발화 2회"
      },
      "proactiveness": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 93
      },
      "convenience": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "speed": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "tone": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 95
      },
      "required-privacy": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "problem-solve": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 92
      },
      "easy-explanation": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 90
      },
      "active-response": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 94
      }
    },
    "fail_items": [],
    "issues": [
      "비언어 발화 2회 -1점"
    ],
    "ai_feedback": "전반적으로 매우 우수한 상담입니다. 고객 요구사항을 정확히 파악하고 신속하게 처리하였습니다. 비언어 발화만 줄이면 만점 가능합니다.",
    "transcript": [
      {
        "speaker": "agent",
        "time": "00:01",
        "text": "안녕하세요, VIP 고객님. 무신사 서포터 홍길동입니다. 무엇을 도와드릴까요?"
      },
      {
        "speaker": "customer",
        "time": "00:05",
        "text": "네, 안녕하세요. 제가 주문한 한정판 스니커즈 배송 상태를 확인하고 싶어서요."
      },
      {
        "speaker": "agent",
        "time": "00:10",
        "text": "네, 한정판 스니커즈 배송 확인 도와드리겠습니다. 주문번호 확인 부탁드리겠습니다."
      },
      {
        "speaker": "customer",
        "time": "00:15",
        "text": "주문번호는 MU-2024-00158입니다."
      },
      {
        "speaker": "agent",
        "time": "00:20",
        "text": "확인하겠습니다. 잠시만 기다려주세요. 네, 확인되었습니다. 현재 물류센터에서 출고되어 내일 오전 중 도착 예정입니다."
      },
      {
        "speaker": "customer",
        "time": "00:30",
        "text": "아, 다행이네요. 감사합니다."
      },
      {
        "speaker": "agent",
        "time": "00:33",
        "text": "도움이 되어 기쁩니다. 혹시 다른 문의사항 있으신가요?"
      },
      {
        "speaker": "customer",
        "time": "00:36",
        "text": "아뇨, 없습니다."
      },
      {
        "speaker": "agent",
        "time": "00:38",
        "text": "감사합니다. 좋은 하루 되세요!"
      }
    ],
    "eval_form": "I/B VIP 평가표 v1.0",
    "consultation_type": "배송 > 배송조회 > 한정판 스니커즈"
  },
  {
    "id": "2024-01-10-0002",
    "agent_id": "agent002",
    "agent_name": "이영희",
    "workspace": "서울센터",
    "workspace_id": "ws-seoul",
    "team": "VIP상담팀",
    "team_id": "team-vip",
    "call_type": "I/B",
    "date": "2024-01-10",
    "call_time": "10:45",
    "duration": "8:17",
    "total_score": 89,
    "max_score": 100,
    "confidence": "High",
    "scores": {
      "first-greeting": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "customer-greeting-reply": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 93
      },
      "pos-neg-empathy": {
        "score": 5,
        "max": 5,
        "type": "AI",
        "status": "pass",
        "confidence": 88
      },
      "simultaneous-speech": {
        "score": 4,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "겹침 후 일시 멈춤"
      },
      "no-acknowledge": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "profanity": {
        "score": 0,
        "max": 0,
        "type": "NLP",
        "status": "pass",
        "is_fail": true
      },
      "interruption": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "customer-focus": {
        "score": 5,
        "max": 5,
        "type": "AI",
        "status": "pass",
        "confidence": 87
      },
      "speech-ending": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "professional-speech": {
        "score": 4,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "비언어 발화 5회"
      },
      "proactiveness": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 91
      },
      "convenience": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "speed": {
        "score": 5,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "응답 지연 1회 (8초)"
      },
      "tone": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 90
      },
      "required-privacy": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "problem-solve": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 82,
        "reason": "해결 과정 안내 부족"
      },
      "easy-explanation": {
        "score": 4,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 78,
        "reason": "전문 용어 사용 2회"
      },
      "active-response": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 92
      }
    },
    "fail_items": [],
    "issues": [
      "동시 발화 구간 -2점",
      "비언어 발화 5회 -2점",
      "응답 지연 1회 -1점",
      "전문 용어 사용 2회 -2점"
    ],
    "ai_feedback": "고객 응대 태도는 훌륭하나 전문 용어를 쉬운 말로 바꿔 설명하는 연습이 필요합니다. 동시 발화 시 배려 표현을 추가해주세요.",
    "transcript": [
      {
        "speaker": "agent",
        "time": "00:01",
        "text": "안녕하세요, VIP 고객님. 무신사 서포터 이영희입니다. 어떤 도움이 필요하신가요?"
      },
      {
        "speaker": "customer",
        "time": "00:06",
        "text": "환불 요청했는데 아직 처리가 안 됐어요. 벌써 일주일이나 지났거든요."
      },
      {
        "speaker": "agent",
        "time": "00:12",
        "text": "아, 환불 처리가 지연되고 있군요. 불편을 드려 정말 죄송합니다. 바로 확인해드리겠습니다."
      },
      {
        "speaker": "customer",
        "time": "00:18",
        "text": "빨리 좀 해주세요. 급한 건데..."
      },
      {
        "speaker": "agent",
        "time": "00:21",
        "text": "네, 고객님. 최우선으로 처리 도와드리겠습니다. 주문번호 말씀해주시겠어요?"
      },
      {
        "speaker": "customer",
        "time": "00:25",
        "text": "MU-2024-00089요."
      },
      {
        "speaker": "agent",
        "time": "00:30",
        "text": "확인되었습니다. 결제 대행사 정산 지연으로 인해 환불이 늦어진 점 양해 부탁드립니다. 지금 바로 수동 처리하여 오늘 중 환불 완료되도록 하겠습니다."
      },
      {
        "speaker": "customer",
        "time": "00:40",
        "text": "네, 알겠습니다. 오늘 중으로 되는 거죠?"
      },
      {
        "speaker": "agent",
        "time": "00:43",
        "text": "네, 맞습니다. 처리 완료되면 문자로 안내드리겠습니다. 다른 문의사항 있으실까요?"
      },
      {
        "speaker": "customer",
        "time": "00:47",
        "text": "없어요. 감사합니다."
      },
      {
        "speaker": "agent",
        "time": "00:49",
        "text": "감사합니다. 좋은 하루 보내세요!"
      }
    ],
    "eval_form": "I/B VIP 평가표 v1.0",
    "consultation_type": "결제 > 환불처리 > 환불지연"
  },
  {
    "id": "2024-01-11-0003",
    "agent_id": "agent003",
    "agent_name": "김철수",
    "workspace": "서울센터",
    "workspace_id": "ws-seoul",
    "team": "일반상담팀",
    "team_id": "team-general",
    "call_type": "I/B",
    "date": "2024-01-11",
    "call_time": "11:22",
    "duration": "12:05",
    "total_score": 68,
    "max_score": 100,
    "confidence": "Medium",
    "scores": {
      "first-greeting": {
        "score": 4,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "인사말 일부 누락"
      },
      "customer-greeting-reply": {
        "score": 4,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 76,
        "reason": "고객 인사에 형식적 응답"
      },
      "pos-neg-empathy": {
        "score": 3,
        "max": 5,
        "type": "AI",
        "status": "warn",
        "confidence": 72,
        "reason": "공감 표현 부족"
      },
      "simultaneous-speech": {
        "score": 3,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "겹침 3회 발생"
      },
      "no-acknowledge": {
        "score": 3,
        "max": 5,
        "type": "NLP",
        "status": "warn",
        "reason": "무응답 구간 2회 (5초 이상)"
      },
      "profanity": {
        "score": 0,
        "max": 0,
        "type": "NLP",
        "status": "pass",
        "is_fail": true
      },
      "interruption": {
        "score": 3,
        "max": 5,
        "type": "NLP",
        "status": "warn",
        "reason": "고객 발화 중 끼어들기 2회"
      },
      "customer-focus": {
        "score": 4,
        "max": 5,
        "type": "AI",
        "status": "warn",
        "confidence": 74,
        "reason": "고객 요구 반복 확인 부족"
      },
      "speech-ending": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "professional-speech": {
        "score": 4,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "비언어 발화 4회"
      },
      "proactiveness": {
        "score": 4,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 75,
        "reason": "추가 안내 미흡"
      },
      "convenience": {
        "score": 5,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "speed": {
        "score": 4,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "응답 지연 2회 (10초, 7초)"
      },
      "tone": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 80
      },
      "required-privacy": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "problem-solve": {
        "score": 4,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 73,
        "reason": "문제 해결 절차 안내 미흡"
      },
      "easy-explanation": {
        "score": 3,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 70,
        "reason": "설명이 장황함"
      },
      "active-response": {
        "score": 4,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 76,
        "reason": "적극적 대안 제시 부족"
      }
    },
    "fail_items": [],
    "issues": [
      "인사말 일부 누락 -2점",
      "공감 표현 부족 -2점",
      "겹침 3회 -3점",
      "무응답 구간 2회 -2점",
      "고객 발화 중 끼어들기 2회 -2점",
      "비언어 발화 4회 -2점",
      "응답 지연 2회 -2점",
      "설명 장황 -3점"
    ],
    "ai_feedback": "전반적으로 개선이 필요한 상담입니다. 고객 발화를 끝까지 경청하고, 공감 표현을 적극 활용해주세요. 설명을 간결하게 정리하는 연습이 필요합니다.",
    "transcript": [
      {
        "speaker": "agent",
        "time": "00:01",
        "text": "네, 무신사입니다."
      },
      {
        "speaker": "customer",
        "time": "00:03",
        "text": "안녕하세요, 사이즈 교환하고 싶은데요."
      },
      {
        "speaker": "agent",
        "time": "00:06",
        "text": "네, 교환이요. 주문번호 알려주세요."
      },
      {
        "speaker": "customer",
        "time": "00:09",
        "text": "MU-2024-00234인데요, 사이즈가 좀 작아서..."
      },
      {
        "speaker": "agent",
        "time": "00:12",
        "text": "아, 네 그러면 교환 접수 해드릴게요. 원하시는 사이즈가 어떻게 되세요?"
      },
      {
        "speaker": "customer",
        "time": "00:17",
        "text": "L사이즈로 바꿔주세요. 그런데 교환하면 배송비는..."
      },
      {
        "speaker": "agent",
        "time": "00:19",
        "text": "배송비는 사이즈 교환이니까 무료로 처리됩니다."
      },
      {
        "speaker": "customer",
        "time": "00:23",
        "text": "아 그렇군요. 감사합니다."
      },
      {
        "speaker": "agent",
        "time": "00:25",
        "text": "네, 교환 접수 완료되었습니다. 다른 문의 있으세요?"
      },
      {
        "speaker": "customer",
        "time": "00:28",
        "text": "없습니다."
      },
      {
        "speaker": "agent",
        "time": "00:30",
        "text": "감사합니다. 좋은 하루 되세요."
      }
    ],
    "eval_form": "I/B 일반 상담 평가표 v2.1",
    "consultation_type": "교환/반품 > 사이즈교환"
  },
  {
    "id": "2024-01-11-0004",
    "agent_id": "agent004",
    "agent_name": "박지민",
    "workspace": "서울센터",
    "workspace_id": "ws-seoul",
    "team": "일반상담팀",
    "team_id": "team-general",
    "call_type": "I/B",
    "date": "2024-01-11",
    "call_time": "14:08",
    "duration": "4:53",
    "total_score": 91,
    "max_score": 100,
    "confidence": "High",
    "scores": {
      "first-greeting": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "customer-greeting-reply": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 95
      },
      "pos-neg-empathy": {
        "score": 5,
        "max": 5,
        "type": "AI",
        "status": "pass",
        "confidence": 92
      },
      "simultaneous-speech": {
        "score": 5,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "겹침 1회 발생"
      },
      "no-acknowledge": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "profanity": {
        "score": 0,
        "max": 0,
        "type": "NLP",
        "status": "pass",
        "is_fail": true
      },
      "interruption": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "customer-focus": {
        "score": 5,
        "max": 5,
        "type": "AI",
        "status": "pass",
        "confidence": 89
      },
      "speech-ending": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "professional-speech": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "proactiveness": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 84,
        "reason": "추가 정보 안내 1건 누락"
      },
      "convenience": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "speed": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "tone": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 93
      },
      "required-privacy": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "problem-solve": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 85,
        "reason": "대안 제시 시 구체성 부족"
      },
      "easy-explanation": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 87
      },
      "active-response": {
        "score": 4,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 80,
        "reason": "고객 추가 질문에 소극적 응답"
      }
    },
    "fail_items": [],
    "issues": [
      "겹침 1회 -1점",
      "추가 정보 안내 1건 누락 -1점",
      "대안 제시 구체성 부족 -1점",
      "추가 질문에 소극적 응답 -2점"
    ],
    "ai_feedback": "안정적이고 깔끔한 상담입니다. 고객 추가 질문에 좀 더 적극적으로 대응하면 더욱 좋은 평가를 받을 수 있습니다.",
    "transcript": [],
    "eval_form": "I/B 일반 상담 평가표 v2.1",
    "consultation_type": "상품문의 > 의류 > 사이즈안내"
  },
  {
    "id": "2024-01-12-0005",
    "agent_id": "agent005",
    "agent_name": "최수진",
    "workspace": "서울센터",
    "workspace_id": "ws-seoul",
    "team": "기술지원팀",
    "team_id": "team-tech",
    "call_type": "I/B",
    "date": "2024-01-12",
    "call_time": "09:30",
    "duration": "15:42",
    "total_score": 85,
    "max_score": 100,
    "confidence": "High",
    "scores": {
      "first-greeting": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "customer-greeting-reply": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 91
      },
      "pos-neg-empathy": {
        "score": 4,
        "max": 5,
        "type": "AI",
        "status": "warn",
        "confidence": 79,
        "reason": "초반 공감 표현 지연"
      },
      "simultaneous-speech": {
        "score": 5,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "겹침 1회"
      },
      "no-acknowledge": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "profanity": {
        "score": 0,
        "max": 0,
        "type": "NLP",
        "status": "pass",
        "is_fail": true
      },
      "interruption": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "customer-focus": {
        "score": 5,
        "max": 5,
        "type": "AI",
        "status": "pass",
        "confidence": 86
      },
      "speech-ending": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "professional-speech": {
        "score": 5,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "비언어 발화 3회"
      },
      "proactiveness": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 90
      },
      "convenience": {
        "score": 5,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "안내 절차 복잡"
      },
      "speed": {
        "score": 4,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "시스템 조회 지연 3회"
      },
      "tone": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 88
      },
      "required-privacy": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "problem-solve": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 84
      },
      "easy-explanation": {
        "score": 3,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 72,
        "reason": "기술 용어 과다 사용"
      },
      "active-response": {
        "score": 4,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 78,
        "reason": "고객 이해도 확인 부족"
      }
    },
    "fail_items": [],
    "issues": [
      "초반 공감 표현 지연 -1점",
      "겹침 1회 -1점",
      "비언어 발화 3회 -1점",
      "안내 절차 복잡 -1점",
      "시스템 조회 지연 3회 -2점",
      "기술 용어 과다 사용 -3점",
      "고객 이해도 확인 부족 -2점"
    ],
    "ai_feedback": "기술적 내용을 고객 눈높이에 맞춰 설명하는 연습이 필요합니다. 전문 용어 대신 일상 표현을 활용해주세요. 문제 해결 능력은 우수합니다.",
    "transcript": [],
    "eval_form": "I/B 일반 상담 평가표 v2.1",
    "consultation_type": "기술지원 > 앱오류 > 로그인실패"
  },
  {
    "id": "2024-01-12-0006",
    "agent_id": "agent006",
    "agent_name": "정민호",
    "workspace": "서울센터",
    "workspace_id": "ws-seoul",
    "team": "기술지원팀",
    "team_id": "team-tech",
    "call_type": "I/B",
    "date": "2024-01-12",
    "call_time": "13:55",
    "duration": "9:31",
    "total_score": 78,
    "max_score": 100,
    "confidence": "Medium",
    "scores": {
      "first-greeting": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "customer-greeting-reply": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 80,
        "reason": "고객 인사에 늦은 응답"
      },
      "pos-neg-empathy": {
        "score": 3,
        "max": 5,
        "type": "AI",
        "status": "warn",
        "confidence": 74,
        "reason": "공감 표현 미흡"
      },
      "simultaneous-speech": {
        "score": 4,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "겹침 2회"
      },
      "no-acknowledge": {
        "score": 4,
        "max": 5,
        "type": "NLP",
        "status": "warn",
        "reason": "무응답 구간 1회 (6초)"
      },
      "profanity": {
        "score": 0,
        "max": 0,
        "type": "NLP",
        "status": "pass",
        "is_fail": true
      },
      "interruption": {
        "score": 4,
        "max": 5,
        "type": "NLP",
        "status": "warn",
        "reason": "끼어들기 1회"
      },
      "customer-focus": {
        "score": 4,
        "max": 5,
        "type": "AI",
        "status": "warn",
        "confidence": 77,
        "reason": "고객 요구사항 재확인 부족"
      },
      "speech-ending": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "professional-speech": {
        "score": 4,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "비언어 발화 6회"
      },
      "proactiveness": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 82
      },
      "convenience": {
        "score": 5,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "speed": {
        "score": 5,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "tone": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 81
      },
      "required-privacy": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "problem-solve": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 83
      },
      "easy-explanation": {
        "score": 4,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 75,
        "reason": "설명 구조 미정리"
      },
      "active-response": {
        "score": 4,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 76,
        "reason": "후속 조치 안내 미흡"
      }
    },
    "fail_items": [],
    "issues": [
      "고객 인사 늦은 응답 -1점",
      "공감 표현 미흡 -2점",
      "겹침 2회 -2점",
      "무응답 구간 1회 -1점",
      "끼어들기 1회 -1점",
      "비언어 발화 6회 -2점",
      "설명 구조 미정리 -2점",
      "후속 조치 안내 미흡 -2점"
    ],
    "ai_feedback": "고객 감정에 대한 공감 표현을 강화해야 합니다. 기술 설명 시 단계별로 정리하여 안내하면 고객 이해도가 높아질 것입니다.",
    "transcript": [],
    "eval_form": "I/B 일반 상담 평가표 v2.1",
    "consultation_type": "기술지원 > 결제오류 > 카드결제"
  },
  {
    "id": "2024-01-13-0007",
    "agent_id": "agent007",
    "agent_name": "강현우",
    "workspace": "부산센터",
    "workspace_id": "ws-busan",
    "team": "일반상담팀",
    "team_id": "team-general2",
    "call_type": "I/B",
    "date": "2024-01-13",
    "call_time": "10:10",
    "duration": "7:18",
    "total_score": 72,
    "max_score": 100,
    "confidence": "Medium",
    "scores": {
      "first-greeting": {
        "score": 5,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "인사말 속도 빠름"
      },
      "customer-greeting-reply": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 78,
        "reason": "형식적 답변"
      },
      "pos-neg-empathy": {
        "score": 3,
        "max": 5,
        "type": "AI",
        "status": "warn",
        "confidence": 73,
        "reason": "부정적 감정 전환 실패"
      },
      "simultaneous-speech": {
        "score": 4,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "겹침 2회"
      },
      "no-acknowledge": {
        "score": 4,
        "max": 5,
        "type": "NLP",
        "status": "warn",
        "reason": "무응답 구간 1회"
      },
      "profanity": {
        "score": 0,
        "max": 0,
        "type": "NLP",
        "status": "pass",
        "is_fail": true
      },
      "interruption": {
        "score": 3,
        "max": 5,
        "type": "NLP",
        "status": "warn",
        "reason": "끼어들기 2회"
      },
      "customer-focus": {
        "score": 4,
        "max": 5,
        "type": "AI",
        "status": "warn",
        "confidence": 75,
        "reason": "고객 의도 파악 지연"
      },
      "speech-ending": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "professional-speech": {
        "score": 4,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "반말 혼용 1회"
      },
      "proactiveness": {
        "score": 4,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 76,
        "reason": "선제적 안내 부족"
      },
      "convenience": {
        "score": 5,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "speed": {
        "score": 5,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "tone": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 79
      },
      "required-privacy": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "problem-solve": {
        "score": 4,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 74,
        "reason": "1차 해결률 낮음"
      },
      "easy-explanation": {
        "score": 3,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 71,
        "reason": "반복 설명 필요"
      },
      "active-response": {
        "score": 3,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 72,
        "reason": "고객 요청에 수동적 대응"
      }
    },
    "fail_items": [],
    "issues": [
      "인사말 속도 빠름 -1점",
      "형식적 답변 -1점",
      "부정적 감정 전환 실패 -2점",
      "겹침 2회 -2점",
      "무응답 구간 1회 -1점",
      "끼어들기 2회 -2점",
      "반말 혼용 1회 -2점",
      "반복 설명 필요 -3점",
      "수동적 대응 -3점"
    ],
    "ai_feedback": "고객 감정 변화에 민감하게 반응하는 훈련이 필요합니다. 끼어들기 습관을 교정하고, 적극적인 문제 해결 자세를 보여주세요.",
    "transcript": [],
    "eval_form": "I/B 일반 상담 평가표 v2.1",
    "consultation_type": "배송 > 배송비 > 추가배송비 외 2건"
  },
  {
    "id": "2024-01-13-0008",
    "agent_id": "agent008",
    "agent_name": "윤서연",
    "workspace": "부산센터",
    "workspace_id": "ws-busan",
    "team": "해피콜팀",
    "team_id": "team-happycall",
    "call_type": "O/B",
    "date": "2024-01-13",
    "call_time": "15:20",
    "duration": "3:45",
    "total_score": 94,
    "max_score": 100,
    "confidence": "High",
    "scores": {
      "first-greeting": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "customer-greeting-reply": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 97
      },
      "pos-neg-empathy": {
        "score": 5,
        "max": 5,
        "type": "AI",
        "status": "pass",
        "confidence": 95
      },
      "simultaneous-speech": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "no-acknowledge": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "profanity": {
        "score": 0,
        "max": 0,
        "type": "NLP",
        "status": "pass",
        "is_fail": true
      },
      "interruption": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "customer-focus": {
        "score": 5,
        "max": 5,
        "type": "AI",
        "status": "pass",
        "confidence": 93
      },
      "speech-ending": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "professional-speech": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "proactiveness": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 94
      },
      "convenience": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "speed": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "tone": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 96
      },
      "required-privacy": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "problem-solve": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 85,
        "reason": "후속 조치 구체성 부족"
      },
      "easy-explanation": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 88
      },
      "active-response": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 91
      }
    },
    "fail_items": [],
    "issues": [
      "후속 조치 구체성 부족 -1점"
    ],
    "ai_feedback": "매우 우수한 해피콜 상담입니다. 밝은 톤과 적극적인 태도가 돋보입니다. 후속 조치 안내 시 구체적인 일정을 함께 말씀해주시면 완벽합니다.",
    "transcript": [],
    "eval_form": "O/B 텔레마케팅 평가표 v1.3",
    "consultation_type": "해피콜 > 만족도조사 > 배송완료"
  },
  {
    "id": "2024-01-14-0009",
    "agent_id": "agent001",
    "agent_name": "홍길동",
    "workspace": "서울센터",
    "workspace_id": "ws-seoul",
    "team": "VIP상담팀",
    "team_id": "team-vip",
    "call_type": "O/B",
    "date": "2024-01-14",
    "call_time": "11:05",
    "duration": "4:12",
    "total_score": 93,
    "max_score": 100,
    "confidence": "High",
    "scores": {
      "first-greeting": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "customer-greeting-reply": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 94
      },
      "pos-neg-empathy": {
        "score": 5,
        "max": 5,
        "type": "AI",
        "status": "pass",
        "confidence": 91
      },
      "simultaneous-speech": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "no-acknowledge": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "profanity": {
        "score": 0,
        "max": 0,
        "type": "NLP",
        "status": "pass",
        "is_fail": true
      },
      "interruption": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "customer-focus": {
        "score": 5,
        "max": 5,
        "type": "AI",
        "status": "pass",
        "confidence": 90
      },
      "speech-ending": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "professional-speech": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "proactiveness": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 93
      },
      "convenience": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "speed": {
        "score": 5,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "초반 응답 지연 1회"
      },
      "tone": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 92
      },
      "required-privacy": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "problem-solve": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 89
      },
      "easy-explanation": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 91
      },
      "active-response": {
        "score": 4,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 81,
        "reason": "아웃바운드 목적 전달 지연"
      }
    },
    "fail_items": [],
    "issues": [
      "초반 응답 지연 1회 -1점",
      "아웃바운드 목적 전달 지연 -2점"
    ],
    "ai_feedback": "VIP 고객 관리 아웃바운드에서 우수한 성과를 보였습니다. 통화 초반에 목적을 명확히 전달하면 더욱 효율적인 상담이 가능합니다.",
    "transcript": [],
    "eval_form": "O/B 텔레마케팅 평가표 v1.3",
    "consultation_type": "VIP관리 > 프로모션안내 > 시즌할인"
  },
  {
    "id": "2024-01-14-0010",
    "agent_id": "agent003",
    "agent_name": "김철수",
    "workspace": "서울센터",
    "workspace_id": "ws-seoul",
    "team": "일반상담팀",
    "team_id": "team-general",
    "call_type": "I/B",
    "date": "2024-01-14",
    "call_time": "16:33",
    "duration": "18:27",
    "total_score": 55,
    "max_score": 100,
    "confidence": "Low",
    "scores": {
      "first-greeting": {
        "score": 3,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "인사말 불완전"
      },
      "customer-greeting-reply": {
        "score": 3,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 71,
        "reason": "무성의한 응답"
      },
      "pos-neg-empathy": {
        "score": 2,
        "max": 5,
        "type": "AI",
        "status": "fail",
        "confidence": 70,
        "reason": "공감 표현 전무"
      },
      "simultaneous-speech": {
        "score": 2,
        "max": 6,
        "type": "NLP",
        "status": "fail",
        "reason": "겹침 5회 이상"
      },
      "no-acknowledge": {
        "score": 2,
        "max": 5,
        "type": "NLP",
        "status": "fail",
        "reason": "무응답 구간 4회 (최대 12초)"
      },
      "profanity": {
        "score": 0,
        "max": 0,
        "type": "NLP",
        "status": "pass",
        "is_fail": true
      },
      "interruption": {
        "score": 2,
        "max": 5,
        "type": "NLP",
        "status": "fail",
        "reason": "끼어들기 4회"
      },
      "customer-focus": {
        "score": 3,
        "max": 5,
        "type": "AI",
        "status": "warn",
        "confidence": 72,
        "reason": "고객 요구 무시 1회"
      },
      "speech-ending": {
        "score": 4,
        "max": 5,
        "type": "NLP",
        "status": "warn",
        "reason": "종료 인사 간략"
      },
      "professional-speech": {
        "score": 3,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "비언어 발화 8회, 한숨 1회"
      },
      "proactiveness": {
        "score": 3,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 71,
        "reason": "수동적 응대"
      },
      "convenience": {
        "score": 4,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "절차 안내 누락"
      },
      "speed": {
        "score": 3,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "응답 지연 5회"
      },
      "tone": {
        "score": 4,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 73,
        "reason": "피로감 있는 톤"
      },
      "required-privacy": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "problem-solve": {
        "score": 4,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 74,
        "reason": "해결 미완료"
      },
      "easy-explanation": {
        "score": 3,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 70,
        "reason": "두서없는 설명"
      },
      "active-response": {
        "score": 4,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 72,
        "reason": "고객 불만에 방어적 태도"
      }
    },
    "fail_items": [],
    "issues": [
      "인사말 불완전 -3점",
      "무성의한 응답 -3점",
      "공감 표현 전무 -3점",
      "겹침 5회 이상 -4점",
      "무응답 구간 4회 -3점",
      "끼어들기 4회 -3점",
      "비언어 발화 8회, 한숨 -3점",
      "응답 지연 5회 -3점",
      "두서없는 설명 -3점"
    ],
    "ai_feedback": "전반적으로 상담 품질이 크게 미달합니다. 고객 감정에 공감하고 경청하는 자세가 시급히 필요합니다. 코칭 대상으로 분류됩니다.",
    "transcript": [],
    "eval_form": "I/B 일반 상담 평가표 v2.1",
    "consultation_type": "교환/반품 > 반품접수 > 불량상품"
  },
  {
    "id": "2024-01-15-0011",
    "agent_id": "agent002",
    "agent_name": "이영희",
    "workspace": "서울센터",
    "workspace_id": "ws-seoul",
    "team": "VIP상담팀",
    "team_id": "team-vip",
    "call_type": "I/B",
    "date": "2024-01-15",
    "call_time": "09:48",
    "duration": "6:55",
    "total_score": 92,
    "max_score": 100,
    "confidence": "High",
    "scores": {
      "first-greeting": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "customer-greeting-reply": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 95
      },
      "pos-neg-empathy": {
        "score": 5,
        "max": 5,
        "type": "AI",
        "status": "pass",
        "confidence": 93
      },
      "simultaneous-speech": {
        "score": 5,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "겹침 1회"
      },
      "no-acknowledge": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "profanity": {
        "score": 0,
        "max": 0,
        "type": "NLP",
        "status": "pass",
        "is_fail": true
      },
      "interruption": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "customer-focus": {
        "score": 5,
        "max": 5,
        "type": "AI",
        "status": "pass",
        "confidence": 90
      },
      "speech-ending": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "professional-speech": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "proactiveness": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 92
      },
      "convenience": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "speed": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "tone": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 94
      },
      "required-privacy": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "problem-solve": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 84,
        "reason": "대안 제시 1건 부족"
      },
      "easy-explanation": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 87
      },
      "active-response": {
        "score": 4,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 82,
        "reason": "마무리 시 추가 안내 누락"
      }
    },
    "fail_items": [],
    "issues": [
      "겹침 1회 -1점",
      "대안 제시 1건 부족 -1점",
      "마무리 시 추가 안내 누락 -2점"
    ],
    "ai_feedback": "고객 응대 품질이 매우 높습니다. 상담 마무리 시 관련 추가 정보를 안내하면 고객 만족도를 더 높일 수 있습니다.",
    "transcript": [],
    "eval_form": "I/B VIP 평가표 v1.0",
    "consultation_type": "상품문의 > 신발 > 재입고문의"
  },
  {
    "id": "2024-01-15-0012",
    "agent_id": "agent004",
    "agent_name": "박지민",
    "workspace": "서울센터",
    "workspace_id": "ws-seoul",
    "team": "일반상담팀",
    "team_id": "team-general",
    "call_type": "O/B",
    "date": "2024-01-15",
    "call_time": "14:22",
    "duration": "3:18",
    "total_score": 88,
    "max_score": 100,
    "confidence": "High",
    "scores": {
      "first-greeting": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "customer-greeting-reply": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 92
      },
      "pos-neg-empathy": {
        "score": 5,
        "max": 5,
        "type": "AI",
        "status": "pass",
        "confidence": 89
      },
      "simultaneous-speech": {
        "score": 5,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "겹침 1회"
      },
      "no-acknowledge": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "profanity": {
        "score": 0,
        "max": 0,
        "type": "NLP",
        "status": "pass",
        "is_fail": true
      },
      "interruption": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "customer-focus": {
        "score": 5,
        "max": 5,
        "type": "AI",
        "status": "pass",
        "confidence": 88
      },
      "speech-ending": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "professional-speech": {
        "score": 5,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "비언어 발화 2회"
      },
      "proactiveness": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 86
      },
      "convenience": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "speed": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "tone": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 83,
        "reason": "단조로운 억양"
      },
      "required-privacy": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "problem-solve": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 85
      },
      "easy-explanation": {
        "score": 4,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 79,
        "reason": "프로모션 설명 복잡"
      },
      "active-response": {
        "score": 4,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 80,
        "reason": "아웃바운드 클로징 미흡"
      }
    },
    "fail_items": [],
    "issues": [
      "겹침 1회 -1점",
      "비언어 발화 2회 -1점",
      "단조로운 억양 -1점",
      "프로모션 설명 복잡 -2점",
      "아웃바운드 클로징 미흡 -2점"
    ],
    "ai_feedback": "아웃바운드 상담 시 핵심 메시지를 간결하게 전달하는 연습이 필요합니다. 프로모션 안내를 간결하게 요약하고, 명확한 클로징 멘트를 활용하세요.",
    "transcript": [],
    "eval_form": "O/B 텔레마케팅 평가표 v1.3",
    "consultation_type": "프로모션 > 쿠폰안내 > 생일쿠폰"
  },
  {
    "id": "2024-01-16-0013",
    "agent_id": "agent005",
    "agent_name": "최수진",
    "workspace": "서울센터",
    "workspace_id": "ws-seoul",
    "team": "기술지원팀",
    "team_id": "team-tech",
    "call_type": "I/B",
    "date": "2024-01-16",
    "call_time": "11:40",
    "duration": "22:15",
    "total_score": 80,
    "max_score": 100,
    "confidence": "Medium",
    "scores": {
      "first-greeting": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "customer-greeting-reply": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 82,
        "reason": "고객 감정 인식 지연"
      },
      "pos-neg-empathy": {
        "score": 4,
        "max": 5,
        "type": "AI",
        "status": "warn",
        "confidence": 77,
        "reason": "공감 표현 타이밍 부적절"
      },
      "simultaneous-speech": {
        "score": 5,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "겹침 1회"
      },
      "no-acknowledge": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "profanity": {
        "score": 0,
        "max": 0,
        "type": "NLP",
        "status": "pass",
        "is_fail": true
      },
      "interruption": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "customer-focus": {
        "score": 4,
        "max": 5,
        "type": "AI",
        "status": "warn",
        "confidence": 78,
        "reason": "기술 설명에 치우침"
      },
      "speech-ending": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "professional-speech": {
        "score": 5,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "비언어 발화 3회"
      },
      "proactiveness": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 85
      },
      "convenience": {
        "score": 4,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "안내 절차 복잡"
      },
      "speed": {
        "score": 4,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "조회 지연 2회"
      },
      "tone": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 84
      },
      "required-privacy": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "problem-solve": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 91
      },
      "easy-explanation": {
        "score": 3,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 73,
        "reason": "기술 용어 빈번 사용"
      },
      "active-response": {
        "score": 3,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 74,
        "reason": "고객 이해 확인 미흡"
      }
    },
    "fail_items": [],
    "issues": [
      "고객 감정 인식 지연 -1점",
      "공감 표현 타이밍 부적절 -1점",
      "겹침 1회 -1점",
      "기술 설명에 치우침 -1점",
      "비언어 발화 3회 -1점",
      "안내 절차 복잡 -2점",
      "조회 지연 2회 -2점",
      "기술 용어 빈번 사용 -3점",
      "고객 이해 확인 미흡 -3점"
    ],
    "ai_feedback": "기술 문제 해결 능력은 뛰어나나, 고객 눈높이에서 설명하는 역량 강화가 필요합니다. 설명 후 고객 이해도를 반드시 확인하세요.",
    "transcript": [],
    "eval_form": "I/B 일반 상담 평가표 v2.1",
    "consultation_type": "기술지원 > 시스템장애 > 주문내역조회"
  },
  {
    "id": "2024-01-16-0014",
    "agent_id": "agent007",
    "agent_name": "강현우",
    "workspace": "부산센터",
    "workspace_id": "ws-busan",
    "team": "일반상담팀",
    "team_id": "team-general2",
    "call_type": "I/B",
    "date": "2024-01-16",
    "call_time": "15:05",
    "duration": "10:48",
    "total_score": 45,
    "max_score": 100,
    "confidence": "Low",
    "scores": {
      "first-greeting": {
        "score": 3,
        "max": 6,
        "type": "NLP",
        "status": "fail",
        "reason": "인사말 누락"
      },
      "customer-greeting-reply": {
        "score": 2,
        "max": 6,
        "type": "AI",
        "status": "fail",
        "confidence": 70,
        "reason": "고객 인사 무시"
      },
      "pos-neg-empathy": {
        "score": 1,
        "max": 5,
        "type": "AI",
        "status": "fail",
        "confidence": 70,
        "reason": "공감 전무, 사무적 응대"
      },
      "simultaneous-speech": {
        "score": 2,
        "max": 6,
        "type": "NLP",
        "status": "fail",
        "reason": "겹침 6회 이상"
      },
      "no-acknowledge": {
        "score": 1,
        "max": 5,
        "type": "NLP",
        "status": "fail",
        "reason": "무응답 구간 5회 (최대 15초)"
      },
      "profanity": {
        "score": 0,
        "max": 0,
        "type": "NLP",
        "status": "fail",
        "is_fail": true,
        "reason": "부적절한 표현 감지: '짜증나네'"
      },
      "interruption": {
        "score": 1,
        "max": 5,
        "type": "NLP",
        "status": "fail",
        "reason": "끼어들기 5회"
      },
      "customer-focus": {
        "score": 2,
        "max": 5,
        "type": "AI",
        "status": "fail",
        "confidence": 70,
        "reason": "고객 요구 무시 반복"
      },
      "speech-ending": {
        "score": 3,
        "max": 5,
        "type": "NLP",
        "status": "warn",
        "reason": "종료 인사 미흡"
      },
      "professional-speech": {
        "score": 2,
        "max": 6,
        "type": "NLP",
        "status": "fail",
        "reason": "반말 사용 3회, 한숨 2회"
      },
      "proactiveness": {
        "score": 3,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 71,
        "reason": "완전 수동적 응대"
      },
      "convenience": {
        "score": 4,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "절차 안내 부실"
      },
      "speed": {
        "score": 3,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "응답 지연 6회"
      },
      "tone": {
        "score": 3,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 70,
        "reason": "짜증 섞인 톤"
      },
      "required-privacy": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "problem-solve": {
        "score": 3,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 71,
        "reason": "문제 미해결"
      },
      "easy-explanation": {
        "score": 3,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 70,
        "reason": "설명 불성실"
      },
      "active-response": {
        "score": 3,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 70,
        "reason": "고객 요청 거부적 태도"
      }
    },
    "fail_items": [
      "profanity"
    ],
    "issues": [
      "인사말 누락 -3점",
      "고객 인사 무시 -4점",
      "공감 전무 -4점",
      "겹침 6회 이상 -4점",
      "무응답 구간 5회 -4점",
      "부적절한 표현 감지 FAIL",
      "끼어들기 5회 -4점",
      "고객 요구 무시 반복 -3점",
      "반말 사용 3회, 한숨 2회 -4점",
      "응답 지연 6회 -3점",
      "짜증 섞인 톤 -3점",
      "문제 미해결 -3점"
    ],
    "ai_feedback": "심각한 서비스 품질 저하가 감지되었습니다. 부적절한 표현 사용으로 FAIL 처리됩니다. 긴급 코칭 및 관리자 면담이 필요합니다. 고객 존중과 경청 자세를 반드시 개선해야 합니다.",
    "transcript": [],
    "eval_form": "I/B 일반 상담 평가표 v2.1",
    "consultation_type": "결제 > 결제취소 > 중복결제"
  },
  {
    "id": "2024-01-17-0015",
    "agent_id": "agent008",
    "agent_name": "윤서연",
    "workspace": "부산센터",
    "workspace_id": "ws-busan",
    "team": "해피콜팀",
    "team_id": "team-happycall",
    "call_type": "O/B",
    "date": "2024-01-17",
    "call_time": "10:30",
    "duration": "4:02",
    "total_score": 90,
    "max_score": 100,
    "confidence": "High",
    "scores": {
      "first-greeting": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "customer-greeting-reply": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 94
      },
      "pos-neg-empathy": {
        "score": 5,
        "max": 5,
        "type": "AI",
        "status": "pass",
        "confidence": 91
      },
      "simultaneous-speech": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "no-acknowledge": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "profanity": {
        "score": 0,
        "max": 0,
        "type": "NLP",
        "status": "pass",
        "is_fail": true
      },
      "interruption": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "customer-focus": {
        "score": 5,
        "max": 5,
        "type": "AI",
        "status": "pass",
        "confidence": 90
      },
      "speech-ending": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "professional-speech": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "proactiveness": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 84,
        "reason": "추가 서비스 안내 누락"
      },
      "convenience": {
        "score": 5,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "안내 순서 혼동"
      },
      "speed": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "tone": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 93
      },
      "required-privacy": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "problem-solve": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 87
      },
      "easy-explanation": {
        "score": 4,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 80,
        "reason": "혜택 설명 시 핵심 누락"
      },
      "active-response": {
        "score": 4,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 81,
        "reason": "고객 거절 시 대응 미흡"
      }
    },
    "fail_items": [],
    "issues": [
      "추가 서비스 안내 누락 -1점",
      "안내 순서 혼동 -1점",
      "혜택 설명 시 핵심 누락 -2점",
      "고객 거절 시 대응 미흡 -2점"
    ],
    "ai_feedback": "해피콜 응대 품질이 좋습니다. 고객 거절 시 부드럽게 재안내하는 스킬을 연습하면 아웃바운드 성과가 더욱 향상될 것입니다.",
    "transcript": [],
    "eval_form": "O/B 텔레마케팅 평가표 v1.3",
    "consultation_type": "해피콜 > 서비스개선 > 배송피드백"
  },
  {
    "id": "2024-01-17-0016",
    "agent_id": "agent006",
    "agent_name": "정민호",
    "workspace": "서울센터",
    "workspace_id": "ws-seoul",
    "team": "기술지원팀",
    "team_id": "team-tech",
    "call_type": "I/B",
    "date": "2024-01-17",
    "call_time": "16:48",
    "duration": "11:33",
    "total_score": 82,
    "max_score": 100,
    "confidence": "Medium",
    "scores": {
      "first-greeting": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "customer-greeting-reply": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 88
      },
      "pos-neg-empathy": {
        "score": 4,
        "max": 5,
        "type": "AI",
        "status": "warn",
        "confidence": 78,
        "reason": "공감 타이밍 늦음"
      },
      "simultaneous-speech": {
        "score": 5,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "겹침 1회"
      },
      "no-acknowledge": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "profanity": {
        "score": 0,
        "max": 0,
        "type": "NLP",
        "status": "pass",
        "is_fail": true
      },
      "interruption": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "customer-focus": {
        "score": 5,
        "max": 5,
        "type": "AI",
        "status": "pass",
        "confidence": 85
      },
      "speech-ending": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "professional-speech": {
        "score": 5,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "비언어 발화 3회"
      },
      "proactiveness": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 83
      },
      "convenience": {
        "score": 5,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "speed": {
        "score": 4,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "시스템 조회 지연 2회"
      },
      "tone": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 84
      },
      "required-privacy": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "problem-solve": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 86
      },
      "easy-explanation": {
        "score": 3,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 74,
        "reason": "기술 전문어 다수 사용"
      },
      "active-response": {
        "score": 3,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 75,
        "reason": "고객 질문에 불완전한 답변"
      }
    },
    "fail_items": [],
    "issues": [
      "공감 타이밍 늦음 -1점",
      "겹침 1회 -1점",
      "비언어 발화 3회 -1점",
      "시스템 조회 지연 2회 -2점",
      "기술 전문어 다수 사용 -3점",
      "고객 질문에 불완전한 답변 -3점"
    ],
    "ai_feedback": "기술지원 역량은 양호하나, 고객이 이해하기 쉬운 표현으로 설명하는 훈련이 필요합니다. 고객 질문에 완전한 답변을 제공하는 습관을 길러주세요.",
    "transcript": [],
    "eval_form": "I/B 일반 상담 평가표 v2.1",
    "consultation_type": "기술지원 > 앱오류 > 장바구니오류"
  },
  {
    "id": "2024-01-18-0017",
    "agent_id": "agent001",
    "agent_name": "홍길동",
    "workspace": "서울센터",
    "workspace_id": "ws-seoul",
    "team": "VIP상담팀",
    "team_id": "team-vip",
    "call_type": "I/B",
    "date": "2024-01-18",
    "call_time": "10:22",
    "duration": "7:08",
    "total_score": 95,
    "max_score": 100,
    "confidence": "High",
    "scores": {
      "first-greeting": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "customer-greeting-reply": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 97
      },
      "pos-neg-empathy": {
        "score": 5,
        "max": 5,
        "type": "AI",
        "status": "pass",
        "confidence": 95
      },
      "simultaneous-speech": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "no-acknowledge": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "profanity": {
        "score": 0,
        "max": 0,
        "type": "NLP",
        "status": "pass",
        "is_fail": true
      },
      "interruption": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "customer-focus": {
        "score": 5,
        "max": 5,
        "type": "AI",
        "status": "pass",
        "confidence": 93
      },
      "speech-ending": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "professional-speech": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "proactiveness": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 95
      },
      "convenience": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "speed": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "tone": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 96
      },
      "required-privacy": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "problem-solve": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 94
      },
      "easy-explanation": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 86,
        "reason": "약관 설명 시 간소화 필요"
      },
      "active-response": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 91
      }
    },
    "fail_items": [],
    "issues": [
      "약관 설명 시 간소화 필요 -1점"
    ],
    "ai_feedback": "탁월한 VIP 상담 사례입니다. 고객 니즈를 선제적으로 파악하고 완벽하게 응대했습니다. 약관 관련 설명을 좀 더 쉽게 풀어서 안내하면 만점입니다.",
    "transcript": [],
    "eval_form": "I/B VIP 평가표 v1.0",
    "consultation_type": "상품문의 > 가방 > 정품확인"
  },
  {
    "id": "2024-01-18-0018",
    "agent_id": "agent003",
    "agent_name": "김철수",
    "workspace": "서울센터",
    "workspace_id": "ws-seoul",
    "team": "일반상담팀",
    "team_id": "team-general",
    "call_type": "I/B",
    "date": "2024-01-18",
    "call_time": "14:50",
    "duration": "9:42",
    "total_score": 62,
    "max_score": 100,
    "confidence": "Low",
    "scores": {
      "first-greeting": {
        "score": 4,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "인사 톤 낮음"
      },
      "customer-greeting-reply": {
        "score": 4,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 73,
        "reason": "형식적 응대"
      },
      "pos-neg-empathy": {
        "score": 2,
        "max": 5,
        "type": "AI",
        "status": "fail",
        "confidence": 71,
        "reason": "고객 불만에 공감 부재"
      },
      "simultaneous-speech": {
        "score": 3,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "겹침 4회"
      },
      "no-acknowledge": {
        "score": 3,
        "max": 5,
        "type": "NLP",
        "status": "warn",
        "reason": "무응답 구간 3회"
      },
      "profanity": {
        "score": 0,
        "max": 0,
        "type": "NLP",
        "status": "pass",
        "is_fail": true
      },
      "interruption": {
        "score": 3,
        "max": 5,
        "type": "NLP",
        "status": "warn",
        "reason": "끼어들기 3회"
      },
      "customer-focus": {
        "score": 3,
        "max": 5,
        "type": "AI",
        "status": "warn",
        "confidence": 72,
        "reason": "고객 맥락 파악 부족"
      },
      "speech-ending": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "professional-speech": {
        "score": 3,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "비언어 발화 7회"
      },
      "proactiveness": {
        "score": 3,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 72,
        "reason": "안내 누락 다수"
      },
      "convenience": {
        "score": 4,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "이관 절차 복잡"
      },
      "speed": {
        "score": 4,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "응답 지연 3회"
      },
      "tone": {
        "score": 4,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 74,
        "reason": "무기력한 톤"
      },
      "required-privacy": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "problem-solve": {
        "score": 4,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 73,
        "reason": "부분 해결만 완료"
      },
      "easy-explanation": {
        "score": 3,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 71,
        "reason": "설명 불충분"
      },
      "active-response": {
        "score": 4,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 73,
        "reason": "소극적 응대"
      }
    },
    "fail_items": [],
    "issues": [
      "인사 톤 낮음 -2점",
      "형식적 응대 -2점",
      "고객 불만에 공감 부재 -3점",
      "겹침 4회 -3점",
      "무응답 구간 3회 -2점",
      "끼어들기 3회 -2점",
      "비언어 발화 7회 -3점",
      "응답 지연 3회 -2점",
      "설명 불충분 -3점"
    ],
    "ai_feedback": "지속적으로 품질 저하가 관찰됩니다. 고객 공감 능력과 적극적 응대 자세를 집중적으로 교육받으시기 바랍니다. 관리자 모니터링이 권장됩니다.",
    "transcript": [],
    "eval_form": "I/B 일반 상담 평가표 v2.1",
    "consultation_type": "배송 > 배송지연 > 택배분실 외 1건"
  },
  {
    "id": "2024-01-19-0019",
    "agent_id": "agent004",
    "agent_name": "박지민",
    "workspace": "서울센터",
    "workspace_id": "ws-seoul",
    "team": "일반상담팀",
    "team_id": "team-general",
    "call_type": "I/B",
    "date": "2024-01-19",
    "call_time": "09:05",
    "duration": "5:28",
    "total_score": 87,
    "max_score": 100,
    "confidence": "High",
    "scores": {
      "first-greeting": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "customer-greeting-reply": {
        "score": 6,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 91
      },
      "pos-neg-empathy": {
        "score": 5,
        "max": 5,
        "type": "AI",
        "status": "pass",
        "confidence": 88
      },
      "simultaneous-speech": {
        "score": 5,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "겹침 1회"
      },
      "no-acknowledge": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "profanity": {
        "score": 0,
        "max": 0,
        "type": "NLP",
        "status": "pass",
        "is_fail": true
      },
      "interruption": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "customer-focus": {
        "score": 5,
        "max": 5,
        "type": "AI",
        "status": "pass",
        "confidence": 87
      },
      "speech-ending": {
        "score": 5,
        "max": 5,
        "type": "NLP",
        "status": "pass"
      },
      "professional-speech": {
        "score": 5,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "비언어 발화 2회"
      },
      "proactiveness": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 84
      },
      "convenience": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "speed": {
        "score": 5,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "조회 지연 1회"
      },
      "tone": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 85
      },
      "required-privacy": {
        "score": 6,
        "max": 6,
        "type": "NLP",
        "status": "pass"
      },
      "problem-solve": {
        "score": 5,
        "max": 6,
        "type": "AI",
        "status": "pass",
        "confidence": 86
      },
      "easy-explanation": {
        "score": 4,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 79,
        "reason": "정책 설명 시 구체성 부족"
      },
      "active-response": {
        "score": 4,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 80,
        "reason": "후속 안내 간략"
      }
    },
    "fail_items": [],
    "issues": [
      "겹침 1회 -1점",
      "비언어 발화 2회 -1점",
      "조회 지연 1회 -1점",
      "정책 설명 시 구체성 부족 -2점",
      "후속 안내 간략 -2점"
    ],
    "ai_feedback": "안정적인 상담 품질을 유지하고 있습니다. 정책 안내 시 구체적인 예시를 들어 설명하면 고객 이해도를 높일 수 있습니다.",
    "transcript": [],
    "eval_form": "I/B 일반 상담 평가표 v2.1",
    "consultation_type": "회원 > 정보변경 > 배송지변경"
  },
  {
    "id": "2024-01-20-0020",
    "agent_id": "agent007",
    "agent_name": "강현우",
    "workspace": "부산센터",
    "workspace_id": "ws-busan",
    "team": "일반상담팀",
    "team_id": "team-general2",
    "call_type": "O/B",
    "date": "2024-01-20",
    "call_time": "11:15",
    "duration": "6:52",
    "total_score": 48,
    "max_score": 100,
    "confidence": "Low",
    "scores": {
      "first-greeting": {
        "score": 4,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "아웃바운드 인사 불완전"
      },
      "customer-greeting-reply": {
        "score": 3,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 71,
        "reason": "목적 전달 지연"
      },
      "pos-neg-empathy": {
        "score": 2,
        "max": 5,
        "type": "AI",
        "status": "fail",
        "confidence": 70,
        "reason": "고객 거절에 강압적 응대"
      },
      "simultaneous-speech": {
        "score": 2,
        "max": 6,
        "type": "NLP",
        "status": "fail",
        "reason": "겹침 5회"
      },
      "no-acknowledge": {
        "score": 2,
        "max": 5,
        "type": "NLP",
        "status": "fail",
        "reason": "무응답 구간 4회"
      },
      "profanity": {
        "score": 0,
        "max": 0,
        "type": "NLP",
        "status": "fail",
        "is_fail": true,
        "reason": "부적절한 표현 감지: '아 진짜'"
      },
      "interruption": {
        "score": 1,
        "max": 5,
        "type": "NLP",
        "status": "fail",
        "reason": "끼어들기 6회"
      },
      "customer-focus": {
        "score": 2,
        "max": 5,
        "type": "AI",
        "status": "fail",
        "confidence": 70,
        "reason": "고객 의사 무시"
      },
      "speech-ending": {
        "score": 3,
        "max": 5,
        "type": "NLP",
        "status": "warn",
        "reason": "종료 인사 급하게 마무리"
      },
      "professional-speech": {
        "score": 2,
        "max": 6,
        "type": "NLP",
        "status": "fail",
        "reason": "반말 2회, 비언어 발화 9회"
      },
      "proactiveness": {
        "score": 3,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 70,
        "reason": "강압적 설득 시도"
      },
      "convenience": {
        "score": 3,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "안내 체계 없음"
      },
      "speed": {
        "score": 4,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "응답 지연 3회"
      },
      "tone": {
        "score": 3,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 70,
        "reason": "불친절한 톤"
      },
      "required-privacy": {
        "score": 5,
        "max": 6,
        "type": "NLP",
        "status": "warn",
        "reason": "본인확인 절차 간소화 위반"
      },
      "problem-solve": {
        "score": 3,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 70,
        "reason": "목적 달성 실패"
      },
      "easy-explanation": {
        "score": 3,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 70,
        "reason": "혜택 설명 불명확"
      },
      "active-response": {
        "score": 3,
        "max": 6,
        "type": "AI",
        "status": "warn",
        "confidence": 70,
        "reason": "고객 거절 후 부적절 반응"
      }
    },
    "fail_items": [
      "profanity"
    ],
    "issues": [
      "아웃바운드 인사 불완전 -2점",
      "목적 전달 지연 -3점",
      "고객 거절에 강압적 응대 -3점",
      "겹침 5회 -4점",
      "무응답 구간 4회 -3점",
      "부적절한 표현 감지 FAIL",
      "끼어들기 6회 -4점",
      "고객 의사 무시 -3점",
      "반말 2회, 비언어 발화 9회 -4점",
      "불친절한 톤 -3점",
      "본인확인 절차 간소화 위반 -1점",
      "혜택 설명 불명확 -3점"
    ],
    "ai_feedback": "아웃바운드 상담 시 부적절한 표현과 강압적 태도가 감지되어 FAIL 처리됩니다. 고객 거절 시 존중하는 자세가 필수적입니다. 즉각 코칭 및 재교육이 필요합니다.",
    "transcript": [],
    "eval_form": "O/B 텔레마케팅 평가표 v1.3",
    "consultation_type": "프로모션 > 멤버십안내 > 등급혜택"
  }
]
;
