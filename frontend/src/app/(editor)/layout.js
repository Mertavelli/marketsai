import { Inter, Roboto_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Providers from "../wrapper/Providers";
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
        <Providers>
          <div className="h-screen w-screen max-h-screen flex flex-col">
            <div className="flex-none">
              <Navbar />
            </div>
            <div className="flex-grow overflow-auto px-8 mb-10 flex justify-center h-full">
              {children}
            </div>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
