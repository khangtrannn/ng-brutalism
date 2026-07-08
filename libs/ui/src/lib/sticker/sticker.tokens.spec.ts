import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbSticker, NbStickerFace } from './index';
import type { NbStickerShape, NbStickerTone } from './index';

@Component({
  imports: [NbSticker, NbStickerFace],
  template: `
    <nb-sticker
      [shape]="shape"
      [tone]="tone"
      [rotate]="rotate"
      [size]="size"
      [decorative]="decorative"
    >
      @if (withFace) {
      <nb-sticker-face />
      } @else { HOT }
    </nb-sticker>
  `,
})
class StickerTokenTest {
  shape: NbStickerShape = 'burst';
  tone: NbStickerTone | undefined = undefined;
  rotate: number | undefined = undefined;
  size: number | undefined = undefined;
  decorative = false;
  withFace = false;
}

describe('NbSticker token surface', () => {
  it('renders the default sandbox sticker shape and leaves fill to CSS token fallbacks', async () => {
    // Arrange
    const fixture = await createFixture();
    const sticker = findSticker(fixture);
    const shape = findShape(fixture);

    // Assert
    expect(sticker.getAttribute('data-shape')).toBe('burst');
    expect(sticker.getAttribute('role')).toBe('img');
    expect(sticker.getAttribute('data-nb-tone')).toBeNull();
    expect(sticker.style.getPropertyValue('--nb-sticker-fill')).toBe('');
    expect(sticker.style.getPropertyValue('--nb-sticker-ink')).toBe('');
    expect(shape.getAttribute('d')).toContain('M80 12');
  });

  it('reflects tone semantically without writing final fill/ink inline', async () => {
    // Arrange
    const fixture = await createFixture({
      shape: 'star',
      tone: 'pink',
      withFace: true,
    });
    const sticker = findSticker(fixture);
    const svg = sticker.querySelector('svg') as SVGElement;

    // Assert
    expect(sticker.getAttribute('data-shape')).toBe('star');
    expect(sticker.getAttribute('data-nb-tone')).toBe('pink');
    expect(sticker.style.getPropertyValue('--nb-sticker-fill')).toBe('');
    expect(svg.getAttribute('viewBox')).toBe('65 105 858 780');
    expect(sticker.querySelector('nb-sticker-face')).not.toBeNull();
  });

  it('keeps decorative shapes and extended tones valid', async () => {
    // Arrange
    const fixture = await createFixture({
      shape: 'splat',
      tone: 'warning',
      rotate: 12,
    });
    const sticker = findSticker(fixture);

    // Assert
    expect(sticker.getAttribute('data-shape')).toBe('splat');
    expect(sticker.getAttribute('data-nb-tone')).toBe('warning');
    expect(sticker.style.getPropertyValue('--nb-sticker-rotate')).toBe('12deg');
  });

  it('does not write --nb-sticker-rotate or --nb-sticker-scale when unset', async () => {
    // Arrange
    const fixture = await createFixture();
    const sticker = findSticker(fixture);

    // Assert
    expect(sticker.style.getPropertyValue('--nb-sticker-rotate')).toBe('');
    expect(sticker.style.getPropertyValue('--nb-sticker-scale')).toBe('');
  });

  it('writes --nb-sticker-scale when size is explicit', async () => {
    // Arrange
    const fixture = await createFixture({ size: 1.5 });
    const sticker = findSticker(fixture);

    // Assert
    expect(sticker.style.getPropertyValue('--nb-sticker-scale')).toBe('1.5');
  });

  it('can be marked decorative', async () => {
    // Arrange
    const fixture = await createFixture({ decorative: true });
    const sticker = findSticker(fixture);

    // Assert
    expect(sticker.getAttribute('aria-hidden')).toBe('true');
    expect(sticker.hasAttribute('role')).toBe(false);
  });
});

async function createFixture(
  inputs: Partial<StickerTokenTest> = {}
): Promise<ComponentFixture<StickerTokenTest>> {
  await TestBed.configureTestingModule({
    imports: [StickerTokenTest],
  }).compileComponents();

  const fixture = TestBed.createComponent(StickerTokenTest);
  Object.assign(fixture.componentInstance, inputs);
  fixture.detectChanges();

  return fixture;
}

function findSticker(fixture: ComponentFixture<StickerTokenTest>): HTMLElement {
  return fixture.nativeElement.querySelector('nb-sticker') as HTMLElement;
}

function findShape(
  fixture: ComponentFixture<StickerTokenTest>
): SVGPathElement {
  return fixture.nativeElement.querySelector(
    '[data-slot="sticker-shape"]'
  ) as SVGPathElement;
}
