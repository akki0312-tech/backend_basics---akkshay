import { Baloo_2, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Baloo_2({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-display" });
const body = Space_Grotesk({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata = {
  title: "Backend Basics — The Illustrated Guide",
  description: "An illustrated, click-and-run textbook for your first real look under the hood of the backend.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
