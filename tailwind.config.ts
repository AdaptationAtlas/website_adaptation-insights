import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    extend: {
      // keyframes and animation properties for staggered fade in animation of list items
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
          400: '#CCCCCC',
          500: '#7A7A7A',
          600: '#636363',
          700: '#2D2D2D'
        },
        'bucket': {
          100: '#73BA5A',
          200: '#6EB17C',
          300: '#62A99D',
          400: '#4BA2BD',
          500: '#019BDC'
        },
      }
    },
  },
  plugins: [],
}
export default config
