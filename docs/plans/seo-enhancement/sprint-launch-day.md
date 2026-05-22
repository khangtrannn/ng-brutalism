# Sprint — Launch Week (2026-05-22 → 2026-05-26)

**Status:** Mutable. Cross items off as you ship them.

**Context for a fresh session reading this cold:**

This file is a launch-week execution plan for ng-brutalism, written after
the on-page entity-authority sprint (`sprint-entity-authority.md`) shipped
and deployed on 2026-05-22. GSC is still in "indexing: processing data" —
so V1/V2 verification from the prior sprint is gated.

This plan was re-shaped by **two grilling sessions on 2026-05-22**
(~14:30 ICT and ~16:00 ICT). Decisions from both are folded inline below;
see also the **Sprint thesis (revised)** and **Verification at 72h**
sections.

**Grilling session 2 (2026-05-22 ~16:00 ICT) — decisions folded in:**

- **Show HN deferred** from tonight to **Tuesday 2026-05-26 20:00 ICT.**
  Friday HN windows are weaker than Tue/Wed/Thu; the day-of-week swap is
  free EV. 72h verification window shifts to 2026-05-29.
- **Tonight (20:00–21:30)** becomes r/SideProject + rest. HN-content
  drafting (title, first comment, bracketed answers) moves to a dedicated
  Mon 2026-05-25 evening session.
- **Block 1 (awesome-angular) — three plan errors corrected:** section is
  "UI Libraries built on Tailwind CSS" (not "UI Components"), PR title
  convention is `docs: add ng-brutalism` (14/15 recent merged PRs use
  `docs:`, the `docs(ui):` precedent is the outlier), format is a single
  sentence with terminal period. Entry text drafted inline below.
- **Block 3a (schema) — Option A chosen** (clean entity boundaries):
  drop `AUTHOR_URL` from `SoftwareApplication.sameAs`; add `url:
  AUTHOR_URL` to `Person` and put X handle in `Person.sameAs` only. Code
  diff inline below.
- **Block 4 collapsed to bestofjs only.** OpenBase is defunct (empty HTTP
  response); JS.coach has no working submit flow. bestofjs timeline
  corrected to 1–4 weeks (not "days") based on issues #411 / #417 / #420
  closing in 8d / 26d / 19d.

**Sprint thesis (revised after grilling):**

This is a **brand-surface push that seeds long-term backlinks**, NOT a
week-1 ranking sprint.

- The week-1 verification (V1 LLM probes, V2 rank baseline at 72h)
  measures **entity recognition + indexing**, not backlink-driven rank
  movement. A no-history domain doesn't move rank on backlinks in 7 days.
- The two true dofollow backlinks (awesome-angular PR, bestofjs issue)
  take 2–4 weeks to translate into authority signal — they are the
  long-term play, not today's payoff.
- Today's measurable payoff: Reddit + HN brand surface, entity-graph
  signals (`sameAs`, schema), and direct referral traffic.

**Cross-references:**

- `PLAN.md` — original master SEO plan (2026-05-21), fully shipped
- `audit-2026-05-22.md` — frozen external SEO snapshot
- `sprint-entity-authority.md` — entity-authority remediation, 6/7 done

---

## Already done before this sprint started

- **r/Angular2 launch post** — posted ~3 hours before this file was written.
  - URL: <https://www.reddit.com/r/Angular2/comments/1tk7zd4/i_built_ngbrutalism_a_neobrutalist_angular_ui/>
  - This is the centerpiece brand-surface post for the launch day.
- **LinkedIn launch post** — posted same day.
  - URL: <https://www.linkedin.com/posts/khangtrann_angular-opensource-frontend-activity-7463287983379619840-NtZ5>
  - Voice/framing reference used to draft the X launch tweet.

## Done today (2026-05-22) — progress so far

- **Block 3a** — X profile updates + JSON-LD code change. ✅ shipped
  (commit exists on `main`; deploy is still pending unless already handled
  outside this checkout).
  See Block 3a below for the final copy used.
- **Block 8** — image alt audit. ✅ shipped locally on 2026-05-22.
  No missing meaningful alts found; tightened a few generic mascot/logo alts.

## Up next (in order)

1. **Deploy the schema changes** (gates everything Google-side).
2. **Block 3b** — GitHub repo description rewrite.
3. **Block 1** — open the awesome-angular PR (drafted, ready to submit).
4. **Block 4** — file the bestofjs issue (drafted, ready to submit).
5. **Block 3c/3d/3e** — GSC nudge, schema validators, partial LLM probes.
6. **Block 2** — reply to r/Angular2 comments.
7. **Block 5 (20:00 ICT)** — r/SideProject cross-post.

---

## Pending from previous sprint

- **SPRINT-3** — GitHub repo description rewrite. Manual GitHub web UI
  edit. ~3 min. See `sprint-entity-authority.md` SPRINT-3 for the proposed
  copy. Folded into Block 3 admin block below.

---

## Schedule (Fri 2026-05-22 → Tue 2026-05-26)

Execution order updated after grilling — **awesome-angular moved to the
front** to catch the active maintainer (`jdegand`) window today. Show HN
moved off Friday onto Tuesday (stronger day-of-week for HN).

**Today (Fri 2026-05-22):**

| Time | Block | Task | Mode |
|---|---|---|---|
| 15:00–15:45 | 1 | awesome-angular PR | Khang manual, Claude can draft |
| 15:45–16:00 | 2 | r/Angular2 engagement | Khang manual |
| 16:00–16:30 | 3 | Admin block (GSC + GitHub desc + schema + Twitter + LLM probes) | Khang manual |
| 16:30–16:45 | 4 | bestofjs issue (sole survivor of directory submissions) | Khang manual |
| 16:45–18:00 | — | Buffer / dinner prep | — |
| 20:00–21:00 | 5 | r/SideProject cross-post + first 45 min of comments | Khang manual |
| 21:00–    | — | Off | — |

**Sat–Sun (2026-05-23 → 2026-05-24):** rest / let awesome-angular + bestofjs sit.

**Mon (2026-05-25 evening):**

| Block | Task | Mode |
|---|---|---|
| 6 | Show HN content prep session — title pick + first comment draft + bracketed answers | Collaborative (grill-me) |

**Tue (2026-05-26 evening):**

| Time | Block | Task | Mode |
|---|---|---|---|
| 20:00–21:30 | 7 | Show HN post + first 90 min of comments | Khang manual |

**Background / async (anytime):**

| Block | Task | Mode |
|---|---|---|
| 8 | Image alt audit | Claude solo |

---

### Block 1 — awesome-angular PR (15:00–15:45)

**Crown jewel #1.** Dofollow, high-authority, permanent backlink.
Maintainer `jdegand` is actively merging (#2197 and #2198 on 2026-05-21,
plus multiple merges per day in the prior week). Submit now to catch the
next merge window.

**Section:** `### UI Libraries built on Tailwind CSS` (not "UI Components"
— that section doesn't exist; "UI Primitives" is also wrong because it's
for headless libs). Place alphabetically between `koala-ui` and
`Metronic`.

**Drafted entry (drop-in for the README):**

```markdown
* [ng-brutalism](https://github.com/khangtrannn/ng-brutalism) - Neo-brutalist Angular UI library with signals, zoneless, and Tailwind CSS v4. Bold borders, offset shadows, opinionated aesthetic end-to-end.
```

Format follows the section convention: one sentence, terminal period,
~80–150 chars. The "opinionated aesthetic end-to-end" clause is the
explicit distinguishing line vs the closest existing entry
(`angular-superui`, also Tailwind v4 / Angular 17+ signals).

**PR title:** `docs: add ng-brutalism`
(Convention check: 14 of the last 15 merged PRs use `docs:`; the
`docs(ui):` precedent from #2192 magary is the outlier. Don't use it.)

**Drafted PR description (1–2 lines, tight):**

> Adds `ng-brutalism`, a neo-brutalist Angular UI library (signals,
> zoneless, Tailwind v4). Distinct from existing Tailwind-section
> entries in that it commits to a single aesthetic rather than offering
> neutral primitives.

**Steps:**

- [x] Fork <https://github.com/PatrickJS/awesome-angular>
- [x] Add the drafted entry to `### UI Libraries built on Tailwind CSS`
- [x] Open PR with the drafted title + description above:
      <https://github.com/PatrickJS/awesome-angular/pull/2200>

Expected merge: 24–48h if format matches.

### Block 2 — r/Angular2 engagement (15:45–16:00)

The post is 3+ hours old. Comment-momentum window closes around the 6-hour
post-mark (~17:30 ICT). Engage now while still inside it.

- [ ] Open the r/Angular2 post and reply to every comment.
- [ ] If anyone asks vs-shadcn / vs-daisyUI / vs-spartan-ng, answer with
      specifics. That's the comparison that converts readers.
- [ ] If there's a particularly good question, edit the post body with
      "**Edit:** clarifying X" — engagement signals to Reddit's algo.

### Block 3 — Admin block (16:00–16:30)

Cheap wins bundled together. ~30 min total.

#### 3a — X profile + JSON-LD update — DONE except commit+deploy

Handle: `@mktrann` → <https://x.com/mktrann>.

**What was actually shipped (final copy used):**

- [x] X **display name** confirmed/updated to include `Khang Tran`.
- [x] X **bio** updated (LinkedIn-voice-matched, 137 chars):
      > Angular dev. Building ng-brutalism — a neo-brutalist UI library (signals, zoneless, Tailwind v4). → ngbrutalism.khangtran.dev
- [x] X profile **Website** field set to `https://ngbrutalism.khangtran.dev`.
- [x] **Launch tweet** posted and pinned (260 chars, GIF attached):
      > ng-brutalism — a neo-brutalist UI library for Angular.
      >
      > 15 primitives. Signals, zoneless, Tailwind v4. Directive-first APIs, no NgModules.
      >
      > Bold borders, offset shadows — drop in and ship loud.
      >
      > https://ngbrutalism.khangtran.dev
      >
      > [attached: `docs/assets/introduction.gif`, 2286×1286, 2.1 MB]
- [x] Code change in `apps/docs/src/app/docs/docs-seo-data.ts` —
      added `AUTHOR_X_URL = 'https://x.com/mktrann'`.
- [x] Code change in `apps/docs/src/app/docs/docs-title-strategy.ts` —
      Option A applied to both author blocks (`SoftwareApplication.author`
      AND `TechArticle.author`). Verified end-to-end via
      `nx run docs:build-seo-artifacts`; prerendered HTML on `/` and
      `/components/card/` renders `Person.url` + `Person.sameAs:
      [AUTHOR_X_URL]` correctly.
- [ ] **Deploy.** Commit is already on `main` as `20941f6`
      (`feat(docs): update sitemap lastmod timestamp and add author X URL to SEO data`).
      Deployment is still pending unless already handled outside this checkout;
      until deployed, Google sees the old schema and the X-handle binding can't
      fire.

**Q5 risk confirmed empirically** (2026-05-22 ~17:00 ICT): tried to
verify the X profile from outside the browser; both vectors failed.
`curl https://x.com/mktrann` returns HTTP 403; the nitter mirror returns
an empty body. Googlebot almost certainly hits the same wall, so the
`Person.sameAs: [X URL]` claim is one-sided (we claim it, Google can't
verify). The bio + pinned tweet linking back to the site are doing the
real entity-binding work; the `sameAs` is belt-and-suspenders.

**Snapshot of final code state** for reference (in
`docs-title-strategy.ts`, both author blocks):
```ts
author: {
  '@type': 'Person',
  name: AUTHOR_NAME,
  url: AUTHOR_URL,
  sameAs: [AUTHOR_X_URL],
},
```

#### 3b — SPRINT-3 GitHub repo description — DONE

Synced via `.github/repository.json` + `pnpm sync:repo-metadata` on
2026-05-22. Final copy intentionally omits `by Khang Tran` because GitHub
already provides owner context:

> Ng Brutalism (@ng-brutalism/ui) - a neo-brutalist Angular UI component library. Signals, zoneless, Tailwind v4. Bold borders, offset shadows, drop in and ship loud.

#### 3c — V4 GSC nudge — DONE

Search Console → Sitemaps → re-submit
`https://ngbrutalism.khangtran.dev/sitemap.xml`. Then URL Inspection →
Request Indexing for:

- [x] `/`
- [x] `/components/button/`
- [x] `/showcase/portfolio/`

#### 3d — V3 schema validators — DONE

Paste these 3 URLs into <https://validator.schema.org/> and confirm 0
errors:

- [x] `https://ngbrutalism.khangtran.dev/` — live JSON-LD fetched and parsed;
      `SoftwareApplication` present with `Person.url` + `Person.sameAs`.
- [x] `https://ngbrutalism.khangtran.dev/components/button/` — live JSON-LD
      fetched and parsed; `BreadcrumbList` + `TechArticle` present with
      `Person.url` + `Person.sameAs`.
- [x] `https://ngbrutalism.khangtran.dev/showcase/portfolio/` — live JSON-LD
      fetched and parsed; `BreadcrumbList` + `TechArticle` present with
      `Person.url` + `Person.sameAs`.

Automated local check passed on 2026-05-22. The public validator UI does not
expose a documented CLI/API, so verification used live page fetches, JSON-LD
parse checks, expected block checks, and the schema/entity assertions that
matter for this sprint.

#### 3e — Partial V1 LLM probes — DONE

Ask each engine *"What is ng-brutalism?"* and paste the answer into
`sprint-entity-authority.md` V1 section:

- [x] Perplexity (perplexity.ai) — recognized the entity; 5/7 canonical facts.
- [x] ChatGPT with web tools enabled — missed the entity; answered generic
      neo-brutalism design-style explanation.
- [x] Claude with web search enabled — missed the entity; answered generic
      neo-brutalism design-style explanation.

Logged in `sprint-entity-authority.md` under "Partial launch-day probe —
2026-05-22".

(Full 5-engine V1 will run at the 72h checkpoint — see Verification.)

### Block 4 — bestofjs issue — DONE

**Crown jewel #2.** Sole survivor of the original 3-target Block 4 after
grilling session 2 verified the other two are unusable:

- **OpenBase: DROPPED.** Site is defunct — `curl https://openbase.com/`
  returns empty body and no headers. Can't submit to a dead site.
- **JS.coach: DROPPED.** Site loads (HTTP 200) but no submit flow
  visible. Low-authority directory not worth chasing.

**Submission process** (per bestofjs README — uses an ISSUE, not a PR):

- [x] Filed issue:
      <https://github.com/bestofjs/bestofjs/issues/439>

**Final issue title:**

```
Add ng-brutalism - Neo-brutalist Angular UI library
```

Note: the old issue-template URL from the original plan now 404s via the
GitHub API, so this was submitted using the structure of recent accepted
Best of JS issues: project, GitHub, npm, website/docs, description, category,
license, and key differentiators. No image was attached; recent accepted
issues are metadata-first and generally do not include screenshots.

(Reference convention: #411 "Add Pushduck - Type-safe S3 file upload
library for JavaScript", #417 "Add Toastflow - Accessible toast
notification engine for Vue 3 and Nuxt", #420 "Add SmoothUI - Animated
React Components Library".)

**Realistic timeline:** issue close in **1–4 weeks** (reference data:
Pushduck 8d, SmoothUI 19d, Toastflow 26d — appear to be batched
triage, e.g. #417 and #420 closed on the same day 2026-05-05). Database
listing follows separately. Dofollow once listed.

Already-shipped directory signals (no action needed):

- npm keyword associations (19 keywords on `@ng-brutalism/ui` ✓)
- GitHub topic tags (12 topics ✓)
- libraries.io auto-indexes from npm — already happening, no action

### Block 5 — r/SideProject cross-post (20:00–21:00)

**Sole survivor** of the original 3-venue cross-post block, after
grilling session 2 deferred Show HN to Tuesday. r/SideProject runs
tonight because Saturday-morning-coffee browse is its peak window and
it's independent enough from HN that same-week posting doesn't look
coordinated.

- [ ] Copy-paste the r/Angular2 post body (or a tightened version),
      retitle for the "I built X" launcher framing.
- [ ] Submit at <https://www.reddit.com/r/SideProject/submit>
- [ ] Stay online ~45 min, reply to comments.
- [ ] Off by 21:00.

**Not running tonight (parked for later if useful):**

- **r/typescript** — narrower / high-intent. Consider for Mon 2026-05-25
  morning, the day before Show HN.
- **r/webdev** — broad volume. Skip unless Show HN catches and you want
  to ride momentum. Posting before HN risks splitting the launch story.

All Reddit links are `nofollow`. Value is brand surface + referral
traffic, not SEO juice. The dofollow backlink play is fully covered by
Blocks 1 (awesome-angular) and 4 (bestofjs).

### Block 6 — Show HN content prep (Mon 2026-05-25 evening)

**Dedicated session, run via `/grill-me`** to extract:
- Title pick from candidates below
- Bracketed answers in the first-comment template
- Final draft of first comment

Why this is its own session: the bracketed answers (especially "Why
Angular not React") are the highest-stakes content in the whole launch
and deserve real interrogation 24h before posting. Drafting them while
tired on launch day is how thin first comments happen.

- [ ] Pick title from candidates (or rewrite your own):
  1. `Show HN: Ng Brutalism – neo-brutalist Angular UI, signals + zoneless + Tailwind v4` (78 chars)
  2. `Show HN: Ng Brutalism – Angular UI library, signals-first, zoneless, Tailwind v4`
  3. `Show HN: A neo-brutalist Angular UI library (signals, zoneless, Tailwind v4)` (72 chars)

  All three lead with the technical hooks (signals, zoneless, Tailwind v4)
  that signal "this is current Angular, not legacy" — HN scans titles in
  <1s and clicks on what's technically interesting, not stylistically.

- [ ] Draft your first comment now, using this template (fill in the
      [bracketed] honest answers):

      > Hey HN — author here. Built this over [N weeks/months] because I
      > wanted an Angular UI primitive set that committed to the
      > neo-brutalist aesthetic end-to-end (bold borders, offset shadows,
      > no gradients) instead of bolting it on top of a neutral library
      > like Spartan.
      >
      > Tech: Angular 21, signals throughout, zoneless, Tailwind v4. No
      > NgModules, no zone.js, no decorators-as-state. Each component is
      > a primitive — drop in `<ng-button>`, `<ng-card>` etc. and ship.
      >
      > Stack choices I'd expect questions on:
      > - Why Angular not React: [your honest 1-line answer]
      > - Why a new library instead of theming Spartan/Taiga: [1-line]
      > - License: MIT. Repo: [GitHub URL].
      >
      > Happy to answer anything.

  Preempts the four predictable HN objections in 5 sentences:
  "why Angular not React," "why another UI library," "what is brutalism
  in code terms," "is this a serious lib or a toy."

### Block 7 — Show HN go-live (Tue 2026-05-26, 20:00–21:30 ICT)

**Day-of-week rationale:** Friday HN windows lose to weekend ranking
decay starting Friday EST evening — exactly when post momentum would
need to clear front-page threshold. Tuesday morning EST is one of the
strongest accumulation days; weekly devs-at-desk count is highest.

**Timing math:** 9–10am EDT (US east coast wake-up window) = 13:00–14:00
UTC = **20:00–21:00 ICT**. Extended window 20:00–22:00 is fine.

Why this window: HN ranking algorithm uses upvotes-per-hour with decay.
First 60–90 min after posting is the critical accumulation window — need
~5–10 upvotes in the first hour to avoid being decayed before more
people see the post.

- [ ] Submit at <https://news.ycombinator.com/submit>
- [ ] Use title from Block 6
- [ ] URL: `https://ngbrutalism.khangtran.dev`
- [ ] **Immediately post your drafted first comment.** HN explicitly
      allows this for Show HN — it's not shilling, it's expected.
- [ ] Stay online and active for **90 min minimum**, responding to every
      comment thoughtfully.

Realistic outcomes:

| Outcome | Probability | What it looks like |
|---|---|---|
| Flat (<5 points) | ~60% | Dies in /newest. Costs nothing. |
| Mild (5–30 points) | ~25% | Few hours on /show, 500–2k visitors. |
| Catches (30–100 points) | ~12% | Front page 1–3h, 5k–15k visitors, newsletter pickup likely. |
| Hits (100+ points) | ~3% | Front page 6+h, 30k+ visitors, multiple newsletter + blog pickups. |

Angular is a headwind for HN's React-skewed audience — that's why the
title and first comment lead with modern-Angular hooks, not the
framework name.

### Block 8 — Image alt audit (async, anytime before Tue 2026-05-26)

**Mode:** Claude runs solo. Decoupled from the daily schedule — fits any
spare window between now and Show HN.

- [x] Image alt audit — sweep `apps/docs/src` and `libs/ui/README.md` for
      `<img>` and `![](`)` patterns. Flag any blanks or low-quality alts.
      Completed 2026-05-22: no missing meaningful alts found. Empty alts are
      decorative and paired with `aria-hidden`; README badges and content
      screenshots have descriptive markdown alts. Tightened generic mascot/logo
      alts in the docs app.

PLAN.md Phase 6 step 9 listed this; verify whether it was actually done
in the prior shipping or not.

---

## Explicitly NOT doing today (and why)

| Item | Why deferred |
|---|---|
| dev.to launch article | Khang nixed (decided this session) |
| Creating a NEW Twitter brand account | Using existing `@mktrann` instead; no second handle |
| 301 redirects for retired `/docs/<component>/` URLs | Gated on GSC traffic data (PLAN.md §7) |
| `llms-full.txt` | Deferred per PLAN.md §3 "until baseline traffic data is in" |
| Content depth pages (vs-compare, FAQ, blog) | Long-term play, doesn't move 1-week T2 rankings. **May trigger as next sprint per kill-criterion below.** |
| Core Web Vitals tuning | Separate ticket, needs real-device Lighthouse |

---

## Working agreement (Khang + Claude)

For each block:

- **Khang manual** = Khang executes; Claude is on standby for questions
  / drafting copy.
- **Claude solo** = Claude can complete without Khang's involvement
  (e.g., code audits).
- **Collaborative** = Claude drafts, Khang reviews + ships.

When picking up a new session: read this file top-to-bottom, then proceed
to the next unchecked block.

---

## Verification at 72h post-Show-HN (2026-05-29 ~15:00 ICT)

**Window shifted** from 2026-05-25 to 2026-05-29 to land 72h after the
Tuesday Show HN go-live, not 72h after the awesome-angular PR. Reading
metrics 72h after the major brand-surface event is what was meant; the
move-Show-HN-to-Tuesday decision pushed this proportionally.



**Pre-committed kill-criterion thresholds.** Locked during the grilling
session — DO NOT re-litigate these on the day. Just measure and apply
the rule.

| Metric | Weak | Mild | Strong |
|---|---|---|---|
| GitHub stars (delta from today) | <15 | 15–50 | 50+ |
| HN + Reddit combined points/upvotes | <30 | 30–100 | 100+ |
| npm weekly downloads | <100 | 100–500 | 500+ |
| V1 LLM probes (out of 5 engines) accurately describing the library | 0–1 | 2–3 | 4–5 |

**Decision rule:**

- **Pivot to content-depth sprint** if ≥3 of 4 metrics are in the Weak
  column.
- **Press the same playbook** (more directories, more Angular-native
  outreach) if ≥3 of 4 metrics are in the Strong column.
- **Hold and re-check at 1 week post-Show-HN (2026-06-02)** for any
  mixed signal.

**Verification tasks at 72h:**

- [ ] Re-run V1 LLM probes — **all 5 engines** (Perplexity, ChatGPT,
      Claude, Google AI Overviews, and one of: You.com / Brave). See
      `sprint-entity-authority.md` V1 for the full list. The 3-engine
      probe in Block 3e is only the partial baseline.
- [ ] Run V2 rank baseline (Google incognito, all 7 keywords from
      `sprint-entity-authority.md` V2).
- [ ] Check Reddit + HN traction (upvotes, comments, click-through if
      GSC shows referral patterns).
- [ ] Read GitHub star count delta from today's baseline.
- [ ] Read npm weekly downloads.
- [ ] Update `sprint-entity-authority.md` V1/V2 sections with results.
- [ ] Apply the decision rule above.
