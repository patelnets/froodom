/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react');
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  prefix: '',
  theme: {
    extend: {
      colors: {
        'pastel-red': '#FFB6A0',
        'pastel-green': '#A4FFD4',
        'pastel-yellow': '#FFEEAD',
        'pastel-brown': '#D2A178',
        'pastel-beige': '#FFF1D9',
        'pastel-blue': '#A6D5E3',
        'pastel-orange': '#FFC68A',
        'pastel-gray': '#CCCCCC',
        'dark-brown': '#352B29',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: '#FFF1D9', // or DEFAULT
            foreground: '#D2A178', // or 50 to 900 DEFAULT
            primary: {
              //... 50 to 900
              foreground: '#D2A178',
              DEFAULT: '#352B29',
            },
            danger: "#FFB6A0"
            // ... rest of the colors
          },
        },
        dark: {
          colors: {
            background: '#000000', // or DEFAULT
            foreground: '#ECEDEE', // or 50 to 900 DEFAULT
            primary: {
              //... 50 to 900
              foreground: '#FFFFFF',
              DEFAULT: '#006FEE',
            },
          },
          // ... rest of the colors
        },
      },
    }),
  ],
};
