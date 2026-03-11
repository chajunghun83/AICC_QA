/**
 * AICC QA 프로토타입 - 공통 JavaScript
 */

// ===== 현재 사용자 (권한 시뮬레이션) =====
const currentUser = {
  id: 'admin001',
  name: '김관리자',
  role: 'ADMIN', // 'ADMIN', 'QA_MANAGER', 'AGENT'
  team: 'QA팀',
  workspace: '전체'
};

// 권한 전환 테스트용 함수 (개발자 도구에서 호출)
function switchRole(role) {
  const users = {
    'ADMIN': { id: 'admin001', name: '김관리자', role: 'ADMIN', team: 'QA팀', workspace: '전체' },
    'QA_MANAGER': { id: 'qa001', name: '박QA', role: 'QA_MANAGER', team: 'QA팀', workspace: '서울센터' },
    'AGENT': { id: 'agent001', name: '홍길동', role: 'AGENT', team: 'VIP상담팀', workspace: '서울센터' }
  };
  
  if (users[role]) {
    Object.assign(currentUser, users[role]);
    localStorage.setItem('currentUserRole', role);
    location.reload();
  } else {
    console.error('유효하지 않은 권한:', role);
  }
}

// 페이지 로드 시 저장된 권한 복원
function restoreUserRole() {
  const savedRole = localStorage.getItem('currentUserRole');
  if (savedRole) {
    switchRole(savedRole);
  }
}

// ===== 메뉴 초기화 =====
function initializeMenu() {
  const adminMenus = document.querySelectorAll('[data-role="admin"]');
  const agentMenus = document.querySelectorAll('[data-role="agent"]');
  const separatorLine = document.querySelector('[data-role="separator"]');
  
  if (currentUser.role === 'AGENT') {
    // 상담사는 관리자 메뉴 숨김
    adminMenus.forEach(menu => menu.style.display = 'none');
    if (separatorLine) separatorLine.style.display = 'none';
  }
  
  // 사용자 정보 표시
  const userNameEl = document.getElementById('user-name');
  const userRoleEl = document.getElementById('user-role');
  if (userNameEl) userNameEl.textContent = currentUser.name;
  if (userRoleEl) userRoleEl.textContent = getRoleName(currentUser.role);
}

function getRoleName(role) {
  const roleNames = {
    'ADMIN': '시스템 관리자',
    'QA_MANAGER': 'QA 관리자',
    'AGENT': '상담사'
  };
  return roleNames[role] || role;
}

// ===== 더미 데이터 로드 =====
async function loadDummyData(filename) {
  try {
    const response = await fetch(`./assets/dummy-data/${filename}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`데이터 로드 실패 (${filename}):`, error);
    return null;
  }
}

// ===== 유틸리티 함수 =====

// 점수에 따른 상태 반환
function getScoreStatus(score) {
  if (score >= 80) return 'good';
  if (score >= 60) return 'warn';
  return 'danger';
}

// 점수 색상 클래스 반환
function getScoreClass(score) {
  const status = getScoreStatus(score);
  return `score-${status}`;
}

// 점수 배경 색상 클래스 반환
function getScoreBgClass(score) {
  const status = getScoreStatus(score);
  return `score-bg-${status}`;
}

// 점수 이모지 반환
function getScoreEmoji(score) {
  if (score >= 80) return '🟢';
  if (score >= 60) return '🟡';
  return '🔴';
}

// 숫자 포맷팅 (천단위 콤마)
function formatNumber(num) {
  return num?.toLocaleString('ko-KR') || '0';
}

// 퍼센트 포맷팅
function formatPercent(num, showSign = true) {
  const sign = num > 0 && showSign ? '+' : '';
  return `${sign}${num?.toFixed(1) || 0}%`;
}

// 날짜 포맷팅
function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

// 시간 포맷팅
function formatTime(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
}

// 상대 시간 (방금, 1시간 전 등)
function getRelativeTime(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now - date;
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return '방금';
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 7) return `${days}일 전`;
  return formatDate(dateStr);
}

// ===== 모달 관리 =====
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// ESC 키로 모달 닫기
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modals = document.querySelectorAll('.modal-backdrop:not(.hidden)');
    modals.forEach(modal => {
      modal.classList.add('hidden');
    });
    document.body.style.overflow = '';
  }
});

// ===== 토스트 메시지 =====
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  const bgColors = {
    'info': 'bg-blue-500',
    'success': 'bg-green-500',
    'warning': 'bg-yellow-500',
    'error': 'bg-red-500'
  };
  
  toast.className = `fixed bottom-4 right-4 px-4 py-2 rounded-lg text-white ${bgColors[type]} shadow-lg z-50 animate-fade-in`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('opacity-0', 'transition-opacity');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ===== 워크스페이스-팀 필터 =====
let workspacesData = [];

async function initWorkspaceFilter() {
  workspacesData = await loadDummyData('workspaces.json') || [];
  
  const wsSelect = document.getElementById('workspace-select');
  const teamSelect = document.getElementById('team-select');
  
  if (wsSelect) {
    wsSelect.innerHTML = '<option value="all">전체</option>';
    workspacesData.forEach(ws => {
      wsSelect.innerHTML += `<option value="${ws.id}">${ws.name}</option>`;
    });
    
    wsSelect.addEventListener('change', () => {
      updateTeamFilter(wsSelect.value);
    });
  }
}

function updateTeamFilter(workspaceId) {
  const teamSelect = document.getElementById('team-select');
  if (!teamSelect) return;
  
  if (workspaceId === 'all') {
    teamSelect.disabled = true;
    teamSelect.innerHTML = '<option value="all">전체</option>';
  } else {
    const workspace = workspacesData.find(ws => ws.id === workspaceId);
    teamSelect.disabled = false;
    teamSelect.innerHTML = '<option value="all">전체</option>';
    
    if (workspace?.teams) {
      workspace.teams.forEach(team => {
        teamSelect.innerHTML += `<option value="${team.id}">${team.name}</option>`;
      });
    }
  }
}

// ===== 실시간 갱신 시뮬레이션 =====
let refreshInterval = null;

function startRealtimeRefresh(callback, intervalMs = 30000) {
  // 즉시 한 번 실행
  callback();
  
  // 주기적 갱신
  refreshInterval = setInterval(callback, intervalMs);
  
  // 상태 표시 업데이트
  updateRealtimeIndicator(true);
}

function stopRealtimeRefresh() {
  if (refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval = null;
  }
  updateRealtimeIndicator(false);
}

function updateRealtimeIndicator(isActive) {
  const indicator = document.getElementById('realtime-indicator');
  if (indicator) {
    if (isActive) {
      indicator.innerHTML = `
        <span class="realtime-dot"></span>
        <span>연동중 (30초)</span>
      `;
    } else {
      indicator.innerHTML = `
        <span class="w-2 h-2 rounded-full bg-gray-400"></span>
        <span class="text-gray-500">연동 중지</span>
      `;
    }
  }
}

// ===== 페이지 초기화 =====
document.addEventListener('DOMContentLoaded', () => {
  initializeMenu();
  initWorkspaceFilter();
});

// 콘솔에 권한 전환 안내
console.log('%c AICC QA 프로토타입', 'font-size: 16px; font-weight: bold; color: #0F766E;');
console.log('권한 전환: switchRole("ADMIN") 또는 switchRole("AGENT")');
console.log('현재 사용자:', currentUser.name, `(${currentUser.role})`);
