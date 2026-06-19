# Callout

A high-emphasis directive for important values. Use `nbCallout` for prices, stats, dates, awards, ratings, totals, and other compact pieces of information that need the loud brutalist treatment without domain-specific API.

## Import

```typescript
import { NbCallout, NbSeparator } from '@ng-brutalism/ui';
```

## API Reference

| Attribute | Type                                                                                                                                                                  | Default    | Description                                                               |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------- |
| `tone`    | `'yellow' \| 'pink' \| 'mint' \| 'lavender' \| 'blue' \| 'cream' \| 'white' \| 'black' \| 'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'danger'` | `'yellow'` | Background and foreground color pair.                                     |
| `size`    | `'sm' \| 'md' \| 'lg' \| 'xl'`                                                                                                                                        | `'lg'`     | Height, padding, type size, radius, and border weight preset.             |
| `layout`  | `'inline' \| 'between' \| 'center'`                                                                                                                                   | `'inline'` | Horizontal alignment for the callout content.                             |
| `shadow`  | `'none' \| 'default' \| 'hard'`                                                                                                                                       | `'hard'`   | Offset shadow preset.                                                     |
| `radius`  | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`                                                                                                                    | —          | Corner radius override. Defaults to the `size`-derived radius when unset. |

## Usage Examples

### Default

```html
<div nbCallout tone="yellow" size="xl">$799</div>
```

### Examples

```html
<div class="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2">
  <div nbCallout tone="yellow" size="xl">$799</div>

  <div nbCallout tone="pink" size="lg">
    <span>$420K</span>
  </div>

  <div nbCallout tone="mint" size="md">
    <span>4.9</span>
    <hr nbSeparator orientation="vertical" />
    <span class="text-sm">842 REVIEWS</span>
  </div>

  <div nbCallout tone="lavender" size="lg" layout="between">
    <span>TODAY</span>
    <span>3:30 PM</span>
  </div>
</div>
```

### Tones

```html
<div nbCallout tone="yellow">Yellow</div>
<div nbCallout tone="pink">Pink</div>
<div nbCallout tone="mint">Mint</div>
<div nbCallout tone="black">Black</div>
```

### Sizes

```html
<div nbCallout size="sm">SM</div>
<div nbCallout size="md">MD</div>
<div nbCallout size="lg">LG</div>
<div nbCallout size="xl">XL</div>
```

### Layouts

```html
<div nbCallout layout="inline">
  <span>Inline</span>
  <span>EP 42</span>
</div>

<div nbCallout layout="between">
  <span>Between</span>
  <span>EP 42</span>
</div>

<div nbCallout layout="center">
  <span>Center</span>
  <span>EP 42</span>
</div>
```

### Shadows

```html
<div nbCallout shadow="none">None</div>
<div nbCallout shadow="default">Default</div>
<div nbCallout shadow="hard">Hard</div>
```
