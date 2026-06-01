import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbButton } from '../../button';
import { NbBadge } from '../../badge';
import { NbCard } from '../../card';
import { NbChip } from '../../chip';
import { NbIconButton } from '../../icon-button';
import { NbImageCard } from '../../image-card';
import { NbMediaFrame } from '../../media-frame';
import { NbMediaItem } from '../../media-item';
import { NbStack } from '../../stack';
import { NbSurface } from '../../surface';

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
  it('nbSurface writes final radius property + tone variables from explicit inputs', () => {
    const el = mount(SurfaceExplicitTest);
    const surface = el.querySelector<HTMLElement>('[nbSurface]')!;

    expect(surface.style.getPropertyValue('border-radius')).toBe('1.5rem');
    expect(surface.style.getPropertyValue('--nb-surface-radius')).toBe('');
    expect(surface.style.getPropertyValue('--nb-surface-bg')).toBe(
      'var(--nb-mint)'
    );
    expect(surface.style.getPropertyValue('--nb-surface-fg')).toBe('#000000');
    expect(surface.style.getPropertyValue('--nb-surface-border-color')).toBe(
      'var(--nb-border)'
    );
  });

  it('nbSurface applies primitive defaults when inputs are omitted', () => {
    const el = mount(SurfaceDefaultsTest);
    const surface = el.querySelector<HTMLElement>('[nbSurface]')!;

    // default radius 'md' -> var(--nb-radius); default border 'default' -> var(--nb-border-width)
    expect(surface.className).toContain('nb-radius');
    expect(surface.className).toContain('nb-padding');
    expect(surface.style.getPropertyValue('--_nb-radius-default')).toBe(
      'var(--nb-radius)'
    );
    expect(surface.style.getPropertyValue('--nb-radius-token')).toBe(
      'var(--nb-surface-radius, var(--_nb-radius-default))'
    );
    expect(surface.style.getPropertyValue('--_nb-border-width-default')).toBe(
      'var(--nb-border-width)'
    );
    expect(surface.style.getPropertyValue('--_nb-padding-default')).toBe('0px');
    expect(surface.style.getPropertyValue('--nb-surface-padding')).toBe('');
    expect(surface.style.getPropertyValue('padding')).toBe('');
  });

  it('nbButton tone writes --nb-button-bg, not --nb-surface-bg', () => {
    const el = mount(ButtonToneTest);
    const button = el.querySelector<HTMLElement>('[nbButton]')!;

    expect(button.style.getPropertyValue('--nb-button-bg')).toBe(
      'var(--nb-lavender)'
    );
    expect(button.style.getPropertyValue('--nb-surface-bg')).toBe('');
  });

  it('nbMediaFrame shadow input writes final box-shadow', () => {
    const el = mount(MediaFrameTest);
    const frame = el.querySelector<HTMLElement>('[nbMediaFrame]')!;

    expect(frame.style.getPropertyValue('box-shadow')).toBe(
      '6px 6px 0 0 var(--nb-shadow)'
    );
    expect(frame.style.getPropertyValue('--nb-media-frame-shadow')).toBe('');
  });

  it('nbStack gap input writes final gap', () => {
    const el = mount(StackTest);
    const stack = el.querySelector<HTMLElement>('[nbStack]')!;

    expect(stack.style.getPropertyValue('gap')).toBe('1rem');
    expect(stack.style.getPropertyValue('--nb-stack-gap')).toBe('');
  });

  it('nbIconButton composes explicit visual inputs into final properties', () => {
    const el = mount(IconButtonCapabilitiesTest);
    const button = el.querySelector<HTMLElement>('[nbIconButton]')!;

    expect(button.style.getPropertyValue('--nb-icon-button-bg')).toBe(
      'var(--nb-mint)'
    );
    expect(button.style.getPropertyValue('border-radius')).toBe(
      'var(--nb-radius)'
    );
    expect(button.style.getPropertyValue('box-shadow')).toBe(
      '6px 6px 0 0 var(--nb-shadow)'
    );
    expect(button.style.getPropertyValue('border-width')).toBe('3px');
  });

  it('nbChip border input writes final border-width', () => {
    const el = mount(ChipBorderTest);
    const chip = el.querySelector<HTMLElement>('[nbChip]')!;

    expect(chip.style.getPropertyValue('border-width')).toBe('3px');
    expect(chip.style.getPropertyValue('--nb-chip-border-width')).toBe('');
  });

  it('nbButton border input writes final border-width', () => {
    const el = mount(ButtonBorderTest);
    const button = el.querySelector<HTMLElement>('[nbButton]')!;

    expect(button.style.getPropertyValue('border-width')).toBe('3px');
  });

  it('nbMediaItem tone resolves --nb-media-item-bg from the shared resolver', () => {
    const el = mount(MediaItemToneTest);
    const item = el.querySelector<HTMLElement>('nb-media-item')!;

    // Shared tone token, not a hardcoded hex literal.
    expect(item.style.getPropertyValue('--nb-media-item-bg')).toBe(
      'var(--nb-yellow)'
    );
    expect(item.style.getPropertyValue('--nb-media-item-fg')).toBe('#000000');
  });

  it('nbBadge composes tone and border capabilities', () => {
    const el = mount(BadgeCapabilitiesTest);
    const badge = el.querySelector<HTMLElement>('[nbBadge]')!;

    expect(badge.style.getPropertyValue('--nb-badge-bg')).toBe(
      'var(--nb-danger)'
    );
    expect(badge.style.getPropertyValue('border-width')).toBe('3px');
  });

  it('nbCard composes the visual shell capabilities', () => {
    const el = mount(CardCapabilitiesTest);
    const card = el.querySelector<HTMLElement>('nb-card')!;

    expect(card.style.getPropertyValue('--nb-card-bg')).toBe('var(--nb-mint)');
    expect(card.style.getPropertyValue('border-radius')).toBe('1.5rem');
    expect(card.style.getPropertyValue('box-shadow')).toBe(
      '10px 10px 0 0 var(--nb-shadow)'
    );
    expect(card.style.getPropertyValue('border-width')).toBe('4px');
  });

  it('nbImageCard composes tone and border capabilities', () => {
    const el = mount(ImageCardCapabilitiesTest);
    const card = el.querySelector<HTMLElement>('nb-image-card')!;

    expect(card.style.getPropertyValue('--nb-image-card-bg')).toBe(
      'var(--nb-pink)'
    );
    expect(card.style.getPropertyValue('border-width')).toBe('1px');
  });

  it('nbChip radius precedence exposes defaults and only explicit inputs write inline radius', () => {
    const el = mount(ChipRadiusPrecedenceTest);
    const chips = el.querySelectorAll<HTMLElement>('[nbChip]');

    expect(chips[0].className).toContain('nb-radius');
    expect(chips[0].style.getPropertyValue('--_nb-radius-default')).toBe('0px');
    expect(chips[0].style.getPropertyValue('--nb-radius-token')).toBe(
      'var(--nb-chip-radius, var(--_nb-radius-default))'
    );
    expect(chips[0].style.getPropertyValue('border-radius')).toBe('');
    expect(chips[0].style.getPropertyValue('--nb-chip-radius')).toBe('');

    expect(chips[1].className).toContain('rounded-full');
    expect(chips[1].style.getPropertyValue('border-radius')).toBe('');

    expect(chips[2].className).toContain('rounded-full');
    expect(chips[2].style.getPropertyValue('border-radius')).toBe('0.375rem');

    expect(chips[3].style.getPropertyValue('border-radius')).toBe('');
    expect(chips[4].style.getPropertyValue('border-radius')).toBe('1.5rem');
  });

  it('same-namespace surface inputs do not leak into nested primitives', () => {
    const el = mount(NestedSurfaceTest);
    const outer = el.querySelector<HTMLElement>('[nbSurface]')!;
    const inner = el.querySelector<HTMLElement>('#inner')!;

    expect(outer.style.getPropertyValue('border-radius')).toBe('1.5rem');
    expect(outer.style.getPropertyValue('--nb-surface-radius')).toBe('');
    expect(inner.style.getPropertyValue('border-radius')).toBe('');
    expect(inner.style.getPropertyValue('--_nb-radius-default')).toBe(
      'var(--nb-radius)'
    );
    expect(inner.style.getPropertyValue('--nb-surface-radius')).toBe('');
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

    expect(chips[2].style.getPropertyValue('--nb-shadow-token')).toBe(
      'var(--nb-chip-shadow, var(--_nb-shadow-default))'
    );
    expect(chips[2].style.getPropertyValue('box-shadow')).toBe('');
    expect(chips[3].style.getPropertyValue('box-shadow')).toBe(
      '10px 10px 0 0 var(--nb-shadow)'
    );
    expect(chips[3].style.getPropertyValue('border-width')).toBe('4px');

    expect(surfaces[0].className).toContain('p-0');
    expect(surfaces[0].style.getPropertyValue('padding')).toBe('');
    expect(surfaces[1].style.getPropertyValue('padding')).toBe('1.5rem');
    expect(surfaces[2].style.getPropertyValue('--nb-padding-token')).toBe(
      'var(--nb-surface-padding, var(--_nb-padding-default))'
    );
    expect(surfaces[2].style.getPropertyValue('padding')).toBe('');
    expect(surfaces[3].style.getPropertyValue('padding')).toBe('2rem');

    expect(stacks[0].className).toContain('gap-1');
    expect(stacks[0].style.getPropertyValue('gap')).toBe('');
    expect(stacks[1].style.getPropertyValue('gap')).toBe('1rem');
    expect(stacks[2].style.getPropertyValue('--nb-gap-token')).toBe(
      'var(--nb-stack-gap, var(--_nb-gap-default))'
    );
    expect(stacks[2].style.getPropertyValue('gap')).toBe('');
    expect(stacks[3].style.getPropertyValue('gap')).toBe('1.5rem');
  });
});
