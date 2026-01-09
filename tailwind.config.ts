import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          900: 'var(--gray-900)',
          600: 'var(--gray-600)',
          200: 'var(--gray-200)',
          100: 'var(--gray-100)',
        },
        red: { 500: 'var(--red-500)' },
        pink: { 100: 'var(--pink-100)' },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
} satisfies Config
