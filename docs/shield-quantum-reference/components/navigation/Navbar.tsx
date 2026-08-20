'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ExternalLink, Shield } from 'lucide-react';
import { navigationData } from '@/data/navigation';
import { StatusBadge } from '@/components/ui';
import type { NavItem } from '@/types';

/* ═══════════════════════════════════════════════════════
   Navbar — Main navigation with mega-menu
   ═══════════════════════════════════════════════════════ */

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track scroll position for glass effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mega-menu on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close mobile menu on route change (escape key)
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-deep-space/80 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="SHIELD Quantum — Home"
          >
            <div className="relative w-8 h-8 flex items-center justify-center">
              <Shield className="w-7 h-7 text-photon-cyan transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.4)]" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-bold tracking-[0.15em] text-text-primary leading-none">
                SHIELD QUANTUM
              </span>
              <span className="text-[9px] font-mono tracking-[0.3em] text-text-muted uppercase mt-0.5">
                Machine & Technology
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigationData.map((item) => (
              <DesktopNavItem
                key={item.label}
                item={item}
                isActive={activeMenu === item.label}
                onMouseEnter={() => item.children && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-expanded={isMobileOpen}
            aria-label="Toggle navigation menu"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mega Menu Dropdowns */}
      <AnimatePresence>
        {activeMenu && (
          <MegaMenu
            item={navigationData.find((n) => n.label === activeMenu)!}
            onMouseEnter={() => handleMouseEnter(activeMenu)}
            onMouseLeave={handleMouseLeave}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <MobileMenu onClose={() => setIsMobileOpen(false)} />
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════
   Desktop Nav Item
   ═══════════════════════════════════════════════════════ */

function DesktopNavItem({
  item,
  isActive,
  onMouseEnter,
  onMouseLeave,
}: {
  item: NavItem;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link
        href={item.href}
        className={`
          flex items-center gap-1 px-3 py-2 text-xs font-medium tracking-wider uppercase
          transition-colors duration-200
          ${isActive ? 'text-photon-cyan' : 'text-text-secondary hover:text-text-primary'}
        `}
      >
        {item.label}
        {item.children && (
          <ChevronDown
            className={`w-3 h-3 transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`}
          />
        )}
      </Link>
      {/* Active indicator */}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-3 right-3 h-px bg-photon-cyan"
          layoutId="nav-indicator"
          transition={{ duration: 0.2 }}
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Mega Menu
   ═══════════════════════════════════════════════════════ */

function MegaMenu({
  item,
  onMouseEnter,
  onMouseLeave,
}: {
  item: NavItem;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  if (!item.children) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full left-0 right-0 bg-deep-space/95 backdrop-blur-xl border-b border-white/[0.06]"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          {item.children.map((group) => (
            <div key={group.title}>
              <h3 className="text-[10px] font-mono font-semibold tracking-[0.25em] uppercase text-text-muted mb-4">
                {group.title}
              </h3>
              <div className="space-y-1">
                {group.items.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-start gap-3 p-2.5 rounded-md hover:bg-white/[0.03] transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-text-primary group-hover:text-photon-cyan transition-colors">
                          {link.label}
                        </span>
                        {link.badge && <StatusBadge status={link.badge} />}
                      </div>
                      <p className="text-xs text-text-muted mt-0.5 line-clamp-1">
                        {link.description}
                      </p>
                    </div>
                    <ExternalLink className="w-3 h-3 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity mt-1 flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   Mobile Menu
   ═══════════════════════════════════════════════════════ */

function MobileMenu({ onClose }: { onClose: () => void }) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="lg:hidden fixed inset-0 top-16 bg-deep-space/98 backdrop-blur-xl z-40 overflow-y-auto"
    >
      <div className="px-4 py-6 space-y-1">
        {navigationData.map((item) => (
          <div key={item.label} className="border-b border-white/[0.04]">
            {item.children ? (
              <>
                <button
                  className="flex items-center justify-between w-full px-3 py-4 text-sm font-medium tracking-wider uppercase text-text-secondary hover:text-text-primary transition-colors"
                  onClick={() =>
                    setExpandedItem(expandedItem === item.label ? null : item.label)
                  }
                  aria-expanded={expandedItem === item.label}
                >
                  {item.label}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      expandedItem === item.label ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {expandedItem === item.label && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-4 pl-4 space-y-4">
                        {item.children.map((group) => (
                          <div key={group.title}>
                            <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-text-muted mb-2">
                              {group.title}
                            </p>
                            {group.items.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                className="block px-3 py-2 text-sm text-text-secondary hover:text-photon-cyan transition-colors"
                                onClick={onClose}
                              >
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <Link
                href={item.href}
                className="block px-3 py-4 text-sm font-medium tracking-wider uppercase text-text-secondary hover:text-text-primary transition-colors"
                onClick={onClose}
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
