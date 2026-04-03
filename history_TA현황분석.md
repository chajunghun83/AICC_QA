**수정 리스트 (25/04/01)**

[전체 콜 현황 > AI 현황분석]
- KPI 카드 개편
  - 기존 4/2 배열에서 6개 1줄 배열로 변경 (총 콜수, 이슈 콜, 초과 콜, 재인입 콜, 평균 통화시간, 평균 묵음시간)
  - 평균 재인입 건수, 상품 키워드 Top 6 KPI 카드 제거
  - 테이블의 상품 키워드 컬럼 제거

- 콜 목록 테이블 개선
  - 상담 키워드 컬럼 추가
  - 상담/이슈 키워드 모두 최대 2개까지 표시, 초과 시 `...` 처리
  - `...` 호버 시 전체 키워드를 툴팁으로 표시
  - 이슈 키워드가 없는 콜 허용 (더미데이터 반영)

- 더미 데이터 체계 전면 개편
  - Seeded RNG 적용: 새로고침에도 동일한 데이터 보장
  - 주문번호 시나리오 전용 25건 + 일반 시나리오 75건 = 총 100건
  - 스크립트 템플릿 13종 (배송지연, 배송지연_미해결, 주문취소, 주문취소_미해결, 결제오류, 결제오류_시스템, 주문누락, 상품불량, 환불지연, 일반문의, 일반문의2, 재인입, 클레임)
  - 각 템플릿에 상담사-고객 대화 스크립트(lines) + AI 분석 결과(ai) 포함
  - 콜별 상담유형 3~4뎁스, 센터/팀/상담사 배정, 시간대별 분포 등 현실적 패턴 설계

- 스크립트 기반 상태 판정 (analyzeTranscript)
  - 콜 상태를 '처리 완료' / '후속 조치 필요'로 구분
  - 하드코딩이 아닌 상담사 발화 키워드 분석 기반 판정
  - 후속 조치 키워드 14종: '확인 후 연락', '콜백', '담당 부서', '에스컬레이션', '전달하겠', '정상화 예정' 등
  - 상담사 발화를 역순 탐색하여 후속 조치 키워드 우선 매칭
  - [정책] 실제 운영에서는 LLM이 스크립트 전문을 분석하여 판정. 에스컬레이션 구조는 납품 업체별 상이 가능

- AI 현황분석 영역 (독립 카드 섹션)
  - 기존 AI 개선 제안(롤링 바)을 제거하고 독립 카드 섹션으로 교체
  - KPI 카드와 콜 목록 테이블 사이에 상시 노출
  - 조치 등록 버튼 없음

- AI 현황분석 시나리오 2종
  - Default 시나리오: 필터 없이 진입 시 전체 100건 기준 분석
  - Keyword 시나리오: 대시보드 > 주요 키워드 > '주문번호' 선택 시 25건 기준 분석
  - 시나리오별 Level 1 인사이트 캐시 적용

- AI 현황분석 드릴다운 시스템 (최대 3레벨)
  - Level 1: 시나리오별 정적 인사이트 (원인분석, 핵심발견, 위험신호, 조치필요/운영트렌드)
  - Level 2~3: _buildInsightLevel()로 동적 생성 — 필터된 콜의 aiAnalysis 집계 기반
  - 브레드크럼 네비게이션으로 이전 레벨 복귀 가능
  - 각 인사이트 항목에 `>` 아이콘이 있으면 클릭하여 다음 레벨로 드릴다운
  - 드릴다운 키워드는 텍스트 내 색상 하이라이트로 구분

- 드릴다운 정책
  - 최대 depth: Level 3 (_aiHistory 최대 2개)
  - 누적 필터 체이닝: Level 2는 Level 1 필터 포함, Level 3는 Level 1+2 필터 포함
  - 상위 레벨 대비 컨텍스트 표시: "상위 X건 중 현재 Y건(Z%) 추출"
  - 컨텍스트 인식 원칙: 이미 필터된 차원은 반복 분석하지 않고 새로운 관점으로 분석
    예: "배송지연"으로 필터된 상태에서 "이슈 콜 100%"와 같은 동어반복 방지
  - 콜 수 3건 미만 시 드릴다운 불가, 5건 이하 시 개별 콜 AI 분석 요약 추가 표시
  - [정책] 실제 운영에서는 LLM에 드릴다운 경로와 기존 분석 항목을 전달하여
    동어반복 없이 새로운 관점의 분석을 직접 생성해야 한다.
    프롬프트에 "이미 상위 레벨에서 분석된 차원은 반복하지 말고
    새로운 관점(원인, 상담 품질, 구체적 조치)으로 분석"이라는 제약 조건을 포함

- Keyword(주문번호) 시나리오 Level 1 상세
  - 좌측: 분석 인사이트 (원인분석/핵심발견/위험신호/조치필요)
  - 우측: 상담유형 Top 5 (전체 뎁스 표시, 클릭 시 필터링 + Level 2 진입)
  - "1위 원인 분석" 섹션: 주문번호가 왜 키워드 1위인지 설명
    · 전월 대비 증가율 비교 (대시보드가 월 단위 필터이므로 비교 기준도 전월)
    · 이슈 기반 인과: 배송지연 급증이 주문번호 조회 콜을 견인
    · 외부 트리거: 물류사 배송 지연 이벤트 시뮬레이션
    · [정책] 실제 운영 시 prevMonthAvg는 기간 필터 API에서 산출,
      triggerEvent는 물류사 API/장애 로그 등 외부 시스템 연동으로 자동 감지
  - 조치 필요 항목 4종: 물류사 SLA 점검, 선제 안내, 피크 시간 인력 재배치, 재인입 방지
  - 피크 시간 인사이트도 클릭 시 해당 시간대로 필터링 가능

- 동적 인사이트 생성 (_buildInsightLevel) 정책
  - aiAnalysis 필드 기반 집계: rootCause, actionNote, suggestedAction, tags
  - Phase 2 추가 필드: flowPattern, customerIntent, intentAchieved, keyUtterances, riskFlags
  - 컨텍스트 감지 10종: 특정이슈, 일반이슈, 상태, 재인입, 시간대, rootCause, tag, 상담흐름, 고객의도, 위험신호
  - 핵심 발견: rootCause 분석, 처리 상태 상세, 이슈 분포, 상담 흐름 패턴, 의도 달성률, 빈출 발화 패턴
  - 위험 신호: tags 위험 패턴, riskFlags 위험 집계, 복합 위험(의도미달성+후속조치), 대안 미제시, 부적절 마무리, 품질 점수, 재인입, 피크 시간
  - 조치 필요: suggestedAction 기반 구체적 제안
  - [정책] 프로토타입은 aiAnalysis 필드를 단순 집계/패턴화.
    실제 운영에서는 LLM에 현재 필터 경로와 콜 데이터를 전달하여
    컨텍스트에 맞는 분석을 직접 생성해야 한다.
    효율적인 프롬프트 설계가 핵심이며, 프롬프트에는
    드릴다운 경로(예: "주문번호 > 배송지연 > 후속 조치 필요")와
    상위 레벨에서 이미 보여준 분석 항목을 포함하여 동어반복을 방지해야 한다.

[전체 콜 현황 > 콜 상세 모달]
- 모달 레이아웃 3열 → 4열 확장
  - 기존: 콜 정보(25%) | 스크립트(40%) | 추출 키워드+묵음+AI분석(35%)
  - 변경: 콜 정보(280px) | 스크립트(1fr) | AI 스크립트 분석(400px) | 추출 키워드+묵음(350px)
  - modal.js sizeMap에 xxxl(95%) 추가, 모달 사이즈 xxl → xxxl로 변경

- AI 스크립트 분석 패널 (독립 3번째 열)
  - 상단: 처리 상태 뱃지 + 상담 흐름 패턴 뱃지(즉시해결/콜백안내/에스컬레이션/정보안내) + 이슈 분류
  - 통화 요약 + 처리 내용 + 근본 원인 + 권장 조치 + 태그 뱃지

  1) 상담 흐름 타임라인
     - 스크립트를 4단계로 분류: 문제 제기 → 확인/조회 → 대응/안내 → 마무리
     - 각 단계에 시간과 발화 요약 표시, 색상 원형 마커로 단계 구분
     - [정책] 프로토타입은 발화 위치와 키워드 패턴 매칭으로 단계 분류.
       실제 운영에서는 LLM이 스크립트 전문을 분석하여 단계별 요약을 생성한다.

  2) 고객 의도/요구사항 분석
     - customerIntent 라벨 + intentAchieved 달성/미달성 뱃지
     - 달성 시 처리 내용(actionNote), 미달성 시 원인(rootCause) 표시

  3) 핵심 발화 발췌
     - keyUtterances에서 원문 인용 + 중요 이유
     - 파란색 좌측 보더로 시각 구분
     - [정책] 프로토타입은 scriptTemplates에 하드코딩된 핵심 발화 사용.
       실제 운영에서는 LLM이 스크립트에서 이슈 키워드, 고객 감정 변화,
       해결 방안 제시 발화 등을 자동 추출한다.

  4) 위험 신호 / 주의 사항
     - riskFlags 기반: 재인입위험, 불만표현, 이탈위험 각각의 설명
     - 후속 조치 필요 상태 반영
     - 재인입 횟수(reentry >= 2) 반영

- 상담사 평가(agentEval) 섹션 제거
  - QA 영역에서 별도 진행 예정으로 모달에서 제거
  - agentEval 데이터(score, alternativeProvided, closingProper)는 유지하며
    드릴다운 인사이트의 상담 품질 분석에서 활용

- aiAnalysis 객체 구조 (스크립트 템플릿 13종 × 콜별 생성)
  - 기존 필드: summary, actionNote, rootCause, suggestedAction, category, tags
  - 런타임 필드: status(스크립트 분석 기반), agentEval(랜덤 생성)
  - Phase 2 신규 필드:
    · flowPattern ('즉시해결'|'콜백안내'|'에스컬레이션'|'정보안내')
    · customerIntent ('배송확인','환불확인','결제처리','주문취소확인' 등)
    · intentAchieved (boolean)
    · keyUtterances ([{text, reason}] — 핵심 발화 2개씩)
    · riskFlags (['재인입위험','불만표현','이탈위험'] — 템플릿별 상이)
  - [정책] 프로토타입은 scriptTemplates.ai에 하드코딩된 값을 깊은 복사하여 사용.
    실제 운영에서는 콜 종료 후 LLM이 스크립트 전문을 분석하여 각 필드를 생성한다.
    프롬프트 예시: "다음 상담 스크립트를 분석하여 통화 요약, 처리 내용, 근본 원인,
    고객 의도와 달성 여부, 핵심 발화 2~3개와 선택 이유, 위험 신호를 구조화된 JSON으로 출력하세요."

- Phase 2 드릴다운 인사이트 고도화
  - 신규 집계 헬퍼 5종: _aggFlowPattern, _aggCustomerIntent, _aggIntentRate, _aggRiskFlags, _aggKeyUtterances
  - _buildInsightLevel 확장:
    · 상담 흐름 패턴 분석: "콜백안내 7건(70%) / 즉시해결 2건 — 즉시 해결 비율 낮음" → 최다 패턴으로 드릴다운
    · 고객 의도 달성률: "달성률 60% — 미달성 4건 주 원인: 물류사 배송 지연" → 미달성 건으로 드릴다운
    · 빈출 발화 패턴: 동일 reason 그룹핑으로 반복 고객 불만 패턴 도출 (정보성, 드릴다운 불가)
    · riskFlags 위험 집계: "불만표현 5건, 이탈위험 3건 감지" → 최빈 위험으로 드릴다운
    · 복합 위험: "의도 미달성 + 후속 조치 필요 3건 — 재인입 가능성 매우 높음" → 복합 조건 드릴다운
  - _buildKeywordScenario Level 1 확장: 핵심발견에 상담흐름/의도달성률, 위험신호에 riskFlags, 조치필요에 의도미달성 원인 해소 추가
  - _buildDefaultScenario Level 1 확장: 핵심발견에 상담흐름/의도달성률, 운영트렌드에 위험콜 비율 추가
  - [정책] 프로토타입은 aiAnalysis 필드를 단순 카운트하여 분포를 산출한다.
    실제 운영에서는 LLM이 다수 콜의 스크립트를 교차 분석하여
    공통 패턴과 이탈 패턴을 도출하고, 패턴별 해결률 차이를 분석한다.
    프롬프트 예시: "다음 N건의 상담 스크립트에서 상담 흐름 패턴을 분류하고,
    각 패턴의 해결률 차이와 원인을 분석해 주세요."
    의도 달성률의 경우: "고객 발화에서 의도를 추출하고, 상담 종료 시점의 상태와
    비교하여 의도 달성 여부를 판정해 주세요."

- Level 3 테이블 필터 기능
  - Level 3 인사이트 항목 클릭 시 드릴다운 없이 콜 목록 테이블만 필터링
  - 아이콘 구분: Level 1-2는 `>` (드릴다운), Level 3는 깔때기(필터)
  - 선택된 항목 하이라이트: 배경색 #E3F2FD(연한 파란색) + 좌측 보더 두께 증가
  - 동일 항목 재클릭 시 필터 해제 (토글 방식)
  - 테이블 헤더에 필터 뱃지 표시: 적용된 필터명 + X(초기화) 버튼
  - 브레드크럼 레벨 이동 또는 검색 필터 변경 시 자동 초기화

- 콜 목록 테이블 정렬 기능
  - 정렬 가능 컬럼 11종: 콜 ID, 일시, 센터, 팀, 사번, 상담사, 상담 유형, 통화시간, 유형, 묵음시간, 재인입
  - 정렬 불가 컬럼: 상담 키워드, 이슈 키워드 (배열 데이터)
  - 3단계 토글: 클릭 1회 → 오름차순(▲), 2회 → 내림차순(▼), 3회 → 정렬 해제(⇅)
  - 숫자 정렬: 통화시간, 묵음시간, 재인입은 숫자 비교 (parseDurationSec, totalSilence, reentry)
  - 문자열 정렬: 나머지 컬럼은 한국어 localeCompare 기반

- 멀티패널 드릴다운 UI (슬라이딩 패널)
  - Level 1 전용 → Level 1~3 수평 패널로 확장
  - L1 only: 100%, L2 open: L1 25% + L2 75%, L3 open: L1 25% + L2 25% + L3 50%
  - 패널 열림/닫힘 시 push-and-slide 애니메이션 (CSS transition)
  - 좁아진 패널 텍스트 자동 말줄임(...) 처리 (JavaScript 기반 inline style)
  - 선택된 항목 L1/L2에서 배경 하이라이트 유지 (drill-active 클래스)

- 상담유형 데이터 구조 (consultationTypes)
  - 대분류(D1) > 중분류(D2) > (소분류(D3) >) 세분류 구조, 최대 4뎁스
  - [핵심 정책] 대시보드 소분류 도넛 차트 항목은 **마지막 뎁스**에 위치한다.
    "소분류"는 소분류·세분류를 아울러 부르는 명칭이므로 3뎁스(D3)나 4뎁스(D4) 모두 해당.
    예) '결제 > 결제오류 > 승인실패 > 카드결제' → 마지막 뎁스 = 카드결제
    예) '교환/반품 > 교환처리 > 색상교환' → 마지막 뎁스 = 색상교환 (3뎁스)
  - matchesSpecialFilter의 consult_type 분기는 마지막 뎁스를 체크
    `parts[parts.length - 1] === value`
  - 앱/웹사이트, 카탈로그 등 대시보드 소분류에 없는 항목은 기존 구조 유지

- 대시보드 → 전체 콜 현황 필터 연동 정책
  - 대시보드 각 위젯 클릭 시 전달되는 필터 타입:
    · 주요 키워드 → filter=keyword
    · 소분류 도넛 → filter=consult_type
    · 상품 랭킹 → filter=product_keyword
    · 이슈 키워드 → filter=issue_keyword
    · 신규 키워드 → filter=new_keyword
    · 시간대별 콜량 → filter=hour
  - [정책] 각 필터별 전체 콜 현황 AI 현황분석 우측 Top5 표시 규칙:
    · keyword(주요 키워드) → 상담유형 Top5
    · consult_type(소분류) → 키워드 Top5
    · product_keyword(상품 랭킹) → 상담유형 Top5
    · issue_keyword(이슈 키워드) → 상담유형 Top5
    · new_keyword(신규 키워드) → 상담유형 Top5
    · hour(시간대별 콜량) → 키워드 Top5 + 상담유형 Top5 (상하 배치)
    · 그 외(default) → Top5 없음
  - [원칙] 키워드 계열로 진입 → 상담유형 Top5 표시,
    상담유형으로 진입 → 키워드 Top5 표시 (교차 정보 제공)

- AI 현황분석 시나리오 분기 (_getScenario)
  - keyword + "주문" 포함 → _buildKeywordScenario (주문번호 특화 인사이트 + 상담유형 Top5)
  - keyword + 그 외 값 → _buildConsultTypeScenario (범용 인사이트 + 상담유형 Top5)
  - consult_type → _buildConsultTypeScenario (범용 인사이트 + 키워드 Top5)
  - product_keyword / issue_keyword / new_keyword → _buildConsultTypeScenario (범용 인사이트 + 상담유형 Top5)
  - hour → _buildHourScenario (범용 인사이트 + 키워드 Top5 + 상담유형 Top5 상하 배치)
  - 그 외 → _buildDefaultScenario (Top5 없음)
  - _buildConsultTypeScenario 내부에서 curFilter에 따라 Top5 종류를 동적 결정:
    showCtTop5 = ['keyword','product_keyword','issue_keyword','new_keyword'].includes(curFilter)

- 더미 데이터 정합성 보장 (대시보드 ↔ 전체 콜 현황)
  - [문제] 대시보드의 랭킹 키워드(캐시미어 코트, 반품 지연 등)가
    전체 콜 현황의 extractedKeywords에 없으면 0건이 되는 문제
  - [해결] extractedKeywordPool에 대시보드 키워드를 앞쪽에 배치:
    · issue: 반품지연, 상품불량, 환불지연, 오배송, 포장파손 등 21종
    · product: 캐시미어코트, 오버핏패딩, 울블렌드자켓 등 20종
    · consult: 사전예약, 시즌오프, 한정판, 공동구매, 라이브방송 등 25종
  - [해결] generateCallData 후처리에서 대시보드 키워드를 고정 콜에 강제 주입:
    · 이슈 키워드 5종 × 각 5건 = 25건에 직접 push
    · 상품 키워드 5종 × 각 5건 = 25건에 직접 push
    · 신규 키워드 5종 × 각 4건 = 20건에 직접 push
    → seeded RNG에 의존하지 않고 확정적으로 데이터 존재 보장
  - [해결] extractedKeywords.issue 생성 시 extractedKeywordPool.issue에서 4개 추가 랜덤 추출
    (기존: 시나리오 issues 배열에서만 생성 → 확장: 풀에서 추가 키워드 보충)

- 이슈 키워드 검색 필터 정합성 수정
  - [문제] applyFilter의 issueQ 검색에서 공백 미제거로 매칭 실패
    (대시보드 "반품 지연" → issueQ "반품 지연" vs 데이터 "반품지연")
  - [해결] issueQ에 replace(/\s/g,'') 적용하여 공백 정규화
  - [문제] issueQ가 issueKeywords만 검색하고 extractedKeywords.issue는 미검색
  - [해결] issueQ 필터에 extractedKeywords.issue 검색 추가
  - matchesSpecialFilter의 issue_keyword 분기도 동일하게
    issueKeywords + extractedKeywords.issue 모두 검색

- 대시보드 필터 타입 매핑 수정 (ta-dashboard.html)
  - renderRankList, renderV2RankCard 함수의 filterType 매핑 수정:
    · trend-list (상품 랭킹) → product_keyword (기존: keyword로 잘못 전달)
    · issue-list (이슈 키워드) → issue_keyword (정상)
    · freq-list (신규 키워드) → new_keyword (기존: keyword로 잘못 전달)
