/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Unbounded', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Be Vietnam Pro"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        espresso: '#140F0B',
        mocha: '#211813',
        walnut: '#31241A',
        cream: {
          DEFAULT: '#F6F1E7',
          light: '#FFFDF9',
          dark: '#E8DFCE',
          gold: '#DFC9A6',
        },
        burgundy: '#7A181D',
        sghp: {
          red: '#A6191E',
          yellow: '#FBB03B',
        },
        ueh: {
          teal: '#005F69',
          orange: '#F26F33',
        },
      },
      animation: {
        'grain': 'grainShift 7s steps(10) infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        grainShift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-2.5%, 2%)' },
          '50%': { transform: 'translate(2%, -2.5%)' },
          '75%': { transform: 'translate(-1.5%, -1.5%)' },
        },
      },
    },
  },
  plugins: [],
}
