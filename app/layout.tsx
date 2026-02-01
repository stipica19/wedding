import type { Metadata } from "next";
import "./globals.css";
import { Della_Respira, Euphoria_Script } from "next/font/google";
import localFont from "next/font/local";

export const cherish = Euphoria_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cherish",
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
// export const della = localFont({
//   src: [
//     {
//       path: "../public/fonts/della.otf",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../public/fonts/della-bold.ttf",
//       weight: "700",
//       style: "normal",
//     },
//   ],
//   variable: "--font-della",
//   display: "swap",
// });

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
        className={`${cherish.variable} ${patrickOklahoma.variable}  ${della1.className}`}
      >
        {children}
      </body>
    </html>
  );
}
