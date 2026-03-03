import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Garden Horizons Item Rarities - Common to Legendary Guide',
    description: 'Understand the rarity system in Garden Horizons. Learn about common, uncommon, rare, epic, and legendary items in this straightforward guide.',
};

export default function GardenHorizonsItemRaritiesPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
            <nav className="text-sm text-gray-500 mb-8 flex items-center gap-2">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>&gt;</span>
                <span className="text-gray-300">Guides</span>
                <span>&gt;</span>
                <span className="text-white">Garden Horizons Item Rarities Explained</span>
            </nav>

            <article className="space-y-12">
                <header className="space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Garden Horizons Item Rarities Explained
                    </h1>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        Items in Garden Horizons use a rarity system that ranges from common to legendary. Understanding these rarity tiers helps you decide which items are worth buying immediately and which ones you can safely skip.
                    </p>
                </header>

                <div className="grid gap-6">
                    <section className="p-6 rounded-2xl bg-[#11161F] border border-white/5 relative overflow-hidden group hover:border-[#9CA3AF]/50 transition-colors">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#9CA3AF]"></div>
                        <h2 className="text-xl font-bold text-[#9CA3AF] mb-3 flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#9CA3AF]"></span>
                            Common (Gray) items
                        </h2>
                        <p className="text-gray-400 leading-relaxed">
                            Common items are the most basic options in Garden Horizons. They usually have low stats or simple effects, and they appear in stock frequently. These are good for early-game progress or as temporary fillers until you can upgrade to something better.
                        </p>
                    </section>

                    <section className="p-6 rounded-2xl bg-[#11161F] border border-white/5 relative overflow-hidden group hover:border-[#22C55E]/50 transition-colors">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#22C55E]"></div>
                        <h2 className="text-xl font-bold text-[#22C55E] mb-3 flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#22C55E]"></span>
                            Uncommon (Green) items
                        </h2>
                        <p className="text-gray-400 leading-relaxed">
                            Uncommon items offer slight improvements over common ones. They may have better stats, slightly higher profits, or small quality-of-life bonuses. You will see them regularly in the shop, so there is usually no need to panic-buy them unless you are just starting out.
                        </p>
                    </section>

                    <section className="p-6 rounded-2xl bg-[#11161F] border border-white/5 relative overflow-hidden group hover:border-[#3B82F6]/50 transition-colors">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#3B82F6]"></div>
                        <h2 className="text-xl font-bold text-[#3B82F6] mb-3 flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#3B82F6]"></span>
                            Rare (Blue) items
                        </h2>
                        <p className="text-gray-400 leading-relaxed">
                            Rare items provide a noticeable power boost or convenience upgrade compared to lower rarities. They tend to cost more and appear less often, but you still have multiple chances to see them cycle through the shop. If a blue item matches your playstyle, it is usually worth grabbing when you see it.
                        </p>
                    </section>

                    <section className="p-6 rounded-2xl bg-[#11161F] border border-white/5 relative overflow-hidden group hover:border-[#A855F7]/50 transition-colors">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#A855F7]"></div>
                        <h2 className="text-xl font-bold text-[#A855F7] mb-3 flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#A855F7]"></span>
                            Epic (Purple) items
                        </h2>
                        <p className="text-gray-400 leading-relaxed">
                            Epic items are high-tier options with strong effects or very efficient stats. Many of them are tied to gem prices or limited shop slots. Because they do not show up as often as common or rare items, players who want to optimize their farms usually keep an eye out for specific epic gear or tools.
                        </p>
                    </section>

                    <section className="p-6 rounded-2xl bg-[#11161F] border border-[#FACC15]/20 relative overflow-hidden group hover:border-[#FACC15]/50 transition-all shadow-lg shadow-[#FACC15]/5">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#FACC15] shadow-[0_0_10px_#FACC15]"></div>
                        <h2 className="text-xl font-bold text-[#FACC15] mb-3 flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#FACC15] shadow-[0_0_8px_#FACC15]"></span>
                            Legendary (Gold) items
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            Legendary items are the rarest and most desirable in Garden Horizons. They may offer unique abilities, large boosts in income, or strong utility. These items can appear unexpectedly and disappear just as quickly when the stock rotates, which makes them difficult to obtain without some form of tracking.
                        </p>
                        <div className="mt-4 pt-4 border-t border-white/5">
                            <Link href="/legendary-items" className="text-[#FACC15] hover:underline text-sm font-medium flex items-center gap-1">
                                See more about legendary items <span>→</span>
                            </Link>
                        </div>
                    </section>
                </div>

                <section className="space-y-4 pt-6">
                    <h2 className="text-2xl font-bold text-white">Using a stock tracker for each rarity tier</h2>
                    <p className="text-gray-400 leading-relaxed">
                        A live stock tracker helps you target different rarity tiers more efficiently. You can ignore most common items, check in periodically for rare and epic options, and react instantly when legendary items show up. By filtering and watching specific shops, you turn the randomness of stock rotation into a system you can plan around.
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
