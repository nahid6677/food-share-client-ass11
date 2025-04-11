/** @type {import('tailwindcss').Config} */
export default {

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#1d4ed8',  // Example custom color
        'brand-secondary': '#d97706', // Another custom color
      },
    },
  },
  plugins: [require('daisyui'),require('@tailwindcss/forms'),],
}

