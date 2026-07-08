import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import { NbButton } from '../../button';
import { NbBadge } from '../../badge';
import { NbCard } from '../../card';
import { NbChip } from '../../chip';
import { NbCluster } from '../../cluster';
import { NbDisplay } from '../../display';
import { NbIconButton } from '../../icon-button';
import { NbImageCard } from '../../image-card';
import { NbMediaFrame } from '../../media-frame';
import { NbMediaItem } from '../../media-item';
import { NbStack } from '../../stack';
import { NbSurface } from '../../surface';
import { NbText } from '../../text';

const cssImportPattern = /^@import\s+['"]([^'"]+)['"];/gm;
const stylesCss = readUiStylesCss();

function readUiStylesCss(): string {
  const candidates = [
    join(process.cwd(), 'src/lib/styles/styles.css'),
    join(process.cwd(), 'libs/ui/src/lib/styles/styles.css'),
  ];
  const path = candidates.find((candidate) => existsSync(candidate));

  if (!path) {
    throw new Error(
      'Unable to locate libs/ui styles.css for token priority specs.'
    );
  }

  return readCssWithLocalImports(path);
}

function readCssWithLocalImports(
  path: string,
  seen = new Set<string>()
): string {
  const absolutePath = resolve(path);

  if (seen.has(absolutePath)) {
    return '';
  }

  seen.add(absolutePath);

  const css = readFileSync(absolutePath, 'utf8');

  return css.replace(cssImportPattern, (statement, specifier: string) => {
    if (!specifier.startsWith('.')) {
      return statement;
    }

    const importedPath = resolve(dirname(absolutePath), specifier);

    if (!existsSync(importedPath)) {
      return statement;
    }

    return `${statement}\n${readCssWithLocalImports(importedPath, seen)}`;
  });
}

function mount<T>(type: new () => T): HTMLElement {
  const fixture: ComponentFixture<T> = TestBed.createComponent(type);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

@Component({
  imports: [NbSurface],
  template: `<div nbSurface tone="mint" radius="xl">Loud</div>`,
})
class SurfaceExplicitTest {}

@Component({
  imports: [NbSurface],
  template: `<div nbSurface>Defaults</div>`,
})
class SurfaceDefaultsTest {}

@Component({
  imports: [NbButton],
  template: `<button nbButton tone="lavender">Listen</button>`,
})
class ButtonToneTest {}

@Component({
  imports: [NbButton],
  template: `
    <div id="scope" style="--nb-button-bg: #ffcc00">
      <button
        id="input-local"
        nbButton
        tone="accent"
        style="--nb-button-bg: #00e5ff"
      >
        Input beats local
      </button>
      <button id="input-inherited" nbButton tone="accent">
        Input beats inherited
      </button>
      <button id="local" nbButton style="--nb-button-bg: #00e5ff">
        Local beats inherited
      </button>
      <button id="inherited" nbButton>Inherited beats fallback</button>
    </div>
    <button id="fallback" nbButton>Fallback</button>
  `,
})
class ButtonBackgroundPriorityTest {}

@Component({
  imports: [NbMediaFrame],
  template: `<div nbMediaFrame shadow="hard"></div>`,
})
class MediaFrameTest {}

@Component({
  imports: [NbStack],
  template: `<div nbStack gap="lg"></div>`,
})
class StackTest {}

@Component({
  imports: [NbIconButton],
  template: `<button
    nbIconButton
    tone="mint"
    radius="md"
    shadow="hard"
    border="strong"
  ></button>`,
})
class IconButtonCapabilitiesTest {}

@Component({
  imports: [NbChip],
  template: `<span nbChip border="strong">New</span>`,
})
class ChipBorderTest {}

@Component({
  imports: [NbButton],
  template: `<button nbButton border="strong">Save</button>`,
})
class ButtonBorderTest {}

@Component({
  imports: [NbMediaItem],
  template: `<nb-media-item tone="yellow" title="Hi"></nb-media-item>`,
})
class MediaItemToneTest {}

@Component({
  imports: [NbBadge],
  template: `<span nbBadge tone="danger" border="strong">Hot</span>`,
})
class BadgeCapabilitiesTest {}

@Component({
  imports: [NbCard],
  template: `<nb-card
    tone="mint"
    radius="xl"
    shadow="heavy"
    border="thick"
  ></nb-card>`,
})
class CardCapabilitiesTest {}

@Component({
  imports: [NbImageCard],
  template: `<nb-image-card
    image="x.jpg"
    alt="x"
    tone="pink"
    border="thin"
  ></nb-image-card>`,
})
class ImageCardCapabilitiesTest {}

@Component({
  imports: [NbChip],
  template: `
    <span nbChip>Default</span>
    <span nbChip class="rounded-full">Tailwind wins</span>
    <span nbChip radius="sm" class="rounded-full">Input wins</span>
    <div class="[--nb-chip-radius:4px]">
      <span nbChip>Scoped token wins</span>
      <span nbChip radius="xl">Input wins over scoped</span>
    </div>
  `,
})
class ChipRadiusPrecedenceTest {}

@Component({
  imports: [NbChip],
  template: `
    <span nbChip>Default tone</span>
    <span nbChip class="bg-green-200 text-black">Class wins</span>
    <span nbChip tone="pink" class="bg-green-200 text-black">Tone wins</span>
    <div class="[--nb-chip-bg:#ffcc00] [--nb-chip-fg:#111]">
      <span nbChip>Scoped token wins</span>
      <span nbChip tone="pink">Tone wins over scoped</span>
    </div>
  `,
})
class ChipTonePrecedenceTest {}

@Component({
  imports: [NbCluster],
  template: `
    <div nbCluster gap="2xl" separator="dashed">
      <span>One</span>
      <span>Two</span>
      <span>Three</span>
    </div>
  `,
})
class ClusterSeparatorGapTest {}

@Component({
  imports: [NbButton],
  template: `<button nbButton radius="md">Book Trip</button>`,
})
class ButtonRadiusTest {}

@Component({
  imports: [NbSurface],
  template: `
    <div nbSurface radius="xl">
      <div id="inner" nbSurface></div>
    </div>
  `,
})
class NestedSurfaceTest {}

@Component({
  imports: [NbChip, NbSurface, NbStack],
  template: `
    <span nbChip class="shadow-none border-0">Tailwind wins</span>
    <span nbChip shadow="hard" border="strong" class="shadow-none border-0">
      Input wins
    </span>
    <div class="[--nb-chip-shadow:none] [--nb-chip-border-width:1px]">
      <span nbChip>Scoped token wins</span>
      <span nbChip shadow="heavy" border="thick">Input wins over scoped</span>
    </div>

    <div nbSurface class="p-0">Tailwind padding wins</div>
    <div nbSurface padding="lg" class="p-0">Input padding wins</div>
    <div class="[--nb-surface-padding:4px]">
      <div nbSurface>Scoped padding wins</div>
      <div nbSurface padding="xl">Input padding wins over scoped</div>
    </div>

    <div nbStack class="gap-1"></div>
    <div nbStack gap="lg" class="gap-1"></div>
    <div class="[--nb-stack-gap:4px]">
      <div nbStack></div>
      <div nbStack gap="xl"></div>
    </div>
  `,
})
class CapabilityPrecedenceTest {}

describe('style capabilities', () => {
  it('nbSurface writes explicit scalar inputs to public CSS variables', () => {
    // Arrange
    const el = mount(SurfaceExplicitTest);
    const surface = el.querySelector<HTMLElement>('[nbSurface]')!;

    // Assert
    expect(surface.style.getPropertyValue('border-radius')).toBe('');
    expect(surface.style.getPropertyValue('--nb-surface-radius')).toBe(
      'var(--nb-radius-xl)'
    );
    expect(surface.getAttribute('data-nb-tone')).toBe('mint');
    expect(surface.style.getPropertyValue('background')).toBe('');
    expect(surface.style.getPropertyValue('color')).toBe('');
    expect(surface.style.getPropertyValue('border-color')).toBe('');
    expect(surface.style.getPropertyValue('--nb-surface-bg')).toBe('');
    expect(surface.style.cssText).not.toContain('--nb-resolved');
  });

  it('nbSurface applies primitive defaults when inputs are omitted', () => {
    // Arrange
    const el = mount(SurfaceDefaultsTest);
    const surface = el.querySelector<HTMLElement>('[nbSurface]')!;

    // Assert
    expect(surface.className).not.toMatch(/(?:^|\s)nb-radius(?:\s|$)/);
    expect(surface.className).not.toMatch(/(?:^|\s)nb-padding(?:\s|$)/);
    expect(surface.style.getPropertyValue('border-radius')).toBe('');
    expect(surface.style.getPropertyValue('border-width')).toBe('');
    expect(surface.style.getPropertyValue('--nb-surface-padding')).toBe('');
    expect(surface.style.getPropertyValue('padding')).toBe('');
    expect(surface.style.cssText).not.toContain('--nb-resolved');
  });

  it('nbButton reflects tone semantically without writing final colors', () => {
    // Arrange
    const el = mount(ButtonToneTest);
    const button = el.querySelector<HTMLElement>('[nbButton]')!;

    // Assert
    expect(button.getAttribute('data-nb-tone')).toBe('lavender');
    expect(button.style.getPropertyValue('background')).toBe('');
    expect(button.style.getPropertyValue('--nb-button-bg')).toBe('');
    expect(button.style.getPropertyValue('--nb-surface-bg')).toBe('');
    expect(button.style.cssText).not.toContain('--nb-resolved');
  });

  it('local button token remains user-owned when tone is explicit', () => {
    // Arrange
    const el = mount(ButtonBackgroundPriorityTest);
    const button = el.querySelector<HTMLElement>('#input-local')!;

    // Assert
    expect(button.getAttribute('data-nb-tone')).toBe('accent');
    expect(button.style.getPropertyValue('--nb-button-bg')).toBe('#00e5ff');
    expect(button.style.getPropertyValue('background')).toBe('');
  });

  it('explicit tone is semantic when button background is inherited', () => {
    // Arrange
    const el = mount(ButtonBackgroundPriorityTest);
    const scope = el.querySelector<HTMLElement>('#scope')!;
    const button = el.querySelector<HTMLElement>('#input-inherited')!;

    // Assert
    expect(scope.style.getPropertyValue('--nb-button-bg')).toBe('#ffcc00');
    expect(button.getAttribute('data-nb-tone')).toBe('accent');
    expect(button.style.getPropertyValue('--nb-button-bg')).toBe('');
    expect(button.style.getPropertyValue('background')).toBe('');
  });

  it('local token beats inherited token when button tone is unset', () => {
    // Arrange
    const el = mount(ButtonBackgroundPriorityTest);
    const scope = el.querySelector<HTMLElement>('#scope')!;
    const button = el.querySelector<HTMLElement>('#local')!;

    // Assert
    expect(scope.style.getPropertyValue('--nb-button-bg')).toBe('#ffcc00');
    expect(button.style.getPropertyValue('--nb-button-bg')).toBe('#00e5ff');
    expect(button.style.getPropertyValue('background')).toBe('');
    expect(stylesCss).toContain(
      'background: var(--nb-button-bg, var(--_nb-tone-bg, var(--nb-primary)));'
    );
  });

  it('inherited token beats the library fallback when button tone is unset', () => {
    // Arrange
    const el = mount(ButtonBackgroundPriorityTest);
    const scope = el.querySelector<HTMLElement>('#scope')!;
    const button = el.querySelector<HTMLElement>('#inherited')!;

    // Assert
    expect(scope.style.getPropertyValue('--nb-button-bg')).toBe('#ffcc00');
    expect(button.style.getPropertyValue('--nb-button-bg')).toBe('');
    expect(button.style.getPropertyValue('background')).toBe('');
    expect(stylesCss).toContain(
      'background: var(--nb-button-bg, var(--_nb-tone-bg, var(--nb-primary)));'
    );
  });

  it('library fallback is used when button tone and tokens are unset', () => {
    // Arrange
    const el = mount(ButtonBackgroundPriorityTest);
    const button = el.querySelector<HTMLElement>('#fallback')!;

    // Assert
    expect(button.style.getPropertyValue('--nb-button-bg')).toBe('');
    expect(button.style.getPropertyValue('background')).toBe('');
    expect(stylesCss).toContain(
      'background: var(--nb-button-bg, var(--_nb-tone-bg, var(--nb-primary)));'
    );
  });

  it('nbMediaFrame shadow input writes the public shadow variable', () => {
    // Arrange
    const el = mount(MediaFrameTest);
    const frame = el.querySelector<HTMLElement>('[nbMediaFrame]')!;

    // Assert
    expect(frame.style.getPropertyValue('box-shadow')).toBe('');
    expect(frame.style.getPropertyValue('--nb-media-frame-shadow')).toBe(
      'var(--nb-shadow-hard)'
    );
    expect(frame.style.cssText).not.toContain('--nb-resolved');
  });

  it('nbStack gap input writes the public gap variable', () => {
    // Arrange
    const el = mount(StackTest);
    const stack = el.querySelector<HTMLElement>('[nbStack]')!;

    // Assert
    expect(stack.style.getPropertyValue('gap')).toBe('');
    expect(stack.style.getPropertyValue('--nb-stack-gap')).toBe('var(--nb-space-lg)');
    expect(stack.style.cssText).not.toContain('--nb-resolved');
  });

  it('derived anatomy fallbacks live in CSS', () => {
    // Assert
    expect(stylesCss).toContain(
      'padding-top: var(--nb-stack-separator-gap, var(--nb-stack-gap, 0.75rem));'
    );
    expect(stylesCss).toContain('calc(var(--nb-cluster-gap, 0.75rem) * 0.5)');
    expect(stylesCss).toContain(
      'var(--nb-split-separator-gap, var(--nb-split-gap, 1rem)) / -2'
    );
    expect(stylesCss).toContain(
      'margin-inline: calc(0px - var(--nb-section-padding, 1rem));'
    );
    expect(stylesCss).toContain(
      'border-top-width: var(--nb-image-card-border-width, var(--nb-border-width));'
    );
  });

  it('nbIconButton composes explicit visual inputs and semantic tone', () => {
    // Arrange
    const el = mount(IconButtonCapabilitiesTest);
    const button = el.querySelector<HTMLElement>('[nbIconButton]')!;

    // Assert
    expect(button.getAttribute('data-nb-tone')).toBe('mint');
    expect(button.style.getPropertyValue('background')).toBe('');
    expect(button.style.getPropertyValue('border-radius')).toBe('');
    expect(button.style.getPropertyValue('box-shadow')).toBe('');
    expect(button.style.getPropertyValue('border-width')).toBe('');
    expect(button.style.getPropertyValue('--nb-icon-button-radius')).toBe(
      'var(--nb-radius-md)'
    );
    expect(button.style.getPropertyValue('--nb-icon-button-shadow')).toBe(
      'var(--nb-shadow-hard)'
    );
    expect(button.style.getPropertyValue('--nb-icon-button-border-width')).toBe(
      'var(--nb-border-width-strong)'
    );
    expect(button.style.cssText).not.toContain('--nb-resolved');
  });

  it('nbChip border input writes the public border-width variable', () => {
    // Arrange
    const el = mount(ChipBorderTest);
    const chip = el.querySelector<HTMLElement>('[nbChip]')!;

    // Assert
    expect(chip.style.getPropertyValue('border-width')).toBe('');
    expect(chip.style.getPropertyValue('--nb-chip-border-width')).toBe('var(--nb-border-width-strong)');
    expect(chip.style.cssText).not.toContain('--nb-resolved');
  });

  it('nbButton border input writes the public border-width variable', () => {
    // Arrange
    const el = mount(ButtonBorderTest);
    const button = el.querySelector<HTMLElement>('[nbButton]')!;

    // Assert
    expect(button.style.getPropertyValue('border-width')).toBe('');
    expect(button.style.getPropertyValue('--nb-button-border-width')).toBe(
      'var(--nb-border-width-strong)'
    );
  });

  it('nbMediaItem tone reflects semantically without writing final colors inline', () => {
    // Arrange
    const el = mount(MediaItemToneTest);
    const item = el.querySelector<HTMLElement>('nb-media-item')!;

    // Assert
    expect(item.getAttribute('data-nb-tone')).toBe('yellow');
    expect(item.style.getPropertyValue('background')).toBe('');
    expect(item.style.getPropertyValue('color')).toBe('');
    expect(item.style.getPropertyValue('--nb-media-item-bg')).toBe('');
    expect(item.style.cssText).not.toContain('--nb-resolved');
  });

  it('nbBadge composes semantic tone and scalar border variable', () => {
    // Arrange
    const el = mount(BadgeCapabilitiesTest);
    const badge = el.querySelector<HTMLElement>('[nbBadge]')!;

    // Assert
    expect(badge.getAttribute('data-nb-tone')).toBe('danger');
    expect(badge.style.getPropertyValue('background')).toBe('');
    expect(badge.style.getPropertyValue('border-width')).toBe('');
    expect(badge.style.getPropertyValue('--nb-badge-border-width')).toBe(
      'var(--nb-border-width-strong)'
    );
    expect(badge.style.cssText).not.toContain('--nb-resolved');
  });

  it('nbCard composes semantic tone and scalar shell variables', () => {
    // Arrange
    const el = mount(CardCapabilitiesTest);
    const card = el.querySelector<HTMLElement>('nb-card')!;

    // Assert
    expect(card.getAttribute('data-nb-tone')).toBe('mint');
    expect(card.style.getPropertyValue('background')).toBe('');
    expect(card.style.getPropertyValue('border-radius')).toBe('');
    expect(card.style.getPropertyValue('box-shadow')).toBe('');
    expect(card.style.getPropertyValue('border-width')).toBe('');
    expect(card.style.getPropertyValue('--nb-card-radius')).toBe(
      'var(--nb-radius-xl)'
    );
    expect(card.style.getPropertyValue('--nb-card-shadow')).toBe(
      'var(--nb-shadow-heavy)'
    );
    expect(card.style.getPropertyValue('--nb-card-border-width')).toBe('var(--nb-border-width-thick)');
    expect(card.style.cssText).not.toContain('--nb-resolved');
  });

  it('nbImageCard composes semantic tone and scalar border variable', () => {
    // Arrange
    const el = mount(ImageCardCapabilitiesTest);
    const card = el.querySelector<HTMLElement>('nb-image-card')!;

    // Assert
    expect(card.getAttribute('data-nb-tone')).toBe('pink');
    expect(card.style.getPropertyValue('background')).toBe('');
    expect(card.style.getPropertyValue('border-width')).toBe('');
    expect(card.style.getPropertyValue('--nb-image-card-border-width')).toBe(
      'var(--nb-border-width-thin)'
    );
    expect(card.style.cssText).not.toContain('--nb-resolved');
  });

  it('nbChip radius input wins outright over public hooks and scoped tokens', () => {
    // Arrange
    const el = mount(ChipRadiusPrecedenceTest);
    const chips = el.querySelectorAll<HTMLElement>('[nbChip]');

    // Assert
    expect(chips[0].className).not.toMatch(/(?:^|\s)nb-radius(?:\s|$)/);
    expect(chips[0].style.getPropertyValue('border-radius')).toBe('');
    expect(chips[0].style.getPropertyValue('--nb-chip-radius')).toBe('');

    expect(chips[1].className).toContain('rounded-full');
    expect(chips[1].style.getPropertyValue('border-radius')).toBe('');

    expect(chips[2].className).toContain('rounded-full');
    expect(chips[2].style.getPropertyValue('border-radius')).toBe('');
    expect(chips[2].style.getPropertyValue('--nb-chip-radius')).toBe(
      'var(--nb-radius-sm)'
    );

    expect(chips[3].style.getPropertyValue('border-radius')).toBe('');
    expect(chips[4].style.getPropertyValue('border-radius')).toBe('');
    expect(chips[4].style.getPropertyValue('--nb-chip-radius')).toBe(
      'var(--nb-radius-xl)'
    );
  });

  it('nbChip tone input wins outright over public hooks and scoped tokens', () => {
    // Arrange
    const el = mount(ChipTonePrecedenceTest);
    const chips = el.querySelectorAll<HTMLElement>('[nbChip]');

    // Assert
    expect(chips[0].className).not.toMatch(/(?:^|\s)nb-tone(?:\s|$)/);
    expect(chips[0].style.getPropertyValue('background-color')).toBe('');
    expect(chips[0].style.getPropertyValue('--nb-chip-bg')).toBe('');

    expect(chips[1].className).toContain('bg-green-200');
    expect(chips[1].className).toContain('text-black');
    expect(chips[1].style.getPropertyValue('background-color')).toBe('');

    expect(chips[2].getAttribute('data-nb-tone')).toBe('pink');
    expect(chips[2].style.getPropertyValue('background')).toBe('');
    expect(chips[2].style.getPropertyValue('color')).toBe('');

    expect(chips[3].style.getPropertyValue('background')).toBe('');
    expect(chips[4].getAttribute('data-nb-tone')).toBe('pink');
    expect(chips[4].style.getPropertyValue('background')).toBe('');
  });

  it('same-namespace surface inputs do not leak into nested primitives', () => {
    // Arrange
    const el = mount(NestedSurfaceTest);
    const outer = el.querySelector<HTMLElement>('[nbSurface]')!;
    const inner = el.querySelector<HTMLElement>('#inner')!;

    // Assert
    expect(outer.style.getPropertyValue('border-radius')).toBe('');
    expect(outer.style.getPropertyValue('--nb-surface-radius')).toBe(
      'var(--nb-radius-xl)'
    );
    expect(inner.style.getPropertyValue('border-radius')).toBe('');
    expect(inner.style.getPropertyValue('--nb-surface-radius')).toBe('');
    expect(inner.style.cssText).not.toContain('--nb-resolved');
  });

  it('shadow, padding, gap, and border follow the same precedence model', () => {
    // Arrange
    const el = mount(CapabilityPrecedenceTest);
    const chips = el.querySelectorAll<HTMLElement>('[nbChip]');
    const surfaces = el.querySelectorAll<HTMLElement>('[nbSurface]');
    const stacks = el.querySelectorAll<HTMLElement>('[nbStack]');

    // Assert
    expect(chips[0].className).toContain('shadow-none');
    expect(chips[0].className).toContain('border-0');
    expect(chips[0].style.getPropertyValue('box-shadow')).toBe('');
    expect(chips[0].style.getPropertyValue('border-width')).toBe('');

    expect(chips[1].style.getPropertyValue('box-shadow')).toBe('');
    expect(chips[1].style.getPropertyValue('border-width')).toBe('');
    expect(chips[1].style.getPropertyValue('--nb-chip-shadow')).toBe(
      'var(--nb-shadow-hard)'
    );
    expect(chips[1].style.getPropertyValue('--nb-chip-border-width')).toBe(
      'var(--nb-border-width-strong)'
    );

    expect(chips[2].style.getPropertyValue('box-shadow')).toBe('');
    expect(chips[3].style.getPropertyValue('box-shadow')).toBe('');
    expect(chips[3].style.getPropertyValue('border-width')).toBe('');
    expect(chips[3].style.getPropertyValue('--nb-chip-shadow')).toBe(
      'var(--nb-shadow-heavy)'
    );
    expect(chips[3].style.getPropertyValue('--nb-chip-border-width')).toBe(
      'var(--nb-border-width-thick)'
    );

    expect(surfaces[0].className).toContain('p-0');
    expect(surfaces[0].style.getPropertyValue('padding')).toBe('');
    expect(surfaces[1].style.getPropertyValue('padding')).toBe('');
    expect(surfaces[1].style.getPropertyValue('--nb-surface-padding')).toBe(
      'var(--nb-padding-lg)'
    );
    expect(surfaces[2].style.getPropertyValue('padding')).toBe('');
    expect(surfaces[3].style.getPropertyValue('padding')).toBe('');
    expect(surfaces[3].style.getPropertyValue('--nb-surface-padding')).toBe(
      'var(--nb-padding-xl)'
    );

    expect(stacks[0].className).toContain('gap-1');
    expect(stacks[0].style.getPropertyValue('gap')).toBe('');
    expect(stacks[1].style.getPropertyValue('gap')).toBe('');
    expect(stacks[1].style.getPropertyValue('--nb-stack-gap')).toBe('var(--nb-space-lg)');
    expect(stacks[2].style.getPropertyValue('gap')).toBe('');
    expect(stacks[3].style.getPropertyValue('gap')).toBe('');
    expect(stacks[3].style.getPropertyValue('--nb-stack-gap')).toBe('var(--nb-space-xl)');
  });

  it('nbCluster separator derives spacing from actual gap and neutralizes column gap', () => {
    // Arrange
    const el = mount(ClusterSeparatorGapTest);
    const cluster = el.querySelector<HTMLElement>('[nbCluster]')!;

    // Assert
    expect(cluster.style.getPropertyValue('gap')).toBe('');
    expect(cluster.style.getPropertyValue('--nb-cluster-gap')).toBe('var(--nb-space-2xl)');
    expect(cluster.style.getPropertyValue('column-gap')).toBe('0px');
    expect(cluster.style.getPropertyValue('--nb-cluster-separator-gap')).toBe(
      'calc(var(--nb-space-2xl) * 0.5)'
    );
    expect(cluster.style.cssText).not.toContain('--nb-resolved');
  });

  it('nbButton radius md writes the public radius variable', () => {
    // Arrange
    const el = mount(ButtonRadiusTest);
    const button = el.querySelector<HTMLElement>('[nbButton]')!;

    // Assert
    expect(button.style.getPropertyValue('border-radius')).toBe('');
    expect(button.style.getPropertyValue('--nb-button-radius')).toBe(
      'var(--nb-radius-md)'
    );
  });

  it('!important CSS beats input at computed level', () => {
    // Arrange
    const el = mount(ButtonRadiusTest);
    const button = el.querySelector<HTMLElement>('[nbButton]')!;

    // Act
    button.style.setProperty('border-radius', '999px', 'important');

    // Assert
    const computed = window.getComputedStyle(button);
    expect(computed.borderRadius).toBe('999px');
  });
});

@Component({
  imports: [NbText],
  template: `<p nbText>Default</p>`,
})
class TextDefaultsTest {}

@Component({
  imports: [NbText],
  template: `<p
    nbText
    size="xl"
    weight="bold"
    tone="muted"
    tracking="wide"
    leading="relaxed"
    measure="md"
  >
    Styled
  </p>`,
})
class TextExplicitTest {}

@Component({
  imports: [NbText],
  template: `<p nbText underline="bar" underlineGap="md" underlineWidth="lg">
    Underlined
  </p>`,
})
class TextUnderlineTest {}

@Component({
  imports: [NbText],
  template: `<p nbText [reset]="false">No reset</p>`,
})
class TextNoResetTest {}

@Component({
  imports: [NbText],
  template: `<p nbText reset>Reset default</p>`,
})
class TextResetDefaultTest {}

describe('NbText + NbDisplay capability composition', () => {
  it('nbText default: marks for stylesheet margin reset and sets data-nb-text attribute', () => {
    // Arrange
    const el = mount(TextDefaultsTest);
    const p = el.querySelector<HTMLElement>('[nbText]')!;

    // Assert
    expect(p.getAttribute('data-nb-text')).toBe('');
    expect(p.getAttribute('data-nb-tone')).toBeNull();
    expect(p.getAttribute('data-tone')).toBeNull();
    expect(p.getAttribute('data-nb-reset-margin')).toBe('');
    expect(p.style.getPropertyValue('margin')).toBe('');
  });

  it('nbText explicit inputs reflect as data attributes, not final inline styles', () => {
    // Arrange
    const el = mount(TextExplicitTest);
    const p = el.querySelector<HTMLElement>('[nbText]')!;

    // Assert
    expect(p.style.getPropertyValue('font-size')).toBe('');
    expect(p.style.getPropertyValue('font-weight')).toBe('');
    expect(p.style.getPropertyValue('letter-spacing')).toBe('');
    expect(p.style.getPropertyValue('line-height')).toBe('');
    expect(p.style.getPropertyValue('max-width')).toBe('');
    expect(p.getAttribute('data-size')).toBe('xl');
    expect(p.getAttribute('data-weight')).toBe('bold');
    expect(p.getAttribute('data-tracking')).toBe('wide');
    expect(p.getAttribute('data-leading')).toBe('relaxed');
    expect(p.getAttribute('data-measure')).toBe('md');
    expect(p.getAttribute('data-nb-tone')).toBe('muted');
    expect(p.getAttribute('data-tone')).toBeNull();
    expect(p.style.getPropertyValue('--nb-text-color')).toContain(
      'var(--nb-foreground)'
    );
  });

  it('nbText maps underline capability values to data attribute and CSS vars', () => {
    // Arrange
    const el = mount(TextUnderlineTest);
    const p = el.querySelector<HTMLElement>('[nbText]')!;

    // Assert
    expect(p.getAttribute('data-underline')).toBe('bar');
    expect(p.style.getPropertyValue('--nb-underline-gap')).toBe('0.75rem');
    expect(p.style.getPropertyValue('--nb-underline-width')).toBe('12rem');
  });

  it('nbText reset=false leaves margin unset', () => {
    // Arrange
    const el = mount(TextNoResetTest);
    const p = el.querySelector<HTMLElement>('[nbText]')!;

    // Assert
    expect(p.hasAttribute('data-nb-reset-margin')).toBe(false);
    expect(p.style.getPropertyValue('margin')).toBe('');
  });

  it('nbText reset default (true) enables stylesheet margin reset', () => {
    // Arrange
    const el = mount(TextResetDefaultTest);
    const p = el.querySelector<HTMLElement>('[nbText]')!;

    // Assert
    expect(p.getAttribute('data-nb-reset-margin')).toBe('');
    expect(p.style.getPropertyValue('margin')).toBe('');
  });
});

@Component({
  imports: [NbDisplay],
  template: `<h1 nbDisplay>Default</h1>`,
})
class DisplayDefaultsTest {}

@Component({
  imports: [NbDisplay],
  template: `<h1
    nbDisplay
    size="lg"
    weight="black"
    tracking="tighter"
    leading="display"
  >
    Styled
  </h1>`,
})
class DisplayExplicitTest {}

@Component({
  imports: [NbDisplay],
  template: `<h1 nbDisplay fluid size="xl">Fluid</h1>`,
})
class DisplayFluidTest {}

@Component({
  imports: [NbDisplay],
  template: `<h1
    nbDisplay
    underline="wave"
    underlineGap="sm"
    underlineWidth="md"
  >
    Underlined
  </h1>`,
})
class DisplayUnderlineTest {}

@Component({
  imports: [NbDisplay],
  template: `<h1 nbDisplay [reset]="false">No reset</h1>`,
})
class DisplayNoResetTest {}

@Component({
  imports: [NbDisplay],
  template: `<h1 nbDisplay style="--nb-display-size: 6rem">Override</h1>`,
})
class DisplayCssVarOverrideTest {}

@Component({
  imports: [NbDisplay],
  template: `<h1
    nbDisplay
    underline="bar"
    style="--nb-underline-width: 45%; --nb-underline-gap: 0.125rem"
  >
    Override
  </h1>`,
})
class DisplayUnderlineCssVarOverrideTest {}

describe('NbDisplay capability composition', () => {
  it('nbDisplay default: marks for stylesheet margin reset and sets data-nb-display attribute', () => {
    // Arrange
    const el = mount(DisplayDefaultsTest);
    const h = el.querySelector<HTMLElement>('[nbDisplay]')!;

    // Assert
    expect(h.getAttribute('data-nb-display')).toBe('');
    expect(h.getAttribute('data-nb-reset-margin')).toBe('');
    expect(h.style.getPropertyValue('margin')).toBe('');
  });

  it('nbDisplay explicit size/weight/tracking/leading reflect as data attributes', () => {
    // Arrange
    const el = mount(DisplayExplicitTest);
    const h = el.querySelector<HTMLElement>('[nbDisplay]')!;

    // Assert
    expect(h.style.getPropertyValue('font-size')).toBe('');
    expect(h.style.getPropertyValue('font-weight')).toBe('');
    expect(h.style.getPropertyValue('letter-spacing')).toBe('');
    expect(h.style.getPropertyValue('line-height')).toBe('');
    expect(h.getAttribute('data-size')).toBe('lg');
    expect(h.getAttribute('data-weight')).toBe('black');
    expect(h.getAttribute('data-tracking')).toBe('tighter');
    expect(h.getAttribute('data-leading')).toBe('display');
  });

  it('nbDisplay fluid reflects as a boolean data attribute', () => {
    // Arrange
    const el = mount(DisplayFluidTest);
    const h = el.querySelector<HTMLElement>('[nbDisplay]')!;

    // Assert
    expect(h.getAttribute('data-fluid')).toBe('');
    expect(h.getAttribute('data-size')).toBe('xl');
    expect(h.style.getPropertyValue('font-size')).toBe('');
  });

  it('nbDisplay maps underline capability values to data attribute and CSS vars', () => {
    // Arrange
    const el = mount(DisplayUnderlineTest);
    const h = el.querySelector<HTMLElement>('[nbDisplay]')!;

    // Assert
    expect(h.getAttribute('data-underline')).toBe('wave');
    expect(h.style.getPropertyValue('--nb-underline-gap')).toBe('0.5rem');
    expect(h.style.getPropertyValue('--nb-underline-width')).toBe('7rem');
  });

  it('nbDisplay reset=false leaves margin unset', () => {
    // Arrange
    const el = mount(DisplayNoResetTest);
    const h = el.querySelector<HTMLElement>('[nbDisplay]')!;

    // Assert
    expect(h.hasAttribute('data-nb-reset-margin')).toBe(false);
    expect(h.style.getPropertyValue('margin')).toBe('');
  });

  it('nbDisplay --nb-display-size CSS var override is respected', () => {
    // Arrange
    const el = mount(DisplayCssVarOverrideTest);
    const h = el.querySelector<HTMLElement>('[nbDisplay]')!;

    // Assert
    expect(h.style.getPropertyValue('--nb-display-size')).toBe('6rem');
  });

  it('nbDisplay underline CSS var overrides are respected when inputs are omitted', () => {
    // Arrange
    const el = mount(DisplayUnderlineCssVarOverrideTest);
    const h = el.querySelector<HTMLElement>('[nbDisplay]')!;

    // Assert
    expect(h.getAttribute('data-underline')).toBe('bar');
    expect(h.style.getPropertyValue('--nb-underline-width')).toBe('45%');
    expect(h.style.getPropertyValue('--nb-underline-gap')).toBe('0.125rem');
  });
});
