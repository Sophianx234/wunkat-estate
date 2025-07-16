import type { Metadata } from "next";
import Script from "next/script";
 
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
      {/* Load Paystack script asynchronously using Next.js Script component */}
      <Script src="https://js.paystack.co/v1/inline.js" strategy="afterInteractive" />
      
      <body
        className='font-inter antialiased'
      >

        
        {children}
      </body>
    </html>
  );
}
