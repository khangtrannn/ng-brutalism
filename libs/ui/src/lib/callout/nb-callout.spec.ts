import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbCallout, type NbCalloutTone } from './nb-callout';

@Component({
  imports: [NbCallout],
  template: `<div nbCallout>$799</div>`,
})
class DefaultCalloutTest {}

@Component({
  imports: [NbCallout],
  template: `
    <div nbCallout tone="pink" size="xl" layout="between" shadow="default">
      <span>$420K</span>
      <span>LISTING</span>
    </div>
  `,
})
class ValueCalloutTest {}

@Component({
  imports: [NbCallout],
  template: `<div nbCallout [tone]="tone">Tone callout</div>`,
})
class ToneCalloutTest {
  tone: NbCalloutTone = 'yellow';
}

describe('NbCallout', () => {
  it('applies default high-emphasis callout classes and metadata', async () => {
    const fixture = await createFixture(DefaultCalloutTest);
    const callout = fixture.nativeElement.querySelector(
      '[nbCallout]'
    ) as HTMLElement;

    expect(callout.getAttribute('data-nb-callout')).toBe('');
    // No style inputs set — capability attrs stay absent; CSS fallback owns the
    // visual defaults. Attribute presence means "consumer chose this".
    expect(callout.getAttribute('data-tone')).toBeNull();
    expect(callout.getAttribute('data-size')).toBe('lg');
    expect(callout.getAttribute('data-layout')).toBe('inline');
    expect(callout.getAttribute('data-shadow')).toBeNull();
    expect(callout.className).toBe('');
    expect(callout.className).not.toMatch(/(?:^|\s)nb-tone(?:\s|$)/);
    expect(callout.className).not.toContain('bg-(--nb-callout-bg)');
    expect(callout.className).not.toContain('text-(--nb-callout-fg)');
    expect(callout.className).not.toContain(
      'border-(length:--nb-callout-border-width)'
    );
    expect(callout.className).not.toContain('border-(--nb-callout-border-color)');
    expect(callout.className).not.toContain('rounded-(--nb-callout-radius)');
    expect(callout.className).not.toMatch(/(?:^|\s)nb-shadow(?:\s|$)/);
    expect(callout.style.getPropertyValue('background')).toBe('');
    expect(callout.style.getPropertyValue('--nb-callout-bg')).toBe('');
    expect(callout.style.getPropertyValue('border-radius')).toBe('');
    expect(callout.style.getPropertyValue('box-shadow')).toBe('');
    expect(callout.style.cssText).not.toContain('--nb-resolved');
  });

  it('maps tone, size, layout, and shadow attributes', async () => {
    const fixture = await createFixture(ValueCalloutTest);
    const callout = fixture.nativeElement.querySelector(
      '[nbCallout]'
    ) as HTMLElement;

    expect(callout.getAttribute('data-tone')).toBe('pink');
    expect(callout.getAttribute('data-size')).toBe('xl');
    expect(callout.getAttribute('data-layout')).toBe('between');
    expect(callout.getAttribute('data-shadow')).toBe('default');
    // Explicit tone/shadow inputs win outright — literal values, no public hook.
    expect(callout.style.getPropertyValue('background')).toBe('var(--nb-pink)');
    expect(callout.className).toBe('');
    expect(callout.style.getPropertyValue('box-shadow')).toBe(
      'var(--nb-shadow-offset-x) var(--nb-shadow-offset-y) 0 0 var(--nb-shadow)'
    );
    expect(callout.style.cssText).not.toContain('--nb-resolved');
  });

  it.each([
    ['mint', 'var(--nb-mint)'],
    ['lavender', 'var(--nb-lavender)'],
    ['blue', 'var(--nb-blue)'],
    ['black', '#000000'],
  ] satisfies readonly [NbCalloutTone, string][])(
    'keeps the %s tone available for generic value emphasis',
    async (tone, color) => {
      const fixture = await createFixture(ToneCalloutTest, (instance) => {
        instance.tone = tone;
      });

      const callout = fixture.nativeElement.querySelector(
        '[nbCallout]'
      ) as HTMLElement;

      expect(callout.getAttribute('data-tone')).toBe(tone);
      if (color.startsWith('var(')) {
        expect(callout.style.getPropertyValue('background')).toBe(color);
      } else {
        expect(callout.style.getPropertyValue('background')).toBeTruthy();
      }
      expect(callout.style.getPropertyValue('--nb-callout-bg')).toBe('');
      expect(callout.style.cssText).not.toContain('--nb-resolved');
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
