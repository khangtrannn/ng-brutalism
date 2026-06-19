# Avatar

The neo-brutalist Angular Avatar component. A circular image frame with a thick border and offset shadow. Falls back to projected initials when no image source is provided.

## Import

```typescript
import { NbAvatar } from '@ng-brutalism/ui';
```

## API Reference

| Attribute | Type                  | Default     | Description                         |
| --------- | --------------------- | ----------- | ----------------------------------- |
| `src`     | `string \| undefined` | `undefined` | The URL of the image source.        |
| `alt`     | `string`              | `''`        | The alternative text for the image. |

## Usage Examples

### Default

```html
<nb-avatar class="h-20 w-20" src="https://github.com/khangtrannn.png" alt="khangtrannn" />
```

### Fallback (Initials)

```html
<nb-avatar alt="John Doe">JD</nb-avatar>
```
