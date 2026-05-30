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
    expect(callout.getAttribute('data-tone')).toBe('yellow');
    expect(callout.getAttribute('data-size')).toBe('lg');
    expect(callout.getAttribute('data-layout')).toBe('inline');
    expect(callout.getAttribute('data-shadow')).toBe('hard');
    expect(callout.className).toContain('relative');
    expect(callout.className).toContain('inline-flex');
    expect(callout.className).toContain('bg-(--nb-callout-bg)');
    expect(callout.className).toContain('text-(--nb-callout-fg)');
    expect(callout.className).toContain(
      'border-(length:--nb-callout-border-width)'
    );
    expect(callout.className).toContain('border-(--nb-border)');
    expect(callout.className).toContain('rounded-(--nb-callout-radius)');
    expect(callout.className).toContain('shadow-[var(--nb-callout-shadow)]');
    expect(callout.className).toContain('font-black');
    expect(callout.style.getPropertyValue('--nb-callout-bg')).toBe(
      'var(--nb-yellow)'
    );
    expect(callout.className).toContain('[--nb-callout-border-width:3px]');
    expect(callout.className).toContain(
      '[--nb-callout-shadow:6px_6px_0_0_var(--nb-shadow)]'
    );
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
    expect(callout.style.getPropertyValue('--nb-callout-bg')).toBe(
      'var(--nb-pink)'
    );
    expect(callout.className).toContain('min-h-20');
    expect(callout.className).toContain('text-5xl');
    expect(callout.className).toContain('w-full');
    expect(callout.className).toContain('justify-between');
    expect(callout.className).toContain(
      '[--nb-callout-shadow:var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_0_var(--nb-shadow)]'
    );
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
      expect(callout.style.getPropertyValue('--nb-callout-bg')).toBe(color);
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
