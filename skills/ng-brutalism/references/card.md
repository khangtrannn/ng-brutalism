# Card

The neo-brutalist Angular Card component. A bold content block with header, content, and footer slots wrapped in thick borders and an offset shadow.

## Import
```typescript
import {
  NbCard,
  NbCardHeader,
  NbCardTitle,
  NbCardDescription,
  NbCardActions,
  NbCardContent,
  NbCardFooter,
} from '@ng-brutalism/ui';
```

## API Reference

### Card (`nb-card`)
| Attribute | Type | Default | Description |
|---|---|---|---|
| `tone` | `NbToneToken` | `'background'` | Background and foreground tone variation. |
| `radius` | `NbRadius` | `'lg'` | Border radius variant. |
| `shadow` | `NbShadow` | `'default'` | Shadow thickness/style. |
| `border` | `NbBorderStrength` | `'default'` | Border thickness/style. |

### Card Actions (`nb-card-actions`)
| Attribute | Type | Default | Description |
|---|---|---|---|
| `align` | `'start' \| 'end'` | `'start'` | Horizontal alignment of the actions inside the row. |

### Selectors / Sub-parts
| Selector | Description |
|---|---|
| `nb-card` | Root container with border, shadow, and background. |
| `nb-card-header` | Top section for title and description content. |
| `nb-card-title` | Heading text inside the header. |
| `nb-card-description` | Subtitle or description text inside the header. |
| `nb-card-actions` | Action row for one or more card-level commands. |
| `nb-card-content` | Main body area. |
| `nb-card-footer` | Bottom section for metadata, summaries, and supporting layout. |

## Usage Examples

### Default
```html
<nb-card>
  <nb-card-header>
    <nb-card-title>Card Title</nb-card-title>
    <nb-card-description>Card Description</nb-card-description>
  </nb-card-header>
  <nb-card-content>
    <p>Card Content</p>
  </nb-card-content>
  <nb-card-actions>
    <button nbButton>Action</button>
  </nb-card-actions>
</nb-card>
```

### Actions Align End
```html
<nb-card class="w-full max-w-sm">
  <nb-card-header>
    <nb-card-title>Notifications</nb-card-title>
    <nb-card-description>
      You have 3 unread messages.
    </nb-card-description>
  </nb-card-header>
  <nb-card-content>
    <p class="text-sm">
      Check your inbox for the latest updates from your team.
    </p>
  </nb-card-content>
  <nb-card-actions align="end">
    <button nbButton size="sm" tone="background">Mark all read</button>
    <button nbButton size="sm">Open inbox</button>
  </nb-card-actions>
</nb-card>
```

### Footer with Metadata and Actions
```html
<nb-card class="w-full max-w-xl">
  <nb-card-header>
    <nb-card-title>Senior Frontend Engineer</nb-card-title>
    <nb-card-description>Inspectorio</nb-card-description>
  </nb-card-header>
  <nb-card-content>
    <p class="text-sm">
      Build delightful UI systems and scalable web experiences.
    </p>
  </nb-card-content>
  <nb-card-footer class="border-t">
    <div class="space-y-2 text-sm">
      <p>Ho Chi Minh City / Remote</p>
      <p>Posted 2 days ago</p>
    </div>
    <nb-card-actions align="end">
      <button nbButton>Apply</button>
      <button nbButton tone="primary">Save</button>
    </nb-card-actions>
  </nb-card-footer>
</nb-card>
```
