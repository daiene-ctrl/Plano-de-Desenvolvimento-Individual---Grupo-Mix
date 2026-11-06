/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mix: {
          blue: '#0072BC',
          green: '#70B62C',
          dark: '#1E293B',
          light: '#F8FAFC'
        }
      }
    },
  },
  plugins: [],
}
