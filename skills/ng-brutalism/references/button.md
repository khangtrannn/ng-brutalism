# Button

The neo-brutalist Angular Button component. Displays a button or link that looks like a button, with hard borders, shared tone and shadow tokens, keyboard focus states, and native disabled behavior.

## Import
```typescript
import {
  NbButton,
  NbButtonTrailingIcon,
  NbIcon,
} from '@ng-brutalism/ui';
```

## API Reference

### Button (`nbButton`)
| Attribute | Type | Default | Description |
|---|---|---|---|
| `tone` | `NbToneToken` | `'primary'` | Visual tone of the button. |
| `shadow` | `'none' \| 'sm' \| 'default' \| 'hard' \| 'heavy'` | `'default'` | Shadow thickness/style. |
| `press` | `'push' \| 'reverse' \| 'none'` | `'push'` | Visual animation effect when the button is pressed. |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size variant of the button. |
| `border` | `'none' \| 'thin' \| 'default' \| 'strong' \| 'thick'` | `'default'` | Border thickness variant. |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Border radius variant. |
| `fullWidth` | `boolean` | `false` | Whether the button should take up the full width of its container. |

### Trailing Icon (`nbButtonTrailingIcon`)
| Attribute | Type | Default | Description |
|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg'` | `undefined` | Size of the trailing icon wrapper. |
| `shape` | `'none' \| 'square' \| 'circle'` | `undefined` | Shape of the trailing icon background/container. |
| `tone` | `'default' \| 'inverse' \| 'current'` | `undefined` | Color tone of the trailing icon wrapper. |
| `push` | `'none' \| 'end'` | `'none'` | Alignment of the trailing icon (e.g. pushed to the end). |
| `icon` | `string` | `undefined` | Direct icon source or identifier. |

## Usage Examples

### Default
```html
<button nbButton>
  Button
</button>
```

### Tones
```html
<div class="flex flex-wrap items-center justify-center gap-3">
  <button nbButton>Default</button>
  <button nbButton tone="background">Background</button>
  <button nbButton tone="primary">Primary</button>
  <button nbButton tone="secondary">Secondary</button>
  <button nbButton tone="accent">Accent</button>
  <button nbButton tone="danger">Danger</button>
  <button nbButton tone="success">Success</button>
  <button nbButton tone="warning">Warning</button>
</div>
```

### Sizes
```html
<div class="flex flex-wrap items-center justify-center gap-3">
  <button nbButton size="sm">Small</button>
  <button nbButton size="md">Medium</button>
  <button nbButton size="lg">Large</button>
  <button nbButton size="xl">Extra Large</button>
</div>
```

### CTA
```html
<button nbButton tone="lavender" size="xl" radius="md">
  <span nbText size="xl" weight="black" transform="uppercase" tracking="wide">
    Apply Now
  </span>
  <span nbButtonTrailingIcon shape="circle" tone="inverse" size="md">
    <span nbIcon src="/icons/arrow-right.svg" size="sm" decorative></span>
  </span>
</button>
```

### Trailing Icon
```html
<button nbButton tone="secondary">
  Keep Together
  <span nbButtonTrailingIcon>
    <span nbIcon src="/icons/arrow-right.svg" size="sm" decorative></span>
  </span>
</button>

<button nbButton tone="primary" [fullWidth]="true">
  Push To End
  <span nbButtonTrailingIcon push="end" shape="square" size="md">
    <span nbIcon src="/icons/arrow-right.svg" size="sm" decorative></span>
  </span>
</button>
```

### Full Width
```html
<div class="w-full max-w-md">
  <button nbButton [fullWidth]="true">
    Full width button
  </button>
</div>
```

### Disabled
```html
<div class="flex flex-wrap items-center justify-center gap-4">
  <button nbButton disabled>Disabled button</button>
  <a nbButton href="#" aria-disabled="true">Disabled link style</a>
</div>
```

### Anchor Usage
```html
<div class="flex flex-wrap items-center justify-center gap-4">
  <a nbButton href="https://angular.dev" target="_blank" rel="noreferrer">
    Angular Docs
  </a>

  <a
    nbButton
    href="https://github.com/khangtrannn/ng-brutalism"
    target="_blank"
    rel="noreferrer"
  >
    GitHub Repo
  </a>
</div>
```
