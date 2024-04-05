/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'good-grey': '#2a2a2a',
          'good-dark-grey': '#1a1a1a',
          'blurple': '#7e57c2',
          'light-blurple': '#b39ddb'
      }
    },
    fontFamily: {
      'sans': ['SF Pro', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
    }
  },
  darkMode: 'class',
  plugins: [],
}
