# Halftone

A decorative dot-grid component that anchors to card corners via absolute positioning or renders as a clean rectangular strip. The classic halftone pattern borrowed from print design adds depth and texture to brutalist cards without cluttering the layout.

## Import
```typescript
import { NbHalftone } from '@ng-brutalism/ui';
```

## API Reference
| Attribute | Type | Default | Description |
|---|---|---|---|
| `shape` | `'square' \| 'circle' \| 'rectangle'` | `'square'` | Visual shape. Rectangle renders a CSS background strip. |
| `color` | `string` | `var(--nb-border)` | Dot fill color (any CSS color value). |
| `rows` | `number` | `7 / 3 rectangle` | Number of dot rows. |
| `columns` | `number` | `7 / 13 rectangle` | Number of dot columns. |
| `size` | `number` | `6 / 8 rectangle` | Dot diameter in px. |
| `gap` | `number` | `5 / rectangle rhythm` | Gap between dots in px. Rectangle strips use this as both axes unless gapX or gapY is set. |
| `gapX` | `number` | `28 rectangle` | Horizontal rectangle dot rhythm in px. |
| `gapY` | `number` | `27 rectangle` | Vertical rectangle dot rhythm in px. |

## Usage Examples

### Default
```html
<div
  class="relative overflow-hidden border-2 border-(--nb-border) bg-nb-paper p-8 shadow-[5px_5px_0_0_var(--nb-shadow)]"
  style="min-height: 140px;"
>
  <div nbHalftone class="absolute bottom-0 right-0"></div>
  <p class="font-bold text-lg">Card with halftone</p>
  <p class="font-medium text-sm mt-1">Dot grid anchors to the bottom-right corner.</p>
</div>
```

### Custom Color & Positioning
```html
<div
  class="relative overflow-hidden border-2 border-(--nb-border) bg-nb-paper p-8 shadow-[5px_5px_0_0_var(--nb-shadow)]"
  style="min-height: 140px;"
>
  <div nbHalftone color="#ff90e8" class="absolute top-0 right-0"></div>
  <div nbHalftone color="#8ae9ff" class="absolute bottom-0 left-0"></div>
  <p class="font-bold">Custom dot colors</p>
</div>
```

### Rectangle
```html
<div class="relative overflow-hidden border-2 border-(--nb-border) bg-nb-paper p-8 shadow-[5px_5px_0_0_var(--nb-shadow)]">
  <div
    nbHalftone
    shape="rectangle"
    [rows]="3"
    [columns]="13"
    class="mb-5"
  ></div>
  <p class="font-bold text-lg">Graphic strip accent</p>
  <p class="font-medium text-sm mt-1">
    A rectangular dot matrix with a predictable 3 by 13 count.
  </p>
</div>
```

### Custom Rectangle
```html
<div class="relative overflow-hidden border-2 border-(--nb-border) bg-nb-paper p-8 shadow-[5px_5px_0_0_var(--nb-shadow)]">
  <div
    nbHalftone
    shape="rectangle"
    [rows]="3"
    [columns]="13"
    [size]="8"
    [gapX]="28"
    [gapY]="27"
  ></div>
</div>
```
