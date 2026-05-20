# Token Customization System

The public API for customizing the look of `@ng-brutalism/ui` components.

## Why this exists

There are two ways a consumer wants to customize the library:

1. **Theme-wide changes** — "make all main-colored elements lavender."
2. **One-off instance changes** — "make *this one* accordion trigger pink, without affecting anything else."

The previous approach mixed two patterns that handled (1) and (2) inconsistently:

```html
<!-- Pattern leaked through to global token — affected anything nested -->
<nb-accordion-trigger style="--nb-main: var(--nb-lavender)">Overview</nb-accordion-trigger>

<!-- Pattern was scoped, but naming was ad-hoc per component -->
<button nbButton style="--nb-button-bg: var(--nb-yellow)">Button</button>
```

The first pattern is leaky (any descendant that reads `--nb-main` is also restyled). The second is correct in shape, but the names (`--nb-button-bg`, `--nb-input-addon-bg`, `--nb-select-option-hover-bg`) follow no consistent grammar.

## The model: two-layer tokens

Every component exposes a small set of **scoped tokens** that default to **global theme tokens**. Consumers can override either layer.

```
┌──────────────────────────────────────────────┐
│  Global tokens (theme.css)                   │
│  --nb-main, --nb-foreground, --nb-border …   │
└──────────────────────────────────────────────┘
                    ▲
                    │ scoped tokens default to globals
                    │
┌──────────────────────────────────────────────┐
│  Component-scoped tokens                     │
│  --nb-button-bg: var(--nb-main)              │
│  --nb-accordion-trigger-bg: var(--nb-main)   │
└──────────────────────────────────────────────┘
```

**Override at the global layer** to change the theme. **Override at the scoped layer** to change a single instance without leaking.

This matches the convention used by Angular Material, PrimeNG, and Adobe Spectrum.

## Grammar

Every scoped token follows:

```
--nb-<component>[-<part>]-<property>[-<state>]
```

- **component** — e.g. `button`, `accordion`, `input`
- **part** — optional sub-part for compound components. e.g. `trigger`, `content`, `addon`
- **property** — `bg`, `fg`, `border`, `shadow`, `radius`
- **state** — optional. `hover`, `focus`, `disabled`, `open`, `active`

Property names use the short forms (`bg`/`fg`/`border`) for consistency, matching the existing `--nb-button-bg` convention.

Examples:
- `--nb-button-bg`
- `--nb-button-radius`
- `--nb-accordion-trigger-bg`
- `--nb-accordion-trigger-bg-open`
- `--nb-input-addon-bg`

## Variants are token assignments

Prop-driven variants reassign scoped tokens — they don't write hardcoded utility classes. A `variant="primary"` button is exactly "the same button, with `--nb-button-bg` pointing at `--nb-primary` instead of `--nb-main`."

This is the Spectrum/PrimeNG pattern. It means a consumer who overrides `--nb-primary` globally automatically restyles every `variant="primary"` button across the app.

## Don't pre-tokenize

A scoped token is a public API promise. Don't add one until there is a real prop or use case driving it.

- Add `--nb-button-bg` because the `variant` prop reassigns it.
- Add `--nb-button-shadow` because the `shadow` prop reassigns it.
- Add `--nb-button-radius` because "make my buttons pill-shaped" is a known customization.
- **Don't** add `--nb-button-bg-hover` until a variant actually changes color on hover.
- **Don't** add `--nb-button-padding-x` until a real use case demands it.

Symmetry is not a reason to expose a token.

---

## Pilot: Button

> **Status: pilot complete.** Button shipped first (commit `5168aca`) as the proof-of-pattern, then the same recipe rolled out across the rest of the library (accordion, badge, card, input, textarea, select, input-group, dialog, checkbox, image-card, avatar). See `TOKENS-ROLLOUT.md` for per-component status.

Button is the pilot component for this system. The rest of the library follows the same pattern.

### Public props

```ts
@Directive({ selector: 'button[nbButton], a[nbButton]' })
class NbButton {
  variant = input<NbButtonVariant>('default');   // semantic color
  shadow  = input<NbButtonShadow>('default');    // shadow behavior
  size    = input<NbButtonSize>('default');      // layout (unchanged)
  fullWidth = input(false);
}
```

`variant` and `shadow` are orthogonal. `variant="danger" shadow="reverse"` is a valid combination.

### Variant → token mapping

| `variant` | `--nb-button-bg` | `--nb-button-fg` | `--nb-button-border` |
|---|---|---|---|
| `default` | `var(--nb-main)` | `var(--nb-main-foreground)` | `var(--nb-border)` |
| `neutral` | `var(--nb-background)` | `var(--nb-foreground)` | `var(--nb-border)` |
| `primary` | `var(--nb-primary)` | `var(--nb-primary-foreground)` | `var(--nb-border)` |
| `secondary` | `var(--nb-secondary)` | `var(--nb-secondary-foreground)` | `var(--nb-border)` |
| `accent` | `var(--nb-accent)` | `var(--nb-accent-foreground)` | `var(--nb-border)` |
| `danger` | `var(--nb-danger)` | `var(--nb-danger-foreground)` | `var(--nb-border)` |
| `success` | `var(--nb-success)` | `var(--nb-success-foreground)` | `var(--nb-border)` |
| `warning` | `var(--nb-warning)` | `var(--nb-warning-foreground)` | `var(--nb-border)` |

Border color is the same for every variant by design — the heavy black border is the brutalist aesthetic. The token exists for consumers who want colored borders.

### Shadow → token mapping

| `shadow` | `--nb-button-shadow` at rest | At hover | Hover transform |
|---|---|---|---|
| `default` | `var(--nb-shadow-offset-x) var(--nb-shadow-offset-y) 0 var(--nb-shadow)` | `none` | translate into the shadow |
| `none` | `none` | `none` | none |
| `reverse` | `none` | (the full shadow value) | translate out (reveal shadow) |

### Token surface

Five public tokens for button:

| Token | Default | Driven by |
|---|---|---|
| `--nb-button-bg` | `var(--nb-main)` | `variant` prop |
| `--nb-button-fg` | `var(--nb-main-foreground)` | `variant` prop |
| `--nb-button-border` | `var(--nb-border)` | (theme-global) |
| `--nb-button-shadow` | full box-shadow value | `shadow` prop |
| `--nb-button-radius` | `var(--nb-radius)` | (theme-global) |

### Override examples

Theme-wide — every `variant="primary"` button across the app turns lavender:

```css
:root {
  --nb-primary: #b8a4ff;
}
```

Single instance — only this button is yellow:

```html
<button nbButton style="--nb-button-bg: var(--nb-yellow)">Save</button>
```

Pill-shaped buttons everywhere:

```css
:root {
  --nb-button-radius: 9999px;
}
```

Wild custom shadow on one button:

```html
<button nbButton style="--nb-button-shadow: 6px 6px 0 hotpink">Boom</button>
```

---

## Implementation pattern

Token defaults live in the directive's `classes()` computed string, alongside the property reads. Variant/shadow class maps reassign tokens only when the value differs from the base default.

```ts
classes = computed(() => nbClass(
  // base token defaults
  '[--nb-button-bg:var(--nb-main)]',
  '[--nb-button-fg:var(--nb-main-foreground)]',
  '[--nb-button-border:var(--nb-border)]',
  '[--nb-button-radius:var(--nb-radius)]',
  // read tokens
  'bg-(--nb-button-bg) text-(--nb-button-fg)',
  'rounded-(--nb-button-radius)',
  'border-2 border-(--nb-button-border)',
  // ...other base classes
  this.variantClass(),
  this.shadowClass(),
));
```

`variant="default"` is a no-op (returns `''`) — the base class already matches.

---

## Rollout plan

1. ~~**Pilot — button only.** Validate the pattern feels right in practice.~~ **Complete** (commit `5168aca`).
2. ~~**Review checkpoint.**~~ **Complete.** Directive stayed readable, variant/shadow maps fit on one screen, DevTools token chain resolves cleanly, scoped `style="--nb-button-bg: hotpink"` overrides do not leak. Light/dark contrast review tracked separately.
3. ~~**Roll out to** accordion, card, input/textarea, select, input-group, dialog, checkbox, badge, image-card, avatar, title, label, marquee.~~ **Complete.** See `TOKENS-ROLLOUT.md` for per-component PR history and verification matrix.
4. **Cleanup (Phase 3) and documentation (Phase 4).** See `TOKENS-ROLLOUT.md` §6–§7.
