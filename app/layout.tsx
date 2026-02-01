import type { Metadata } from "next";
import "./globals.css";
import { Della_Respira, Euphoria_Script, Great_Vibes } from "next/font/google";
import localFont from "next/font/local";

export const cherish = Euphoria_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cherish",
});

export const great_vibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
});

export const della1 = Della_Respira({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-della1",
});

export const patrickOklahoma = localFont({
  src: [
    {
      path: "../public/fonts/PatrickOklahoma-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-patrick-oklahoma",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wedding of Nikolina & Ivan",
  description: "Join us in celebrating our special day!",
  themeColor: "#ffffff",
  other: {
    "color-scheme": "light",
    "supported-color-schemes": "light",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr">
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body
        className={`${cherish.variable} ${patrickOklahoma.variable}  ${della1.className} ${great_vibes.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
