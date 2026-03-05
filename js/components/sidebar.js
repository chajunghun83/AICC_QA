/**
 * AICC QA - Sidebar Component
 * 2단 오버레이 사이드바 (1단: 고정 틸 그린, 2단: 흰색 오버레이)
 * ELP 포탈의 전체 메뉴 구조를 모방하되, QA 서브메뉴만 실제 동작
 */
window.AICC_Sidebar = {
  /** 관리자/상담사 역할별 메뉴 트리 정의 */
  menuItems: {
    admin: [
      {
        group: '홈',
        items: [
          { id: 'qa-dashboard', label: 'QA 대시보드', href: '/pages/admin/qa-dashboard.html' },
          { id: 'evaluation-status', label: '자동 평가 현황', href: '/pages/admin/evaluation-status.html' },
          { id: 'manual-evaluation-status', label: '수동 평가 현황', href: '/pages/admin/manual-evaluation-status.html' }
        ]
      },
      {
        group: '평가 관리',
        items: [
          { id: 'evaluation-items', label: '평가 항목 관리', href: '/pages/admin/evaluation-items.html' },
          { id: 'evaluation-forms', label: '자동 평가표 관리', href: '/pages/admin/evaluation-forms.html' },
          { id: 'manual-evaluation-forms', label: '수동 평가표 관리', href: '/pages/admin/manual-evaluation-forms.html' },
          { id: 'dispute-inbox', label: '이의 제기 처리함', href: '/pages/admin/dispute-inbox.html' }
        ]
      },
      {
        group: '평가계획관리',
        items: [
          { id: 'evaluation-plans', label: '자동 평가 계획 관리', href: '/pages/admin/system-settings/evaluation-plans.html' },
          { id: 'evaluation-exclusions', label: '자동 평가 제외 관리', href: '/pages/admin/system-settings/evaluation-exclusions.html' },
          { id: 'manual-evaluation-plans', label: '수동 평가 계획 관리', href: '/pages/admin/system-settings/manual-evaluation-plans.html' }
        ]
      },
      {
        group: '분석',
        items: [
          { id: 'trend-analysis', label: '트렌드 분석', href: '/pages/admin/trend-analysis.html' },
          { id: 'report-generator', label: '리포트 생성기', href: '/pages/admin/report-generator.html' }
        ]
      },
      {
        group: '시스템 설정',
        items: [
          { id: 'prompt-templates', label: '프롬프트 템플릿', href: '/pages/admin/system-settings/prompt-templates.html' },
          { id: 'user-management', label: '사용자 관리', href: '/pages/admin/system-settings/user-management.html' },
          { id: 'system-logs', label: '시스템 로그', href: '/pages/admin/system-settings/system-logs.html' }
        ]
      }
    ],
    agent: [
      {
        group: null,
        items: [
          { id: 'my-dashboard', label: '나의 성과 대시보드', href: '/pages/agent/my-dashboard.html' },
          { id: 'my-evaluations', label: '나의 평가 결과', href: '/pages/agent/my-evaluations.html' },
          { id: 'my-disputes', label: '나의 이의 제기 현황', href: '/pages/agent/my-disputes.html' }
        ]
      }
    ]
  },

  hideTimeout: null,  // 2단 메뉴 숨김 지연 타이머
  basePath: '',

  init(basePath) {
    this.basePath = basePath || '';
  },

  /**
   * 파일명으로 활성 메뉴 식별
   * menuItems의 id와 HTML 파일명이 일치하도록 설계했으므로 파일명만 추출
   */
  getActiveId() {
    const path = window.location.pathname;
    const filename = path.split('/').pop().replace('.html', '');
    return filename;
  },

  /**
   * 1단 사이드바(고정 네비게이션) HTML 생성
   * QA 외 메뉴는 프로토타입이므로 비활성 상태로 렌더링
   */
  render1stTier() {
    return `
      <div class="sidebar-1st" id="sidebar-1st">
        <div style="padding:16px 16px 8px;display:flex;align-items:center;gap:8px;">
          <div style="width:28px;height:28px;background:white;border-radius:4px;display:flex;align-items:center;justify-content:center;">
            <span style="color:#00A3FF;font-weight:800;font-size:11px;">ELP</span>
          </div>
          <span style="font-size:12px;font-weight:600;opacity:0.9;">ELP Cloud Portal</span>
        </div>

        <div style="padding:12px 12px 4px;">
          <div style="background:rgba(255,255,255,0.1);border-radius:4px;padding:6px 10px;font-size:12px;color:rgba(255,255,255,0.5);display:flex;align-items:center;gap:6px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            Menu Search
          </div>
        </div>

        <div style="padding:8px 0;">
          <div class="sidebar-menu-item" style="opacity:0.5;cursor:default;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            즐겨찾기
          </div>
          <div class="sidebar-menu-item" style="opacity:0.5;cursor:default;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
            대시보드
          </div>
          <div class="sidebar-menu-item" style="opacity:0.5;cursor:default;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            ADMIN
          </div>
          <div class="sidebar-menu-item" style="opacity:0.5;cursor:default;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72"/></svg>
            CCaaS 운영관리
          </div>
        </div>

        <div style="padding:0 12px;margin:4px 0;">
          <div style="height:1px;background:rgba(255,255,255,0.15);"></div>
        </div>

        <div style="padding:4px 0 8px;">
          <div style="padding:4px 16px;font-size:10px;font-weight:600;text-transform:uppercase;color:rgba(255,255,255,0.4);letter-spacing:0.5px;">AICC 플랫폼</div>
          <div class="sidebar-menu-item" style="opacity:0.5;cursor:default;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
            에이전트 관리
          </div>
          <div class="sidebar-menu-item" style="opacity:0.5;cursor:default;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
            성과 어드바이저
          </div>
          <div class="sidebar-menu-item" style="opacity:0.5;cursor:default;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/></svg>
            AICM
          </div>
          <div class="sidebar-menu-item" style="opacity:0.5;cursor:default;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/></svg>
            TA
          </div>
          <div class="sidebar-menu-item active" id="qa-menu-trigger">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            QA
          </div>
        </div>
      </div>
    `;
  },

  /**
   * 2단 서브메뉴(오버레이 패널) HTML 생성
   * 관리자는 전체 메뉴 + MY ZONE, 상담사는 MY ZONE만 표시
   */
  render2ndTier() {
    const isAdmin = AICC_Auth.isAdmin();
    const activeId = this.getActiveId();
    let html = '<div class="sidebar-2nd" id="sidebar-2nd">';

    html += `
      <div style="padding:16px 20px 8px;">
        <div style="font-size:15px;font-weight:700;color:#212121;">QA</div>
        <div style="font-size:11px;color:#757575;margin-top:2px;">품질 관리 시스템</div>
      </div>
    `;

    // 관리자 메뉴
    if (isAdmin) {
      this.menuItems.admin.forEach((group, gi) => {
        if (group.group) {
          html += `<div class="sub-menu-group-title">${group.group}</div>`;
        }
        group.items.forEach(item => {
          const isActive = activeId === item.id;
          const href = this.basePath + item.href.substring(1); // Remove leading /
          html += `<a href="${href}" class="sub-menu-item ${isActive ? 'active' : ''}" style="text-decoration:none;">${item.label}</a>`;
        });
        if (gi === this.menuItems.admin.length - 1) return;
        // 시스템 설정 전에 구분선
        if (gi === 3) {
          html += '<div class="sub-menu-divider"></div>';
        }
      });

      html += '<div class="sub-menu-divider"></div>';
      html += '<div class="sub-menu-group-title">MY ZONE</div>';
    }

    // 상담사 메뉴 (상담사 전용 또는 관리자도 볼 수 있음)
    this.menuItems.agent.forEach(group => {
      group.items.forEach(item => {
        const isActive = activeId === item.id;
        const href = this.basePath + item.href.substring(1);
        html += `<a href="${href}" class="sub-menu-item ${isActive ? 'active' : ''}" style="text-decoration:none;">${item.label}</a>`;
      });
    });

    html += '</div>';
    return html;
  },

  /**
   * 호버 이벤트 바인딩
   * 1단↔2단 사이 마우스 이동 시 깜빡임 방지를 위해 150ms 지연 숨김 적용
   */
  bindEvents() {
    const trigger = document.getElementById('qa-menu-trigger');
    const sidebar2nd = document.getElementById('sidebar-2nd');
    const sidebar1st = document.getElementById('sidebar-1st');

    if (!trigger || !sidebar2nd) return;

    const show = () => {
      clearTimeout(this.hideTimeout);
      sidebar2nd.classList.add('visible');
    };

    // 마우스가 1단→2단으로 이동하는 동안의 간극을 허용하기 위한 지연
    const scheduleHide = () => {
      this.hideTimeout = setTimeout(() => {
        sidebar2nd.classList.remove('visible');
      }, 150);
    };

    // 1단 QA 메뉴에 마우스 오버
    trigger.addEventListener('mouseenter', show);
    trigger.addEventListener('mouseleave', scheduleHide);

    // 2단 서브메뉴에 마우스 있으면 유지
    sidebar2nd.addEventListener('mouseenter', show);
    sidebar2nd.addEventListener('mouseleave', scheduleHide);

    // 1단 전체에서 QA 외 영역으로 가면 숨김
    sidebar1st.addEventListener('mouseleave', (e) => {
      if (!sidebar2nd.contains(e.relatedTarget)) {
        scheduleHide();
      }
    });
  }
};
