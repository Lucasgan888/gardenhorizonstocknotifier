import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'How to Get Rare Items in Garden Horizons - Stock Rotation Tips',
    description: 'Learn the best strategies to find and obtain rare and legendary items in Garden Horizons. Discover stock rotation tips and maximize your gameplay.',
};

export default function HowToGetRareItemsPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
            <nav className="text-sm text-gray-500 mb-8 flex items-center gap-2">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>&gt;</span>
                <span className="text-gray-300">Guides</span>
                <span>&gt;</span>
                <span className="text-white">How to Get Rare Items</span>
            </nav>

            <article className="space-y-12">
                <header className="space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        How to Get Rare Items in Garden Horizons
                    </h1>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        Rare and legendary items can make a big difference in your Garden Horizons progress, but they are easy to miss because shop stock changes quickly. With a bit of planning and the right tools, you can dramatically increase your chances of grabbing them.
                    </p>
                </header>

                <div className="grid md:grid-cols-2 gap-8">
                    <section className="bg-[#11161F] p-8 rounded-2xl border border-white/5">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                            <span className="text-2xl">⏳</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Understand the stock rotation</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Shop inventories in Garden Horizons rotate on a frequent cycle. Items you see now will disappear and be replaced after a short period, which means rare items might only be available for a few minutes. Instead of checking randomly, it is better to watch rotations and time your visits.
                        </p>
                    </section>

                    <section className="bg-[#11161F] p-8 rounded-2xl border border-white/5">
                        <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6">
                            <span className="text-2xl">🏪</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Focus on the right shops</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Not every shop has the same chance of showing rare items. Seeds, Gear, and the Traveling Merchant are usually the most interesting when you are hunting rare options. Keeping these tabs open in a stock tracker lets you see high-value opportunities without constantly walking between NPCs.
                        </p>
                    </section>

                    <section className="bg-[#11161F] p-8 rounded-2xl border border-white/5">
                        <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-6">
                            <span className="text-2xl">⭐</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Use a watchlist to track your targets</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Before you start playing, decide which items you want the most and mark them as favorites in the tracker. A watchlist view makes those items stand out whenever they appear. This reduces noise from all the common items and lets you act quickly when your priorities show up.
                        </p>
                    </section>

                    <section className="bg-[#11161F] p-8 rounded-2xl border border-white/5">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
                            <span className="text-2xl">⚡</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Check often and act fast</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Because rotations are frequent, consistency is more important than luck. If you can check stock regularly and respond quickly when good items appear, you will naturally collect more rare gear over time. Keeping the tracker open on a second screen or device is an easy way to react within seconds.
                        </p>
                    </section>
                </div>

                <section className="bg-[#11161F]/50 p-8 rounded-2xl border border-white/5">
                    <h2 className="text-2xl font-bold text-white mb-4">Combine tracking with good game habits</h2>
                    <p className="text-gray-400 leading-relaxed">
                        A tracker does not replace gameplay, but it does help you use your time efficiently. Farm resources while you keep an eye on stock, and only pause to buy items when something worthwhile appears. Over time, this routine becomes a low-stress way to build a strong collection of rare items.
                    </p>
                </section>

                <div className="pt-8 text-center pb-8 border-b border-white/5">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold py-4 px-8 rounded-xl shadow-lg shadow-green-500/20 transition-all transform hover:scale-105"
                    >
                        <span>Open the live Garden Horizons stock tracker</span>
                        <span className="text-xl">🚀</span>
                    </Link>
                </div>
            </article>
        </div>
    );
}
