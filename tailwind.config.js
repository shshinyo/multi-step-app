/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      borderColor: {
        secondary: "#d9d9de", // e.g., '#e2e8f0'
      },
      colors: {
        "positive-interactive": "#46835D",
        "secondary-static": "#747583",
        "card-secondary": "#f7f7f8",
        "input-default": "#eeeef0",
        "positive-interactive-dark": "#76a688",
      },
      screens: {
        tablet: "768px",
        mdScreen: "992px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
