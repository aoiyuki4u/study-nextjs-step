// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import SmoothScroll from "@/app/components/common/SmoothScroll";
import Navbar from '@/app/ui/Navbar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'UX NextJs Study',
  },
  description: 'UX NextJs Study UX NextJs Study UX NextJs Study UX NextJs Study',
  metadataBase: new URL('http://192.168.100.74:3000/'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <Navbar />
          <div>
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
