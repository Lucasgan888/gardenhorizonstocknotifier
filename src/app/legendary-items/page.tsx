import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Legendary Items in Garden Horizons - How to Catch Them in Stock',
    description: 'A comprehensive guide to Legendary items in Garden Horizons. Find out how to track and catch them using our live inventory tracker.',
};

export default function LegendaryItemsPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
            <nav className="text-sm text-gray-500 mb-8 flex items-center gap-2">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>&gt;</span>
                <span className="text-gray-300">Guides</span>
                <span>&gt;</span>
                <span className="text-white">Legendary Items</span>
            </nav>

            <article className="space-y-12">
                <header className="space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(250,204,21,0.2)]">
                        Legendary Items in Garden Horizons
                    </h1>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        Legendary items are the rarest and most desirable in Garden Horizons. They may offer unique abilities, large boosts in income, or strong utility. These items can appear unexpectedly and disappear just as quickly when the stock rotates, which makes them difficult to obtain without some form of tracking.
                    </p>
                </header>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-yellow-400">Examples of Legendary items</h2>
                    <p className="text-gray-400 leading-relaxed">
                        Some of the most famous legendary items include the Lucky Clover, Weather Machine, and Golden Watering Can. Obtaining these tools can significantly accelerate your growth progress, allowing you to bypass hours of grinding.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Why Legendary items are hard to get</h2>
                    <p className="text-gray-400 leading-relaxed">
                        Because a given shop only sells a few items at a time, the probability of a legendary tier item taking a slot is extremely low. Furthermore, when they do appear, the 5-minute rotation cycle means you have very little time to reach the merchant and buy it.
                    </p>
                </section>

                <section className="space-y-4 p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl">
                    <h2 className="text-2xl font-bold text-yellow-400">Using Garden Horizons Stock Notifier to track Legendary stock</h2>
                    <p className="text-gray-300 leading-relaxed">
                        The easiest way to track legendary items is by starring them in our live stock tracker. You can keep the tracker running in the background and wait until you receive an alert that a legendary item is currently available in stock.
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
