/**
 * AICC QA - Auth Simulator
 * 권한 전환 시뮬레이션
 */
window.AICC_Auth = {
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
   * 역할 전환 + 페이지 리로드
   */
  switchRole(role) {
    this.setRole(role);
    // 상담사로 전환 시 상담사 전용 페이지로 이동
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
   * 역할 전환 UI 생성
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
