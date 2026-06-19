# Split Layouts

`nbSplit` creates two-region layouts — hero sections, media/content pairs, sidebar layouts, pricing sections, and profile cards. It replaces repeated grid boilerplate with a single, responsive primitive.

## Import

```typescript
import { NbSplit } from '@ng-brutalism/ui';
```

## API Reference

### Key Inputs

| Input       | Description                                                                      |
| ----------- | -------------------------------------------------------------------------------- |
| `ratio`     | Column proportions — `1:1`, `2:1`, `3:1`, `1:2`, `1:3`, `fill:auto`, `auto:fill` |
| `collapse`  | Breakpoint where columns stack — `none`, `sm`, `md`, `lg`                        |
| `gap`       | Space between the two columns — `xs`, `sm`, `md`, `lg`, `xl`                     |
| `align`     | Cross-axis alignment — `start`, `center`, `end`, `stretch`                       |
| `separator` | Vertical divider — `none`, `solid`, `dashed`, `thick`                            |
| `padding`   | Inner padding on the split container — `xs`, `sm`, `md`, `lg`, `xl`              |

## Usage Examples

### Default Ratios

```html
<!-- Equal columns -->
<section nbSplit ratio="1:1" gap="lg" collapse="md">...</section>

<!-- Wide main + narrow aside (2:1) -->
<section nbSplit ratio="2:1" gap="lg" collapse="md">...</section>

<!-- Very wide main + narrow panel (3:1) -->
<section nbSplit ratio="3:1" gap="xl" collapse="lg">...</section>

<!-- Fixed aside, flexible main -->
<section nbSplit ratio="fill:auto" gap="lg" collapse="md">...</section>
```

### Hero Split

```html
<section nbSplit ratio="2:1" gap="lg" collapse="md" align="stretch">
  <article nbSurface tone="yellow" padding="xl" radius="xl" shadow="hard" border="strong">
    <div nbStack gap="md">
      <h1 nbDisplay size="lg">Build loud.<br />Stay sharp.</h1>
      <p nbText size="lg">Composition primitives for brutalist Angular UIs.</p>
      <div nbCluster gap="sm">
        <button nbButton tone="black">Get started</button>
        <button nbButton tone="white">Browse components</button>
      </div>
    </div>
  </article>

  <aside nbStack gap="md">
    <div nbSurface tone="pink" padding="lg" radius="lg" shadow="hard" border="strong">
      <p nbText weight="bold">Composition primitives</p>
    </div>
    <div nbSurface tone="mint" padding="lg" radius="lg" shadow="hard" border="strong">
      <p nbText weight="bold">Token-driven styling</p>
    </div>
    <div nbSurface tone="lavender" padding="lg" radius="lg" shadow="hard" border="strong">
      <p nbText weight="bold">Angular-first APIs</p>
    </div>
  </aside>
</section>
```

### Media / Content Split

```html
<section nbSplit ratio="1:1" gap="lg" collapse="md">
  <div nbSurface tone="cream" padding="lg" radius="xl" shadow="hard" border="strong" class="grid aspect-video place-items-center text-5xl font-black">01</div>

  <div nbStack gap="md">
    <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-underline-width: 45%">Recipe card</h2>
    <p nbText tone="muted">Use split layouts for visual/content compositions.</p>
    <div nbCluster gap="xs">
      <span nbChip tone="yellow">30 min</span>
      <span nbChip tone="mint">Easy</span>
      <span nbChip tone="pink">Vegan</span>
    </div>
    <button nbButton tone="black" size="sm">View recipe</button>
  </div>
</section>
```
