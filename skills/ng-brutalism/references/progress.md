# Progress

A progress bar component with ARIA progressbar semantics. Supports `value`, `max`, and 5 tones for different semantic contexts — from fundraising goals to media playback.

## Import

```typescript
import { NbProgress } from '@ng-brutalism/ui';
```

## API Reference

| Attribute | Type                                                          | Default      | Description                                        |
| --------- | ------------------------------------------------------------- | ------------ | -------------------------------------------------- |
| `value`   | `number`                                                      | `0`          | Current progress value. Clamped between 0 and max. |
| `max`     | `number`                                                      | `100`        | Maximum value (100% fill point).                   |
| `tone`    | `'default' \| 'success' \| 'warning' \| 'danger' \| 'accent'` | `'default'`  | Fill color tone.                                   |
| `label`   | `string`                                                      | `'Progress'` | ARIA label for the progressbar role.               |

## Usage Examples

### Default

```html
<nb-progress [value]="68" label="Campaign progress" />
```

### Tones

```html
<nb-progress [value]="60" />
<nb-progress [value]="80" tone="success" />
<nb-progress [value]="45" tone="warning" />
<nb-progress [value]="20" tone="danger" />
<nb-progress [value]="70" tone="accent" />
```
