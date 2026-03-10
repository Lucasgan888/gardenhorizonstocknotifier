# Content Audit - gardenhorizonstocknotifier.com

## Audit Date
2026-03-10

## Objective
Identify existing content pages, assess their role in the new information architecture, and determine which pages to keep, merge, or enhance.

## Existing Pages

### Core Pages (Keep as-is)
- `/` - Homepage with live stock tracker (primary conversion page)
- `/about` - About page
- `/privacy` - Privacy policy
- `/terms` - Terms of service
- `/faq` - General FAQ hub

### Content Pages (Legacy - Keep and Enhance)

#### `/beginner-guide`
- **Intent**: Beginner how-to guide
- **Action**: Keep and later align with guide template
- **Notes**: Useful entry-level query target. Needs FAQ, related links, and stronger link-back into new guides/categories.
- **Status**: ✅ Keep

#### `/blog/how-often-garden-horizons-shop-updates`
- **Intent**: Stock timing explainer
- **Action**: Keep and de-duplicate against new reset guides
- **Notes**: Likely overlaps with stock timing queries. Canonical/positioning review recommended after traffic data check.
- **Status**: ✅ Keep (monitor for duplication)

#### `/garden-horizons-item-rarities`
- **Intent**: Rarity explainer
- **Action**: Keep and connect to category/item hubs
- **Notes**: Good support page for rarity intent. Avoid creating another general rarity page.
- **Status**: ✅ Keep

#### `/grow-a-garden-stock-tracker`
- **Intent**: Alternate core tracker query
- **Action**: Keep as legacy support page
- **Notes**: Close to homepage positioning. Review canonical later, but do not redirect now.
- **Status**: ✅ Keep

#### `/how-to-get-rare-items`
- **Intent**: Rare items guide
- **Action**: Keep and distinguish from new guide
- **Notes**: Make legacy page broader and let new guide target faster actionable intent.
- **Status**: ✅ Keep (coexist with `/guides/how-to-get-rare-items-fast`)

#### `/legendary-items`
- **Intent**: Legendary item overview
- **Action**: Keep as supporting collection page
- **Notes**: Useful for entity-list intent. Feed traffic into individual item pages.
- **Status**: ✅ Keep

#### `/traveling-merchant`
- **Intent**: Merchant explainer
- **Action**: Keep and strengthen internal links
- **Notes**: Still valuable for merchant intent and could later evolve into guide/category support page.
- **Status**: ✅ Keep

## New Content Structure

### Guides (`/guides/[slug]`)
New dynamic route supporting:
- `how-garden-horizons-stock-works`
- `when-does-garden-horizons-stock-reset`
- `best-seeds-to-buy-early-game`
- `how-to-get-rare-items-fast`

### Items (`/items/[slug]`)
New dynamic route supporting:
- `lucky-clover`
- `weather-machine`

### Categories (`/categories/[slug]`)
New dynamic route supporting:
- `seeds`
- `gear`

## URL Conflicts
None identified. All new routes use distinct slugs that do not overlap with existing pages.

## Internal Linking Strategy
1. Homepage now links to 3 featured content entries (item/guide/category)
2. All new content pages include:
   - Breadcrumb navigation back to tracker
   - "Back to tracker" CTA section
   - Related links to other guides/items/categories
   - FAQ blocks with structured data
3. Legacy pages should be updated to link into new structure (future task)

## SEO Considerations
- Homepage H1 and core SEO structure preserved
- New pages use consistent metadata templates
- Sitemap updated to include all new routes
- Structured data (FAQPage, Article, WebPage) added to new pages
- No canonical conflicts identified

## Next Steps
1. ✅ Create content models and templates
2. ✅ Add dynamic routes for guides/items/categories
3. ✅ Update sitemap
4. ✅ Add homepage content entry blocks
5. ⏳ Verify build passes
6. 🔜 Monitor traffic and adjust legacy page positioning
7. 🔜 Add internal links from legacy pages to new structure
8. 🔜 Consider UI refresh (Antigravity handoff)

## Summary
- **Total existing pages**: 11 (including homepage, legal, FAQ, blog)
- **Pages kept**: All 11 (no deletions)
- **New routes added**: 3 dynamic routes (guides, items, categories)
- **New pages generated**: 8 (4 guides + 2 items + 2 categories)
- **Total indexed pages after update**: ~19
- **Risk level**: Low (additive only, no URL changes)
