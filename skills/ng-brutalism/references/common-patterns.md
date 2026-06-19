# Common Patterns

Copy-pasteable composition patterns built from ng-brutalism primitives. Each pattern shows the rendered output and the template — adjust tones, radii, and gaps to fit your context.

## Usage Examples

### Brutalist Card Shell

```html
<article nbSurface tone="cream" radius="xl" shadow="hard" border="strong" clip>
  <header nbSection padding="lg" divider="bottom">
    <div nbCluster gap="sm" align="center" justify="between">
      <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-underline-width: 45%">Card title</h2>
      <span nbChip tone="mint">Active</span>
    </div>
  </header>

  <div nbSection padding="lg">
    <div nbStack gap="md">
      <p nbText>Card content goes here.</p>
      <div nbCluster gap="xs">
        <span nbChip tone="yellow">Tag one</span>
        <span nbChip tone="pink">Tag two</span>
      </div>
    </div>
  </div>

  <footer nbSection padding="lg" divider="top" layout="between" align="center">
    <span nbText tone="muted">Meta info</span>
    <button nbButton tone="yellow">Action</button>
  </footer>
</article>
```

### Toolbar Row

```html
<div nbCluster gap="sm" align="center" justify="between">
  <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-underline-width: 45%">Components</h2>

  <div nbCluster gap="xs">
    <button nbButton size="sm" tone="white">Copy</button>
    <button nbButton size="sm" tone="black">Open</button>
  </div>
</div>
```

### Feature Card Stack

```html
<div nbCluster gap="md">
  <article nbSurface tone="yellow" padding="lg" radius="lg" shadow="hard" border="strong" class="flex-1 min-w-[160px]">
    <div nbStack gap="xs">
      <h3 nbText size="2xl" weight="black" leading="tight" underline="bar" underlineGap="xs" style="--nb-underline-width: 45%">Angular native</h3>
      <p nbText size="sm">Directive APIs, signal inputs.</p>
    </div>
  </article>

  <article nbSurface tone="mint" padding="lg" radius="lg" shadow="hard" border="strong" class="flex-1 min-w-[160px]">
    <div nbStack gap="xs">
      <h3 nbText size="2xl" weight="black" leading="tight" underline="bar" underlineGap="xs" style="--nb-underline-width: 45%">Loud by default</h3>
      <p nbText size="sm">Chunky borders, punchy color.</p>
    </div>
  </article>

  <article nbSurface tone="pink" padding="lg" radius="lg" shadow="hard" border="strong" class="flex-1 min-w-[160px]">
    <div nbStack gap="xs">
      <h3 nbText size="2xl" weight="black" leading="tight" underline="bar" underlineGap="xs" style="--nb-underline-width: 45%">Token driven</h3>
      <p nbText size="sm">CSS variables keep overrides local.</p>
    </div>
  </article>
</div>
```

### Callout Panel

```html
<article nbSurface tone="cream" radius="xl" shadow="hard" border="strong" clip>
  <header nbSection padding="lg" divider="bottom">
    <div nbCluster gap="sm" align="center" justify="between">
      <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-underline-width: 45%">Pricing</h2>
      <span nbChip tone="yellow">Early access</span>
    </div>
  </header>

  <div nbSection padding="lg">
    <div nbStack gap="lg">
      <div nbCallout tone="yellow" size="xl" shadow="hard">$49/mo</div>
      <p nbText>Everything included. No usage limits. Cancel any time.</p>
      <button nbButton tone="black" size="lg">Start free trial</button>
    </div>
  </div>
</article>
```

### Two-Column Card

```html
<article nbSurface tone="lavender" radius="xl" shadow="hard" border="strong" clip>
  <div nbSection padding="lg">
    <div nbSplit ratio="1:2" gap="lg" collapse="sm" align="center">
      <!-- Stat or media placeholder -->
      <div>42</div>

      <div nbStack gap="xs">
        <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-underline-width: 45%">Components shipped</h2>
        <p nbText tone="muted" size="sm">Fully composed, keyboard-ready, token-driven.</p>
      </div>
    </div>
  </div>
</article>
```

### Primitives Used Panel

```html
<section nbSurface tone="cream" padding="lg" radius="xl" shadow="hard" border="strong">
  <div nbStack gap="md">
    <h2 nbDisplay size="sm" underline="bar" underlineGap="xs" class="inline-flex flex-col items-start" style="--nb-underline-width: 45%">Primitives used</h2>

    <div nbCluster gap="xs">
      <span nbChip tone="yellow">nbSurface</span>
      <span nbChip tone="pink">nbSection</span>
      <span nbChip tone="mint">nbSplit</span>
      <span nbChip tone="lavender">nbStack</span>
      <span nbChip tone="blue">nbCluster</span>
    </div>
  </div>
</section>
```
