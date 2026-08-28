# ai/ — research notes for workcomplouisiana.com

**This directory is intentionally near-empty.**

Until 2026-08-28 it contained five files (`QA.md`, `research/competitors.md`,
`research/design-system.md`, `research/keywords.json`, `research/topical-map.md`) that were
**not about this site at all** — every one of them was `dairy-insurance.com` research, carried
over wholesale when this site was scaffolded from that template. Measured before removal: 0
mentions of Louisiana, LWCC, New Orleans, or Baton Rouge across all five; 96 mentions of
dairy/cattle/livestock/milk/herd/manure.

They were removed rather than rewritten because replacing them would have meant **inventing**
keyword volumes, competitor analysis, and a topical map that nobody has actually researched for
this niche. A fabricated research file is worse than an absent one. They remain in git history
(removed in the "fix(content): purge dairy-farm template contamination" commit) if the dairy
site ever needs them back.

The same template carryover is what put dairy service types into the shipped JSON-LD schema in
`src/app/layout.tsx` — see that commit. If you scaffold another site from a template, check
`ai/` as well as `src/`.

**If real research is wanted for this site, it needs a genuine research pass** — Louisiana
workers' comp, LWCC, contractor/construction/restaurant/retail class codes. Don't backfill it
from another niche.
