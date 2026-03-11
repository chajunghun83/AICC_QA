/**
 * AICC QA - Modal Component
 * 범용 모달 팝업
 * 여러 페이지에서 동일한 모달 UX를 제공하기 위해 싱글턴 패턴으로 관리
 */
window.AICC_Modal = {
  isOpen: false,

  /**
   * 모달 열기
   * 동시에 1개만 표시되도록 기존 모달이 있으면 먼저 닫음
   * @param {Object} options
   * @param {string} options.title - 모달 제목
   * @param {string} options.content - 모달 본문 HTML
   * @param {string} [options.footer] - 모달 푸터 HTML (버튼 등)
   * @param {string} [options.size] - 'sm' | 'md' | 'lg' | 'xl' (기본 md)
   * @param {Function} [options.onClose] - 닫기 콜백
   */
  open(options) {
    if (this.isOpen) this.close();

    const sizeMap = {
      sm: '480px',
      md: '640px',
      lg: '800px',
      xl: '1000px',
      xxl: '1300px',
      full: '90%'
    };
    const maxWidth = sizeMap[options.size || 'lg'] || '800px';

    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.id = 'aicc-modal-backdrop';

    backdrop.innerHTML = `
      <div class="modal-container" style="max-width:${maxWidth};" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h3 style="font-size:16px;font-weight:700;color:#212121;margin:0;">${options.title || ''}</h3>
          <button onclick="AICC_Modal.close()" style="background:none;border:none;cursor:pointer;color:#757575;padding:4px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        <div class="modal-body">
          ${options.content || ''}
        </div>
        ${options.footer ? `<div class="modal-footer">${options.footer}</div>` : ''}
      </div>
    `;

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) this.close();
    });

    document.body.appendChild(backdrop);
    document.body.style.overflow = 'hidden';

    // DOM 삽입 직후 rAF로 class를 추가해야 CSS transition이 정상 작동
    requestAnimationFrame(() => {
      backdrop.classList.add('active');
    });

    this._escHandler = (e) => {
      if (e.key === 'Escape') this.close();
    };
    document.addEventListener('keydown', this._escHandler);

    this.isOpen = true;
    this._onClose = options.onClose;
  },

  /**
   * 모달 닫기
   * 닫힘 애니메이션(200ms) 완료 후 DOM에서 제거
   */
  close() {
    const backdrop = document.getElementById('aicc-modal-backdrop');
    if (!backdrop) return;

    backdrop.classList.remove('active');
    setTimeout(() => {
      backdrop.remove();
      document.body.style.overflow = '';
    }, 200);

    if (this._escHandler) {
      document.removeEventListener('keydown', this._escHandler);
    }

    this.isOpen = false;
    if (this._onClose) this._onClose();
  },

  /**
   * 확인/취소 다이얼로그 - 간편 래퍼
   * onConfirm을 toString()으로 인라인 실행하여 별도 바인딩 없이 동작
   */
  confirm(message, onConfirm) {
    this.open({
      title: '확인',
      size: 'sm',
      content: `<p style="font-size:14px;color:#424242;">${message}</p>`,
      footer: `
        <button class="btn btn-secondary" onclick="AICC_Modal.close()">취소</button>
        <button class="btn btn-primary" onclick="AICC_Modal.close(); (${onConfirm.toString()})();">확인</button>
      `
    });
  }
};
