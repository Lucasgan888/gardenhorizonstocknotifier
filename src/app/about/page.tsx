import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Garden Horizons Stock Notifier",
  description: "Learn about Garden Horizons Stock Notifier, a free real-time Roblox item stock tracker.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 prose prose-invert prose-green">
      <h1 className="text-3xl font-bold text-green-500">About Garden Horizons Stock Notifier</h1>
      <p>
        Welcome to Garden Horizons Stock Notifier, a free real-time stock tracking tool for the popular
        Roblox game Garden Horizons. We help players track item availability, catch rare seeds and tools,
        and never miss a stock rotation.
      </p>
      <h2>Our Mission</h2>
      <p>
        Garden Horizons rotates its shop inventory every 5 minutes, making it nearly impossible to catch
        rare Legendary items without help. We built this tracker so every player has a fair chance at
        getting the items they want.
      </p>
      <h2>How It Works</h2>
      <p>
        Our system monitors Garden Horizons stock rotations and displays the current inventory in real-time.
        Filter by category, rarity, or search for specific items. Check the countdown timer to know exactly
        when the next rotation happens.
      </p>
      <h2>Disclaimer</h2>
      <p>
        This is a fan-made tool and is not affiliated with Roblox Corporation or the Garden Horizons developers.
      </p>
    </div>
  );
}
