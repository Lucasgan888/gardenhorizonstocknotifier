import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Garden Horizons Stock Notifier",
  description: "Learn about Garden Horizons Stock Notifier, a free real-time Roblox item stock tracker.",
};

import { LegacyPageWrapper } from "@/components/legacy-wrapper";

export default function AboutPage() {
  return (
    <LegacyPageWrapper 
      title="Intelligence Operations" 
      subtitle="Learn about the Garden Horizons Stock Notifier mission, our real-time tracking architecture, and the team behind the field engine."
      category="About the Project"
    >
      <section>
        <h2>Our Mission</h2>
        <p>
          Welcome to the Garden Horizons Stock Notifier, the definitive field instrument for the popular
          Roblox botany experience. We specialize in synchronizing live shop telemetry to ensure every player 
          has a strategic advantage in the botanical exchange.
        </p>
      </section>

      <section>
        <h2>The Core Engine</h2>
        <p>
          Garden Horizons rotates its shop inventory every few minutes, making manual tracking of 
          <strong>Legendary</strong> assets nearly impossible. We engineered this terminal to bridge the gap 
          between the game servers and the player community, providing a fair chance at securing rare 
          growth stimulants and high-efficiency tools.
        </p>
      </section>

      <section>
        <h2>Operational Protocol</h2>
        <p>
          Our sensors monitor rotation headers and display current inventory in a tactical dashboard. 
          Through advanced filtering and watchlist protocols, we allow you to focus on your garden 
          while we handle the surveillance of the merchant network.
        </p>
      </section>

      <section>
        <p className="text-text-muted italic text-sm border-l-2 border-border-strong pl-4">
          Un-official fan-maintained instrument. No affiliation with Roblox Corporation or the original game developers.
        </p>
      </section>
    </LegacyPageWrapper>
  );
}
