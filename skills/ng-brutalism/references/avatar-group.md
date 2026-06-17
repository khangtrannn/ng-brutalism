# AvatarGroup

A component that stacks `NbAvatar` elements with negative overlap and appends an overflow badge when the count exceeds what's shown. Common in charity, event, and social card designs.

## Import
```typescript
import { NbAvatar, NbAvatarGroup } from '@ng-brutalism/ui';
```

## API Reference
| Attribute | Type | Default | Description |
|---|---|---|---|
| `overflow` | `number` | `0` | Number of hidden members. Renders a `+N` badge when > 0. |

## Usage Examples

### Default
```html
<nb-avatar-group [overflow]="142">
  <nb-avatar alt="Alice">A</nb-avatar>
  <nb-avatar alt="Bob">B</nb-avatar>
  <nb-avatar alt="Carol">C</nb-avatar>
</nb-avatar-group>
```

### Without Overflow
```html
<nb-avatar-group>
  <nb-avatar alt="Alice">A</nb-avatar>
  <nb-avatar alt="Bob">B</nb-avatar>
  <nb-avatar alt="Carol">C</nb-avatar>
  <nb-avatar alt="Dave">D</nb-avatar>
</nb-avatar-group>
```
