import type { Metadata } from "next";

export const SITE_URL = "https://gardenhorizonstocknotifier.com";
export const SITE_NAME = "Garden Horizons Stock Notifier";

export type ContentSection = {
  title: string;
  body: string[];
  bullets?: string[];
};

export type FaqEntry = {
  question: string;
  answer: string;
};

export type RelatedLink = {
  title: string;
  href: string;
  description: string;
  type: "guide" | "item" | "category" | "legacy";
};

type BaseContent = {
  title: string;
  slug: string;
  description: string;
  intro: string;
  updatedAt: string;
  faq: FaqEntry[];
  relatedLinks: RelatedLink[];
  sections: ContentSection[];
};

export type GuideContent = BaseContent & {
  kind: "guide";
  quickFacts: { label: string; value: string }[];
};

export type ItemContent = BaseContent & {
  kind: "item";
  rarity: string;
  sourceShop: string;
  whyItMatters: string;
  trackingTips: string[];
  howHardItIsToGet: string;
};

export type CategoryContent = BaseContent & {
  kind: "category";
  heroSummary: string;
  selectionTips: string[];
  featuredItems: { name: string; slug: string; rarity: string; reason: string }[];
};

export type PageContent = GuideContent | ItemContent | CategoryContent;

export const guides: GuideContent[] = [
  {
    kind: "guide",
    slug: "how-garden-horizons-stock-works",
    title: "How Garden Horizons Stock Works",
    description:
      "Learn how Garden Horizons shop rotations work, why the tracker matters, and how to spot high-value restocks before they disappear.",
    intro:
      "Garden Horizons uses short shop rotations, so the difference between checking casually and checking with a tracker is huge. This guide breaks down how the stock cycle works and what players should actually watch.",
    updatedAt: "2026-03-10",
    quickFacts: [
      { label: "Refresh cycle", value: "Most core shops rotate every 5 minutes" },
      { label: "Best use", value: "Watch rare seeds and gear before each reset" },
      { label: "Tracker role", value: "Checks all key categories in one place" },
    ],
    sections: [
      {
        title: "Understand the rotation loop",
        body: [
          "Garden Horizons stock is built around frequent resets rather than once-a-day restocks. That means a rare item can appear, disappear, and not come back for multiple cycles.",
          "If you only check one shop in-game every now and then, you miss the bigger picture. A tracker lets you see seeds, gear, eggs, honey, cosmetics, and merchant inventory without manually hopping between menus.",
        ],
      },
      {
        title: "Why players miss valuable items",
        body: [
          "Most misses happen because players do not know the timer, are farming when stock flips, or spend too early on filler purchases.",
          "The best approach is to decide what matters to your build before the next reset, then watch the live board instead of reacting late.",
        ],
        bullets: [
          "Check countdowns before you leave the shop area",
          "Keep coins or gems ready for one priority purchase",
          "Use the watchlist for items you actually plan to buy",
        ],
      },
      {
        title: "How to use the tracker intelligently",
        body: [
          "Use category filters to focus on your progression stage. Newer players usually care about seeds and gear first, while established players watch merchant exclusives and rare utility items.",
          "Once you know your targets, the tracker becomes a planning tool rather than just a stock feed.",
        ],
      },
    ],
    faq: [
      {
        question: "How often does Garden Horizons stock reset?",
        answer:
          "Most shops follow a short rotation cycle, commonly around 5 minutes. The live tracker updates every 30 seconds so you can catch changes without refreshing manually.",
      },
      {
        question: "Should I watch every category?",
        answer:
          "No. Pick the category that matches your current goal, like seeds for income growth or gear for efficiency, and track only a few high-value targets.",
      },
    ],
    relatedLinks: [
      {
        title: "When Does Garden Horizons Stock Reset?",
        href: "/guides/when-does-garden-horizons-stock-reset",
        description: "A quick timing-first guide for players who only need the reset rules.",
        type: "guide",
      },
      {
        title: "Lucky Clover item guide",
        href: "/items/lucky-clover",
        description: "Why this legendary drop is worth tracking closely.",
        type: "item",
      },
      {
        title: "Seeds category hub",
        href: "/categories/seeds",
        description: "See which seed upgrades make the stock cycle matter most.",
        type: "category",
      },
    ],
  },
  {
    kind: "guide",
    slug: "when-does-garden-horizons-stock-reset",
    title: "When Does Garden Horizons Stock Reset?",
    description:
      "A practical reset-timer guide for Garden Horizons players who want to know when shop stock changes and how to time checks around new rotations.",
    intro:
      "If you only remember one thing about Garden Horizons stock, remember this: timing matters more than scrolling faster. Here is how to think about reset windows and avoid being late.",
    updatedAt: "2026-03-10",
    quickFacts: [
      { label: "Best habit", value: "Check the board before and after each 5-minute turn" },
      { label: "Refresh source", value: "Live tracker syncs every 30 seconds" },
      { label: "Common mistake", value: "Spending right before a better reset arrives" },
    ],
    sections: [
      {
        title: "Treat resets like farming checkpoints",
        body: [
          "Instead of checking randomly, build your session around the stock cycle. Farm, harvest, then look at the board when the next reset is close.",
          "This turns stock tracking into a routine and helps you avoid wasting time hovering in the shop with no plan.",
        ],
      },
      {
        title: "Know what changes and what stays the same",
        body: [
          "A reset means inventory can rotate into higher-value seeds, better gear, or rarer utility items. Not every cycle is exciting, but the valuable one only needs to happen once for the tracker to pay off.",
          "Traveling merchant timing is different from core shops, so watch that panel separately when it is active.",
        ],
      },
      {
        title: "Simple timing routine",
        body: [
          "Open the live tracker near the end of a cycle, scan your watchlist, and decide what you will buy before the next turn.",
        ],
        bullets: [
          "Keep one tab open during your play session",
          "Check seed and gear shops first if you are progressing",
          "Use merchant timing for exclusive or limited targets",
        ],
      },
    ],
    faq: [
      {
        question: "Is there an exact stock reset timer?",
        answer:
          "The in-game shops generally follow short recurring rotations, and the tracker shows countdowns so you do not need to calculate them yourself.",
      },
      {
        question: "Do rare items appear on every reset?",
        answer:
          "No. Many resets are ordinary. The goal is to stay ready for the uncommon and legendary rotations when they do appear.",
      },
    ],
    relatedLinks: [
      {
        title: "How Garden Horizons stock works",
        href: "/guides/how-garden-horizons-stock-works",
        description: "Full mechanics guide behind the timer.",
        type: "guide",
      },
      {
        title: "Best seeds to buy early game",
        href: "/guides/best-seeds-to-buy-early-game",
        description: "Use resets to prioritize profitable early purchases.",
        type: "guide",
      },
      {
        title: "Gear category hub",
        href: "/categories/gear",
        description: "Plan resets around the tools that change efficiency fastest.",
        type: "category",
      },
    ],
  },
  {
    kind: "guide",
    slug: "best-seeds-to-buy-early-game",
    title: "Best Seeds to Buy Early Game in Garden Horizons",
    description:
      "A beginner-friendly seed buying guide for Garden Horizons focused on value, progression, and what to watch during early stock rotations.",
    intro:
      "Early game is where most players waste coins. The best seed is not always the rarest one. It is the one that helps you grow income fast enough to afford later stock opportunities.",
    updatedAt: "2026-03-10",
    quickFacts: [
      { label: "Priority", value: "Reliable income before flashy rarity" },
      { label: "Avoid", value: "Impulse buys that stall tool upgrades" },
      { label: "Tracker use", value: "Compare resets until your target appears" },
    ],
    sections: [
      {
        title: "Choose seeds that support your next upgrade",
        body: [
          "A good early-game seed helps you keep farming smoothly and makes your next tool purchase easier. That is more important than chasing a rare name with weak practical value.",
          "Use the seeds category page as your shortlist, then wait for the right restock instead of buying every mid-tier option you see.",
        ],
      },
      {
        title: "Balance income and opportunity cost",
        body: [
          "If a seed is expensive enough to delay gear upgrades, ask whether it actually changes your earning pace. Some solid early seeds are valuable because they keep your garden moving, not because they look rare.",
        ],
        bullets: [
          "Keep reserve currency for one strong seed and one important tool",
          "Do not drain all coins right before a reset",
          "Use the tracker to compare several cycles before committing",
        ],
      },
      {
        title: "When to pivot into rare seeds",
        body: [
          "Once your basic loop is stable, rare seeds become more attractive because you can afford longer payback and more selective hunting. That is where legendary pages like Golden Sunflower Seeds become useful follow-up content.",
        ],
      },
    ],
    faq: [
      {
        question: "Should beginners buy the rarest seed they see?",
        answer:
          "Not always. A slightly less exciting seed that fits your budget and supports steady farming is often the better early-game move.",
      },
      {
        question: "How do I know which seeds are worth tracking?",
        answer:
          "Start with seeds that improve your income or progression plan, then save legendary hunting for after your core setup is stable.",
      },
    ],
    relatedLinks: [
      {
        title: "Seeds category hub",
        href: "/categories/seeds",
        description: "A curated starting point for seed priorities and comparisons.",
        type: "category",
      },
      {
        title: "How to get rare items fast",
        href: "/guides/how-to-get-rare-items-fast",
        description: "Upgrade from solid early choices into faster rare-item hunting.",
        type: "guide",
      },
      {
        title: "Weather Machine item guide",
        href: "/items/weather-machine",
        description: "See how late-game utility items compare to seed investments.",
        type: "item",
      },
    ],
  },
  {
    kind: "guide",
    slug: "how-to-get-rare-items-fast",
    title: "How to Get Rare Items Fast in Garden Horizons",
    description:
      "A practical rare-item farming guide for Garden Horizons covering tracker habits, timing, budget planning, and common mistakes.",
    intro:
      "Rare items do not just go to lucky players. They usually go to players who know what they want, have currency ready, and check the right reset windows consistently.",
    updatedAt: "2026-03-10",
    quickFacts: [
      { label: "Goal", value: "Be ready before the item appears" },
      { label: "Best targets", value: "Legendary seeds, rare gear, merchant exclusives" },
      { label: "Biggest mistake", value: "Watching everything instead of tracking a shortlist" },
    ],
    sections: [
      {
        title: "Pick a target list instead of chasing everything",
        body: [
          "Rare-item hunting gets weaker when your goal is vague. Choose a small set of high-impact items and build your checks around them.",
          "That makes the watchlist meaningful and prevents you from spending on random items that feel rare but do not improve your garden much.",
        ],
      },
      {
        title: "Match your route to the item source",
        body: [
          "Some rare items come from core shop rotations, while others are more closely tied to merchant appearances or special categories. Once you know the source, you can stop wasting attention on the wrong panel.",
        ],
        bullets: [
          "Watch seeds and gear during normal reset loops",
          "Treat merchant windows as exclusive-item moments",
          "Check item pages for source-specific timing notes",
        ],
      },
      {
        title: "Bank currency before the lucky moment",
        body: [
          "The fastest way to miss a rare item is to finally see it and realize you cannot afford it. Budget planning is part of rare-item tracking.",
          "Keep a reserve for at least one target so your tracker habit actually turns into a purchase.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the best way to get rare items faster?",
        answer:
          "Use the live tracker, narrow your target list, and keep enough currency ready so you can buy immediately when the right rotation arrives.",
      },
      {
        question: "Are merchant items easier or harder to track?",
        answer:
          "They can be easier to focus on because the source is distinct, but you still need to be ready during the merchant window since exclusives disappear quickly.",
      },
    ],
    relatedLinks: [
      {
        title: "Lucky Clover item guide",
        href: "/items/lucky-clover",
        description: "A sample legendary target worth planning around.",
        type: "item",
      },
      {
        title: "Weather Machine item guide",
        href: "/items/weather-machine",
        description: "A high-value utility item with strong tracking appeal.",
        type: "item",
      },
      {
        title: "Legacy rare items guide",
        href: "/how-to-get-rare-items",
        description: "Existing long-form page kept live for legacy coverage.",
        type: "legacy",
      },
    ],
  },
];

export const items: ItemContent[] = [
  {
    kind: "item",
    slug: "lucky-clover",
    title: "Lucky Clover",
    description:
      "Lucky Clover is a legendary Garden Horizons item worth tracking for players who want stronger value from rare stock windows and special opportunities.",
    intro:
      "Lucky Clover is the kind of item players talk about because it feels instantly special when it appears. Whether you want it for progression, rarity, or collection value, the biggest challenge is spotting it in time.",
    updatedAt: "2026-03-10",
    rarity: "Legendary",
    sourceShop: "Traveling Merchant and rare stock windows",
    whyItMatters:
      "Players want Lucky Clover because it sits in the sweet spot between prestige and practical value. It is one of the most memorable legendary pickups, so many players keep it on a permanent watchlist.",
    howHardItIsToGet: "Hard - rare appearance, short decision window, and easy to miss if you are not watching the board.",
    trackingTips: [
      "Keep Lucky Clover in your tracker watchlist all session long",
      "Avoid spending your reserve right before merchant or rare rotations",
      "Check item source updates alongside merchant status rather than seeds alone",
    ],
    sections: [
      {
        title: "Why Lucky Clover is worth a slot on your watchlist",
        body: [
          "Not every legendary deserves constant attention, but Lucky Clover does because it is both recognizable and easy to regret missing.",
          "If your goal is building a meaningful rare-item collection, this is one of the first names that should stand out on the board.",
        ],
      },
      {
        title: "Best timing strategy",
        body: [
          "Treat Lucky Clover like a planned purchase, not a surprise purchase. Stay liquid, keep your tracker open, and react immediately when the right source goes live.",
        ],
        bullets: [
          "Watch merchant activity closely",
          "Do not waste currency on low-impact filler items",
          "Use reset periods to decide whether this is your top target",
        ],
      },
      {
        title: "Common mistake",
        body: [
          "Players often know Lucky Clover is rare but fail to prepare for its arrival. The issue is usually not awareness; it is timing and budget discipline.",
        ],
      },
    ],
    faq: [
      {
        question: "Is Lucky Clover one of the rarest items in Garden Horizons?",
        answer:
          "It is widely treated as a legendary-tier target and is valuable enough that many players keep it on a long-term watchlist.",
      },
      {
        question: "Where should I track Lucky Clover?",
        answer:
          "Follow the live tracker and pay special attention to the item source notes and merchant activity rather than relying on manual in-game checks alone.",
      },
    ],
    relatedLinks: [
      {
        title: "How to get rare items fast",
        href: "/guides/how-to-get-rare-items-fast",
        description: "Use Lucky Clover as your rare-item planning example.",
        type: "guide",
      },
      {
        title: "Gear category hub",
        href: "/categories/gear",
        description: "Compare legendary priorities against utility purchases.",
        type: "category",
      },
      {
        title: "Legendary items legacy page",
        href: "/legendary-items",
        description: "Older overview page still worth keeping indexed for broader legendary queries.",
        type: "legacy",
      },
    ],
  },
  {
    kind: "item",
    slug: "weather-machine",
    title: "Weather Machine",
    description:
      "Weather Machine is a high-value Garden Horizons item that players track for utility, progression planning, and late-game stock efficiency.",
    intro:
      "Weather Machine is one of those items that feels bigger than a normal purchase. Players chase it because it looks premium, sounds powerful, and can shape how they plan later upgrades.",
    updatedAt: "2026-03-10",
    rarity: "Legendary",
    sourceShop: "Rare gear rotations and premium stock opportunities",
    whyItMatters:
      "This item matters because it represents utility, prestige, and timing pressure all at once. It is the type of purchase advanced players keep saving for while newer players debate whether to buy now or keep farming.",
    howHardItIsToGet: "Hard - appears infrequently and usually requires both currency and confidence to buy immediately.",
    trackingTips: [
      "Check gear resets first when you are in utility-upgrade mode",
      "Keep a separate reserve for late-game tool purchases",
      "Use the tracker to compare Weather Machine against other legendary appearances before spending",
    ],
    sections: [
      {
        title: "Why players chase Weather Machine",
        body: [
          "Weather Machine stands out because it feels like a serious progression item rather than just a collectible. That makes it especially useful for players who are already stable and want stronger utility purchases.",
        ],
      },
      {
        title: "When it makes sense to buy",
        body: [
          "If buying Weather Machine would wipe out your ability to react to seed or core gear needs, it may be too early. But if your farm loop is solid, this becomes a strong target worth planning for.",
        ],
        bullets: [
          "Buy when your base setup is already stable",
          "Skip if the purchase breaks your next two upgrades",
          "Use the live board to compare it with immediate alternatives",
        ],
      },
      {
        title: "Tracking mindset",
        body: [
          "Do not depend on luck. Treat Weather Machine as a scheduled hunt. Watch gear windows, maintain currency discipline, and keep one-click awareness through the tracker.",
        ],
      },
    ],
    faq: [
      {
        question: "Is Weather Machine worth tracking early game?",
        answer:
          "Usually it is better as a medium- or late-game target. Early players often get more value from reliable seeds and core tools first.",
      },
      {
        question: "What category should I watch for Weather Machine?",
        answer:
          "Prioritize the gear view on the tracker and keep an eye on rare utility rotations so you can react before the item disappears.",
      },
    ],
    relatedLinks: [
      {
        title: "Best seeds to buy early game",
        href: "/guides/best-seeds-to-buy-early-game",
        description: "Decide whether Weather Machine is a now purchase or a later goal.",
        type: "guide",
      },
      {
        title: "Gear category hub",
        href: "/categories/gear",
        description: "See how Weather Machine fits the broader tool progression path.",
        type: "category",
      },
      {
        title: "Traveling Merchant legacy page",
        href: "/traveling-merchant",
        description: "Older merchant explainer kept live for related search intent.",
        type: "legacy",
      },
    ],
  },
];

export const categories: CategoryContent[] = [
  {
    kind: "category",
    slug: "seeds",
    title: "Garden Horizons Seeds Guide",
    description:
      "Browse the Garden Horizons seeds category with starter advice, featured seed targets, and tracker-based tips for catching high-value restocks.",
    intro:
      "Seeds are the foundation of progression in Garden Horizons. The right seed choices help you build income, while the wrong ones leave you waiting for the next good reset with no budget left.",
    updatedAt: "2026-03-10",
    heroSummary:
      "Use the seeds hub to separate dependable early-game buys from rarer long-term targets, then watch the tracker for the right timing.",
    selectionTips: [
      "Prioritize seeds that fit your current budget and farming loop",
      "Use rare seed pages as goals, not mandatory instant purchases",
      "Check seed stock near each reset instead of buying out of boredom",
    ],
    featuredItems: [
      {
        name: "Golden Sunflower Seeds",
        slug: "golden-sunflower-seeds",
        rarity: "Legendary",
        reason: "A prestige seed target that signals when legendary stock rotations are worth watching.",
      },
      {
        name: "Lucky Clover",
        slug: "lucky-clover",
        rarity: "Legendary",
        reason: "A tracker-friendly rare target that often overlaps with high-interest rotations.",
      },
    ],
    sections: [
      {
        title: "How to think about seed value",
        body: [
          "The best seed is the one that improves your economy without wrecking your upgrade path. That usually means balancing consistency with the occasional high-upside chase.",
          "A live tracker helps because you can wait for better seeds instead of settling for whatever is in stock the moment you open the shop.",
        ],
      },
      {
        title: "Seed priorities by progression stage",
        body: [
          "Beginners should focus on dependable value and easier restocks. Mid-game players can start comparing higher-cost seeds against gear upgrades. Late-game players can afford to be more selective and hunt legendary stock windows.",
        ],
      },
      {
        title: "What to do between resets",
        body: [
          "Farm, collect currency, and keep one eye on the next timer. The best seed buyers are ready before the shop changes.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the best seed category strategy for beginners?",
        answer:
          "Start with dependable seeds that support steady income, then move into rarer targets once your tool setup and budget are healthier.",
      },
      {
        question: "Should I wait for legendary seeds?",
        answer:
          "Only if waiting does not stall your overall progression. Legendary seeds are great goals, but they should not replace practical early upgrades.",
      },
    ],
    relatedLinks: [
      {
        title: "Best seeds to buy early game",
        href: "/guides/best-seeds-to-buy-early-game",
        description: "Starter buying logic for your first serious seed decisions.",
        type: "guide",
      },
      {
        title: "How Garden Horizons stock works",
        href: "/guides/how-garden-horizons-stock-works",
        description: "See why timing matters so much for seed restocks.",
        type: "guide",
      },
      {
        title: "Garden Horizons item rarities",
        href: "/garden-horizons-item-rarities",
        description: "Legacy rarity explainer that still supports seed-value comparisons.",
        type: "legacy",
      },
    ],
  },
  {
    kind: "category",
    slug: "gear",
    title: "Garden Horizons Gear Guide",
    description:
      "A Garden Horizons gear hub covering tool priorities, high-impact upgrades, and how to use the tracker to catch rare utility items.",
    intro:
      "Gear is where efficiency starts to show. The right tool purchase can make every farming loop smoother, which is why gear resets deserve their own watch pattern.",
    updatedAt: "2026-03-10",
    heroSummary:
      "Track gear when you want cleaner progression, faster farming loops, and fewer wasted resets on low-impact tool buys.",
    selectionTips: [
      "Pick tools that support your current farming bottleneck",
      "Compare legendary utility items against two or three smaller upgrades",
      "Keep currency ready because good gear windows can disappear fast",
    ],
    featuredItems: [
      {
        name: "Weather Machine",
        slug: "weather-machine",
        rarity: "Legendary",
        reason: "A marquee utility target for players watching premium gear restocks.",
      },
      {
        name: "Lucky Clover",
        slug: "lucky-clover",
        rarity: "Legendary",
        reason: "Useful as a watchlist example when planning rare-item budgets against gear needs.",
      },
    ],
    sections: [
      {
        title: "Why gear changes progression faster than cosmetics",
        body: [
          "Gear upgrades tend to influence how efficiently you farm, collect, or react to the next reset. That makes them far more important than cosmetic pickups during active progression.",
        ],
      },
      {
        title: "How to prioritize tools",
        body: [
          "Look at the friction in your current routine. If watering, harvesting, or general garden upkeep feels slow, your next gear purchase should solve that problem first.",
        ],
        bullets: [
          "Fix your biggest slowdown before chasing prestige",
          "Use the watchlist for one or two gear targets at a time",
          "Check whether a legendary purchase delays your core loop",
        ],
      },
      {
        title: "Build a gear watch routine",
        body: [
          "Open the gear tab before each reset, glance at merchant status if relevant, and compare the current board with your upgrade path. The goal is cleaner decisions, not more random shopping.",
        ],
      },
    ],
    faq: [
      {
        question: "What gear should I watch first in Garden Horizons?",
        answer:
          "Start with the tool that removes your biggest farming bottleneck, then branch into rare utility items once your basic loop feels stable.",
      },
      {
        question: "Is legendary gear always better than seed upgrades?",
        answer:
          "Not automatically. If a legendary tool delays important seed progression, the better move can still be the cheaper improvement.",
      },
    ],
    relatedLinks: [
      {
        title: "Weather Machine item guide",
        href: "/items/weather-machine",
        description: "Deep dive on one of the strongest gear-watch targets.",
        type: "item",
      },
      {
        title: "When does stock reset?",
        href: "/guides/when-does-garden-horizons-stock-reset",
        description: "Timing guide for catching better gear windows.",
        type: "guide",
      },
      {
        title: "Traveling Merchant legacy page",
        href: "/traveling-merchant",
        description: "Legacy support page for merchant-related tool searches.",
        type: "legacy",
      },
    ],
  },
];

export const legacyContentAudit = [
  {
    path: "/beginner-guide",
    intent: "Beginner how-to guide",
    action: "Keep and later align with guide template",
    notes: "Useful entry-level query target. Needs FAQ, related links, and stronger link-back into new guides/categories.",
  },
  {
    path: "/blog/how-often-garden-horizons-shop-updates",
    intent: "Stock timing explainer",
    action: "Keep and de-duplicate against new reset guides",
    notes: "Likely overlaps with stock timing queries. Canonical/positioning review recommended after traffic data check.",
  },
  {
    path: "/garden-horizons-item-rarities",
    intent: "Rarity explainer",
    action: "Keep and connect to category/item hubs",
    notes: "Good support page for rarity intent. Avoid creating another general rarity page.",
  },
  {
    path: "/grow-a-garden-stock-tracker",
    intent: "Alternate core tracker query",
    action: "Keep as legacy support page",
    notes: "Close to homepage positioning. Review canonical later, but do not redirect now.",
  },
  {
    path: "/how-to-get-rare-items",
    intent: "Rare items guide",
    action: "Keep and distinguish from new guide",
    notes: "Make legacy page broader and let new guide target faster actionable intent.",
  },
  {
    path: "/legendary-items",
    intent: "Legendary item overview",
    action: "Keep as supporting collection page",
    notes: "Useful for entity-list intent. Feed traffic into individual item pages.",
  },
  {
    path: "/traveling-merchant",
    intent: "Merchant explainer",
    action: "Keep and strengthen internal links",
    notes: "Still valuable for merchant intent and could later evolve into guide/category support page.",
  },
];

export function getGuide(slug: string) {
  return guides.find((entry) => entry.slug === slug);
}

export function getItem(slug: string) {
  return items.find((entry) => entry.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((entry) => entry.slug === slug);
}

function formatPageTitle(title: string) {
  return `${title} | ${SITE_NAME}`;
}

export function buildMetadata(page: BaseContent, path: string): Metadata {
  return {
    title: formatPageTitle(page.title),
    description: page.description,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: {
      title: formatPageTitle(page.title),
      description: page.description,
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: formatPageTitle(page.title),
      description: page.description,
    },
  };
}

export function buildFaqSchema(faq: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };
}

export function buildPageSchema(page: GuideContent | ItemContent | CategoryContent, path: string) {
  const base = {
    "@context": "https://schema.org",
    "@type": page.kind === "guide" ? "Article" : "WebPage",
    name: page.title,
    description: page.description,
    url: `${SITE_URL}${path}`,
    dateModified: page.updatedAt,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  if (page.kind === "item") {
    return {
      ...base,
      about: {
        "@type": "Thing",
        name: page.title,
        additionalType: page.rarity,
      },
    };
  }

  return base;
}

export function buildBreadcrumbSchema(content: PageContent, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tracker", item: "https://gardenhorizonstocknotifier.com/" },
      { "@type": "ListItem", position: 2, name: `${content.kind}s`, item: `https://gardenhorizonstocknotifier.com/${content.kind}s` },
      { "@type": "ListItem", position: 3, name: content.title, item: `https://gardenhorizonstocknotifier.com${path}` },
    ],
  };
}

// Slug uniqueness validation
function validateSlugUniqueness() {
  const allSlugs = new Map<string, string>();

  [...guides, ...items, ...categories].forEach((content) => {
    const existing = allSlugs.get(content.slug);
    if (existing) {
      throw new Error(
        `Duplicate slug: "${content.slug}" in ${existing} and ${content.kind}`
      );
    }
    allSlugs.set(content.slug, content.kind);
  });
}

// RelatedLinks validation
function validateRelatedLinks() {
  const validPaths = new Set<string>();

  guides.forEach(g => validPaths.add(`/guides/${g.slug}`));
  items.forEach(i => validPaths.add(`/items/${i.slug}`));
  categories.forEach(c => validPaths.add(`/categories/${c.slug}`));

  const errors: string[] = [];

  [...guides, ...items, ...categories].forEach((content) => {
    content.relatedLinks.forEach((link) => {
      if (link.type !== "legacy" && !validPaths.has(link.href)) {
        errors.push(`Invalid link in ${content.kind} "${content.slug}": ${link.href}`);
      }
    });
  });

  if (errors.length > 0) {
    console.warn("⚠️ RelatedLinks validation warnings:");
    errors.forEach(err => console.warn(`  - ${err}`));
  }
}

if (process.env.NODE_ENV === "development") {
  validateSlugUniqueness();
  validateRelatedLinks();
}
