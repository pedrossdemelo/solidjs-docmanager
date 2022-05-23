module.exports = {
  content: ["./index.html", "./src/**/*.{jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["'Urbanist'", "system-ui", "sans-serif"],
    },
    extend: {},
  },
  daisyui: {
    themes: ["winter", "night"],
  },
  plugins: [require("daisyui")],
};
