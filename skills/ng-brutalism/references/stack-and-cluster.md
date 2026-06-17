# Stack & Cluster

`nbStack` is the default primitive for vertical rhythm. `nbCluster` is the default primitive for inline groups that may wrap. Use them everywhere instead of manually wiring up flex utilities.

## Import
```typescript
import { NbStack, NbCluster } from '@ng-brutalism/ui';
```

## API Reference
### nbStack
| Attribute | Type | Default | Description |
|---|---|---|---|
| `gap` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | - | Vertical spacing |
| `align` | `'stretch' \| 'start' \| 'center' \| 'end'` | - | Cross-axis alignment |
| `justify` | `'start' \| 'center' \| 'end' \| 'between'` | - | Main-axis alignment |
| `separator` | `'none' \| 'solid' \| 'dashed' \| 'thick'` | `'none'` | Divider between children |

### nbCluster
| Attribute | Type | Default | Description |
|---|---|---|---|
| `gap` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | - | Horizontal spacing |
| `align` | `'start' \| 'center' \| 'end' \| 'baseline' \| 'stretch'` | - | Cross-axis alignment |
| `justify` | `'start' \| 'center' \| 'end' \| 'between'` | - | Main-axis alignment |
| `wrap` | `'wrap' \| 'nowrap'` | `'wrap'` | Wrapping behavior |

## Usage Examples

### Stack — vertical card content
```html
<div nbStack gap="md">
  <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-underline-width: 80%">Open role</h2>
  <span nbChip tone="mint">Hiring now</span>
  <p nbText>Compose content vertically with predictable spacing.</p>
  <button nbButton tone="yellow" size="lg">Apply now</button>
</div>
```

### Cluster — chip group
```html
<div nbCluster gap="xs">
  <span nbChip tone="yellow">Angular</span>
  <span nbChip tone="mint">Signals</span>
  <span nbChip tone="pink">Zoneless</span>
  <span nbChip tone="lavender">TypeScript</span>
</div>
```

### Combined inside a Surface
```html
<article nbSurface tone="cream" padding="lg" radius="xl" shadow="hard" border="strong">
  <div nbStack gap="lg">
    <div nbStack gap="xs">
      <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-underline-width: 45%">Senior Angular Engineer</h2>
      <p nbText tone="muted">Build loud UI primitives.</p>
    </div>

    <div nbCluster gap="xs">
      <span nbChip tone="yellow">Remote</span>
      <span nbChip tone="mint">Full-time</span>
      <span nbChip tone="pink">Urgent</span>
    </div>

    <div nbCluster gap="sm">
      <button nbButton tone="black">Apply</button>
      <button nbButton tone="white">Save</button>
    </div>
  </div>
</article>
```
