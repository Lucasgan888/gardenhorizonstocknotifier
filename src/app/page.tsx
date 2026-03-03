"use client";

import { useState, useEffect, useCallback } from "react";
import {
  fetchGardenStock,
  CATEGORY_CONFIG,
  type GardenStock,
  type StockItem,
  type ItemCategory,
} from "@/lib/stock";

// ─── Countdown Badge ──────────────────────────────────────────────────────────

function CountdownBadge({ countdown, label }: { countdown: string | null; label: string }) {
  if (!countdown) return null;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400">
      <span className="text-gray-600">{label}</span>
      <span className="font-mono text-green-400 font-semibold tabular-nums">{countdown}</span>
    </span>
  );
}

// ─── Stock Card ──────────────────────────────────────────────────────────────

function StockCard({
  item,
  watched,
  onToggleWatch,
}: {
  item: StockItem;
  watched: boolean;
  onToggleWatch: (name: string) => void;
}) {
  const cfg = CATEGORY_CONFIG[item.category];
  return (
    <div
      className={`relative rounded-2xl p-4 border ${cfg.border} bg-gradient-to-br ${cfg.bg} backdrop-blur-sm
        hover:scale-[1.03] hover:shadow-lg transition-all duration-200 group cursor-default`}
    >
      {/* Watch toggle */}
      <button
        onClick={() => onToggleWatch(item.name)}
        className="absolute top-2.5 right-2.5 text-sm opacity-30 group-hover:opacity-100 transition-opacity hover:scale-125"
        title={watched ? "Remove from watchlist" : "Add to watchlist"}
        aria-label={watched ? "Remove from watchlist" : "Add to watchlist"}
      >
        {watched ? "⭐" : "☆"}
      </button>

      <div className="text-3xl mb-2 leading-none">{item.emoji}</div>
      <h3 className="font-semibold text-sm text-gray-100 leading-snug pr-6 mb-2">{item.name}</h3>
      <div className="flex items-center justify-between text-xs">
        <span className={`${cfg.color} font-medium`}>{item.category}</span>
        <span className="text-gray-500 font-mono">
          ×<span className="text-gray-300">{item.quantity}</span>
        </span>
      </div>
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({
  emoji,
  title,
  colorClass,
  badge,
}: {
  emoji: string;
  title: string;
  colorClass: string;
  badge?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex items-center gap-2">
        <span className="text-xl">{emoji}</span>
        <h2 className={`text-base font-bold ${colorClass}`}>{title}</h2>
      </div>
      {badge}
    </div>
  );
}

// ─── Category Section ─────────────────────────────────────────────────────────

function CategorySection({
  title,
  category,
  items,
  countdown,
  watchlist,
  onToggleWatch,
  extraBadge,
}: {
  title: string;
  category: ItemCategory;
  items: StockItem[];
  countdown: string | null;
  watchlist: Set<string>;
  onToggleWatch: (name: string) => void;
  extraBadge?: React.ReactNode;
}) {
  const cfg = CATEGORY_CONFIG[category];
  if (items.length === 0) return null;

  return (
    <section className="mb-10" aria-label={title}>
      <SectionHeader
        emoji={cfg.emoji}
        title={title}
        colorClass={cfg.color}
        badge={
          <>
            <CountdownBadge countdown={countdown} label="Restock in:" />
            {extraBadge}
          </>
        }
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {items.map((item) => (
          <StockCard
            key={item.name}
            item={item}
            watched={watchlist.has(item.name)}
            onToggleWatch={onToggleWatch}
          />
        ))}
      </div>
    </section>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function GardenHorizonsStockNotifier() {
  const [stock, setStock] = useState<GardenStock | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<ItemCategory | "All">("All");
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set());
  const [showWatchedOnly, setShowWatchedOnly] = useState(false);

  // Hydrate watchlist from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("gag-watchlist");
      if (saved) setWatchlist(new Set(JSON.parse(saved)));
    } catch { }
  }, []);

  const toggleWatch = useCallback((name: string) => {
    setWatchlist((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      localStorage.setItem("gag-watchlist", JSON.stringify([...next]));
      return next;
    });
  }, []);

  const loadStock = useCallback(async () => {
    try {
      const data = await fetchGardenStock();
      setStock(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (e) {
      setError("Unable to load stock data. Please try again shortly.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStock();
    const interval = setInterval(loadStock, 30000);
    return () => clearInterval(interval);
  }, [loadStock]);

  function filterItems(items: StockItem[]): StockItem[] {
    return items.filter((item) => {
      if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (categoryFilter !== "All" && item.category !== categoryFilter) return false;
      if (showWatchedOnly && !watchlist.has(item.name)) return false;
      return true;
    });
  }

  const allItems = stock
    ? [
      ...stock.seed.items,
      ...stock.egg.items,
      ...stock.gear.items,
      ...stock.honey.items,
      ...stock.cosmetics.items,
      ...stock.travelingMerchant.items,
    ]
    : [];

  const watchedInStock = allItems.filter((i) => watchlist.has(i.name));

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#080d08] text-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-green-500 text-xs font-semibold tracking-widest uppercase mb-4
            px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
            🌱 Live Stock Tracker
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">
            <span className="text-green-400">Grow a Garden</span>{" "}
            <span className="text-gray-100">Stock Notifier</span>
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
            Real-time inventory tracker for Grow a Garden on Roblox. Live updates every 30 seconds —
            seeds, gear, eggs, honey, and the traveling merchant.
          </p>
          <div className="flex justify-center gap-6 mt-5 text-xs text-gray-600">
            <span className="flex items-center gap-1.5"><span className="text-green-500">✓</span> Live updates</span>
            <span className="flex items-center gap-1.5"><span className="text-green-500">✓</span> 100% free</span>
            <span className="flex items-center gap-1.5"><span className="text-green-500">✓</span> Watchlist alerts</span>
          </div>
          {lastUpdated && (
            <p className="text-xs text-gray-700 mt-3">
              Last updated: {lastUpdated.toLocaleTimeString("en-US")}
            </p>
          )}
        </header>

        {/* ── Watchlist Alert ───────────────────────────────────────────────── */}
        {watchedInStock.length > 0 && (
          <div className="mb-8 p-4 rounded-2xl border border-yellow-600/40 bg-yellow-950/25 backdrop-blur-sm">
            <p className="text-yellow-400 font-bold text-sm mb-2.5 flex items-center gap-2">
              ⭐ Watched items are in stock now!
            </p>
            <div className="flex flex-wrap gap-2">
              {watchedInStock.map((item) => (
                <span
                  key={item.name}
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full
                    bg-yellow-900/30 border border-yellow-700/40 text-yellow-300"
                >
                  {item.emoji} {item.name}
                  <span className="text-yellow-600 font-mono">×{item.quantity}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Filters ───────────────────────────────────────────────────────── */}
        <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl p-4 border border-white/8 mb-10 space-y-3">
          <input
            id="stock-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search items…"
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm
              text-gray-200 focus:outline-none focus:border-green-500/60 placeholder:text-gray-700 transition"
          />
          <div className="flex flex-wrap gap-2 items-center">
            <select
              id="category-filter"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as ItemCategory | "All")}
              className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-sm text-gray-300
                focus:outline-none focus:border-green-500/60 transition"
            >
              <option value="All">All Categories</option>
              <option value="Seeds">🌱 Seeds</option>
              <option value="Eggs">🥚 Eggs</option>
              <option value="Gear">⚙️ Gear</option>
              <option value="Honey">🍯 Honey Shop</option>
              <option value="Cosmetics">✨ Cosmetics</option>
              <option value="Traveling Merchant">🚶 Traveling Merchant</option>
            </select>

            <button
              id="watchlist-filter"
              onClick={() => setShowWatchedOnly(!showWatchedOnly)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition border ${showWatchedOnly
                ? "bg-yellow-900/30 text-yellow-400 border-yellow-700/50"
                : "bg-white/[0.04] text-gray-500 border-white/10 hover:border-white/20"
                }`}
            >
              {showWatchedOnly ? "⭐ Watchlist Only" : "☆ Watchlist Only"}
            </button>

            <button
              id="refresh-button"
              onClick={loadStock}
              className="ml-auto px-3 py-2 rounded-xl text-sm font-medium bg-green-900/25 text-green-400
                border border-green-800/40 hover:bg-green-900/40 transition"
            >
              ↻ Refresh
            </button>
          </div>
        </div>

        {/* ── States ───────────────────────────────────────────────────────── */}
        {loading && (
          <div className="text-center py-24 text-gray-600">
            <div className="text-5xl mb-4 animate-pulse">🌱</div>
            <p className="text-sm">Loading live stock data…</p>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-20 rounded-2xl border border-red-900/40 bg-red-950/15">
            <p className="text-3xl mb-3">⚠️</p>
            <p className="text-red-400 text-sm">{error}</p>
            <button
              onClick={loadStock}
              className="mt-4 px-4 py-2 rounded-xl text-sm bg-red-900/30 text-red-300 border border-red-800/40 hover:bg-red-900/50 transition"
            >
              Try again
            </button>
          </div>
        )}

        {/* ── Stock Grid ────────────────────────────────────────────────────── */}
        {stock && !loading && (
          <>
            <CategorySection
              title="Seed Shop"
              category="Seeds"
              items={filterItems(stock.seed.items)}
              countdown={stock.seed.countdown}
              watchlist={watchlist}
              onToggleWatch={toggleWatch}
            />
            <CategorySection
              title="Egg Shop"
              category="Eggs"
              items={filterItems(stock.egg.items)}
              countdown={stock.egg.countdown}
              watchlist={watchlist}
              onToggleWatch={toggleWatch}
            />
            <CategorySection
              title="Gear Shop"
              category="Gear"
              items={filterItems(stock.gear.items)}
              countdown={stock.gear.countdown}
              watchlist={watchlist}
              onToggleWatch={toggleWatch}
            />
            <CategorySection
              title="Honey Shop"
              category="Honey"
              items={filterItems(stock.honey.items)}
              countdown={stock.honey.countdown}
              watchlist={watchlist}
              onToggleWatch={toggleWatch}
            />
            <CategorySection
              title="Cosmetics Shop"
              category="Cosmetics"
              items={filterItems(stock.cosmetics.items)}
              countdown={stock.cosmetics.countdown}
              watchlist={watchlist}
              onToggleWatch={toggleWatch}
            />

            {/* Traveling Merchant — special status display */}
            <section className="mb-10" aria-label="Traveling Merchant">
              <SectionHeader
                emoji="🚶"
                title="Traveling Merchant"
                colorClass="text-pink-400"
                badge={
                  stock.travelingMerchant.status === "leaved" ? (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-pink-950/30 border border-pink-800/40 text-pink-400">
                      Away · Returns in {stock.travelingMerchant.appearIn}
                    </span>
                  ) : (
                    <CountdownBadge countdown={stock.travelingMerchant.countdown} label="Leaves in:" />
                  )
                }
              />
              {filterItems(stock.travelingMerchant.items).length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {filterItems(stock.travelingMerchant.items).map((item) => (
                    <StockCard
                      key={item.name}
                      item={item}
                      watched={watchlist.has(item.name)}
                      onToggleWatch={toggleWatch}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-700 italic">
                  {stock.travelingMerchant.status === "leaved"
                    ? "The merchant has left. Check back when they return!"
                    : "No merchant items match your filters."}
                </p>
              )}
            </section>

            {/* Data credit */}
            <div className="text-center text-xs text-gray-700 mt-4 pb-2">
              Data powered by{" "}
              <a
                href="https://gagstock.gleeze.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-800 hover:text-green-600 transition underline underline-offset-2"
              >
                GAG Stock API
              </a>{" "}
              · Auto-refreshes every 30 seconds
            </div>
          </>
        )}

        {/* ── SEO Content ──────────────────────────────────────────────────── */}
        <div className="mt-20 border-t border-white/5 pt-14 space-y-8">

          {/* What is it */}
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8">
            <h2 className="text-xl font-bold text-green-400 mb-4">What is Garden Horizons Stock Notifier?</h2>
            <p className="text-gray-400 text-sm leading-7">
              Garden Horizons Stock Notifier is a free real-time stock tracking tool for the popular Roblox game
              Garden Horizons. Our tracker monitors the in-game shop inventory and shows you exactly which items,
              seeds, tools, and special items are currently available for purchase &mdash; updated every 5 minutes to
              match the game&apos;s stock rotation cycle.
            </p>
            <p className="text-gray-400 text-sm leading-7 mt-3">
              Garden Horizons is one of the most popular farming and gardening games on Roblox, where players grow
              crops, decorate their gardens, and collect rare items. The in-game shop rotates its stock every 5
              minutes, making it difficult for players to catch rare items like the Golden Sunflower Seeds, Lucky
              Clover, or Weather Machine without a tracking tool.
            </p>
          </div>

          {/* How to use + Rarities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8">
              <h2 className="text-xl font-bold text-green-400 mb-5">How to Use the Stock Notifier</h2>
              <ol className="space-y-3 text-sm text-gray-400">
                {([
                  ["Check Current Stock", "See all items currently in the shop, updated in real-time."],
                  ["Use Filters", "Filter by category (Seeds, Gear, Eggs, Honey, Cosmetics) or search by name."],
                  ["Watch the Countdown", "Each shop section shows when the next stock rotation happens."],
                  ["Star Items", "Click \u2606 on any card to watch it — get an alert at the top when it\'s in stock."],
                  ["Share with Friends", "Share current stock alerts with friends on Discord or social media."],
                ] as [string, string][]).map(([title, desc], i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    <span><span className="text-gray-200 font-medium">{title}</span> &mdash; {desc}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8">
              <h2 className="text-xl font-bold text-green-400 mb-5">Garden Horizons Item Rarities</h2>
              <ul className="space-y-3 text-sm">
                {([
                  ["text-gray-300", "⬜", "Common (Gray)", "Basic items always available. Low cost, great for getting started."],
                  ["text-green-400", "🟢", "Uncommon (Green)", "Slightly better items that appear frequently. Good value."],
                  ["text-blue-400", "🔵", "Rare (Blue)", "Desirable items that don\'t appear every rotation. Worth grabbing!"],
                  ["text-purple-400", "🟣", "Epic (Purple)", "Powerful items that appear infrequently. Usually cost Gems."],
                  ["text-yellow-400", "🟡", "Legendary (Gold)", "The rarest and most valuable items. They sell out in seconds!"],
                ] as [string, string, string, string][]).map(([color, dot, label, desc]) => (
                  <li key={label} className="flex gap-3 text-gray-400">
                    <span className="text-lg leading-5 mt-0.5">{dot}</span>
                    <span><span className={`font-semibold ${color}`}>{label}</span> &mdash; {desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tips */}
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8">
            <h2 className="text-xl font-bold text-green-400 mb-5">Tips for Getting Rare Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {([
                ["\uD83D\uDD04", "Check Every Rotation", "Stock changes every few minutes. Check often for the best chances."],
                ["\u2B50", "Star Your Targets", "Watch items you want — instantly alerted when they appear in stock."],
                ["\uD83D\uDEB6", "Watch the Merchant", "The traveling merchant carries exclusive limited-time items. Don\'t miss them!"],
                ["\u26A1", "Act Fast", "Rare items have very limited quantity. Buy immediately when you see them."],
                ["\uD83D\uDCAC", "Join the Community", "Follow Garden Horizons Discord for additional stock alerts and tips."],
              ] as [string, string, string][]).map(([icon, title, desc]) => (
                <div key={title} className="rounded-xl border border-white/5 bg-white/[0.015] p-4">
                  <div className="text-2xl mb-2">{icon}</div>
                  <div className="font-semibold text-gray-200 text-sm mb-1">{title}</div>
                  <div className="text-gray-500 text-xs leading-5">{desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8">
            <h2 className="text-xl font-bold text-green-400 mb-6">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {([
                ["Is Garden Horizons Stock Notifier free?", "Yes! Completely free to use. No registration, no downloads, no hidden fees."],
                ["How often does the stock update?", "Our tracker refreshes automatically every 30 seconds to show you the latest stock."],
                ["Can I get push notifications?", "We\'re working on push notifications. For now, bookmark this page or join our Discord for alerts."],
                ["Is this affiliated with Garden Horizons?", "No. This is a fan-made tool. Not affiliated with Roblox Corporation or the game developers."],
                ["How accurate is the stock data?", "We use real-time data from the GAG Stock API, updated every 30 seconds."],
                ["Does this work on mobile?", "Yes! Fully responsive and works perfectly on phones, tablets, and desktop computers."],
                ["What is the rarest item in Garden Horizons?", "Legendary items like the Lucky Clover, Weather Machine, and Golden Watering Can. They have very limited stock."],
              ] as [string, string][]).map(([q, a]) => (
                <div key={q} className="border-l-2 border-green-500/30 pl-4">
                  <div className="font-semibold text-gray-200 text-sm mb-1">{q}</div>
                  <div className="text-gray-500 text-xs leading-5">{a}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

