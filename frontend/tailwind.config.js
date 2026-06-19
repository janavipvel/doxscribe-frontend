/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(214, 32%, 91%)",
        input: "hsl(214, 32%, 91%)",
        ring: "hsl(217, 91%, 60%)",
        background: "hsl(0, 0%, 100%)",
        foreground: "hsl(222, 47%, 11%)",
        primary: {
          DEFAULT: "hsl(217, 91%, 60%)",
          foreground: "hsl(0, 0%, 100%)",
          50: "#eff6ff",
          100: "#dbeafe",
          600: "#2563eb",
          700: "#1d4ed8",
        },
        muted: {
          DEFAULT: "hsl(210, 40%, 96%)",
          foreground: "hsl(215, 16%, 47%)",
        },
        card: {
          DEFAULT: "hsl(0, 0%, 100%)",
          foreground: "hsl(222, 47%, 11%)",
        },
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
      },
      boxShadow: {
        soft: "0 1px 3px 0 rgba(0,0,0,0.07), 0 1px 2px -1px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};
