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
    'bg-gray-600',
    'bg-gray-500',
    // Agrega todos los colores que necesites

    // Colores amber
    'bg-amber-500', 'bg-amber-600',
    'hover:bg-amber-600',
    'border-amber-300',
    
    // Colores indigo
    'bg-indigo-600', 'bg-indigo-100',
    'hover:bg-indigo-700',
    'text-indigo-600', 'text-indigo-100',
    'border-indigo-600',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}