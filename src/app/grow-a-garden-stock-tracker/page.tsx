import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Grow a Garden Live Stock Tracker - Seeds, Gear, Eggs & Merchant',
  description: 'Garden Horizons Stock Notifier is a fan-made live stock tracker for the Roblox game Grow a Garden. It shows real-time shop inventory.',
  alternates: {
    canonical: 'https://gardenhorizonstocknotifier.com/',
  },
};

export default function GrowAGardenStockTrackerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <nav className="text-sm text-gray-500 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>&gt;</span>
        <span className="text-gray-300">Guides</span>
        <span>&gt;</span>
        <span className="text-white">Grow a Garden Stock Tracker</span>
      </nav>

      <article className="space-y-12">
        <header className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
            Grow a Garden Live Stock Tracker
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Garden Horizons Stock Notifier is a fan-made live stock tracker for the Roblox game Grow a Garden. It shows real-time shop inventory so you can see which seeds, gear, eggs, and other items are available before you even open the game.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">What is Garden Horizons Stock Notifier?</h2>
          <p className="text-gray-400 leading-relaxed">
            Garden Horizons Stock Notifier is a companion website built specifically for the Garden Horizons game mode (also known as Grow a Garden) on Roblox. It reads live game data and displays the current stock for multiple shops in one simple dashboard, so you do not have to run between NPCs or guess what might be available.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">What shops and items does it track?</h2>
          <p className="text-gray-400 leading-relaxed">
            The tracker covers several key shops in Garden Horizons, including Seeds, Eggs, Gear, Honey Shop, Cosmetics, and the Traveling Merchant. Each shop has its own tab showing the current items, their prices, and their rarity, making it easy to compare options and plan your purchases.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">How the live stock updates work</h2>
          <p className="text-gray-400 leading-relaxed">
            The stock data is refreshed automatically every few seconds, so you always see an up-to-date view of what is in each shop. In-game stock usually rotates on a short cycle, which means rare items may only appear for a limited time. The tracker helps you catch those rotations without constantly reloading the game menus.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Benefits for Garden Horizons players</h2>
          <p className="text-gray-400 leading-relaxed">
            Using the tracker saves time and increases your chances of getting rare items. Instead of walking to every shop NPC to check inventory, you can monitor everything in one place, star the items you care about, and react quickly when they appear. This is especially helpful if you are hunting high-value tools, rare seeds, or limited cosmetics.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">How to start using the tracker</h2>
          <p className="text-gray-400 leading-relaxed">
            To start, open the live stock page on the homepage and pick the shop tab you care about most. Browse the current items, star your favorites, and keep the page open while you play. When you see something you want appear in stock, hop into the game and buy it before the rotation changes.
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
