import type { Metadata } from "next";
import { Roboto, Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin']});

export const metadata: Metadata = {
  title: "Wunkat",
  description: "wunkat is a real estate web application ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
