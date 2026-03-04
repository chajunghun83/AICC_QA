/**
 * AICC QA - Toast Notification
 * 화면 하단 중앙에 일시적 알림을 표시하는 싱글턴 컴포넌트
 */
window.AICC_Toast = {
  /**
   * 토스트 메시지 표시
   * 중복 표시를 방지하기 위해 기존 토스트를 먼저 제거
   * @param {string} message
   * @param {number} duration - 표시 시간 (ms)
   */
  show(message, duration = 3000) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // DOM 삽입 후 rAF로 show 클래스를 추가해야 fade-in 애니메이션 동작
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // fade-out 완료(300ms) 후 DOM에서 제거
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};
