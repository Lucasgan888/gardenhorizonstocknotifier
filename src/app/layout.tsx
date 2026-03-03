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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XWNM5789FE" />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XWNM5789FE');` }} />
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
      <body className="bg-[#080d08] text-gray-100 min-h-screen antialiased">
        <nav className="border-b border-white/5 bg-[#080d08]/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <span className="text-2xl">🌱</span>
              <span className="font-bold text-lg text-green-500">Garden Horizons Stock Notifier</span>
            </a>
            <div className="flex gap-4 text-sm text-gray-500">
              <a href="/" className="hover:text-green-500 transition">Live Stock</a>
              <a href="/about" className="hover:text-green-500 transition">About</a>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="border-t border-white/5 mt-16 py-10 text-sm text-gray-600 bg-black/20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🌱</span>
                  <span className="font-bold text-green-500 text-base leading-tight">Garden Horizons<br />Stock Notifier</span>
                </div>
                <p className="text-xs text-gray-700 leading-5">
                  Free real-time Grow a Garden stock tracker. Never miss seeds, gear, eggs, or honey again.
                </p>
              </div>
              {/* Quick links */}
              <div>
                <p className="font-semibold text-gray-500 mb-3 text-xs uppercase tracking-wider">Quick Links</p>
                <ul className="space-y-2 text-xs">
                  <li><a href="/" className="hover:text-green-400 transition">🏠 Live Stock</a></li>
                  <li><a href="/about" className="hover:text-green-400 transition">ℹ️ About</a></li>
                  <li><a href="/privacy" className="hover:text-green-400 transition">🔒 Privacy Policy</a></li>
                  <li><a href="/terms" className="hover:text-green-400 transition">📄 Terms of Service</a></li>
                </ul>
              </div>
              {/* Data source */}
              <div>
                <p className="font-semibold text-gray-500 mb-3 text-xs uppercase tracking-wider">Data Source</p>
                <p className="text-xs leading-5 text-gray-700">
                  Stock data provided by{" "}
                  <a
                    href="https://gagstock.gleeze.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 hover:text-green-500 transition underline underline-offset-2"
                  >
                    GAG Stock API
                  </a>
                  , auto-refreshed every 30 seconds.
                </p>
                <p className="text-xs mt-2 text-gray-800">
                  Unofficial fan-made tool. Not affiliated with Roblox Corporation or the game developers.
                </p>
              </div>
            </div>
            {/* Bottom bar */}
            <div className="border-t border-white/5 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-800">
              <p>© {new Date().getFullYear()} Garden Horizons Stock Notifier. All rights reserved.</p>
              <div className="flex gap-4">
                <a href="/privacy" className="hover:text-gray-500 transition">Privacy</a>
                <a href="/terms" className="hover:text-gray-500 transition">Terms</a>
              </div>
            </div>
          </div>
        </footer>
      </body>

    </html>
  );
}
