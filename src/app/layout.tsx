import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thermosync Monitoring",
  description:
    "Sistem pemantauan suhu real-time menggunakan sensor DHT22, ESP32, dan database Supabase. Dibangun dengan Next.js untuk performa maksimal.",
  icons: "/favicon.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased smooth-scroll `}
      >
        <header className="fixed top-0 z-20 w-full">
          <Navbar />
        </header>
        <div className="overflow-hidden">
          {children}

          <footer>
            <Footer />
          </footer>
        </div>
      </body>
    </html>
  );
}
