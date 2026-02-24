/** @type {import('tailwindcss').Config} */
import { tailwindColors } from './src/theme/colors.js'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...tailwindColors,
        gray: {
          200: '#000000',
        },
      },
      fontFamily: {
        display: ['Fredoka', 'Heebo', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Heebo', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'page-enter': 'pageEnter 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'music-btn-enter': 'musicBtnEnter 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards',
        'lang-switch': 'langSwitch 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pageEnter: {
          '0%': { opacity: '0', transform: 'translateY(24px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        langSwitch: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        musicBtnEnter: {
          '0%': { opacity: '0', transform: 'translateY(16px) scale(0.9)' },
          '70%': { opacity: '1', transform: 'translateY(-2px) scale(1.02)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 10px 40px rgba(0, 0, 0, 0.08)',
      },
      minHeight: {
        'screen-dvh': '100dvh',
        'screen-safe': '100dvh',
      },
    },
  },
  plugins: [],
}
