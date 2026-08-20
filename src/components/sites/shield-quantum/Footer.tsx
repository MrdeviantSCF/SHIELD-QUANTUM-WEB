"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const [currentLang, setCurrentLang] = useState("English");
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  return (
    <footer className="w-full bg-[#202124] text-[#dadce0] border-t border-[#3c4043]/50 pt-16 pb-12 px-4 sm:px-8 lg:px-12">
      <div className="max-w-[1296px] mx-auto flex flex-col gap-12">
        {/* Connect With Us Section */}
        <div className="border-b border-[#3c4043]/50 pb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#7B7672] mb-3">
              Connect with SHIELD Quantum
            </h4>
            <p className="text-xs text-[#7B7672]">
              Join the quantum research community and access computational frameworks.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#dadce0] hover:text-[#D367C4] transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>Twitter</span>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#dadce0] hover:text-[#D367C4] transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4 fill-current text-red-500" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <span>YouTube</span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#dadce0] hover:text-[#D367C4] transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Brand Lockup & Corporate Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg overflow-hidden border border-[#D367C4]/50 group-hover:border-[#D367C4] transition-all duration-300 shadow-[0_0_10px_rgba(211,103,196,0.2)] shrink-0 bg-black">
                <Image
                  src="/images/shield-quantum-ai-logo.jpg"
                  alt="SHIELD QUANTUM AI Official Logo"
                  width={36}
                  height={36}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="text-xs font-semibold tracking-[0.1em] text-[#F9F7EF] uppercase group-hover:text-[#D367C4] transition-colors">
                SHIELD QUANTUM MACHINE AND TECHNOLOGY
              </span>
            </Link>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#dadce0]">
              <a href="#founder" className="hover:text-[#D367C4] transition-colors">
                Founder &amp; Leadership
              </a>
              <a href="#hardware" className="hover:text-[#D367C4] transition-colors">
                Quantum Systems
              </a>
              <a href="#privacy" className="hover:text-[#D367C4] transition-colors">
                Privacy
              </a>
              <a href="#terms" className="hover:text-[#D367C4] transition-colors">
                Terms
              </a>
            </div>
          </div>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#292a2d] border border-[#3c4043] text-xs text-[#F9F7EF] hover:border-[#7B7672] transition-colors"
            >
              <span className="material-symbols-outlined text-sm">language</span>
              <span>{currentLang}</span>
              <span className="material-symbols-outlined text-sm">arrow_drop_down</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 bottom-full mb-1 w-48 bg-[#202124] border border-[#3c4043] rounded-md shadow-2xl py-1 z-50">
                {["English", "Español – América Latina", "Türkçe"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setCurrentLang(lang);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                      currentLang === lang
                        ? "text-[#D367C4] bg-[#292a2d]"
                        : "text-[#dadce0] hover:bg-[#292a2d]"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center sm:text-left text-[11px] text-[#7B7672]">
          © {new Date().getFullYear()} SHIELD QUANTUM MACHINE AND TECHNOLOGY. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
