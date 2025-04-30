/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1c2340', // Indigo
          light: '#3d4674',
          dark: '#10142a',
        },
        secondary: {
          DEFAULT: '#f6f0e6', // Warm parchment
          light: '#faf7f2',
          dark: '#e5dfd5',
        },
        accent: {
          DEFAULT: '#cba95b', // Accent gold
          light: '#d9c08a',
          dark: '#b08d44',
        },
        alert: {
          DEFAULT: '#d9564d', // Alert red
          light: '#e47970',
          dark: '#b13c35',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Freight Display', 'Georgia', 'serif'],
        hebrew: ['SBL Hebrew', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1c2340',
            a: {
              color: '#cba95b',
              '&:hover': {
                color: '#d9564d',
              },
            },
            h1: {
              color: '#1c2340',
            },
            h2: {
              color: '#1c2340',
            },
            h3: {
              color: '#1c2340',
            },
          },
        },
      },
      lineHeight: {
        'tight': '1.2',
        'relaxed': '1.5',
      },
      spacing: {
        '0': '0',
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '32': '8rem',
        '40': '10rem',
        '48': '12rem',
        '56': '14rem',
        '64': '16rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};