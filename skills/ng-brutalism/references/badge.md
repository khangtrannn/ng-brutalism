# Badge

The neo-brutalist Angular Badge component. A small status indicator with shared tone, radius, shadow, and border styling.

## Import

```typescript
import { NbBadge } from '@ng-brutalism/ui';
```

## API Reference

| Attribute | Type          | Default   | Description                          |
| --------- | ------------- | --------- | ------------------------------------ |
| `tone`    | `NbToneToken` | `'white'` | Visual tone variation for the badge. |

## Usage Examples

### Default

```html
<span nbBadge>Default</span>
```

### Tones

```html
<div class="flex flex-wrap items-center gap-3">
  <span nbBadge>Default</span>
  <span nbBadge tone="accent">Accent</span>
  <span nbBadge tone="success">Success</span>
  <span nbBadge tone="warning">Warning</span>
  <span nbBadge tone="danger">Danger</span>
</div>
```
