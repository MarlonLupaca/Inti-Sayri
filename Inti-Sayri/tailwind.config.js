/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        azulClaro: '#B0C1D9',   // Color azul claro
        azulMedio: '#0477BF',    // Color azul medio
        azulOscuro: '#024873',   // Color azul oscuro
        azulAcento: '#048ABF',   // Color azul acentuado
        verdeAzulado: '#038C8C', // Color verde azulado
        azulBlanco: '#EAF2FA',
        verde: '#25D366',
      },
    },
  },
  plugins: [],
}
