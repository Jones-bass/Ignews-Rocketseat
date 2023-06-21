/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif'
      },

      backgroundImage: {
        app: 'url(/app-bg.png)'
      },

      size: {
        '5xl': '2.5rem',
      },
  
      colors: {
        white: '#FFFFFF',
        cyan: '#61dafb',

        yellow: {
          500: '#eba417',
          700: '#FFBB33',
        },
      
        gray: {
          100: '#e1e1e6',
          300: '#a8a8b3',
          700: '#323238',
          800: '#29292e',
          850: '#1f2729',
          900: '#121214',
        },
      }
    },
  },
  plugins: [],
}
