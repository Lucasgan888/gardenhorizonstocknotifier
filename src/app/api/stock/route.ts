import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const DEFAULT_STOCK_API_URL = "https://garden-stock-worker.lucasgan2021.workers.dev/stock";

function buildEmptyPayload(error: string) {
    return {
        updated_at: new Date().toISOString(),
        meta: {
            state: "error",
            stale: false,
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

export async function GET() {
    try {
        const stockUrl =
            process.env.STOCK_API_URL ||
            process.env.DISCORD_BOT_URL ||
            DEFAULT_STOCK_API_URL;

        const res = await fetch(stockUrl, {
            cache: "no-store",
            next: { revalidate: 0 }
        });

        const text = await res.text();
        const payload = text ? JSON.parse(text) : null;

        if (!res.ok) {
            return NextResponse.json(
                payload ?? buildEmptyPayload(`upstream_status_${res.status}`),
                { status: res.status }
            );
        }

        if (!payload) {
            return NextResponse.json(buildEmptyPayload("empty_upstream_response"), { status: 502 });
        }

        return NextResponse.json(payload);
    } catch (err) {
        console.error("Stock API error:", err);
        return NextResponse.json(
            buildEmptyPayload(err instanceof Error ? err.message : "stock_unavailable"),
            { status: 503 }
        );
    }
}
