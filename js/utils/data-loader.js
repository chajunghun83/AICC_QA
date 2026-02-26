/**
 * AICC QA - Data Loader
 * JSON 파일을 로드하는 유틸리티
 */
window.AICC_DataLoader = {
  cache: {},
  basePath: '',

  /**
   * 현재 페이지 위치에 따라 basePath를 자동 설정
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
   * JSON 데이터 로드 (캐시 지원)
   * @param {string} filename - assets/dummy-data/ 폴더 내 파일명
   * @returns {Promise<any>}
   */
  async load(filename) {
    if (this.cache[filename]) {
      return this.cache[filename];
    }

    // 인라인 데이터 우선 (file:// 프로토콜 호환)
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
   * 여러 파일을 동시에 로드
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
