import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Garden Horizons Stock Notifier - Live Roblox Item Stock Tracker",
  description:
    "Free real-time Garden Horizons stock tracker. Get instant notifications when rare items, seeds, and tools are in stock. Live inventory updates every 5 minutes.",
  keywords:
    "garden horizons stock notifier, garden horizons stock, garden horizons roblox, garden horizons live stock, garden horizons inventory tracker, garden horizons seeds, roblox garden horizons",
  openGraph: {
    title: "Garden Horizons Stock Notifier - Live Roblox Item Stock Tracker",
    description: "Track Garden Horizons item stock in real-time. Free live inventory updates every 5 minutes.",
    url: "https://gardenhorizonstocknotifier.com",
    siteName: "Garden Horizons Stock Notifier",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Garden Horizons Stock Notifier",
    description: "Live Garden Horizons stock tracker. Never miss rare items again!",
  },
  alternates: { canonical: "https://gardenhorizonstocknotifier.com" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Garden Horizons Stock Notifier",
              url: "https://gardenhorizonstocknotifier.com",
              description: "Free real-time Garden Horizons Roblox item stock tracker and notifier",
              applicationCategory: "Game",
              operatingSystem: "Any",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            }),
          }}
        />
      </head>
      <body className="bg-gray-950 text-gray-100 min-h-screen antialiased">
        <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <span className="text-2xl">🌱</span>
              <span className="font-bold text-lg text-green-500">Garden Horizons Stock Notifier</span>
            </a>
            <div className="flex gap-4 text-sm text-gray-400">
              <a href="/" className="hover:text-green-500 transition">Live Stock</a>
              <a href="/about" className="hover:text-green-500 transition">About</a>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="border-t border-gray-800 mt-16 py-8 text-center text-sm text-gray-500">
          <div className="max-w-6xl mx-auto px-4">
            <div className="mb-6 p-4 border border-dashed border-gray-700 rounded text-gray-600 text-xs">
              Advertisement Space
            </div>
            <p>© {new Date().getFullYear()} Garden Horizons Stock Notifier. All rights reserved.</p>
            <div className="flex justify-center gap-4 mt-2">
              <a href="/privacy" className="hover:text-green-500 transition">Privacy</a>
              <a href="/terms" className="hover:text-green-500 transition">Terms</a>
            </div>
            <p className="mt-2 text-gray-600 text-xs">
              Not affiliated with Roblox Corporation or Garden Horizons developers.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
