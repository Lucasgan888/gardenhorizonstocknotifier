"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import useSWR from 'swr';
import { motion, AnimatePresence } from 'framer-motion';
import { BellRing } from 'lucide-react';
import {
    fetchGardenStock,
    EMPTY_GARDEN_STOCK,
    CATEGORY_CONFIG,
    type StockItem,
    type ItemCategory,
} from "@/lib/stock";

type Rarity = "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";

// ─── Pseudo Rarity Logic ──────────────────────────────────────────────────────
const LEGENDARIES = new Set(["Lucky Clover", "Weather Machine", "Golden Watering Can", "Golden Sunflower Seeds"]);

function getItemRarity(name: string, category?: string): Rarity {
    if (LEGENDARIES.has(name) || name.includes("Golden") || name.includes("Diamond")) return "Legendary";
    if (name.includes("Ruby") || name.includes("Emerald") || name.includes("Magic")) return "Epic";
    if (category === "Traveling Merchant") return "Rare";
    const hash = (name.length * 7 + (category?.length || 0) * 3) % 100;
    if (hash > 85) return "Epic";
    if (hash > 60) return "Rare";
    if (hash > 30) return "Uncommon";
    return "Common";
}

const RARITY_COLORS: Record<Rarity, string> = {
    Common: "text-rarity-common bg-rarity-common/10 border-rarity-common/20",
    Uncommon: "text-rarity-uncommon bg-rarity-uncommon/10 border-rarity-uncommon/20",
    Rare: "text-rarity-rare bg-rarity-rare/10 border-rarity-rare/20",
    Epic: "text-rarity-epic bg-rarity-epic/10 border-rarity-epic/20",
    Legendary: "text-rarity-legendary bg-rarity-legendary/10 border-rarity-legendary/20",
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

function formatLiveCountdown(nextUpdateAt: string | null, nowMs: number): string | null {
    if (!nextUpdateAt) return null;

    const targetMs = new Date(nextUpdateAt).getTime();
    if (!Number.isFinite(targetMs)) return null;

    const diffSeconds = Math.max(0, Math.floor((targetMs - nowMs) / 1000));
    const minutes = Math.floor(diffSeconds / 60);
    const seconds = diffSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function CountdownBadge({ countdown, label }: { countdown: string | null; label: string }) {
    if (!countdown) return null;
    return (
        <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-surface border border-border-strong text-text-muted">
            <span>{label}</span>
            <span className="font-mono text-accent font-semibold tabular-nums">{countdown}</span>
        </span>
    );
}

function formatSyncAge(lastSync: Date | null, nowMs: number): string | null {
    if (!lastSync) return null;

    const diffSeconds = Math.max(0, Math.floor((nowMs - lastSync.getTime()) / 1000));
    if (diffSeconds < 5) return "Just now";
    if (diffSeconds < 60) return `${diffSeconds}s ago`;

    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes}m ago`;

    const diffHours = Math.floor(diffMinutes / 60);
    return `${diffHours}h ago`;
}

function getTotalQuantity(items: StockItem[]): number {
    return items.reduce((sum, item) => sum + Math.max(0, item.quantity), 0);
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
    const hasStock = item.quantity > 0;
    const isWatchedInStock = watched && item.quantity > 0;

    const rarityStyle =
        rarity === "Legendary" ? "border-rarity-legendary/40 bg-rarity-legendary/5 text-rarity-legendary" :
            rarity === "Epic" ? "border-rarity-epic/40 bg-rarity-epic/5 text-rarity-epic" :
                rarity === "Rare" ? "border-rarity-rare/40 bg-rarity-rare/5 text-rarity-rare" :
                    rarity === "Uncommon" ? "border-rarity-uncommon/40 bg-rarity-uncommon/5 text-rarity-uncommon" :
                        "border-border-subtle bg-surface-alt/50 text-text-muted";

    const cardStateStyle = isWatchedInStock
        ? "border-accent shadow-[0_0_0_1px_rgba(74,222,128,0.28),0_18px_40px_rgba(22,101,52,0.18)] ring-1 ring-accent/35 bg-[linear-gradient(135deg,rgba(74,222,128,0.14),rgba(20,24,33,0.92))]"
        : hasStock
            ? "border-accent/65 shadow-[0_0_0_1px_rgba(74,222,128,0.16),0_14px_34px_rgba(5,28,18,0.18)] ring-1 ring-accent/20 bg-[linear-gradient(135deg,rgba(74,222,128,0.08),rgba(17,24,39,0.96))] hover:border-accent hover:ring-accent/35 hover:bg-[linear-gradient(135deg,rgba(74,222,128,0.14),rgba(20,24,33,0.98))]"
            : "border-border-strong hover:border-accent/40 hover:bg-surface-alt";

    return (
        <div
            className={`relative flex items-center gap-4 p-4 rounded-2xl border bg-surface transition-all duration-300 group shadow-sm
      ${cardStateStyle}`}
        >
            <div className={`relative flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-xl border shadow-inner transition-transform group-hover:rotate-3 ${rarityStyle}`}>
                <img
                    src={`/items/${item.name.toLowerCase().replace(/ /g, '-')}.webp`}
                    alt={item.name}
                    className="w-10 h-10 object-contain absolute z-10 transition-transform group-hover:scale-110"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <span className="text-3xl z-0 opacity-40 group-hover:opacity-100 transition-opacity">{item.emoji}</span>
            </div>

            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-text-primary truncate mb-1 group-hover:text-accent transition-colors" title={item.name}>
                    {item.name}
                </h3>
                <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border ${RARITY_COLORS[rarity]}`}>
                        {rarity}
                    </span>
                </div>
            </div>

            <div className="flex flex-col items-end gap-2 shrink-0">
                <button
                    onClick={() => onToggleWatch(item.name)}
                    className={`text-xl transition-all hover:scale-125 ${watched ? "text-accent" : "text-text-muted hover:text-text-secondary"}`}
                >
                    {watched ? "★" : "☆"}
                </button>
                <div className="relative min-w-[86px] overflow-hidden rounded-2xl border border-lime-200/80 bg-[linear-gradient(135deg,rgba(217,249,157,0.98),rgba(163,230,53,0.92))] px-3.5 py-2 text-right shadow-[0_0_0_1px_rgba(190,242,100,0.35),0_0_26px_rgba(163,230,53,0.42),0_12px_24px_rgba(9,16,8,0.28)]">
                    <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.36),transparent_56%)]"></span>
                    <span className="relative block text-[9px] font-black uppercase tracking-[0.24em] text-lime-950/75">
                        Stock
                    </span>
                    <span className="relative block text-lg font-mono font-black leading-none text-lime-950 tabular-nums drop-shadow-[0_0_12px_rgba(217,249,157,0.65)]">
                        x{item.quantity}
                    </span>
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

// SWR fetcher
const fetcher = () => fetchGardenStock();

export default function GardenHorizonsStockNotifier() {
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const [toastMessage, setToastMessage] = useState<{ title: string, msg: string, id: number } | null>(null);

    const {
        data: liveStock,
        error: swrError,
        isLoading,
        isValidating,
        mutate,
    } = useSWR("garden-stock", fetcher, {
        refreshInterval: 30_000,
        revalidateOnFocus: true,
        shouldRetryOnError: false,
        onSuccess: () => {
            setLastUpdated(new Date());
        },
    });

    const stock = liveStock ?? EMPTY_GARDEN_STOCK;

    // Filters
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<ItemCategory | "All">("All");
    const [rarityFilter, setRarityFilter] = useState<Rarity | "All">("All");
    const [sortOrder, setSortOrder] = useState<"Default" | "Rarity">("Default");
    const [showWatchedOnly, setShowWatchedOnly] = useState(false);

    const [watchlist, setWatchlist] = useState<Set<string>>(new Set());
    const prevWatchedStockRef = useRef<Record<string, number>>({});
    const [nowMs, setNowMs] = useState(() => Date.now());

    useEffect(() => {
        try {
            const saved = localStorage.getItem("gag-watchlist");
            if (saved) setWatchlist(new Set(JSON.parse(saved)));
        } catch { }
    }, []);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setNowMs(Date.now());
        }, 1000);

        return () => window.clearInterval(timer);
    }, []);

    const toggleWatch = useCallback((name: string) => {
        setWatchlist((prev) => {
            const next = new Set(prev);
            if (next.has(name)) {
                next.delete(name);
            } else {
                next.add(name);
            }
            localStorage.setItem("gag-watchlist", JSON.stringify([...next]));
            return next;
        });
    }, []);

    // Check for new watched restocks after live data changes.
    useEffect(() => {
        if (liveStock) {
            const prevWatchedStock = prevWatchedStockRef.current;
            const currentStockState: Record<string, number> = {};
            const allItemsFlat = [
                ...liveStock.seed.items, ...liveStock.egg.items, ...liveStock.gear.items,
                ...liveStock.honey.items, ...liveStock.cosmetics.items, ...liveStock.travelingMerchant.items
            ];

            let newlyRestocked = 0;
            let sampleItemName = "";

            allItemsFlat.forEach(item => {
                if (watchlist.has(item.name)) {
                    currentStockState[item.name] = item.quantity;
                    // If we previously had 0 or it's a new load, and now we have > 0 context
                    if (item.quantity > 0 && prevWatchedStock[item.name] === 0) {
                        newlyRestocked++;
                        sampleItemName = item.name;
                    }
                }
            });

            if (newlyRestocked > 0 && Object.keys(prevWatchedStock).length > 0) {
                setToastMessage({
                    id: Date.now(),
                    title: 'Restock Alert!',
                    msg: newlyRestocked === 1
                        ? `${sampleItemName} is now in stock!`
                        : `${newlyRestocked} watched items just restocked!`,
                });
                // Auto clear toast
                setTimeout(() => setToastMessage(null), 5000);
            }

            prevWatchedStockRef.current = currentStockState;
        }
    }, [liveStock, watchlist]);

    // Derived State
    const allItems = useMemo(() => {
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
        const filtered = items.filter((item) => {
            if (item.quantity <= 0) return false;
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
    const liveRotationCountdown = useMemo(
        () => formatLiveCountdown(stock.meta.nextUpdateAt, nowMs),
        [stock.meta.nextUpdateAt, nowMs]
    );
    const lastSyncAge = useMemo(
        () => formatSyncAge(lastUpdated, nowMs),
        [lastUpdated, nowMs]
    );

    const statusState = swrError
        ? "error"
        : isLoading && !liveStock
            ? "loading"
            : stock.meta.state === "stale"
                ? "stale"
                : "live";

    const statusCopy = statusState === "error"
        ? {
            label: "Connection Error",
            badge: "text-red-500",
            dot: "bg-red-500",
            value: "Unavailable",
            note: "Live stock data is temporarily unavailable.",
        }
        : statusState === "loading"
            ? {
                label: "Connecting",
                badge: "text-yellow-500",
                dot: "bg-yellow-500 animate-pulse",
                value: "Syncing",
                note: "Connecting to the live stock feed and loading the latest rotation.",
            }
            : statusState === "stale"
                ? {
                    label: "Cached Feed",
                    badge: "text-yellow-500",
                    dot: "bg-yellow-500",
                    value: "Degraded",
                    note: "Showing the latest cached stock while the upstream feed reconnects.",
                }
                : {
                    label: "Live Feed",
                    badge: "text-green-500",
                    dot: "bg-green-500",
                    value: "Live",
                    note: "Tracking public live-stock data through our Cloudflare Worker cache.",
                };

    return (
        <div className="min-h-screen bg-background text-text-primary font-sans">
            <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

                {/* ── Section 1: Hero Dashboard & Live Tracker ────────────────────────── */}
                <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12 gap-8 border-b border-border-strong pb-12">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 mb-3">
                            <span className={`w-2.5 h-2.5 rounded-full shadow-focus ${statusCopy.dot}`}></span>
                            <span className={`text-xs font-bold uppercase tracking-widest leading-none ${statusCopy.badge}`}>{statusCopy.label}</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 tracking-tight">
                            Garden Horizons <span className="text-text-muted font-light">Stock Notifier</span>
                        </h1>
                        <p className="text-text-muted text-sm max-w-2xl leading-relaxed mb-4">
                            Real-time shop inventory dashboard. Compare prices, hunt legendary items, and never miss the traveling merchant stock rotation.
                        </p>
                        <p className="text-xs max-w-2xl leading-relaxed text-text-secondary">
                            {statusCopy.note}
                        </p>
                        <div className="flex flex-wrap gap-3 mt-6">
                            <a href="https://www.roblox.com/games/130594398886540/Garden-Horizons" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-background font-bold rounded-xl hover:bg-accent/90 transition shadow-lg">
                                <span>🎮</span> Play Game
                            </a>
                            <a href="https://discord.com/invite/gardenhorizons" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#5865F2] text-white font-bold rounded-xl hover:bg-[#4752C4] transition shadow-lg">
                                <span>💬</span> Join Discord
                            </a>
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center gap-8 bg-surface border border-border-subtle rounded-2xl p-5 shadow-sm">
                        <div className="text-left">
                            <div className="text-text-secondary text-[10px] uppercase tracking-wider mb-1 font-semibold flex items-center justify-between">
                                <span>API Status</span>
                            </div>
                            <div className={`font-semibold flex items-center gap-1.5 ${statusCopy.badge}`}>
                                <span className="text-lg leading-none">{statusState === "error" ? "⚠" : statusState === "stale" ? "◔" : "●"}</span>
                                {statusCopy.value}
                            </div>
                        </div>
                        <div className="w-px h-10 bg-border-subtle"></div>
                        <div className="text-left">
                            <div className="text-text-secondary text-[10px] uppercase tracking-wider mb-1 font-semibold">Last Sync</div>
                            <div className="font-medium font-mono text-text-primary tabular-nums">
                                {lastUpdated ? lastUpdated.toLocaleTimeString('en-US') : 'Pending'}
                            </div>
                            <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-text-secondary">
                                {lastSyncAge ?? "Waiting"}
                            </div>
                        </div>
                    </div>
                </header>

                {/* SWR Toast Notification Overlay */}
                <AnimatePresence>
                    {toastMessage && (
                        <motion.div
                            initial={{ opacity: 0, y: -50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.9 }}
                            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-surface border-2 border-accent shadow-[0_4px_30px_rgba(74,222,128,0.2)] rounded-2xl p-4 flex items-center gap-4 min-w-[300px]"
                        >
                            <div className="bg-accent/20 p-2 rounded-full text-accent">
                                <BellRing size={24} className="animate-[wiggle_1s_ease-in-out_infinite]" />
                            </div>
                            <div>
                                <h4 className="font-bold text-text-primary text-sm">{toastMessage.title}</h4>
                                <p className="text-text-muted text-xs font-medium">{toastMessage.msg}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

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
                                    onClick={() => mutate()}
                                    disabled={isValidating}
                                    title="Manual Refresh"
                                    className="p-2.5 rounded-xl text-lg bg-surface-alt border border-border-strong hover:bg-surface hover:text-accent transition shrink-0 ml-1 disabled:opacity-50"
                                >
                                    <span className={`block transition-transform duration-500 ${isValidating ? 'animate-spin' : 'hover:rotate-180'}`}>↻</span>
                                </button>
                            </div>
                        </div>

                        {/* Shop Tabs */}
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-border-subtle mt-2 pt-2 relative">
                            {TABS.map(tab => {
                                const isActive = categoryFilter === tab;
                                return (
                                    <button
                                        key={tab}
                                        onClick={() => setCategoryFilter(tab)}
                                        className={`relative whitespace-nowrap flex items-center gap-2 px-5 py-3 rounded-t-xl text-sm font-bold transition-all ${isActive
                                            ? 'text-text-primary'
                                            : 'text-text-secondary hover:bg-surface-alt hover:text-text-primary'}`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeTabBadge"
                                                className="absolute inset-0 bg-surface-alt shadow-[inset_0_-2px_0_0_#4ADE80] rounded-t-xl z-0"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        <span className="relative z-10 text-lg opacity-80">{tab === "All" ? "🌍" : CATEGORY_CONFIG[tab].emoji}</span>
                                        <span className="relative z-10">{tab}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Rarity Legend */}
                        <div className="px-2 pb-2">
                            <RarityLegend />
                        </div>

                        {/* States */}
                        {statusState === "stale" && (
                            <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm text-yellow-200 shadow-xs">
                                Showing cached stock from our Worker while the public source reconnects.
                            </div>
                        )}

                        {isLoading && !liveStock && !swrError && (
                            <div className="text-center py-20 rounded-2xl border border-border-strong bg-surface/50 shadow-xs">
                                <p className="text-5xl mb-4">📡</p>
                                <p className="text-text-primary text-sm font-medium mb-2">Connecting to live stock data...</p>
                                <p className="text-text-muted text-xs">Fetching the latest public stock rotation and caching it for the dashboard.</p>
                            </div>
                        )}

                        {swrError && (
                            <div className="text-center py-20 rounded-2xl border border-danger/40 bg-danger/10 shadow-xs">
                                <p className="text-5xl mb-4">⚠️</p>
                                <p className="text-danger text-sm font-medium mb-6">Unable to load stock data. Please try again shortly.</p>
                                <button
                                    onClick={() => mutate()}
                                    className="px-5 py-2.5 rounded-xl text-sm font-bold bg-danger/20 text-danger border border-danger/40 hover:bg-danger/30 transition auto shadow-xs"
                                >
                                    Retry Connection
                                </button>
                            </div>
                        )}

                        {/* Render Category Grids */}
                        {!swrError && !isLoading && (
                            <div className="space-y-12 mb-8">
                                {activeCategories.map(cat => {
                                    const cData = getCategoryData(cat);
                                    if (!cData) return null;
                                    const items = getFilteredItems(cData.items);
                                    const totalQuantity = getTotalQuantity(items);
                                    if (items.length === 0 && activeCategories.length > 1) return null; // hide empty categories in 'All' view

                                    return (
                                        <section key={cat} className="space-y-4 min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
                                                <div className="flex items-center gap-3">
                                                    <span className="bg-surface border border-border-strong w-10 h-10 flex items-center justify-center rounded-xl text-xl shadow-xs">{CATEGORY_CONFIG[cat].emoji}</span>
                                                    <div className="flex items-center gap-3">
                                                        <h2 className="text-xl font-extrabold text-text-primary tracking-wide">{cat}</h2>
                                                        <span className="rounded-full border border-accent/45 bg-accent-soft px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-accent shadow-[0_0_18px_rgba(74,222,128,0.14)]">
                                                            {totalQuantity} total stock
                                                        </span>
                                                        <span className="rounded-full border border-border-strong bg-surface px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-text-secondary">
                                                            {items.length} live items
                                                        </span>
                                                    </div>
                                                </div>
                                                {cat === "Traveling Merchant" && stock.travelingMerchant?.status === "leaved" ? (
                                                    <span className="text-xs px-3 py-1.5 rounded-full bg-danger/10 border border-danger/30 text-danger font-bold tracking-wide">
                                                        Away · Returns in {stock.travelingMerchant.appearIn}
                                                    </span>
                                                ) : (
                                                    <CountdownBadge
                                                        countdown={cData.countdown ? (liveRotationCountdown ?? cData.countdown) : null}
                                                        label="Refresh in:"
                                                    />
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
                                                    {cat === "Traveling Merchant" && stock.travelingMerchant?.status === "leaved"
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
                        <div className="pt-8 mb-4 text-center text-xs text-text-muted border-t border-border-strong flex flex-col sm:flex-row items-center justify-center gap-1.5 opacity-60">
                            <span>Auto-refreshes every 30s</span>
                        </div>
                    </div>

                    {/* ── Section 5: Watchlist Sidebar (Field Ledger) ────────────────── */}
                    <aside className="w-full xl:w-80 shrink-0">
                        <div className="sticky top-6">
                            <div className="rounded-3xl border border-border-strong bg-surface/60 backdrop-blur-md shadow-lg overflow-hidden flex flex-col max-h-[calc(100vh-3rem)]">
                                {/* Header */}
                                <div className="p-6 border-b border-border-strong flex items-center justify-between bg-surface-alt/40">
                                    <h2 className="text-base font-black text-text-primary flex items-center gap-3">
                                        <span className="text-xl">📒</span> Field Ledger
                                    </h2>
                                    <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-accent text-background border border-accent/20">
                                        {watchlist.size}
                                    </span>
                                </div>

                                {/* Body */}
                                <div className="p-4 overflow-y-auto flex-1 custom-scrollbar space-y-3">
                                    {watchlist.size === 0 ? (
                                        <div className="text-center py-12 px-6 bg-surface-alt/20 rounded-2xl border border-dashed border-border-strong">
                                            <p className="text-3xl mb-4 opacity-30">📂</p>
                                            <p className="text-xs text-text-muted font-medium leading-relaxed">
                                                Your inventory ledger is empty. Star items in the main terminal to track them.
                                            </p>
                                        </div>
                                    ) : (
                                        [...watchlist].map(name => {
                                            const inStockItem = watchedInStock.find(i => i.name === name);
                                            const isAvail = !!inStockItem;
                                            const rarity = inStockItem ? getItemRarity(inStockItem.name, inStockItem.category) : "Common";

                                            return (
                                                <div key={name} className={`flex items-center justify-between p-3.5 rounded-2xl border text-sm transition-all
                        ${isAvail ? 'bg-accent/10 border-accent/40 shadow-sm' : 'bg-surface-alt/30 border-border-strong opacity-60'}`}>
                                                    <div className="flex flex-col min-w-0 pr-2">
                                                        <span className="font-bold truncate text-text-primary" title={name}>{name}</span>
                                                        <span className="text-[9px] uppercase tracking-widest font-black mt-1">
                                                            {isAvail ? (
                                                                <span className="text-accent flex items-center gap-1.5">
                                                                    <span className={`w-1.5 h-1.5 rounded-full ${RARITY_DOTS[rarity]}`}></span>
                                                                    Detected
                                                                </span>
                                                            ) : (
                                                                <span className="text-text-muted">Scanning...</span>
                                                            )}
                                                        </span>
                                                    </div>
                                                    {isAvail ? (
                                                        <div className="text-right">
                                                            <div className="text-lg mb-0.5">{inStockItem.emoji}</div>
                                                            <div className="text-[10px] font-mono font-black text-accent">×{inStockItem.quantity}</div>
                                                        </div>
                                                    ) : (
                                                        <div className="w-1.5 h-1.5 rounded-full bg-border-strong animate-pulse"></div>
                                                    )}
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* ── Section 2, 3, 4: Content Hub Entry Points ────────────────────────── */}
                <div className="mt-20 flex lg:grid lg:grid-cols-3 gap-8 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory lg:snap-none pb-8 lg:pb-0 scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
                    <Link href="/items/lucky-clover" className="group rounded-3xl border border-border-strong bg-surface/40 p-8 transition-all hover:border-accent/40 hover:bg-surface-alt shadow-sm min-w-[85vw] lg:min-w-0 snap-center">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Intelligence Brief</p>
                        <h3 className="mt-4 text-2xl font-black text-text-primary group-hover:text-accent transition font-serif italic">The Item Ledger</h3>
                        <p className="mt-3 text-sm leading-relaxed text-text-secondary font-medium">Discover essential targets worth your tracking time, featured for their strategic value in the upcoming harvest.</p>
                        <div className="mt-6 flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                            Open Investigation <span>→</span>
                        </div>
                    </Link>
                    <Link href="/guides/how-garden-horizons-stock-works" className="group rounded-3xl border border-border-strong bg-surface/40 p-8 transition-all hover:border-accent/40 hover:bg-surface-alt shadow-sm min-w-[85vw] lg:min-w-0 snap-center">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Field Manual</p>
                        <h3 className="mt-4 text-2xl font-black text-text-primary group-hover:text-accent transition font-serif italic">Operational Manual</h3>
                        <p className="mt-3 text-sm leading-relaxed text-text-secondary font-medium">Master the shop rotation mechanics, learn when the Traveling Merchant arrives, and optimize your restock windows.</p>
                        <div className="mt-6 flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                            Consult Manual <span>→</span>
                        </div>
                    </Link>
                    <Link href="/categories/seeds" className="group rounded-3xl border border-border-strong bg-surface/40 p-8 transition-all hover:border-accent/40 hover:bg-surface-alt shadow-sm min-w-[85vw] lg:min-w-0 snap-center">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Market Protocol</p>
                        <h3 className="mt-4 text-2xl font-black text-text-primary group-hover:text-accent transition font-serif italic">The Seed Exchange</h3>
                        <p className="mt-3 text-sm leading-relaxed text-text-secondary font-medium">Browse high-priority seed catalogs and featured gear designed to maximize your gardening efficiency through live tracking.</p>
                        <div className="mt-6 flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                            Enter Exchange <span>→</span>
                        </div>
                    </Link>
                </div>

                {/* ── Section 6: Field Guide & Operational FAQ ─────────────────────── */}
                <div className="mt-24 space-y-12 border-t border-border-strong pt-16">
                    
                    {/* What is it */}
                    <div className="rounded-3xl border border-border-strong bg-surface/40 p-10 flex flex-col items-start gap-6 shadow-sm">
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
                        <Link href="/grow-a-garden-stock-tracker" className="text-green-400 hover:text-green-300 transition-colors text-sm font-semibold underline underline-offset-4">Learn more about the Grow a Garden stock tracker</Link>
                    </div>

                    {/* Tactics & Rarities */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="rounded-3xl border border-border-strong bg-surface/40 p-10 shadow-sm">
                            <h2 className="text-2xl font-black text-text-primary mb-8 font-serif italic border-b border-border-strong pb-4">How to Use the Stock Notifier</h2>
                            <div className="space-y-6">
                                {([
                                    ["Check Current Stock", "See all items currently in the shop, updated in real-time."],
                                    ["Use Filters", "Filter by category (Seeds, Gear, Eggs, Honey, Cosmetics) or search by name."],
                                    ["Watch the Countdown", "Each shop section shows when the next stock rotation happens."],
                                    ["Star Your Targets", "Watch items you want — instantly alerted when they appear in stock."],
                                ] as [string, string][]).map(([title, desc], i) => (
                                    <div key={i} className="flex gap-5">
                                        <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-accent/20 border border-accent/40 text-accent text-xs font-bold flex items-center justify-center font-mono">0{i + 1}</span>
                                        <div className="space-y-1">
                                            <h4 className="text-text-primary font-bold text-sm tracking-wide">{title}</h4>
                                            <p className="text-text-secondary text-xs leading-relaxed font-medium">{desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-border-strong bg-surface/40 p-10 shadow-sm flex flex-col">
                            <h2 className="text-2xl font-black text-text-primary mb-8 font-serif italic border-b border-border-strong pb-4">Item Rarities</h2>
                            <div className="space-y-5 flex-1">
                                {([
                                    ["text-rarity-common", "○", "Common (Gray)", "Basic items always available. Low cost, great for getting started."],
                                    ["text-rarity-uncommon", "◍", "Uncommon (Green)", "Slightly better items that appear frequently. Good value."],
                                    ["text-rarity-rare", "◎", "Rare (Blue)", "Desirable items that don't appear every rotation. Worth grabbing!"],
                                    ["text-rarity-epic", "◉", "Epic (Purple)", "Powerful items that appear infrequently. Usually cost Gems."],
                                    ["text-rarity-legendary", "✦", "Legendary (Gold)", "The rarest and most valuable items. They sell out in seconds!"],
                                ] as [string, string, string, string][]).map(([color, icon, label, desc]) => (
                                    <div key={label} className="flex gap-5 group">
                                        <span className={`text-xl ${color} transition-transform group-hover:scale-125`}>{icon}</span>
                                        <div className="space-y-1">
                                            <h4 className={`font-black text-xs uppercase tracking-widest ${color}`}>{label}</h4>
                                            <p className="text-text-secondary text-[11px] leading-relaxed font-medium">{desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* FAQ Terminal */}
                    <div className="rounded-3xl border border-border-strong bg-accent-soft/5 p-10 shadow-inner">
                        <h2 className="text-3xl font-black text-text-primary mb-10 font-serif italic text-center text-accent">Frequently Asked Questions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                            {([
                                ["Is Garden Horizons Stock Notifier free?", "Yes! Completely free to use. No registration, no downloads, no hidden fees."],
                                ["How often does the stock update?", "Our tracker refreshes automatically every 30 seconds to show you the latest stock."],
                                ["Is this affiliated with Garden Horizons?", "No. This is a fan-made tool. Not affiliated with Roblox Corporation or the game developers."],
                                ["How accurate is the stock data?", "We proxy public live stock feeds through our own Cloudflare Worker and refresh the dashboard every 30 seconds."],
                                ["Does this work on mobile?", "Yes! Fully responsive and works perfectly on phones, tablets, and desktop computers."],
                            ] as [string, string][]).map(([q, a]) => (
                                <div key={q} className="relative pl-6 border-l-2 border-accent/30 group">
                                    <div className="absolute -left-[2px] top-0 h-4 w-0.5 bg-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <h4 className="font-bold text-text-primary text-sm mb-2 group-hover:text-accent transition-colors">{q}</h4>
                                    <p className="text-text-secondary text-xs leading-relaxed font-medium italic opacity-80">{a}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12 pt-8 border-t border-accent/10 text-center">
                            <Link href="/faq" className="text-accent hover:text-accent-hover text-sm font-black uppercase tracking-widest underline underline-offset-8">View the full FAQ</Link>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
