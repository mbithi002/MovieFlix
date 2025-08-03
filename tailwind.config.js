/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#030014',
        secondary: '#151312',
        light: {
          100: '#D6C6FF',
          200: '#A8B5DB',
          300: '#9CA4AB',
        },
        dark: {
          100: '#221f3d',
          200: '#0f0d23',
        },
        accent: '£AB8BFF',
        // background: {
        //   DEFAULT: '#0F0F0F',
        //   light: '#1C1C1C',
        // },
        // primary: {
        //   DEFAULT: '#E50914',
        //   dark: '#B20710',
        // },
        // accent: {
        //   yellow: '#F5C518',
        //   blue: '#3B82F6',
        // },
        // text: {
        //   DEFAULT: '#FFFFFF',
        //   muted: '#B3B3B3',
        // },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
    },
  },
  plugins: [],
}