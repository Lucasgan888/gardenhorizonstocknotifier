import Link from "next/link";
import type { CategoryContent, GuideContent, ItemContent } from "@/lib/content";
import { buildBreadcrumbSchema, buildFaqSchema, buildPageSchema } from "@/lib/content";

type PageContent = GuideContent | ItemContent | CategoryContent;

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function RelatedLinks({ links }: { links: PageContent["relatedLinks"] }) {
  return (
    <section className="rounded-3xl border border-border-subtle bg-surface p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-text-primary">Related reads</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-2xl border border-border-subtle bg-background/60 p-4 transition hover:border-accent/40 hover:bg-surface-alt"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">{link.type}</p>
            <p className="mt-2 text-base font-semibold text-text-primary">{link.title}</p>
            <p className="mt-2 text-sm leading-6 text-text-secondary">{link.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function FaqBlock({ faq }: { faq: PageContent["faq"] }) {
  return (
    <section className="rounded-3xl border border-border-subtle bg-surface p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-text-primary">FAQ</h2>
      <div className="mt-5 space-y-4">
        {faq.map((entry) => (
          <div key={entry.question} className="rounded-2xl border border-border-subtle bg-background/50 p-4">
            <h3 className="text-base font-semibold text-text-primary">{entry.question}</h3>
            <p className="mt-2 text-sm leading-6 text-text-secondary">{entry.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TrackerCta({ pageType }: { pageType: string }) {
  const anchorText = pageType === "guide" ? "live tracker for this guide" : pageType === "item" ? "live tracker for this item" : "live tracker";
  return (
    <section className="rounded-3xl border border-accent/25 bg-accent-soft/10 p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Back to tracker</p>
      <h2 className="mt-2 text-2xl font-bold text-text-primary">Watch the next stock window live</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-text-secondary">
        Keep the live board open while you read so you can jump on seed, gear, or merchant rotations as soon as they change.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link href="/" className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-black transition hover:bg-accent-hover">
          Open {anchorText}
        </Link>
        <Link href="/faq" className="rounded-full border border-border-strong px-5 py-3 text-sm font-semibold text-text-primary transition hover:border-accent/40 hover:text-accent">
          Read stock FAQ
        </Link>
      </div>
    </section>
  );
}

export function GuidePageTemplate({ guide }: { guide: GuideContent }) {
  return (
    <ContentShell content={guide} path={`/guides/${guide.slug}`}>
      <div className="grid gap-4 md:grid-cols-3">
        {guide.quickFacts.map((fact) => (
          <div key={fact.label} className="rounded-2xl border border-border-subtle bg-background/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-text-muted">{fact.label}</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-text-primary">{fact.value}</p>
          </div>
        ))}
      </div>
    </ContentShell>
  );
}

export function ItemPageTemplate({ item }: { item: ItemContent }) {
  return (
    <ContentShell content={item} path={`/items/${item.slug}`}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Rarity" value={item.rarity} />
        <StatCard label="Source" value={item.sourceShop} />
        <StatCard label="Difficulty" value={item.howHardItIsToGet} />
        <StatCard label="Why players care" value={item.whyItMatters} />
      </div>
      <section className="rounded-3xl border border-border-subtle bg-surface p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-text-primary">Tracking tips</h2>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-text-secondary">
          {item.trackingTips.map((tip) => (
            <li key={tip} className="rounded-2xl border border-border-subtle bg-background/50 px-4 py-3">{tip}</li>
          ))}
        </ul>
      </section>
    </ContentShell>
  );
}

export function CategoryPageTemplate({ category }: { category: CategoryContent }) {
  return (
    <ContentShell content={category} path={`/categories/${category.slug}`}>
      <section className="rounded-3xl border border-border-subtle bg-surface p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-text-primary">How to choose from this category</h2>
        <p className="mt-3 text-sm leading-6 text-text-secondary">{category.heroSummary}</p>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-text-secondary">
          {category.selectionTips.map((tip) => (
            <li key={tip} className="rounded-2xl border border-border-subtle bg-background/50 px-4 py-3">{tip}</li>
          ))}
        </ul>
      </section>
      <section className="rounded-3xl border border-border-subtle bg-surface p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-text-primary">Featured items to watch</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {category.featuredItems.map((entry) => (
            <Link
              key={entry.slug}
              href={entry.slug === "golden-sunflower-seeds" ? "/garden-horizons-item-rarities" : `/items/${entry.slug}`}
              className="rounded-2xl border border-border-subtle bg-background/60 p-4 transition hover:border-accent/40 hover:bg-surface-alt"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">{entry.rarity}</p>
              <p className="mt-2 text-lg font-semibold text-text-primary">{entry.name}</p>
              <p className="mt-2 text-sm leading-6 text-text-secondary">{entry.reason}</p>
            </Link>
          ))}
        </div>
      </section>
    </ContentShell>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border-subtle bg-background/60 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-text-muted">{label}</p>
      <p className="mt-2 text-sm font-semibold leading-6 text-text-primary">{value}</p>
    </div>
  );
}

function ContentShell({ content, path, children }: { content: PageContent; path: string; children?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <JsonLd data={buildPageSchema(content, path)} />
      <JsonLd data={buildBreadcrumbSchema(content, path)} />
      <JsonLd data={buildFaqSchema(content.faq)} />
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-text-muted">
        <Link href="/" className="transition hover:text-accent">Tracker</Link>
        <span>/</span>
        <span className="capitalize">{content.kind}s</span>
        <span>/</span>
        <span className="text-text-secondary">{content.title}</span>
      </nav>
      <header className="rounded-[2rem] border border-border-subtle bg-[radial-gradient(circle_at_top_left,rgba(74,222,128,0.16),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-8 shadow-md">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">{content.kind} page</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-extrabold tracking-tight text-text-primary md:text-5xl">{content.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-text-secondary">{content.intro}</p>
        <div className="mt-5 flex flex-wrap gap-4 text-sm text-text-muted">
          <span>Updated {content.updatedAt}</span>
          <span>Tracker-first content cluster</span>
        </div>
      </header>
      <div className="mt-8 space-y-8">
        {children}
        {content.sections.map((section) => (
          <section key={section.title} className="rounded-3xl border border-border-subtle bg-surface p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-text-primary">{section.title}</h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-text-secondary">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {section.bullets ? (
              <ul className="mt-4 space-y-3 text-sm leading-6 text-text-secondary">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="rounded-2xl border border-border-subtle bg-background/50 px-4 py-3">{bullet}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
        <TrackerCta pageType={content.kind} />
        <RelatedLinks links={content.relatedLinks} />
        <FaqBlock faq={content.faq} />
      </div>
    </div>
  );
}
