# Chip

A directive on `<span>` for compact labels, tags, and categories. Pairs with `nbChipGroup` for horizontal chip rows. Supports 10 tones and an optional leading icon via `ng-content`.

## Import

```typescript
import { NbChip, NbChipGroup } from '@ng-brutalism/ui';
```

## API Reference

### Chip (`nbChip`)

| Attribute  | Type                                                                                                                 | Default     | Description                                                                        |
| ---------- | -------------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------- |
| `tone`     | `'default' \| 'ink' \| 'yellow' \| 'pink' \| 'mint' \| 'lavender' \| 'accent' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Background color tone.                                                             |
| `padding`  | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                                             | `'md'`      | Inner padding scale.                                                               |
| `radius`   | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'`                                                                           | `'none'`    | Corner radius scale.                                                               |
| `shadow`   | `'none' \| 'sm' \| 'default' \| 'hard'`                                                                              | `'sm'`      | Drop shadow scale.                                                                 |
| `icon`     | `string`                                                                                                             | —           | URL of a leading SVG icon, tinted to the chip's foreground via `nbIcon` mask mode. |
| `iconSize` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                                               | `'sm'`      | Size of the `icon` input's icon.                                                   |

### Chip Group (`nbChipGroup`)

Wrapper directive with `flex flex-wrap gap-2`. No inputs — use Tailwind or inline styles to override spacing.

### CSS Custom Properties (Variables)

| Custom Property       | Default                        | Description          |
| --------------------- | ------------------------------ | -------------------- |
| `--nb-chip-bg`        | `var(--nb-surface)`            | Background color.    |
| `--nb-chip-fg`        | `var(--nb-foreground)`         | Text and icon color. |
| `--nb-chip-radius`    | `0px`                          | Corner radius.       |
| `--nb-chip-shadow`    | `2px 2px 0 0 var(--nb-shadow)` | Box shadow.          |
| `--nb-chip-icon-size` | `0.75rem`                      | Projected SVG size.  |

## Usage Examples

### Default

```html
<div nbChipGroup>
  <span nbChip>Angular</span>
  <span nbChip tone="mint">TypeScript</span>
  <span nbChip tone="pink">RxJS</span>
  <span nbChip tone="lavender">Signals</span>
</div>
```

### Tones

```html
<div nbChipGroup>
  <span nbChip>default</span>
  <span nbChip tone="ink">ink</span>
  <span nbChip tone="yellow">yellow</span>
  <span nbChip tone="pink">pink</span>
  <span nbChip tone="mint">mint</span>
  <span nbChip tone="lavender">lavender</span>
  <span nbChip tone="accent">accent</span>
  <span nbChip tone="success">success</span>
  <span nbChip tone="warning">warning</span>
  <span nbChip tone="danger">danger</span>
</div>
```

### Tokens (Custom Styling)

```html
<span nbChip tone="yellow" class="gap-[14px] px-[18px] py-[10px] text-[22px] leading-none font-black" style="--nb-chip-radius:8px; --nb-chip-shadow:6px 6px 0 0 var(--nb-shadow); --nb-chip-icon-size:36px">
  <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <circle cx="20" cy="20" r="18" fill="currentColor" />
    <text x="20" y="27" text-anchor="middle" font-size="24" font-weight="1000" fill="#fff" font-family="Arial Black, Arial, sans-serif">$</text>
  </svg>
  $95K - $130K
</span>
```

### With Icon

```html
<div nbChipGroup>
  <span nbChip tone="mint" icon="/podcast-card/clock.svg">45 MIN</span>
  <span nbChip tone="lavender" icon="/podcast-card/sparkle.svg">NEW</span>
</div>
```
