# Surface

A directive for turning any host element into a brutalist panel. Use `nbSurface` for layout shells, callouts, recipe containers, and custom compositions that need the same borders, tones, radius, and offset shadow system as the packaged components.

## Import
```typescript
import { NbSurface } from '@ng-brutalism/ui';
```

## API Reference
| Attribute | Type | Default | Description |
|---|---|---|---|
| `tone` | `'default' \| 'background' \| 'surface' \| 'cream' \| 'white' \| 'black' \| 'yellow' \| 'pink' \| 'mint' \| 'lavender' \| 'blue' \| 'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Background and foreground color pair. |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Corner radius preset. |
| `border` | `'none' \| 'thin' \| 'default' \| 'strong' \| 'thick'` | `'default'` | Border width preset. |
| `shadow` | `'none' \| 'sm' \| 'default' \| 'hard' \| 'heavy'` | `'default'` | Offset shadow preset. |
| `padding` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'none'` | Uniform inner padding. Prefer `nbSection` for region-specific padding inside a surface. |
| `size` | `'auto' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'auto'` | Fixed square size. Use for avatar containers or icon-sized surfaces. `'auto'` lets content define the dimensions. |
| `layout` | `'block' \| 'center' \| 'row' \| 'stack'` | `'block'` | Inner display mode. `center` centers content both axes, `row` aligns children in a row, `stack` stacks them vertically. |
| `edge` | `'none' \| 'top' \| 'bottom'` | `'none'` | Adds a 2 px accent border on the top or bottom edge using the tone's border color. Useful for callout or notification panels. |
| `typography` | `'inherit' \| 'body' \| 'display' \| 'accent' \| 'mono'` | `'inherit'` | Sets a font-family role for the surface and all descendant primitives via the cascade. Composes `nbTypography`. |
| `clip` | `boolean` | `false` | Adds overflow hidden to the surface so child media and decorations respect the surface radius. |

## Usage Examples

### Default
```html
<article
  nbSurface
  tone="yellow"
  radius="xl"
  border="thick"
  shadow="heavy"
  clip
  class="max-w-md"
>
  <div class="border-b-2 border-(--nb-border) bg-nb-primary px-5 py-3">
    <p class="font-mono text-xs font-black uppercase">Launch deck</p>
  </div>
  <div class="p-5">
    <h3>Ship the loud version</h3>
    <p>Surface gives custom layouts the same brutalist frame.</p>
  </div>
</article>
```

### Tones
```html
<div nbSurface tone="default">Default theme surface</div>
<div nbSurface tone="yellow">Yellow surface</div>
<div nbSurface tone="black">Black surface</div>
<div nbSurface tone="success">Success surface</div>
```

### Shape
```html
<div nbSurface radius="sm" border="thin" shadow="sm">Compact</div>
<div nbSurface tone="pink" radius="lg" border="default" shadow="hard">Poster</div>
<div nbSurface tone="mint" radius="xl" border="thick" shadow="heavy">Feature</div>
```

### Clip
```html
<article nbSurface radius="xl" clip class="relative">
  <div class="relative h-44 bg-(--nb-blue)">
    <div class="absolute -right-10 -top-10 size-28 rounded-full bg-(--nb-yellow)"></div>
    <div class="absolute -left-12 bottom-8 h-10 w-44 rotate-[-14deg] bg-(--nb-primary)"></div>
  </div>
  <div class="p-5">Decorative children stay inside the surface radius.</div>
</article>
```
