import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/layout/Footer';
import './globals.css';

/* ═══════════════════════════════════════════════════════
   Root Layout — SHIELD Quantum Machine & Technology
   ═══════════════════════════════════════════════════════ */

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'SHIELD Quantum Machine & Technology — Engineering the Quantum Future',
    template: '%s | SHIELD Quantum',
  },
  description:
    'Advanced quantum computing, quantum machines, AI, cybersecurity, and photonics research. Engineering the quantum future through innovation and scientific excellence.',
  keywords: [
    'quantum computing',
    'quantum machines',
    'quantum technology',
    'quantum AI',
    'quantum cybersecurity',
    'quantum photonics',
    'quantum research',
    'post-quantum cryptography',
    'quantum hardware',
    'quantum software',
  ],
  authors: [{ name: 'SHIELD Quantum Machine & Technology' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'SHIELD Quantum Machine & Technology',
    title: 'SHIELD Quantum Machine & Technology — Engineering the Quantum Future',
    description:
      'Advanced quantum computing, quantum machines, AI, cybersecurity, and photonics research.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SHIELD Quantum Machine & Technology',
    description: 'Engineering the Quantum Future',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-deep-space text-text-primary font-sans">
        {/* Scientific grid background */}
        <div className="scientific-grid" aria-hidden="true" />

        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        <main className="flex-1 relative z-10">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
