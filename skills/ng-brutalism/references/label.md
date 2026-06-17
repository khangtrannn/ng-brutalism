# Label

Renders an accessible form label with bold typography and brutalist styling, associated with form controls.

## Import
```typescript
import { NbLabel } from '@ng-brutalism/ui';
```

## API Reference
| Selector | Description |
|---|---|
| `label[nbLabel]` | Applies label typography and disabled peer styling to a native label element. |

## Usage Examples

### Default
```html
<div class="flex items-center gap-2">
  <input type="checkbox" nbCheckbox id="accept-terms" />
  <label nbLabel for="accept-terms">Accept terms and conditions</label>
</div>
```

### With Input
```html
<div class="flex flex-col gap-2">
  <label nbLabel for="email">Email</label>
  <input nbInput id="email" type="email" placeholder="m@example.com" class="w-75" />
</div>
```

### Disabled Control
```html
<div class="flex items-center gap-2">
  <input
    type="checkbox"
    nbCheckbox
    id="disabled-terms"
    class="peer"
    disabled
  />
  <label nbLabel for="disabled-terms">Accept terms and conditions</label>
</div>
```
