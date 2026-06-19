# Split

Use `nbSplit` for two-column main-and-aside compositions. It replaces custom grid column strings with ratio, gap, padding, alignment, and responsive collapse inputs.

## Import

```typescript
import { NbSplit } from '@ng-brutalism/ui';
```

## API Reference

| Attribute   | Type                                                                      | Default     | Description                                                        |
| ----------- | ------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------ |
| `ratio`     | `'1:1' \| '2:1' \| '3:1' \| '1:2' \| '1:3' \| 'fill:auto' \| 'auto:fill'` | `'1:1'`     | Column relationship between main and aside content.                |
| `gap`       | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`                 | `'lg'`      | Spacing between the two split regions.                             |
| `padding`   | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                  | `'none'`    | Inner padding for the split container.                             |
| `collapse`  | `'none' \| 'sm' \| 'md' \| 'lg'`                                          | `'md'`      | Breakpoint where the layout switches from stacked to two columns.  |
| `align`     | `'start' \| 'center' \| 'end' \| 'stretch'`                               | `'stretch'` | Cross-axis alignment for the two regions.                          |
| `separator` | `'none' \| 'solid' \| 'dashed' \| 'thick'`                                | `'none'`    | Inline separator between the two regions. Use with a non-zero gap. |

## Usage Examples

### Default

```html
<div nbSplit ratio="2:1" gap="xl" padding="lg">
  <div nbStack gap="md">
    <h2 nbDisplay>Tokyo City Escape</h2>
    <p>Main content</p>
  </div>

  <div nbStack gap="md" align="start">
    <span>$799</span>
    <button nbButton>Book Trip</button>
  </div>
</div>
```

### Ratios

```html
<div nbSplit ratio="1:1">...</div>
<div nbSplit ratio="2:1">...</div>
<div nbSplit ratio="3:1">...</div>
<div nbSplit ratio="1:2">...</div>
<div nbSplit ratio="1:3">...</div>
<!-- first column fills, second hugs its content -->
<div nbSplit ratio="fill:auto">...</div>
<!-- first column hugs its content, second fills -->
<div nbSplit ratio="auto:fill">...</div>
```

### Spacing

```html
<div nbSplit gap="xl" padding="lg">
  <div>Main</div>
  <div>Aside</div>
</div>
```

### Collapse

```html
<div nbSplit collapse="none">...</div>
<div nbSplit collapse="sm">...</div>
<div nbSplit collapse="md">...</div>
<div nbSplit collapse="lg">...</div>
```

### Alignment

```html
<div nbSplit align="start">...</div>
<div nbSplit align="center">...</div>
<div nbSplit align="end">...</div>
<div nbSplit align="stretch">...</div>
```

### Separators

```html
<div nbSplit ratio="2:1" gap="lg" separator="solid">
  <div>Main</div>
  <div>Aside</div>
</div>

<div nbSplit ratio="2:1" gap="lg" separator="dashed">
  <div>Main</div>
  <div>Aside</div>
</div>

<div nbSplit ratio="2:1" gap="lg" separator="thick">
  <div>Main</div>
  <div>Aside</div>
</div>
```

### Composition

```html
<div nbSplit ratio="2:1" gap="xl" padding="lg" collapse="md">
  <div nbStack gap="lg">
    <!-- Main content -->
  </div>

  <div nbStack gap="md" align="start">
    <!-- Aside content -->
  </div>
</div>
```
