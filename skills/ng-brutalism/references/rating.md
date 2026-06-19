# Rating

A read-only star rating display. Accepts a decimal value and rounds to the nearest whole star. Optionally shows a review count. Fully accessible via `role="img"` with an auto-generated `aria-label`.

## Import

```typescript
import { NbRating } from '@ng-brutalism/ui';
```

## API Reference

| Attribute | Type                  | Default     | Description                                           |
| --------- | --------------------- | ----------- | ----------------------------------------------------- |
| `value`   | `number`              | `0`         | Rating value. Decimal — rounds to nearest whole star. |
| `max`     | `number`              | `5`         | Total number of stars to render.                      |
| `count`   | `number \| undefined` | `undefined` | Optional review count shown in parentheses.           |

## Usage Examples

### Default

```html
<nb-rating [value]="4.8" [count]="312" />
```

### Values

```html
<nb-rating [value]="5" />
<nb-rating [value]="4.7" />
<nb-rating [value]="3" />
<nb-rating [value]="1.2" />
<nb-rating [value]="0" />
```

### With Review Count

```html
<nb-rating [value]="4.5" [count]="1204" /> <nb-rating [value]="3.8" [count]="87" />
```

### Custom Max

```html
<nb-rating [value]="7" [max]="10" />
```
