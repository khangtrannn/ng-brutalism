# Cluster

Use `nbCluster` whenever children should flow horizontally, align together, and wrap cleanly on smaller screens. It is the inline composition pair to `nbStack`.

## Import
```typescript
import { NbCluster } from '@ng-brutalism/ui';
```

## API Reference
| Attribute | Type | Default | Description |
|---|---|---|---|
| `gap` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Horizontal and wrapped-row spacing between cluster children. |
| `padding` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'none'` | Uniform inner padding around the cluster's children. |
| `align` | `'start' \| 'center' \| 'end' \| 'baseline' \| 'stretch'` | `'center'` | Cross-axis alignment for the inline group. |
| `justify` | `'start' \| 'center' \| 'end' \| 'between'` | `'start'` | Main-axis distribution when the cluster has extra width. |
| `wrap` | `'wrap' \| 'nowrap'` | `'wrap'` | Controls whether children can wrap onto additional rows. |
| `separator` | `'none' \| 'solid' \| 'dashed' \| 'thick'` | `'none'` | Inline-start border between each child. When active, `gap-x` is collapsed and spacing is split across separator margin and padding. |

## Usage Examples

### Default
```html
<div nbCluster gap="2xl" align="center" justify="center">
  <div>
    <div>NB</div>
    <button nbButton size="lg">Ship it</button>
  </div>

  <div>
    <div nbCluster gap="sm" justify="center">
      <span>Logo</span>
      <span>Actions</span>
      <span>Badges</span>
    </div>

    <h2 nbDisplay>Cluster loud.</h2>
    <p>Inline rhythm for logos, actions, badges, and feature rows.</p>
  </div>
</div>
```

### Gaps
```html
<div nbCluster gap="none">...</div>
<div nbCluster gap="xs">...</div>
<div nbCluster gap="sm">...</div>
<div nbCluster gap="md">...</div>
<div nbCluster gap="lg">...</div>
<div nbCluster gap="xl">...</div>
<div nbCluster gap="2xl">...</div>
```

### Alignment
```html
<div nbCluster align="start">...</div>
<div nbCluster align="center">...</div>
<div nbCluster align="end">...</div>
<div nbCluster align="baseline">...</div>
<div nbCluster align="stretch">...</div>
```

### Justification
```html
<div nbCluster justify="start">...</div>
<div nbCluster justify="center">...</div>
<div nbCluster justify="end">...</div>
<div nbCluster justify="between">...</div>
```

### Wrapping
```html
<div nbCluster gap="md">
  ...
</div>

<div nbCluster gap="md" wrap="nowrap">
  ...
</div>
```

### Separators
```html
<div nbCluster gap="lg" align="center" separator="dashed">
  <nb-media-item icon="/icons/location.png">
    <span nbMediaItemTitle>Central<br />Locations</span>
  </nb-media-item>
  <nb-media-item icon="/icons/guide.png">
    <span nbMediaItemTitle>Guided<br />Experiences</span>
  </nb-media-item>
  <nb-media-item icon="/icons/support.png">
    <span nbMediaItemTitle>24/7<br />Support</span>
  </nb-media-item>
</div>
```

### Responsive Gap
```html
<div
  nbCluster
  gap="md"
  class="md:[--nb-cluster-gap:1.5rem]"
>
  ...
</div>
```
