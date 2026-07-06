# Design Props — The ng-brutalism Vocabulary

> Start here for "what can I customize with an input, and what's the CSS-only
> escape hatch?" This is the canonical entry point for the design-prop system.
> Mechanics (how a scalar input becomes a CSS variable) live in
> [token-customization.md](../architecture/token-customization.md). The
> boundary with Tailwind lives in
> [composition-philosophy.md](composition-philosophy.md).

ng-brutalism gives every primitive a small, consistent set of design props
instead of one-off style props per component. Learn the vocabulary once —
`tone`, `size`, `radius`, `shadow`, `border`, spacing, typography — and it
transfers to every primitive in the library, the way Radix's `1–9` scales
transfer across its themed components. The scales are just named instead of
numbered, and there's no separate layout runtime (see §6).

---

## 1. The vocabulary — 7 categories

| Category | Type | Named scale | Applies to |
|---|---|---|---|
| **tone** | `NbTone` | `surface · background · ink · cream · white · black · yellow · pink · mint · lavender · blue · primary · secondary · accent · success · warning · danger` | Semantic color recipe. Reflected as `data-nb-tone`; CSS resolves the actual colors. |
| **size** | component-local | Almost always `sm · md · lg` (some add `xl`) | A preset that scales multiple anatomy values at once (height, padding, font-size) — not a single shared token type. |
| **radius** | `NbRadius` | `none · sm · md · lg · xl · full` | Corner rounding. |
| **shadow** | `NbShadow` | `none · sm · default · hard · heavy` | The brutalist offset shadow. |
| **border** | `NbBorderStrength` | `none · thin · default · strong · thick` | Outline **width** only — color always comes from tone. |
| **spacing** | `NbSpacing` (gap) / `NbPadding` (padding) | gap: `none · xs · sm · md · lg · xl · 2xl` · padding: `none · xs · sm · md · lg · xl` | Layout primitives' internal gap/padding. |
| **typography** | — | — | Exclusive to `nbText` / `nbDisplay`. Everything else delegates expressive type to them (see [composition-philosophy.md](composition-philosophy.md)). |

Each scalar category (radius/shadow/border/gap/padding) follows one rule
end‑to‑end: **the Angular input and CSS customization write the same public
variable**. There's no `--*-input`/`--*-default` split — see
[token-customization.md §9–11](../architecture/token-customization.md) for why
that was rejected.

```html
<nb-card radius="xl" shadow="hard" border="strong" tone="mint">…</nb-card>
```

```css
/* Equivalent, scoped instead of per-element */
.pricing-cards { --nb-card-radius: var(--nb-radius-xl); }
```

---

## 2. The 5 archetypes

Not every primitive needs every category. A primitive's **archetype**
determines its standard set — members of an archetype expose that set
consistently; deviations are either a documented exemption (leaf) or a gap
(tracked in §3).

| Archetype | Standard set | Examples |
|---|---|---|
| **Surface/box** | tone, radius, shadow, border | `card`, `surface`, `callout`, `media-frame`, `image-card`, `dialog` |
| **Layout** | spacing (gap/padding) only — no tone/radius/shadow/border | `stack`, `cluster`, `split` |
| **Interactive** | tone, size, radius, shadow, border | `button`, `icon-button`, `input`, `textarea`, `select`, `checkbox`, `chip` |
| **Text** | typography only | `text`, `display` (`title`, `label` are structural markers with no props) |
| **Indicator/leaf** | **exempt** — usually tone only, sometimes radius | `badge`, `avatar`, `status-dot`, `progress`, `rating`, `separator` |

**The leaf exemption is deliberate, not a gap.** A `status-dot` doesn't get
`shadow` — forcing the full Surface/box set onto small decorative primitives
would add API surface nobody uses. Section §4 explains the audit rule that
tells the two apart.

---

## 3. Per-component prop matrix

✅ = ergonomic input exists · — = not applicable to this primitive (by
archetype/design) · a bare component name with no row means it has zero
design props (pure structural marker, e.g. `title`, `label`).

### Surface/box

| Component | tone | radius | shadow | border | notes |
|---|---|---|---|---|---|
| `card` | ✅ | ✅ | ✅ | ✅ | reference implementation of the archetype |
| `surface` | ✅ | ✅ | ✅ | ✅ | also has `size` and `padding` — the most complete primitive in the library |
| `callout` | ✅ | ✅ | ✅ | ✅ | `border` added in this pass (was CSS-only) |
| `media-frame` | ✅ | ✅ | ✅ | ✅ | adds `ratio`/`fit` (anatomy, not a design prop) |
| `image-card` | ✅ | ✅ | ✅ | ✅ | |
| `accordion-item` | ✅ | ✅ | ✅ | ✅ | lives on the item, not the accordion root (root only holds `type`/`value`) |
| `dialog` | ✅ | ✅ | ✅ | ✅ | `tone` is a plain input, not `NbToneCapability` — functionally equivalent |
| `input-group` | — | ✅ | — | — | wrapper archetype; `radius` added in this pass, shadow/border stay CSS-only hooks |

### Layout

| Component | gap | padding | notes |
|---|---|---|---|
| `cluster` | ✅ | ✅ | |
| `split` | ✅ | ✅ | |
| `stack` | ✅ | — | intentionally gap-only |
| `section` | — | ✅ | uses `divider` (line placement) instead of `border` — see §6 |

### Interactive

| Component | tone | size | radius | shadow | border | notes |
|---|---|---|---|---|---|---|
| `button` | ✅ | ✅ | ✅ | ✅ | ✅ | |
| `icon-button` | ✅ | ✅ | ✅ | ✅ | ✅ | adds `shape` (square/circle) |
| `input` | ✅ | ✅ | ✅ | ✅ | ✅ | `radius`/`shadow` added in this pass |
| `textarea` | ✅ | ✅ | ✅ | ✅ | ✅ | `radius`/`shadow` added in this pass |
| `select` | ✅ | — | ✅ | ✅ | ✅ | `radius`/`shadow` added in this pass; `NbNativeSelect` still CSS-only for radius/shadow (see §3.1) |
| `checkbox` | ✅ | ✅ | ✅ | — | — | `radius` added in this pass; shadow would be a focus ring, not elevation — excluded |
| `chip` | ✅ | — | ✅ | ✅ | ✅ | sizing is a chip-local `padding` enum, not the shared `size`/`NbPadding` scale |

### Text

| Component | typography |
|---|---|
| `text` | ✅ |
| `display` | ✅ |
| `title`, `label` | — (structural markers, composed with `text`/`display`) |
| `typography` (directive) | font-role axis (`inherit/body/display/accent/mono`), orthogonal to the 7 categories |

### Indicator/leaf

| Component | tone | radius | shadow | border | notes |
|---|---|---|---|---|---|
| `badge` | ✅ | ✅ | ✅ | ✅ | no `size` — single-size by design |
| `avatar` | ✅ | ✅ | ✅ | ✅ | no `size` — sizing is a layout concern (Tailwind `size-*`) |
| `status-dot` | — | ✅ | — | — | color comes from `state` (online/offline/live), not `tone` — state semantics already imply color |
| `progress`, `rating` | ✅ | — | — | — | correctly minimal |
| `separator`, `stat`, `marquee`, `avatar-group` | — | — | — | — | no design props — pure structural/behavioral primitives |
| `icon` | ✅ (local enum) | — | — | — | has `size` (`xs–xl`); no surface, so no radius/shadow/border |
| `sticker` | ✅ | — | — | — | irregular SVG shapes — radius/shadow/border don't apply; has `rotate` instead |
| `halftone` | — | — | — | — | raw numeric geometry inputs, not token-based — decorative, not a themed surface |

### 3.1 Known asymmetry (documented, not fixed this cycle)

`NbNativeSelect` (`select[nbSelect]`) reads the identical `--nb-select-radius`
/ `--nb-select-shadow` slots as the custom `NbSelect`, and already mirrors its
`border` input. Adding `radius`/`shadow` to it was out of the frozen 9-input
scope for this pass — CSS customization still works today via `style="--nb-select-radius: …"`. Tracked as a follow-up, not a broken contract.

---

## 4. Two tiers of customization

**Tier 1 — standard inputs.** The ergonomic path: an Angular `input()` writes
a public CSS variable. Use this for one-off, per-element overrides. Everything
in §3 is Tier 1.

**Tier 2 — CSS-only hooks.** Advanced, variable-only knobs with no matching
input, by design — usually because the value is too fine-grained for an
ergonomic scale, or because it's internal anatomy rather than a public slot.
Reach for these with a `style` attribute or a scoped stylesheet rule.

| Hook | Why it's Tier 2 |
|---|---|
| `--nb-underline-gap`, `--nb-title-wave-gap` | Fine-grained decorative tuning — an enum wouldn't add clarity over a raw value. |
| `--nb-sticker-shadow` | It's a **fill color**, not elevation — despite the name, it doesn't fit the `shadow` category. |
| Checkbox focus-visible ring | It's a focus ring, not customizable elevation; no `shadow` input is exposed. |
| Media-item internal anatomy (`--nb-media-item-radius`, `-gap`) | No fallback comma — internal to a `variant`/`size` combination, not a public slot. |
| `--nb-select-radius` / `-shadow` on `NbNativeSelect` | Public slot, ergonomic input intentionally deferred — see §3.1. |

The rule that tells a real gap from an intentional Tier 2 hook (the audit
methodology behind §3) lives in
[design-props-plan.md §4](../_archive/design-props-plan.md#4-audit-methodology-so-its-reproducible--and-why-no-auto-test):
a public slot only becomes a Tier 1 candidate when it's a **standard
category**, written with a **fallback comma**, on a **non-leaf** primitive.

---

## 5. Inputs vs CSS variables vs Tailwind

Three layers, three jobs — this is the short version; the full rationale and
recipes are in
[composition-philosophy.md](composition-philosophy.md#the-three-layers):

- **Inputs** (this doc) — the shared design vocabulary. Use for one-off,
  per-element decisions.
- **CSS variables** — the same vocabulary, scoped instead of per-element. Use
  for theme/recipe customization without adding a one-off input.
- **Tailwind** — page-specific layout and art direction (`w-full`,
  `mx-auto`, `absolute`, arbitrary geometry). ng-brutalism never competes with
  this layer — see §6.

---

## 6. What we deliberately don't do (and why)

**Named scales, not numeric `1–9`.** Radix's themed scales are numbers because
they're abstract steps in a generated ramp. ng-brutalism's scales describe a
concrete brutalist decision (`hard` shadow, `thick` border) — a name reads
better than a number you have to look up.

**Responsiveness stays Tailwind's job.** We don't have a `{{ initial, md }}`
responsive-object prop syntax. Use Tailwind's breakpoint classes for
responsive layout; ng-brutalism inputs describe one deterministic design
decision, not a per-breakpoint matrix.

**No layout primitives, no `width`/`columns`/`rows` inputs.** This was the
central question this plan answered: Radix Themes ships `Box`/`Flex`/`Grid`
with layout props as inputs. We explicitly rejected copying that runtime — it
would compete with Tailwind on Tailwind's own turf. `stack`/`cluster`/`split`
own gap, padding, and alignment (brutalist layout *decisions*); raw
positioning, sizing, and responsive display stay Tailwind classes. See
[composition-philosophy.md](composition-philosophy.md#when-to-add-a-new-input)
for the general "when to add an input" test.

---

## 7. Deep-dive links

- [token-customization.md](../architecture/token-customization.md) — the
  CSS-first architecture: why scalar inputs and CSS variables share one public
  slot, the input-vs-CSS precedence contract, and the tone recipe model.
- [composition-philosophy.md](composition-philosophy.md) — the ng-brutalism /
  `nbText` / Tailwind boundary, with the recommended composition pattern.
- [design-props-plan.md](../_archive/design-props-plan.md) — the plan and
  audit methodology behind this doc and the 9 additive inputs in §3.
