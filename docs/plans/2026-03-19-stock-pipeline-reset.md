# Garden Horizons Stock Pipeline Reset Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the current broken localhost -> Worker -> Next.js stock pipeline with one production-valid data flow, restore the homepage to real data mode, and clean up the accidental deployment/config drift.

**Architecture:** Keep the website frontend on Vercel/Next.js. Use one external stock source service that is actually reachable from production, ideally a Cloudflare Worker that fetches public upstream stock pages/APIs and caches normalized JSON in KV. Do not use a Discord bot unless it runs on a publicly reachable host and has real channel access.

**Tech Stack:** Next.js 16, React 19, SWR, Cloudflare Workers + KV, optional Node.js bot for local experiments only

---

### Task 1: Freeze The Broken Paths And Rotate Secrets

**Files:**
- Review: `worker/wrangler.jsonc`
- Review: `.env.local`
- Review: `discord-bot/.env`
- Review: `discord-bot/.env.example`
- Review: `.gitignore`

**Step 1: Revoke exposed secrets outside the repo**

Run in browser/dashboard:
- Revoke all Cloudflare API tokens that were pasted into chat or terminal history.
- Regenerate a fresh token only when deployment resumes.
- Rotate the Discord bot token if it was ever pasted or screen-shared.

Expected:
- Old tokens no longer work.
- New tokens are stored only in local secret stores, never in chat or tracked files.

**Step 2: Stop treating the current Worker as production-ready**

Confirm these facts:
- `worker/src/index.ts` fetches `http://localhost:3002/api/stock`
- That URL is only valid on the WSL machine, not inside Cloudflare's runtime
- The deployed Worker can only ever return stale KV data or empty fallback data

Expected:
- Team agrees current Worker deployment is not a valid production source.

**Step 3: Mark the bot path as experimental, not required**

Confirm these facts:
- `discord-bot/index.js` depends on channel access in external Discord servers
- The current bot logs `Missing Access`
- Without admin-approved channel access, the bot cannot become the main source

Expected:
- Bot stays optional until a legal/publicly reachable use case exists.

### Task 2: Choose One Production Data Architecture

**Files:**
- Modify: `src/app/api/stock/route.ts`
- Modify: `src/lib/stock.ts`
- Create: `worker/src/sources/wiki.ts`
- Create: `worker/src/sources/online.ts`
- Create: `worker/src/normalize.ts`
- Modify: `worker/src/index.ts`

**Step 1: Lock the target architecture**

Choose this architecture:
- Frontend: Vercel-hosted Next.js app
- Backend stock source: Cloudflare Worker
- Upstream inputs: public stock pages or public JSON APIs
- Contract: Worker returns the exact shape expected by `src/lib/stock.ts`

Expected:
- No `localhost` dependencies anywhere in the production path.

**Step 2: Define the normalized response shape once**

Target response contract:

```ts
type WorkerStockResponse = {
  updated_at: string;
  source: string;
  data: {
    seed: { items: Array<{ name: string; quantity: number; emoji?: string }>; countdown: string | null };
    egg: { items: Array<{ name: string; quantity: number; emoji?: string }>; countdown: string | null };
    gear: { items: Array<{ name: string; quantity: number; emoji?: string }>; countdown: string | null };
    honey: { items: Array<{ name: string; quantity: number; emoji?: string }>; countdown: string | null };
    cosmetics: { items: Array<{ name: string; quantity: number; emoji?: string }>; countdown: string | null };
    travelingmerchant: {
      items: Array<{ name: string; quantity: number; emoji?: string }>;
      countdown: string | null;
      status?: string;
      appearIn?: string;
      merchantName?: string;
    };
  };
};
```

Expected:
- Worker and Next route both agree on one canonical format.

**Step 3: Build the Worker around reachable public upstreams**

Implement:
- one fetcher per public source
- normalization layer
- priority/fallback selection
- KV cache with freshness timestamp

Expected:
- Worker succeeds without any dependence on WSL, localhost, or Discord permissions.

### Task 3: Remove The Homepage Maintenance Lock

**Files:**
- Modify: `src/app/page.tsx`
- Review: `src/lib/stock.ts`

**Step 1: Remove the hardcoded mock stock path**

Replace the current pattern:

```ts
const stock = mockStock;
const swrError = null;
const isLoading = false;
const isValidating = false;
```

With the real SWR usage:

```ts
const {
  data: stock,
  error: swrError,
  isLoading,
  isValidating,
  mutate,
} = useSWR("garden-stock", fetcher, {
  refreshInterval: 30000,
  revalidateOnFocus: true,
});
```

Expected:
- Homepage actually reflects `/api/stock`.
- UI can show loading, live, stale, and error states honestly.

**Step 2: Remove the fake maintenance copy**

Update homepage status text so it reflects real runtime state:
- loading
- live
- degraded/fallback
- unavailable

Expected:
- Users stop seeing "System Maintenance" when data is merely empty or stale.

### Task 4: Make `/api/stock` Honest

**Files:**
- Modify: `src/app/api/stock/route.ts`

**Step 1: Stop silently hiding upstream failures**

Current behavior:
- catches any error
- returns empty inventory with HTTP 200

Replace with:
- pass through real success payloads
- on failure return `503`
- include a lightweight error marker for the UI

Suggested pattern:

```ts
return NextResponse.json(
  { error: "stock_unavailable", updated_at: new Date().toISOString(), data: emptyData },
  { status: 503 },
);
```

Expected:
- Frontend can distinguish "no items in stock" from "backend is broken".

**Step 2: Use one env var name that matches reality**

Rename `DISCORD_BOT_URL` to something neutral, such as:
- `STOCK_API_URL`

Expected:
- The system stops implying the source must be a Discord bot.

### Task 5: Clean Up The Cloudflare Deployment Drift

**Files:**
- Review: `wrangler.jsonc`
- Review: `open-next.config.ts`
- Review: `next.config.ts`
- Review: `worker/wrangler.jsonc`
- Review: `worker/package.json`

**Step 1: Pick one Cloudflare usage mode**

Decide between:
- Vercel for website + Cloudflare Worker only for stock API
- Full OpenNext deployment of the whole Next.js app to Cloudflare

Recommended for this project right now:
- keep Vercel for website
- keep one separate Cloudflare Worker for stock API

Expected:
- No mixed deployment story.

**Step 2: Remove accidental overlap**

If Vercel remains primary:
- archive or revert root OpenNext deployment files that were added opportunistically
- keep only the Worker project for stock API

If OpenNext becomes primary:
- remove the separate `worker/` service and fold the stock logic into the main deployment

Expected:
- New contributors can tell what deploy command actually matters.

### Task 6: Decide The Fate Of `discord-bot/`

**Files:**
- Review: `discord-bot/index.js`
- Modify: `discord-bot/.env.example`
- Modify: `README.md`

**Step 1: Separate experiments from production**

Document one of these outcomes:
- `discord-bot/` is a local experiment only
- `discord-bot/` is a separately hosted internal tool
- `discord-bot/` is deprecated in favor of public-source scraping

Expected:
- Nobody assumes the bot is the live production backend.

**Step 2: If kept, document the real requirements**

Must state clearly:
- requires invited bot access
- requires `View Channels` and `Read Message History`
- cannot read official channels without admin approval

Expected:
- No more wasted setup time chasing a path that lacks permissions.

### Task 7: Fix The Unrelated Next.js 16 Runtime Errors

**Files:**
- Modify: `src/app/items/[slug]/page.tsx`
- Review: `src/app/guides/[slug]/page.tsx`
- Review: `src/app/categories/[slug]/page.tsx`

**Step 1: Update dynamic route params to Next 16 style**

Current pattern:

```ts
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const item = getItem(params.slug);
}

export default function ItemPage({ params }: { params: { slug: string } }) {
  const item = getItem(params.slug);
}
```

Target pattern:

```ts
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getItem(slug);
}

export default async function ItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getItem(slug);
}
```

Expected:
- Dev server stops spamming route errors unrelated to stock.

### Task 8: Verification Checklist

**Files:**
- Test: `src/app/api/stock/route.ts`
- Test: `worker/src/index.ts`
- Test: `src/app/page.tsx`

**Step 1: Verify the Worker directly**

Run:

```bash
curl https://<worker-domain>/stock
```

Expected:
- non-empty JSON when upstream is available
- explicit failure metadata when upstream is unavailable

**Step 2: Verify the Next.js proxy route**

Run:

```bash
curl http://localhost:3000/api/stock
```

Expected:
- same normalized shape as Worker
- no silent 200-empty-success on upstream failure

**Step 3: Verify the homepage**

Check:
- homepage uses SWR data, not mock data
- status badge changes with live/error state
- watchlist logic still works

**Step 4: Verify deployment docs**

Check:
- one deploy path for the site
- one deploy path for the stock API
- clear env var names and no leaked secrets

---

Plan complete and saved to `docs/plans/2026-03-19-stock-pipeline-reset.md`. Two execution options:

**1. Subagent-Driven (this session)** - implement task-by-task with review between each step.

**2. Parallel Session (separate)** - open a clean execution session and batch through the plan.
