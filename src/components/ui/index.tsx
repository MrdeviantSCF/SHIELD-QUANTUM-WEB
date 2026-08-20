'use client';

import React from 'react';
import { motion } from 'framer-motion';

/* ═══════════════════════════════════════════════════════
   Button — Primary interactive element
   ═══════════════════════════════════════════════════════ */

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  href,
  icon,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'relative inline-flex items-center justify-center gap-2 font-medium tracking-wider uppercase transition-all duration-300 focus-visible:outline-2 focus-visible:outline-photon-cyan focus-visible:outline-offset-2 disabled:opacity-40 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-photon-cyan/10 text-photon-cyan border border-photon-cyan/30 hover:bg-photon-cyan/20 hover:border-photon-cyan/50 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)]',
    secondary:
      'bg-quantum-violet/10 text-quantum-violet border border-quantum-violet/30 hover:bg-quantum-violet/20 hover:border-quantum-violet/50 hover:shadow-[0_0_20px_rgba(124,58,237,0.15)]',
    ghost:
      'bg-transparent text-text-secondary border border-transparent hover:text-text-primary hover:bg-white/5',
    outline:
      'bg-transparent text-text-primary border border-border hover:border-border-active hover:bg-white/3',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-sm',
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={combinedClassName}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {icon && <span className="w-4 h-4">{icon}</span>}
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={combinedClassName}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {children}
    </motion.button>
  );
}

/* ═══════════════════════════════════════════════════════
   Badge — Status indicators
   ═══════════════════════════════════════════════════════ */

interface BadgeProps {
  variant?: 'cyan' | 'violet' | 'amber' | 'emerald' | 'rose' | 'magenta' | 'muted';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'cyan', children, className = '' }: BadgeProps) {
  const variants = {
    cyan: 'bg-photon-cyan/10 text-photon-cyan border-photon-cyan/20',
    violet: 'bg-quantum-violet/10 text-quantum-violet border-quantum-violet/20',
    amber: 'bg-energy-amber/10 text-energy-amber border-energy-amber/20',
    emerald: 'bg-quantum-emerald/10 text-quantum-emerald border-quantum-emerald/20',
    rose: 'bg-quantum-rose/10 text-quantum-rose border-quantum-rose/20',
    magenta: 'bg-[#d367c4]/15 text-[#d367c4] border-[#d367c4]/30',
    muted: 'bg-white/5 text-text-muted border-white/10',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-[10px] font-mono font-semibold tracking-widest uppercase border rounded ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════
   GlassCard — Primary surface element
   ═══════════════════════════════════════════════════════ */

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'cyan' | 'violet' | 'none';
  as?: 'div' | 'article' | 'section';
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  id?: string;
}

export function GlassCard({
  children,
  className = '',
  hover = true,
  glow = 'none',
  as: Component = 'div',
  style,
  onClick,
  id,
}: GlassCardProps) {
  const glowStyles = {
    cyan: 'hover:shadow-[0_0_30px_rgba(0,212,255,0.08)]',
    violet: 'hover:shadow-[0_0_30px_rgba(124,58,237,0.08)]',
    none: '',
  };

  return (
    <Component
      id={id}
      style={style}
      onClick={onClick}
      className={`
        bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-lg
        ${hover ? 'transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.1]' : ''}
        ${glowStyles[glow]}
        ${className}
      `}
    >
      {children}
    </Component>
  );
}

/* ═══════════════════════════════════════════════════════
   Section — Page section wrapper
   ═══════════════════════════════════════════════════════ */

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  fullHeight?: boolean;
}

export function Section({ children, id, className = '', fullHeight = false }: SectionProps) {
  return (
    <section
      id={id}
      className={`
        relative px-4 sm:px-6 lg:px-8
        ${fullHeight ? 'min-h-screen flex items-center' : 'py-20 lg:py-32'}
        ${className}
      `}
    >
      <div className="mx-auto max-w-7xl w-full">{children}</div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SectionHeader — Consistent section headings
   ═══════════════════════════════════════════════════════ */

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  label,
  title,
  description,
  align = 'center',
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`${align === 'center' ? 'text-center' : 'text-left'} mb-16 ${className}`}>
      {label && (
        <div className="flex items-center gap-3 mb-4 justify-center">
          <div className="h-px w-8 bg-photon-cyan/40" />
          <span className="text-[11px] font-mono font-semibold tracking-[0.2em] uppercase text-photon-cyan">
            {label}
          </span>
          <div className="h-px w-8 bg-photon-cyan/40" />
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   StatusBadge — Content status indicator
   ═══════════════════════════════════════════════════════ */

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusVariantMap: Record<string, 'emerald' | 'cyan' | 'violet' | 'amber' | 'muted'> = {
  DEPLOYED: 'emerald',
  ACTIVE: 'cyan',
  RESEARCH: 'violet',
  PROTOTYPE: 'amber',
  CONCEPT: 'muted',
  FUTURE: 'muted',
  SIMULATION: 'amber',
  DEMO: 'amber',
  NEW: 'cyan',
};

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const variant = statusVariantMap[status] || 'muted';
  return (
    <Badge variant={variant} className={className}>
      {status}
    </Badge>
  );
}
