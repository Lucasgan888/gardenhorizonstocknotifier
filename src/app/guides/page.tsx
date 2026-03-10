import { Metadata } from 'next';
import Link from 'next/link';
import { guides } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Garden Horizons Guides - Tips & Tutorials',
  description: 'Complete guides and tutorials for Garden Horizons. Learn stock mechanics, farming strategies, and item tracking tips.',
};

export default function GuidesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Guides & Tutorials</h1>
        <p className="text-xl text-gray-400">Master Garden Horizons with our comprehensive guides</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-green-500/40 hover:bg-white/10 transition"
          >
            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-green-500 transition">
              {guide.title}
            </h2>
            <p className="text-sm text-gray-400 mb-4">{guide.description}</p>
            <div className="flex gap-3 text-xs text-gray-500">
              {guide.quickFacts.slice(0, 2).map((fact) => (
                <span key={fact.label} className="px-2 py-1 rounded bg-white/5">
                  {fact.value}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
