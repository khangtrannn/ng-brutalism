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
  tone: NbMediaFrameTone = 'default';
}

describe('NbMediaFrame', () => {
  it('applies default media frame classes and metadata', async () => {
    const fixture = await createFixture(DefaultMediaFrameTest);
    const frame = fixture.nativeElement.querySelector(
      '[nbMediaFrame]'
    ) as HTMLElement;

    expect(frame.getAttribute('data-nb-media-frame')).toBe('');
    expect(frame.getAttribute('data-tone')).toBe('default');
    expect(frame.getAttribute('data-ratio')).toBe('auto');
    expect(frame.getAttribute('data-fit')).toBe('cover');
    expect(frame.getAttribute('data-radius')).toBe('lg');
    expect(frame.getAttribute('data-shadow')).toBe('none');
    expect(frame.className).toContain('relative');
    expect(frame.className).toContain('isolate');
    expect(frame.className).toContain('overflow-hidden');
    expect(frame.className).toContain(
      'border-(length:--nb-media-frame-border-width)'
    );
    expect(frame.className).toContain('bg-(--nb-media-frame-bg)');
    expect(frame.className).toContain('text-(--nb-media-frame-fg)');
    expect(frame.className).toContain('rounded-(--nb-media-frame-radius)');
    expect(frame.className).toContain(
      'shadow-[var(--nb-media-frame-shadow)]'
    );
    expect(frame.className).toContain('[&>img]:h-full');
    expect(frame.className).toContain('[&>img]:object-cover');
    expect(frame.className).toContain(
      '[--nb-media-frame-bg:var(--nb-surface)]'
    );
    expect(frame.className).toContain('[--nb-media-frame-radius:1rem]');
    expect(frame.className).toContain('[--nb-media-frame-shadow:none]');
  });

  it('maps tone, ratio, fit, radius, and shadow attributes', async () => {
    const fixture = await createFixture(ValueMediaFrameTest);
    const frame = fixture.nativeElement.querySelector(
      '[nbMediaFrame]'
    ) as HTMLElement;

    expect(frame.getAttribute('data-tone')).toBe('lavender');
    expect(frame.getAttribute('data-ratio')).toBe('21/9');
    expect(frame.getAttribute('data-fit')).toBe('contain');
    expect(frame.getAttribute('data-radius')).toBe('xl');
    expect(frame.getAttribute('data-shadow')).toBe('hard');
    expect(frame.className).toContain('[--nb-media-frame-bg:#b8a4ff]');
    expect(frame.className).toContain('aspect-[21/9]');
    expect(frame.className).toContain('[&>video]:object-contain');
    expect(frame.className).toContain('[--nb-media-frame-radius:1.5rem]');
    expect(frame.className).toContain(
      '[--nb-media-frame-shadow:6px_6px_0_0_var(--nb-shadow)]'
    );
    expect(frame.className).toContain('[--nb-media-frame-border-width:3px]');
  });

  it.each([
    ['pink', '#ff7eb6'],
    ['mint', '#9bf2cf'],
    ['blue', '#8ae9ff'],
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

      expect(frame.getAttribute('data-tone')).toBe(tone);
      expect(frame.className).toContain(`[--nb-media-frame-bg:${color}]`);
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
