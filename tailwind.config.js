/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: "class",
  corePlugins: {
    preflight: false,
  },
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  important: "#___gatsby",
  theme: {
    extend: {},
  },
  plugins: [],
}
