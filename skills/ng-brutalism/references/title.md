# Title

The neo-brutalist Angular Title component. Adds a brutalist wave underline to headings without changing the heading level or document structure.

## Import
```typescript
import { NbTitle } from '@ng-brutalism/ui';
```

## API Reference
| Attribute | Type | Default | Description |
|---|---|---|---|
| `[nbTitle]` | `Directive` | - | Applies `data-nb-title` and draws a configurable wave underline with a CSS pseudo element. |

## Usage Examples

### Default
```html
<h2 nbTitle class="font-mono text-4xl font-black leading-tight uppercase">
  Brutal section title
</h2>
```

### Custom Wave
```html
<h3
  nbTitle
  class="font-mono text-3xl font-black leading-tight"
  style="--nb-title-wave-color: #ff5d8f; --nb-title-wave-width: 12rem; --nb-title-wave-height: 0.75rem;"
>
  Sharp editorial heading
</h3>
```

### Mixed Content
```html
<div class="max-w-xl border-2 border-(--nb-border) bg-nb-surface p-6 shadow-[5px_5px_0_0_var(--nb-shadow)]">
  <p class="mb-3 inline-block border-2 border-(--nb-border) bg-nb-secondary px-3 py-1 font-mono text-xs font-black uppercase">
    Release notes
  </p>
  <h2 nbTitle class="font-mono text-4xl font-black leading-tight">
    Fast primitives, loud defaults
  </h2>
  <p class="mt-5 font-medium">
    Use it with your own typography classes, then tune the underline with CSS variables when a title needs more attitude.
  </p>
</div>
```
