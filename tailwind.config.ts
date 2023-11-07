import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cgiar-green': '#2E7636',
        'alliance-blue': '#009ADB',
        'cgiar-gold': '#FFC84F',
        'cgiar-dark-gold': '#E9B034',
        'gender-red': '#EC5A47',
        'gender-dark-red': '#DA4532',
        'tropical-teal': '#387B94',
        'project-burgundy': '#B4436C',
        'environment-green': '#73B959',
        'off-white': '#FCFCFC',
        'grey': {
          100: '#EBEBEB',
          200: '#E9E9E9',
          300: '#B7B6B6'
        }
      }
    },
  },
  plugins: [],
}
export default config
