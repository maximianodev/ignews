module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'gray': {
          100: '#e1e1e6',
          300: '#a8a8b3',
          900: '#121214',
        },
        'cyan': '#61dafb',
        'yellow': '#eba417',
      },
      fontFamily: {
        'body': 'Nunito, sans-serif'
      },
    },
  },
  plugins: [
  ],
}
