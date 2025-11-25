/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
    safelist: [
    'bg-yellow-600',
    'bg-yellow-500',
    'bg-red-600',
    'bg-green-600',
    'bg-orange-600',
    'text-yellow-600',
    'border-yellow-600',
    // Agrega todos los colores que necesites
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}