# Checkbox

The neo-brutalist Angular Checkbox component. A control that allows the user to toggle between checked and not checked in the brutalist style with strong focus states.

## Import
```typescript
import { NbCheckbox } from '@ng-brutalism/ui';
```

## API Reference
| Attribute | Type | Default | Description |
|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant of the checkbox. |

## Usage Examples

### Default
```html
<input type="checkbox" nbCheckbox />
```

### Sizes
```html
<div class="flex items-center gap-4">
  <input type="checkbox" nbCheckbox size="sm" />
  <input type="checkbox" nbCheckbox />
  <input type="checkbox" nbCheckbox size="lg" />
</div>
```

### Disabled
```html
<div class="flex items-center gap-4">
  <input type="checkbox" nbCheckbox disabled />
  <input type="checkbox" nbCheckbox disabled checked />
</div>
```

### With Label
```html
<div class="flex items-center gap-2">
  <input type="checkbox" nbCheckbox id="terms" />
  <label nbLabel for="terms">Accept terms and conditions</label>
</div>
```
