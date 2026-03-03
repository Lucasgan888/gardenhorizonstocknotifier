import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Garden Horizons Traveling Merchant - Live Stock & Tips',
    description: 'Learn about the Garden Horizons Traveling Merchant, what they sell, and how to use our live stock tracker to catch their limited-time items.',
};

export default function TravelingMerchantPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
            <nav className="text-sm text-gray-500 mb-8 flex items-center gap-2">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>&gt;</span>
                <span className="text-gray-300">Guides</span>
                <span>&gt;</span>
                <span className="text-white">Traveling Merchant Guide</span>
            </nav>

            <article className="space-y-12">
                <header className="space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-amber-500 tracking-tight">
                        Garden Horizons Traveling Merchant Guide
                    </h1>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        The Traveling Merchant is one of the most exciting parts of Garden Horizons because it can sell unusual or high-value items for a limited time. The challenge is that the merchant’s stock is unpredictable and easy to miss.
                    </p>
                </header>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">What the Traveling Merchant sells</h2>
                    <p className="text-gray-400 leading-relaxed">
                        The Traveling Merchant can offer a mix of seeds, tools, cosmetics, and other special items that you might not see in regular shops. Some of these offers are purely cosmetic, while others provide strong gameplay advantages or shortcuts for progression.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Why the merchant is easy to miss</h2>
                    <p className="text-gray-400 leading-relaxed">
                        Unlike permanent shop NPCs, the Traveling Merchant appears on a schedule and rotates inventory quickly. If you log in at the wrong time or only check once per session, you may never see some of the best deals. That is why many players feel like they are always “just missing” good offers.
                    </p>
                </section>

                <section className="space-y-4 p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                    <h2 className="text-2xl font-bold text-amber-500">Tracking the Traveling Merchant’s stock</h2>
                    <p className="text-gray-300 leading-relaxed">
                        A live stock tracker can treat the Traveling Merchant like any other shop, listing its current items in a dedicated tab. This lets you see what the merchant is selling without guessing or running to its location every few minutes. When something valuable appears, you can jump into the game and buy it immediately.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Tips for getting the most out of the merchant</h2>
                    <p className="text-gray-400 leading-relaxed">
                        Decide in advance which types of items you want from the merchant, such as rare seeds or unique cosmetics. Keep the merchant tab open while you play, and be ready to spend when your target items show up. If you combine this approach with farming and regular play sessions, the Traveling Merchant becomes a reliable source of special rewards instead of a source of frustration.
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
