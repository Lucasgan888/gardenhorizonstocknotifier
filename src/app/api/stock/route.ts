import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const botUrl = process.env.DISCORD_BOT_URL || "http://localhost:3001/api/stock";
        const res = await fetch(botUrl, { cache: "no-store" });

        if (!res.ok) throw new Error(`Bot API error: ${res.status}`);

        const data = await res.json();
        return NextResponse.json(data);
    } catch (err) {
        console.error("Stock API error:", err);
        return NextResponse.json({ error: "Failed to fetch stock data" }, { status: 500 });
    }
}
