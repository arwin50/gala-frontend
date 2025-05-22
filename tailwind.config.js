/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./app/**/*.{js,jsx,ts,tsx}", // ✅ Required for expo-router
    "./components/**/*.{js,jsx,ts,tsx}", // ✅ For your shared components
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        description: "#4E4B4B",
        line: "#959595",
        buttonVarGrad1Start: "#166EF3",
        buttonVarGrade1End: "#2665BE",
        buttonBlue: "#2C94F0",
      },
    },
  },
  plugins: [],
};
