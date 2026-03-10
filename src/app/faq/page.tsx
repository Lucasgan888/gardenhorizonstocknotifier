import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Garden Horizons Stock Notifier FAQ',
    description: 'Answers to common questions about using the Garden Horizons live stock tracker, data accuracy, refresh rates, and more.',
};

export default function FAQPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
            <nav className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-12 flex items-center gap-2">
                <Link href="/" className="hover:text-accent transition-colors">Home</Link>
                <span className="opacity-30">/</span>
                <span className="text-text-secondary">Archive</span>
            </nav>

            <article className="space-y-16">
                <header className="space-y-6 border-b border-border-strong pb-12">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Protocol Index</p>
                    <h1 className="text-4xl md:text-6xl font-black text-text-primary leading-tight font-serif italic">
                        Inquiry Archive
                    </h1>
                    <p className="text-lg text-text-secondary leading-relaxed max-w-2xl font-medium">
                        Comprehensive documentation on the Garden Horizons Stock Notifier mechanics, data telemetry, and operational protocols.
                    </p>
                </header>

                <div className="grid gap-8">
                    <section className="p-8 bg-surface/40 border border-border-strong rounded-3xl shadow-sm group hover:border-accent/30 transition-colors">
                        <h2 className="text-xl font-bold text-text-primary mb-3 font-serif italic group-hover:text-accent transition-colors">Is Garden Horizons Stock Notifier free?</h2>
                        <p className="text-text-secondary text-sm leading-relaxed font-medium">
                            The Stock Notifier is a community-funded instrument. Access is unrestricted: no fees, no registration, and no localized data harvesting required. Open the terminal and begin tracking instantly.
                        </p>
                    </section>

                    <section className="p-8 bg-surface/40 border border-border-strong rounded-3xl shadow-sm group hover:border-accent/30 transition-colors">
                        <h2 className="text-xl font-bold text-text-primary mb-3 font-serif italic group-hover:text-accent transition-colors">How often does the stock update?</h2>
                        <p className="text-text-secondary text-sm leading-relaxed font-medium">
                            Our sensors refresh precisely every 30 seconds to maintain parity with the Grow a Garden shop cycles. While game rotations typically occur in 5-minute windows, our telemetry ensures you see the flip the moment it happens.
                        </p>
                    </section>

                    <section className="p-8 bg-surface/40 border border-border-strong rounded-3xl shadow-sm group hover:border-accent/30 transition-colors">
                        <h2 className="text-xl font-bold text-text-primary mb-3 font-serif italic group-hover:text-accent transition-colors">Do I need to log in with my Roblox account?</h2>
                        <p className="text-text-secondary text-sm leading-relaxed font-medium">
                            Negating the need for authentication is a core design principle. The notifier operates on public server telemetry and does not interact with your Roblox account security or credentials.
                        </p>
                    </section>

                    <section className="p-8 bg-surface/40 border border-border-strong rounded-3xl shadow-sm group hover:border-accent/30 transition-colors">
                        <h2 className="text-xl font-bold text-text-primary mb-3 font-serif italic group-hover:text-accent transition-colors">Where does the stock data come from?</h2>
                        <p className="text-text-secondary text-sm leading-relaxed font-medium">
                            We maintain direct integration with the GAG Stock API. This provides a 100% verified feed of in-game inventory rotations. During game updates or server maintenance, minor latency may occur as systems re-synchronize.
                        </p>
                    </section>

                    <section className="p-8 bg-surface/40 border border-border-strong rounded-3xl shadow-sm group hover:border-accent/30 transition-colors">
                        <h2 className="text-xl font-bold text-text-primary mb-3 font-serif italic group-hover:text-accent transition-colors">Is this affiliated with Roblox or the developers?</h2>
                        <p className="text-text-secondary text-sm leading-relaxed font-medium italic">
                            Independent fan-maintained instrument. No official affiliation with Roblox Corporation or the developers of Garden Horizons. All intellectual property remains with the original creators.
                        </p>
                    </section>

                    <section className="p-8 bg-accent/5 border border-accent/20 rounded-3xl shadow-inner">
                        <h2 className="text-xl font-bold text-accent mb-3 font-serif italic">What is the rarest item to track?</h2>
                        <p className="text-text-secondary text-sm leading-relaxed font-medium">
                            Legendary assets like the <span className="text-rarity-legendary font-bold">Lucky Clover</span> and <span className="text-rarity-legendary font-bold">Weather Machine</span> are the highest priority. These appear infrequently and represent the primary use case for high-frequency live tracking.
                        </p>
                    </section>
                </div>

                <div className="pt-12 text-center pb-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-3 bg-accent hover:bg-accent-hover text-background font-black text-sm uppercase tracking-widest py-5 px-10 rounded-2xl shadow-lg transition-all transform hover:-translate-y-1"
                    >
                        <span>Access Live Tracking Terminal</span>
                        <span className="text-xl">→</span>
                    </Link>
                </div>
            </article>
        </div>
    );
}
