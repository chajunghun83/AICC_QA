/**
 * AICC QA 프로토타입 - 더미 데이터
 * (파일을 직접 열어도 동작하도록 JavaScript에 데이터 포함)
 */

// 워크스페이스-팀 계층 구조
const WORKSPACES_DATA = [
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
      { "id": "team-general3", "name": "일반상담팀", "agent_count": 15 }
    ]
  }
];

// 대시보드 통계
const DASHBOARD_DATA = {
  "total_calls": 1523,
  "total_evaluations": 1247,
  "avg_score": 87.3,
  "completion_rate": 100,
  "prev_day_comparison": {
    "calls": 11.4,
    "evaluations": 7.7,
    "score": 2.5
  },
  "quality_trend_30days": [
    {"date": "2024-01-01", "score": 85.2},
    {"date": "2024-01-03", "score": 85.5},
    {"date": "2024-01-05", "score": 85.8},
    {"date": "2024-01-07", "score": 86.0},
    {"date": "2024-01-10", "score": 86.5},
    {"date": "2024-01-12", "score": 86.3},
    {"date": "2024-01-15", "score": 87.3},
    {"date": "2024-01-17", "score": 87.0},
    {"date": "2024-01-20", "score": 87.1},
    {"date": "2024-01-22", "score": 87.4},
    {"date": "2024-01-25", "score": 87.5},
    {"date": "2024-01-27", "score": 87.6},
    {"date": "2024-01-30", "score": 87.8}
  ],
  "channel_distribution": {
    "all": [
      {"team": "VIP상담팀", "team_id": "team-vip", "count": 380, "percentage": 25},
      {"team": "일반상담팀", "team_id": "team-general", "count": 702, "percentage": 46},
      {"team": "기술지원팀", "team_id": "team-tech", "count": 268, "percentage": 18},
      {"team": "해피콜팀", "team_id": "team-happycall", "count": 173, "percentage": 11}
    ],
    "inbound": [
      {"team": "VIP상담팀", "team_id": "team-vip", "count": 320, "percentage": 30},
      {"team": "일반상담팀", "team_id": "team-general", "count": 520, "percentage": 49},
      {"team": "기술지원팀", "team_id": "team-tech", "count": 220, "percentage": 21}
    ],
    "outbound": [
      {"team": "VIP상담팀", "team_id": "team-vip", "count": 60, "percentage": 13},
      {"team": "일반상담팀", "team_id": "team-general", "count": 182, "percentage": 39},
      {"team": "기술지원팀", "team_id": "team-tech", "count": 48, "percentage": 10},
      {"team": "해피콜팀", "team_id": "team-happycall", "count": 173, "percentage": 38}
    ]
  },
  "urgent_issues": {
    "total": 6,
    "prev_day_diff": 2,
    "breakdown": [
      {"type": "금지어", "icon": "🚨", "count": 1},
      {"type": "불만", "icon": "😠", "count": 2},
      {"type": "과락", "icon": "⚠️", "count": 3}
    ]
  },
  "underperformers": {
    "total": 3,
    "prev_day_diff": 1,
    "breakdown": [
      {"team": "VIP상담팀", "count": 1},
      {"team": "일반상담팀", "count": 1},
      {"team": "기술지원팀", "count": 1}
    ]
  },
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
      "avg_score": 82.5,
      "prev_calls_diff": 32,
      "prev_score_diff": 1.2,
      "item_scores": {
        "pos-neg-empathy": 92,
        "professional-speech": 58,
        "easy-explanation": 79,
        "first-greeting": 88,
        "customer-discomfort": 85,
        "speed": 90
      },
      "issues": [
        {"type": "FAIL(금지어)", "icon": "🚨", "count": 1}
      ]
    },
    {
      "workspace": "서울센터",
      "workspace_id": "ws-seoul",
      "team": "일반상담팀",
      "team_id": "team-general",
      "calls": 702,
      "evaluations": 580,
      "avg_score": 84.8,
      "prev_calls_diff": 58,
      "prev_score_diff": 2.3,
      "item_scores": {
        "pos-neg-empathy": 78,
        "professional-speech": 91,
        "easy-explanation": 85,
        "first-greeting": 90,
        "customer-discomfort": 78,
        "speed": 88
      },
      "issues": [
        {"type": "공감 부족", "icon": "😠", "count": 2}
      ]
    },
    {
      "workspace": "서울센터",
      "workspace_id": "ws-seoul",
      "team": "기술지원팀",
      "team_id": "team-tech",
      "calls": 268,
      "evaluations": 215,
      "avg_score": 69.8,
      "prev_calls_diff": 22,
      "prev_score_diff": -1.5,
      "item_scores": {
        "pos-neg-empathy": 55,
        "professional-speech": 72,
        "easy-explanation": 82,
        "first-greeting": 75,
        "customer-discomfort": 60,
        "speed": 72
      },
      "issues": [
        {"type": "과락", "icon": "⚠️", "count": 3}
      ]
    },
    {
      "workspace": "부산센터",
      "workspace_id": "ws-busan",
      "team": "해피콜팀",
      "team_id": "team-happycall",
      "calls": 173,
      "evaluations": 140,
      "avg_score": 90.8,
      "prev_calls_diff": 44,
      "prev_score_diff": 0.8,
      "item_scores": {
        "pos-neg-empathy": 88,
        "professional-speech": 85,
        "easy-explanation": 90,
        "first-greeting": 92,
        "customer-discomfort": 91,
        "speed": 94
      },
      "issues": []
    }
  ]
};

// 평가 결과 목록
const EVALUATIONS_DATA = [
  {
    "id": "2024-01-15-0023",
    "agent_id": "agent001",
    "agent_name": "홍길동",
    "workspace": "서울센터",
    "team": "VIP상담팀",
    "call_type": "I/B",
    "call_time": "14:32",
    "call_date": "2024-01-15",
    "duration": "6:23",
    "total_score": 92,
    "issues": [],
    "ai_feedback": "고객 감정 전환점에서 훌륭한 공감 표현!",
    "has_dispute": false
  },
  {
    "id": "2024-01-15-0022",
    "agent_id": "agent001",
    "agent_name": "홍길동",
    "workspace": "서울센터",
    "team": "VIP상담팀",
    "call_type": "I/B",
    "call_time": "11:45",
    "call_date": "2024-01-15",
    "duration": "4:22",
    "total_score": 78,
    "issues": ["동시 발화 -2점", "비언어 발화 -1점"],
    "ai_feedback": "고객 불만 시점에서 추가 공감 필요",
    "has_dispute": true
  },
  {
    "id": "2024-01-15-0021",
    "agent_id": "agent001",
    "agent_name": "홍길동",
    "workspace": "서울센터",
    "team": "VIP상담팀",
    "call_type": "I/B",
    "call_time": "09:23",
    "call_date": "2024-01-15",
    "duration": "5:15",
    "total_score": 85,
    "issues": [],
    "ai_feedback": "전반적으로 양호한 상담",
    "has_dispute": false
  },
  {
    "id": "2024-01-15-0020",
    "agent_id": "agent001",
    "agent_name": "홍길동",
    "workspace": "서울센터",
    "team": "VIP상담팀",
    "call_type": "I/B",
    "call_time": "08:52",
    "call_date": "2024-01-15",
    "duration": "8:45",
    "total_score": 58,
    "issues": ["과락 위험", "공감 부진", "응대 지연"],
    "ai_feedback": "전반적인 상담 품질 개선 필요",
    "has_dispute": true
  }
];

console.log('✅ 더미 데이터 로드 완료');
