/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './src/**/*.js',
    './src/**/*.css',
  ],
  theme: {
    extend: {
      fontFamily:{
        roboto: ['Roboto', 'sans-serif']
      },

      fontSize:{
        sizeP : "16px"
      },

      colors:{
        tomato : "hsl(4, 100%, 67%)",
        grisOscuro : "hsl(234, 29%, 20%)",
        grisCharcoal : "hsl(235, 18%, 26%)",
        gris : "hsl(231, 7%, 60%)",
        blanco : "hsl(0, 0%, 100%)"
      },
      
      screens:{
        tablet : '800px',
        desktop : '950px'
      },

      backgroundImage:{
        fondoTelefono : 'url(/dist/img/illustration-sign-up-mobile.svg)',
        fondoDesktop : 'url(/dist/img/illustration-sign-up-desktop.svg)'
      }
    },
  },
  plugins: [],
}

