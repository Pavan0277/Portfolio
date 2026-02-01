/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class", // Ensure it uses class-based toggling
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                "grid-pattern-dark": `url("/src/assets/pattern-drak.svg")`,
                "grid-pattern-light": `url("/src/assets/pattern-light.svg")`,
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            animation: {
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                float: "float 6s ease-in-out infinite",
                glow: "glow-pulse 3s ease-in-out infinite",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                "glow-pulse": {
                    "0%, 100%": {
                        boxShadow: "0 0 20px rgba(59, 130, 246, 0.1)",
                    },
                    "50%": { boxShadow: "0 0 30px rgba(59, 130, 246, 0.2)" },
                },
            },
            boxShadow: {
                "glow-sm": "0 0 15px rgba(59, 130, 246, 0.15)",
                "glow-md": "0 0 25px rgba(59, 130, 246, 0.2)",
                "glow-lg": "0 0 40px rgba(59, 130, 246, 0.25)",
                "glow-purple": "0 0 30px rgba(139, 92, 246, 0.2)",
            },
            colors: {
                glass: {
                    light: "rgba(255, 255, 255, 0.1)",
                    dark: "rgba(0, 0, 0, 0.2)",
                },
            },
        },
    },
    plugins: [],
};
