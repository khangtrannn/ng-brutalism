# Input Group

Combines inputs or textareas with bordered prefix and suffix addons, creating one continuous brutalist control.

## Import
```typescript
import { NbInput, NbInputGroup, NbInputPrefix, NbInputSuffix } from '@ng-brutalism/ui';
```

## API Reference
| Selector | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `nb-input-group` | — | — | — | Container for input group elements. |
| `[nbInputPrefix]` | `align` | `'center' \| 'stretch'` | `'center'` | Align configuration for prefix addon. |
| `[nbInputSuffix]` | `align` | `'center' \| 'stretch'` | `'center'` | Align configuration for suffix addon. |

## Usage Examples

### Default
```html
<nb-input-group class="max-w-80">
  <span nbInputPrefix>@</span>
  <input nbInput placeholder="username" />
</nb-input-group>
```

### Prefix and Suffix
```html
<nb-input-group class="max-w-96">
  <span nbInputPrefix>$</span>
  <input nbInput type="number" placeholder="Amount" />
  <span nbInputSuffix>USD</span>
</nb-input-group>
```

### With Label
```html
<div class="grid w-full max-w-96 gap-2">
  <label nbLabel for="profile-url">Profile URL</label>
  <nb-input-group>
    <span nbInputPrefix class="text-[0.8rem]">https</span>
    <input nbInput id="profile-url" placeholder="example.com" />
  </nb-input-group>
</div>
```

### Textarea
```html
<nb-input-group class="max-w-96">
  <span nbInputPrefix align="stretch">TXT</span>
  <textarea nbTextarea placeholder="Write a note..." rows="4"></textarea>
</nb-input-group>
```

### Disabled
```html
<nb-input-group class="max-w-80">
  <span nbInputPrefix>@</span>
  <input nbInput placeholder="username" disabled />
</nb-input-group>
```
