import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <Shield className="w-12 h-12 text-photon-cyan opacity-30" />
        </div>
        <h1 className="text-6xl font-bold font-mono text-photon-cyan mb-2">404</h1>
        <h2 className="text-xl font-semibold text-text-primary mb-4">
          Quantum State Not Found
        </h2>
        <p className="text-sm text-text-secondary mb-8 max-w-md mx-auto">
          The requested page could not be located in this quantum system.
          It may have collapsed to a different state.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium tracking-wider uppercase bg-photon-cyan/10 text-photon-cyan border border-photon-cyan/30 rounded hover:bg-photon-cyan/20 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
