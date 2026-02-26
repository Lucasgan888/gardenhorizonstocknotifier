// Garden Horizons Stock Data & Mock Engine

export type ItemRarity = "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";
export type ItemCategory = "Seeds" | "Tools" | "Decorations" | "Fertilizer" | "Special";

export interface StockItem {
  id: string;
  name: string;
  category: ItemCategory;
  rarity: ItemRarity;
  price: number;
  currency: "Coins" | "Gems";
  inStock: boolean;
  quantity: number;
  lastSeen: Date;
  emoji: string;
}

export interface StockRotation {
  items: StockItem[];
  rotationTime: Date;
  nextRotation: Date;
  rotationNumber: number;
}

const ITEM_DB: Omit<StockItem, "inStock" | "quantity" | "lastSeen">[] = [
  { id: "golden-sunflower", name: "Golden Sunflower Seeds", category: "Seeds", rarity: "Legendary", price: 5000, currency: "Gems", emoji: "🌻" },
  { id: "crystal-rose", name: "Crystal Rose Seeds", category: "Seeds", rarity: "Epic", price: 2500, currency: "Gems", emoji: "🌹" },
  { id: "moonlight-lily", name: "Moonlight Lily Seeds", category: "Seeds", rarity: "Epic", price: 2000, currency: "Gems", emoji: "🌷" },
  { id: "rainbow-tulip", name: "Rainbow Tulip Seeds", category: "Seeds", rarity: "Rare", price: 800, currency: "Coins", emoji: "🌷" },
  { id: "starfruit", name: "Starfruit Seeds", category: "Seeds", rarity: "Rare", price: 600, currency: "Coins", emoji: "⭐" },
  { id: "pumpkin", name: "Pumpkin Seeds", category: "Seeds", rarity: "Uncommon", price: 200, currency: "Coins", emoji: "🎃" },
  { id: "carrot", name: "Carrot Seeds", category: "Seeds", rarity: "Common", price: 50, currency: "Coins", emoji: "🥕" },
  { id: "tomato", name: "Tomato Seeds", category: "Seeds", rarity: "Common", price: 30, currency: "Coins", emoji: "🍅" },
  { id: "blueberry", name: "Blueberry Seeds", category: "Seeds", rarity: "Uncommon", price: 150, currency: "Coins", emoji: "🫐" },
  { id: "watermelon", name: "Watermelon Seeds", category: "Seeds", rarity: "Uncommon", price: 180, currency: "Coins", emoji: "🍉" },
  { id: "dragon-fruit", name: "Dragon Fruit Seeds", category: "Seeds", rarity: "Rare", price: 1000, currency: "Coins", emoji: "🐉" },
  { id: "enchanted-oak", name: "Enchanted Oak Seeds", category: "Seeds", rarity: "Epic", price: 3000, currency: "Gems", emoji: "🌳" },
  { id: "golden-watering", name: "Golden Watering Can", category: "Tools", rarity: "Legendary", price: 10000, currency: "Gems", emoji: "🚿" },
  { id: "diamond-hoe", name: "Diamond Hoe", category: "Tools", rarity: "Epic", price: 5000, currency: "Gems", emoji: "⛏️" },
  { id: "turbo-sprinkler", name: "Turbo Sprinkler", category: "Tools", rarity: "Rare", price: 1500, currency: "Coins", emoji: "💦" },
  { id: "auto-harvester", name: "Auto Harvester", category: "Tools", rarity: "Epic", price: 4000, currency: "Gems", emoji: "🤖" },
  { id: "basic-shovel", name: "Basic Shovel", category: "Tools", rarity: "Common", price: 25, currency: "Coins", emoji: "🪴" },
  { id: "garden-gnome", name: "Garden Gnome", category: "Decorations", rarity: "Uncommon", price: 300, currency: "Coins", emoji: "🧑‍🌾" },
  { id: "fairy-lights", name: "Fairy Lights", category: "Decorations", rarity: "Rare", price: 500, currency: "Coins", emoji: "✨" },
  { id: "crystal-fountain", name: "Crystal Fountain", category: "Decorations", rarity: "Epic", price: 3500, currency: "Gems", emoji: "⛲" },
  { id: "rainbow-arch", name: "Rainbow Arch", category: "Decorations", rarity: "Legendary", price: 8000, currency: "Gems", emoji: "🌈" },
  { id: "mega-fertilizer", name: "Mega Fertilizer", category: "Fertilizer", rarity: "Rare", price: 400, currency: "Coins", emoji: "💊" },
  { id: "instant-grow", name: "Instant Grow Potion", category: "Fertilizer", rarity: "Epic", price: 1500, currency: "Gems", emoji: "🧪" },
  { id: "super-compost", name: "Super Compost", category: "Fertilizer", rarity: "Uncommon", price: 100, currency: "Coins", emoji: "♻️" },
  { id: "lucky-clover", name: "Lucky Clover", category: "Special", rarity: "Legendary", price: 15000, currency: "Gems", emoji: "🍀" },
  { id: "pet-bee", name: "Pet Bee", category: "Special", rarity: "Epic", price: 6000, currency: "Gems", emoji: "🐝" },
  { id: "weather-machine", name: "Weather Machine", category: "Special", rarity: "Legendary", price: 20000, currency: "Gems", emoji: "🌦️" },
  { id: "harvest-festival-pass", name: "Harvest Festival Pass", category: "Special", rarity: "Rare", price: 999, currency: "Gems", emoji: "🎪" },
];

export const RARITY_COLORS: Record<ItemRarity, string> = {
  Common: "text-gray-400 bg-gray-800",
  Uncommon: "text-green-400 bg-green-900/30",
  Rare: "text-blue-400 bg-blue-900/30",
  Epic: "text-purple-400 bg-purple-900/30",
  Legendary: "text-amber-400 bg-amber-900/30",
};

export const RARITY_BORDER: Record<ItemRarity, string> = {
  Common: "border-gray-700",
  Uncommon: "border-green-800",
  Rare: "border-blue-800",
  Epic: "border-purple-800",
  Legendary: "border-amber-700",
};

export const CATEGORIES: ItemCategory[] = ["Seeds", "Tools", "Decorations", "Fertilizer", "Special"];

export function generateCurrentStock(seed?: number): StockRotation {
  const now = new Date();
  // Rotation every 5 minutes
  const rotationMinutes = 5;
  const rotationNumber = Math.floor(now.getTime() / (rotationMinutes * 60 * 1000));
  const rotationTime = new Date(rotationNumber * rotationMinutes * 60 * 1000);
  const nextRotation = new Date((rotationNumber + 1) * rotationMinutes * 60 * 1000);

  // Use rotation number as seed for consistent stock per rotation
  const rng = mulberry32(seed ?? rotationNumber);

  // Pick 8-12 items for this rotation
  const numItems = 8 + Math.floor(rng() * 5);
  const shuffled = [...ITEM_DB].sort(() => rng() - 0.5);
  const selectedItems = shuffled.slice(0, numItems);

  const items: StockItem[] = selectedItems.map(item => ({
    ...item,
    inStock: rng() > 0.15, // 85% chance in stock
    quantity: item.rarity === "Legendary" ? Math.floor(rng() * 3) + 1
      : item.rarity === "Epic" ? Math.floor(rng() * 10) + 2
      : Math.floor(rng() * 50) + 5,
    lastSeen: now,
  }));

  return { items, rotationTime, nextRotation, rotationNumber };
}

export function getStockHistory(): StockRotation[] {
  const history: StockRotation[] = [];
  const now = new Date();
  for (let i = 1; i <= 5; i++) {
    const pastTime = new Date(now.getTime() - i * 5 * 60 * 1000);
    const rotNum = Math.floor(pastTime.getTime() / (5 * 60 * 1000));
    history.push(generateCurrentStock(rotNum));
  }
  return history;
}

// Simple seeded RNG
function mulberry32(a: number) {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
