/**
 * AICC QA - Layout Component
 * 공유 레이아웃 (탭 헤더 + 사이드바) 주입
 * 모든 페이지에서 일관된 앱 쉘을 구성하기 위해 단일 진입점으로 사용
 */
window.AICC_Layout = {
  STORAGE_KEY: 'aicc-tabs',

  /**
   * 페이지 깊이별 상대 경로 반환
   * HTML이 3단계 디렉터리 구조이므로 경로 깊이에 따라 basePath가 달라짐
   */
  getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/pages/admin/system-settings/')) return '../../../';
    if (path.includes('/pages/ta/system/')) return '../../../';
    if (path.includes('/pages/admin/') || path.includes('/pages/agent/') || path.includes('/pages/ta/')) return '../../';
    return './';
  },

  /** sessionStorage에서 탭 목록 로드 */
  getTabs() {
    try {
      return JSON.parse(sessionStorage.getItem(this.STORAGE_KEY)) || [];
    } catch { return []; }
  },

  /** 탭 목록을 sessionStorage에 저장 */
  saveTabs(tabs) {
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(tabs));
  },

  /** menuItems를 검색하여 현재 페이지의 id/label/href 반환 */
  getCurrentPageInfo() {
    const filename = window.location.pathname.split('/').pop().replace('.html', '');
    const allItems = [
      ...(AICC_Sidebar.menuItems.admin || []).flatMap(g => g.items),
      ...(AICC_Sidebar.menuItems.agent || []).flatMap(g => g.items),
      ...(AICC_Sidebar.menuItems.ta || []).flatMap(g => g.items)
    ];
    const found = allItems.find(item => item.id === filename);
    if (found) return { id: found.id, label: found.label, href: found.href };

    // menuItems에 없는 숨겨진 페이지는 document.title에서 추출
    const title = document.title.split(' - ')[0] || filename;
    const path = window.location.pathname;
    const pagesIdx = path.indexOf('/pages/');
    const href = pagesIdx >= 0 ? path.substring(pagesIdx) : path;
    return { id: filename, label: title, href };
  },

  /** 현재 페이지를 탭 목록에 추가 (중복 방지) */
  addCurrentTab() {
    const tabs = this.getTabs();
    const current = this.getCurrentPageInfo();
    if (!tabs.find(t => t.id === current.id)) {
      tabs.push({ id: current.id, label: current.label, href: current.href });
      this.saveTabs(tabs);
    }
    return tabs;
  },

  /** 탭 제거 — 활성 탭이면 인접 탭으로 이동 */
  removeTab(tabId) {
    let tabs = this.getTabs();
    const idx = tabs.findIndex(t => t.id === tabId);
    if (idx === -1) return;

    const current = this.getCurrentPageInfo();
    const isActive = current.id === tabId;

    tabs.splice(idx, 1);
    this.saveTabs(tabs);

    if (isActive && tabs.length > 0) {
      const nextIdx = Math.min(idx, tabs.length - 1);
      this.navigateToTab(tabs[nextIdx]);
    } else if (isActive && tabs.length === 0) {
      this.navigateToDefault();
    } else {
      this.refreshTabBar();
    }
  },

  /** 활성 탭만 남기고 나머지 제거 */
  closeOtherTabs() {
    const current = this.getCurrentPageInfo();
    const tabs = this.getTabs().filter(t => t.id === current.id);
    this.saveTabs(tabs);
    this.refreshTabBar();
  },

  /** 전체 탭 제거 후 기본 페이지로 이동 */
  closeAllTabs() {
    this.saveTabs([]);
    this.navigateToDefault();
  },

  /** QA 대시보드(기본 페이지)로 이동 */
  navigateToDefault() {
    const basePath = this.getBasePath();
    window.location.href = basePath + 'pages/admin/qa-dashboard.html';
  },

  /** 탭 href를 현재 깊이 기준 상대 경로로 변환 후 이동 */
  navigateToTab(tab) {
    const basePath = this.getBasePath();
    const href = tab.href.startsWith('/') ? basePath + tab.href.substring(1) : tab.href;
    window.location.href = href;
  },

  /** 탭 바 HTML만 재렌더링 (DOM 교체) */
  refreshTabBar() {
    const bar = document.getElementById('header-tab-bar');
    if (bar) bar.innerHTML = this.buildTabsHtml();
  },

  /** 탭 요소 HTML 문자열 생성 */
  buildTabsHtml() {
    const tabs = this.getTabs();
    const current = this.getCurrentPageInfo();
    const basePath = this.getBasePath();

    return tabs.map(tab => {
      const isActive = tab.id === current.id;
      const href = tab.href.startsWith('/') ? basePath + tab.href.substring(1) : tab.href;
      return `
        <div class="header-tab ${isActive ? 'active' : ''}" data-tab-id="${tab.id}" data-tab-href="${href}">
          <span class="header-tab-label">${tab.label}</span>
          <button class="header-tab-close" data-close-id="${tab.id}" title="닫기">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
      `;
    }).join('');
  },

  /** 헤더 HTML 생성 — 탭 바 + 3점 메뉴 */
  renderHeader() {
    this.addCurrentTab();
    return `
      <div class="top-header">
        <div class="header-tab-bar" id="header-tab-bar">
          ${this.buildTabsHtml()}
        </div>
        <div class="header-tab-more">
          <button class="header-tab-more-btn" id="tab-more-btn" title="더보기">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
          </button>
          <div class="header-tab-dropdown" id="tab-dropdown">
            <div class="header-tab-dropdown-item" data-action="refresh">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
              새로고침
            </div>
            <div class="header-tab-dropdown-item" data-action="fullscreen">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>
              최대화
            </div>
            <div class="header-tab-dropdown-sep"></div>
            <div class="header-tab-dropdown-item" data-action="close-current">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              현재 탭 닫기
            </div>
            <div class="header-tab-dropdown-item" data-action="close-others">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/></svg>
              다른 탭 닫기
            </div>
            <div class="header-tab-dropdown-item" data-action="close-all">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
              모든 탭 닫기
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /** 탭/3점 메뉴 이벤트 바인딩 */
  bindTabEvents() {
    const header = document.querySelector('.top-header');
    if (!header) return;

    // 탭 클릭 — 이벤트 위임으로 탭 영역과 X 버튼을 구분
    header.addEventListener('click', (e) => {
      const closeBtn = e.target.closest('[data-close-id]');
      if (closeBtn) {
        e.stopPropagation();
        this.removeTab(closeBtn.dataset.closeId);
        return;
      }

      const tab = e.target.closest('.header-tab');
      if (tab) {
        window.location.href = tab.dataset.tabHref;
        return;
      }
    });

    // 3점 메뉴 토글
    const moreBtn = document.getElementById('tab-more-btn');
    const dropdown = document.getElementById('tab-dropdown');
    if (moreBtn && dropdown) {
      moreBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
      });

      // 드롭다운 항목 클릭
      dropdown.addEventListener('click', (e) => {
        const item = e.target.closest('[data-action]');
        if (!item) return;
        dropdown.classList.remove('show');

        switch (item.dataset.action) {
          case 'refresh':
            location.reload();
            break;
          case 'fullscreen':
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen().catch(() => {});
            } else {
              document.exitFullscreen();
            }
            break;
          case 'close-current':
            this.removeTab(this.getCurrentPageInfo().id);
            break;
          case 'close-others':
            this.closeOtherTabs();
            break;
          case 'close-all':
            this.closeAllTabs();
            break;
        }
      });

      // 바깥 클릭 시 드롭다운 닫기
      document.addEventListener('click', () => {
        dropdown.classList.remove('show');
      });
    }
  },

  /** iframe 임베드 여부 판별 */
  isEmbed() {
    return new URLSearchParams(window.location.search).has('embed');
  },

  /**
   * 레이아웃 초기화 - 페이지에 탭 헤더+사이드바 주입
   * body를 완전히 재구성하므로 DOMContentLoaded 후 1회만 호출
   */
  init() {
    if (this.isEmbed()) {
      document.body.style.background = '#FFFFFF';
      const pc = document.getElementById('page-content');
      if (pc) pc.style.padding = '24px';
      return;
    }

    const basePath = this.getBasePath();
    AICC_Sidebar.init(basePath);

    const currentModule = window.location.pathname.includes('/pages/ta/') ? 'ta' : 'qa';

    const pageContent = document.getElementById('page-content');
    const pageHtml = pageContent ? pageContent.innerHTML : '';

    document.body.innerHTML = `
      ${AICC_Sidebar.render1stTier(currentModule)}
      ${AICC_Sidebar.render2ndTier(currentModule)}
      <div class="main-content" id="main-area">
        ${this.renderHeader()}
        <div style="padding:24px;" id="content-area">
          ${pageHtml}
        </div>
      </div>
    `;

    AICC_Sidebar.bindEvents();
    AICC_Auth.renderRoleToggle();
    this.bindTabEvents();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  AICC_Layout.init();
});
