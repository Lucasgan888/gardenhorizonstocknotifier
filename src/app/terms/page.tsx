import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Garden Horizons Stock Notifier",
  description: "Terms of service for Garden Horizons Stock Notifier.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 prose prose-invert prose-green">
      <h1 className="text-3xl font-bold text-green-500">Terms of Service</h1>
      <p>Last updated: February 2026</p>
      <h2>Acceptance of Terms</h2>
      <p>By accessing and using Garden Horizons Stock Notifier, you agree to these terms of service.</p>
      <h2>Description of Service</h2>
      <p>Garden Horizons Stock Notifier is a free online tool that tracks in-game item availability. The service is provided &quot;as is&quot; without warranties of any kind.</p>
      <h2>User Conduct</h2>
      <p>You agree to use the service only for lawful purposes and in accordance with these terms.</p>
      <h2>Intellectual Property</h2>
      <p>Not affiliated with Roblox Corporation or Garden Horizons developers. The website code and design are original works.</p>
      <h2>Limitation of Liability</h2>
      <p>We shall not be liable for any damages arising from the use of this service.</p>
      <h2>Changes to Terms</h2>
      <p>We reserve the right to modify these terms at any time.</p>
    </div>
  );
}
