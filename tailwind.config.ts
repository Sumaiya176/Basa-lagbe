import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.js",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      screens: {
        "3xs": "320px",
        "2xs": "385px",
        "1xs": "425px",
        "2md": "850px",
        "1md": "950px",
        "3xl": "1920px",
      },
      backgroundImage: {
        hero: "url('/leaf.jpg')",
      },
    },
  },
  plugins: [require("daisyui"), require("flowbite/plugin")],
};

export default config;
