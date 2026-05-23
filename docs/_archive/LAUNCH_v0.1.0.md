# Launch checklist — @ng-brutalism/ui v0.1.0

Source of truth for the v0.1.0 launch. Decisions documented in [CONTEXT.md](./CONTEXT.md) and [docs/adr/](./docs/adr/). Compiled from the 2026-05-17 grilling session.

## Phase 1 — Rename (do BEFORE any new component code)
Every new file written under the old name is one more file to rename later.

- [x] `pnpm view @ng-brutalism/ui` confirms availability (verified 2026-05-17 ✓)
- [ ] `npm org create ng-brutalism` — register the npm org
- [x] Update `libs/ui/package.json` name → `@ng-brutalism/ui`
- [x] Find/replace `@ng-neo-brutalism/ui` → `@ng-brutalism/ui` across the repo
- [x] Rename all `@Component({ selector: 'neo-*' })` → `'nb-*'` (Card, Accordion, Marquee, ImageCard, etc.)
- [x] Update consumer templates (`apps/docs` examples)
- [ ] Rename GitHub repo → `ng-brutalism` (GitHub redirects the old URL automatically)
- [ ] Optional: rename workspace folder → `ng-brutalism-workspace`
- [x] Verify `pnpm build:ui` + `pnpm serve:docs` still work

Not changing: `Nb*` TypeScript prefix, `--nb-*` CSS variables.

## Phase 2 — New components (vertical slice; Dialog first)
Skeleton all four, wire end-to-end into the Showcase, THEN harden each based on integration findings.

- [x] **Dialog** — native `<dialog>` ([ADR-0001](./docs/adr/0001-dialog-native-element.md)). `isPlatformBrowser` SSR guard. Compound API: `NbDialog` / `NbDialogTrigger` / `NbDialogContent` / `NbDialogHeader` / `NbDialogTitle` / `NbDialogDescription` / `NbDialogFooter` / `NbDialogClose`.
- [x] **Textarea** — `textarea[nbTextarea]` directive, mirrors `NbInput`'s pattern + size variants.
- [x] **Badge** — `span[nbBadge]` directive, variants: default / secondary / success / warning / destructive.
- [x] **Avatar** — `nb-avatar` component, `[src]` / `[alt]` inputs, `<ng-content>` fallback slot for initials.
- [x] Wire all four into Showcase end-to-end (rough is acceptable here).
- [ ] Harden each based on what integration exposed (this is where polish lives).

## Phase 3 — Showcase sections (mounted at /showcase/portfolio inside apps/docs)

In scope:
- [x] Hero (Avatar + social icon buttons + skills `Marquee` + CTA `Button` → opens contact `Dialog`)
- [x] Navbar (desktop nav + theme toggle; no mobile hamburger)
- [x] About (alternating info cards: `Card` + `ImageCard`)
- [x] Skills grid (`Card` tiles with icon + label)
- [x] Projects (`ImageCard` + `Badge` chips + `Button` links to GitHub/external)
- [x] Contact dialog (`Dialog` + `Label` + `Input` + `Textarea` + `Button`, inline success message — no Toast)
- [x] Footer (plain markup — no Navbar primitive needed)

Explicitly out of scope: OpenLayers map, AI chatbot, mobile hamburger menu, loading screen. Do NOT build these.

## Phase 4 — Docs gate (Tier 1 only)

- [ ] Component pages for Dialog, Textarea, Badge, Avatar (1-line description + 1 runnable example + API table — same shape as existing pages)
- [ ] Installation page: `pnpm add @ng-brutalism/ui`, `provideNgBrutalism()` setup, styles import, Tailwind config snippet — verified against actual `dist/` output, not memory
- [ ] Theming page: CSS custom properties (`--nb-*`), density tokens, dark mode
- [ ] Homepage rewrite: pitch + install command + prominent CTA to `/showcase/portfolio` + GitHub link
- [ ] Verify existing 8 component pages (Button, Checkbox, Accordion, Card, ImageCard, Marquee, Input, Label) each have a working example + API table
- [ ] README at repo root (~50 lines): pitch + install + docs link + showcase link + v0.x contract line + license

Deferred to v0.2 (file as GitHub issues): per-component a11y notes, recipes/cookbook page, migration guide scaffolding, dedicated changelog page.

## Phase 5 — Pre-publish ops

- [ ] LICENSE file at repo root (MIT)
- [ ] `package.json` audit: `files`, `exports`, `peerDependencies`, `repository`, `homepage`, `keywords`, `license`
- [ ] One smoke test per new component (render + basic interaction — not full coverage)
- [ ] SSR smoke test for Dialog (Analog SSR renders the Showcase contact section without exception)
- [x] Deploy `apps/docs` to GitHub Pages at
  <https://ngbrutalism.khangtran.dev>; verify public URL renders + Showcase
  works in production
- [ ] `pnpm publish --dry-run` — verify entry points and `files` are correct
- [ ] GitHub repo settings: public, description, topics (`angular`, `ui-library`, `neo-brutalism`, `tailwind`, `signals`), pin docs URL in sidebar

## Phase 6 — Publish + announce

- [ ] `pnpm publish` (manual; revisit Changesets if release cadence justifies)
- [ ] LinkedIn post — **angle parked, maintainer will decide later**. Default recommendation if not revisited: dogfooding + visual lead, ~250 words, lead with portfolio screenshot, three links (portfolio / npm / GitHub), soft CTA. Post Tue/Wed morning local time, stay online ~4h to reply.
- [ ] Within 48h, echo to: r/angular (tech framing), dev.to (long-form), Twitter/X (short). Skip Hacker News.

## Explicit non-goals at v0.1.0

Filed as issues for v0.2+:
- Sheet, Tooltip, Sonner/Toast, Navigation Menu, Skeleton (UI components)
- Per-component accessibility documentation
- Recipes / cookbook
- Changesets release automation
- Analytics (Plausible/Umami)
- Contribution guide (write when first external PR arrives)
- Typewriter / animated text / IconButton / Typography presets (rejected entirely; hand-roll where needed)
