import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14243d",
        muted: "#718096",
        canvas: "#f7f9fc",
        brand: "#3265e6",
        mint: "#119b78",
        lilac: "#7658d9",
        line: "#e6ebf2"
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "sans-serif"],
        display: ["var(--font-jakarta)", "sans-serif"]
      },
      boxShadow: { soft: "0 8px 30px rgba(20,36,61,.06)" }
    }
  },
  plugins: []
};
export default config;
