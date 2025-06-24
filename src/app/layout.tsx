import type { Metadata } from 'next';
import { Barlow } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-barlow',
});

export const metadata: Metadata = {
  title: 'Further - Discover AI Models',
  description: 'A portfolio showcasing a variety of AI models with links to live demos and interactive examples, presented by Further.',
  keywords: 'AI, Artificial Intelligence, Machine Learning, Models, Portfolio, Demos, Showcase, Further',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(barlow.variable, 'scroll-smooth')}>
      <head>
        {/* Google Fonts links are managed by next/font */}
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
