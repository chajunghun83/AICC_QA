/**
 * AICC QA - Toast Notification
 */
window.AICC_Toast = {
  /**
   * 토스트 메시지 표시
   * @param {string} message
   * @param {number} duration - 표시 시간 (ms)
   */
  show(message, duration = 3000) {
    // 기존 토스트 제거
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};
