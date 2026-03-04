/**
 * AICC QA - Data Loader
 * JSON 더미 데이터 로드 유틸리티
 * file:// 프로토콜에서는 fetch가 실패하므로 인라인 데이터(AICC_DATA)를 우선 사용
 */
window.AICC_DataLoader = {
  cache: {},   // 파일명 기준 메모리 캐시 (동일 데이터 중복 요청 방지)
  basePath: '',

  /**
   * 페이지 깊이에 따라 basePath 설정
   * layout.js의 getBasePath()와 동일한 로직 (독립 모듈이므로 별도 관리)
   */
  init() {
    const path = window.location.pathname;
    if (path.includes('/pages/admin/system-settings/')) {
      this.basePath = '../../../';
    } else if (path.includes('/pages/admin/') || path.includes('/pages/agent/')) {
      this.basePath = '../../';
    } else {
      this.basePath = './';
    }
  },

  /**
   * JSON 데이터 로드 (캐시 → 인라인 → fetch 순으로 폴백)
   * @param {string} filename - assets/dummy-data/ 폴더 내 파일명
   * @returns {Promise<any>}
   */
  async load(filename) {
    if (this.cache[filename]) {
      return this.cache[filename];
    }

    // all-data.js에서 주입한 인라인 데이터 우선 사용 (file:// 환경 대응)
    if (window.AICC_DATA && window.AICC_DATA[filename]) {
      this.cache[filename] = window.AICC_DATA[filename];
      return this.cache[filename];
    }

    try {
      const url = `${this.basePath}assets/dummy-data/${filename}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      this.cache[filename] = data;
      return data;
    } catch (e) {
      console.warn(`[DataLoader] Failed to load ${filename}:`, e.message);
      return null;
    }
  },

  /**
   * 여러 파일을 병렬로 동시 로드
   * 페이지 초기화 시 필요한 데이터를 한 번에 가져오기 위해 사용
   * @param {string[]} filenames
   * @returns {Promise<Object>} filename -> data 맵
   */
  async loadAll(filenames) {
    const results = {};
    const promises = filenames.map(async (f) => {
      results[f] = await this.load(f);
    });
    await Promise.all(promises);
    return results;
  }
};

// 자동 초기화
AICC_DataLoader.init();
