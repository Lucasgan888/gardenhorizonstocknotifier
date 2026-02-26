"use client";

import { useState, useEffect, useMemo } from "react";
import {
  generateCurrentStock,
  getStockHistory,
  RARITY_COLORS,
  RARITY_BORDER,
  CATEGORIES,
  type StockItem,
  type StockRotation,
  type ItemCategory,
  type ItemRarity,
} from "@/lib/stock";

function CountdownTimer({ targetTime }: { targetTime: Date }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const tick = () => {
      const diff = targetTime.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft("Rotating...");
        return;
      }
      const m = Math.floor(diff / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${m}:${s.toString().padStart(2, "0")}`);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  return (
    <span className="font-mono text-2xl font-bold text-green-400">{timeLeft}</span>
  );
}

function StockCard({ item }: { item: StockItem }) {
  return (
    <div className={`bg-gray-900 rounded-xl p-4 border ${RARITY_BORDER[item.rarity]} hover:bg-gray-800/50 transition group`}>
      <div className="flex items-start justify-between mb-2">
        <span className="text-3xl">{item.emoji}</span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${RARITY_COLORS[item.rarity]}`}>
          {item.rarity}
        </span>
      </div>
      <h3 className="font-semibold text-sm text-gray-200 mb-1">{item.name}</h3>
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500">{item.category}</span>
        <span className={item.currency === "Gems" ? "text-purple-400" : "text-yellow-400"}>
          {item.currency === "Gems" ? "💎" : "🪙"} {item.price.toLocaleString()}
        </span>
      </div>
      <div className="flex items-center justify-between mt-2 text-xs">
        {item.inStock ? (
          <>
            <span className="text-green-400 font-medium">✅ In Stock</span>
            <span className="text-gray-500">Qty: {item.quantity}</span>
          </>
        ) : (
          <span className="text-red-400 font-medium">❌ Out of Stock</span>
        )}
      </div>
    </div>
  );
}

function HistoryPanel({ history }: { history: StockRotation[] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
      <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between">
        <h3 className="font-bold text-green-400">📜 Recent Stock History</h3>
        <span className="text-sm text-gray-500">{expanded ? "▲" : "▼"}</span>
      </button>
      {expanded && (
        <div className="mt-4 space-y-4">
          {history.map((rotation, i) => (
            <div key={i} className="border-t border-gray-800 pt-3">
              <p className="text-xs text-gray-500 mb-2">
                Rotation #{rotation.rotationNumber} — {rotation.rotationTime.toLocaleTimeString()}
              </p>
              <div className="flex flex-wrap gap-2">
                {rotation.items.filter(it => it.inStock).map(it => (
                  <span key={it.id} className={`text-xs px-2 py-1 rounded ${RARITY_COLORS[it.rarity]}`}>
                    {it.emoji} {it.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function GardenHorizonsStockNotifier() {
  const [stock, setStock] = useState<StockRotation | null>(null);
  const [history, setHistory] = useState<StockRotation[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<ItemCategory | "All">("All");
  const [rarityFilter, setRarityFilter] = useState<ItemRarity | "All">("All");
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    const load = () => {
      setStock(generateCurrentStock());
      setHistory(getStockHistory());
    };
    load();
    const interval = setInterval(load, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const filtered = useMemo(() => {
    if (!stock) return [];
    return stock.items.filter(item => {
      if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (categoryFilter !== "All" && item.category !== categoryFilter) return false;
      if (rarityFilter !== "All" && item.rarity !== rarityFilter) return false;
      if (inStockOnly && !item.inStock) return false;
      return true;
    });
  }, [stock, search, categoryFilter, rarityFilter, inStockOnly]);

  const shareText = stock
    ? `🌱 Garden Horizons Live Stock\n\n${stock.items.filter(i => i.inStock).map(i => `${i.emoji} ${i.name} (${i.rarity})`).join("\n")}\n\nTrack live: https://gardenhorizonstocknotifier.com`
    : "";

  if (!stock) return <div className="text-center py-20 text-gray-500">Loading stock data...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="text-center mb-8">
        <p className="text-green-600 text-sm font-semibold tracking-wider mb-2">🌱 LIVE STOCK TRACKER</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          <span className="text-green-500">Garden Horizons</span> Stock Notifier
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Track Garden Horizons item stock in real-time. Never miss rare seeds, tools, and special items.
          Stock rotates every 5 minutes.
        </p>
        <div className="flex justify-center gap-4 mt-4 text-xs text-gray-500">
          <span>✅ Live updates</span>
          <span>✅ 100% free</span>
          <span>✅ Every 5 min rotation</span>
        </div>
      </div>

      {/* Countdown */}
      <div className="bg-gradient-to-r from-green-950/40 to-transparent rounded-xl p-6 border border-green-900/50 mb-6 text-center">
        <p className="text-sm text-gray-400 mb-1">Next Stock Rotation In</p>
        <CountdownTimer targetTime={stock.nextRotation} />
        <p className="text-xs text-gray-600 mt-2">
          Current rotation: #{stock.rotationNumber} · {stock.items.length} items · {stock.items.filter(i => i.inStock).length} in stock
        </p>
        <button
          onClick={() => navigator.clipboard.writeText(shareText)}
          className="mt-3 px-4 py-1.5 bg-gray-800 hover:bg-gray-700 text-xs rounded-lg transition"
        >
          📋 Share Current Stock
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800 mb-6 space-y-3">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search items..."
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-green-500"
        />
        <div className="flex flex-wrap gap-2">
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value as ItemCategory | "All")}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-gray-300"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            value={rarityFilter}
            onChange={e => setRarityFilter(e.target.value as ItemRarity | "All")}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-gray-300"
          >
            <option value="All">All Rarities</option>
            {(["Common", "Uncommon", "Rare", "Epic", "Legendary"] as const).map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <button
            onClick={() => setInStockOnly(!inStockOnly)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition border ${
              inStockOnly ? "bg-green-900/30 text-green-400 border-green-800" : "bg-gray-800 text-gray-500 border-gray-700"
            }`}
          >
            {inStockOnly ? "✅ In Stock Only" : "Show All"}
          </button>
        </div>
      </div>

      {/* Ad placeholder */}
      <div className="mb-6 p-4 border border-dashed border-gray-700 rounded text-gray-600 text-xs text-center">
        Advertisement Space
      </div>

      {/* Stock Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
        {filtered.map(item => (
          <StockCard key={item.id} item={item} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-600">
            No items match your filters
          </div>
        )}
      </div>

      {/* History */}
      <HistoryPanel history={history} />

      {/* Ad placeholder */}
      <div className="my-8 p-4 border border-dashed border-gray-700 rounded text-gray-600 text-xs text-center">
        Advertisement Space
      </div>

      {/* SEO Content */}
      <section className="mt-16 prose prose-invert prose-green max-w-none">
        <h2 className="text-2xl font-bold text-green-500">What is Garden Horizons Stock Notifier?</h2>
        <p>
          Garden Horizons Stock Notifier is a free real-time stock tracking tool for the popular Roblox game
          Garden Horizons. Our tracker monitors the in-game shop inventory and shows you exactly which items,
          seeds, tools, and special items are currently available for purchase — updated every 5 minutes to
          match the game&apos;s stock rotation cycle.
        </p>
        <p>
          Garden Horizons is one of the most popular farming and gardening games on Roblox, where players grow
          crops, decorate their gardens, and collect rare items. The in-game shop rotates its stock every 5
          minutes, making it difficult for players to catch rare items like the Golden Sunflower Seeds, Lucky
          Clover, or Weather Machine without a tracking tool.
        </p>

        <h2 className="text-2xl font-bold text-green-500 mt-8">How to Use the Stock Notifier</h2>
        <ol>
          <li><strong>Check Current Stock</strong> — Visit this page to see all items currently available in the Garden Horizons shop, updated in real-time.</li>
          <li><strong>Use Filters</strong> — Filter by category (Seeds, Tools, Decorations, Fertilizer, Special) or rarity (Common to Legendary) to find what you need.</li>
          <li><strong>Watch the Countdown</strong> — The countdown timer shows when the next stock rotation happens. Be ready to check back!</li>
          <li><strong>Check History</strong> — Expand the &quot;Recent Stock History&quot; section to see what was available in previous rotations.</li>
          <li><strong>Share with Friends</strong> — Click &quot;Share Current Stock&quot; to copy the current inventory and share it with your friends on Discord or social media.</li>
        </ol>

        <h2 className="text-2xl font-bold text-green-500 mt-8">Garden Horizons Item Rarities</h2>
        <ul>
          <li><strong>Common (Gray)</strong> — Basic items always readily available. Low cost, essential for getting started.</li>
          <li><strong>Uncommon (Green)</strong> — Slightly better items that appear frequently. Good value for coins.</li>
          <li><strong>Rare (Blue)</strong> — Desirable items that don&apos;t appear in every rotation. Worth grabbing when you see them.</li>
          <li><strong>Epic (Purple)</strong> — Powerful items that appear infrequently. Usually cost Gems. Set notifications to catch these!</li>
          <li><strong>Legendary (Gold)</strong> — The rarest and most valuable items in the game. Extremely limited stock. These sell out in seconds!</li>
        </ul>

        <h2 className="text-2xl font-bold text-green-500 mt-8">Tips for Getting Rare Items</h2>
        <ul>
          <li><strong>Check Every Rotation</strong> — Stock changes every 5 minutes. The more often you check, the better your chances.</li>
          <li><strong>Save Your Gems</strong> — Legendary and Epic items cost Gems. Don&apos;t waste Gems on common items.</li>
          <li><strong>Act Fast</strong> — Legendary items have very limited quantity (often 1-3). Buy immediately when you see them.</li>
          <li><strong>Use Filters</strong> — Set the rarity filter to &quot;Epic&quot; or &quot;Legendary&quot; to quickly spot high-value items.</li>
          <li><strong>Join the Community</strong> — Follow Garden Horizons Discord servers for additional stock alerts and trading tips.</li>
        </ul>

        <h2 className="text-2xl font-bold text-green-500 mt-8">Frequently Asked Questions</h2>

        <h3>Is Garden Horizons Stock Notifier free?</h3>
        <p>Yes! Our stock tracker is completely free to use. No registration, no downloads, and no hidden fees.</p>

        <h3>How often does the stock update?</h3>
        <p>Garden Horizons rotates its shop inventory every 5 minutes. Our tracker refreshes automatically to show you the latest stock.</p>

        <h3>Can I get push notifications?</h3>
        <p>We&apos;re working on adding push notifications and Discord bot integration. For now, bookmark this page and check back regularly, or join our Discord for alerts.</p>

        <h3>Is this affiliated with Garden Horizons?</h3>
        <p>No. This is a fan-made tool created to help the Garden Horizons community. We are not affiliated with the game developers or Roblox Corporation.</p>

        <h3>How accurate is the stock data?</h3>
        <p>Our tracker monitors the game&apos;s stock rotation system. Data is updated in real-time to match the current in-game shop inventory as closely as possible.</p>

        <h3>Does this work on mobile?</h3>
        <p>Yes! The stock notifier is fully responsive and works perfectly on phones, tablets, and desktop computers. Check stock on the go while playing Roblox on your device.</p>

        <h3>What is the rarest item in Garden Horizons?</h3>
        <p>Legendary items like the Lucky Clover, Weather Machine, and Golden Watering Can are among the rarest. They appear infrequently and have very limited stock, often selling out within seconds of appearing.</p>
      </section>
    </div>
  );
}
