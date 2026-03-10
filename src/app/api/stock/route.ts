import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        // Use Discord bot API (works on Vercel)
        const botUrl = process.env.DISCORD_BOT_URL || "http://localhost:3001/api/stock";
        const res = await fetch(botUrl, {
            cache: "no-store",
            next: { revalidate: 0 }
        });

        if (!res.ok) throw new Error(`Bot API error: ${res.status}`);

        const data = await res.json();
        return NextResponse.json(data);
    } catch (err) {
        console.error("Stock API error:", err);
        // Return empty data instead of error for better UX
        return NextResponse.json({
            updated_at: new Date().toISOString(),
            data: {
                seed: { items: [], countdown: null },
                egg: { items: [], countdown: null },
                gear: { items: [], countdown: null },
                honey: { items: [], countdown: null },
                cosmetics: { items: [], countdown: null },
                travelingmerchant: { items: [], countdown: null }
            }
        });
    }
}
