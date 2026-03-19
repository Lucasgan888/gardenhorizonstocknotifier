// Garden Horizons stock client shared by the homepage and API proxy.

export type ItemCategory = "Seeds" | "Gear" | "Eggs" | "Honey" | "Cosmetics" | "Traveling Merchant";

export interface StockItem {
  name: string;
  quantity: number;
  emoji: string;
  category: ItemCategory;
}

export interface CategoryStock {
  items: StockItem[];
  countdown: string | null;
  status?: string;
  appearIn?: string;
  merchantName?: string;
}

export interface StockMeta {
  state: "live" | "stale" | "error";
  stale: boolean;
  source: string;
  cachedAt: string;
  nextUpdateAt: string | null;
  weather?: {
    type: string;
    effects: string[];
    active: boolean;
    color?: string;
  } | null;
  error?: string;
}

export interface GardenStock {
  updatedAt: string;
  meta: StockMeta;
  seed: CategoryStock;
  egg: CategoryStock;
  gear: CategoryStock;
  honey: CategoryStock;
  cosmetics: CategoryStock;
  travelingMerchant: CategoryStock;
}

export const EMPTY_GARDEN_STOCK: GardenStock = {
  updatedAt: "",
  meta: {
    state: "error",
    stale: false,
    source: "unavailable",
    cachedAt: "",
    nextUpdateAt: null,
    weather: null,
  },
  seed: { items: [], countdown: null },
  egg: { items: [], countdown: null },
  gear: { items: [], countdown: null },
  honey: { items: [], countdown: null },
  cosmetics: { items: [], countdown: null },
  travelingMerchant: { items: [], countdown: null, status: "unknown" },
};

export const CATEGORY_CONFIG: Record<ItemCategory, { emoji: string; color: string; border: string; bg: string }> = {
  Seeds: {
    emoji: "🌱",
    color: "text-green-400",
    border: "border-green-800/60",
    bg: "from-green-950/40 to-transparent",
  },
  Gear: {
    emoji: "⚙️",
    color: "text-blue-400",
    border: "border-blue-800/60",
    bg: "from-blue-950/40 to-transparent",
  },
  Eggs: {
    emoji: "🥚",
    color: "text-yellow-400",
    border: "border-yellow-800/60",
    bg: "from-yellow-950/40 to-transparent",
  },
  Honey: {
    emoji: "🍯",
    color: "text-amber-400",
    border: "border-amber-800/60",
    bg: "from-amber-950/40 to-transparent",
  },
  Cosmetics: {
    emoji: "✨",
    color: "text-purple-400",
    border: "border-purple-800/60",
    bg: "from-purple-950/40 to-transparent",
  },
  "Traveling Merchant": {
    emoji: "🚶",
    color: "text-pink-400",
    border: "border-pink-800/60",
    bg: "from-pink-950/40 to-transparent",
  },
};

const EMOJI_MAP: Record<string, string> = {
  "Uncommon Egg": "🐣", "Cactus": "🌵", "Tomato": "🍅",
  "Buttercup": "🌼", "Blueberry": "🫐", "Strawberry": "🍓", "Carrot": "🥕",
  "Harvest Tool": "🌾", "Favorite Tool": "❤️", "Pet Name Reroller": "📛",
  "Pet Lead": "🦮", "Recall Wrench": "🔧", "Trowel": "🛠️", "Trading Ticket": "🎫", "Watering Can": "🚿",
  "Beach Crate": "🏖️", "Summer Fun Crate": "🏄", "Cooking Kit": "🍳",
  "Stone Lantern": "🏮", "Viney Beam": "🌿", "Hay Bale": "🌾", "Brick Stack": "🧱",
  "Torch": "🔥", "White Bench": "🪑", "Safari Seed Pack": "🦁",
  "Zebra Whistle": "🦓", "Ancestral Horn": "📯", "Orange Delight": "🍊", "Gecko": "🦎",
  "Fall Egg": "🍂", "Rake": "🧹", "Fall Seed Pack": "🍁", "Chipmunk": "🐿️",
  "Maple Crate": "📦", "Fall Crate": "🎁", "Golden Watering Can": "🥇",
  "Golden Sunflower Seeds": "🌻", "Weather Machine": "🌦️", "Lucky Clover": "🍀"
};

function mapItems(items: { name: string; quantity: number; emoji?: string }[], category: ItemCategory): StockItem[] {
  return items.map((item) => {
    // Override the generic '❓' or provide one if missing
    let finalEmoji = item.emoji;
    if (finalEmoji === "❓" || !finalEmoji) {
      finalEmoji = EMOJI_MAP[item.name] || "📦";
    }
    return { ...item, emoji: finalEmoji, category };
  });
}

export async function fetchGardenStock(): Promise<GardenStock> {
  const res = await fetch("/api/stock", { next: { revalidate: 0 } });
  const json = await res.json().catch(() => null);
  if (!res.ok || !json) throw new Error(json?.meta?.error || "Failed to fetch stock data");
  const d = json.data;

  return {
    updatedAt: json.updated_at,
    meta: {
      state: json.meta?.state ?? "live",
      stale: Boolean(json.meta?.stale),
      source: json.meta?.source ?? "unknown",
      cachedAt: json.meta?.cached_at ?? "",
      nextUpdateAt: json.meta?.next_update_at ?? null,
      weather: json.meta?.weather ?? null,
      error: json.meta?.error,
    },
    seed: {
      items: mapItems(d.seed?.items ?? [], "Seeds"),
      countdown: d.seed?.countdown ?? null,
    },
    egg: {
      items: mapItems(d.egg?.items ?? [], "Eggs"),
      countdown: d.egg?.countdown ?? null,
    },
    gear: {
      items: mapItems(d.gear?.items ?? [], "Gear"),
      countdown: d.gear?.countdown ?? null,
    },
    honey: {
      items: mapItems(d.honey?.items ?? [], "Honey"),
      countdown: d.honey?.countdown ?? null,
    },
    cosmetics: {
      items: mapItems(d.cosmetics?.items ?? [], "Cosmetics"),
      countdown: d.cosmetics?.countdown ?? null,
    },
    travelingMerchant: {
      items: mapItems(d.travelingmerchant?.items ?? [], "Traveling Merchant"),
      countdown: d.travelingmerchant?.countdown ?? null,
      status: d.travelingmerchant?.status,
      appearIn: d.travelingmerchant?.appearIn,
      merchantName: d.travelingmerchant?.merchantName,
    },
  };
}
