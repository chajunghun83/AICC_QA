/**
 * AICC QA - Modal Component
 * 범용 모달 팝업
 */
window.AICC_Modal = {
  isOpen: false,

  /**
   * 모달 열기
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

    // 백드롭 클릭 시 닫기
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) this.close();
    });

    document.body.appendChild(backdrop);
    document.body.style.overflow = 'hidden';

    // 애니메이션
    requestAnimationFrame(() => {
      backdrop.classList.add('active');
    });

    // ESC 키 닫기
    this._escHandler = (e) => {
      if (e.key === 'Escape') this.close();
    };
    document.addEventListener('keydown', this._escHandler);

    this.isOpen = true;
    this._onClose = options.onClose;
  },

  /**
   * 모달 닫기
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
   * 확인 다이얼로그
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
