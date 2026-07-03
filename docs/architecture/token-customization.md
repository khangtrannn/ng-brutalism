# ng-brutalism Token Customization Architecture

> ↑ Start at [design-props.md](../components/design-props.md) for the
> design-prop vocabulary and per-component matrix; this doc is the deep-dive
> on the CSS-first mechanics.

## 1. Purpose

This document captures the thinking flow, tradeoffs, rejected approaches, and final direction for the next token customization architecture in `@ng-brutalism/ui`.

The goal is not only to tell an implementation agent what to change. The goal is also to preserve the reasoning behind the decisions, so future contributors and future versions of ourselves can understand why this architecture exists, what problems it solves, and where its temporary limits are.

The core problem we are solving:

> `ng-brutalism` wants to keep ergonomic Angular inputs while also supporting CSS token customization through local and inherited CSS variables. The implementation should hide the complexity from users, not push the complexity into the public CSS API.

The new architecture should reduce cognitive load for both:

* library users, who inspect CSS and customize components;
* library maintainers, who implement new primitives and capabilities.

---

## 2. Original Priority Requirement

The original priority model was:

```txt
1. Explicit Angular input wins.
2. Local CSS token customization wins when no input prop is provided.
3. Inherited parent CSS token customization wins when no local customization exists.
4. Component CSS defaults are the final fallback.
```

This model is still important, but it needs a more nuanced interpretation.

The final interpretation is:

```txt
Scalar design inputs win by writing an inline public CSS variable.
Local CSS customization wins when there is no scalar input.
Inherited CSS customization wins when there is no local override.
Component CSS fallback wins last.
```

For semantic inputs such as `tone`, the priority is different:

```txt
Semantic input selects a preset or recipe.
CSS variables can still override final visual values.
```

This means `tone="danger"` chooses the danger recipe, but `--nb-callout-bg` can still override the actual background.

---

## 3. Current Architecture Problem

The current implementation has several patterns that make customization harder:

```txt
Input -> TypeScript computed -> final inline CSS property
```

Examples of final inline properties:

```txt
background
color
border-color
border-width
border-radius
box-shadow
padding
gap
font-size
font-weight
line-height
letter-spacing
```

This gets input priority right, but it creates bigger problems:

1. TypeScript becomes the style engine.
2. CSS defaults are duplicated in TypeScript.
3. Local and inherited CSS customization can be blocked.
4. Many directives need repeated computed signals just to convert `undefined` to `null`.
5. Users see confusing style output in DevTools.
6. Capability directives become too responsible: input API, token resolving, fallback, and final style writing.

The new architecture moves final styling decisions back to CSS.

---

## 4. Rejected Approach 1: `resolvedX` in TypeScript

One early idea was to normalize every optional input through computed signals:

```ts
readonly resolvedRadius = computed<NbRadius>(() => {
  return this.radius() ?? 'md';
});

readonly radiusStyle = computed(() => {
  return nbRadiusValue(this.resolvedRadius());
});
```

This was rejected.

Reason:

```txt
CSS already owns component defaults.
TypeScript should not duplicate CSS fallback logic.
```

If `radius` is unset, TypeScript should not decide that the fallback is `md`, `lg`, or `xl`. That fallback belongs in the CSS file because it may depend on size, variant, layout, or component-specific styling.

Rejected rule:

```txt
undefined input means resolve to a default token in TypeScript.
```

Final rule:

```txt
undefined input means do not write an inline override.
Let CSS fallback and customization handle the value.
```

---

## 5. Rejected Approach 2: Full CSS Variable Priority Chain

Another idea was to introduce three CSS variable layers:

```css
border-radius: var(
  --nb-callout-radius-input,
  var(
    --nb-callout-radius,
    var(--nb-callout-radius-default)
  )
);
```

This is theoretically clean:

```txt
--nb-callout-radius-input   = Angular input
--nb-callout-radius         = user customization
--nb-callout-radius-default = component fallback
```

It perfectly models the priority chain.

But it was rejected as the default approach.

Reason:

```txt
It leaks too much implementation complexity into DevTools.
Users would see too many variables and need to learn too much about the library internals.
```

A library should abstract this complexity. Users should not need to understand `input`, `default`, or private fallback variables just to customize a radius.

Rejected rule:

```txt
Every customizable value needs --*-input and --*-default variables.
```

Final rule:

```txt
Prefer one public CSS variable slot per customizable scalar value.
```

---

## 6. Rejected Approach 3: Private Custom Properties

Another idea was to hide the extra layers with underscore-prefixed variables:

```css
--_nb-callout-radius-input
--nb-callout-radius
--_nb-callout-radius-default
```

This was also rejected as the default approach.

Reason:

```txt
CSS custom properties are not truly private.
Users can still inspect them in DevTools.
The underscore is only a convention, not a real abstraction.
```

This still pushes complexity into the user’s debugging experience.

Rejected rule:

```txt
Use private-looking CSS custom properties to hide implementation details.
```

Final rule:

```txt
Avoid extra internal custom properties unless the component truly needs them.
```

---

## 7. Rejected Approach 4: Size-Specific Public Variables

Another idea was to use variables like:

```css
--nb-callout-radius
--nb-callout-radius-sm
--nb-callout-radius-md
--nb-callout-radius-lg
--nb-callout-radius-xl
```

This gives users a powerful way to customize size scales.

But it was rejected as the default model.

Reason:

```txt
It solves the architecture problem by adding more concepts for users to learn.
```

It may be useful later for advanced theming, but it should not be the baseline architecture.

Rejected rule:

```txt
Expose a public variable for every size-specific fallback.
```

Final rule:

```txt
Expose the smallest useful public CSS API first.
```

---

## 8. Rejected Approach 5: Tone as TypeScript Multi-Var Generator

Previously, `tone` behaved like a composite token:

```txt
tone -> background
tone -> foreground
tone -> border color
```

This led to the idea of needing two normalization shapes:

```txt
input transform      // scalar token -> one CSS value
multi-var generator  // composite token -> multiple CSS values
```

This was rejected for `tone`.

Reason:

```txt
tone is semantic intent, not a low-level multi-style generator.
```

Tone should select a visual recipe. CSS should own the recipe.

Rejected rule:

```txt
tone input computes multiple style variables in TypeScript.
```

Final rule:

```txt
tone input reflects `data-nb-tone`.
Shared tone recipe CSS maps `data-nb-tone` to internal current tone slots; components consume those slots.
```

---

## 9. Final Architecture Direction

The final model:

```txt
Semantic inputs -> data attributes.
Scalar design inputs -> inline public CSS variables.
CSS variables -> public customization API.
CSS -> final properties, fallbacks, and recipes.
```

This keeps the existing `ng-brutalism` philosophy:

```txt
Angular inputs are ergonomic.
CSS variables are customizable.
Both are first-class.
```

But it avoids exposing complicated internal priority layers.

---

## 10. Core Rule

For scalar design tokens:

```txt
Use one public CSS variable slot.
Angular input writes that same slot inline.
CSS customization also uses that same slot.
CSS fallback handles default values.
```

Example:

```ts
host: {
  '[style.--nb-callout-radius]': 'radiusStyle()',
}
```

```css
[data-nb-callout] {
  border-radius: var(--nb-callout-radius, var(--nb-radius-xl));
}
```

The public variable is:

```txt
--nb-callout-radius
```

This variable can come from:

```txt
1. Angular input, written inline.
2. Local CSS customization.
3. Inherited CSS customization.
```

CSS fallback is only used when the variable is not present.

---

## 11. Conflict Rule

Because Angular input and user CSS customization use the same public variable slot, conflicts are possible.

Example:

```html
<div
  nbCallout
  radius="sm"
  style="--nb-callout-radius: var(--nb-radius-xl)"
>
</div>
```

This is conflicting usage.

Decision:

```txt
This is not considered a major blocker because input priority is part of the library model.
If both the Angular input and the same CSS variable are used on the same element, the Angular input is expected to win.
```

Documentation should clearly say:

```txt
Use Angular inputs for one-off component usage.
Use CSS variables for class, scope, or theme customization.
Avoid setting both the input and the same CSS variable on the same element.
```

Temporary limit:

```txt
The exact conflict behavior depends on how Angular writes host styles and how the user writes inline styles.
This should be documented and tested.
```

Future improvement:

```txt
If this becomes confusing in real usage, we can revisit separate internal input variables or more explicit conflict handling.
```

---

## 12. Tone Decision

Tone follows a different model.

Final decision:

```txt
tone is a semantic recipe selector.
tone should not generate multiple CSS values in TypeScript.
```

TypeScript capability

```ts
@Directive({
  host: {
    '[attr.data-nb-tone]': 'tone() ?? null',
  },
})
export class NbToneCapability {
  readonly tone = input<NbTone | undefined>(undefined);
}
```

Shared tone recipe CSS

Use a single, low-specificity shared recipe layer that maps `data-nb-tone` to internal current tone slots. Keep selector specificity minimal with `:where(...)`.

```css
:where([data-nb-tone='neutral']) {
  --_nb-tone-bg: var(--nb-tone-neutral-bg);
  --_nb-tone-fg: var(--nb-tone-neutral-fg);
  --_nb-tone-border-color: var(--nb-tone-neutral-border);
}

:where([data-nb-tone='warning']) {
  --_nb-tone-bg: var(--nb-tone-warning-bg);
  --_nb-tone-fg: var(--nb-tone-warning-fg);
  --_nb-tone-border-color: var(--nb-tone-warning-border);
}

:where([data-nb-tone='danger']) {
  --_nb-tone-bg: var(--nb-tone-danger-bg);
  --_nb-tone-fg: var(--nb-tone-danger-fg);
  --_nb-tone-border-color: var(--nb-tone-danger-border);
}
```

Component consumption

Components consume the shared internal tone slots while still honoring public component vars and neutral fallbacks:

```css
[data-nb-callout] {
  background: var(--nb-callout-bg, var(--_nb-tone-bg, var(--nb-tone-neutral-bg)));
  color: var(--nb-callout-fg, var(--_nb-tone-fg, var(--nb-tone-neutral-fg)));
  border-color: var(
    --nb-callout-border-color,
    var(--_nb-tone-border-color, var(--nb-tone-neutral-border))
  );
}
```

Notes:

- Neutral fallback is required because no `data-nb-tone` attribute is rendered when the tone input is unset (Option B). The final property chain must still fall back to neutral tokens.
- Do NOT set `--_nb-tone-*` locally on components; that blocks inherited tone context from parents.
- Tone acts as contextual style scope: a parent with `data-nb-tone` provides the current recipe via `--_nb-tone-*` variables for descendants unless overridden.

Public vs internal variable contract

1. Public global tone tokens:
   - `--nb-tone-warning-bg`, `--nb-tone-warning-fg`, `--nb-tone-warning-border`

2. Internal current tone slots:
   - `--_nb-tone-bg`, `--_nb-tone-fg`, `--_nb-tone-border-color` (internal, not part of public API)

3. Public component customization variables:
   - `--nb-callout-bg`, `--nb-callout-fg`, `--nb-callout-border-color`

`--_nb-tone-*` variables are implementation details. They may appear in DevTools but users should not rely on or customize them directly; they may change between releases.

## Shared Tone Recipe Layer

Why centralize tone recipes?

- Per-component tone recipe duplication was rejected: it moves duplication from TypeScript into many CSS files and is hard to maintain.
- TypeScript multi-var generation was rejected: it pushes recipe logic into code and prevents CSS-based overrides and inheritance.
- Shared internal current tone slots (`--_nb-tone-*`) centralize the current recipe so components can consume them consistently.

Guidelines:

- `--_nb-tone-*` is internal — document public customization via component vars or global tone tokens only.
- Keep neutral fallback chains in components because `data-nb-tone` is omitted when no tone input exists (Option B).
- Do not set `--_nb-tone-*` locally on components; that blocks inherited tone context from a parent with `data-nb-tone`.

---

## 13. Capability Directive vs Style Input Boundary

The new boundary:

```txt
Capability directive = reusable semantic or state adapter.
Style input = reusable scalar token-to-CSS-variable adapter.
```

Another way to say it:

```txt
Capability answers: what semantic state is this component in?
Style input answers: what CSS variable should this explicit token write?
```

---

## 14. When to Use Capability Directive

Use a capability directive when the input is semantic, stateful, behavioral, or selector-driven.

Examples:

```txt
tone
state
variant
orientation
disabled
selected
pressed
underline
resetMargin
inGroup
```

Capability directives usually output:

```txt
data-*
aria-*
host state
behavior hooks
```

Example:

```ts
@Directive({
  host: {
    '[attr.data-nb-tone]': 'tone() ?? null',
  },
})
export class NbToneCapability {
  readonly tone = input<NbTone | undefined>(undefined);
}
```

Do not use capability directives to write final CSS properties.

---

## 15. When to Use Style Input

Use a style input when the input is a scalar design override.

Examples:

```txt
radius
shadow
padding
gap
border width
font size
font weight
line height
tracking
measure
icon size
rotate
scale
duration
```

A scalar design input maps one token to one CSS value.

Example:

```ts
readonly radius = input(null, {
  transform: nbRadiusStyleTransform,
});
```

Host binding:

```ts
host: {
  '[style.--nb-callout-radius]': 'radius()',
}
```

CSS:

```css
[data-nb-callout] {
  border-radius: var(--nb-callout-radius, var(--nb-radius-xl));
}
```

The component owns the namespace:

```txt
--nb-callout-radius
--nb-card-radius
--nb-surface-radius
```

Input transforms only normalize the value.

---

## 16. What Happens to Existing Style Capability Directives

Current style capability directives include concepts like:

```txt
NbRadiusCapability
NbShadowCapability
NbPaddingCapability
NbBorderCapability
NbGapCapability
```

These previously wrote final styles or final style-like values.

Under the new architecture, they should not be used in new code for scalar visual styling unless the namespace problem is solved.


Temporary decision:

```txt
Keep them temporarily if needed for migration compatibility.
Stop using them in new migrated components.
Replace their usage with input transforms and direct `input()` patterns over time.
Eventually clean them up.
```

Reason:

```txt
A generic radius capability does not know whether it should write:
--nb-callout-radius
--nb-card-radius
--nb-surface-radius
```

Avoid introducing namespace-aware capability directives for now.

Rejected for now:

```txt
provideNbStyleNamespace('callout')
```

Reason:

```txt
It adds framework complexity and may require less obvious Angular patterns.
```

Future improvement:

```txt
After enough components migrate, revisit whether a namespace-aware capability abstraction is worth it.
```

---


## 17. Input transforms (recommended)

Do not wrap Angular `input()` inside helper functions. Instead, use named pure input transform functions that map an optional token value to a `string | null` CSS variable value. Call `input()` directly in the class member initializer and pass the named transform in the options object.

Example transform utility (see `core/input-transforms`):

```ts
export function nbTokenStyleValue<TToken>(
  token: TToken | null | undefined,
  resolve: (token: TToken) => string,
): string | null {
  return token == null ? null : resolve(token);
}
```

Example specialized named transform:

```ts
export function nbRadiusStyleTransform(radius: NbRadius | null | undefined) {
  return nbTokenStyleValue(radius, nbRadiusValue);
}
```

Then call `input()` directly in the component:

```ts
protected readonly radiusVar = input(null, {
  alias: 'radius',
  transform: nbRadiusStyleTransform,
});
```

This pattern is statically analyzable by the Angular compiler and avoids the unsupported pattern of helper functions that call `input()` internally.

---

## 19. Token Resolver Output

Token resolver functions should return CSS token references where possible.

Preferred:

```txt
var(--nb-radius-sm)
```

Avoid:

```txt
0.25rem
```

Reason:

```txt
Returning CSS token references keeps theming/customization flexible.
```

---

## 20. Data Attribute Policy

Use `data-*` only for semantic state, behavior, preset, or selector-driven styling.

Keep data attributes for:

```txt
data-size
data-layout
data-orientation
data-state
data-disabled
data-selected
data-open
data-variant
data-nb-tone
data-underline
data-reset-margin
```

Remove data attributes that only mirror scalar design values.

Examples to remove or avoid:

```txt
data-radius
data-padding
data-shadow
data-border
data-gap
data-background
```

Caveat:

```txt
data-size can be valid if size is a preset affecting multiple anatomy values.
```

For example, `NbCallout size` affects:

```txt
min-height
padding
font-size
border-width
radius fallback
```

So `size` is a semantic preset and should stay as `data-size`.

---

## 21. CSS Authoring Rule

Do not set public customization variables as component defaults.

Avoid:

```css
[data-nb-callout] {
  --nb-callout-radius: var(--nb-radius-xl);
}
```

Reason:

```txt
This creates a local value on the component and blocks inherited customization.
```

Use fallback in the final property instead:

```css
[data-nb-callout] {
  border-radius: var(--nb-callout-radius, var(--nb-radius-xl));
}
```

For size variants:

```css
[data-nb-callout][data-size='sm'] {
  border-radius: var(--nb-callout-radius, var(--nb-radius-md));
}
```

Temporary tradeoff:

```txt
This repeats the same public variable across size rules.
It is slightly repetitive, but it is easier for users to read than introducing --*-default or --*-by-size variables.
```

Future improvement:

```txt
If repetition becomes too high or hard to maintain, revisit a derived default variable pattern.
```

---

## 22. Final Inline Style Rule

Do not write final inline properties for customizable design tokens.

Avoid:

```ts
'[style.border-radius]': 'radiusStyle()'
```

Prefer:

```ts
'[style.--nb-callout-radius]': 'radiusStyle()'
```

CSS owns the final property:

```css
[data-nb-callout] {
  border-radius: var(--nb-callout-radius, var(--nb-radius-xl));
}
```

Exceptions are allowed for behavior/internal runtime values, such as:

```txt
progress percentage width
icon mask/image source
halftone geometry
dialog runtime behavior
select positioning/state behavior
```

These are not token customization concerns.

---

## 23. Pilot Component: NbCallout

`NbCallout` is the first pilot because it exercises the important decisions:

```txt
size preset
layout state
tone semantic recipe
radius scalar input
shadow scalar input
data-radius removal
CSS fallback by size
```

### Desired TypeScript Shape

```ts
import { Directive, input } from '@angular/core';

import { NbToneCapability } from '../core/capabilities';
import {
  nbRadiusStyleTransform,
  nbShadowStyleTransform,
} from '../core/input-transforms';

export type NbCalloutSize = 'sm' | 'md' | 'lg' | 'xl';
export type NbCalloutLayout = 'inline' | 'between' | 'center';

@Directive({
  selector: '[nbCallout]',
  hostDirectives: [
    { directive: NbToneCapability, inputs: ['tone'] },
  ],
  host: {
    '[attr.data-nb-callout]': '""',
    '[attr.data-size]': 'size()',
    '[attr.data-layout]': 'layout()',

    '[style.--nb-callout-radius]': 'radius()',
    '[style.--nb-callout-shadow]': 'shadow()',
  },
})
export class NbCallout {
  readonly size = input<NbCalloutSize>('lg');
  readonly layout = input<NbCalloutLayout>('inline');

  readonly radius = input(null, {
    transform: nbRadiusStyleTransform,
  });
  readonly shadow = input(null, {
    transform: nbShadowStyleTransform,
  });
}
```

### Desired CSS Shape

```css
[data-nb-callout] {
  display: flex;
  align-items: center;
  border-style: solid;

  background: var(--nb-callout-bg, var(--_nb-tone-bg, var(--nb-tone-neutral-bg)));
  color: var(--nb-callout-fg, var(--_nb-tone-fg, var(--nb-tone-neutral-fg)));
  border-color: var(
    --nb-callout-border-color,
    var(--_nb-tone-border-color, var(--nb-tone-neutral-border))
  );

  border-radius: var(--nb-callout-radius, var(--nb-radius-xl));
  box-shadow: var(--nb-callout-shadow, var(--nb-shadow-hard));
}

[data-nb-callout][data-size='sm'] {
  min-height: var(--nb-callout-min-height, 2.5rem);
  padding: var(--nb-callout-padding, var(--nb-space-3));
  font-size: var(--nb-callout-font-size, var(--nb-font-size-sm));
  border-width: var(--nb-callout-border-width, var(--nb-border-width-md));
  border-radius: var(--nb-callout-radius, var(--nb-radius-md));
}

[data-nb-callout][data-size='md'] {
  min-height: var(--nb-callout-min-height, 3rem);
  padding: var(--nb-callout-padding, var(--nb-space-4));
  font-size: var(--nb-callout-font-size, var(--nb-font-size-md));
  border-width: var(--nb-callout-border-width, var(--nb-border-width-md));
  border-radius: var(--nb-callout-radius, var(--nb-radius-lg));
}

[data-nb-callout][data-size='lg'] {
  min-height: var(--nb-callout-min-height, 3.5rem);
  padding: var(--nb-callout-padding, var(--nb-space-5));
  font-size: var(--nb-callout-font-size, var(--nb-font-size-md));
  border-width: var(--nb-callout-border-width, var(--nb-border-width-lg));
  border-radius: var(--nb-callout-radius, var(--nb-radius-xl));
}

[data-nb-callout][data-size='xl'] {
  min-height: var(--nb-callout-min-height, 4rem);
  padding: var(--nb-callout-padding, var(--nb-space-6));
  font-size: var(--nb-callout-font-size, var(--nb-font-size-lg));
  border-width: var(--nb-callout-border-width, var(--nb-border-width-lg));
  border-radius: var(--nb-callout-radius, var(--nb-radius-2xl));
}

[data-nb-callout][data-layout='inline'] {
  justify-content: flex-start;
}

[data-nb-callout][data-layout='between'] {
  justify-content: space-between;
}

[data-nb-callout][data-layout='center'] {
  justify-content: center;
}

/* Tone recipes are centralized in the shared tone recipe layer; components consume --_nb-tone-* internal slots. */
```

### Remove

```txt
data-radius
manual radius computed
final border-radius host style
shadow final box-shadow host style
tone final background/color/border-color host styles
```

---

## 24. Testing Policy

For each migrated scalar input, test:

### No input

```txt
The element should not have the inline public CSS variable.
```

Example:

```ts
expect(element.style.getPropertyValue('--nb-callout-radius')).toBe('');
```

### Input provided

```txt
The element should have the inline public CSS variable.
```

Example:

```ts
expect(element.style.getPropertyValue('--nb-callout-radius')).toBe(
  'var(--nb-radius-sm)',
);
```

### Inherited customization

```html
<section style="--nb-callout-radius: var(--nb-radius-none)">
  <div nbCallout></div>
</section>
```

Expected:

```txt
The callout can inherit --nb-callout-radius when no input is provided.
```

### Local customization

```html
<div nbCallout style="--nb-callout-radius: var(--nb-radius-lg)"></div>
```

Expected:

```txt
Local customization works when no input is provided.
```

### Input wins over parent customization

```html
<section style="--nb-callout-radius: var(--nb-radius-none)">
  <div nbCallout radius="lg"></div>
</section>
```

Expected:

```txt
The input writes inline --nb-callout-radius and wins.
```

### Design mirror attribute removed

```txt
data-radius should not exist.
```

### Tone recipe

Test:

```txt
tone input reflects `data-nb-tone`.
CSS variable customization can override tone recipe values.
```

Testing caveat:

```txt
Prefer asserting style variable presence/absence in unit tests.
Use computed style assertions only in integration or browser tests where CSS variable resolution is reliable.
```

---

## 25. Migration Order

Approved migration order:

```txt
Phase 0: Architecture documentation.
Phase 1: NbCallout pilot.
Phase 2: Simple surfaces: Card, Badge, Avatar, MediaFrame (MediaFrame done).
Phase 3: Surface, Button, IconButton (Surface done).
Phase 4: Layout primitives: Stack, Cluster, Split, Section, ChipGroup.
Phase 5: Forms and overlays: Input, Textarea, NativeSelect, Select, Dialog.
Phase 6: Typography and Icon.
Phase 7: Special components: Sticker, Halftone, Progress, Rating, Separator, MediaItem.
```

Reason:

```txt
Do not start with shared style capabilities.
They affect too many components at once.
Pilot the model on a contained component first.
```

---

## 26. Temporary Decisions and Limits

### Temporary Decision 1: Style capability directives remain during migration

Current style directives may remain temporarily to avoid a huge refactor.

Limit:

```txt
They should not be used as the target architecture for newly migrated components.
```

Future:

```txt
Clean them up after enough components migrate.
```

---

### Temporary Decision 2: CSS repeats public variables in size selectors

Example:

```css
[data-nb-callout][data-size='sm'] {
  border-radius: var(--nb-callout-radius, var(--nb-radius-md));
}
```

Limit:

```txt
This is repetitive and can feel odd at first glance.
```

Reason for accepting:

```txt
It is easier for users to understand than additional default/input/private CSS variables.
```

Future:

```txt
If repetition grows too much, revisit a derived fallback variable pattern.
```

---

### Temporary Decision 3: Angular input and CSS customization share one slot

Example:

```txt
radius input writes --nb-callout-radius.
CSS customization also uses --nb-callout-radius.
```

Limit:

```txt
Conflicts are possible if both are set on the same element.
```

Reason for accepting:

```txt
It keeps the public CSS API simple.
It preserves input priority through inline style.
```

Future:

```txt
If conflict behavior becomes confusing, revisit --*-input variables for specific components.
```

---

### Temporary Decision 4: Tone recipe is CSS-only

Limit:

```txt
Tone recipes may need repeated CSS rules across components.
```

Reason for accepting:

```txt
It avoids a TypeScript multi-style generator and keeps tone semantic.
```

Future:

```txt
If repeated tone recipe CSS becomes too large, introduce CSS mixins, shared layers, or generated CSS utilities.
```

---

### Temporary Decision 5: No namespace-aware capability yet

Limit:

```txt
Components must bind their own namespaced CSS variables.
```

Reason for accepting:

```txt
It keeps the architecture explicit and avoids dynamic host binding complexity.
```

Future:

```txt
After migration, revisit whether namespace-aware capabilities are worth the abstraction.
```

---

## 27. Final Architecture Summary

The final direction:

```txt
CSS-first, input-friendly token customization.
```

The rules:

```txt
1. Semantic inputs use data-*.
2. Scalar design inputs use input transforms.
3. Scalar design inputs write public component CSS variables inline.
4. CSS variables are the public customization API.
5. CSS owns final properties, fallbacks, and tone recipes.
6. TypeScript does not write final customizable CSS properties.
7. TypeScript does not duplicate CSS defaults.
8. Tone is semantic data, not a TypeScript multi-var generator.
9. Capability directives are for semantic/state behavior.
10. Input transforms normalize scalar visual token inputs.
```

The desired user mental model:

```txt
Use Angular inputs for one-off overrides.
Use CSS variables for scoped customization.
```

Example:

```html
<div nbCallout radius="sm" tone="warning">
  Input-driven callout
</div>
```

```css
.marketing-section {
  --nb-callout-radius: var(--nb-radius-none);
  --nb-callout-bg: var(--nb-tone-accent-bg);
}
```

The internal complexity is handled by the library.

---

## 28. Input vs CSS Precedence Contract

The architecture's central claim: explicit Angular inputs win over CSS customization.

### Precedence Model

1. **Angular input set** → write inline public CSS variable.
2. **Input not set** → CSS variable resolves from:
   - Local inline CSS on element
   - Inherited CSS from parent scopes
   - Component CSS fallback
3. **!important CSS** → wins over inline input variable.

### Key Principle

Inline styles beat CSS rules. Since inputs write inline variables, they beat stylesheet-defined customization.

### Important Escape Hatch

If a component's computed style must not be overridable by inputs (rare, usually for accessibility), user CSS can use `!important`:

```css
/* Override an input — only when necessary */
button {
  border-radius: 0 !important; /* Beats inline input variable */
}
```

### Usage Guidance

1. **Use Angular inputs for one-off component overrides.**

   ```html
   <button nbButton radius="lg">Book</button>
   ```

2. **Use CSS variables for class/scope/theme customization** (no input needed).

   ```css
   .marketing-buttons {
     --nb-button-radius: var(--nb-radius-none);
   }
   ```

   ```html
   <button nbButton>Book</button>
   ```

3. **Avoid setting both the input and the same CSS variable on one element.**

   ```html
   <!-- ❌ Conflict: do not mix input and CSS var on same element -->
   <button nbButton radius="lg" style="--nb-button-radius: var(--nb-radius-sm)">
     Bad
   </button>

   <!-- ✅ Use input OR CSS var, not both -->
   <button nbButton radius="lg">Good</button>
   <button nbButton style="--nb-button-radius: var(--nb-radius-sm)">Good</button>
   ```

### Testing & Documentation

The precedence is verified at the computed-style level via browser tests. The contract is stable and tested.

---

## 29. Agent Implementation Prompt

Please refactor `ng-brutalism` token customization using the new CSS-first, input-friendly architecture.

Do not implement the older `--*-input / --*-default` model.

Core decisions:

```txt
1. Use one public CSS variable slot per scalar design token.
2. Angular scalar inputs write that same public CSS variable inline.
3. Do not use --*-input, --*-default, or private --_ variables by default.
4. Tone becomes semantic `data-nb-tone`, and CSS owns tone recipes via a shared recipe layer.
5. CSS variables can override tone recipe final values.
6. Capability directives are for semantic/state only.
7. Input transforms normalize scalar visual token inputs.
8. Keep scalar Angular inputs like radius, shadow, padding, and gap as part of ng-brutalism DX.
9. Remove data-* attributes that only mirror scalar design values.
10. Pilot this architecture on NbCallout first.
```

Implementation steps:

```txt
1. Add core input transforms.
2. Add the generic token style transform factory.
3. Add named pure transforms for radius, shadow, padding, gap, and border width.
4. Migrate NbCallout first.
5. Remove data-radius from NbCallout.
6. Replace manual computed radiusStyle with direct input() + nbRadiusStyleTransform.
7. Bind radius to --nb-callout-radius.
8. Bind shadow to --nb-callout-shadow.
9. Convert tone to `data-nb-tone` only.
10. Move final background/color/border-color/radius/shadow logic to CSS.
11. Add or update tests based on the new policy.
12. Report tradeoffs and any unexpected conflicts.
```

Do not:

```txt
- Do not create resolvedRadius or resolvedShadow in TypeScript.
- Do not duplicate CSS defaults in TypeScript.
- Do not bind final customizable properties like border-radius or box-shadow from TypeScript.
- Do not add --nb-callout-radius-input.
- Do not add --nb-callout-radius-default.
- Do not add private --_nb-callout-radius variables.
- Do not keep data-radius unless a real selector needs it.
- Do not introduce nbTokenVarsInput for tone.
```

Acceptance criteria for `NbCallout`:

```txt
1. No radius input means no inline --nb-callout-radius.
2. radius="sm" writes inline --nb-callout-radius.
3. Parent --nb-callout-radius customization works when no radius input exists.
4. Local --nb-callout-radius customization works when no radius input exists.
5. Radius input wins over inherited customization.
6. data-radius is removed.
7. size and layout behavior remain unchanged.
8. tone reflects `data-nb-tone` only when provided.
9. Base CSS handles neutral tone fallback.
10. --nb-callout-bg, --nb-callout-fg, and --nb-callout-border-color can override tone recipe values.
```
