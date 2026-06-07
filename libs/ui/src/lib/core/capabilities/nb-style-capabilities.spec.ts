import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
  template: `<nb-card tone="mint" radius="xl" shadow="heavy" border="thick"></nb-card>`,
})
class CardCapabilitiesTest {}

@Component({
  imports: [NbImageCard],
  template: `<nb-image-card image="x.jpg" alt="x" tone="pink" border="thin"></nb-image-card>`,
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
  it('nbSurface writes actual CSS properties from explicit inputs', () => {
    const el = mount(SurfaceExplicitTest);
    const surface = el.querySelector<HTMLElement>('[nbSurface]')!;

    // Explicit input wins outright — literal value, no public hook involved.
    expect(surface.style.getPropertyValue('border-radius')).toBe('1rem');
    expect(surface.style.getPropertyValue('--nb-surface-radius')).toBe('');
    expect(surface.style.getPropertyValue('background')).toBe('var(--nb-mint)');
    expect(surface.style.getPropertyValue('color')).toBeTruthy();
    expect(surface.style.getPropertyValue('border-color')).toBe('var(--nb-border)');
    expect(surface.style.getPropertyValue('--nb-surface-bg')).toBe('');
    expect(surface.style.cssText).not.toContain('--nb-resolved');
  });

  it('nbSurface applies primitive defaults when inputs are omitted', () => {
    const el = mount(SurfaceDefaultsTest);
    const surface = el.querySelector<HTMLElement>('[nbSurface]')!;

    expect(surface.className).not.toMatch(/(?:^|\s)nb-radius(?:\s|$)/);
    expect(surface.className).not.toMatch(/(?:^|\s)nb-padding(?:\s|$)/);
    expect(surface.style.getPropertyValue('border-radius')).toBe('');
    expect(surface.style.getPropertyValue('border-width')).toBe('');
    expect(surface.style.getPropertyValue('--nb-surface-padding')).toBe('');
    expect(surface.style.getPropertyValue('padding')).toBe('');
    expect(surface.style.cssText).not.toContain('--nb-resolved');
  });

  it('nbButton tone writes actual color properties, not public variables', () => {
    const el = mount(ButtonToneTest);
    const button = el.querySelector<HTMLElement>('[nbButton]')!;

    expect(button.style.getPropertyValue('background')).toBe('var(--nb-lavender)');
    expect(button.style.getPropertyValue('--nb-button-bg')).toBe('');
    expect(button.style.getPropertyValue('--nb-surface-bg')).toBe('');
    expect(button.style.cssText).not.toContain('--nb-resolved');
  });

  it('nbMediaFrame shadow input writes box-shadow', () => {
    const el = mount(MediaFrameTest);
    const frame = el.querySelector<HTMLElement>('[nbMediaFrame]')!;

    expect(frame.style.getPropertyValue('box-shadow')).toBe(
      '6px 6px 0 0 var(--nb-shadow)'
    );
    expect(frame.style.getPropertyValue('--nb-media-frame-shadow')).toBe('');
    expect(frame.style.cssText).not.toContain('--nb-resolved');
  });

  it('nbStack gap input writes gap', () => {
    const el = mount(StackTest);
    const stack = el.querySelector<HTMLElement>('[nbStack]')!;

    expect(stack.style.getPropertyValue('gap')).toBe('1rem');
    expect(stack.style.getPropertyValue('--nb-stack-gap')).toBe('');
    expect(stack.style.cssText).not.toContain('--nb-resolved');
  });

  it('nbIconButton composes explicit visual inputs into actual properties', () => {
    const el = mount(IconButtonCapabilitiesTest);
    const button = el.querySelector<HTMLElement>('[nbIconButton]')!;

    expect(button.style.getPropertyValue('background')).toBe('var(--nb-mint)');
    expect(button.style.getPropertyValue('border-radius')).toBe('0.5rem');
    expect(button.style.getPropertyValue('box-shadow')).toBe(
      '6px 6px 0 0 var(--nb-shadow)'
    );
    expect(button.style.getPropertyValue('border-width')).toBe('3px');
    expect(button.style.cssText).not.toContain('--nb-resolved');
  });

  it('nbChip border input writes border-width', () => {
    const el = mount(ChipBorderTest);
    const chip = el.querySelector<HTMLElement>('[nbChip]')!;

    expect(chip.style.getPropertyValue('border-width')).toBe('3px');
    expect(chip.style.getPropertyValue('--nb-chip-border-width')).toBe('');
    expect(chip.style.cssText).not.toContain('--nb-resolved');
  });

  it('nbButton border input writes border-width', () => {
    const el = mount(ButtonBorderTest);
    const button = el.querySelector<HTMLElement>('[nbButton]')!;

    expect(button.style.getPropertyValue('border-width')).toBe('3px');
  });

  it('nbMediaItem tone writes applicable actual color properties', () => {
    const el = mount(MediaItemToneTest);
    const item = el.querySelector<HTMLElement>('nb-media-item')!;

    expect(item.style.getPropertyValue('background')).toBe('');
    expect(item.style.getPropertyValue('color')).toBeTruthy();
    expect(item.style.getPropertyValue('--nb-media-item-bg')).toBe('');
    expect(item.style.cssText).not.toContain('--nb-resolved');
  });

  it('nbBadge composes tone and border capabilities', () => {
    const el = mount(BadgeCapabilitiesTest);
    const badge = el.querySelector<HTMLElement>('[nbBadge]')!;

    expect(badge.style.getPropertyValue('background')).toBe('var(--nb-danger)');
    expect(badge.style.getPropertyValue('border-width')).toBe('3px');
    expect(badge.style.cssText).not.toContain('--nb-resolved');
  });

  it('nbCard composes the visual shell capabilities', () => {
    const el = mount(CardCapabilitiesTest);
    const card = el.querySelector<HTMLElement>('nb-card')!;

    expect(card.style.getPropertyValue('background')).toBe('var(--nb-mint)');
    expect(card.style.getPropertyValue('border-radius')).toBe('1rem');
    expect(card.style.getPropertyValue('box-shadow')).toBe(
      '10px 10px 0 0 var(--nb-shadow)'
    );
    expect(card.style.getPropertyValue('border-width')).toBe('4px');
    expect(card.style.cssText).not.toContain('--nb-resolved');
  });

  it('nbImageCard composes tone and border capabilities', () => {
    const el = mount(ImageCardCapabilitiesTest);
    const card = el.querySelector<HTMLElement>('nb-image-card')!;

    expect(card.style.getPropertyValue('background')).toBe('var(--nb-pink)');
    expect(card.style.getPropertyValue('border-width')).toBe('1px');
    expect(card.style.cssText).not.toContain('--nb-resolved');
  });

  it('nbChip radius input wins outright over public hooks and scoped tokens', () => {
    const el = mount(ChipRadiusPrecedenceTest);
    const chips = el.querySelectorAll<HTMLElement>('[nbChip]');

    expect(chips[0].className).not.toMatch(/(?:^|\s)nb-radius(?:\s|$)/);
    expect(chips[0].style.getPropertyValue('border-radius')).toBe('');
    expect(chips[0].style.getPropertyValue('--nb-chip-radius')).toBe('');

    expect(chips[1].className).toContain('rounded-full');
    expect(chips[1].style.getPropertyValue('border-radius')).toBe('');

    expect(chips[2].className).toContain('rounded-full');
    expect(chips[2].style.getPropertyValue('border-radius')).toBe('0.25rem');

    expect(chips[3].style.getPropertyValue('border-radius')).toBe('');
    expect(chips[4].style.getPropertyValue('border-radius')).toBe('1rem');
  });

  it('nbChip tone input wins outright over public hooks and scoped tokens', () => {
    const el = mount(ChipTonePrecedenceTest);
    const chips = el.querySelectorAll<HTMLElement>('[nbChip]');

    expect(chips[0].className).not.toMatch(/(?:^|\s)nb-tone(?:\s|$)/);
    expect(chips[0].style.getPropertyValue('background-color')).toBe('');
    expect(chips[0].style.getPropertyValue('--nb-chip-bg')).toBe('');

    expect(chips[1].className).toContain('bg-green-200');
    expect(chips[1].className).toContain('text-black');
    expect(chips[1].style.getPropertyValue('background-color')).toBe('');

    expect(chips[2].style.getPropertyValue('background')).toBe('var(--nb-pink)');
    expect(chips[2].style.getPropertyValue('color')).toBeTruthy();

    expect(chips[3].style.getPropertyValue('background')).toBe('');
    expect(chips[4].style.getPropertyValue('background')).toBe('var(--nb-pink)');
  });

  it('same-namespace surface inputs do not leak into nested primitives', () => {
    const el = mount(NestedSurfaceTest);
    const outer = el.querySelector<HTMLElement>('[nbSurface]')!;
    const inner = el.querySelector<HTMLElement>('#inner')!;

    expect(outer.style.getPropertyValue('border-radius')).toBe('1rem');
    expect(outer.style.getPropertyValue('--nb-surface-radius')).toBe('');
    expect(inner.style.getPropertyValue('border-radius')).toBe('');
    expect(inner.style.getPropertyValue('--nb-surface-radius')).toBe('');
    expect(inner.style.cssText).not.toContain('--nb-resolved');
  });

  it('shadow, padding, gap, and border follow the same precedence model', () => {
    const el = mount(CapabilityPrecedenceTest);
    const chips = el.querySelectorAll<HTMLElement>('[nbChip]');
    const surfaces = el.querySelectorAll<HTMLElement>('[nbSurface]');
    const stacks = el.querySelectorAll<HTMLElement>('[nbStack]');

    expect(chips[0].className).toContain('shadow-none');
    expect(chips[0].className).toContain('border-0');
    expect(chips[0].style.getPropertyValue('box-shadow')).toBe('');
    expect(chips[0].style.getPropertyValue('border-width')).toBe('');

    expect(chips[1].style.getPropertyValue('box-shadow')).toBe(
      '6px 6px 0 0 var(--nb-shadow)'
    );
    expect(chips[1].style.getPropertyValue('border-width')).toBe('3px');

    expect(chips[2].style.getPropertyValue('box-shadow')).toBe('');
    expect(chips[3].style.getPropertyValue('box-shadow')).toBe(
      '10px 10px 0 0 var(--nb-shadow)'
    );
    expect(chips[3].style.getPropertyValue('border-width')).toBe('4px');

    expect(surfaces[0].className).toContain('p-0');
    expect(surfaces[0].style.getPropertyValue('padding')).toBe('');
    expect(surfaces[1].style.getPropertyValue('padding')).toBe('1.5rem');
    expect(surfaces[2].style.getPropertyValue('padding')).toBe('');
    expect(surfaces[3].style.getPropertyValue('padding')).toBe('2rem');

    expect(stacks[0].className).toContain('gap-1');
    expect(stacks[0].style.getPropertyValue('gap')).toBe('');
    expect(stacks[1].style.getPropertyValue('gap')).toBe('1rem');
    expect(stacks[2].style.getPropertyValue('gap')).toBe('');
    expect(stacks[3].style.getPropertyValue('gap')).toBe('1.5rem');
  });

  it('nbCluster separator derives spacing from actual gap and neutralizes column gap', () => {
    const el = mount(ClusterSeparatorGapTest);
    const cluster = el.querySelector<HTMLElement>('[nbCluster]')!;

    expect(cluster.style.getPropertyValue('gap')).toBe('2rem');
    expect(cluster.style.getPropertyValue('column-gap')).toBe('0px');
    expect(cluster.style.getPropertyValue('--nb-cluster-separator-gap')).toBe(
      'calc(2rem * 0.5)'
    );
    expect(cluster.style.cssText).not.toContain('--nb-resolved');
  });

  it('nbButton radius md is concrete and non-zero even when defaults are sharp', () => {
    const el = mount(ButtonRadiusTest);
    const button = el.querySelector<HTMLElement>('[nbButton]')!;

    expect(button.style.getPropertyValue('border-radius')).toBe('0.5rem');
  });
});

// ─── NbText capability composition ───────────────────────────────────────────

@Component({
  imports: [NbText],
  template: `<p nbText>Default</p>`,
})
class TextDefaultsTest {}

@Component({
  imports: [NbText],
  template: `<p nbText size="xl" weight="bold" tone="muted" tracking="wide" leading="relaxed" measure="md">Styled</p>`,
})
class TextExplicitTest {}

@Component({
  imports: [NbText],
  template: `<p nbText underline="bar" underlineGap="md" underlineWidth="lg">Underlined</p>`,
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
    const el = mount(TextDefaultsTest);
    const p = el.querySelector<HTMLElement>('[nbText]')!;

    expect(p.getAttribute('data-nb-text')).toBe('');
    expect(p.getAttribute('data-nb-reset-margin')).toBe('');
    expect(p.style.getPropertyValue('margin')).toBe('');
  });

  it('nbText explicit inputs produce correct inline styles', () => {
    const el = mount(TextExplicitTest);
    const p = el.querySelector<HTMLElement>('[nbText]')!;

    expect(p.style.getPropertyValue('font-size')).toBe('1.25rem');
    expect(p.style.getPropertyValue('font-weight')).toBe('700');
    expect(p.style.getPropertyValue('letter-spacing')).toBe('0.025em');
    expect(p.style.getPropertyValue('line-height')).toBe('1.65');
    expect(p.style.getPropertyValue('max-width')).toBe('36rem');
    // muted tone
    expect(p.style.getPropertyValue('color')).toContain('var(--nb-foreground)');
  });

  it('nbText underline capability writes data attribute and CSS vars', () => {
    const el = mount(TextUnderlineTest);
    const p = el.querySelector<HTMLElement>('[nbText]')!;

    expect(p.getAttribute('data-underline')).toBe('bar');
    expect(p.style.getPropertyValue('--nb-underline-gap')).toBe('0.75rem');
    expect(p.style.getPropertyValue('--nb-underline-width')).toBe('12rem');
  });

  it('nbText reset=false leaves margin unset', () => {
    const el = mount(TextNoResetTest);
    const p = el.querySelector<HTMLElement>('[nbText]')!;

    expect(p.hasAttribute('data-nb-reset-margin')).toBe(false);
    expect(p.style.getPropertyValue('margin')).toBe('');
  });

  it('nbText reset default (true) enables stylesheet margin reset', () => {
    const el = mount(TextResetDefaultTest);
    const p = el.querySelector<HTMLElement>('[nbText]')!;

    expect(p.getAttribute('data-nb-reset-margin')).toBe('');
    expect(p.style.getPropertyValue('margin')).toBe('');
  });
});

// ─── NbDisplay capability composition ────────────────────────────────────────

@Component({
  imports: [NbDisplay],
  template: `<h1 nbDisplay>Default</h1>`,
})
class DisplayDefaultsTest {}

@Component({
  imports: [NbDisplay],
  template: `<h1 nbDisplay size="lg" weight="black" tracking="tighter" leading="display">Styled</h1>`,
})
class DisplayExplicitTest {}

@Component({
  imports: [NbDisplay],
  template: `<h1 nbDisplay fluid size="xl">Fluid</h1>`,
})
class DisplayFluidTest {}

@Component({
  imports: [NbDisplay],
  template: `<h1 nbDisplay underline="wave" underlineGap="sm" underlineWidth="md">Underlined</h1>`,
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
  template: `<h1 nbDisplay underline="bar" style="--nb-underline-width: 45%; --nb-underline-gap: 0.125rem">Override</h1>`,
})
class DisplayUnderlineCssVarOverrideTest {}

describe('NbDisplay capability composition', () => {
  it('nbDisplay default: marks for stylesheet margin reset and sets data-nb-display attribute', () => {
    const el = mount(DisplayDefaultsTest);
    const h = el.querySelector<HTMLElement>('[nbDisplay]')!;

    expect(h.getAttribute('data-nb-display')).toBe('');
    expect(h.getAttribute('data-nb-reset-margin')).toBe('');
    expect(h.style.getPropertyValue('margin')).toBe('');
  });

  it('nbDisplay explicit size/weight/tracking/leading produce correct styles', () => {
    const el = mount(DisplayExplicitTest);
    const h = el.querySelector<HTMLElement>('[nbDisplay]')!;

    expect(h.style.getPropertyValue('font-size')).toBe('var(--nb-display-size, 3.75rem)');
    expect(h.style.getPropertyValue('font-weight')).toBe('900');
    expect(h.style.getPropertyValue('letter-spacing')).toBe('-0.08em');
    expect(h.style.getPropertyValue('line-height')).toBe('0.84');
  });

  it('nbDisplay fluid wraps size in a clamp', () => {
    const el = mount(DisplayFluidTest);
    const h = el.querySelector<HTMLElement>('[nbDisplay]')!;

    expect(h.style.getPropertyValue('font-size')).toBe(
      'var(--nb-display-size, clamp(3.25rem, 2rem + 6.25vw, 4.75rem))',
    );
  });

  it('nbDisplay underline capability writes data attribute and CSS vars', () => {
    const el = mount(DisplayUnderlineTest);
    const h = el.querySelector<HTMLElement>('[nbDisplay]')!;

    expect(h.getAttribute('data-underline')).toBe('wave');
    expect(h.style.getPropertyValue('--nb-underline-gap')).toBe('0.5rem');
    expect(h.style.getPropertyValue('--nb-underline-width')).toBe('7rem');
  });

  it('nbDisplay reset=false leaves margin unset', () => {
    const el = mount(DisplayNoResetTest);
    const h = el.querySelector<HTMLElement>('[nbDisplay]')!;

    expect(h.hasAttribute('data-nb-reset-margin')).toBe(false);
    expect(h.style.getPropertyValue('margin')).toBe('');
  });

  it('nbDisplay --nb-display-size CSS var override is respected', () => {
    const el = mount(DisplayCssVarOverrideTest);
    const h = el.querySelector<HTMLElement>('[nbDisplay]')!;

    // The inline font-size binding wraps the base value; Angular does not
    // override an explicit inline custom-property set by the user.
    expect(h.style.getPropertyValue('--nb-display-size')).toBe('6rem');
  });

  it('nbDisplay underline CSS var overrides are respected when inputs are omitted', () => {
    const el = mount(DisplayUnderlineCssVarOverrideTest);
    const h = el.querySelector<HTMLElement>('[nbDisplay]')!;

    expect(h.getAttribute('data-underline')).toBe('bar');
    expect(h.style.getPropertyValue('--nb-underline-width')).toBe('45%');
    expect(h.style.getPropertyValue('--nb-underline-gap')).toBe('0.125rem');
  });
});
