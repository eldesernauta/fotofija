module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/*.{js,ts,jsx,tsx}',
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        Soligant: ['"Soligant"', 'serif'],
        Quizma: ['"Quizma"', 'sans-serif'],
        Stravinsky: ['"Stravinsky"', 'sans-serif'],
        Covik: ['"Covik Sans"', 'sans-serif']
      },
      screens: {
        'tall': { 'raw': '(min-height: 750px)' },
      }
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        '::selection': {
          color: theme('colors.neutral.100'),
          textShadow: '-1px 1px 0 #b37dff, 1px 1px 0 #76f7ae, 1px -1px 0 #ffe959, -1px -1px 0 #ff5454',
        },
        '.dark ::selection': {
          color: theme('colors.neutral.900'),
        },
      });
    },
  ],
};
