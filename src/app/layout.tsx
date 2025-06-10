import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./_components/Navbar";



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
        className='font-inter antialiased'
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
