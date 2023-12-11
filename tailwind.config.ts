import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeIn 300ms ease-out forwards',
      },
      colors: {
        'off-white': '#FCFCFC',
        'brand': {
          'green': '#2E7636',
          'light-green': '#73B959',
          'blue': '#009ADB',
          'gold': '#FFC84F',
          'dark-gold': '#E9B034',
          'light-gold': '#F5E4BD',
          'red': '#EC5A47',
          'dark-red': '#DA4532',
          'teal': '#387B94',
          'light-teal': '#BCD0D7',
          'burgundy': '#B4436C'
        },
        'grey': {
          'lightest': '#F6F6F6',
          100: '#EBEBEB',
          200: '#E9E9E9',
          300: '#B7B7B7',
          500: '#636363',
          700: '#2D2D2D'
        },
        'bucket': {
          100: '#94D851',
          200: '#74CB6C',
          300: '#31C6AD',
          400: '#29B5D4',
          500: '#2290DF'
        },
      }
    },
  },
  plugins: [],
}
export default config
