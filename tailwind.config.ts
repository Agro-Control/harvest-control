import type {Config} from "tailwindcss";

const config = {
    darkMode: ["class"],
    content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            fontFamily: {
                poppins: "var(--font-poppins)",
                jakarta: "var(--font-jakarta)",
            },
            colors: {
                steel: {
                    50: "#f7fafc",
                    100: "#eaeef4",
                    200: "#d0dae7",
                    300: "#a7bbd2",
                    400: "#7798b9",
                    500: "#567ba1",
                    600: "#426187",
                    700: "#374f6d",
                    800: "#30445c",
                    900: "#2c3b4e",
                    950: "#0d1117",
                },
                black: {
                    50: "#777676",
                    100: "#888787",
                    200: "#666565",
                    300: "#4d4c4b",
                    400: "#343332",
                    500: "#1b1a19",
                    600: "#020101",
                    700: "#08070b",
                    800: "#060609",
                    900: "#040406",
                    950: "#030303",
                },
            },
            keyframes: {
                "accordion-down": {
                    from: {height: "0"},
                    to: {height: "var(--radix-accordion-content-height)"},
                },
                "accordion-up": {
                    from: {height: "var(--radix-accordion-content-height)"},
                    to: {height: "0"},
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
