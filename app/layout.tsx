import './globals.css';

import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';
import Nav from './nav';
import Toast from './toast';
import { Suspense } from 'react';

export const metadata = {
  title: 'Nature Bot Dashboard',
  description: "Nature Bot's user dashboard developed by ehzgodd"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense>
          <Nav />
        </Suspense>
        {children}
        <Analytics />
        {/* <Toast /> */}
      </body>
    </html>
  );
}
