import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin-slow 4s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bear-walk': 'bear-walk 4s ease-in-out infinite',
      },
      keyframes: {
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'bear-walk': {
          '0%, 100%': { transform: 'translateX(0px) scale(1)' },
          '25%': { transform: 'translateX(10px) scale(1.05)' },
          '50%': { transform: 'translateX(20px) scale(1)' },
          '75%': { transform: 'translateX(10px) scale(0.95)' },
        },
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        ring: 'hsl(var(--ring))',
        input: 'hsl(var(--input))',
        // Bear-themed colors
        bear: {
          50: '#fdf8f3',
          100: '#f9e8d8',
          200: '#f3d1b5',
          300: '#eab388',
          400: '#e08c5a',
          500: '#d6733d',
          600: '#c75a2e',
          700: '#a64428',
          800: '#843a2a',
          900: '#6b3226',
        },
        forest: {
          50: '#f0f9f4',
          100: '#dcf2e3',
          200: '#bce4c9',
          300: '#8dd0a3',
          400: '#56b375',
          500: '#3a9a5d',
          600: '#2e7b4c',
          700: '#28623f',
          800: '#234e35',
          900: '#1f412e',
        },
      },
    },
  },
  plugins: [],
}

export default config 