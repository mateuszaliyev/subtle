import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const tailwindCssConfig: Config = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["JetBrains Mono Variable", ...fontFamily.mono],
        sans: ["Space Grotesk Variable", ...fontFamily.sans],
      },
    },
  },
};

export default tailwindCssConfig;
