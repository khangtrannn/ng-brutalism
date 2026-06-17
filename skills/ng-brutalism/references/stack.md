# Stack

Use `nbStack` whenever children should flow vertically with consistent spacing. It turns raw `flex flex-col gap-*` layout boilerplate into a small declarative primitive for vertical rhythm.

## Import
```typescript
import { NbStack } from '@ng-brutalism/ui';
```

## API Reference
| Attribute | Type | Default | Description |
|---|---|---|---|
| `gap` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Vertical spacing between stack children. |
| `align` | `'stretch' \| 'start' \| 'center' \| 'end'` | `'stretch'` | Cross-axis alignment for the stack children. |
| `justify` | `'start' \| 'center' \| 'end' \| 'between'` | `'start'` | Main-axis distribution when the stack has extra height. |
| `separator` | `'none' \| 'solid' \| 'dashed' \| 'thick'` | `'none'` | Optional border between adjacent children. |

## Usage Examples

### Default
```html
<div nbStack gap="lg">
  <h2 nbDisplay>Build loud.</h2>

  <p>
    Stack gives you brutalist vertical rhythm without repeating flex and gap
    classes everywhere.
  </p>

  <button nbButton>Stay sharp</button>
</div>
```

### Gaps
```html
<div nbStack gap="none">...</div>
<div nbStack gap="xs">...</div>
<div nbStack gap="sm">...</div>
<div nbStack gap="md">...</div>
<div nbStack gap="lg">...</div>
<div nbStack gap="xl">...</div>
<div nbStack gap="2xl">...</div>
```

### Alignment
```html
<div nbStack gap="sm" align="stretch">...</div>
<div nbStack gap="sm" align="start">...</div>
<div nbStack gap="sm" align="center">...</div>
<div nbStack gap="sm" align="end">...</div>
```

### Justification
```html
<div nbStack justify="start" class="h-56">...</div>
<div nbStack justify="center" class="h-56">...</div>
<div nbStack justify="end" class="h-56">...</div>
<div nbStack justify="between" class="h-56">...</div>
```

### Separators
```html
<div nbStack gap="md" separator="dashed">
  <nb-media-item icon="/icons/location.svg" title="Central Locations" />
  <nb-media-item icon="/icons/camera.svg" title="Guided Experiences" />
  <nb-media-item icon="/icons/support.svg" title="24/7 Support" />
</div>
```

### Responsive Gap
```html
<div
  nbStack
  gap="md"
  class="md:[--nb-stack-gap:1.5rem]"
>
  ...
</div>
```
