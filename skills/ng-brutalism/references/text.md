# Text

`nbText` is an attribute directive for general-purpose typography — body copy, labels, brand names, metadata, and captions. It composes cleanly with semantic HTML elements and other primitives without creating a wrapper element.

## Import

```typescript
import { NbText } from '@ng-brutalism/ui';
```

## API Reference

| Attribute   | Type                                                                                                                          | Default     | Description                                                                                        |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------- |
| `size`      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                                                        | `'md'`      | Font size (0.75 rem – 1.25 rem).                                                                   |
| `weight`    | `'normal' \| 'medium' \| 'semibold' \| 'bold' \| 'extrabold' \| 'black'`                                                      | `'normal'`  | Font weight (400 – 900).                                                                           |
| `tone`      | `'default' \| 'muted' \| 'subtle' \| 'inverse' \| 'primary' \| 'secondary' \| 'accent' \| 'danger' \| 'success' \| 'warning'` | `'default'` | Text color mapped to a design token.                                                               |
| `transform` | `'none' \| 'uppercase' \| 'lowercase' \| 'capitalize'`                                                                        | `'none'`    | CSS text-transform.                                                                                |
| `tracking`  | `'tight' \| 'normal' \| 'wide' \| 'wider'`                                                                                    | `'normal'`  | Letter-spacing (−0.025 em – 0.05 em).                                                              |
| `measure`   | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg'`                                                                                      | `'none'`    | max-width cap for readable line lengths (20 rem – 44 rem).                                         |
| `leading`   | `'none' \| 'tight' \| 'normal' \| 'relaxed'`                                                                                  | `'normal'`  | Line-height override. Defaults to a size-matched value.                                            |
| `underline` | `'none' \| 'bar' \| 'wave'`                                                                                                   | `'none'`    | Built-in accent underline beneath the text. Style it with the `--nb-underline-*` tokens.           |
| `reset`     | `boolean`                                                                                                                     | `true`      | Sets margin to 0, removing browser paragraph/heading margins so layout primitives own all spacing. |

## Usage Examples

### Default

```html
<p nbText>Build loud interfaces with sharp Angular primitives.</p>
```

### Preview

```html
<span nbText size="xl" weight="extrabold">Roam &amp; Go</span>

<p nbText size="md" weight="medium" tone="muted" measure="md">Explore iconic neighborhoods, savor local flavors, and make unforgettable memories on every trip.</p>

<span nbText size="sm" weight="bold" transform="uppercase" tracking="wide"> New release </span>
```

### Sizes

```html
<span nbText size="xs">The quick brown fox — 0.75rem</span>
<span nbText size="sm">The quick brown fox — 0.875rem</span>
<span nbText size="md">The quick brown fox — 1rem</span>
<span nbText size="lg">The quick brown fox — 1.125rem</span>
<span nbText size="xl">The quick brown fox — 1.25rem</span>
```

### Weights

```html
<span nbText size="lg" weight="normal">Build loud. Stay sharp.</span>
<span nbText size="lg" weight="medium">Build loud. Stay sharp.</span>
<span nbText size="lg" weight="semibold">Build loud. Stay sharp.</span>
<span nbText size="lg" weight="bold">Build loud. Stay sharp.</span>
<span nbText size="lg" weight="extrabold">Build loud. Stay sharp.</span>
<span nbText size="lg" weight="black">Build loud. Stay sharp.</span>
```

### Tones

```html
<span nbText tone="default">Neo-Brutalism is intentional.</span>
<span nbText tone="muted">Neo-Brutalism is intentional.</span>
<span nbText tone="subtle">Neo-Brutalism is intentional.</span>
<span nbText tone="inverse">Neo-Brutalism is intentional.</span>
<span nbText tone="primary">Neo-Brutalism is intentional.</span>
<span nbText tone="secondary">Neo-Brutalism is intentional.</span>
<span nbText tone="accent">Neo-Brutalism is intentional.</span>
<span nbText tone="danger">Neo-Brutalism is intentional.</span>
<span nbText tone="success">Neo-Brutalism is intentional.</span>
<span nbText tone="warning">Neo-Brutalism is intentional.</span>
```

### Transform

```html
<span nbText weight="bold" transform="none">Flight Included — Tokyo City Escape</span>
<span nbText weight="bold" transform="uppercase">Flight Included — Tokyo City Escape</span>
<span nbText weight="bold" transform="lowercase">Flight Included — Tokyo City Escape</span>
<span nbText weight="bold" transform="capitalize">Flight Included — Tokyo City Escape</span>
```

### Tracking

```html
<span nbText weight="black" transform="uppercase" tracking="tight">New release</span>
<span nbText weight="black" transform="uppercase" tracking="normal">New release</span>
<span nbText weight="black" transform="uppercase" tracking="wide">New release</span>
<span nbText weight="black" transform="uppercase" tracking="wider">New release</span>
```

### Measure

```html
<!-- no cap -->
<p nbText measure="none">A token-driven neo-brutalist Angular UI library...</p>

<!-- 20rem -->
<p nbText tone="muted" measure="xs">A token-driven neo-brutalist Angular UI library...</p>

<!-- 28rem -->
<p nbText tone="muted" measure="sm">A token-driven neo-brutalist Angular UI library...</p>

<!-- 36rem -->
<p nbText tone="muted" measure="md">A token-driven neo-brutalist Angular UI library...</p>

<!-- 44rem -->
<p nbText tone="muted" measure="lg">A token-driven neo-brutalist Angular UI library...</p>
```

### Leading

```html
<p nbText size="md" measure="sm" leading="none">...</p>
<p nbText size="md" measure="sm" leading="tight">...</p>
<p nbText size="md" measure="sm" leading="normal">...</p>
<p nbText size="md" measure="sm" leading="relaxed">...</p>
```

### Underline

```html
<span nbText size="3xl" weight="extrabold" underline="bar"> Build Loud FM </span>

<span nbText size="2xl" weight="extrabold" underline="wave"> Stay Sharp </span>

<!-- Recolor with a token -->
<span nbText size="2xl" weight="extrabold" underline="bar" style="--nb-underline-color: var(--nb-mint)"> Mint Accent </span>
```

### Composition

```html
<div nbStack gap="lg">
  <div nbStack gap="xs">
    <span nbText size="xs" weight="bold" transform="uppercase" tracking="wider" tone="muted"> Featured deal </span>
    <h2 nbDisplay>Build loud.</h2>
  </div>

  <p nbText size="lg" tone="muted" measure="md" leading="relaxed">A token-driven neo-brutalist Angular UI library for expressive product interfaces.</p>

  <div class="flex flex-wrap gap-2">
    <span nbChip tone="mint">
      <span nbText size="sm" weight="black" transform="uppercase" tracking="wide"> Flight included </span>
    </span>
    <span nbChip tone="lavender">
      <span nbText size="sm" weight="black" transform="uppercase" tracking="wide"> Hotel </span>
    </span>
  </div>

  <div nbCallout tone="yellow" size="lg" layout="between" shadow="hard">
    <div nbStack gap="none">
      <span nbText size="xs" weight="bold" transform="uppercase" tracking="wider" tone="muted"> From </span>
      <span nbText size="xl" weight="black">$799</span>
    </div>
    <span nbText size="sm" weight="medium">per person</span>
  </div>
</div>
```
