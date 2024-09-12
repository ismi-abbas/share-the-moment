import type { Metadata } from "next";
import { EB_Garamond, Rubik } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Share the moment",
  description: "Share the moment - Walimatul 'Urus Hani & Abbas",
  icons: "/favicon.png",
};

const rubik = Rubik({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-rubik",
});

const ebGaramond = EB_Garamond({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-garamond",
});

const brittany = localFont({
  src: "./fonts/BrittanySignature.ttf",
  variable: "--font-brittany",
});

const bodony = localFont({
  src: "./fonts/BodoniFLF-Roman.woff",
  variable: "--font-bodoni",
  weight: "400",
});

const allFonts = [
  brittany.variable,
  bodony.variable,
  ebGaramond.variable,
  rubik.variable,
].join(" ");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${allFonts} antialiased flex flex-col items-center justify-center`}
      >
        {children}
      </body>
    </html>
  );
}
