# Sticker

SVG-backed callout stickers for launches, cards, badges, and decorative bursts. The component auto-scales text inside jagged sticker shapes and includes a small face primitive for the star sticker.

## Import

```typescript
import { NbSticker, NbStickerFace } from '@ng-brutalism/ui';
```

## API Reference

| Attribute    | Type                                                                                                                                                                               | Default         | Description                                                 |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ----------------------------------------------------------- |
| `shape`      | `'burst' \| 'burst-wide' \| 'star' \| 'splat'`                                                                                                                                     | `'burst'`       | Outer SVG shape.                                            |
| `tone`       | `'default' \| 'cream' \| 'white' \| 'black' \| 'yellow' \| 'pink' \| 'mint' \| 'lavender' \| 'blue' \| 'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'danger'` | `'mint'`        | Background fill token.                                      |
| `decorative` | `boolean`                                                                                                                                                                          | `false`         | Marks purely visual stickers as hidden from assistive tech. |
| `rotate`     | `number \| undefined`                                                                                                                                                              | _shape default_ | Optional CSS rotation in degrees.                           |

## Usage Examples

### Default

```html
<nb-sticker shape="burst" tone="mint" [rotate]="-8">
  NEW<br />
  JOB!
</nb-sticker>
<nb-sticker shape="burst-wide" tone="yellow" [rotate]="5">
  LIMITED<br />
  DROP
</nb-sticker>
<nb-sticker shape="star" tone="pink" aria-label="Happy sticker">
  <nb-sticker-face />
</nb-sticker>
<nb-sticker shape="splat" tone="blue" decorative />
```

### Shapes

```html
<nb-sticker shape="burst" tone="mint">BURST</nb-sticker>
<nb-sticker shape="burst-wide" tone="yellow">WIDE</nb-sticker>
<nb-sticker shape="star" tone="pink" aria-label="Face sticker">
  <nb-sticker-face />
</nb-sticker>
<nb-sticker shape="splat" tone="blue" decorative />
```

### Tones

```html
<nb-sticker class="sticker-tone-face" shape="star" aria-label="Default tone smiling sticker">
  <nb-sticker-face />
</nb-sticker>
<nb-sticker class="sticker-tone-face" shape="star" tone="yellow" aria-label="Yellow smiling sticker">
  <nb-sticker-face />
</nb-sticker>
<nb-sticker class="sticker-tone-face" shape="star" tone="pink" aria-label="Pink smiling sticker">
  <nb-sticker-face />
</nb-sticker>
<nb-sticker class="sticker-tone-face" shape="star" tone="mint" aria-label="Mint smiling sticker">
  <nb-sticker-face />
</nb-sticker>
<nb-sticker class="sticker-tone-face" shape="star" tone="lavender" aria-label="Lavender smiling sticker">
  <nb-sticker-face />
</nb-sticker>
<nb-sticker class="sticker-tone-face" shape="star" tone="blue" aria-label="Blue smiling sticker">
  <nb-sticker-face />
</nb-sticker>
<nb-sticker class="sticker-tone-face" shape="star" tone="accent" aria-label="Accent smiling sticker">
  <nb-sticker-face />
</nb-sticker>
<nb-sticker class="sticker-tone-face" shape="star" tone="success" aria-label="Success smiling sticker">
  <nb-sticker-face />
</nb-sticker>
<nb-sticker class="sticker-tone-face" shape="star" tone="warning" aria-label="Warning smiling sticker">
  <nb-sticker-face />
</nb-sticker>
<nb-sticker class="sticker-tone-face" shape="star" tone="danger" aria-label="Danger smiling sticker">
  <nb-sticker-face />
</nb-sticker>
```

### Rotation

```html
<nb-sticker tone="yellow" [rotate]="-12">-12</nb-sticker>
<nb-sticker tone="pink" [rotate]="0">0</nb-sticker>
<nb-sticker tone="mint" [rotate]="12">+12</nb-sticker>
```
