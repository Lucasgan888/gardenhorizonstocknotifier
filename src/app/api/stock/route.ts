import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const res = await fetch("https://gagstock.gleeze.com/grow-a-garden", {
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
        });

        if (!res.ok) {
            return NextResponse.json({ error: "Upstream API error" }, { status: 502 });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (err) {
        console.error("Stock API fetch error:", err);
        return NextResponse.json({ error: "Failed to fetch stock data" }, { status: 500 });
    }
}
