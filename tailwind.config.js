module.exports = {
  //purge: [],
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        imgs: '300px'
      }
    },
  },
  variants: {
    extend: {
      zIndex: ['hover'],
      display: ['hover','group-hover'],
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
