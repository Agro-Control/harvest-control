import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
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
        },
    },
    plugins: [
        
    ],
};
export default config;
