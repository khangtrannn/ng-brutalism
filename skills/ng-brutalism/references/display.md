# Display

A directive for mega-sized display text. Apply it to **any element** — a heading, a `span`, a stat — to get ultra-bold, tight-leading display typography. It's purely presentational, so keep your semantics correct and let the directive handle the look.

## Import
```typescript
import { NbDisplay } from '@ng-brutalism/ui';
```

## API Reference
| Attribute | Type | Default | Description |
|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Controls font size via `--nb-display-size`. |
| `underline` | `'none' \| 'bar' \| 'wave'` | `'none'` | Draws a built-in accent underline beneath the text. Style it with the `--nb-underline-*` tokens. |

## Usage Examples

### Default
```html
<h2 nbDisplay class="uppercase">SENIOR ANGULAR ENGINEER</h2>
```

### Sizes
```html
<h2 nbDisplay size="sm" class="uppercase">PRO PLAN</h2>
<h2 nbDisplay size="md" class="uppercase">INDIE CUP</h2>
<h2 nbDisplay size="lg" class="uppercase">NORA CHEN</h2>
<h2 nbDisplay size="xl" class="uppercase">GO</h2>
```

### Custom Size
```html
<h2 nbDisplay class="uppercase" style="--nb-display-size: 2.25rem">
  $29/mo
</h2>
```

### Any Element
```html
<span nbDisplay size="lg">$2.4M</span>
<span nbDisplay size="lg" class="uppercase">24/7</span>
```

### Underline
```html
<h2 nbDisplay size="lg" underline="bar" class="uppercase">SHIP IT</h2>
<h2 nbDisplay size="lg" underline="wave" class="uppercase">STAY SHARP</h2>

<!-- Recolor / resize with tokens -->
<h2
  nbDisplay
  size="lg"
  underline="bar"
  class="uppercase"
  style="--nb-underline-color: var(--nb-mint); --nb-underline-width: 100%"
>
  FULL WIDTH
</h2>
```
