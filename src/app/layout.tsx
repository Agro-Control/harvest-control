import "./globals.css";
import {Poppins, Plus_Jakarta_Sans} from "next/font/google";
import {SpeedInsights} from "@vercel/speed-insights/next";
import {Toaster} from "@/components/ui/toaster";
import {ClientCookiesProvider} from "./cookies";
import {cookies} from "next/headers";
import Providers from "./providers";
import type {Metadata} from "next";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-poppins",
});
const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-jakarta",
});

export const metadata: Metadata = {
    title: "Agro Control",
    description: "Sistema Integrado de Colheita Agrícola",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${poppins.variable} ${jakarta.variable} flex h-screen w-screen flex-col overflow-y-auto overflow-x-hidden bg-background font-jakarta text-dark`}
            >
                <ClientCookiesProvider value={cookies().getAll()}>
                    <Providers>
                        <SpeedInsights />
                        {children}
                        <Toaster />
                    </Providers>
                </ClientCookiesProvider>
            </body>
        </html>
    );
}
