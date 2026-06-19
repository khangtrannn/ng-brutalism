# Section

Use `nbSection` for the internal regions of a card — headers, body blocks, and footers. It replaces ad-hoc `border-t-2 px-6 py-6` wrappers with a small declarative primitive for padding, border side, and inline layout.

## Import

```typescript
import { NbSection } from '@ng-brutalism/ui';
```

## API Reference

| Attribute      | Type                                                                               | Default     | Description                                                                                                      |
| -------------- | ---------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------- |
| `padding`      | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                   | `'md'`      | Inner padding for the section.                                                                                   |
| `divider`      | `'none' \| 'top' \| 'right' \| 'bottom' \| 'left' \| 'block' \| 'inline' \| 'all'` | `'none'`    | Which side(s) render a divider line. Uses `--nb-border` and `--nb-border-width`.                                 |
| `dividerStyle` | `'solid' \| 'dashed' \| 'dotted'`                                                  | `'solid'`   | Stroke style applied to the active border side(s).                                                               |
| `layout`       | `'default' \| 'center' \| 'between'`                                               | `'default'` | `default` keeps block flow, `center` and `between` switch to flex with the matching justify.                     |
| `align`        | `'stretch' \| 'start' \| 'center' \| 'end'`                                        | `'stretch'` | Cross-axis alignment; only applies when `layout` is `center` or `between`.                                       |
| `flush`        | `boolean`                                                                          | `false`     | Pulls the section out to its parent's edges via negative inline margins. Escape hatch for advanced card layouts. |

## Usage Examples

### Default

```html
<div nbSurface tone="cream" shadow="hard" radius="lg" clip>
  <div nbSection divider="bottom" padding="lg" layout="between" align="center">
    <h2 nbDisplay>Alpha Launch</h2>
    <span nbChip tone="mint">Active</span>
  </div>

  <div nbSection padding="lg">
    <p>Section owns the inner regions of a card.</p>
  </div>

  <div nbSection divider="top" padding="lg" layout="between" align="center">
    <span>12 collaborators</span>
    <button nbButton>Open project</button>
  </div>
</div>
```

### Paddings

```html
<div nbSection padding="none">...</div>
<div nbSection padding="xs">...</div>
<div nbSection padding="sm">...</div>
<div nbSection padding="md">...</div>
<div nbSection padding="lg">...</div>
<div nbSection padding="xl">...</div>
```

### Dividers

```html
<div nbSection divider="top">...</div>
<div nbSection divider="right">...</div>
<div nbSection divider="bottom">...</div>
<div nbSection divider="left">...</div>
<div nbSection divider="block">...</div>
<div nbSection divider="inline">...</div>
<div nbSection divider="all">...</div>
```

### Divider Styles

```html
<div nbSection divider="all" dividerStyle="solid">...</div>
<div nbSection divider="all" dividerStyle="dashed">...</div>
<div nbSection divider="all" dividerStyle="dotted">...</div>
```

### Layouts

```html
<div nbSection layout="default">...</div>
<div nbSection layout="center" align="center">...</div>
<div nbSection layout="between" align="center">...</div>
```

### Composition

```html
<div nbSurface tone="white" shadow="hard" radius="lg" clip>
  <div nbSection padding="lg" divider="bottom" layout="between" align="center">
    <h2 nbDisplay>Design Sprint</h2>
    <span nbChip tone="lavender">Annual</span>
  </div>

  <div nbSection padding="lg">
    <p>Three weeks of guided sessions and a final brutalist showcase.</p>
  </div>

  <div nbSection divider="top" padding="lg" layout="between" align="center">
    <div nbCallout tone="yellow" shadow="hard">$799</div>
    <button nbButton>Enroll</button>
  </div>
</div>
```
