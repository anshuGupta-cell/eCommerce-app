module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: 'selector',
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-none": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",

        },
        ".scrollbar-none::-webkit-scrollbar": {
          "display": "grid",
          "background": "black"
        },
        ".res-grid-180": {
          "grid-template-columns": "repeat(auto-fit, minmax(180, 1fr))"
        },
        ".res-grid-200": {
          "grid-template-columns": "repeat(auto-fit, minmax(200, 1fr))"
        },
        ".res-grid-280": {
          "grid-template-columns": "repeat(auto-fit, minmax(280, 1fr))"
        },
        
      })
    }
  ],
}