# Separator

A directive on `<hr>` for visual section dividers. Supports horizontal and vertical orientations with solid, dashed, and thick variants — a structural staple in every brutalist card layout.

## Import

```typescript
import { NbSeparator } from '@ng-brutalism/ui';
```

## API Reference

| Attribute     | Type                             | Default        | Description                                |
| ------------- | -------------------------------- | -------------- | ------------------------------------------ |
| `orientation` | `'horizontal' \| 'vertical'`     | `'horizontal'` | Direction of the divider line.             |
| `variant`     | `'solid' \| 'dashed' \| 'thick'` | `'solid'`      | Line style. `thick` renders a 4 px border. |

## Usage Examples

### Default

```html
<p class="font-bold">Section A</p>
<hr nbSeparator />
<p class="font-bold">Section B</p>
```

### Variants

```html
<hr nbSeparator />
<hr nbSeparator variant="dashed" />
<hr nbSeparator variant="thick" />
```

### Vertical Orientation

```html
<div class="flex h-16 items-center gap-4">
  <span>Angular</span>
  <hr nbSeparator orientation="vertical" />
  <span>Brutalism</span>
  <hr nbSeparator orientation="vertical" variant="dashed" />
  <span>v0.2</span>
</div>
```

### Custom Color

```html
<hr nbSeparator style="--nb-separator-color: #ff90e8" />
<hr nbSeparator variant="thick" style="--nb-separator-color: #8ae9ff" />
<hr nbSeparator variant="dashed" style="--nb-separator-color: #c8a2ff" />
```
