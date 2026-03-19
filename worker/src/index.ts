type StockItem = {
  name: string;
  quantity: number;
  emoji: string;
};

type CategoryStock = {
  items: StockItem[];
  countdown: string | null;
  status?: string;
  appearIn?: string;
  merchantName?: string;
};

type UpstreamWeather = {
  type: string;
  effects: string[];
  active: boolean;
  color?: string;
};

type UpstreamItem = {
  name: string;
  quantity: number;
};

type UpstreamResponse = {
  lastUpdate?: string;
  nextUpdate?: string;
  isStale?: boolean;
  weather?: UpstreamWeather;
  seeds?: UpstreamItem[];
  gear?: UpstreamItem[];
};

type WorkerStockPayload = {
  updated_at: string;
  meta: {
    state: "live" | "stale" | "error";
    stale: boolean;
    source: string;
    cached_at: string;
    next_update_at: string | null;
    weather: UpstreamWeather | null;
    error?: string;
  };
  data: {
    seed: CategoryStock;
    egg: CategoryStock;
    gear: CategoryStock;
    honey: CategoryStock;
    cosmetics: CategoryStock;
    travelingmerchant: CategoryStock;
  };
};

type Env = {
  STOCK_KV: KVNamespace;
  STOCK_SOURCE_URL?: string;
};

const CACHE_KEY = "latest";
const CACHE_TTL_SECONDS = 60 * 10;
const FRESH_CACHE_MS = 55 * 1000;
const DEFAULT_SOURCE_URL = "https://gardenhorizonslivestock.com:3010/api/data";
const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "Access-Control-Allow-Origin": "*",
};

function createEmptyPayload(state: "error" | "stale" = "error", error?: string): WorkerStockPayload {
  return {
    updated_at: new Date().toISOString(),
    meta: {
      state,
      stale: state !== "live",
      source: "unavailable",
      cached_at: new Date().toISOString(),
      next_update_at: null,
      weather: null,
      error,
    },
    data: {
      seed: { items: [], countdown: null },
      egg: { items: [], countdown: null },
      gear: { items: [], countdown: null },
      honey: { items: [], countdown: null },
      cosmetics: { items: [], countdown: null },
      travelingmerchant: { items: [], countdown: null, status: "unknown" },
    },
  };
}

function formatCountdown(nextUpdate: string | undefined): string | null {
  if (!nextUpdate) {
    return null;
  }

  const diffMs = new Date(nextUpdate).getTime() - Date.now();
  if (!Number.isFinite(diffMs) || diffMs <= 0) {
    return "0:00";
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function normalizeItems(items: UpstreamItem[] | undefined): StockItem[] {
  return (items ?? [])
    .filter((item) => Number(item.quantity) > 0)
    .map((item) => ({
      name: item.name,
      quantity: item.quantity,
      // Let the frontend remap known items to nicer icons.
      emoji: "❓",
    }));
}

function normalizePayload(upstream: UpstreamResponse, state: "live" | "stale", error?: string): WorkerStockPayload {
  const countdown = formatCountdown(upstream.nextUpdate);
  const cachedAt = new Date().toISOString();

  return {
    updated_at: upstream.lastUpdate ?? cachedAt,
    meta: {
      state,
      stale: state !== "live" || Boolean(upstream.isStale),
      source: "gardenhorizonslivestock-api",
      cached_at: cachedAt,
      next_update_at: upstream.nextUpdate ?? null,
      weather: upstream.weather ?? null,
      error,
    },
    data: {
      seed: {
        items: normalizeItems(upstream.seeds),
        countdown,
      },
      egg: {
        items: [],
        countdown: null,
      },
      gear: {
        items: normalizeItems(upstream.gear),
        countdown,
      },
      honey: {
        items: [],
        countdown: null,
      },
      cosmetics: {
        items: [],
        countdown: null,
      },
      travelingmerchant: {
        items: [],
        countdown: null,
        status: "unknown",
      },
    },
  };
}

async function readCache(env: Env): Promise<WorkerStockPayload | null> {
  const cached = await env.STOCK_KV.get(CACHE_KEY, "json");
  if (!cached || typeof cached !== "object") {
    return null;
  }

  return cached as WorkerStockPayload;
}

function isFresh(payload: WorkerStockPayload | null): boolean {
  if (!payload?.meta?.cached_at) {
    return false;
  }

  const cachedAt = new Date(payload.meta.cached_at).getTime();
  return Number.isFinite(cachedAt) && Date.now() - cachedAt < FRESH_CACHE_MS;
}

async function writeCache(env: Env, payload: WorkerStockPayload): Promise<void> {
  await env.STOCK_KV.put(CACHE_KEY, JSON.stringify(payload), {
    expirationTtl: CACHE_TTL_SECONDS,
  });
}

async function fetchUpstream(env: Env): Promise<WorkerStockPayload> {
  const sourceUrl = env.STOCK_SOURCE_URL || DEFAULT_SOURCE_URL;
  const response = await fetch(sourceUrl, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Upstream returned ${response.status}`);
  }

  const upstream = (await response.json()) as UpstreamResponse;
  return normalizePayload(upstream, "live");
}

function jsonResponse(payload: WorkerStockPayload, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: JSON_HEADERS,
  });
}

const workerHandler = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          ...JSON_HEADERS,
          "Access-Control-Allow-Methods": "GET, OPTIONS",
        },
      });
    }

    if (url.pathname === "/stock" || url.pathname === "/api/stock") {
      const cached = await readCache(env);

      if (isFresh(cached)) {
        return jsonResponse(cached!);
      }

      try {
        const fresh = await fetchUpstream(env);
        await writeCache(env, fresh);
        return jsonResponse(fresh);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown upstream error";

        if (cached) {
          const stalePayload: WorkerStockPayload = {
            ...cached,
            meta: {
              ...cached.meta,
              state: "stale",
              stale: true,
              error: message,
            },
          };

          return jsonResponse(stalePayload);
        }

        return jsonResponse(createEmptyPayload("error", message), 503);
      }
    }

    return new Response("Not found", { status: 404 });
  },

  async scheduled(_event: ScheduledEvent, env: Env): Promise<void> {
    try {
      const fresh = await fetchUpstream(env);
      await writeCache(env, fresh);
    } catch (error) {
      console.error("Scheduled fetch error:", error);
    }
  },
};

export default workerHandler;
