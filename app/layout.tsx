import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sora = localFont({
  src: "../public/fonts/Sora/Sora-Variable.woff2",
  variable: "--font-sora",
  display: "swap",
  weight: "100 800",
});

export const metadata: Metadata = {
  title: "Xinyi Dou | Portfolio",
  description: "Welcome to my Portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body 
        className={`${sora.variable} antialiased bg-black text-zinc-100`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
