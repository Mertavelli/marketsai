import { Inter, Roboto_Mono } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner"

//import BreakpointOverlay from "./components/BreakpointOverlay";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
    variable: "--font-secondary",
    subsets: ["latin"],
});

export const metadata = {
    title: "Markets AI",
    description: "Market Intelligence by AI agents",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
                <div className="w-full h-screen">
                    {children}
                </div>
                <Toaster />
            </body>
        </html>
    );
}
