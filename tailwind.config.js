module.exports = {
  content: ["./index.html", "./src/**/*.{jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["'Urbanist'", "'Inter'", "system-ui", "sans-serif"],
    },
    extend: {},
  },
  daisyui: {
    themes: ["winter", "night"],
  },
  plugins: [require("daisyui")],
};
