import type { Config } from 'tailwindcss'
import { themeColors } from './constants'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    colors: themeColors,
    extend: {
      fontSize: {
        h1: '2.25rem',
        h2: '1.875rem',
        h3: '1.5rem',
        h4: '1.25rem',
        h5: '1rem',
        h6: '0.875rem'
      }
    }
  },
  plugins: []
}
export default config
