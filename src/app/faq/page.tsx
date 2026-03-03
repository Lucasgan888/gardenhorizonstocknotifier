import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Garden Horizons Stock Notifier FAQ',
    description: 'Answers to common questions about using the Garden Horizons live stock tracker, data accuracy, refresh rates, and more.',
};

export default function FAQPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
            <nav className="text-sm text-gray-500 mb-8 flex items-center gap-2">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>&gt;</span>
                <span className="text-white">FAQ</span>
            </nav>

            <article className="space-y-12">
                <header className="space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                        Garden Horizons Stock Notifier FAQ
                    </h1>
                    <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
                        This FAQ answers the most common questions about how the stock tracker works, what data it uses, and how you can get the most value out of it as a Garden Horizons player.
                    </p>
                </header>

                <div className="grid gap-6">
                    <section className="p-6 bg-[#11161F] border border-white/5 rounded-2xl">
                        <h2 className="text-xl font-bold text-white mb-2">Is Garden Horizons Stock Notifier free?</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Yes. The tracker is completely free to use. There is no registration required, no downloads, and no hidden fees. You can simply open the website, view the current stock, and start playing.
                        </p>
                    </section>

                    <section className="p-6 bg-[#11161F] border border-white/5 rounded-2xl">
                        <h2 className="text-xl font-bold text-white mb-2">How often does the stock update?</h2>
                        <p className="text-gray-400 leading-relaxed">
                            The website refreshes its data automatically every 30 seconds to keep up with in-game shop changes. Garden Horizons shop stock usually rotates on a short cycle, so frequent updates are important to show you what is currently available.
                        </p>
                    </section>

                    <section className="p-6 bg-[#11161F] border border-white/5 rounded-2xl">
                        <h2 className="text-xl font-bold text-white mb-2">Do I need to log in with my Roblox account?</h2>
                        <p className="text-gray-400 leading-relaxed">
                            No. The tracker does not ask for your Roblox login or any personal account information. It simply reads publicly available game data and displays the current shop inventory in a convenient format.
                        </p>
                    </section>

                    <section className="p-6 bg-[#11161F] border border-white/5 rounded-2xl">
                        <h2 className="text-xl font-bold text-white mb-2">Can I get push notifications or alerts?</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Push notifications are not available yet, but they are on the roadmap. For now, you can keep the tracker open in a browser tab, star items you care about, and use the watchlist view to see when your favorites are in stock.
                        </p>
                    </section>

                    <section className="p-6 bg-[#11161F] border border-white/5 rounded-2xl">
                        <h2 className="text-xl font-bold text-white mb-2">How does the watchlist work?</h2>
                        <p className="text-gray-400 leading-relaxed">
                            On the live stock page, you can click the star icon on any item to add it to your watchlist. When that item appears in stock again, it will be highlighted at the top in the watchlist view. This makes it much easier to track specific seeds, tools, or cosmetics.
                        </p>
                    </section>

                    <section className="p-6 bg-[#11161F] border border-white/5 rounded-2xl">
                        <h2 className="text-xl font-bold text-white mb-2">Where does the stock data come from?</h2>
                        <p className="text-gray-400 leading-relaxed">
                            The tracker uses live data from a dedicated Garden Horizons stock API. This data is updated frequently to match in-game rotations, but there may occasionally be small delays or mismatches if the game itself is experiencing issues.
                        </p>
                    </section>

                    <section className="p-6 bg-[#11161F] border border-white/5 rounded-2xl">
                        <h2 className="text-xl font-bold text-white mb-2">Is this affiliated with Roblox or the Garden Horizons developers?</h2>
                        <p className="text-gray-400 leading-relaxed">
                            No. Garden Horizons Stock Notifier is an unofficial fan-made tool. It is not affiliated with Roblox Corporation or the developers of Garden Horizons, and all game assets and names belong to their respective owners.
                        </p>
                    </section>

                    <section className="p-6 bg-[#11161F] border border-white/5 rounded-2xl">
                        <h2 className="text-xl font-bold text-white mb-2">How accurate is the stock information?</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Stock information is generally very accurate because it is pulled from live game data and refreshed automatically. However, rare edge cases can occur if the game updates or if there are network issues. If you ever notice a discrepancy, you can report it through the contact page.
                        </p>
                    </section>

                    <section className="p-6 bg-[#11161F] border border-white/5 rounded-2xl">
                        <h2 className="text-xl font-bold text-white mb-2">Does this work on mobile devices?</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Yes. The website is fully responsive and works on phones, tablets, and desktop computers. Many players keep the tracker open on a mobile device while playing Roblox on another screen.
                        </p>
                    </section>

                    <section className="p-6 bg-[#11161F] border border-[#FACC15]/20 rounded-2xl">
                        <h2 className="text-xl font-bold text-[#FACC15] mb-2">What is the rarest item in Garden Horizons?</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Legendary-tier items are considered the rarest and most sought-after in Garden Horizons. These can include high-impact tools and unique special items that only appear occasionally in shop rotations.
                        </p>
                    </section>
                </div>

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
