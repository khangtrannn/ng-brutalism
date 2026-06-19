# StatusDot

A directive on `<span>` that renders a status indicator dot. Three states — online, offline, and live — cover presence, availability, and real-time streaming use cases.

## Import

```typescript
import { NbStatusDot } from '@ng-brutalism/ui';
```

## API Reference

| Attribute | Type                              | Default    | Description                         |
| --------- | --------------------------------- | ---------- | ----------------------------------- |
| `state`   | `'online' \| 'offline' \| 'live'` | `'online'` | The visual state of the indicator.  |
| `size`    | `'xs' \| 'sm' \| 'md' \| 'lg'`    | `'md'`     | The size of the indicator dot.      |
| `radius`  | `NbRadius`                        | `'md'`     | The border radius of the indicator. |

## Usage Examples

### Default

```html
<span nbStatusDot state="online"></span>
<span nbStatusDot state="offline"></span>
<span nbStatusDot state="live"></span>
```

### States

```html
<span nbStatusDot state="online"></span>
<span nbStatusDot state="offline"></span>
<span nbStatusDot state="live"></span>
```
