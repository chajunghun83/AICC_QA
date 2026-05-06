# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

AICC Quality Hub 프로토타입 — 콜센터 QA(품질 평가) 및 TA(통화 분석) 솔루션의 정적 HTML 시안.
백엔드/빌드 시스템 없이 **순수 HTML + 인라인 JavaScript**로 동작하며, `file://` 프로토콜에서도 실행 가능하도록 설계되어 있다.

## 실행 방법

빌드 단계가 없다. 로컬 개발 시 다음 중 하나로 실행:

- **권장**: 정적 서버로 띄우기 — `python -m http.server 8000` 후 `http://localhost:8000/`
- **대안**: `index.html`을 브라우저로 직접 열기 (file:// 프로토콜) — fetch 실패 시 `assets/dummy-data/all-data.js`의 인라인 데이터로 폴백되도록 구현되어 있음

진입점은 [index.html](index.html) → 자동으로 [pages/admin/qa-dashboard.html](pages/admin/qa-dashboard.html)로 리다이렉트.

테스트/린트 도구는 없다. 변경 후 브라우저에서 직접 확인할 것.

## 아키텍처 핵심

### 페이지 구조: 3-Tier 디렉터리 깊이
모든 경로 처리(상대 경로 계산, 사이드바 링크)는 페이지가 어느 깊이에 있는지에 따라 분기한다:

- `index.html` → `./` (루트)
- `pages/admin/*.html`, `pages/agent/*.html`, `pages/ta/*.html` → `../../`
- `pages/admin/system-settings/*.html`, `pages/ta/system/*.html` → `../../../`

이 로직은 [js/components/layout.js](js/components/layout.js)의 `getBasePath()`와 [js/utils/data-loader.js](js/utils/data-loader.js)의 `init()`에 **각각 독립적으로 구현되어 있다**. 새 디렉터리 깊이를 추가할 경우 두 곳 모두 수정해야 한다.

### 레이아웃 주입 패턴 (중요)
각 HTML 페이지는 `<body>` 안에 `<div id="page-content">` 만 포함한다. [js/components/layout.js](js/components/layout.js)의 `AICC_Layout.init()`이 `DOMContentLoaded` 시점에 **`document.body.innerHTML`을 통째로 재구성**하여 사이드바 + 헤더 탭바 + 컨텐츠 영역을 주입한다.

이 때문에:
- 페이지 스크립트는 `DOMContentLoaded` 후 실행되어야 하며 `page-content` 내부 DOM은 재배치된 뒤에도 유지된다.
- `?embed` 쿼리 파라미터가 있으면 사이드바/헤더 주입을 건너뛴다 (iframe 임베드 모드).

### 사이드바 메뉴는 단일 진실의 원천
[js/components/sidebar.js](js/components/sidebar.js)의 `AICC_Sidebar.menuItems` 객체에 `admin / agent / ta` 3개 모듈의 전체 메뉴 트리가 정의되어 있다. 새 페이지를 만들 때:
1. HTML 파일을 적절한 `pages/{module}/` 하위에 생성
2. `menuItems`에 `{ id, label, href }` 추가 (id는 파일명에서 `.html` 제거한 것과 일치)
3. `id`가 `menuItems`에 없으면 헤더 탭에서는 `document.title` 기반으로 표시되지만 사이드바에서는 보이지 않음

### 상태 저장
- **헤더 탭**: `sessionStorage['aicc-tabs']` — 탭 즉, 열린 페이지 목록
- **역할 토글 (관리자/상담사)**: `localStorage['aicc_qa_role']` — [js/utils/auth-simulator.js](js/utils/auth-simulator.js)
- 실제 인증 없음. 역할은 화면 전환 시연용.

### 더미 데이터 로딩 전략
[js/utils/data-loader.js](js/utils/data-loader.js)의 `AICC_DataLoader.load(filename)` 호출 시:

1. 메모리 캐시 확인
2. `window.AICC_DATA[filename]` (인라인) — `assets/dummy-data/all-data.js`에 정의됨, file:// 환경 대응
3. fetch로 `assets/dummy-data/{filename}` 시도

새 더미 데이터를 추가할 때는 JSON 파일과 **동시에** `all-data.js`의 `window.AICC_DATA` 객체에도 같은 내용을 넣어야 file:// 환경에서도 로드된다.

### CSS / 스타일링
- **[css/styles.css](css/styles.css)**: 공유 스타일 (사이드바, 헤더, 카드, 테이블, 모달 등 전역 컴포넌트 클래스)
- **Tailwind CDN**: 각 페이지에서 `<script src="https://cdn.tailwindcss.com">` 로 직접 로드 (빌드 없음)
- **Chart.js CDN**: 차트 사용 페이지에서만 로드
- 디자인 원칙은 [AICC_QA_PRD/02_디자인_시스템.md](AICC_QA_PRD/02_디자인_시스템.md) 참조 — 데이터 밀도 중심, 리스트+모달 패턴, 이모지 사용 금지(SVG 아이콘만), 한국어 폰트는 Pretendard

## Git 작업 규칙

- **커밋/푸시는 사용자가 명시적으로 요청할 때만 진행할 것.** 작업이 완료되어도 자동으로 `git commit`, `git push`를 수행하지 않는다.
- 사용자가 "커밋해줘", "푸시해줘"라고 명령했을 때만 해당 작업을 실행한다.

## 작업 시 주의사항

- **새 페이지 추가 절차**: HTML 파일 생성 → `<div id="page-content">` 안에 컨텐츠 작성 → 표준 head 블록(tailwind, chart.js, styles.css) 포함 → layout.js/sidebar.js/data-loader.js의 표준 스크립트 임포트 → `sidebar.js`의 `menuItems`에 등록.
- **경로 깊이 추가**: `layout.js`와 `data-loader.js` 양쪽의 깊이 분기 로직을 모두 업데이트.
- **이력 추적**: 작업 이력은 [history_QA.md](history_QA.md), [history_TA.md](history_TA.md), [history_TA현황분석.md](history_TA현황분석.md)에 기록되어 있음. 큰 변경 시 해당 파일 업데이트 고려.
- **`pages/aicm/`** 디렉터리는 현재 비어있음 (예약된 모듈 영역).
- **`00_이전 버전/`** 폴더와 `.bak` 파일은 보관용. 임의로 삭제하지 말 것.
