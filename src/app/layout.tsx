import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { WalletContextProvider } from "@/components/wallet/WalletContextProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PalmFlow AI | Autonomous Financial OS",
  description: "Autonomous AI Treasury & Payment Network Powered by PUSD on Solana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-neural-dark text-foreground selection:bg-brand-primary/30">
        <WalletContextProvider>
          <div className="fixed inset-0 bg-[url('/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay z-50"></div>
          <Navbar />
          <main className="pt-20 px-6 min-h-screen">
            {children}
          </main>
        </WalletContextProvider>
      </body>
    </html>
  );
}
