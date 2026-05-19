import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Trend",
  description: "Trend Trend Trend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (    
    <div>
      {children}
    </div>
  );
}