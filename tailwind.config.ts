import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#a6fe71",
        primary2: "#FFFF80",
        "bg-color": "#242428",
        "bg-color-2": "#333338",
      },
      backgroundImage: {
        "bg-img-1": "url('../assets/img.jpg')",
        "bg-img-2": "url('../assets/img2.jpg')",
        "bg-img-3": "url('../assets/img1.jpg')",
        "bg-img-4": "url('../assets/img3.jpg')",
      },
    },
  },
  plugins: [],
};
export default config;
