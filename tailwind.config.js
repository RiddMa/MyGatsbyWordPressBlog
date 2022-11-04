/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: "class",
  corePlugins: {
    preflight: false,
  },
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
  ],
  important: "#___gatsby",
  theme: {
    extend: {},
  },
  variants: {
    textColor: ["group-hover"],
    extend: {
      display: ["dark"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
}
