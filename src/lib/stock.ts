// Garden Horizons Stock Data Types & API Client
// Powered by GAG Stock API: https://gagstock.gleeze.com

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

export interface GardenStock {
  updatedAt: string;
  seed: CategoryStock;
  egg: CategoryStock;
  gear: CategoryStock;
  honey: CategoryStock;
  cosmetics: CategoryStock;
  travelingMerchant: CategoryStock;
}

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

function mapItems(items: { name: string; quantity: number; emoji: string }[], category: ItemCategory): StockItem[] {
  return items.map((item) => ({ ...item, category }));
}

export async function fetchGardenStock(): Promise<GardenStock> {
  const res = await fetch("/api/stock", { next: { revalidate: 0 } });
  if (!res.ok) throw new Error("Failed to fetch stock data");
  const json = await res.json();
  const d = json.data;

  return {
    updatedAt: json.updated_at,
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
