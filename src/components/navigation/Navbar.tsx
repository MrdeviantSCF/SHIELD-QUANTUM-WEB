'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import { navigationData } from '@/data/navigation';
import { Badge } from '@/components/ui';
import type { NavItem } from '@/types';

/* ═══════════════════════════════════════════════════════
   SHIELD QUANTUM MACHINE AND TECHNOLOGY — Navbar
   ═══════════════════════════════════════════════════════ */

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !searchOpen && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === 'Escape') {
        setActiveMenu(null);
        setIsMobileOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  const handleMouseEnter = useCallback((label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(label);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 150);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#202124]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl'
          : 'bg-[#202124]/60 backdrop-blur-md border-b border-white/[0.04]'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo — Official SHIELD QUANTUM AI Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="SHIELD QUANTUM MACHINE AND TECHNOLOGY — Home"
          >
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
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-bold tracking-[0.12em] text-[#F9F7EF] leading-none uppercase group-hover:text-[#D367C4] transition-colors">
                SHIELD QUANTUM
              </span>
              <span className="text-[9px] font-mono tracking-[0.24em] text-[#7B7672] uppercase mt-0.5">
                MACHINE &amp; TECHNOLOGY
              </span>
            </div>
          </Link>

          {/* Desktop Mega Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigationData.map((item) => (
              <DesktopNavItem
                key={item.label}
                item={item}
                isActive={activeMenu === item.label}
                onMouseEnter={() => item.children && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
                onClose={() => setActiveMenu(null)}
              />
            ))}
          </div>

          {/* Right: Quick Search & Simulator Action */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="flex items-center gap-2 h-9 px-3 bg-[#292a2d] hover:bg-[#3c4043] border border-white/10 rounded-full text-xs text-[#dadce0] transition-colors"
                aria-label="Search research platform"
              >
                <Search className="w-4 h-4 text-[#7B7672]" />
                <span className="hidden sm:inline text-xs text-[#7B7672]">Search</span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-[#202124] text-[#7B7672] rounded border border-white/10">
                  /
                </kbd>
              </button>

              {searchOpen && (
                <div className="absolute right-0 top-12 w-80 sm:w-96 bg-[#202124] border border-white/10 rounded-2xl shadow-2xl p-4 z-50 animate-fade-in">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-2.5">
                    <Search className="w-4 h-4 text-[#00d4ff]" />
                    <input
                      type="text"
                      placeholder="Search QPU, Cryogenics, Algorithms..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      className="w-full bg-transparent text-sm text-[#F9F7EF] focus:outline-none placeholder-[#7B7672]"
                    />
                    <button onClick={() => setSearchOpen(false)} className="text-[#7B7672] hover:text-[#F9F7EF]">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1.5 text-xs text-[#7B7672]">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[#7B7672] mb-1">
                      Quick Links:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { label: 'Cryogenic Lab', href: '/labs/cryogenic' },
                        { label: 'Quantum Simulator', href: '/simulator' },
                        { label: 'Network Architecture', href: '/network' },
                        { label: 'Post-Quantum Crypto', href: '/security' },
                        { label: 'Dipak S. Dahifale', href: '/about#founder' },
                      ].map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          onClick={() => setSearchOpen(false)}
                          className="px-2 py-1 rounded bg-[#292a2d] hover:bg-[#00d4ff]/10 hover:text-[#00d4ff] text-[11px] font-mono transition-colors"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/simulator"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-xs font-mono text-[#00d4ff] hover:bg-[#00d4ff]/20 transition-colors"
            >
              <span>Simulator</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 text-[#F9F7EF] hover:text-[#00d4ff] transition-colors"
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#202124]/98 border-b border-white/[0.08] backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {navigationData.map((item) => (
                <MobileNavItem
                  key={item.label}
                  item={item}
                  onNavigate={() => setIsMobileOpen(false)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;

/* ———————————————————————————————————————————————————————
   Desktop Nav Item Component
   ——————————————————————————————————————————————————————— */

interface DesktopNavItemProps {
  item: NavItem;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClose: () => void;
}

function DesktopNavItem({
  item,
  isActive,
  onMouseEnter,
  onMouseLeave,
  onClose,
}: DesktopNavItemProps) {
  const hasChildren = item.children && item.children.length > 0;

  if (!hasChildren) {
    return (
      <Link
        href={item.href}
        className="px-3.5 py-2 text-xs font-mono tracking-wider uppercase text-[#dadce0] hover:text-[#00d4ff] hover:bg-white/[0.04] rounded-md transition-colors flex items-center gap-1.5"
      >
        <span>{item.label}</span>
        {item.badge && <Badge variant={item.badge === 'NEW' ? 'magenta' : 'cyan'}>{item.badge}</Badge>}
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <button
        className={`flex items-center gap-1 px-3.5 py-2 text-xs font-mono tracking-wider uppercase rounded-md transition-colors ${
          isActive
            ? 'text-[#00d4ff] bg-[#00d4ff]/10'
            : 'text-[#dadce0] hover:text-[#00d4ff] hover:bg-white/[0.04]'
        }`}
        aria-expanded={isActive}
      >
        <span>{item.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            isActive ? 'rotate-180 text-[#00d4ff]' : 'text-[#7B7672]'
          }`}
        />
      </button>

      {/* Mega-menu panel */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-1 w-[520px] bg-[#202124]/95 backdrop-blur-2xl border border-white/[0.1] rounded-2xl shadow-2xl p-5 z-50"
          >
            <div className="grid grid-cols-2 gap-6">
              {item.children?.map((group) => (
                <div key={group.title} className="space-y-3">
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#7B7672] block font-semibold px-2">
                    {group.title}
                  </span>
                  <div className="space-y-1">
                    {group.items.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        onClick={onClose}
                        className="block p-2 rounded-xl hover:bg-white/[0.05] transition-all group/item"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-[#F9F7EF] group-hover/item:text-[#00d4ff] transition-colors">
                            {subItem.label}
                          </span>
                          {subItem.badge && (
                            <Badge variant={subItem.badge === 'NEW' ? 'magenta' : 'cyan'}>
                              {subItem.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-[11px] text-[#7B7672] mt-0.5 line-clamp-1 group-hover/item:text-[#dadce0]">
                          {subItem.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ———————————————————————————————————————————————————————
   Mobile Nav Item Component
   ——————————————————————————————————————————————————————— */

interface MobileNavItemProps {
  item: NavItem;
  onNavigate: () => void;
}

function MobileNavItem({ item, onNavigate }: MobileNavItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  if (!hasChildren) {
    return (
      <Link
        href={item.href}
        onClick={onNavigate}
        className="block py-2 text-sm font-mono tracking-wider uppercase text-[#F9F7EF] hover:text-[#00d4ff] transition-colors"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-white/[0.06] pb-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-2 text-sm font-mono tracking-wider uppercase text-[#F9F7EF]"
        aria-expanded={isOpen}
      >
        <span>{item.label}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#00d4ff]' : 'text-[#7B7672]'
          }`}
        />
      </button>

      {isOpen && (
        <div className="mt-2 pl-3 space-y-4 border-l-2 border-[#00d4ff]/30">
          {item.children?.map((group) => (
            <div key={group.title} className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#7B7672]">
                {group.title}
              </span>
              {group.items.map((subItem) => (
                <Link
                  key={subItem.label}
                  href={subItem.href}
                  onClick={onNavigate}
                  className="block py-1 text-xs text-[#dadce0] hover:text-[#00d4ff] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span>{subItem.label}</span>
                    {subItem.badge && (
                      <Badge variant={subItem.badge === 'NEW' ? 'magenta' : 'cyan'}>
                        {subItem.badge}
                      </Badge>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
