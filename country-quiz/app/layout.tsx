import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'World Quiz App',
  description: 'Test your knowledge about countries around the globe'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <main className="h-screen w-screen flex items-center justify-center">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
