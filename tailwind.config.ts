import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    backgroundColor: {
      main: "#101010",
      second: "#1e1e1e",
      third: "#2d2d2d",
    },
    colors: {
      main: "#fff",
      second: "#888",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
