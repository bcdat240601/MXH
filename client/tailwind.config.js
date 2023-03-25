/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        thDark: "#071013",
        thWhite: "#f9f9f9",
        thCyan: "#00f2f2",
        thBlue: "#0075f2",
        thMagenta: "#BB2649",
        thGreen: "#21fa90",
        thGray: "#2F4550",
        thRed: "#ff3040",
      },
    },
  },
  plugins: [],
};
