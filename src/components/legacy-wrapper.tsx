import React from 'react';
import Link from 'next/link';

interface LegacyPageWrapperProps {
  title: string;
  subtitle?: string;
  category?: string;
  breadcrumbCategory?: string;
  breadcrumbTitle?: string;
  children: React.ReactNode;
}

export function LegacyPageWrapper({
  title,
  subtitle,
  category = "Protocol Index",
  breadcrumbCategory = "Home",
  breadcrumbTitle,
  children
}: LegacyPageWrapperProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
      <nav className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-12 flex items-center gap-2">
        <Link href="/" className="hover:text-accent transition-colors">{breadcrumbCategory}</Link>
        <span className="opacity-30">/</span>
        <span className="text-text-secondary">{breadcrumbTitle || title}</span>
      </nav>

      <article className="space-y-16">
        <header className="space-y-6 border-b border-border-strong pb-12">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">{category}</p>
          <h1 className="text-4xl md:text-6xl font-black text-text-primary leading-tight font-serif italic">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-text-secondary leading-relaxed max-w-2xl font-medium">
              {subtitle}
            </p>
          )}
        </header>

        <div className="prose prose-invert prose-emerald max-w-none 
          prose-headings:font-serif prose-headings:italic prose-headings:text-text-primary
          prose-p:text-text-secondary prose-p:leading-relaxed prose-p:font-medium
          prose-strong:text-accent prose-strong:font-black
          prose-li:text-text-secondary prose-li:font-medium
          prose-a:text-accent prose-a:font-bold prose-a:no-underline hover:prose-a:underline">
          {children}
        </div>

        <div className="pt-12 text-center pb-12 border-t border-border-strong/30">
          <Link
            href="/"
            className="inline-flex items-center gap-3 bg-accent hover:bg-accent-hover text-background font-black text-sm uppercase tracking-widest py-5 px-10 rounded-2xl shadow-lg transition-all transform hover:-translate-y-1"
          >
            <span>Access Live Tracking Terminal</span>
            <span className="text-xl">→</span>
          </Link>
        </div>
      </article>
    </div>
  );
}
