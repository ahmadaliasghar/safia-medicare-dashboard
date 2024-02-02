import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  colors: {
    light: {
      primary: '#23465a',
      secondary: '#EA002A',
      tertiary: '#DFEFFF4D',
      theme: '#F1F3F6ff'
    },
    dark: {
      primary: '#23465a',
      secondary: '#EA002A',
      tertiary: '#1c1816',
      theme: '#dfefff'
    },
  },
  plugins: [],
}
export default config
