# Housekeeping Plan: Angular 21 Style Guide Compliance + Modern API Adoption

Status: Plan finalized, ready to execute.
Owner: Khang Tran (solo).
Branch model: Direct to `main`, multi-commit, no PR (matches `MIGRATION_TO_NG21.md` precedent).

---

## TL;DR

Workspace was just upgraded 18 → 21. This branch brings the code in line with the v21 style guide (https://angular.dev/style-guide) and adopts modern signal APIs (`linkedSignal`, `resource`, `toSignal`, `afterRenderEffect`) before the first npm publish of `@ng-brutalism/ui@0.1.0`. Pre-1.0 + unpublished = breaking-change-friendly: pick the right v21 idiom, never the back-compat shim.

---

## Decision recap

| # | Decision | Rationale |
|---|---|---|
| 1 | **Class naming**: keep `Nb` prefix on classes, drop `Component`/`Directive` suffix. Files renamed to `nb-*.ts` to match (style guide: "file name should reflect class name"). | Matches Angular Material / Taiga / PrimeNG convention. Cheapest moment to do file renames is pre-publish. |
| 2 | **Scope of rename**: both `libs/ui` *and* `apps/docs` (including teaching code-snippet strings). | Docs is on ronit.io — public-facing learning surface. Stale snippets would teach wrong patterns. |
| 3 | **`allowSignalWrites` removal — idiomatic, not minimal**. `docs-code-block` highlighter → `resource()`. `portfolio-hero` typewriter → `toObservable + switchMap + timer` (fixes a real interval-leak bug). | `resource()` went stable in v20; designed for "async value derived from signals". Avoids `effect()` (per the avoid-effect rule). |
| 4 | **Accordion/Select API rethink**: drop `defaultValue` (and select's `defaultOpen`) input entirely. Promote `value` / `open` to pure `model<T>()`. Removes `ngOnInit`, removes `normalizeValue` plumbing, preserves `[(value)]` two-way binding. | `model()` is the v21 idiom for two-way bound state with initial value. `linkedSignal` is for reactively-resetting derived state — wrong tool for "initial value". This is *less* code than the linkedSignal version. |
| 5 | **Modernization scope = full, not narrow**. Includes router `.subscribe → toSignal`, `queueMicrotask` removal, RxJS-ification of all interval/subscribe push antipatterns. | User directive: refactor everything, recommend every modern-API opportunity. |
| 6 | **Defer**: `(window:scroll)` host binding (idiomatic as-is) and the 1.4s copy-toast `setTimeout` (gold-plating). | Marginal-to-zero payoff. |
| 7 | **Commit strategy**: rename first as one atomic mechanical commit; logic commits land on the final filenames. | Cleanest bisect properties. Git rename detection (`-M`) keeps commit 1 readable. |
| 8 | **Specs travel with the code change**. Per-commit invariant: `pnpm nx run-many -t build test lint` green. | Don't split spec updates from the contract change they validate. |

---

## What's already modern (no work required)

- Signal-based `input()` / `output()` / `model()` / `viewChild()` / `contentChildren()` everywhere — zero legacy decorators
- All `inject()`, zero constructor-injected params
- `@if` / `@for` / `@switch` control flow throughout, no `*ngIf`
- No NgModules in app code (test-setup is the only one, required)
- No `ChangeDetectorRef`, no `Renderer2`
- `provideRouter` + `provideClientHydration({withEventReplay})` + `withFetch` in app config
- Form-control components are pure signal-based, no `ControlValueAccessor` / no `FormsModule`
- `takeUntilDestroyed` + `DestroyRef` already correct everywhere

---

## Commit-by-commit plan

### Commit 1 — Rename: drop `Component`/`Directive` suffix, normalize filenames

```
refactor(ui): drop Component/Directive suffix; rename files to nb-*.ts
```

**Library renames** (file → file, class → class):

| Old file | New file | Old class | New class |
|---|---|---|---|
| `libs/ui/src/lib/accordion/accordion.ts` | `nb-accordion.ts` | `NbAccordionComponent` | `NbAccordion` |
| `libs/ui/src/lib/accordion/accordion-item.ts` | `nb-accordion-item.ts` | `NbAccordionItemComponent` | `NbAccordionItem` |
| `libs/ui/src/lib/accordion/accordion-trigger.ts` | `nb-accordion-trigger.ts` | `NbAccordionTriggerComponent` | `NbAccordionTrigger` |
| `libs/ui/src/lib/accordion/accordion-content.ts` | `nb-accordion-content.ts` | `NbAccordionContentComponent` | `NbAccordionContent` |
| `libs/ui/src/lib/accordion/accordion.component.spec.ts` | `nb-accordion.spec.ts` | (spec) | (spec) |
| `libs/ui/src/lib/avatar/avatar.ts` | `nb-avatar.ts` | `NbAvatarComponent` | `NbAvatar` |
| `libs/ui/src/lib/badge/badge.directive.ts` | `nb-badge.ts` | `NbBadgeDirective` | `NbBadge` |
| `libs/ui/src/lib/button/button.directive.ts` | `nb-button.ts` | `NbButtonDirective` | `NbButton` |
| `libs/ui/src/lib/card/card.ts` | `nb-card.ts` | `NbCardComponent` (+ 6 sub-classes) | `NbCard` (+ siblings) |
| `libs/ui/src/lib/checkbox/checkbox.directive.ts` | `nb-checkbox.ts` | `NbCheckboxDirective` | `NbCheckbox` |
| `libs/ui/src/lib/input/input.directive.ts` | `nb-input.ts` | `NbInputDirective` | `NbInput` |
| `libs/ui/src/lib/label/label.directive.ts` | `nb-label.ts` | `NbLabelDirective` | `NbLabel` |
| `libs/ui/src/lib/marquee/marquee.ts` | `nb-marquee.ts` | `NbMarqueeComponent` | `NbMarquee` |
| `libs/ui/src/lib/marquee/marquee-item.ts` | `nb-marquee-item.ts` | `NbMarqueeItemComponent` | `NbMarqueeItem` |
| `libs/ui/src/lib/select/select.directive.ts` | (delete if empty; or merge into nb-select.ts) | `NbSelectDirective` | (merge or drop) |
| `libs/ui/src/lib/select/select.ts` | `nb-select.ts` | `NbSelectComponent` | `NbSelect` |
| `libs/ui/src/lib/textarea/textarea.directive.ts` | `nb-textarea.ts` | `NbTextareaDirective` | `NbTextarea` |
| `libs/ui/src/lib/title/title.directive.ts` | `nb-title.ts` | `NbTitleDirective` | `NbTitle` |
| (any other `*.directive.ts` / `*Component` / `*Directive` in `libs/ui/src/lib/**`) | (same pattern) | | |

**App renames** (no `Nb` prefix — these are app-internal):

| File | Old class | New class |
|---|---|---|
| `apps/docs/src/app/pages/showcase/portfolio/components/portfolio-hero.ts` | `PortfolioHeroComponent` | `PortfolioHero` |
| `apps/docs/src/app/pages/showcase/portfolio/components/portfolio-nav.ts` | `PortfolioNavComponent` | `PortfolioNav` |
| `apps/docs/src/app/pages/showcase/portfolio/components/portfolio-projects.ts` | `PortfolioProjectsComponent` | `PortfolioProjects` |
| `apps/docs/src/app/pages/showcase/portfolio/components/portfolio-journey.ts` | `PortfolioJourneyComponent` | `PortfolioJourney` |
| `apps/docs/src/app/pages/showcase/portfolio/components/portfolio-contact-dialog.ts` | `PortfolioContactDialogComponent` | `PortfolioContactDialog` |
| `apps/docs/src/app/pages/showcase/portfolio/components/portfolio-footer.ts` | `PortfolioFooterComponent` | `PortfolioFooter` |

**Teaching snippets to update** (string literals shown to docs visitors):
- `apps/docs/src/app/pages/docs/introduction.page.ts:235` — `class ShipButtonComponent {}` → `class ShipButton {}`
- `apps/docs/src/app/pages/docs/installation.page.ts:97` — `class ExampleComponent {}` → `class Example {}`

**Things to also touch**:
- `libs/ui/src/index.ts` re-exports
- Per-component `index.ts` re-exports
- Every consumer import statement (`grep -rl 'NbCardComponent'` etc.)
- `*.tokens.spec.ts` files reference the class names — update too

**Verification**: `pnpm nx run-many -t build test lint`. Smoke-test docs at `pnpm nx serve docs`.

---

### Commit 2 — Remove redundant `standalone: true`

```
refactor: remove redundant standalone: true (default in v19+)
```

- 56 occurrences across `libs/ui` and `apps/docs`. Mechanical sed.
- Keep `standalone: false` if any (none expected).
- Verification: build + test + lint.

---

### Commit 3 — Accordion + Select: drop defaultValue, promote to `model()`

```
refactor(ui): accordion/select — drop defaultValue/defaultOpen,
promote value/open to model<T>(), remove ngOnInit
```

**`nb-accordion.ts` changes**:
- Delete `readonly defaultValue = input<NbAccordionValue>(null)`
- `value` stays as `model<NbAccordionValue>(null)` (already is)
- Delete `ngOnInit`
- Delete `normalizeValue` (no longer needed — parent provides the value in the shape they want; component never re-shapes)
- Drop `implements OnInit`, drop `OnInit` import

**`nb-select.ts` changes**:
- Delete `readonly defaultValue = input<NbSelectValue | null>(null)`
- Delete `readonly defaultOpen = input(false, { transform: booleanAttribute })`
- Promote `open` from `signal(false)` to `model<boolean>(false)` — gives parents controlled-mode access
- Delete `ngOnInit`
- Drop `implements OnInit`, drop `OnInit` import

**Docs consumer updates** (atomic with this commit):
- `apps/docs/src/app/pages/components/accordion.page.ts` lines 98–124, 190–212, 418–490, 509–525: replace `defaultValue="..."` examples (both live and snippet) with `[value]="..."` initial-state pattern
- `apps/docs/src/app/pages/components/select.page.ts` lines 149–183, 392–429: same — `defaultValue="worldwide"` → `[value]="'worldwide'"`
- Keep both `[(value)]` examples in accordion (lines 162, 472) — they still work

**Spec updates** (atomic):
- `libs/ui/src/lib/accordion/nb-accordion.spec.ts`: delete defaultValue tests, add `[value]` initial-state tests; verify `[(value)]` round-trip still works
- `libs/ui/src/lib/accordion/accordion.tokens.spec.ts`: same
- `libs/ui/src/lib/select/nb-select.spec.ts`: same + add `[(open)]` round-trip test
- `libs/ui/src/lib/select/select.tokens.spec.ts`: same

**Verification**: build + test + lint, plus smoke-test docs accordion + select pages end-to-end (open/close, `[(value)]` round-trips, initial value renders).

---

### Commit 4 — Docs code-block highlighter → `resource()`

```
refactor(docs): docs-code-block highlighter → resource()
```

- `apps/docs/src/app/docs/docs-code-block.ts`:
  - Replace the `effect(() => { ... highlightCode(...).then(...) }, { allowSignalWrites: true })` block (lines 205–216)
  - With:
    ```ts
    protected readonly highlightedHtml = resource({
      request: () => ({ code: this.code(), lang: this.resolvedLanguage() }),
      loader: async ({ request: { code, lang }, abortSignal }) => {
        if (!this.isBrowser) return null;
        const html = await highlightCode(code, lang);
        return this.sanitizer.bypassSecurityTrustHtml(html);
      },
    });
    ```
  - Delete the `highlightedHtml = signal<SafeHtml | null>(null)` field
  - Template: `{{ highlightedHtml() }}` → `{{ highlightedHtml.value() }}`
  - Remove unused `effect` import
- Verification: build + test + lint, plus smoke-test any code-snippet page (e.g., button.page).

---

### Commit 5 — RxJS-ify timer-based patterns

```
refactor(docs): typewriter + greeting cycle → toObservable/toSignal
```

**`apps/docs/src/app/pages/showcase/portfolio/components/portfolio-hero.ts`** (typewriter):
- Delete the `effect(() => { ... setInterval ... }, { allowSignalWrites: true })` (lines 167–184)
- Delete the `charIndex` field (was `signal(0)`)
- Replace with:
  ```ts
  private readonly charIndex = toSignal(
    toObservable(this.greeting).pipe(
      switchMap(text =>
        timer(0, 100).pipe(
          scan(i => i + 1, 0),
          takeWhile(i => i <= text.length),
        ),
      ),
    ),
    { initialValue: 0 },
  );
  ```
- `switchMap` gives free cancellation on greeting change — fixes the existing interval-leak bug.

**`apps/docs/src/app/pages/showcase/portfolio/index.page.ts`** (greeting cycle, lines 52–62):
- Delete the `afterNextRender + interval + subscribe + .set` block
- Delete `greetingIndex` mutable field and the existing `greeting = signal(this.greetings[0])`
- Replace with:
  ```ts
  protected readonly greeting = toSignal(
    interval(1500).pipe(
      map((tick) => this.greetings[(tick + 1) % this.greetings.length]),
    ),
    { initialValue: this.greetings[0] },
  );
  ```
- Drop the `afterNextRender` wrapper, the `takeUntilDestroyed`/`DestroyRef` (toSignal handles teardown).
- Verification: build + test + lint, plus smoke-test typewriter animation and greeting rotation.

---

### Commit 6 — Router events → `toSignal()`

```
refactor(docs): router events → toSignal in navbar + docs-shell
```

**`apps/docs/src/app/docs/layout/navbar.ts`** (lines 165–177):
- Delete the `router.events.pipe(...).subscribe((event) => this.currentPath.set(...))`
- Replace with:
  ```ts
  protected readonly currentPath = toSignal(
    router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => this.normalizePath(e.urlAfterRedirects)),
    ),
    { initialValue: this.normalizePath(router.url) },
  );
  ```
- Remove `DestroyRef` injection and `takeUntilDestroyed` (toSignal owns teardown).
- Remove `currentPath = signal('')` field.

**`apps/docs/src/app/docs/docs-shell.ts`** (lines 139–148): same pattern for `currentUrl`.

- Verification: build + test + lint, plus smoke-test docs navigation (active link state).

---

### Commit 7 — TOC: `queueMicrotask` → `afterRenderEffect` on URL signal

```
refactor(docs): toc queueMicrotask → afterRenderEffect on URL signal
```

**`apps/docs/src/app/docs/layout/toc.ts`**:
- Convert router subscribe to a `currentUrl` signal via `toSignal` (same pattern as commit 6)
- Replace the `subscribe(() => queueMicrotask(() => this.scan()))` with:
  ```ts
  constructor() {
    afterRenderEffect(() => {
      this.currentUrl();   // depend on URL changes
      this.scan();
    });
  }
  ```
- `afterRenderEffect` is the *designated* API for "DOM work driven by signal changes that must run after render" — categorically different from raw `effect()` (per the avoid-effect memory).
- Delete `queueMicrotask` usage, delete the `DestroyRef`/`takeUntilDestroyed` for router events.
- Verification: build + test + lint, plus smoke-test TOC headings refresh on navigation between docs pages.

---

### Commit 8 — Portfolio-journey map sync → `toObservable + tap`

```
refactor(docs): portfolio-journey map sync → toObservable + tap
```

**`apps/docs/src/app/pages/showcase/portfolio/components/portfolio-journey.ts`** (lines 191–199):
- Delete the `effect(() => { ... focusEntry ... })` block
- Replace with:
  ```ts
  constructor() {
    afterNextRender(() => { this.setupResponsive(); this.initMap(); });

    toObservable(this.activeJourney)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((idx) => {
        const entries = this.timeline();
        if (!this.map || !this.overlay || idx < 0 || idx >= entries.length) {
          this.overlay?.setPosition(undefined);
          return;
        }
        this.focusEntry(entries[idx], false);
      });
    // existing destroyRef.onDestroy(...) stays
  }
  ```
- Removes the last `effect()` in the docs app.
- Verification: build + test + lint, plus smoke-test portfolio Journey section (timeline item click → map zoom/popup).

---

### Commit 9 — Event handler naming per style guide

```
style(ui+docs): rename event handlers to action names
```

Style guide: "Name event handlers for the action they perform rather than for the triggering event."

Proposed mapping (override at commit time if better names come to mind):

| File | Old | New |
|---|---|---|
| `libs/ui/src/lib/dialog/dialog.ts` | `onBackdropClick($event)` | `dismissOnBackdrop($event)` |
| `libs/ui/src/lib/select/nb-select-option.ts` | `onKeydown($event)` | `selectOptionOnKey($event)` |
| `libs/ui/src/lib/select/nb-select.ts` | `onTriggerKeydown($event)` | `openListboxOnKey($event)` (or `navigateOptions`) |
| `libs/ui/src/lib/select/nb-select.ts` | `onDocumentClick($event)` | `closeOnOutsideClick($event)` |
| `apps/docs/.../portfolio-projects.ts` | `onProjectLinkClick($event, ...)` | `openProjectLink($event, ...)` |
| `apps/docs/.../portfolio-journey.ts` | `onTimelineClick(index)` | `focusTimelineEntry(index)` |
| `apps/docs/.../portfolio-nav.ts` | `onWindowScroll()` | `updateScrollState()` (or keep — window-scope handlers are arguably descriptive already) |

- Update method names AND template references AND any spec references.
- Verification: build + test + lint, plus smoke-test dialog dismiss + select keyboard nav + portfolio interactions.

---

### Commit 10 — Update RELEASE_PLAN.md + CHANGELOG

```
docs: update RELEASE_PLAN.md + CHANGELOG for v0.1.0 API surface
```

- `RELEASE_PLAN.md`: replace any `NbXxxComponent` / `NbXxxDirective` references with the new names; remove `defaultValue` from any documented API; add note that `[(value)]` two-way binding is the controlled-mode pattern.
- `CHANGELOG.md`: under `[Unreleased]` / `[0.1.0]`, add:
  - "BREAKING: Component/Directive class names dropped — `NbCardComponent` → `NbCard`, `NbButtonDirective` → `NbButton`, etc. (Note: still 0.x; pre-publish.)"
  - "BREAKING: `defaultValue` input removed from `<nb-accordion>` and `<nb-select>`. Use `[value]` for one-way initial value or `[(value)]` for two-way binding."
  - "BREAKING: `defaultOpen` input removed from `<nb-select>`. Use `[open]` / `[(open)]`."
  - "Internal: modernized async highlighting (`resource()`), router state (`toSignal()`), typewriter (`toObservable + switchMap`)."

---

## Per-commit verification gate

Every commit (1–9) must pass:

```bash
pnpm nx run-many -t build test lint
```

Smoke-test docs at commits 1, 3, 5, 9 (the high-blast-radius ones):

```bash
pnpm nx serve docs
# Visit and verify:
#  - Commit 1: every page renders, no console errors, no broken imports
#  - Commit 3: accordion + select pages — [(value)] round-trips, [value] initializes
#  - Commit 5: portfolio hero typewriter animates, greeting cycles every 1.5s
#  - Commit 9: dialog dismisses on backdrop, select responds to arrow keys
```

If any commit goes red: fix in that commit (amend) before moving on. Don't pile fixup commits.

---

## Out of scope (deliberate deferrals)

| Item | Why deferred |
|---|---|
| `(window:scroll)` host binding → `fromEvent` | Host bindings *are* idiomatic for window events. Throttle/rxjs adds complexity without payoff. |
| 1.4s copy-toast `setTimeout` → RxJS `timer` | `setTimeout` for a single fire-and-forget toast is idiomatic everywhere, including Angular. Pure ceremony. |
| Signal Forms (v21 experimental) | Lib has no form controls using forms API today; nothing to migrate. |
| Docs framework re-evaluation | Per `MIGRATION_TO_NG21.md` decision #4: re-evaluate Analog *after* v0.1.0 ships. |

---

## Memory references

Two feedback rules influenced this plan:
- `feedback_avoid_effect.md` — prefer `computed`/`linkedSignal`/`resource`/`toSignal`; `effect()` is last resort
- `feedback_best_practice_over_compat.md` — pre-1.0 lib: pick the right v21 idiom, breaking changes OK

Both live in `~/.claude/projects/-Users-khangtrann-ng-brutalism/memory/` and are loaded automatically in future sessions.
