import { Metadata } from 'next';
import Link from 'next/link';
import { categories } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Garden Horizons Categories - Seeds, Gear & More',
  description: 'Browse all item categories in Garden Horizons. Find seeds, gear, eggs, and other items organized by type.',
};

export default function CategoriesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Item Categories</h1>
        <p className="text-xl text-gray-400">Browse items by category</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-green-500/40 hover:bg-white/10 transition"
          >
            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-green-500 transition">
              {category.title}
            </h2>
            <p className="text-sm text-gray-400 mb-4">{category.description}</p>
            <div className="text-xs text-gray-500">
              {category.featuredItems.length} featured items
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
