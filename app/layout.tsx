import type { Metadata } from "next";
import { Vazirmatn} from "next/font/google";
import "./globals.css";
import Head from "next/head";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GHD Varzesh3 Client",
  description: "A modern client for the Varzesh3 football data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <body
        className={`${vazirmatn.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
