# Theming

> **Next goals, built on the token contract.** How ng-brutalism ships,
> scopes and accepts themes, including community themes.
>
> **Status: goals (2026-10-25). Not implemented yet.** Every token name,
> layer and precedence rule here comes from
> [token-customization.md](token-customization.md). When the two disagree,
> that file wins. This file only adds distribution, contribution and
> tooling.
>
> Inspiration: highlight.js community themes. *Components by us. Themes by
> everyone.*

---

## 1. Goal

A theme is one CSS file. Anyone can write one without touching component
source, and several themes can share a page.

Success looks like this:

- Importing a theme and setting `data-nb-theme` restyles an app.
- Two themes render side by side on one page.
- A contributor adds `styles/theme-<name>.css` and nothing else under
  `libs/ui/src/lib/<component>/`.
- A component refactor never breaks a theme, because themes only touch
  roles.
- A theme can be a different aesthetic (sharp vs. rounded, offset vs.
  glow), not only a different palette.

---

## 2. What a theme may set

A theme sets **L1 primitives and L2 roles only**
([token-customization §4](token-customization.md#4-layers)).

| May | May not |
|---|---|
| Primitives: `--nb-pink`, `--nb-radius-md`, … | Component tokens: `--nb-card-radius`, `--nb-button-hover-shadow`, … |
| Roles: `--nb-surface`, `--nb-primary`, `--nb-radius-box`, `--nb-shadow-box-offset`, … | Tone slots: `--nb-tone-bg/-fg/-border` (they belong to the element) |
| Tone presets: `--nb-tone-<name>-bg/-fg/-border` | Any selector other than the theme selector (§3) |
| | Real CSS properties (`background`, `font-family`, …) |

Why roles only:

- **Stability.** Component tokens are renamed and added as components
  change. Roles are the stable contract.
- **Scoping.** Component tokens are declared on every component root, so a
  theme block on an ancestor couldn't set them anyway
  ([token-customization §2.16](token-customization.md#216-what-doesnt-work-)).
- **Atomic values.** A role derived on the theme block from other values
  ignores a section override of those values
  ([token-customization §4.1](token-customization.md#41-roles)). Themes
  write literals, or reference primitives they define in the same block.

**Required tokens** are the role list in
[token-customization §4.1](token-customization.md#41-roles). A theme that
leaves a role out inherits it from the default theme on `:root`, which is
fine for a scoped theme but not for an official one (§6).

---

## 3. Theme file format

```css
/**
 * Theme: Shine
 * Author: <name or handle>
 * Description: Playful pastel neo-brutalism
 */

[data-nb-theme='shine'] {
  /* Color roles */
  --nb-surface: #fffdf5;
  --nb-surface-foreground: #292524;
  --nb-primary: #ff91e8;
  --nb-primary-foreground: #292524;
  --nb-secondary: #9bf6ff;
  --nb-secondary-foreground: #292524;
  --nb-muted-foreground: #57534e;
  --nb-danger: #e5484d;

  /* Border */
  --nb-border: #292524;
  --nb-border-width: 3px;

  /* Shape */
  --nb-radius-box: 12px;
  --nb-radius-field: 8px;
  --nb-radius-control: 999px;
  --nb-radius-pill: 999px;

  /* Depth */
  --nb-shadow: #292524;
  --nb-shadow-box-offset: 6px;
  --nb-shadow-field-offset: 0px;
  --nb-shadow-control-offset: 3px;
  --nb-shadow-pill-offset: 2px;
}
```

Rules:

- One block, selector `[data-nb-theme='<name>']`. The name matches the file
  name: `theme-shine.css` → `shine`.
- Custom property declarations only. No nested rules, no `@import`, no
  JavaScript.
- Dark variants are a separate theme (`shine-dark`), not a
  `prefers-color-scheme` block inside the file. The consumer decides when
  to switch.

The default theme (`theme.css`) is the only one that also matches `:root`:
`:root, [data-nb-theme='default']`. Every other theme needs its attribute
([token-customization §14.7](token-customization.md#14-decisions)).

A theme may set the optional full-value depth roles (`--nb-shadow-box`,
`-field`, `-control`, `-pill`) to replace the offset shadow, for example with a glow
([token-customization §14.6](token-customization.md#14-decisions)).

---

## 4. Consumer API

### 4.1 Import

```css
@import '@ng-brutalism/ui/theme-shine.css';
```

`ng-package.json` already copies every `**/*.css` under `src/lib`, so the
file ships. Each theme still needs its own entry in `libs/ui/package.json`
`exports`, like `./theme-soft.css` has today.

### 4.2 Apply

```html
<html data-nb-theme="shine">
```

### 4.3 Scope

```html
<section data-nb-theme="shine">…</section>
<section data-nb-theme="cyberpunk">…</section>
```

Roles inherit, so everything inside takes the section's theme. Emulated
view encapsulation doesn't block inheritance.

Overlays need no extra strategy. The library doesn't move parts in the DOM
([token-customization §5.4](token-customization.md#5-library-stylesheet-contract)),
so dialogs and popovers keep their ancestor's theme.

### 4.4 Switch at runtime

```ts
document.documentElement.dataset['nbTheme'] = 'shine';
```

No Angular service is required. A convenience helper can come later, but
the CSS never depends on it.

### 4.5 Adjust a theme

Section overrides and component overrides work the same under any theme
([token-customization §2](token-customization.md#2-consumer-guide)). A
theme is just another source of role values.

---

## 5. Themes, variants and tone

| | Chosen by | Answers | Example |
|---|---|---|---|
| **Theme** | a place (`data-nb-theme`) | what the design language looks like | Shine: rounded, pastel |
| **Variant** | an input (`variant`, `size`, `shape`, `press`) | which presentation this instance has | `variant="outline"` |
| **Tone** | an input or class on the element | which three-color preset this element uses | `tone="pink"` |

A variant reassigns component tokens from roles
([token-customization §5](token-customization.md#5-library-stylesheet-contract)),
so every theme styles every variant for free. Themes never add Angular
inputs.

---

## 6. Contributing a theme

```txt
1. Fork the repo
2. Copy libs/ui/src/lib/styles/theme-template.css → theme-<name>.css
3. Set the roles
4. Preview it in the docs playground or the docs app
5. pnpm validate:themes
6. Open a PR: feat(theme): add <name> theme
```

An official theme:

- has a unique name and a header comment (theme, author, description)
- passes the validator (§7)
- sets every required role
- meets WCAG AA text contrast for each `-foreground` on its pair
- keeps the focus ring visible against `--nb-surface`
- adds its `exports` entry and a CHANGELOG line

---

## 7. Theme validator

`pnpm validate:themes`, run in CI. It reads the role list from the same
source as `pnpm docs:tokens:update`, so the list of allowed tokens is never
written by hand.

| Check | Fails when |
|---|---|
| Syntax | the file doesn't parse |
| Selector | anything other than one `[data-nb-theme='<file name>']` block |
| Declarations | a real CSS property, nested rule or at-rule appears |
| Known tokens | a token isn't a primitive, role or tone preset (catches typos and component tokens) |
| Required roles | an official theme leaves out a role from token-customization §4.1 |
| Unique name | two files claim the same theme name |
| Value types | a radius or offset isn't a length, or a color role isn't a color |
| Contrast | a `-foreground` pair is below AA |

It shares its parser with the stylesheet guard from
[token-customization §13 step 2](token-customization.md#13-migration-plan).

Static checks can't judge looks. Later: Playwright screenshots of Button,
Input, Card, Dialog, Accordion and Select under every theme, plus an axe
pass.

---

## 8. Theme playground

A docs page, later:

- a gallery of themes
- a live preview of representative components, with the theme switched by
  `data-nb-theme`
- controls for each role, grouped like token-customization §4.1
- generated CSS in the §3 format, with copy and download
- a link to §6

The controls edit roles only, so anything exported passes the validator.

---

## 9. Roadmap

Each phase waits on the one before it. Phase 1 is the v2.1 migration.

| Phase | Work | Depends on |
|---|---|---|
| 1. Contract | Token-customization migration, §13 steps 1–5 | decided 2026-10-25 (§14) |
| 2. Rescope | Move `theme-mono.css` and `theme-soft.css` from `:root` to `[data-nb-theme]`; `theme.css` keeps `:root` as the default (§14.7) | roles in place |
| 3. New themes | `theme-template.css`, then a dark theme, then a glow theme using the full-value depth roles (§14.6) | phase 2 |
| 4. Validator | `pnpm validate:themes` in CI | the role list being generated |
| 5. Consumer docs | Docs-site theming page: import, scope, switch | phase 2 |
| 6. Community | Contribution guide, attribution, review criteria | phases 3–4 |
| 7. Playground | §8 | phase 4 |
| 8. Visual tests | Screenshot and axe matrix across themes | phase 3 |

---

## 10. What changed from the reference RFC

The community-theming RFC was the starting point. These parts were changed
to fit the existing contract:

| RFC | Here | Why |
|---|---|---|
| `var(--nb-button-bg, var(--nb-primary))`, undeclared component tokens | Component tokens declared on each root | Undeclared tokens leak into nested instances (token-customization §9) |
| `--nb-background`, `--nb-border-color`, `--nb-radius` | `--nb-surface`, `--nb-border`, `--nb-radius-box/-field/-control/-pill` | Existing role names; one radius can't say "round cards, square buttons", and `--nb-radius` is removed (§14.3) |
| `--nb-shadow-sm/-md/-lg` as full values on the theme block | Atomic offset roles, plus optional full-value `--nb-shadow-box/-field/-control/-pill` (§14.6) | Full values derived from other tokens ignore section overrides |
| Global `--nb-hover-translate-x/-y` | Per-component state tokens derived from the shadow offset | States use their own tokens (token-customization §5) |
| `.nb-button` selectors | `[data-nb-button]` | The documented hook (token-customization §6) |
| Cascade layers "to evaluate" | Already decided | token-customization §3 |
| Overlays need a strategy | Already solved | No DOM-moving portals |
| `projects/…/themes/` folder | `libs/ui/src/lib/styles/theme-*.css` | The Nx layout and current packaging |

---

## 11. Open questions

1. Bundle community themes in `@ng-brutalism/ui`, or move them to a
   separate package once there are many?
2. How to version the theme contract: does adding a required role break
   community themes?
3. Should themes control spacing or density? Not for now: no size role
   (token-customization §14.2).
4. When to add documented part hooks for advanced themes (decorative
   backgrounds, pseudo-elements)? Not before the `data-slot` part API
   (token-customization §10).
