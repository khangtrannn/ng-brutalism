# Composition Overview

A composition system for building loud, token-driven, Angular-first brutalist UIs. Small primitives lock together like LEGO — each primitive owns one job, and they compose to build anything.

Every ng-brutalism UI starts with a surface. Regions inside that surface are sections. Content flows vertically in stacks and horizontally in clusters. Two-column layouts use split. Actions and metadata complete the picture.

## Import

```typescript
import { NbButton, NbChip, NbCluster, NbDisplay, NbSection, NbSplit, NbStack, NbSurface, NbText, NbTitle } from '@ng-brutalism/ui';
```

## Mental Model & Primitives

- **nbSurface**: The brutalist panel container
- **nbSection**: Structural regions inside a panel (e.g. header, body, footer)
- **nbStack**: Vertical layout flow
- **nbCluster**: Horizontal / wrapping groups
- **nbSplit**: Main + aside two-column layout
- **nbButton**: Action primitive
- **nbChip**: Small metadata primitive
- **nbText**: Inline or block copy
- **nbTitle**: Section headings
- **nbDisplay**: Big, loud display headings

## Decision Guide

| Need                                        | Primitive                                |
| ------------------------------------------- | ---------------------------------------- |
| Need a panel?                               | `nbSurface`                              |
| Need header / body / footer inside a panel? | `nbSection`                              |
| Need vertical spacing?                      | `nbStack`                                |
| Need horizontal or wrapping items?          | `nbCluster`                              |
| Need two columns or main/aside?             | `nbSplit`                                |
| Need an action?                             | `nbButton` or `nbIconButton`             |
| Need metadata?                              | `nbChip` or `nbBadge`                    |
| Need emphasis text?                         | `nbTitle`, `nbDisplay`, or `nbText`      |
| Need status?                                | `nbStatusDot`, `nbBadge`, or `nbCallout` |

## API Language

Most primitives in ng-brutalism share a core token vocabulary. Component-specific properties are documented in each component reference.

| Token     | Description                                                                                                         |
| --------- | ------------------------------------------------------------------------------------------------------------------- |
| `tone`    | Visual intent / color theme, including `default`, `surface`, `background`, `ink`, playful tones, and semantic tones |
| `size`    | Component scale                                                                                                     |
| `radius`  | Corner shape                                                                                                        |
| `shadow`  | Brutalist offset depth                                                                                              |
| `border`  | Outline strength                                                                                                    |
| `padding` | Internal space                                                                                                      |
| `gap`     | Child spacing                                                                                                       |
| `align`   | Cross-axis alignment                                                                                                |
| `justify` | Main-axis alignment                                                                                                 |
| `clip`    | Keep inner regions inside the outer radius                                                                          |
| `divider` | Border between regions — top, bottom, etc.                                                                          |

Common component-specific properties in the examples include `layout`, `collapse`, `weight`, `leading`, `tracking`, `transform`, `underline`, and `underlineGap`.

## Usage Examples

### Launch Panel

```html
<article nbSurface tone="cream" radius="xl" shadow="hard" border="strong" clip class="w-full max-w-xl">
  <header nbSection padding="lg" divider="bottom">
    <div nbCluster gap="sm" align="center" justify="between">
      <h2 nbTitle>Launch checklist</h2>
      <span nbChip tone="yellow">v0.2.0</span>
    </div>
  </header>

  <div nbSection padding="lg">
    <div nbStack gap="md">
      <p nbText>Build a loud release panel using composition primitives instead of class-heavy wrappers.</p>

      <div nbCluster gap="xs">
        <span nbChip tone="yellow">Surface</span>
        <span nbChip tone="pink">Section</span>
        <span nbChip tone="mint">Stack</span>
        <span nbChip tone="lavender">Cluster</span>
      </div>
    </div>
  </div>

  <footer nbSection padding="lg" divider="top" layout="between" align="center">
    <span nbText tone="muted">Ready for release</span>
    <button nbButton tone="black">Ship it</button>
  </footer>
</article>
```

### Before vs After (Tailwind vs Composition)

#### Before (Class Soup)

```html
<div class="rounded-2xl border-4 border-black bg-yellow-300 p-6 shadow-[8px_8px_0_#000]">
  <div class="flex items-center justify-between border-b-4 border-black pb-4">
    <h2>Launch card</h2>
    <span>v0.2.0</span>
  </div>

  <div class="py-4">
    <p>Lots of repeated class decisions.</p>
  </div>
</div>
```

#### After (Composition)

```html
<article nbSurface tone="yellow" radius="xl" shadow="hard" clip>
  <header nbSection padding="lg" divider="bottom" layout="between" align="center">
    <h2 nbTitle>Launch card</h2>
    <span nbChip tone="pink">v0.2.0</span>
  </header>

  <div nbSection padding="lg">
    <p nbText>Same structure, clearer composition.</p>
  </div>
</article>
```

### Customization

```html
<!-- Step 1: use public inputs first -->
<div nbSurface tone="cream" radius="xl" shadow="hard">Token-driven surface</div>

<!-- Step 2: CSS variables for fine-grained control -->
<div nbSurface tone="cream" style="--nb-surface-bg: #faf6f0">Custom surface background</div>

<!-- Overrides are local — only this element is affected -->
<div nbSurface style="--nb-shadow-offset-x: 12px; --nb-shadow-offset-y: 12px">Custom shadow offset</div>
```
