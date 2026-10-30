/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0B0E14',
          surface: '#151B26',
          border: '#253043',
          text: '#F1F5F9',
          muted: '#94A3B8',
          accent: '#10B981',
          accent2: '#059669',
        }
      },
      keyframes: {

        sapphire_sheen: {
          '0%': { transform: 'translateX(-100%) rotate(45deg)' },
          '100%': { transform: 'translateX(200%) rotate(45deg)' },
        },
        tourbillon: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
        
      },
      animation: {

        'sapphire-sheen': 'sapphire_sheen 3.5s ease-in-out infinite',
        'tourbillon-slow': 'tourbillon 18s linear infinite',
        
      }
    },
  },
  plugins: [],
}
