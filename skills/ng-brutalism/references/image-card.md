# Image Card

The neo-brutalist Angular Image Card component. A media card with thick borders and offset shadow, optimized for displaying images with captions.

## Import

```typescript
import { NbImageCard, NbImageCardCaption } from '@ng-brutalism/ui';
```

## API Reference

| Attribute | Type     | Default  | Description                     |
| --------- | -------- | -------- | ------------------------------- |
| `image`   | `string` | required | URL of the image to render.     |
| `alt`     | `string` | required | Alternative text for the image. |

### Subcomponents

| Selector                | Description                                        |
| ----------------------- | -------------------------------------------------- |
| `nb-image-card-caption` | Projected caption region rendered below the image. |

## Usage Examples

### Default

```html
<nb-image-card [image]="imageUrl" alt="A descriptive alt text">
  <nb-image-card-caption> Image caption </nb-image-card-caption>
</nb-image-card>
```

### With Custom Title Style

```html
<nb-image-card class="w-full max-w-sm" [image]="imageUrl" alt="Animated Angular mascot for Ng Brutalism">
  <nb-image-card-caption>
    <span nbTitle class="inline-block font-mono text-2xl font-black leading-tight text-[#dd0031]" style="--nb-title-wave-color: #f4c430; --nb-title-wave-width: 10rem; --nb-title-wave-height: 0.5rem;"> Angular mascot </span>
  </nb-image-card-caption>
</nb-image-card>
```

### Image Only

```html
<nb-image-card class="w-full max-w-sm" [image]="imageUrl" alt="Animated Angular mascot for Ng Brutalism" />
```
