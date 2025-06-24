import type { Metadata } from "next";
import "./globals.css";



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

        
        {children}
      </body>
    </html>
  );
}
