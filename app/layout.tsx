import type { Metadata } from "next";
import "./globals.css";
import { Euphoria_Script } from "next/font/google";
import localFont from "next/font/local";

export const cherish = Euphoria_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cherish",
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
export const della = localFont({
  src: [
    {
      path: "../public/fonts/della.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/della-bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-della",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wedding of Nikolina & Ivan",
  description: "Join us in celebrating our special day!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr">
      <body
        className={`${cherish.variable} ${patrickOklahoma.variable} ${della.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
