import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Garden Horizons Beginner Guide - Seeds, Tools, and Stock Timing',
    description: 'New to Garden Horizons? Learn the basics of farming, understanding shop stock rotation, and using a live stock tracker for a beginner’s advantage.',
};

import { LegacyPageWrapper } from "@/components/legacy-wrapper";

export default function BeginnerGuidePage() {
    return (
        <LegacyPageWrapper 
            title="Elementary Field Operations" 
            subtitle="New to the botany sector? Master the fundamentals of farming, shop rotations, and high-frequency stock tracking."
            category="Operational Manual"
            breadcrumbTitle="Beginner Guide"
        >
            <section>
                <h2>Initial Deployment</h2>
                <p>
                    Upon spawning into the Garden Horizons sector, your primary objective is mastering the 
                    botanical growth cycles. Focus on high-turnover, low-cost seeds to stabilize your coin 
                    flow. Experiment with field layouts to optimize watering coverage and harvest efficiency.
                </p>
            </section>

            <section>
                <h2>Exchange Mechanics</h2>
                <p>
                    The regional economy operates through several distinct exchange nodes (shops) selling 
                    botanical gear, genetic samples (seeds), and cosmetic modifications. Coins are the 
                    primary tender—allocate them with precision. Avoid low-impact acquisitions early on 
                    to conserve liquidity for high-tier telemetry equipment.
                </p>
            </section>

            <section>
                <h2>Rotation Intelligence</h2>
                <p>
                    Inventory at exchange nodes is not static. Rotations occur on a high-frequency schedule. 
                    A rotation might swap basic utility tools for rare, high-performance assets. Monitoring 
                    these &quot;flips&quot; is critical; checking the shops only occasionally leads to missed 
                    deployment windows for rare stock.
                </p>
            </section>

            <section className="bg-accent/5 p-6 rounded-2xl border border-accent/20">
                <h2>Phase 1: Terminal Utilization</h2>
                <p>
                    The Live Stock Notifier centralizes all node telemetry into a single tactical interface. 
                    As a new operative, use the terminal to wait for critical upgrades—such as specialized 
                    watering cans or harvesting blades—rather than settling for standard issue gear.
                </p>
            </section>

            <section>
                <h2>Upgrade Trajectory</h2>
                <p>
                    Establish a priority list for your botanical arsenal. Flag specific items in your 
                    watchlist to receive visual alerts when they enter the shop rotation. This focused 
                    approach prevents data fatigue and ensures you only deploy coins when the ROI is 
                    maximum.
                </p>
            </section>

            <section>
                <h2>Field Support</h2>
                <p>
                    Combine live terminal data with community intelligence from official Discord sectors. 
                    As you gain proficiency in identifying high-value botanical assets, refine your 
                    watchlist parameters to evolve from a novice gardener to an elite botanical engineer.
                </p>
            </section>
        </LegacyPageWrapper>
    );
}
