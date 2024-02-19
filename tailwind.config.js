/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'good-grey': '#2a2a2a',
        'good-dark-grey': '#1a1a1a',
      }
    },
    fontFamily: {
      'sans': ['SF Pro', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
    }
  },
  plugins: [],
}
