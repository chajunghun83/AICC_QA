/**
 * AICC Period Picker - 공통 기간 선택 컴포넌트
 * 일간/주간/월간/년간/사용자 지정 + 달력 UI
 * IIFE 패턴으로 내부 상태를 캡슐화하고 create()만 외부에 노출
 */
const AICC_PeriodPicker = (function() {
  const PERIOD_TYPES = [
    { key: 'daily',   label: '일간' },
    { key: 'weekly',  label: '주간' },
    { key: 'monthly', label: '월간' },
    { key: 'yearly',  label: '년간' },
    { key: 'custom',  label: '사용자 지정' }
  ];
  const WEEKDAYS = ['일','월','화','수','목','금','토'];
  const MONTH_NAMES = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];

  /** 해당 월의 마지막 날짜 계산 (다음 달 0일 = 이번 달 말일) */
  function daysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
  /** 해당 월 1일의 요일 (달력 그리드 시작 위치 결정용) */
  function firstDayOfMonth(y, m) { return new Date(y, m, 1).getDay(); }

  /** Date → 'YYYY-MM-DD' 문자열 변환 (비교/표시용 통일 포맷) */
  function fmt(d) {
    return d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  }

  /** 주어진 날짜가 속한 주의 월~일 범위 반환 (ISO 주 기준: 월요일 시작) */
  function weekRange(date) {
    const d = new Date(date);
    const day = d.getDay();
    const start = new Date(d); start.setDate(d.getDate() - day + 1);
    const end = new Date(start); end.setDate(start.getDate() + 6);
    return { start, end };
  }

  /** 기간 유형별 트리거 버튼에 표시할 한글 텍스트 생성 */
  function displayText(s) {
    const d = s.selectedDate;
    switch (s.periodType) {
      case 'daily':
        return '일간 \u00B7 ' + d.getFullYear() + '년 ' + (d.getMonth()+1) + '월 ' + d.getDate() + '일';
      case 'weekly': {
        const wr = weekRange(d);
        return '주간 \u00B7 ' + (wr.start.getMonth()+1) + '/' + wr.start.getDate() + ' ~ ' + (wr.end.getMonth()+1) + '/' + wr.end.getDate();
      }
      case 'monthly':
        return '월간 \u00B7 ' + d.getFullYear() + '년 ' + (d.getMonth()+1) + '월';
      case 'yearly':
        return '년간 \u00B7 ' + d.getFullYear() + '년';
      case 'custom':
        if (s.customFrom && s.customTo) return '사용자 지정 \u00B7 ' + fmt(s.customFrom) + ' ~ ' + fmt(s.customTo);
        return '사용자 지정';
    }
  }

  /** onChange 콜백에 전달할 구조화된 기간 정보 객체 생성 */
  function dateInfo(s) {
    const d = s.selectedDate;
    switch (s.periodType) {
      case 'daily':   return { type:'daily', date: fmt(d) };
      case 'weekly': { const wr = weekRange(d); return { type:'weekly', from: fmt(wr.start), to: fmt(wr.end) }; }
      case 'monthly': return { type:'monthly', year: d.getFullYear(), month: d.getMonth()+1 };
      case 'yearly':  return { type:'yearly', year: d.getFullYear() };
      case 'custom':  return { type:'custom', from: s.customFrom ? fmt(s.customFrom) : null, to: s.customTo ? fmt(s.customTo) : null };
    }
  }

  /* ── 달력 렌더 ── */
  /** 일간 달력 그리드 렌더링 - 날짜 클릭 시 done() 콜백으로 선택 확정 */
  function renderDayPicker(el, s, done) {
    const y = s.viewYear, m = s.viewMonth;
    const dim = daysInMonth(y, m), fd = firstDayOfMonth(y, m);
    const selStr = fmt(s.selectedDate);
    const today = new Date();

    let h = '<div class="pp-nav">' +
      '<button type="button" class="pp-nav-btn" data-d="pm">\u2039</button>' +
      '<span class="pp-nav-title">' + y + '년 ' + (m+1) + '월</span>' +
      '<button type="button" class="pp-nav-btn" data-d="nm">\u203A</button></div>';
    h += '<div class="pp-cal-grid">';
    WEEKDAYS.forEach(w => { h += '<div class="pp-weekday">' + w + '</div>'; });
    for (let i = 0; i < fd; i++) h += '<div class="pp-day empty"></div>';
    for (let d = 1; d <= dim; d++) {
      const ds = fmt(new Date(y, m, d));
      let c = 'pp-day';
      if (ds === selStr) c += ' selected';
      if (y === today.getFullYear() && m === today.getMonth() && d === today.getDate()) c += ' today';
      h += '<div class="' + c + '" data-d="' + ds + '">' + d + '</div>';
    }
    h += '</div>';
    el.innerHTML = h;

    el.querySelector('[data-d="pm"]').onclick = function() { s.viewMonth--; if (s.viewMonth < 0) { s.viewMonth = 11; s.viewYear--; } renderDayPicker(el, s, done); };
    el.querySelector('[data-d="nm"]').onclick = function() { s.viewMonth++; if (s.viewMonth > 11) { s.viewMonth = 0; s.viewYear++; } renderDayPicker(el, s, done); };
    el.querySelectorAll('.pp-day:not(.empty)').forEach(function(c) {
      c.onclick = function() { s.selectedDate = new Date(c.dataset.d + 'T00:00:00'); done(); };
    });
  }

  /** 주간 선택 달력 - 마우스 호버 시 해당 주 전체를 하이라이트 */
  function renderWeekPicker(el, s, done) {
    const y = s.viewYear, m = s.viewMonth;
    const dim = daysInMonth(y, m), fd = firstDayOfMonth(y, m);
    const selWr = weekRange(s.selectedDate);
    const selKey = fmt(selWr.start);

    let h = '<div class="pp-nav">' +
      '<button type="button" class="pp-nav-btn" data-d="pm">\u2039</button>' +
      '<span class="pp-nav-title">' + y + '년 ' + (m+1) + '월</span>' +
      '<button type="button" class="pp-nav-btn" data-d="nm">\u203A</button></div>';
    h += '<div class="pp-cal-grid week-mode">';
    WEEKDAYS.forEach(w => { h += '<div class="pp-weekday">' + w + '</div>'; });

    // 이전/다음 달 날짜를 포함해 전체 주를 완성 (주 단위 선택이므로 필수)
    var cells = [];
    for (let i = 0; i < fd; i++) {
      var pm = m === 0 ? 11 : m - 1, py = m === 0 ? y - 1 : y;
      var pd = daysInMonth(py, pm) - fd + i + 1;
      cells.push({ day: pd, date: new Date(py, pm, pd), other: true });
    }
    for (let d = 1; d <= dim; d++) cells.push({ day: d, date: new Date(y, m, d), other: false });
    var rem = 7 - (cells.length % 7); if (rem < 7) {
      var nm2 = m === 11 ? 0 : m + 1, ny = m === 11 ? y + 1 : y;
      for (let d = 1; d <= rem; d++) cells.push({ day: d, date: new Date(ny, nm2, d), other: true });
    }

    cells.forEach(function(it) {
      var wr = weekRange(it.date), wk = fmt(wr.start);
      var c = 'pp-day';
      if (it.other) c += ' other';
      if (wk === selKey) c += ' week-sel';
      h += '<div class="' + c + '" data-d="' + fmt(it.date) + '" data-wk="' + wk + '">' + it.day + '</div>';
    });
    h += '</div>';
    el.innerHTML = h;

    el.querySelector('[data-d="pm"]').onclick = function() { s.viewMonth--; if (s.viewMonth < 0) { s.viewMonth = 11; s.viewYear--; } renderWeekPicker(el, s, done); };
    el.querySelector('[data-d="nm"]').onclick = function() { s.viewMonth++; if (s.viewMonth > 11) { s.viewMonth = 0; s.viewYear++; } renderWeekPicker(el, s, done); };

    var grid = el.querySelector('.pp-cal-grid');
    grid.addEventListener('mouseover', function(e) {
      var t = e.target.closest('.pp-day');
      if (!t) return;
      var wk = t.dataset.wk;
      grid.querySelectorAll('.pp-day').forEach(function(d) { d.classList.toggle('week-hover', d.dataset.wk === wk); });
    });
    grid.addEventListener('mouseleave', function() { grid.querySelectorAll('.pp-day').forEach(function(d) { d.classList.remove('week-hover'); }); });

    el.querySelectorAll('.pp-day:not(.empty)').forEach(function(c) {
      c.onclick = function() { s.selectedDate = new Date(c.dataset.d + 'T00:00:00'); done(); };
    });
  }

  /** 월간 선택기 - 12개월 그리드로 표시 */
  function renderMonthPicker(el, s, done) {
    const selY = s.selectedDate.getFullYear(), selM = s.selectedDate.getMonth();
    let h = '<div class="pp-nav">' +
      '<button type="button" class="pp-nav-btn" data-d="py">\u2039</button>' +
      '<span class="pp-nav-title">' + s.viewYear + '년</span>' +
      '<button type="button" class="pp-nav-btn" data-d="ny">\u203A</button></div>';
    h += '<div class="pp-month-grid">';
    MONTH_NAMES.forEach(function(mn, i) {
      var c = 'pp-month-cell';
      if (s.viewYear === selY && i === selM) c += ' selected';
      h += '<div class="' + c + '" data-m="' + i + '">' + mn + '</div>';
    });
    h += '</div>';
    el.innerHTML = h;

    el.querySelector('[data-d="py"]').onclick = function() { s.viewYear--; renderMonthPicker(el, s, done); };
    el.querySelector('[data-d="ny"]').onclick = function() { s.viewYear++; renderMonthPicker(el, s, done); };
    el.querySelectorAll('.pp-month-cell').forEach(function(c) {
      c.onclick = function() { s.selectedDate = new Date(s.viewYear, parseInt(c.dataset.m), 1); done(); };
    });
  }

  /** 년간 선택기 - 12년 단위로 페이지네이션 */
  function renderYearPicker(el, s, done) {
    const selY = s.selectedDate.getFullYear();
    const base = s.yearBase;
    let h = '<div class="pp-nav">' +
      '<button type="button" class="pp-nav-btn" data-d="pp">\u2039</button>' +
      '<span class="pp-nav-title">' + base + ' ~ ' + (base + 11) + '년</span>' +
      '<button type="button" class="pp-nav-btn" data-d="np">\u203A</button></div>';
    h += '<div class="pp-year-grid">';
    for (let i = 0; i < 12; i++) {
      var yr = base + i, c = 'pp-year-cell';
      if (yr === selY) c += ' selected';
      h += '<div class="' + c + '" data-y="' + yr + '">' + yr + '년</div>';
    }
    h += '</div>';
    el.innerHTML = h;

    el.querySelector('[data-d="pp"]').onclick = function() { s.yearBase -= 12; renderYearPicker(el, s, done); };
    el.querySelector('[data-d="np"]').onclick = function() { s.yearBase += 12; renderYearPicker(el, s, done); };
    el.querySelectorAll('.pp-year-cell').forEach(function(c) {
      c.onclick = function() { var yr = parseInt(c.dataset.y); s.selectedDate = new Date(yr, 0, 1); s.viewYear = yr; done(); };
    });
  }

  /** 사용자 지정 기간 - 시작일/종료일 input[type=date]로 직접 입력 (하단 확인 버튼으로 최종 적용) */
  function renderCustomPicker(el, s, done) {
    var fv = s.customFrom ? fmt(s.customFrom) : '', tv = s.customTo ? fmt(s.customTo) : '';
    el.innerHTML = '<div class="pp-custom">' +
      '<div class="pp-custom-field"><label>시작일</label><input type="date" class="form-input" id="pp-cf" value="' + fv + '"></div>' +
      '<span class="pp-custom-sep">~</span>' +
      '<div class="pp-custom-field"><label>종료일</label><input type="date" class="form-input" id="pp-ct" value="' + tv + '"></div></div>';
    // 입력 변경 시 임시 상태에 반영 (확인 버튼 클릭 시 최종 적용됨)
    el.querySelector('#pp-cf').onchange = function() {
      var v = this.value;
      if (v) s.customFrom = new Date(v + 'T00:00:00');
    };
    el.querySelector('#pp-ct').onchange = function() {
      var v = this.value;
      if (v) s.customTo = new Date(v + 'T00:00:00');
    };
  }

  /* ── Public API ── */
  /**
   * 기간 선택기 인스턴스 생성
   * 2패널 레이아웃: 좌측 프리셋 사이드바 + 우측 달력 + 하단 취소/확인 버튼
   * 날짜 선택은 임시 상태로 유지하다가 "확인" 클릭 시 최종 반영
   */
  function create(containerId, opts) {
    opts = opts || {};
    var el = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    if (!el) return null;

    var now = new Date();
    var s = {
      periodType: opts.defaultPeriod || 'monthly',
      selectedDate: opts.defaultDate ? new Date(opts.defaultDate) : new Date(),
      customFrom: null, customTo: null,
      viewYear: now.getFullYear(), viewMonth: now.getMonth(),
      yearBase: Math.floor(now.getFullYear() / 12) * 12,
      isOpen: false,
      onChange: opts.onChange || function() {}
    };

    // 팝업 열릴 때 스냅샷 저장용 (취소 시 복원)
    var snapshot = {};
    function saveSnapshot() {
      snapshot = {
        periodType: s.periodType,
        selectedDate: new Date(s.selectedDate),
        customFrom: s.customFrom ? new Date(s.customFrom) : null,
        customTo: s.customTo ? new Date(s.customTo) : null
      };
    }
    function restoreSnapshot() {
      s.periodType = snapshot.periodType;
      s.selectedDate = new Date(snapshot.selectedDate);
      s.customFrom = snapshot.customFrom ? new Date(snapshot.customFrom) : null;
      s.customTo = snapshot.customTo ? new Date(snapshot.customTo) : null;
    }

    el.className = (el.className ? el.className + ' ' : '') + 'pp-wrap';
    el.innerHTML =
      '<button type="button" class="pp-trigger">' +
        '<span class="pp-label"></span>' +
        '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>' +
      '</button>' +
      '<div class="pp-popup" style="display:none">' +
        '<div class="pp-sidebar"></div>' +
        '<div class="pp-main">' +
          '<div class="pp-body"></div>' +
          '<div class="pp-footer">' +
            '<button type="button" class="pp-footer-btn" data-action="cancel">취소</button>' +
            '<button type="button" class="pp-footer-btn primary" data-action="apply">확인</button>' +
          '</div>' +
        '</div>' +
      '</div>';

    var trigger = el.querySelector('.pp-trigger');
    var popup = el.querySelector('.pp-popup');
    var sidebar = el.querySelector('.pp-sidebar');
    var body = el.querySelector('.pp-body');

    PERIOD_TYPES.forEach(function(pt) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = pt.label;
      btn.className = 'pp-tab' + (pt.key === s.periodType ? ' active' : '');
      btn.dataset.key = pt.key;
      btn.onclick = function() {
        s.periodType = pt.key;
        sidebar.querySelectorAll('.pp-tab').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        renderBody();
      };
      sidebar.appendChild(btn);
    });

    function close() { s.isOpen = false; popup.style.display = 'none'; }
    function updateLabel() { el.querySelector('.pp-label').textContent = displayText(s); }

    /** 달력 내 날짜 클릭 시 — 즉시 닫지 않고 임시 선택만 반영 후 달력 재렌더 */
    function onTempSelect() { renderBody(); }

    function renderBody() {
      switch (s.periodType) {
        case 'daily':   renderDayPicker(body, s, onTempSelect); break;
        case 'weekly':  renderWeekPicker(body, s, onTempSelect); break;
        case 'monthly': renderMonthPicker(body, s, onTempSelect); break;
        case 'yearly':  renderYearPicker(body, s, onTempSelect); break;
        case 'custom':  renderCustomPicker(body, s, onTempSelect); break;
      }
    }

    // 확인 버튼: 현재 임시 선택을 최종 확정
    popup.querySelector('[data-action="apply"]').onclick = function(e) {
      e.stopPropagation();
      if (s.periodType === 'custom' && (!s.customFrom || !s.customTo)) {
        if (window.AICC_Toast) AICC_Toast.show('시작일과 종료일을 모두 선택해주세요.');
        return;
      }
      updateLabel();
      close();
      s.onChange(s.periodType, dateInfo(s));
    };

    // 취소 버튼: 스냅샷으로 복원 후 닫기
    popup.querySelector('[data-action="cancel"]').onclick = function(e) {
      e.stopPropagation();
      restoreSnapshot();
      updateLabel();
      close();
    };

    trigger.onclick = function(e) {
      e.stopPropagation();
      if (s.isOpen) { restoreSnapshot(); updateLabel(); close(); return; }
      saveSnapshot();
      s.isOpen = true;
      s.viewYear = s.selectedDate.getFullYear();
      s.viewMonth = s.selectedDate.getMonth();
      s.yearBase = Math.floor(s.viewYear / 12) * 12;
      popup.style.display = 'flex';
      // 팝업이 화면 밖으로 넘치면 방향 자동 전환
      popup.style.right = '0'; popup.style.left = 'auto';
      var popupRect = popup.getBoundingClientRect();
      if (popupRect.left < 0) { popup.style.right = 'auto'; popup.style.left = '0'; }
      // 사이드바 active 상태 동기화
      sidebar.querySelectorAll('.pp-tab').forEach(function(b) { b.classList.toggle('active', b.dataset.key === s.periodType); });
      renderBody();
    };

    // 팝업 외부 클릭 시 취소와 동일하게 동작 (스냅샷 복원)
    document.addEventListener('click', function(e) {
      if (s.isOpen && !el.contains(e.target)) { restoreSnapshot(); updateLabel(); close(); }
    });

    updateLabel();
    return { state: s, refresh: updateLabel };
  }

  return { create: create };
})();
