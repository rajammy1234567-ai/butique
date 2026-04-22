export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff5f7',
          100: '#ffe4eb',
          200: '#ffc9d7',
          300: '#ff9eb5',
          400: '#ff6a8c',
          500: '#e84e5e',
          600: '#d62445',
          700: '#c41d3a',
          800: '#a01630',
          900: '#860f27',
        },
        secondary: {
          50: '#faf9f8',
          100: '#f3ede8',
          200: '#e8d5c9',
          300: '#e0b8a0',
          400: '#d89477',
          500: '#d47a56',
          600: '#c85a3e',
          700: '#b64637',
          800: '#963835',
          900: '#7d2f2f',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      animations: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;',
      }
    },
  },
  plugins: [],
};
