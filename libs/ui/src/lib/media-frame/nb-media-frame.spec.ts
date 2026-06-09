import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbMediaFrame, type NbMediaFrameTone } from './nb-media-frame';

@Component({
  imports: [NbMediaFrame],
  template: `
    <div nbMediaFrame>
      <img src="/assets/images/default-og.png" alt="Preview" />
    </div>
  `,
})
class DefaultMediaFrameTest {}

@Component({
  imports: [NbMediaFrame],
  template: `
    <div
      nbMediaFrame
      tone="lavender"
      ratio="21/9"
      fit="contain"
      radius="xl"
      shadow="hard"
      border="strong"
    >
      <video src="/demo.mp4"></video>
    </div>
  `,
})
class ValueMediaFrameTest {}

@Component({
  imports: [NbMediaFrame],
  template: `<div nbMediaFrame [tone]="tone">Media-like block</div>`,
})
class ToneMediaFrameTest {
  tone: NbMediaFrameTone = 'surface';
}

describe('NbMediaFrame', () => {
  it('applies default media frame classes and metadata', async () => {
    const fixture = await createFixture(DefaultMediaFrameTest);
    const frame = fixture.nativeElement.querySelector(
      '[nbMediaFrame]'
    ) as HTMLElement;

    expect(frame.getAttribute('data-nb-media-frame')).toBe('');
    // No style inputs set — capability attrs stay absent; CSS fallback owns the
    // visual defaults. Attribute presence means "consumer chose this".
    expect(frame.getAttribute('data-tone')).toBeNull();
    expect(frame.getAttribute('data-ratio')).toBe('auto');
    expect(frame.getAttribute('data-fit')).toBe('cover');
    expect(frame.getAttribute('data-radius')).toBeNull();
    expect(frame.getAttribute('data-shadow')).toBeNull();
    expect(frame.getAttribute('data-border')).toBeNull();
    expect(frame.className).toBe('');
    expect(frame.className).not.toMatch(/(?:^|\s)nb-border-width(?:\s|$)/);
    expect(frame.className).not.toMatch(/(?:^|\s)nb-tone(?:\s|$)/);
    expect(frame.className).not.toContain('bg-(--nb-media-frame-bg)');
    expect(frame.className).not.toContain('text-(--nb-media-frame-fg)');
    expect(frame.className).not.toMatch(/(?:^|\s)nb-radius(?:\s|$)/);
    expect(frame.className).not.toMatch(/(?:^|\s)nb-shadow(?:\s|$)/);
    expect(frame.getAttribute('data-fit')).toBe('cover');
    expect(frame.style.getPropertyValue('background')).toBe('');
    expect(frame.style.getPropertyValue('border-radius')).toBe('');
    expect(frame.style.getPropertyValue('box-shadow')).toBe('');
    expect(frame.style.cssText).not.toContain('--nb-resolved');
  });

  it('maps tone, ratio, fit, radius, and shadow attributes', async () => {
    const fixture = await createFixture(ValueMediaFrameTest);
    const frame = fixture.nativeElement.querySelector(
      '[nbMediaFrame]'
    ) as HTMLElement;

    expect(frame.getAttribute('data-ratio')).toBe('21/9');
    expect(frame.getAttribute('data-fit')).toBe('contain');
    // Explicit inputs win outright — literal values, no public hook.
    expect(frame.style.getPropertyValue('background')).toBe('var(--nb-lavender)');
    expect(frame.className).toBe('');
    expect(frame.style.getPropertyValue('border-radius')).toBe('1rem');
    expect(frame.style.getPropertyValue('box-shadow')).toBe(
      '6px 6px 0 0 var(--nb-shadow)'
    );
    expect(frame.style.getPropertyValue('border-width')).toBe('3px');
    expect(frame.style.cssText).not.toContain('--nb-resolved');
  });

  it('supports portrait media ratios', async () => {
    @Component({
      imports: [NbMediaFrame],
      template: `<div nbMediaFrame ratio="3/4"></div>`,
    })
    class PortraitMediaFrameTest {}

    const fixture = await createFixture(PortraitMediaFrameTest);
    const frame = fixture.nativeElement.querySelector(
      '[nbMediaFrame]'
    ) as HTMLElement;

    expect(frame.getAttribute('data-ratio')).toBe('3/4');
    expect(frame.className).toBe('');
  });

  it.each([
    ['surface', 'var(--nb-surface)'],
    ['pink', 'var(--nb-pink)'],
    ['mint', 'var(--nb-mint)'],
    ['blue', 'var(--nb-blue)'],
    ['black', '#000000'],
  ] satisfies readonly [NbMediaFrameTone, string][])(
    'keeps the %s tone available for framed visual content',
    async (tone, color) => {
      const fixture = await createFixture(ToneMediaFrameTest, (instance) => {
        instance.tone = tone;
      });

      const frame = fixture.nativeElement.querySelector(
        '[nbMediaFrame]'
      ) as HTMLElement;

      if (color.startsWith('var(')) {
        expect(frame.style.getPropertyValue('background')).toBe(color);
      } else {
        expect(frame.style.getPropertyValue('background')).toBeTruthy();
      }
      expect(frame.style.getPropertyValue('--nb-media-frame-bg')).toBe('');
      expect(frame.style.cssText).not.toContain('--nb-resolved');
    }
  );
});

async function createFixture<T>(
  component: new () => T,
  setup?: (instance: T) => void
): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [component],
  }).compileComponents();

  const fixture = TestBed.createComponent(component);
  setup?.(fixture.componentInstance);
  fixture.detectChanges();

  return fixture;
}
