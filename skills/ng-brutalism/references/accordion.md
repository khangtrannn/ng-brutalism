# Accordion

The neo-brutalist Angular Accordion component. A vertically stacked set of interactive headings that reveal related content panels with native button semantics, ARIA state, and brutalist borders.

## Import
```typescript
import {
  NbAccordion,
  NbAccordionContent,
  NbAccordionItem,
  NbAccordionTrigger,
} from '@ng-brutalism/ui';
```

## API Reference

### Accordion (`nb-accordion`)
| Attribute | Type | Default | Description |
|---|---|---|---|
| `type` | `'single' \| 'multiple'` | `'single'` | The expansion behavior of the accordion. |
| `collapsible` | `boolean` | `false` | Whether all items can be collapsed. |
| `value` | `string \| string[] \| null` | `null` | The value of the expanded item(s). |

### Accordion Item (`nb-accordion-item`)
| Attribute | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | *(generated)* | A unique value identifying the accordion item. |
| `disabled` | `boolean` | `false` | Whether the accordion item is disabled. |

### Selectors
| Selector | Description |
|---|---|
| `nb-accordion-trigger` | Toggles its parent item open or closed. Has no inputs. |
| `nb-accordion-content` | Collapsible body region for an item. Has no inputs. |

## Usage Examples

### Default
```html
<nb-accordion class="block w-full max-w-xl" collapsible>
  <nb-accordion-item>
    <nb-accordion-trigger>Lorem, ipsum dolor.</nb-accordion-trigger>
    <nb-accordion-content>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </nb-accordion-content>
  </nb-accordion-item>

  <nb-accordion-item>
    <nb-accordion-trigger>Lorem ipsum dolor sit amet consectetur.</nb-accordion-trigger>
    <nb-accordion-content>
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </nb-accordion-content>
  </nb-accordion-item>
</nb-accordion>
```

### Multiple
```html
<nb-accordion
  class="block w-full max-w-xl"
  type="multiple"
  [value]="['item-1']"
>
  <nb-accordion-item value="item-1">
    <nb-accordion-trigger>Can multiple panels open?</nb-accordion-trigger>
    <nb-accordion-content>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </nb-accordion-content>
  </nb-accordion-item>

  <nb-accordion-item value="item-2">
    <nb-accordion-trigger>Can panels start open?</nb-accordion-trigger>
    <nb-accordion-content>
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
    </nb-accordion-content>
  </nb-accordion-item>
</nb-accordion>
```

### Controlled
```typescript
import { signal } from '@angular/core';

readonly controlledValue = signal<string | string[] | null>('overview');
```

```html
<div class="flex w-full max-w-xl flex-col gap-4">
  <div class="flex flex-wrap gap-3">
    <button
      nbButton
      size="sm"
      tone="background"
      type="button"
      style="--nb-button-bg: var(--nb-warning)"
      (click)="controlledValue.set('overview')"
    >
      Overview
    </button>
    <button
      nbButton
      size="sm"
      tone="background"
      type="button"
      style="--nb-button-bg: var(--nb-success)"
      (click)="controlledValue.set('details')"
    >
      Details
    </button>
    <button
      nbButton
      size="sm"
      tone="background"
      type="button"
      style="--nb-button-bg: var(--nb-primary)"
      (click)="controlledValue.set(null)"
    >
      Collapse All
    </button>
  </div>

  <nb-accordion [(value)]="controlledValue">
    <nb-accordion-item value="overview">
      <nb-accordion-trigger style="--nb-accordion-trigger-bg: #b8a4ff">Overview</nb-accordion-trigger>
      <nb-accordion-content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </nb-accordion-content>
    </nb-accordion-item>

    <nb-accordion-item value="details">
      <nb-accordion-trigger style="--nb-accordion-trigger-bg: #b8a4ff">Details</nb-accordion-trigger>
      <nb-accordion-content>
        Duis aute irure dolor in reprehenderit in voluptate velit.
      </nb-accordion-content>
    </nb-accordion-item>
  </nb-accordion>
</div>
```

### Disabled Item
```html
<nb-accordion collapsible class="block w-full max-w-xl" [value]="'enabled'">
  <nb-accordion-item value="enabled">
    <nb-accordion-trigger>Enabled item</nb-accordion-trigger>
    <nb-accordion-content>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </nb-accordion-content>
  </nb-accordion-item>

  <nb-accordion-item value="disabled" disabled>
    <nb-accordion-trigger>Disabled item</nb-accordion-trigger>
    <nb-accordion-content>
      Excepteur sint occaecat cupidatat non proident.
    </nb-accordion-content>
  </nb-accordion-item>
</nb-accordion>
```
