# Media Frame

Use `nbMediaFrame` for framed visual content: images, video, illustrations, portraits, waveforms, maps, product previews, or any media-like block.

## Import

```typescript
import { NbMediaFrame } from '@ng-brutalism/ui';
```

## API Reference

| Attribute | Type                                                                                                                                         | Default     | Description                                                                         |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------- |
| `tone`    | `'default' \| 'cream' \| 'white' \| 'black' \| 'yellow' \| 'pink' \| 'mint' \| 'lavender' \| 'blue' \| 'primary' \| 'secondary' \| 'accent'` | `'default'` | Background color shown when content doesn't fill the frame.                         |
| `ratio`   | `'auto' \| '1/1' \| '3/4' \| '4/3' \| '3/2' \| '16/9' \| '21/9'`                                                                             | `'auto'`    | Locks the frame to the given aspect ratio. `'auto'` lets content define the height. |
| `fit`     | `'cover' \| 'contain' \| 'fill'`                                                                                                             | `'cover'`   | Object-fit applied to direct `img`, `video`, and `picture` children.                |
| `radius`  | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`                                                                                           | `'lg'`      | Corner radius preset. Use `'full'` for circular portrait frames.                    |
| `shadow`  | `'none' \| 'default' \| 'hard'`                                                                                                              | `'none'`    | Offset shadow preset. `'hard'` adds a bold 6 px brutalist drop shadow.              |

## Usage Examples

### Default

```html
<div nbMediaFrame>
  <img src="/..." alt="" />
</div>

<div nbMediaFrame ratio="16/9" tone="lavender">
  <video src="/..." />
</div>

<div nbMediaFrame ratio="1/1" fit="cover">
  <img src="/profile.png" alt="Profile" />
</div>
```

### Ratios

```html
<div nbMediaFrame ratio="1/1" tone="lavender" shadow="hard">
  <img src="/..." alt="Square" />
</div>

<div nbMediaFrame ratio="3/4" tone="lavender" shadow="hard">
  <img src="/..." alt="Portrait" />
</div>

<div nbMediaFrame ratio="16/9" tone="lavender" shadow="hard">
  <img src="/..." alt="Video" />
</div>

<div nbMediaFrame ratio="21/9" tone="lavender" shadow="hard">
  <img src="/..." alt="Cinematic" />
</div>
```

### Fit

```html
<div nbMediaFrame ratio="16/9" tone="mint" fit="cover">
  <img src="/..." alt="" />
</div>

<div nbMediaFrame ratio="16/9" tone="mint" fit="contain">
  <img src="/..." alt="" />
</div>

<div nbMediaFrame ratio="16/9" tone="mint" fit="fill">
  <img src="/..." alt="" />
</div>
```

### Shape

```html
<div nbMediaFrame ratio="1/1" tone="yellow" radius="none" shadow="none" class="w-48">
  <img src="/..." alt="Sharp" />
</div>

<div nbMediaFrame ratio="1/1" tone="lavender" radius="lg" shadow="default" class="w-48">
  <img src="/..." alt="Poster" />
</div>

<div nbMediaFrame ratio="1/1" tone="pink" radius="full" shadow="hard" class="w-48">
  <img src="/..." alt="Portrait" />
</div>
```
