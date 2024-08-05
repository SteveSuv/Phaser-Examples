import { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: { fontFamily: { Merriweather: "Merriweather" } },
  },
  darkMode: "class",
  plugins: [],
} satisfies Config;
