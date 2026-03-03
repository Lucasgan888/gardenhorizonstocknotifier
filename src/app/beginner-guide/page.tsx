import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Garden Horizons Beginner Guide - Seeds, Tools, and Stock Timing',
    description: 'New to Garden Horizons? Learn the basics of farming, understanding shop stock rotation, and using a live stock tracker for a beginner’s advantage.',
};

export default function BeginnerGuidePage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
            <nav className="text-sm text-gray-500 mb-8 flex items-center gap-2">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>&gt;</span>
                <span className="text-gray-300">Guides</span>
                <span>&gt;</span>
                <span className="text-white">Beginner Guide</span>
            </nav>

            <article className="space-y-12">
                <header className="space-y-6 flex flex-col items-center text-center">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                        Garden Horizons Beginner Guide
                    </h1>
                    <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
                        Garden Horizons is a relaxing farming and decorating game on Roblox, but the amount of items, shops, and systems can feel overwhelming at first. This beginner guide walks you through the basics and shows how a live stock tracker can give you an early advantage.
                    </p>
                </header>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <span className="text-green-500">🌱</span> Getting started with your garden
                    </h2>
                    <p className="text-gray-400 leading-relaxed">
                        When you first spawn in Garden Horizons, focus on learning how to plant, water, and harvest crops. Use inexpensive seeds to understand the growth cycle and experiment with different layouts. Earning a steady stream of coins early on makes it much easier to afford better tools and rare items later.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <span className="text-blue-400">💧</span> Understanding shops and currency
                    </h2>
                    <p className="text-gray-400 leading-relaxed">
                        Several shops in Garden Horizons sell seeds, tools, eggs, cosmetics, and special honey-based items. Coins and other game currencies are limited, so you should avoid impulse buys on low-impact items. Knowing what each shop offers and how often it changes stock helps you spend resources wisely.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <span className="text-yellow-400">⏱️</span> Why stock rotation matters
                    </h2>
                    <p className="text-gray-400 leading-relaxed">
                        Shop stock does not stay the same all day. Items rotate on a frequent schedule, which means you might see a basic shovel in one rotation and a powerful tool in the next. If you only check the shop occasionally, you can easily miss rare items that would significantly speed up your progress.
                    </p>
                </section>

                <section className="p-6 bg-green-500/10 border border-green-500/20 rounded-2xl">
                    <h2 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-2">
                        <span className="text-green-500">✨</span> Using a stock tracker as a new player
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        A live stock tracker shows you the current inventory for all major shops in one place. As a beginner, this means you can wait for specific upgrades—such as a better watering can or harvesting tool—before spending your hard-earned coins. Instead of guessing, you make informed decisions based on what is actually available.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <span className="text-purple-400">📝</span> Building a simple upgrade plan
                    </h2>
                    <p className="text-gray-400 leading-relaxed">
                        Start by targeting a few key upgrades: a better tool for farming, a couple of higher-value seeds, and maybe one cosmetic that you really like. Add these items to your watchlist in the tracker so they stand out when they appear. Over time, this focused approach keeps you from wasting coins on items that do not fit your long-term goals.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <span className="text-orange-400">🤝</span> Learning from the community
                    </h2>
                    <p className="text-gray-400 leading-relaxed">
                        Garden Horizons has an active community that shares tips, layouts, and rare item sightings. Join the official or fan Discord servers, and combine community knowledge with the live stock tracker. As you learn more about which items are truly valuable, you can refine your watchlist and play more efficiently.
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
