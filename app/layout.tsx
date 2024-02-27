import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthContext } from '../providers/AuthContext';
import { NextUIProvider } from '@/providers/NextUIProvider';
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';
import { Navbar } from '@/components/navbar/Navbar';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Froodom',
  description: 'Swaminarayan friendly food',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={'text-black max-w-screen bg-cream'}>
      <body className={inter.className}>
        <AuthContext>
          <ReactQueryProvider>
            <NextUIProvider>
              <Navbar />
              <div className={'p-2'}>{children}</div>
            </NextUIProvider>
          </ReactQueryProvider>
        </AuthContext>
      </body>
    </html>
  );
}
