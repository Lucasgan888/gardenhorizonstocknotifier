import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Garden Horizons Stock Notifier",
  description: "Terms of service for Garden Horizons Stock Notifier.",
};

import { LegacyPageWrapper } from "@/components/legacy-wrapper";

export default function TermsPage() {
  return (
    <LegacyPageWrapper 
      title="Terms of Service" 
      subtitle="Operational agreement and legal framework for the utilization of the Garden Horizons Notifier terminal."
      category="Governance"
      breadcrumbTitle="Terms"
    >
      <section>
        <h2>Acceptance of Protocol</h2>
        <p>
          By accessing or utilizing the Garden Horizons Stock Notifier terminal, you acknowledge and agree 
           to these terms. If you do not agree to the operational parameters defined herein, you must 
           disconnect from the service immediately.
        </p>
      </section>

      <section>
        <h2>Service Definition</h2>
        <p>
          The Garden Horizons Stock Notifier is provided as a free, &quot;as-is&quot; instrument for monitoring 
          botanical shop rotations. We provide no warranty regarding data accuracy, system uptime, or 
          sensor latency.
        </p>
      </section>

      <section>
        <h2>Intellectual Property</h2>
        <p>
          Not affiliated with Roblox Corporation or Garden Horizons developers. The terminal code, design, 
          and field notebook aesthetic are original works. All game-related assets and trademarks are the 
          property of their respective owners.
        </p>
      </section>

      <section>
        <h2>Limitation of Liability</h2>
        <p>
          We shall not be held liable for missed shop rotations, lost coins, or any in-game strategic 
          failures resulting from the use or misuse of this telemetry data. Use the terminal as a 
          supplementary instrument at your own risk.
        </p>
      </section>

      <section>
        <h2>Protocol Modifications</h2>
        <p>
          We reserve the right to update these service terms and operational protocols at any time without 
          prior notification.
        </p>
      </section>
    </LegacyPageWrapper>
  );
}
