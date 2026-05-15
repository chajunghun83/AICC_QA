# -*- coding: utf-8 -*-
"""
데모 페이지 시연 효과 강화 — VIP고객팀 윤민서(agent012f, S-1012) 의 상위 5개 평가 record를
시나리오별 풍성한 콘텐츠로 덮어쓴다.

- evaluations.json / manual-evaluations.json 의 윤민서 최근 5건을 식별
- 시나리오 5종 (계좌개설/ELS설명의무/VIP포트폴리오/펀드적합성/고령자보호) 으로 다양화
- transcript 10~14턴, ai_feedback 200자+, scores 항목별 reason 구체화, tags 5+개
- 데이터 정합성 유지: id/date/call_time/agent_id 등 식별자는 그대로 유지

generate_qa_data.py 재실행 후에는 이 스크립트를 다시 한번 돌려야 한다.
"""
from __future__ import annotations
import json
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "assets" / "dummy-data"
EV_PATH = DATA / "evaluations.json"
MV_PATH = DATA / "manual-evaluations.json"

TARGET_AGENT_ID = "agent012f"
TARGET_AGENT_NAME = "윤민서"

# ============================================================
# 5개 시나리오 — 다양성 + 풍성한 콘텐츠
# ============================================================

SCENARIO_A_ACCOUNT_OPEN = {
    # 비대면 일반계좌 개설 모범 사례
    "call_type": "I/B",
    "duration": "4:52",
    "total_score": 95,
    "confidence": "High",
    "scenario_id": "qa-01-account-open-ok",
    "scenario_category": "계좌개설",
    "consultation_type": "계좌관리 > 계좌개설 > 비대면개설 > 일반계좌",
    "eval_form": "I/B 일반 상담 평가표 v2.1",
    "products": ["일반 위탁 계좌", "비대면 개설"],
    "fail_items": [],
    "issues": [],
    "tags": ["비대면계좌", "신규고객", "본인확인우수", "모범응대", "신속해결", "친절"],
    "ai_feedback": (
        "전반적으로 매우 우수한 응대 사례입니다. 첫인사에서 회사명·소속·본인 성명을 모두 정확히 안내했고, 본인 확인 절차에서 "
        "성함·생년월일·휴대폰 인증을 표준 스크립트대로 진행했습니다. 비대면 개설 단계에서 신분증 촬영 가이드, 영상 통화 시점, "
        "필수 약관 동의 항목을 빠짐없이 설명한 점이 돋보입니다. 적극적 어조와 공감 표현이 자연스러워 신규 고객의 불안감을 잘 해소했습니다. "
        "전 항목 기준점 충족, 향후 신규 상담사 코칭 자료로 활용 가능한 수준입니다."
    ),
    "transcript": [
        {"speaker": "agent", "time": "00:00", "text": "안녕하세요, ECS증권 윤민서입니다. 무엇을 도와드릴까요?"},
        {"speaker": "customer", "time": "00:06", "text": "안녕하세요. 비대면으로 계좌 개설하려고 하는데 어떻게 해야 하나요?"},
        {"speaker": "agent", "time": "00:14", "text": "네 고객님, 비대면 계좌 개설 도와드리겠습니다. 본인 확인을 위해 성함과 생년월일 부탁드립니다."},
        {"speaker": "customer", "time": "00:22", "text": "김지호, 1987년 4월 15일입니다."},
        {"speaker": "agent", "time": "00:30", "text": "김지호 고객님 확인되었습니다. 휴대폰 본인 인증을 진행하겠습니다. 안내 문자가 도착하면 인증번호 6자리를 말씀해 주세요."},
        {"speaker": "customer", "time": "00:48", "text": "도착했어요. 384715입니다."},
        {"speaker": "agent", "time": "00:55", "text": "인증 완료되었습니다. 이제 신분증 촬영 단계입니다. 앱 화면 안내에 따라 주민등록증 또는 운전면허증을 평평한 곳에 두시고 촬영해 주세요. 빛 반사가 없는지 확인 부탁드립니다."},
        {"speaker": "customer", "time": "01:30", "text": "촬영 끝났습니다."},
        {"speaker": "agent", "time": "01:36", "text": "감사합니다. 다음은 영상 통화 본인 확인입니다. 평일 9시부터 17시 사이에 진행되며, 신분증을 들고 얼굴이 함께 보이도록 촬영하시면 됩니다. 지금 가능하실까요?"},
        {"speaker": "customer", "time": "01:55", "text": "네 지금 할게요."},
        {"speaker": "agent", "time": "02:00", "text": "연결해 드리겠습니다. 영상 통화 후 필수 약관 — 거래 약관, 개인정보 수집·이용, 투자위험 고지 — 3건에 동의하시면 즉시 계좌가 활성화됩니다. 약관 내용은 모바일 앱 '내 문서함'에서 언제든 다시 확인 가능합니다."},
        {"speaker": "customer", "time": "02:32", "text": "네 알겠습니다."},
        {"speaker": "agent", "time": "04:30", "text": "모든 절차 완료되었습니다. 계좌번호 9876-A0143 으로 정상 활성화되었고, 영업일 D+2일부터 입출금 거래 가능합니다. 이용 중 문의사항 있으시면 언제든 콜센터로 연락 주세요."},
        {"speaker": "customer", "time": "04:46", "text": "친절하게 안내해 주셔서 감사합니다."},
        {"speaker": "agent", "time": "04:49", "text": "감사합니다. ECS증권을 선택해 주셔서 감사드리며, 좋은 하루 되세요."},
    ],
    "scores": {
        "first-greeting": {"type": "NLP", "score": 6, "max": 6, "status": "pass", "confidence": 96},
        "customer-greeting-reply": {"type": "AI", "score": 6, "max": 6, "status": "pass", "confidence": 95},
        "pos-neg-empathy": {"type": "AI", "score": 6, "max": 6, "status": "pass", "confidence": 94},
        "simultaneous-speech": {"type": "NLP", "score": 6, "max": 6, "status": "pass", "confidence": 98},
        "no-acknowledge": {"type": "NLP", "score": 5, "max": 5, "status": "pass", "confidence": 97},
        "interruption": {"type": "NLP", "score": 5, "max": 5, "status": "pass", "confidence": 96},
        "profanity": {"type": "NLP", "score": 0, "max": 0, "status": "pass", "confidence": 99, "is_fail": False},
        "product-info": {"type": "AI", "score": 6, "max": 6, "status": "pass", "confidence": 93,
                                   "reason": ""},
        "active-response": {"type": "AI", "score": 6, "max": 6, "status": "pass", "confidence": 94},
        "convenience": {"type": "NLP", "score": 6, "max": 6, "status": "pass", "confidence": 95},
        "speed": {"type": "NLP", "score": 6, "max": 6, "status": "pass", "confidence": 96},
        "tone": {"type": "AI", "score": 5, "max": 6, "status": "warn", "confidence": 91,
                 "reason": "어조 마지막 종결 어미가 다소 평이 — 미세 보강 가능"},
        "required-privacy": {"type": "AI", "score": 6, "max": 6, "status": "pass", "confidence": 97},
        "problem-solve": {"type": "AI", "score": 6, "max": 6, "status": "pass", "confidence": 96},
        "easy-explanation": {"type": "AI", "score": 6, "max": 6, "status": "pass", "confidence": 95},
        "last-greeting": {"type": "NLP", "score": 4, "max": 4, "status": "pass", "confidence": 98},
    },
}

SCENARIO_B_ELS_EXPLAIN = {
    "call_type": "I/B",
    "duration": "5:28",
    "total_score": 92,
    "confidence": "High",
    "scenario_id": "qa-06-els-explanation-ok",
    "scenario_category": "설명의무",
    "consultation_type": "상품권유 > ELS권유 > 설명의무 > 핵심설명",
    "eval_form": "I/B VIP 평가표 v1.0",
    "products": ["ELS 21호 (KOSPI200·HSCEI 연계)", "원금부분보장형 80%"],
    "fail_items": [],
    "issues": [],
    "tags": ["ELS", "설명의무", "원금손실가능성", "녹취동의", "VIP고객", "위험고지"],
    "ai_feedback": (
        "ELS 권유 설명의무 항목을 매우 충실히 이행한 사례입니다. 녹취 동의, 개인정보 수집·이용 동의, 본인 확인 절차를 표준 순서로 진행했고, "
        "ELS 21호의 기초자산(KOSPI200·HSCEI), 조기상환 조건(6개월 단위 95-90-85-80-75-70% 자동상환), 원금부분보장 80% 라인, 최대 손실률을 "
        "수치 기반으로 정확히 안내했습니다. 고객의 '원금 손실 가능성' 재확인 질문에 회피하지 않고 단계별로 설명한 점이 우수합니다. "
        "'적극성(회피)' 항목에서 일부 보강 여지 — 만기 시점 환매 절차를 한 번 더 명시했으면 만점이었을 것."
    ),
    "transcript": [
        {"speaker": "agent", "time": "00:00", "text": "안녕하세요, ECS증권 VIP센터 윤민서입니다. 본 통화는 상품 권유 절차에 따라 녹취가 진행됩니다. 녹취 동의해 주시겠습니까?"},
        {"speaker": "customer", "time": "00:11", "text": "네, 동의합니다."},
        {"speaker": "agent", "time": "00:14", "text": "감사합니다. 본인 확인을 위해 성함과 생년월일 부탁드립니다."},
        {"speaker": "customer", "time": "00:22", "text": "박서연, 1965년 8월 12일입니다."},
        {"speaker": "agent", "time": "00:30", "text": "박서연 고객님 확인되었습니다. 오늘 안내드릴 상품은 ECS ELS 21호이며, KOSPI200과 홍콩 항셍지수를 기초자산으로 하는 원금부분보장형 ELS 입니다. 설명 진행해도 괜찮으실까요?"},
        {"speaker": "customer", "time": "00:55", "text": "네, 자세히 들려주세요. 그런데 원금 손실 가능성이 있다고 들었는데 정확히 어떻게 되나요?"},
        {"speaker": "agent", "time": "01:08", "text": "중요한 부분을 정확히 짚어주셨습니다. ELS 21호는 원금부분보장 80% 구조입니다. 즉 만기 시점 기초자산이 가장 크게 하락한 경우라도 원금의 80%는 보장됩니다. 최대 손실 가능 금액은 투자 원금의 20%, 1,000만 원 투자 시 최대 200만 원 손실 가능합니다."},
        {"speaker": "customer", "time": "01:48", "text": "그러면 수익은 어떻게 발생하나요?"},
        {"speaker": "agent", "time": "01:54", "text": "6개월 단위 자동 조기상환 구조입니다. 첫 6개월 95% 라인 충족 시 연 7.2% 수익으로 상환, 12개월 90% 라인 충족 시 연 7.2%, 18개월 85%, 24개월 80%, 30개월 75%, 만기 36개월 70% 라인 충족 시 연 7.2% 수익을 지급합니다. 어느 한 회차라도 충족 시 즉시 상환되어 재투자 기회가 생깁니다."},
        {"speaker": "customer", "time": "02:38", "text": "그럼 6번 다 충족 못 하면 어떻게 되죠?"},
        {"speaker": "agent", "time": "02:46", "text": "만기 시점에 기초자산 중 어느 하나라도 70% 미만이면 최대 손실 구간으로 들어갑니다. 다만 80% 부분 보장이 적용되어 원금 손실은 최대 20%로 제한됩니다. 과거 10년 데이터 기준으로는 약 87%의 ELS가 조기상환 또는 만기 수익 실현 사례입니다."},
        {"speaker": "customer", "time": "03:22", "text": "이해됐어요. 그럼 만약 가입 후 중간에 환매하고 싶으면요?"},
        {"speaker": "agent", "time": "03:32", "text": "ELS는 중도 환매 가능하지만 환매 수수료가 발생하며, 시장 상황에 따라 원금 손실이 발생할 수 있습니다. 일반적으로 가입 후 1년 이내 환매 시 수수료 약 3~5% 차감, 그 이후에는 1~2% 수준입니다. 만기 보유가 가장 권장되는 투자 방식입니다."},
        {"speaker": "customer", "time": "04:05", "text": "알겠습니다. 1,000만 원 가입하려고 합니다."},
        {"speaker": "agent", "time": "04:11", "text": "감사합니다. 가입 전 마지막으로 설명드린 위험 고지 사항 — 원금 부분 보장 80%, 최대 손실률 20%, 조기상환 조건, 만기 시 시장 위험 — 모두 이해하셨는지 확인 부탁드립니다."},
        {"speaker": "customer", "time": "04:28", "text": "네, 다 이해했습니다."},
        {"speaker": "agent", "time": "04:32", "text": "감사합니다. 가입 신청서를 메시지로 전송해 드리며, 영상 통화로 추가 본인 확인 후 청약이 완료됩니다. 청약 후 7영업일 이내 청약 철회 가능합니다."},
        {"speaker": "customer", "time": "05:08", "text": "네 알겠습니다. 친절한 설명 감사합니다."},
        {"speaker": "agent", "time": "05:14", "text": "감사합니다. ECS증권을 신뢰해 주셔서 감사드리며, 좋은 하루 되세요."},
    ],
    "scores": {
        "first-greeting": {"type": "NLP", "score": 6, "max": 6, "status": "pass", "confidence": 96},
        "customer-greeting-reply": {"type": "AI", "score": 6, "max": 6, "status": "pass", "confidence": 95},
        "pos-neg-empathy": {"type": "AI", "score": 6, "max": 6, "status": "pass", "confidence": 94},
        "simultaneous-speech": {"type": "NLP", "score": 6, "max": 6, "status": "pass", "confidence": 97},
        "no-acknowledge": {"type": "NLP", "score": 5, "max": 5, "status": "pass", "confidence": 96},
        "interruption": {"type": "NLP", "score": 5, "max": 5, "status": "pass", "confidence": 95},
        "profanity": {"type": "NLP", "score": 0, "max": 0, "status": "pass", "confidence": 99, "is_fail": False},
        "product-info": {"type": "AI", "score": 6, "max": 6, "status": "pass", "confidence": 94},
        "active-response": {"type": "AI", "score": 5, "max": 6, "status": "warn", "confidence": 89,
                            "reason": "만기 시 환매 절차 안내 시 추가 단계 1회 보강 권장"},
        "convenience": {"type": "NLP", "score": 6, "max": 6, "status": "pass", "confidence": 95},
        "speed": {"type": "NLP", "score": 5, "max": 6, "status": "warn", "confidence": 91,
                  "reason": "복잡한 위험 고지 설명에서 한 박자 길게 소요"},
        "tone": {"type": "AI", "score": 6, "max": 6, "status": "pass", "confidence": 93},
        "required-privacy": {"type": "AI", "score": 6, "max": 6, "status": "pass", "confidence": 96},
        "problem-solve": {"type": "AI", "score": 6, "max": 6, "status": "pass", "confidence": 95},
        "easy-explanation": {"type": "AI", "score": 6, "max": 6, "status": "pass", "confidence": 94},
        "last-greeting": {"type": "NLP", "score": 4, "max": 4, "status": "pass", "confidence": 97},
    },
}

SCENARIO_C_FUND_SUITABILITY = {
    "call_type": "I/B",
    "duration": "6:14",
    "total_score": 78,
    "confidence": "Medium",
    "scenario_id": "qa-09-suitability-redo",
    "scenario_category": "적합성진단",
    "consultation_type": "상품권유 > 펀드권유 > 적합성진단 > 5단계 분류",
    "eval_form": "I/B 일반 상담 평가표 v2.1",
    "products": ["국내 채권혼합형 펀드", "투자자성향 진단표"],
    "fail_items": ["적합성 진단"],
    "issues": ["적합성 진단: 5단계 분류 안내 일부 누락 (경미 감점)", "전문성: 펀드 보수 구조 설명 시 단순화 필요"],
    "tags": ["펀드권유", "적합성진단", "5단계분류", "채권혼합형", "보수구조", "재진단"],
    "ai_feedback": (
        "적합성 진단 절차가 전반적으로는 진행되었으나, 5단계 투자자 분류(안정형/안정추구형/위험중립형/적극투자형/공격투자형)의 정의를 "
        "고객에게 명시적으로 안내하지 않고 곧바로 결과를 통보한 점이 감점 사유입니다. 고객이 '본인이 어떤 단계에 해당하는지' 명확히 인지할 수 있도록 "
        "각 단계의 특성을 1줄씩 풀어 설명하는 절차가 표준입니다. 펀드 보수 구조 설명에서 운용보수·판매보수·환매수수료를 한 번에 나열해 고객이 다시 "
        "질문한 점도 보강 필요. 코칭 권장: 적합성 진단 스크립트의 '5단계 분류 카드' 시각 자료를 활용하면 효과적입니다."
    ),
    "transcript": [
        {"speaker": "agent", "time": "00:00", "text": "안녕하세요, ECS증권 윤민서입니다. 무엇을 도와드릴까요?"},
        {"speaker": "customer", "time": "00:06", "text": "안녕하세요. 펀드 하나 가입하려고 하는데 추천 좀 부탁드려요."},
        {"speaker": "agent", "time": "00:14", "text": "네 고객님, 먼저 본인 확인 부탁드리겠습니다. 성함과 생년월일 알려주세요."},
        {"speaker": "customer", "time": "00:22", "text": "정하늘, 1972년 11월 3일입니다."},
        {"speaker": "agent", "time": "00:30", "text": "정하늘 고객님 확인되었습니다. 펀드 가입 전 투자자 성향 진단을 먼저 진행하겠습니다. 몇 가지 질문 드릴게요."},
        {"speaker": "customer", "time": "00:48", "text": "네, 진행해 주세요."},
        {"speaker": "agent", "time": "00:54", "text": "투자 경험은 어느 정도 되시나요? 주식, 펀드, ELS 등 위험자산 투자 기간 기준으로요."},
        {"speaker": "customer", "time": "01:08", "text": "주식이랑 펀드는 한 5년 정도 됐어요."},
        {"speaker": "agent", "time": "01:16", "text": "감사합니다. 손실 발생 시 어느 정도까지 감내 가능하신가요? 원금의 5%, 10%, 20%, 30% 이상 중 선택해 주세요."},
        {"speaker": "customer", "time": "01:32", "text": "한 10% 정도까지는 감내 가능합니다."},
        {"speaker": "agent", "time": "01:40", "text": "투자 기간은 어느 정도 생각하시나요?"},
        {"speaker": "customer", "time": "01:48", "text": "한 2~3년 정도요."},
        {"speaker": "agent", "time": "01:54", "text": "감사합니다. 진단 결과 위험중립형으로 분류되셨습니다. 채권혼합형 펀드를 권유 드립니다."},
        {"speaker": "customer", "time": "02:14", "text": "위험중립형이 어떤 의미인가요? 다른 단계랑 어떻게 다른 거죠?"},
        {"speaker": "agent", "time": "02:22", "text": "아 네… 위험중립형은 5단계 중 3단계로, 중간 정도의 위험을 감내하시는 유형입니다."},
        {"speaker": "customer", "time": "02:38", "text": "그 5단계가 뭐예요? 처음 들어요."},
        {"speaker": "agent", "time": "02:45", "text": "안정형, 안정추구형, 위험중립형, 적극투자형, 공격투자형 이렇게 5단계입니다. 각각 손실 감내 수준과 투자 경험에 따라 분류됩니다."},
        {"speaker": "customer", "time": "03:08", "text": "그렇군요. 그럼 채권혼합형 펀드 보수는 어떻게 되나요?"},
        {"speaker": "agent", "time": "03:18", "text": "운용보수 연 0.85%, 판매보수 연 0.45%, 환매수수료는 90일 이내 환매 시 이익금의 30%입니다."},
        {"speaker": "customer", "time": "03:38", "text": "잠깐만요, 보수가 여러 개네요. 다시 한 번 설명 부탁드려요."},
        {"speaker": "agent", "time": "03:46", "text": "네 다시 안내드리겠습니다. 펀드 보수는 크게 3가지로 구성됩니다. 첫째 운용보수는 자산운용사가 펀드를 운용하는 대가로 연 0.85% 차감, 둘째 판매보수는 ECS증권 판매 채널 보수로 연 0.45%, 셋째 환매수수료는 단기 환매 시에만 발생하며 90일 이내 환매할 경우 이익금의 30% 차감됩니다."},
        {"speaker": "customer", "time": "04:32", "text": "이제 이해됐어요. 그럼 가입할게요."},
        {"speaker": "agent", "time": "04:40", "text": "감사합니다. 가입 절차 진행해 드리겠습니다. 가입 신청서와 위험 고지서를 메시지로 보내드릴게요."},
        {"speaker": "customer", "time": "05:55", "text": "네, 감사합니다."},
        {"speaker": "agent", "time": "06:00", "text": "감사합니다. ECS증권을 이용해 주셔서 감사드리며, 좋은 하루 되세요."},
    ],
    "scores": {
        "first-greeting": {"type": "NLP", "score": 6, "max": 6, "status": "pass", "confidence": 95},
        "customer-greeting-reply": {"type": "AI", "score": 5, "max": 6, "status": "warn", "confidence": 87,
                                    "reason": "고객 인사 화답 어조가 형식적"},
        "pos-neg-empathy": {"type": "AI", "score": 5, "max": 6, "status": "warn", "confidence": 86,
                    "reason": "고객 추가 질문 시 공감 표현 부족"},
        "simultaneous-speech": {"type": "NLP", "score": 6, "max": 6, "status": "pass", "confidence": 95},
        "no-acknowledge": {"type": "NLP", "score": 5, "max": 5, "status": "pass", "confidence": 94},
        "interruption": {"type": "NLP", "score": 5, "max": 5, "status": "pass", "confidence": 95},
        "profanity": {"type": "NLP", "score": 0, "max": 0, "status": "pass", "confidence": 99, "is_fail": False},
        "product-info": {"type": "AI", "score": 4, "max": 6, "status": "warn", "confidence": 82,
                                   "reason": "펀드 보수 구조를 한 번에 나열하여 고객 재질문 유발"},
        "active-response": {"type": "AI", "score": 4, "max": 6, "status": "fail", "confidence": 78,
                            "reason": "적합성 5단계 분류 자발적 안내 누락 — 고객 질문 후 사후 설명"},
        "convenience": {"type": "NLP", "score": 5, "max": 6, "status": "warn", "confidence": 85},
        "speed": {"type": "NLP", "score": 5, "max": 6, "status": "warn", "confidence": 86,
                  "reason": "보수 재설명 단계에서 시간 지연"},
        "tone": {"type": "AI", "score": 5, "max": 6, "status": "warn", "confidence": 88},
        "required-privacy": {"type": "AI", "score": 6, "max": 6, "status": "pass", "confidence": 96},
        "problem-solve": {"type": "AI", "score": 5, "max": 6, "status": "warn", "confidence": 85,
                          "reason": "재질문 후 해결은 됐으나 1회 보강 필요"},
        "easy-explanation": {"type": "AI", "score": 4, "max": 6, "status": "fail", "confidence": 79,
                             "reason": "5단계 분류 명칭만 나열 — 각 단계 특성 설명 누락"},
        "last-greeting": {"type": "NLP", "score": 4, "max": 4, "status": "pass", "confidence": 96},
    },
}

SCENARIO_D_VIP_PORTFOLIO = {
    "call_type": "I/B",
    "duration": "8:42",
    "total_score": 88,
    "confidence": "High",
    "scenario_id": "qa-16-vip-portfolio",
    "scenario_category": "VIP관리",
    "consultation_type": "고객관리 > VIP관리 > 포트폴리오 > 자산배분",
    "eval_form": "I/B VIP 평가표 v1.0",
    "products": ["VIP 포트폴리오 컨설팅", "국내주식 60%/해외주식 25%/채권 15%"],
    "fail_items": [],
    "issues": ["전문성: 해외 ETF 환헤지 옵션 설명 일부 단순화"],
    "tags": ["VIP관리", "포트폴리오", "자산배분", "리밸런싱", "해외주식", "환헤지"],
    "ai_feedback": (
        "VIP 고객 포트폴리오 컨설팅 상담 사례. 고객의 보유 자산(약 3억 원) 구성, 투자 목표(은퇴 후 안정적 현금흐름), 위험 감내 수준을 "
        "체계적으로 청취한 후 60-25-15 자산배분 안을 제시한 점이 우수합니다. 리밸런싱 주기(분기 1회), 세금 효율 측면의 ISA 활용 안내가 "
        "VIP 전담 상담사 수준에 부합합니다. 해외주식 ETF 환헤지 옵션 설명에서 환헤지형과 환노출형의 차이를 단순히 '환율 영향 받느냐 안 받느냐' 로만 "
        "설명한 부분은 보강 권장 — 환헤지 비용(연 1~2%)과 장기 수익률 영향을 수치로 보여주면 만점 수준."
    ),
    "transcript": [
        {"speaker": "agent", "time": "00:00", "text": "안녕하세요, ECS증권 VIP센터 윤민서입니다. 한지석 고객님이시죠? 본인 확인을 위해 생년월일 부탁드립니다."},
        {"speaker": "customer", "time": "00:14", "text": "네, 윤민서 매니저님. 1968년 3월 22일입니다."},
        {"speaker": "agent", "time": "00:22", "text": "확인되었습니다. 오늘 사전에 요청해 주신 포트폴리오 점검 진행하겠습니다. 현재 보유 자산 구성을 먼저 확인드릴게요. 국내 주식 약 1억 8천만 원, 펀드 6천만 원, 예금 6천만 원으로 총 3억 규모 맞으신가요?"},
        {"speaker": "customer", "time": "00:54", "text": "네 맞습니다. 그런데 요즘 시장이 불안해서 리밸런싱이 필요한지 상의드리고 싶었어요."},
        {"speaker": "agent", "time": "01:08", "text": "잘 생각하셨습니다. 먼저 투자 목표를 다시 한 번 확인드릴게요. 5년 후 은퇴 예정이시고, 은퇴 후 매월 안정적인 현금흐름을 우선시한다고 알고 있습니다. 맞으실까요?"},
        {"speaker": "customer", "time": "01:32", "text": "네 정확합니다. 그래서 위험 자산 비중을 좀 줄여야 하나 싶기도 하고요."},
        {"speaker": "agent", "time": "01:46", "text": "현재 국내 주식 60%, 펀드 20%, 예금 20% 구성인데, 안정성·성장성·환금성 균형을 위해 다음 배분 제안드립니다. 국내 주식 60% 유지, 해외 주식 25% 신규 편입, 채권 15% 편입. 예금은 일부 채권형 ETF로 전환하는 방향입니다."},
        {"speaker": "customer", "time": "02:22", "text": "해외 주식 비중을 신규로 늘리는 이유가 있나요?"},
        {"speaker": "agent", "time": "02:30", "text": "두 가지 이유입니다. 첫째 국내 주식과의 상관관계가 낮아 분산 효과가 큽니다. 둘째 미국 빅테크 중심 ETF는 장기 평균 수익률이 연 10~12% 수준으로 국내 대형주 대비 높은 편입니다. 환율 변동성은 환헤지 ETF 활용으로 일부 통제 가능합니다."},
        {"speaker": "customer", "time": "03:08", "text": "환헤지 ETF가 뭔가요?"},
        {"speaker": "agent", "time": "03:14", "text": "환율 변동을 ETF 내부에서 흡수해 주는 상품입니다. 환헤지형은 환율이 떨어져도 손해를 보지 않지만 헤지 비용이 연 1~2% 발생하고, 환노출형은 환율 영향을 그대로 받습니다."},
        {"speaker": "customer", "time": "03:50", "text": "장기적으로 어느 쪽이 더 유리한가요?"},
        {"speaker": "agent", "time": "03:58", "text": "장기 보유시는 환노출형이 일반적으로 유리하지만, 은퇴 후 인출 시점을 고려하면 환헤지형 일부 편입으로 환율 리스크를 분산하는 것을 권장드립니다. 비중은 환헤지 30%, 환노출 70% 정도 추천드립니다."},
        {"speaker": "customer", "time": "04:32", "text": "리밸런싱은 어느 주기로 하는 게 좋을까요?"},
        {"speaker": "agent", "time": "04:40", "text": "분기 1회 점검을 권장드립니다. 자산군별 비중이 ±5%p 이상 변동되면 리밸런싱 진행, 그렇지 않으면 유지. 추가로 ISA 계좌 활용 시 매매 차익 200만 원까지 비과세 효과가 있어, 보유 자산 중 1억 원 정도는 ISA로 운용 권장드립니다."},
        {"speaker": "customer", "time": "05:28", "text": "ISA 한도가 있지 않나요?"},
        {"speaker": "agent", "time": "05:34", "text": "연간 2,000만 원, 5년간 총 1억 원까지 납입 가능합니다. 만기 후에는 일반 계좌로 전환되며 비과세 혜택은 만기 시점까지 적용됩니다."},
        {"speaker": "customer", "time": "06:08", "text": "이해됐습니다. 그럼 제안 주신 60-25-15 배분으로 진행하고, ISA도 신청할게요."},
        {"speaker": "agent", "time": "06:18", "text": "감사합니다. 매수 주문은 분할 매수로 4주에 걸쳐 진행하시는 것이 평균 단가 측면에서 유리합니다. 주문 진행 도와드릴까요?"},
        {"speaker": "customer", "time": "07:42", "text": "네 부탁드립니다."},
        {"speaker": "agent", "time": "07:48", "text": "감사합니다. 주문 접수 완료되었습니다. 분기별 점검 알림 설정해 두었으니 다음 점검은 4월 셋째 주에 다시 연락드리겠습니다."},
        {"speaker": "customer", "time": "08:32", "text": "윤매니저님 항상 친절한 설명 감사드립니다."},
        {"speaker": "agent", "time": "08:38", "text": "감사합니다. 좋은 하루 되세요."},
    ],
    "scores": {
        "first-greeting": {"type": "NLP", "score": 6, "max": 6, "status": "pass", "confidence": 96},
        "customer-greeting-reply": {"type": "AI", "score": 6, "max": 6, "status": "pass", "confidence": 95},
        "pos-neg-empathy": {"type": "AI", "score": 6, "max": 6, "status": "pass", "confidence": 94},
        "simultaneous-speech": {"type": "NLP", "score": 6, "max": 6, "status": "pass", "confidence": 97},
        "no-acknowledge": {"type": "NLP", "score": 5, "max": 5, "status": "pass", "confidence": 95},
        "interruption": {"type": "NLP", "score": 5, "max": 5, "status": "pass", "confidence": 96},
        "profanity": {"type": "NLP", "score": 0, "max": 0, "status": "pass", "confidence": 99, "is_fail": False},
        "product-info": {"type": "AI", "score": 5, "max": 6, "status": "warn", "confidence": 88,
                                   "reason": "환헤지 비용/수익률 영향 수치 보강 권장"},
        "active-response": {"type": "AI", "score": 6, "max": 6, "status": "pass", "confidence": 93},
        "convenience": {"type": "NLP", "score": 6, "max": 6, "status": "pass", "confidence": 94},
        "speed": {"type": "NLP", "score": 5, "max": 6, "status": "warn", "confidence": 88,
                  "reason": "복잡한 자산배분 설명 시 일부 구간 빠른 진행"},
        "tone": {"type": "AI", "score": 6, "max": 6, "status": "pass", "confidence": 94},
        "required-privacy": {"type": "AI", "score": 6, "max": 6, "status": "pass", "confidence": 96},
        "problem-solve": {"type": "AI", "score": 6, "max": 6, "status": "pass", "confidence": 95},
        "easy-explanation": {"type": "AI", "score": 5, "max": 6, "status": "warn", "confidence": 89,
                             "reason": "환헤지 개념을 단순화하여 1차 설명 — 고객 재질문 발생"},
        "last-greeting": {"type": "NLP", "score": 4, "max": 4, "status": "pass", "confidence": 97},
    },
}

SCENARIO_E_ELDER_PROTECTION = {
    "call_type": "I/B",
    "duration": "5:58",
    "total_score": 90,
    "confidence": "High",
    "scenario_id": "qa-10-elder-protection",
    "scenario_category": "적합성진단",
    "consultation_type": "상품권유 > 고령자보호 > 가족동석 > 녹취동의",
    "eval_form": "I/B VIP 평가표 v1.0",
    "products": ["만 65세 이상 고령 투자자 보호 절차", "녹취 의무화 상품"],
    "fail_items": [],
    "issues": [],
    "tags": ["고령자보호", "가족동석", "녹취동의", "숙려기간", "단순설명", "VIP고객"],
    "ai_feedback": (
        "고령 투자자 보호 절차를 표준대로 충실히 이행한 모범 사례입니다. 만 65세 이상 고객 확인 후 가족 동석 권유, 녹취 동의, 1영업일 숙려기간 안내, "
        "상품 위험도 5단계 중 본 상품 등급 안내까지 전 단계가 매끄럽게 진행되었습니다. 특히 복잡한 ELS 구조를 '예금처럼 안전한 부분 80%' + '주가 연동 보너스 20%' 로 "
        "단순화해 설명한 점이 고령 고객 응대의 모범 사례입니다. 청약 철회권 안내, 가족 연락처 확인까지 빠짐없이 진행되어 금감원 가이드라인을 완벽히 준수했습니다."
    ),
    "transcript": [
        {"speaker": "agent", "time": "00:00", "text": "안녕하세요, ECS증권 윤민서입니다. 본 통화는 녹취가 진행됩니다. 동의해 주시겠습니까?"},
        {"speaker": "customer", "time": "00:10", "text": "네, 동의해요."},
        {"speaker": "agent", "time": "00:14", "text": "감사합니다. 성함과 생년월일 부탁드립니다."},
        {"speaker": "customer", "time": "00:22", "text": "한지석, 1952년 6월 18일입니다."},
        {"speaker": "agent", "time": "00:30", "text": "한지석 고객님 확인되었습니다. 만 71세 고령자 보호 대상이시라 추가 보호 절차가 적용됩니다. 가족분이 함께 듣고 계신가요?"},
        {"speaker": "customer", "time": "00:48", "text": "네, 딸이 옆에서 같이 듣고 있어요."},
        {"speaker": "agent", "time": "00:54", "text": "잘하셨습니다. 따님 성함과 연락처 확인 부탁드립니다. 추후 청약 후 확인 절차에서도 같이 안내드릴 예정입니다."},
        {"speaker": "customer", "time": "01:12", "text": "한서연, 010-2345-6789입니다."},
        {"speaker": "agent", "time": "01:20", "text": "감사합니다. 오늘 안내드릴 상품은 ECS ELS 21호, 원금부분보장 80% 구조의 상품입니다. 어렵지 않게 핵심만 설명드릴게요. 천천히 들어주시면 됩니다."},
        {"speaker": "customer", "time": "01:42", "text": "네, 부탁드려요."},
        {"speaker": "agent", "time": "01:48", "text": "이 상품은 크게 두 부분으로 나뉩니다. 첫째 예금처럼 안전한 부분이 80% — 만기에 무조건 돌려받으시는 부분입니다. 둘째 주가 연동 보너스 부분이 20% — 시장 상황에 따라 수익이 나거나 일부 손실이 발생할 수 있습니다."},
        {"speaker": "customer", "time": "02:18", "text": "그럼 최악의 경우 얼마를 손해보나요?"},
        {"speaker": "agent", "time": "02:26", "text": "1,000만 원 가입하시면 최악의 경우에도 800만 원은 돌려받으십니다. 즉 최대 손실은 200만 원, 원금의 20% 입니다. 다만 과거 10년 데이터로는 약 87%의 상품이 수익으로 종료되었습니다."},
        {"speaker": "customer", "time": "03:02", "text": "기간은 얼마나 되나요?"},
        {"speaker": "agent", "time": "03:08", "text": "최대 3년이지만 6개월마다 자동 조기상환 기회가 있어 평균 1~2년 안에 상환되는 경우가 많습니다. 조기 상환 시 연 7.2% 수익이 지급됩니다."},
        {"speaker": "customer", "time": "03:40", "text": "잘 이해됐어요. 가입하고 싶은데 절차가 어떻게 되나요?"},
        {"speaker": "agent", "time": "03:48", "text": "고령자 보호 절차에 따라 오늘 가입 의사 확인 후 1영업일 숙려기간을 거쳐 내일 다시 한번 의사 확인 후 정식 청약됩니다. 숙려기간 동안 언제든 취소 가능하시고, 청약 후에도 7영업일 이내 청약 철회 가능합니다."},
        {"speaker": "customer", "time": "04:28", "text": "딸이 옆에서 들어보고 같이 결정하라고 해요."},
        {"speaker": "agent", "time": "04:36", "text": "좋은 결정이십니다. 가족분과 충분히 상의 후 결정하시는 것이 가장 바람직합니다. 따님 성함으로도 안내 자료를 문자로 보내드릴게요. 검토 후 결정 부탁드립니다."},
        {"speaker": "customer", "time": "05:08", "text": "네, 자료 받아보고 다시 연락드릴게요."},
        {"speaker": "agent", "time": "05:14", "text": "감사합니다. 따님 번호로 상품 요약서와 위험 고지서 보내드리겠습니다. 추가 문의 있으시면 언제든 콜센터로 연락 주세요."},
        {"speaker": "customer", "time": "05:42", "text": "친절한 설명 감사합니다."},
        {"speaker": "agent", "time": "05:48", "text": "감사합니다. 좋은 하루 되세요."},
    ],
    "scores": {
        "first-greeting": {"type": "NLP", "score": 6, "max": 6, "status": "pass", "confidence": 96},
        "customer-greeting-reply": {"type": "AI", "score": 6, "max": 6, "status": "pass", "confidence": 95},
        "pos-neg-empathy": {"type": "AI", "score": 6, "max": 6, "status": "pass", "confidence": 96},
        "simultaneous-speech": {"type": "NLP", "score": 6, "max": 6, "status": "pass", "confidence": 97},
        "no-acknowledge": {"type": "NLP", "score": 5, "max": 5, "status": "pass", "confidence": 96},
        "interruption": {"type": "NLP", "score": 5, "max": 5, "status": "pass", "confidence": 95},
        "profanity": {"type": "NLP", "score": 0, "max": 0, "status": "pass", "confidence": 99, "is_fail": False},
        "product-info": {"type": "AI", "score": 6, "max": 6, "status": "pass", "confidence": 94},
        "active-response": {"type": "AI", "score": 6, "max": 6, "status": "pass", "confidence": 95},
        "convenience": {"type": "NLP", "score": 6, "max": 6, "status": "pass", "confidence": 95},
        "speed": {"type": "NLP", "score": 5, "max": 6, "status": "warn", "confidence": 90,
                  "reason": "고령자 응대 특성상 의도적 느린 속도 — 표준 대비 약간 느림"},
        "tone": {"type": "AI", "score": 6, "max": 6, "status": "pass", "confidence": 94},
        "required-privacy": {"type": "AI", "score": 6, "max": 6, "status": "pass", "confidence": 97},
        "problem-solve": {"type": "AI", "score": 6, "max": 6, "status": "pass", "confidence": 95},
        "easy-explanation": {"type": "AI", "score": 6, "max": 6, "status": "pass", "confidence": 95},
        "last-greeting": {"type": "NLP", "score": 4, "max": 4, "status": "pass", "confidence": 97},
    },
}

DEMO_SCENARIOS = [
    SCENARIO_A_ACCOUNT_OPEN,
    SCENARIO_B_ELS_EXPLAIN,
    SCENARIO_C_FUND_SUITABILITY,
    SCENARIO_D_VIP_PORTFOLIO,
    SCENARIO_E_ELDER_PROTECTION,
]


def override_record(rec: dict, scenario: dict) -> dict:
    """rec 의 시나리오 콘텐츠 필드를 scenario 로 덮어쓰되, 식별자(id/date/agent_*)는 유지."""
    out = dict(rec)
    # 점수 계산 항목별 합산
    total_from_scores = sum(s.get("score", 0) for s in scenario["scores"].values())
    max_from_scores = sum(s.get("max", 0) for s in scenario["scores"].values())
    out["call_type"] = scenario["call_type"]
    out["duration"] = scenario["duration"]
    out["total_score"] = scenario["total_score"]
    out["max_score"] = max_from_scores or 100
    out["confidence"] = scenario["confidence"]
    out["scenario_id"] = scenario["scenario_id"]
    out["scenario_category"] = scenario["scenario_category"]
    out["consultation_type"] = scenario["consultation_type"]
    out["eval_form"] = scenario["eval_form"]
    out["products"] = scenario["products"]
    out["fail_items"] = scenario["fail_items"]
    out["issues"] = scenario["issues"]
    out["tags"] = scenario["tags"]
    out["ai_feedback"] = scenario["ai_feedback"]
    out["transcript"] = scenario["transcript"]
    out["scores"] = scenario["scores"]
    # manual pending 이었던 record 는 completed 처리하여 점수가 표시되도록
    if out.get("eval_method") == "manual" or "eval_status" in out:
        out["eval_status"] = "completed"
        out["qa_comment"] = scenario["ai_feedback"][:120]
    return out


def main() -> None:
    auto = json.loads(EV_PATH.read_text(encoding="utf-8"))
    manual = json.loads(MV_PATH.read_text(encoding="utf-8"))

    # 윤민서 평가 record 식별 (auto + manual 합쳐서 일시 내림차순으로 상위 5건)
    def key(r):
        return (r.get("date", ""), r.get("call_time", ""))
    all_records = [(r, "auto", i) for i, r in enumerate(auto) if r.get("agent_id") == TARGET_AGENT_ID]
    all_records += [(r, "manual", i) for i, r in enumerate(manual) if r.get("agent_id") == TARGET_AGENT_ID]
    all_records.sort(key=lambda x: key(x[0]), reverse=True)

    if len(all_records) < 5:
        print(f"[ERROR] {TARGET_AGENT_NAME}({TARGET_AGENT_ID}) record가 5건 미만: {len(all_records)}")
        sys.exit(1)

    target5 = all_records[:5]
    print(f"=== 덮어쓰기 대상 5건 ===")
    for (r, kind, _idx), sc in zip(target5, DEMO_SCENARIOS):
        print(f"  {r['id']} ({kind}) {r['date']} {r['call_time']} → 시나리오: {sc['scenario_category']} / {sc['total_score']}점")

    # 덮어쓰기
    for (r, kind, idx), sc in zip(target5, DEMO_SCENARIOS):
        new_rec = override_record(r, sc)
        if kind == "auto":
            auto[idx] = new_rec
        else:
            manual[idx] = new_rec

    EV_PATH.write_text(json.dumps(auto, ensure_ascii=False, indent=2), encoding="utf-8")
    MV_PATH.write_text(json.dumps(manual, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"[OK] evaluations.json / manual-evaluations.json 갱신")

    # all-data.js inline 동기화 (file:// 환경에서 페이지가 직접 읽음)
    sys.path.insert(0, str(ROOT / "tools"))
    from generate_qa_data import sync_all_data_js
    sync_all_data_js({
        "evaluations.json": auto,
        "manual-evaluations.json": manual,
    })
    print("[OK] all-data.js inline 동기화")

    print("\n다음 단계:")
    print("  python tools/sync_detail_analysis_dummy.py  → DUMMY tree 갱신")


if __name__ == "__main__":
    main()
