/**
 * AICC QA - Layout Component
 * 공유 레이아웃 (헤더 + 사이드바) 주입
 * 모든 페이지에서 일관된 앱 쉘을 구성하기 위해 단일 진입점으로 사용
 */
window.AICC_Layout = {
  /**
   * 페이지 깊이별 상대 경로 반환
   * HTML이 3단계 디렉터리 구조이므로 경로 깊이에 따라 basePath가 달라짐
   */
  getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/pages/admin/system-settings/')) return '../../../';
    if (path.includes('/pages/admin/') || path.includes('/pages/agent/')) return '../../';
    return './';
  },

  /**
   * URL 경로 기반 브레드크럼 자동 생성
   * document.title에서 페이지명을 추출하여 경로 계층에 삽입
   */
  getBreadcrumb() {
    const path = window.location.pathname;
    const parts = ['AICC 플랫폼', 'QA'];
    const title = document.title.split(' - ')[0] || '';

    if (path.includes('system-settings')) {
      parts.push('시스템 설정');
    }
    if (title) {
      parts.push(title);
    }

    // 마지막 요소만 강조 표시하여 현재 위치를 시각적으로 구분
    return parts.map((p, i) => {
      if (i === parts.length - 1) {
        return `<span style="color:#212121;font-weight:500;">${p}</span>`;
      }
      return `<span style="color:#757575;">${p}</span>`;
    }).join('<span style="color:#BDBDBD;margin:0 6px;">/</span>');
  },

  /**
   * 헤더 HTML 생성
   */
  renderHeader() {
    const user = AICC_Auth.getCurrentUser();
    return `
      <div class="top-header">
        <div style="flex:1;display:flex;align-items:center;">
          <div style="font-size:13px;">${this.getBreadcrumb()}</div>
        </div>
        <div style="display:flex;align-items:center;gap:16px;">
          <div class="realtime-dot" title="실시간 연동 중"></div>
          <span style="font-size:11px;color:#757575;" id="refresh-time">${new Date().toLocaleTimeString('ko-KR')}</span>
          <div style="width:1px;height:20px;background:#E0E0E0;"></div>
          <button style="background:none;border:none;cursor:pointer;color:#757575;position:relative;" title="알림">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            <span style="position:absolute;top:-2px;right:-4px;background:#F44336;color:white;border-radius:50%;width:14px;height:14px;font-size:9px;display:flex;align-items:center;justify-content:center;">3</span>
          </button>
          <div style="display:flex;align-items:center;gap:8px;cursor:pointer;">
            <div style="width:28px;height:28px;border-radius:50%;background:#E0E0E0;display:flex;align-items:center;justify-content:center;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#757575" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            </div>
            <div>
              <div style="font-size:12px;font-weight:600;color:#212121;">${user.name}</div>
              <div style="font-size:10px;color:#757575;">${user.label} / ${user.team}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * 레이아웃 초기화 - 페이지에 헤더+사이드바 주입
   * body를 완전히 재구성하므로 DOMContentLoaded 후 1회만 호출
   */
  init() {
    const basePath = this.getBasePath();
    AICC_Sidebar.init(basePath);

    // 페이지 고유 콘텐츠를 보존한 뒤 앱 쉘로 감싸기 위해 임시 저장
    const pageContent = document.getElementById('page-content');
    const pageHtml = pageContent ? pageContent.innerHTML : '';

    document.body.innerHTML = `
      ${AICC_Sidebar.render1stTier()}
      ${AICC_Sidebar.render2ndTier()}
      <div class="main-content" id="main-area">
        ${this.renderHeader()}
        <div style="padding:24px;" id="content-area">
          ${pageHtml}
        </div>
      </div>
    `;

    AICC_Sidebar.bindEvents();
    AICC_Auth.renderRoleToggle();

    // 실시간 시계 - 30초 간격으로 헤더 시각 갱신 (실시간 연동 상태 표현용)
    setInterval(() => {
      const el = document.getElementById('refresh-time');
      if (el) el.textContent = new Date().toLocaleTimeString('ko-KR');
    }, 30000);
  }
};

// DOM 로드 후 자동 초기화
document.addEventListener('DOMContentLoaded', () => {
  AICC_Layout.init();
});
