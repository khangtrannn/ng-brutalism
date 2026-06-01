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

describe('style capabilities', () => {
  it('nbSurface writes namespaced radius + tone variables from explicit inputs', () => {
    const el = mount(SurfaceExplicitTest);
    const surface = el.querySelector<HTMLElement>('[nbSurface]')!;

    expect(surface.style.getPropertyValue('--nb-surface-radius')).toBe('1.5rem');
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
    expect(surface.style.getPropertyValue('--nb-surface-radius-default')).toBe(
      'var(--nb-radius)'
    );
    expect(
      surface.style.getPropertyValue('--nb-surface-border-width-default')
    ).toBe('var(--nb-border-width)');
    expect(surface.style.getPropertyValue('--nb-surface-padding')).toBe('0px');
  });

  it('nbButton tone writes --nb-button-bg, not --nb-surface-bg', () => {
    const el = mount(ButtonToneTest);
    const button = el.querySelector<HTMLElement>('[nbButton]')!;

    expect(button.style.getPropertyValue('--nb-button-bg')).toBe(
      'var(--nb-lavender)'
    );
    expect(button.style.getPropertyValue('--nb-surface-bg')).toBe('');
  });

  it('nbMediaFrame shadow writes namespaced --nb-media-frame-shadow', () => {
    const el = mount(MediaFrameTest);
    const frame = el.querySelector<HTMLElement>('[nbMediaFrame]')!;

    expect(frame.style.getPropertyValue('--nb-media-frame-shadow')).toBe(
      '6px 6px 0 0 var(--nb-shadow)'
    );
  });

  it('nbStack gap writes --nb-stack-gap', () => {
    const el = mount(StackTest);
    const stack = el.querySelector<HTMLElement>('[nbStack]')!;

    expect(stack.style.getPropertyValue('--nb-stack-gap')).toBe('1rem');
  });

  it('nbIconButton composes tone/radius/shadow/border into namespaced vars', () => {
    const el = mount(IconButtonCapabilitiesTest);
    const button = el.querySelector<HTMLElement>('[nbIconButton]')!;

    expect(button.style.getPropertyValue('--nb-icon-button-bg')).toBe(
      'var(--nb-mint)'
    );
    expect(button.style.getPropertyValue('--nb-icon-button-radius')).toBe(
      'var(--nb-radius)'
    );
    expect(button.style.getPropertyValue('--nb-icon-button-shadow')).toBe(
      '6px 6px 0 0 var(--nb-shadow)'
    );
    expect(
      button.style.getPropertyValue('--nb-icon-button-border-width')
    ).toBe('3px');
  });

  it('nbChip border writes --nb-chip-border-width', () => {
    const el = mount(ChipBorderTest);
    const chip = el.querySelector<HTMLElement>('[nbChip]')!;

    expect(chip.style.getPropertyValue('--nb-chip-border-width')).toBe('3px');
  });

  it('nbButton border writes --nb-button-border-width', () => {
    const el = mount(ButtonBorderTest);
    const button = el.querySelector<HTMLElement>('[nbButton]')!;

    expect(button.style.getPropertyValue('--nb-button-border-width')).toBe(
      '3px'
    );
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
    expect(badge.style.getPropertyValue('--nb-badge-border-width')).toBe('3px');
  });

  it('nbCard composes the visual shell capabilities', () => {
    const el = mount(CardCapabilitiesTest);
    const card = el.querySelector<HTMLElement>('nb-card')!;

    expect(card.style.getPropertyValue('--nb-card-bg')).toBe('var(--nb-mint)');
    expect(card.style.getPropertyValue('--nb-card-radius')).toBe('1.5rem');
    expect(card.style.getPropertyValue('--nb-card-shadow')).toBe(
      '10px 10px 0 0 var(--nb-shadow)'
    );
    expect(card.style.getPropertyValue('--nb-card-border-width')).toBe('4px');
  });

  it('nbImageCard composes tone and border capabilities', () => {
    const el = mount(ImageCardCapabilitiesTest);
    const card = el.querySelector<HTMLElement>('nb-image-card')!;

    expect(card.style.getPropertyValue('--nb-image-card-bg')).toBe(
      'var(--nb-pink)'
    );
    expect(card.style.getPropertyValue('--nb-image-card-border-width')).toBe(
      '1px'
    );
  });
});
