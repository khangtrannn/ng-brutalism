# Icon

`nbIcon` is an attribute directive that renders any SVG asset as a sized, colored, accessible icon. Mask mode (default) paints monochrome SVGs with the current color. Image mode preserves original colors for illustrated assets. Composable with chips, buttons, and any other primitive.

## Import
```typescript
import { NbIcon } from '@ng-brutalism/ui';
```

## API Reference
| Attribute | Type | Default | Description |
|---|---|---|---|
| `src` | `string` | required | Path to a trusted local SVG or image asset. Do not pass unsanitized user-generated URLs. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Icon size (0.75 rem – 2 rem). |
| `tone` | `'current' \| 'default' \| 'muted' \| 'inverse' \| 'primary' \| 'secondary' \| 'accent' \| 'danger' \| 'success' \| 'warning'` | `'current'` | Color tone. `current` inherits the parent CSS color. Only applies in mask mode. |
| `mode` | `'mask' \| 'image'` | `'mask'` | Rendering mode. `mask` paints the SVG with the tone color. `image` preserves original asset colors. |
| `decorative` | `boolean` | `false` | Marks the icon as purely decorative (`aria-hidden="true"`). Use when the icon adds no information beyond adjacent text. |
| `label` | `string \| null` | `null` | Accessible label for meaningful icons. Sets `role="img"` and `aria-label`. Ignored when `decorative` is true. |

## Usage Examples

### Default
```html
<!-- Decorative icon (no meaning beyond adjacent text) -->
<span nbIcon src="/icons/plane.svg" size="sm" decorative></span>

<!-- Meaningful standalone icon -->
<span nbIcon src="/icons/warning.svg" size="md" tone="danger" label="Warning"></span>
```

### Sizes
```html
<span nbIcon src="/icons/plane.svg" size="xs" decorative></span>
<span nbIcon src="/icons/plane.svg" size="sm" decorative></span>
<span nbIcon src="/icons/plane.svg" size="md" decorative></span>
<span nbIcon src="/icons/plane.svg" size="lg" decorative></span>
<span nbIcon src="/icons/plane.svg" size="xl" decorative></span>
```

### Tones
```html
<span nbIcon src="/icons/star.svg" size="md" tone="current" decorative></span>
<span nbIcon src="/icons/star.svg" size="md" tone="default" decorative></span>
<span nbIcon src="/icons/star.svg" size="md" tone="muted" decorative></span>
<span nbIcon src="/icons/star.svg" size="md" tone="inverse" decorative></span>
<span nbIcon src="/icons/star.svg" size="md" tone="primary" decorative></span>
<span nbIcon src="/icons/star.svg" size="md" tone="secondary" decorative></span>
<span nbIcon src="/icons/star.svg" size="md" tone="accent" decorative></span>
<span nbIcon src="/icons/star.svg" size="md" tone="danger" decorative></span>
<span nbIcon src="/icons/star.svg" size="md" tone="success" decorative></span>
<span nbIcon src="/icons/star.svg" size="md" tone="warning" decorative></span>
```

### Modes
```html
<!-- mask: paints the SVG with the tone color -->
<span nbIcon src="/icons/plane.svg" size="xl" mode="mask" tone="primary" decorative></span>

<!-- image: preserves original asset colors -->
<span nbIcon src="/icons/illustrated-plane.png" size="xl" mode="image" decorative></span>
```

### Accessibility
```html
<!-- Decorative — icon is supplementary to adjacent text -->
<span nbIcon src="/icons/star.svg" size="lg" tone="warning" decorative></span>

<!-- Meaningful — icon stands alone and must be labelled -->
<span nbIcon src="/icons/star.svg" size="lg" tone="warning" label="Top rated"></span>
```

### Composition
```html
<!-- Icons inside chips -->
<div nbChipGroup>
  <span nbChip tone="mint">
    <span nbIcon src="/icons/plane.svg" size="sm" decorative></span>
    Flight included
  </span>
  <span nbChip tone="lavender">
    <span nbIcon src="/icons/hotel.svg" size="sm" decorative></span>
    Hotel
  </span>
  <span nbChip tone="pink">
    <span nbIcon src="/icons/star.svg" size="sm" decorative></span>
    Top pick
  </span>
</div>

<!-- Icon inside button trailing slot -->
<button nbButton>
  Book Trip
  <span nbButtonTrailingIcon class="...">
    <span nbIcon src="/icons/arrow-right.svg" size="sm" tone="current" decorative></span>
  </span>
</button>
```
