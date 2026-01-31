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
        watercolor: {
          50: '#faf7f5',
          100: '#f5ede8',
          200: '#e8d5c8',
          300: '#dbbda8',
          400: '#c89d7f',
          500: '#b58565',
          600: '#9d6f54',
          700: '#7f5843',
          800: '#604337',
          900: '#4a352d',
        },
        sage: {
          50: '#f6f8f6',
          100: '#e8ede8',
          200: '#d0dcd0',
          300: '#a8bfa8',
          400: '#7d9e7d',
          500: '#5f8360',
          600: '#4a6a4b',
          700: '#3b543c',
          800: '#324532',
          900: '#2a392a',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
