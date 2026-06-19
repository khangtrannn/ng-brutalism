# Stat

A compact value + label display for surfacing metrics, prices, counts, and scores. Used throughout brutalist card designs to anchor key numbers with maximum visual weight.

## Import

```typescript
import { NbStat } from '@ng-brutalism/ui';
```

## API Reference

| Attribute   | Type                | Default    | Description                                             |
| ----------- | ------------------- | ---------- | ------------------------------------------------------- |
| `value`     | `string`            | _required_ | The primary metric value displayed prominently.         |
| `label`     | `string`            | _required_ | Descriptive label rendered below (or beside) the value. |
| `direction` | `'column' \| 'row'` | `'column'` | Stacks value + label vertically or horizontally.        |

## Usage Examples

### Default

```html
<nb-stat value="$29" label="per month" />
<nb-stat value="4.8★" label="rating" />
<nb-stat value="142" label="backed" />
```

### With icon

```html
<nb-stat value="4.9" label="rating">
  <span slot="icon" aria-hidden="true">★</span>
</nb-stat>
```

### Row direction

```html
<nb-stat value="98%" label="satisfaction" direction="row" /> <nb-stat value="12K" label="downloads" direction="row" />
```
