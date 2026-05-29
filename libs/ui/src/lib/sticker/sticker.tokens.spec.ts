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
  tone: NbStickerTone = 'mint';
  rotate: number | undefined = undefined;
  decorative = false;
  withFace = false;
}

describe('NbSticker token surface', () => {
  it('renders the default sandbox sticker shape and tone', async () => {
    const fixture = await createFixture();
    const sticker = findSticker(fixture);
    const shape = findShape(fixture);

    expect(sticker.getAttribute('data-shape')).toBe('burst');
    expect(sticker.getAttribute('data-tone')).toBe('mint');
    expect(sticker.getAttribute('role')).toBe('img');
    expect(sticker.style.getPropertyValue('--nb-sticker-fill')).toBe(
      'var(--nb-mint, #9af7b5)'
    );
    expect(shape.getAttribute('d')).toContain('M80 12');
  });

  it('supports the richer shape set and sticker face primitive', async () => {
    const fixture = await createFixture({
      shape: 'star',
      tone: 'pink',
      withFace: true,
    });
    const sticker = findSticker(fixture);
    const svg = sticker.querySelector('svg') as SVGElement;

    expect(sticker.getAttribute('data-shape')).toBe('star');
    expect(sticker.style.getPropertyValue('--nb-sticker-fill')).toBe(
      'var(--nb-pink, #ff6fc7)'
    );
    expect(svg.getAttribute('viewBox')).toBe('0 0 1024 1024');
    expect(sticker.querySelector('nb-sticker-face')).not.toBeNull();
  });

  it('keeps decorative shapes and extended tones valid', async () => {
    const fixture = await createFixture({
      shape: 'splat',
      tone: 'warning',
      rotate: 12,
    });
    const sticker = findSticker(fixture);

    expect(sticker.getAttribute('data-shape')).toBe('splat');
    expect(sticker.getAttribute('data-tone')).toBe('warning');
    expect(sticker.style.getPropertyValue('--nb-sticker-fill')).toBe(
      'var(--nb-warning)'
    );
    expect(sticker.style.getPropertyValue('--nb-sticker-rotate')).toBe('12deg');
  });

  it('can be marked decorative', async () => {
    const fixture = await createFixture({ decorative: true });
    const sticker = findSticker(fixture);

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
    '.nb-sticker__shape'
  ) as SVGPathElement;
}
