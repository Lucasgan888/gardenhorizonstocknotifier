"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
    fetchGardenStock,
    CATEGORY_CONFIG,
    type GardenStock,
    type StockItem,
    type ItemCategory,
} from "@/lib/stock";

type Rarity = "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";

// ─── Pseudo Rarity Logic ──────────────────────────────────────────────────────
const LEGENDARIES = new Set(["Lucky Clover", "Weather Machine", "Golden Watering Can", "Golden Sunflower Seeds"]);

function getItemRarity(name: string, category: string): Rarity {
    if (LEGENDARIES.has(name) || name.includes("Golden") || name.includes("Diamond")) return "Legendary";
    if (name.includes("Ruby") || name.includes("Emerald") || name.includes("Magic")) return "Epic";
    if (category === "Traveling Merchant") return "Rare";
    const hash = (name.length * 7 + category.length * 3) % 100;
    if (hash > 85) return "Epic";
    if (hash > 60) return "Rare";
    if (hash > 30) return "Uncommon";
    return "Common";
}

const RARITY_COLORS: Record<Rarity, string> = {
    Common: "text-rarity-common bg-rarity-common/15",
    Uncommon: "text-rarity-uncommon bg-rarity-uncommon/15",
    Rare: "text-rarity-rare bg-rarity-rare/15",
    Epic: "text-rarity-epic bg-rarity-epic/15",
    Legendary: "text-rarity-legendary bg-rarity-legendary/15",
};

const RARITY_DOTS: Record<Rarity, string> = {
    Common: "bg-rarity-common",
    Uncommon: "bg-rarity-uncommon",
    Rare: "bg-rarity-rare",
    Epic: "bg-rarity-epic",
    Legendary: "bg-rarity-legendary",
};

const RARITY_ORDER: Record<Rarity, number> = {
    Legendary: 5, Epic: 4, Rare: 3, Uncommon: 2, Common: 1
};

// ─── UI Components ────────────────────────────────────────────────────────────

function CountdownBadge({ countdown, label }: { countdown: string | null; label: string }) {
    if (!countdown) return null;
    return (
        <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-surface border border-border-strong text-text-muted">
            <span>{label}</span>
            <span className="font-mono text-accent font-semibold tabular-nums">{countdown}</span>
        </span>
    );
}

function StockCard({
    item,
    watched,
    onToggleWatch,
}: {
    item: StockItem;
    watched: boolean;
    onToggleWatch: (name: string) => void;
}) {
    const rarity = getItemRarity(item.name, item.category);
    const isWatchedInStock = watched && item.quantity > 0;

    const rarityBg =
        rarity === "Legendary" ? "bg-amber-500/10 border-amber-500/30 text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" :
            rarity === "Epic" ? "bg-purple-500/10 border-purple-500/30 text-purple-300 drop-shadow-[0_0_6px_rgba(168,85,247,0.4)]" :
                rarity === "Rare" ? "bg-blue-500/10 border-blue-500/30 text-blue-300 drop-shadow-[0_0_6px_rgba(59,130,246,0.4)]" :
                    rarity === "Uncommon" ? "bg-green-500/10 border-green-500/30 text-green-300" :
                        "bg-input-bg border-border-subtle";

    return (
        <div
            className={`relative flex items-center gap-3 p-3 rounded-xl border bg-surface shadow-xs transition-all duration-300 group 
      ${isWatchedInStock ? 'border-accent shadow-focus bg-accent-soft/20 scale-[1.02]' : 'border-border-subtle hover:bg-surface-alt hover:border-border-strong hover:shadow-sm hover:scale-[1.01]'}`}
        >
            <div className={`relative flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl text-3xl border shadow-inner transition-transform group-hover:scale-110 overflow-hidden ${rarityBg}`}>
                <img
                    src={`/items/${item.name.toLowerCase().replace(/ /g, '-')}.webp`}
                    alt={item.name}
                    className="w-10 h-10 object-contain absolute z-10 transition-opacity duration-300"
                    onError={(e) => { e.currentTarget.style.opacity = '0'; }}
                />
                <span className="transform transition-transform z-0">{item.emoji}</span>
            </div>

            <div className="flex-1 min-w-0 pr-2">
                <h3 className="font-semibold text-sm text-text-primary truncate leading-tight mb-1" title={item.name}>
                    {item.name}
                </h3>
                <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${RARITY_COLORS[rarity]}`}>
                        {rarity}
                    </span>
                </div>
            </div>

            <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <button
                    onClick={() => onToggleWatch(item.name)}
                    className={`px-1.5 py-1 rounded-md transition hover:scale-110 ${watched ? "text-accent" : "text-text-muted hover:text-text-primary"}`}
                    title={watched ? "Remove from watchlist" : "Add to watchlist"}
                    aria-label={watched ? "Remove from watchlist" : "Add to watchlist"}
                >
                    {watched ? "★" : "☆"}
                </button>
                <div className="text-xs font-mono font-medium text-text-secondary">
                    ×{item.quantity}
                </div>
            </div>
        </div>
    );
}

function RarityLegend() {
    return (
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
            {(Object.entries(RARITY_DOTS) as [Rarity, string][]).map(([label, colorBg]) => (
                <div key={label} className="flex items-center gap-1.5 text-text-secondary">
                    <span className={`w-2.5 h-2.5 rounded-full ${colorBg} shadow-xs`}></span>
                    {label}
                </div>
            ))}
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function GardenHorizonsStockNotifier() {
    const [stock, setStock] = useState<GardenStock | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    // Filters
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<ItemCategory | "All">("All");
    const [rarityFilter, setRarityFilter] = useState<Rarity | "All">("All");
    const [sortOrder, setSortOrder] = useState<"Default" | "Rarity">("Default");
    const [showWatchedOnly, setShowWatchedOnly] = useState(false);

    const [watchlist, setWatchlist] = useState<Set<string>>(new Set());

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
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadStock();
        const interval = setInterval(loadStock, 30000);
        return () => clearInterval(interval);
    }, [loadStock]);

    // Derived State
    const allItems = useMemo(() => {
        if (!stock) return [];
        return [
            ...stock.seed.items,
            ...stock.egg.items,
            ...stock.gear.items,
            ...stock.honey.items,
            ...stock.cosmetics.items,
            ...stock.travelingMerchant.items,
        ];
    }, [stock]);

    const watchedInStock = useMemo(() => {
        return allItems.filter(i => watchlist.has(i.name) && i.quantity > 0);
    }, [allItems, watchlist]);

    // Filter & Sort Logic
    const getFilteredItems = (items: StockItem[]) => {
        let filtered = items.filter((item) => {
            if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
            if (showWatchedOnly && !watchlist.has(item.name)) return false;
            if (rarityFilter !== "All" && getItemRarity(item.name, item.category) !== rarityFilter) return false;
            return true;
        });

        if (sortOrder === "Rarity") {
            filtered.sort((a, b) => {
                return RARITY_ORDER[getItemRarity(b.name, b.category)] - RARITY_ORDER[getItemRarity(a.name, a.category)];
            });
        }

        return filtered;
    };

    const TABS: (ItemCategory | "All")[] = ["All", "Seeds", "Eggs", "Gear", "Honey", "Cosmetics", "Traveling Merchant"];

    const getCategoryData = (cat: ItemCategory) => {
        if (!stock) return null;
        switch (cat) {
            case "Seeds": return stock.seed;
            case "Eggs": return stock.egg;
            case "Gear": return stock.gear;
            case "Honey": return stock.honey;
            case "Cosmetics": return stock.cosmetics;
            case "Traveling Merchant": return stock.travelingMerchant;
        }
    };

    const activeCategories: ItemCategory[] = categoryFilter === "All"
        ? ["Seeds", "Eggs", "Gear", "Honey", "Cosmetics", "Traveling Merchant"]
        : [categoryFilter];

    return (
        <div className="min-h-screen bg-background text-text-primary font-sans">
            <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

                {/* ── Hero Dashboard Header ────────────────────────────────────────── */}
                <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-6 border-b border-border-subtle pb-8">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 mb-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-focus"></span>
                            <span className="text-xs font-bold text-accent uppercase tracking-widest leading-none">Live Data Tracker</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 tracking-tight">
                            Garden Horizons <span className="text-text-muted font-light">Stock Notifier</span>
                        </h1>
                        <p className="text-text-muted text-sm max-w-2xl leading-relaxed">
                            Real-time shop inventory dashboard. Compare prices, hunt legendary items, and never miss the traveling merchant stock rotation.
                        </p>
                    </div>

                    <div className="hidden lg:flex items-center gap-8 bg-surface border border-border-subtle rounded-2xl p-5 shadow-sm">
                        <div className="text-left">
                            <div className="text-text-secondary text-[10px] uppercase tracking-wider mb-1 font-semibold">API Status</div>
                            <div className="font-semibold text-accent flex items-center gap-1.5"><span className="text-lg leading-none">✓</span> Operational</div>
                        </div>
                        <div className="w-px h-10 bg-border-subtle"></div>
                        <div className="text-left">
                            <div className="text-text-secondary text-[10px] uppercase tracking-wider mb-1 font-semibold">Last Sync</div>
                            <div className="font-medium font-mono text-text-primary">
                                {lastUpdated ? lastUpdated.toLocaleTimeString('en-US') : '--:--:--'}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex flex-col xl:flex-row gap-8 items-start">

                    {/* ── Left/Main Column: Stock Grid ───────────────────────────────── */}
                    <div className="flex-1 w-full space-y-6 min-w-0">

                        {/* Filter Bar */}
                        <div className="flex flex-col md:flex-row gap-3 bg-surface border border-border-strong rounded-2xl p-4 shadow-md items-center">
                            <div className="relative flex-1 w-full">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50 grayscale">🔍</span>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search gear, seeds, eggs..."
                                    className="w-full bg-input-bg border border-input-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-primary focus:border-input-focus outline-none transition-shadow"
                                />
                            </div>

                            <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide shrink-0 items-center">
                                <select
                                    value={rarityFilter}
                                    onChange={(e) => setRarityFilter(e.target.value as Rarity | "All")}
                                    className="bg-surface-alt border border-border-strong rounded-xl px-4 py-2.5 text-sm font-medium text-text-primary focus:border-accent outline-none appearance-none pr-9 relative cursor-pointer flex-shrink-0"
                                    style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23A3B1C2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.8rem top 50%', backgroundSize: '0.65rem auto' }}
                                >
                                    <option value="All">All Rarities</option>
                                    <option value="Common">Common</option>
                                    <option value="Uncommon">Uncommon</option>
                                    <option value="Rare">Rare</option>
                                    <option value="Epic">Epic</option>
                                    <option value="Legendary">Legendary</option>
                                </select>

                                <select
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value as "Default" | "Rarity")}
                                    className="bg-surface-alt border border-border-strong rounded-xl px-4 py-2.5 text-sm font-medium text-text-primary focus:border-accent outline-none appearance-none pr-9 relative cursor-pointer flex-shrink-0"
                                    style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23A3B1C2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.8rem top 50%', backgroundSize: '0.65rem auto' }}
                                >
                                    <option value="Default">Sort: Default</option>
                                    <option value="Rarity">Sort: Rarity</option>
                                </select>

                                <button
                                    onClick={() => setShowWatchedOnly(!showWatchedOnly)}
                                    className={`px-4 py-2.5 rounded-xl flex-shrink-0 text-sm font-bold transition border ${showWatchedOnly
                                        ? "bg-accent-soft text-accent border-accent/50"
                                        : "bg-surface-alt text-text-muted border-border-strong hover:text-text-primary hover:border-text-muted"
                                        }`}
                                >
                                    {showWatchedOnly ? "★ Watchlist" : "☆ Watchlist"}
                                </button>

                                <button
                                    onClick={loadStock}
                                    title="Manual Refresh"
                                    className="p-2.5 rounded-xl text-lg bg-surface-alt border border-border-strong hover:bg-surface hover:text-accent transition shrink-0 ml-1"
                                >
                                    <span className="block hover:rotate-180 transition-transform duration-500">↻</span>
                                </button>
                            </div>
                        </div>

                        {/* Shop Tabs */}
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-border-subtle mt-2 pt-2">
                            {TABS.map(tab => {
                                const isActive = categoryFilter === tab;
                                return (
                                    <button
                                        key={tab}
                                        onClick={() => setCategoryFilter(tab)}
                                        className={`whitespace-nowrap flex items-center gap-2 px-5 py-3 rounded-t-xl text-sm font-bold transition-all ${isActive
                                            ? 'bg-surface-alt shadow-[inset_0_-2px_0_0_#4ADE80] text-text-primary'
                                            : 'text-text-secondary hover:bg-surface-alt hover:text-text-primary'}`}
                                    >
                                        <span className="text-lg opacity-80">{tab === "All" ? "🌍" : CATEGORY_CONFIG[tab].emoji}</span> {tab}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Rarity Legend */}
                        <div className="px-2 pb-2">
                            <RarityLegend />
                        </div>

                        {/* States */}
                        {loading && (
                            <div className="text-center py-24 text-text-muted bg-surface rounded-2xl border border-border-subtle shadow-xs">
                                <div className="text-5xl mb-6 animate-bounce">🌱</div>
                                <p className="text-sm font-medium tracking-wide">Syncing live server data…</p>
                            </div>
                        )}

                        {error && !loading && (
                            <div className="text-center py-20 rounded-2xl border border-danger/40 bg-danger/10 shadow-xs">
                                <p className="text-5xl mb-4">⚠️</p>
                                <p className="text-danger text-sm font-medium mb-6">{error}</p>
                                <button
                                    onClick={loadStock}
                                    className="px-5 py-2.5 rounded-xl text-sm font-bold bg-danger/20 text-danger border border-danger/40 hover:bg-danger/30 transition auto shadow-xs"
                                >
                                    Retry Connection
                                </button>
                            </div>
                        )}

                        {/* Render Category Grids */}
                        {stock && !loading && (
                            <div className="space-y-12 mb-8">
                                {activeCategories.map(cat => {
                                    const cData = getCategoryData(cat);
                                    if (!cData) return null;
                                    const items = getFilteredItems(cData.items);
                                    if (items.length === 0 && activeCategories.length > 1) return null; // hide empty categories in 'All' view

                                    return (
                                        <section key={cat} className="space-y-4 min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
                                                <div className="flex items-center gap-3">
                                                    <span className="bg-surface border border-border-strong w-10 h-10 flex items-center justify-center rounded-xl text-xl shadow-xs">{CATEGORY_CONFIG[cat].emoji}</span>
                                                    <h2 className="text-xl font-extrabold text-text-primary tracking-wide">{cat}</h2>
                                                </div>
                                                {cat === "Traveling Merchant" && stock.travelingMerchant.status === "leaved" ? (
                                                    <span className="text-xs px-3 py-1.5 rounded-full bg-danger/10 border border-danger/30 text-danger font-bold tracking-wide">
                                                        Away · Returns in {stock.travelingMerchant.appearIn}
                                                    </span>
                                                ) : (
                                                    <CountdownBadge countdown={cData.countdown} label="Refresh in:" />
                                                )}
                                            </div>

                                            {items.length > 0 ? (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
                                                    {items.map((item) => (
                                                        <StockCard
                                                            key={item.name}
                                                            item={item}
                                                            watched={watchlist.has(item.name)}
                                                            onToggleWatch={toggleWatch}
                                                        />
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="py-12 text-center border-2 border-dashed border-border-subtle rounded-2xl bg-surface/30 text-text-muted text-sm font-medium">
                                                    {cat === "Traveling Merchant" && stock.travelingMerchant.status === "leaved"
                                                        ? "The merchant has left. Check back when they return!"
                                                        : `No ${cat.toLowerCase()} match your filters.`}
                                                </div>
                                            )}
                                        </section>
                                    );
                                })}
                            </div>
                        )}

                        {/* Small subtle data source credit below grid */}
                        <div className="pt-8 mb-4 text-center text-xs text-text-muted border-t border-border-subtle">
                            <span className="opacity-60">Auto-refreshes every 30s · Powered by </span>
                            <a href="https://gagstock.gleeze.com" target="_blank" rel="noopener noreferrer" className="opacity-100 text-accent font-medium hover:underline underline-offset-2">GAG Stock API</a>
                        </div>

                    </div>

                    {/* ── Right Column: Watchlist Drawer ─────────────────────────────── */}
                    <aside className="w-full xl:w-80 shrink-0">
                        <div className="sticky top-6">

                            <div className="rounded-2xl border border-border-strong bg-surface shadow-md overflow-hidden flex flex-col max-h-[calc(100vh-3rem)]">
                                {/* Header */}
                                <div className="p-5 border-b border-border-subtle flex items-center justify-between bg-surface-alt">
                                    <h2 className="text-base font-extrabold text-text-primary flex items-center gap-2.5">
                                        <span className="text-accent text-lg filter drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]">⭐</span> My Watchlist
                                    </h2>
                                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-background border border-border-subtle text-text-muted">
                                        {watchlist.size}
                                    </span>
                                </div>

                                {/* Body */}
                                <div className="p-4 overflow-y-auto flex-1 custom-scrollbar">
                                    {watchlist.size === 0 ? (
                                        <div className="text-center py-10 px-4 bg-background rounded-xl border border-border-subtle">
                                            <p className="text-3xl mb-3 opacity-40">👀</p>
                                            <p className="text-xs text-text-muted leading-relaxed font-medium">
                                                Your watchlist is empty. Click the star icon on any card to get alerted here when it arrives.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-2.5 pr-1">
                                            {[...watchlist].map(name => {
                                                const inStockItem = watchedInStock.find(i => i.name === name);
                                                const isAvail = !!inStockItem;
                                                const rarity = inStockItem ? getItemRarity(inStockItem.name, inStockItem.category) : "Common";

                                                return (
                                                    <div key={name} className={`flex items-center justify-between p-3 rounded-xl border text-sm transition-all
                            ${isAvail ? 'bg-accent-soft/30 border-accent/40 shadow-[0_0_15px_rgba(74,222,128,0.1)]' : 'bg-background border-border-subtle opacity-60'}`}>

                                                        <div className="flex flex-col min-w-0 pr-2">
                                                            <span className={`font-semibold truncate ${isAvail ? 'text-text-primary' : 'text-text-muted'}`} title={name}>{name}</span>
                                                            <span className="text-[10px] text-text-muted uppercase tracking-wider font-bold mt-0.5">
                                                                {isAvail ? (
                                                                    <span className="text-accent flex items-center gap-1">
                                                                        <span className={`w-1.5 h-1.5 rounded-full ${RARITY_DOTS[rarity]}`}></span>
                                                                        In Stock
                                                                    </span>
                                                                ) : (
                                                                    "Waiting..."
                                                                )}
                                                            </span>
                                                        </div>

                                                        {isAvail ? (
                                                            <div className="shrink-0 flex flex-col items-end">
                                                                <span className="text-lg leading-none mb-1 opacity-80">{inStockItem.emoji}</span>
                                                                <span className="text-[10px] font-mono font-bold text-accent bg-accent/10 px-1.5 py-0.5 rounded border border-accent/20">
                                                                    ×{inStockItem.quantity}
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <span className="shrink-0 w-2 h-2 rounded-full bg-border-strong animate-pulse"></span>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </aside>
                </div>
                <div className="mt-20 border-t border-white/5 pt-14 space-y-8">

                    {/* What is it */}
                    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8 flex flex-col items-start gap-4">
                        <div>
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
                        <a href="/grow-a-garden-stock-tracker" className="text-green-400 hover:text-green-300 transition-colors text-sm font-semibold underline underline-offset-4">Learn more about the Grow a Garden stock tracker</a>
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
                        <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8 flex flex-col">
                            <h2 className="text-xl font-bold text-green-400 mb-5">Garden Horizons Item Rarities</h2>
                            <ul className="space-y-3 text-sm flex-1">
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
                            <div className="mt-6 flex flex-col xl:flex-row gap-4">
                                <a href="/garden-horizons-item-rarities" className="text-green-400 hover:text-green-300 transition-colors text-sm font-semibold underline underline-offset-4">Learn more about Garden Horizons item rarities</a>
                                <a href="/legendary-items" className="text-yellow-400 hover:text-yellow-300 transition-colors text-sm font-semibold underline underline-offset-4">See more about legendary items</a>
                            </div>
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
                                <div key={title} className="rounded-xl border border-white/5 bg-white/[0.015] p-4 flex flex-col justify-between">
                                    <div>
                                        <div className="text-2xl mb-2">{icon}</div>
                                        <div className="font-semibold text-gray-200 text-sm mb-1">{title}</div>
                                        <div className="text-gray-500 text-xs leading-5">{desc}</div>
                                    </div>
                                    {title === "Watch the Merchant" && (
                                        <a href="/traveling-merchant" className="mt-3 text-green-400 hover:text-green-300 transition-colors text-xs font-semibold underline underline-offset-2 block w-max">Learn more about the Traveling Merchant</a>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="mt-6">
                            <a href="/how-to-get-rare-items" className="text-green-400 hover:text-green-300 transition-colors text-sm font-semibold underline underline-offset-4">See the full guide on getting rare items</a>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8 flex flex-col items-start gap-4">
                        <h2 className="text-xl font-bold text-green-400 mb-2">Frequently Asked Questions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
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
                        <a href="/faq" className="mt-4 text-green-400 hover:text-green-300 transition-colors text-sm font-semibold underline underline-offset-4">View the full FAQ</a>
                    </div>

                </div>

            </div>
        </div>
    );
}

