/**
 * AICC QA - Formatters
 * 숫자, 날짜, 점수 포맷팅 유틸리티
 */
window.AICC_Fmt = {
  /**
   * 숫자에 콤마 추가
   */
  number(n) {
    if (n == null) return '-';
    return n.toLocaleString('ko-KR');
  },

  /**
   * 퍼센트 표시
   */
  percent(n, decimals = 1) {
    if (n == null) return '-';
    return n.toFixed(decimals) + '%';
  },

  /**
   * 점수 표시 (소수점 1자리)
   */
  score(n) {
    if (n == null) return '-';
    return Number(n).toFixed(1);
  },

  /**
   * 점수에 따른 상태 클래스
   */
  scoreStatus(score) {
    if (score >= 80) return 'good';
    if (score >= 60) return 'warn';
    return 'danger';
  },

  /**
   * 점수 색상 HTML (도트 + 숫자)
   */
  scoreHtml(score) {
    const status = this.scoreStatus(score);
    return `<span class="score-dot score-dot-${status}"></span><span class="score-${status}">${this.score(score)}</span>`;
  },

  /**
   * 점수 색상 값 반환
   */
  scoreColor(score) {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#FFC107';
    return '#F44336';
  },

  /**
   * 날짜 포맷 (YYYY.MM.DD)
   */
  date(dateStr) {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
  },

  /**
   * 시간 포맷 (HH:mm)
   */
  time(timeStr) {
    if (!timeStr) return '-';
    return timeStr;
  },

  /**
   * 날짜+시간 포맷
   */
  datetime(dateStr) {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return `${this.date(dateStr)} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  },

  /**
   * 통화 시간 포맷 (mm:ss)
   */
  duration(str) {
    return str || '-';
  },

  /**
   * 평가 방식 배지 HTML
   */
  typeBadge(type) {
    const map = {
      'AI': '<span class="badge badge-ai">AI</span>',
      'NLP': '<span class="badge badge-nlp">NLP</span>',
      'Manual': '<span class="badge badge-manual">수동</span>'
    };
    return map[type] || type;
  },

  /**
   * 상태 배지 HTML
   */
  statusBadge(status, text) {
    const map = {
      'active': 'badge-active',
      'inactive': 'badge-inactive',
      'pending': 'badge-pending',
      'completed': 'badge-completed',
      'rejected': 'badge-rejected'
    };
    const cls = map[status] || 'badge-active';
    return `<span class="badge ${cls}">${text || status}</span>`;
  },

  /**
   * 증감 표시 (화살표 + 수치)
   */
  trend(current, previous) {
    if (previous == null) return '';
    const diff = current - previous;
    if (Math.abs(diff) < 0.1) return '<span style="color:#757575">-</span>';
    const arrow = diff > 0 ? '&#9650;' : '&#9660;';
    const color = diff > 0 ? '#4CAF50' : '#F44336';
    return `<span style="color:${color}">${arrow} ${Math.abs(diff).toFixed(1)}</span>`;
  }
};
