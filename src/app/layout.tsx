import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Happy Birthday Thissdax!',
  description: 'A 3D birthday celebration for the Forex Mentor.',
  icons: {
    icon: '/dax.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
