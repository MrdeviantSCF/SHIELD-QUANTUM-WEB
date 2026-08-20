"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface DropdownItem {
  title: string;
  href: string;
  desc?: string;
}

interface NavMenu {
  id: string;
  label: string;
  items?: DropdownItem[];
  href?: string;
}

const navMenus: NavMenu[] = [
  {
    id: "learn",
    label: "Learn",
    items: [
      {
        title: "What is quantum computing?",
        href: "#learn",
        desc: "An introduction to quantum physics and computational principles",
      },
      {
        title: "Educational resources",
        href: "#resources",
        desc: "Courses, tutorials, and materials for learners and researchers",
      },
    ],
  },
  {
    id: "hardware",
    label: "Hardware",
    items: [
      {
        title: "Quantum Processors",
        href: "#hardware",
        desc: "Superconducting processors and cryogenic architectures",
      },
      {
        title: "Roadmap",
        href: "#roadmap",
        desc: "Our six-milestone journey toward useful error-corrected computing",
      },
      {
        title: "Lab & Cleanrooms",
        href: "#lab",
        desc: "Tour the SHIELD Quantum research and fabrication campus",
      },
    ],
  },
  {
    id: "software",
    label: "Software",
    items: [
      {
        title: "Open Source Tools",
        href: "#software",
        desc: "Quantum compilers, simulators, and software ecosystem",
      },
      {
        title: "Quantum SDK Documentation",
        href: "#sdk",
        desc: "Python library for writing, manipulating, and optimizing quantum circuits",
      },
    ],
  },
  {
    id: "research",
    label: "Research",
    href: "#news-resources",
  },
  {
    id: "leadership",
    label: "Leadership",
    href: "#founder",
  },
  {
    id: "careers",
    label: "Careers",
    href: "#careers",
  },
];

export function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("English");
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !searchOpen && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === "Escape") {
        setSearchOpen(false);
        setActiveDropdown(null);
        setLanguageOpen(false);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
        setLanguageOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-[#202124]/95 backdrop-blur-md border-b border-[#3c4043]/50 shadow-lg"
          : "bg-[#202124] border-b border-[#3c4043]/30"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Left: Mobile hamburger + SHIELD QUANTUM Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#F9F7EF] hover:text-[#D367C4] transition-colors"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>

          <Link href="/" className="flex items-center gap-3 group">
            {/* Official SHIELD QUANTUM AI Logo */}
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden border border-[#D367C4]/40 group-hover:border-[#D367C4] transition-all duration-300 shadow-[0_0_12px_rgba(211,103,196,0.25)] shrink-0 bg-black">
              <Image
                src="/images/shield-quantum-ai-logo.jpg"
                alt="SHIELD QUANTUM AI Official Logo"
                width={48}
                height={48}
                priority
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Wordmark */}
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-[0.08em] text-[#F9F7EF] uppercase leading-tight group-hover:text-[#D367C4] transition-colors">
                SHIELD QUANTUM
              </span>
              <span className="text-[9px] font-mono tracking-[0.18em] text-[#7B7672] uppercase leading-none">
                MACHINE &amp; TECHNOLOGY
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1">
          {navMenus.map((menu) => (
            <div key={menu.id} className="relative">
              {menu.items ? (
                <button
                  onClick={() =>
                    setActiveDropdown(activeDropdown === menu.id ? null : menu.id)
                  }
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-sm ${
                    activeDropdown === menu.id
                      ? "text-[#D367C4]"
                      : "text-[#F9F7EF] hover:text-[#D367C4]"
                  }`}
                  aria-expanded={activeDropdown === menu.id}
                >
                  {menu.label}
                  <span
                    className={`material-symbols-outlined text-base transition-transform duration-200 ${
                      activeDropdown === menu.id ? "rotate-180 text-[#D367C4]" : ""
                    }`}
                  >
                    arrow_drop_down
                  </span>
                </button>
              ) : (
                <a
                  href={menu.href}
                  className="px-4 py-2 text-sm font-medium text-[#F9F7EF] hover:text-[#D367C4] transition-colors"
                >
                  {menu.label}
                </a>
              )}

              {/* Desktop Dropdown Panel */}
              {menu.items && activeDropdown === menu.id && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-[#202124] border border-[#3c4043] rounded-md shadow-2xl p-2 animate-fade-in z-50">
                  <div className="flex flex-col gap-1">
                    {menu.items.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.href}
                        className="p-2.5 rounded hover:bg-[#292a2d] transition-colors group"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <div className="text-sm font-medium text-[#F9F7EF] group-hover:text-[#D367C4] transition-colors">
                          {item.title}
                        </div>
                        {item.desc && (
                          <div className="text-xs text-[#7B7672] mt-0.5 line-clamp-2">
                            {item.desc}
                          </div>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right: Search, Language */}
        <div className="flex items-center gap-2">
          {/* Search Trigger */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex items-center gap-2 h-9 px-3 bg-[#292a2d] hover:bg-[#3c4043] border border-[#3c4043] rounded-full text-xs text-[#dadce0] transition-colors"
              aria-label="Search site"
            >
              <span className="material-symbols-outlined text-lg text-[#7B7672]">
                search
              </span>
              <span className="hidden sm:inline text-xs text-[#7B7672]">Search</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-[#202124] text-[#7B7672] rounded border border-[#3c4043]">
                /
              </kbd>
            </button>

            {/* Expandable Search Modal */}
            {searchOpen && (
              <div className="absolute right-0 top-12 w-80 sm:w-96 bg-[#202124] border border-[#3c4043] rounded-lg shadow-2xl p-3 z-50 animate-fade-in">
                <div className="flex items-center gap-2 border-b border-[#3c4043] pb-2">
                  <span className="material-symbols-outlined text-lg text-[#7B7672]">
                    search
                  </span>
                  <input
                    type="text"
                    placeholder="Search SHIELD Quantum Machine & Tech..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full bg-transparent text-sm text-[#F9F7EF] focus:outline-none placeholder-[#7B7672]"
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="text-[#7B7672] hover:text-[#F9F7EF]"
                  >
                    <span className="material-symbols-outlined text-lg">close</span>
                  </button>
                </div>
                <div className="mt-2 text-xs text-[#7B7672]">
                  Popular searches:{" "}
                  <span className="text-[#D367C4] cursor-pointer hover:underline">AEGIS-1</span>,{" "}
                  <span className="text-[#D367C4] cursor-pointer hover:underline">Q-Error Correction</span>,{" "}
                  <span className="text-[#D367C4] cursor-pointer hover:underline">Quantum Echoes</span>,{" "}
                  <span className="text-[#D367C4] cursor-pointer hover:underline">SDK</span>
                </div>
              </div>
            )}
          </div>

          {/* Language Selector */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setLanguageOpen(!languageOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-[#7B7672] hover:text-[#F9F7EF] transition-colors"
            >
              <span className="material-symbols-outlined text-base">language</span>
              <span>{currentLang}</span>
              <span className="material-symbols-outlined text-xs">arrow_drop_down</span>
            </button>

            {languageOpen && (
              <div className="absolute right-0 mt-1 w-44 bg-[#202124] border border-[#3c4043] rounded shadow-xl py-1 z-50 animate-fade-in">
                {["English", "Español – América Latina", "Türkçe"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setCurrentLang(lang);
                      setLanguageOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
                      currentLang === lang
                        ? "text-[#D367C4] bg-[#292a2d]"
                        : "text-[#F9F7EF] hover:bg-[#292a2d]"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-[#202124] z-40 overflow-y-auto px-6 py-6 border-t border-[#3c4043]/40">
          <div className="flex flex-col gap-4">
            {navMenus.map((menu) => (
              <div key={menu.id} className="border-b border-[#3c4043]/30 pb-3">
                {menu.items ? (
                  <div>
                    <button
                      onClick={() =>
                        setMobileSubmenu(mobileSubmenu === menu.id ? null : menu.id)
                      }
                      className="w-full flex items-center justify-between text-base font-medium text-[#F9F7EF] py-1"
                    >
                      <span>{menu.label}</span>
                      <span
                        className={`material-symbols-outlined transition-transform ${
                          mobileSubmenu === menu.id ? "rotate-180 text-[#D367C4]" : ""
                        }`}
                      >
                        expand_more
                      </span>
                    </button>
                    {mobileSubmenu === menu.id && (
                      <div className="mt-2 pl-4 flex flex-col gap-2 border-l-2 border-[#D367C4]/50">
                        {menu.items.map((item, idx) => (
                          <a
                            key={idx}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="py-1 text-sm text-[#dadce0] hover:text-[#D367C4]"
                          >
                            {item.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={menu.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-base font-medium text-[#F9F7EF] py-1 hover:text-[#D367C4]"
                  >
                    {menu.label}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
