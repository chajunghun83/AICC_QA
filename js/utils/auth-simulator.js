/**
 * AICC QA - Auth Simulator
 * 프로토타입용 역할 전환 시뮬레이션
 * 실제 인증 없이 localStorage로 역할 상태를 유지하여 관리자/상담사 화면 전환 시연
 */
window.AICC_Auth = {
  /** 역할별 고정 사용자 프로필 (프로토타입용 하드코딩) */
  roles: {
    ADMIN: { label: '관리자', name: '김관리자', team: 'QA팀', workspace: '전체' },
    AGENT: { label: '상담사', name: '홍길동', team: 'VIP상담팀', workspace: '서울센터' }
  },

  /**
   * 현재 역할 가져오기
   */
  getRole() {
    return localStorage.getItem('aicc_qa_role') || 'ADMIN';
  },

  /**
   * 역할 설정
   */
  setRole(role) {
    localStorage.setItem('aicc_qa_role', role);
  },

  /**
   * 현재 사용자 정보
   */
  getCurrentUser() {
    const role = this.getRole();
    return {
      role: role,
      ...this.roles[role]
    };
  },

  /**
   * 관리자인지 확인
   */
  isAdmin() {
    return this.getRole() === 'ADMIN';
  },

  /**
   * 역할 전환 + 적절한 페이지로 리다이렉트
   * 관리자↔상담사 간 접근 가능 페이지가 다르므로 각 역할의 대시보드로 이동
   */
  switchRole(role) {
    this.setRole(role);
    const path = window.location.pathname;
    if (role === 'AGENT' && path.includes('/pages/admin/')) {
      const basePath = path.includes('system-settings') ? '../../../' : '../../';
      window.location.href = basePath + 'pages/agent/my-dashboard.html';
    } else if (role === 'ADMIN' && path.includes('/pages/agent/')) {
      window.location.href = '../../pages/admin/qa-dashboard.html';
    } else {
      window.location.reload();
    }
  },

  /**
   * 화면 우하단 역할 전환 토글 UI 렌더링
   * 프로토타입 시연 시 관리자/상담사 뷰를 즉시 전환할 수 있도록 제공
   */
  renderRoleToggle() {
    const currentRole = this.getRole();
    const container = document.createElement('div');
    container.className = 'role-toggle';
    container.innerHTML = `
      <button class="role-toggle-btn ${currentRole === 'ADMIN' ? 'active' : ''}" onclick="AICC_Auth.switchRole('ADMIN')">
        관리자
      </button>
      <button class="role-toggle-btn ${currentRole === 'AGENT' ? 'active' : ''}" onclick="AICC_Auth.switchRole('AGENT')">
        상담사
      </button>
    `;
    document.body.appendChild(container);
  }
};
