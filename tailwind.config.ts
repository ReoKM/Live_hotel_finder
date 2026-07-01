import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        agoda: { DEFAULT: '#5392F9', dark: '#3B73E0', light: '#EBF1FF' },
      },
    },
  },
  plugins: [],
};

export default config;
