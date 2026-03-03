import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Garden Horizons Stock Notifier Blog',
    description: 'Stay up to date with tips, guides, and updates for Garden Horizons and the live stock tracker.',
};

export default function BlogIndexPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-20">
            <nav className="text-sm text-gray-500 mb-8 flex items-center gap-2">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>&gt;</span>
                <span className="text-white">Blog</span>
            </nav>

            <header className="space-y-6 mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    Garden Horizons Stock Notifier Blog
                </h1>
                <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
                    Stay up to date with tips, guides, and updates for Garden Horizons and the live stock tracker. These articles help you get rare items more efficiently and understand how shop rotations work.
                </p>
            </header>

            <section className="mb-16">
                <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/5 pb-4">Featured Guides</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <Link href="/blog/how-often-garden-horizons-shop-updates" className="block p-6 rounded-2xl bg-[#11161F] border border-white/5 hover:border-blue-500/50 transition-colors group">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">How Often Does the Garden Horizons Shop Update?</h3>
                        <p className="text-sm text-gray-400 line-clamp-3">
                            If you have ever opened a shop in Garden Horizons and seen nothing interesting, you might wonder how often the stock actually changes. Understanding the update rhythm helps you plan when to check shops.
                        </p>
                    </Link>

                    <div className="block p-6 rounded-2xl bg-[#11161F]/50 border border-white/5 opacity-70">
                        <h3 className="text-xl font-bold text-white mb-3">Best Times to Check Garden Horizons Stock</h3>
                        <p className="text-sm text-gray-400 line-clamp-3">
                            Coming soon. We analyze the best times during the day to check for legendary and epic items.
                        </p>
                    </div>

                    <div className="block p-6 rounded-2xl bg-[#11161F]/50 border border-white/5 opacity-70">
                        <h3 className="text-xl font-bold text-white mb-3">Top Rare Seeds to Watch in Garden Horizons</h3>
                        <p className="text-sm text-gray-400 line-clamp-3">
                            Coming soon. A deep dive into the most profitable and rarest seeds you can find in the game.
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/5 pb-4">Latest Articles</h2>
                <div className="space-y-6">
                    <article className="p-6 rounded-2xl bg-[#11161F] border border-white/5 hover:bg-[#171E29] transition-colors">
                        <Link href="/blog/how-often-garden-horizons-shop-updates" className="block group">
                            <time className="text-xs font-semibold text-green-500 tracking-wider uppercase mb-2 block">LATEST</time>
                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">How Often Does the Garden Horizons Shop Update?</h3>
                            <p className="text-gray-400 mb-4 line-clamp-2">
                                If you have ever opened a shop in Garden Horizons and seen nothing interesting, you might wonder how often the stock actually changes. Understanding the update rhythm helps you plan when to check shops and when to wait for better rotations.
                            </p>
                            <span className="text-sm text-blue-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                                Read article <span>→</span>
                            </span>
                        </Link>
                    </article>
                </div>
            </section>
        </div>
    );
}
