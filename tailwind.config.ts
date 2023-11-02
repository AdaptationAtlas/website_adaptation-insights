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
        'lcd-blue': '#2F39FF',
        'crt-green': '#12ED42',
        'crt-green-2': '#6BF575',
        'crt-red': '#FB3F37'
      }
    },
  },
  plugins: [],
}
export default config
