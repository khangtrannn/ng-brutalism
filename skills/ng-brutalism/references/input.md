# Input

A form input field with hard borders, offset shadow, and strong focus states in the brutalist style.

## Import

```typescript
import { NbInput } from '@ng-brutalism/ui';
```

## API Reference

| Attribute | Type                   | Default | Description                                 |
| --------- | ---------------------- | ------- | ------------------------------------------- |
| `size`    | `'sm' \| 'md' \| 'lg'` | `'md'`  | Height and padding size of the input field. |

## Usage Examples

### Default

```html
<input nbInput placeholder="Email" class="w-75" />
```

### Sizes

```html
<input nbInput size="sm" placeholder="Small" class="w-75" />
<input nbInput placeholder="Default" class="w-75" />
<input nbInput size="lg" placeholder="Large" class="w-75" />
```

### Disabled

```html
<input nbInput placeholder="Email" class="w-75" disabled />
```

### With Label

```html
<div class="flex flex-col gap-2">
  <label nbLabel for="email">Email</label>
  <input nbInput id="email" type="email" placeholder="m@example.com" class="w-75" />
</div>
```

### With Button

```html
<div class="flex gap-2">
  <input nbInput placeholder="Email" class="w-75" />
  <button nbButton>Subscribe</button>
</div>
```

### File Input

```html
<input nbInput type="file" class="w-[250px]" />
```
