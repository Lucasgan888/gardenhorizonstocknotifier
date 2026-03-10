import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Garden Horizons Traveling Merchant - Live Stock & Tips',
    description: 'Learn about the Garden Horizons Traveling Merchant, what they sell, and how to use our live stock tracker to catch their limited-time items.',
};

import { LegacyPageWrapper } from "@/components/legacy-wrapper";

export default function TravelingMerchantPage() {
    return (
        <LegacyPageWrapper 
            title="Nomadic Exchange Node" 
            subtitle="Intelligence on the Traveling Merchant: unpredictable stock, limited-time deployments, and strategic tracking protocols."
            category="Operational Manual"
            breadcrumbTitle="Merchant Guide"
        >
            <section>
                <h2>The Nomadic Variable</h2>
                <p>
                    The Traveling Merchant is the primary wild-card in the Garden Horizons economy. Unlike 
                    fixed exchange nodes, this unit appears at irregular intervals with inventory that 
                    often includes high-value or unique botanical assets. The volatility makes this unit 
                    the highest tracking priority for serious gardeners.
                </p>
            </section>

            <section>
                <h2>Inventory Profile</h2>
                <p>
                    Nomadic stock can include rare genetic samples (seeds), tier-2 tools, and classified 
                    cosmetic modifications not found in standard catalogs. Some acquisitions provide 
                    significant operational shortcuts, while others are purely for social-rank 
                    display.
                </p>
            </section>

            <section>
                <h2>Observation Blindspots</h2>
                <p>
                    Fixed NPCs offer stability; the Traveling Merchant offers opportunity. Unfortunately, 
                    this opportunity is ephemeral. If you only perform periodic manual checks, the probability 
                    of missing a high-value flip is statistically significant. Many operatives miss 
                    critical gear simply because they aren&apos;t monitoring the merchant tab.
                </p>
            </section>

            <section className="bg-accent/5 p-8 rounded-2xl border border-accent/20">
                <h2>Live Telemetry Integration</h2>
                <p>
                    Our Live Tracker monitors the Traveling Merchant unit with the same precision as fixed 
                    shops. By isolating merchant data into its own intelligence stream, you can observe 
                    inventory shifts remotely. When a high-tier asset is detected, you can initiate 
                    immediate deployment to the merchant&apos;s physical coordinates for acquisition.
                </p>
            </section>

            <section>
                <h2>Strategic Recommendations</h2>
                <p>
                    Define your acquisition targets before the merchant arrives. Conserve coins specifically 
                    for legendary nomadic stock. By combining terminal alerts with disciplined resource 
                    management, the Traveling Merchant shifts from an unpredictable variable to a 
                    reliable source of elite botanical assets.
                </p>
            </section>
        </LegacyPageWrapper>
    );
}
