import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const robotoMono = Roboto_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://shieldquantum.ai"),
  title: {
    default: "SHIELD QUANTUM MACHINE AND TECHNOLOGY | Advanced Quantum Systems",
    template: "%s | SHIELD QUANTUM",
  },
  description:
    "SHIELD QUANTUM MACHINE AND TECHNOLOGY is advancing the state of the art in quantum computing and developing hardware and machine tools to operate beyond classical supercomputing capabilities.",
  keywords: [
    "Quantum Computing",
    "Superconducting Qubits",
    "Quantum Machine Technology",
    "Quantum Simulator",
    "Bloch Sphere",
    "Cryogenic Systems",
    "Post-Quantum Cryptography",
    "Quantum AI",
    "Dipak S. Dahifale",
  ],
  authors: [{ name: "Dipak S. Dahifale", url: "https://shieldquantum.ai" }],
  creator: "Dipak S. Dahifale",
  publisher: "SHIELD QUANTUM MACHINE AND TECHNOLOGY",
  icons: {
    icon: "/images/shield-quantum-ai-logo.jpg",
    shortcut: "/images/shield-quantum-ai-logo.jpg",
    apple: "/images/shield-quantum-ai-logo.jpg",
  },
  openGraph: {
    title: "SHIELD QUANTUM MACHINE AND TECHNOLOGY",
    description:
      "Advancing scalable quantum processors, machine architectures, and software systems to operate beyond classical supercomputing capabilities.",
    siteName: "SHIELD QUANTUM MACHINE AND TECHNOLOGY",
    url: "https://shieldquantum.ai",
    images: [
      {
        url: "/images/shield-quantum-ai-logo.jpg",
        width: 1024,
        height: 1024,
        alt: "SHIELD QUANTUM AI Official Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SHIELD QUANTUM MACHINE AND TECHNOLOGY",
    description:
      "Advancing scalable quantum processors, machine architectures, and software systems to operate beyond classical supercomputing capabilities.",
    images: ["/images/shield-quantum-ai-logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} ${robotoMono.variable} dark scroll-smooth`}>
      <body className="min-h-screen bg-[#202124] text-[#F9F7EF] flex flex-col antialiased selection:bg-[#D367C4] selection:text-white">
        <div className="scientific-grid" />
        <Navbar />
        <div className="flex-1 pt-16 flex flex-col relative z-10">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
