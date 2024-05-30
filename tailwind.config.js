/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,scss}"],
  important: true,
  theme: {
    extend: {
      colors: {
        "grey-darker": "#333",
        "grey-lightest": "#f7fafc",
        "custom-grey": "#d1d5db",
      },
    },
  },
  plugins: [],
};
