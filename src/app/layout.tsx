import Link from "next/link";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://gardenhorizonstocknotifier.com"),
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
    images: [
      {
        url: "/api/og?title=Garden%20Horizons%20Stock%20Notifier&desc=Live%20Stock%20Tracking%20Data",
        width: 1200,
        height: 630,
        alt: "Garden Horizons Stock Notifier",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Garden Horizons Stock Notifier",
    description: "Live Garden Horizons stock tracker. Never miss rare items again!",
    images: ["/api/og?title=Garden%20Horizons%20Stock%20Notifier&desc=Live%20Stock%20Tracking%20Data"],
  },
  alternates: { canonical: "https://gardenhorizonstocknotifier.com" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
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
      <body className="min-h-screen antialiased selection:bg-accent/30 selection:text-accent font-sans">
        <nav className="border-b border-border-strong/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-xl group-hover:rotate-12 transition-transform duration-300">🌱</span>
              <span className="font-bold text-lg text-green-500">Garden Horizons Stock Notifier</span>
            </Link>
            <div className="flex gap-6 text-sm text-gray-500">
              <Link href="/" className="hover:text-green-500 transition font-medium">Live Stock</Link>
              <Link href="/guides" className="hover:text-green-500 transition font-medium">Guides</Link>
              <Link href="/blog" className="hover:text-green-500 transition font-medium">Blog</Link>
              <Link href="/faq" className="hover:text-green-500 transition font-medium">FAQ</Link>
              <Link href="/about" className="hover:text-green-500 transition font-medium">About</Link>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="border-t border-border-strong/30 mt-24 py-16 bg-surface/30">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🌱</span>
                  <span className="font-bold text-green-500 text-base leading-tight">Garden Horizons<br />Stock Notifier</span>
                </div>
                <p className="text-xs text-gray-700 leading-5">
                  Free real-time Grow a Garden stock tracker. Never miss seeds, gear, eggs, or honey again.
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-500 mb-3 text-xs uppercase tracking-wider">Quick Links</p>
                <ul className="space-y-2 text-xs">
                  <li><Link href="/" className="hover:text-green-400 transition">🏠 Live Stock</Link></li>
                  <li><Link href="/beginner-guide" className="hover:text-green-400 transition">📚 Guides</Link></li>
                  <li><Link href="/blog" className="hover:text-green-400 transition">📝 Blog</Link></li>
                  <li><Link href="/about" className="hover:text-green-400 transition">ℹ️ About</Link></li>
                  <li><Link href="/privacy" className="hover:text-green-400 transition">🔒 Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-green-400 transition">📄 Terms of Service</Link></li>
                </ul>
              </div>
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
            <div className="border-t border-white/5 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-800">
              <p>© {new Date().getFullYear()} Garden Horizons Stock Notifier. All rights reserved.</p>
              <div className="flex gap-4">
                <Link href="/privacy" className="hover:text-gray-500 transition">Privacy</Link>
                <Link href="/terms" className="hover:text-gray-500 transition">Terms</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
