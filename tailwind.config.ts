import type {Config} from "tailwindcss";

const config = {
    darkMode: ["class"],
    content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
    prefix: "",
    theme: {
        screens: {
            sm: "640px",
      
            md: "768px",
      
            lg: "1024px",
      
            xl: "1280px",
      
            "2xl": "1536px",
      
            "3xl": "1620px",
      
            "4xl": "2560px",
          },
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px"
            },
        },
        extend: {
            backgroundImage: {
                machine: "url('../assets/machine-card.png')",
                operator: "url('../assets/operator-card.png')",
                dashboard: "url('../assets/dashboard-card.png')",
                company: "url('../assets/company-card.png')",
                unity: "url('../assets/unity-card.png')",
                group: "url('../assets/group-card.png')",
                report: "url('../assets/report-card.png')",
                login: "url('../assets/bg-login.png')",
            },
            fontFamily: {
                poppins: "var(--font-poppins)",
                jakarta: "var(--font-jakarta)",
            },
            colors: {
                background: "#f5f6f8 ",
                sidebar: "#ffffff",
                divider: "#d2d2d2",
                dark: "#0d1117",
                green: {
                    50: "#f0fdf5",
                    100: "#dcfce8",
                    200: "#bbf7d1",
                    300: "#86efad",
                    400: "#4ade81",
                    500: "#22c55e",
                    600: "#16a34a",
                    700: "#15803c",
                    800: "#166533",
                    900: "#14532b",
                    950: "#052e14",
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
            dropShadow: {
                side: "0 2px 2px rgba(0, 0, 0, 0.3)",
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
