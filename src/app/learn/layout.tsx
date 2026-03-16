import "@/app/ui/learn/dashboard/dashboard.css"
import { inter } from '@/app/ui/learn/fonts';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${inter.className} antialiased`}>
      {children}
    </div>
  );
}
