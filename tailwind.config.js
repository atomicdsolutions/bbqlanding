/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ph-purple': '#5D2E8C', // Main purple color from logo
        'ph-gold': '#DAB03C',   // Gold color from logo
        'ph-dark': '#2D1843',   // Darker purple for contrast
        'ph-light': '#F5F0FF',  // Light purple for backgrounds
        'ph-black': '#212121',  // Dark text color
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('/images/hero-bg.jpg')",
      },
      aspectRatio: {
        '16/9': '16 / 9',
        '16/10': '16 / 10',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};