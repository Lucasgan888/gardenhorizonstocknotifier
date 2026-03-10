import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Garden Horizons Stock Notifier",
  description: "Privacy policy for Garden Horizons Stock Notifier.",
};

import { LegacyPageWrapper } from "@/components/legacy-wrapper";

export default function PrivacyPage() {
  return (
    <LegacyPageWrapper 
      title="Privacy Protocol" 
      subtitle="Documentation regarding data telemetry, sensor logs, and user security within the Garden Horizons Notifier sector."
      category="Governance"
      breadcrumbTitle="Privacy"
    >
      <section>
        <h2>Data Collection Policy</h2>
        <p>
          The Garden Horizons Stock Notifier is engineered as a client-side instrument. All botanical data 
          processing occurs locally within your browser terminal. We do not aggregate, store, or 
          transmit personally identifiable information.
        </p>
      </section>

      <section>
        <h2>Telemetry Analytics</h2>
        <p>
          We utilize minimal, privacy-centric analytics (GA4) to monitor general system utilization 
          patterns. This data provides high-level telemetry on traffic frequency and does not 
          compromise individual operative security.
        </p>
      </section>

      <section>
        <h2>Cookie Utilization</h2>
        <p>
          Essential cookies may be deployed to maintain your terminal preferences (e.g., watchlist filters). 
          No invasive tracking beacons are active within this domain.
        </p>
      </section>

      <section>
        <h2>Third-Party Nodes</h2>
        <p>
          External display nodes (advertisements) may operate under their own independent privacy 
          protocols. Check their specific documentation for further intelligence.
        </p>
      </section>
    </LegacyPageWrapper>
  );
}
