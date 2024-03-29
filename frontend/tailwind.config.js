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
        black: '#000000',
        'dark-cream': '#F4DFC8',
        cream: '#F4EAE0',
        'light-cream': '#FAF6F0',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: '#F4EAE0',
            foreground: '#000000',
            primary: {
              foreground: '#D2A178',
              DEFAULT: '#352B29',
            },
            danger: '#FFB6A0',
          },
        },
        dark: {
          colors: {
            background: '#000000',
            foreground: '#ECEDEE',
            primary: {
              foreground: '#FFFFFF',
              DEFAULT: '#006FEE',
            },
          },
        },
      },
    }),
  ],
};
