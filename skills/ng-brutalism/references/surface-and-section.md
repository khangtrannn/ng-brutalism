# Surface & Section

`nbSurface` creates the outer brutalist container. `nbSection` creates internal regions. Together they replace repeated card shell markup with a clear, intentional structure.

## Import

```typescript
import { NbSurface, NbSection } from '@ng-brutalism/ui';
```

## API Reference

### nbSurface

| Attribute | Type                                                                                 | Default | Description                                |
| --------- | ------------------------------------------------------------------------------------ | ------- | ------------------------------------------ |
| `tone`    | `'cream' \| 'yellow' \| 'pink' \| 'mint' \| 'lavender' \| 'black' \| 'white' \| ...` | -       | Color theme                                |
| `radius`  | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`                           | -       | Corner shape                               |
| `shadow`  | `'none' \| 'sm' \| 'default' \| 'hard' \| 'heavy'`                                   | -       | Brutalist offset depth                     |
| `border`  | `'none' \| 'thin' \| 'default' \| 'strong' \| 'thick'`                               | -       | Outline strength                           |
| `clip`    | `boolean`                                                                            | `false` | Clips inner content to the surface radius. |

### nbSection

| Attribute | Type                                                                               | Default | Description      |
| --------- | ---------------------------------------------------------------------------------- | ------- | ---------------- |
| `padding` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                   | -       | Internal space   |
| `divider` | `'top' \| 'bottom' \| 'left' \| 'right' \| 'block' \| 'inline' \| 'all' \| 'none'` | -       | Divider position |
| `layout`  | `'default' \| 'center' \| 'between'`                                               | -       | Flex layout      |

## Usage Examples

### Basic Panel

```html
<article nbSurface tone="cream" radius="xl" shadow="hard" border="strong" clip>
  <header nbSection padding="lg" divider="bottom">
    <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-underline-width: 45%">Profile</h2>
  </header>

  <div nbSection padding="lg">
    <p nbText>Chunky card shell with clear regions.</p>
  </div>
</article>
```

### Header / body / footer

```html
<article nbSurface tone="yellow" radius="xl" border="thick" shadow="hard" clip>
  <header nbSection padding="lg" divider="bottom">
    <div nbCluster gap="sm" align="center" justify="between">
      <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-underline-width: 45%">Campaign draft</h2>
      <span nbChip tone="pink">Draft</span>
    </div>
  </header>

  <div nbSection padding="lg">
    <div nbStack gap="md">
      <p nbText>Body content lives here. Stack controls the vertical rhythm inside the section.</p>
      <div nbCluster gap="xs">
        <span nbChip tone="mint">Angular</span>
        <span nbChip tone="lavender">Signals</span>
      </div>
    </div>
  </div>

  <footer nbSection padding="lg" divider="top" layout="between" align="center">
    <span nbText tone="muted">Last saved 2m ago</span>
    <button nbButton tone="black" size="sm">Publish</button>
  </footer>
</article>
```

### Clip

```html
<!-- clip keeps inner content within the radius -->
<article nbSurface tone="cream" radius="xl" shadow="hard" clip class="relative">
  <header nbSection padding="md" divider="bottom" class="relative bg-(--nb-blue)">
    <div class="absolute -right-5 -top-5 size-16 rounded-full bg-(--nb-yellow)"></div>
    <div class="absolute -left-8 bottom-5 h-5 w-36 rotate-[-12deg] bg-(--nb-primary)"></div>
  </header>
  <div nbSection padding="md">Decorative children are clipped by the surface.</div>
</article>

<!-- without clip, the same children can bleed through rounded corners -->
<article nbSurface tone="cream" radius="xl" shadow="hard" class="relative">
  <header nbSection padding="md" divider="bottom" class="relative bg-(--nb-blue)">
    <div class="absolute -right-5 -top-5 size-16 rounded-full bg-(--nb-yellow)"></div>
    <div class="absolute -left-8 bottom-5 h-5 w-36 rotate-[-12deg] bg-(--nb-primary)"></div>
  </header>
  <div nbSection padding="md">Decorative children can spill outside the surface.</div>
</article>
```
