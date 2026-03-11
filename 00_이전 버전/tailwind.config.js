/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        // 기존 AICC 플랫폼 색상 시스템
        primary: {
          DEFAULT: '#0F766E',
          dark: '#0D5D56',
          light: '#F0FDFA'
        },
        success: '#4CAF50',
        warning: '#FFC107',
        danger: '#F44336',
        
        // AI/NLP 배지 색상
        ai: {
          DEFAULT: '#FF9800',
          light: '#FFF3E0',
          border: '#FFE0B2'
        },
        nlp: {
          DEFAULT: '#2196F3',
          light: '#E3F2FD',
          border: '#BBDEFB'
        },
        
        // 배경/텍스트
        bg: {
          primary: '#F5F5F5',
          white: '#FFFFFF',
          hover: '#F5F5F5'
        },
        text: {
          primary: '#212121',
          secondary: '#757575'
        },
        border: {
          DEFAULT: '#E0E0E0',
          light: '#F0F0F0'
        }
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    }
  },
  plugins: []
}
