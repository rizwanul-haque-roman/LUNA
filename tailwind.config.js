/** @type {import('tailwindcss').Config} */
import daisyui from "./node_modules/daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'login': "url('/loginPage.jpg')",
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light"],
  },
};
