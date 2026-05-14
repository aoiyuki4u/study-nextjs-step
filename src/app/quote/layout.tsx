import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Request a Quote",
  description: "Request a Quote Request a Quote",
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