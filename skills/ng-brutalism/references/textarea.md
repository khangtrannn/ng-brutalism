# Textarea

The neo-brutalist Angular Textarea component. A multi-line text input with hard borders, offset shadow, and strong focus states matching the brutalist style.

## Import
```typescript
import { NbTextarea } from '@ng-brutalism/ui';
```

## API Reference
| Attribute | Type | Default | Description |
|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | The size of the textarea input. |

## Usage Examples

### Default
```html
<textarea nbTextarea placeholder="Write something..." class="w-75"></textarea>
```

### Sizes
```html
<div class="flex flex-col items-center gap-4">
  <textarea nbTextarea size="sm" placeholder="Small" class="w-75"></textarea>
  <textarea nbTextarea placeholder="Default" class="w-75"></textarea>
  <textarea nbTextarea size="lg" placeholder="Large" class="w-75"></textarea>
</div>
```

### Disabled
```html
<textarea nbTextarea placeholder="Disabled" class="w-75" disabled></textarea>
```

### With Label
```html
<div class="flex flex-col gap-2">
  <label nbLabel for="message">Message</label>
  <textarea nbTextarea id="message" placeholder="Enter your message..." class="w-75"></textarea>
</div>
```
