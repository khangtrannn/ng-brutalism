import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import {
  NbCallout,
  type NbCalloutRadius,
  type NbCalloutShadow,
  type NbCalloutTone,
} from './nb-callout';

@Component({
  imports: [NbCallout],
  template: `<div nbCallout>$799</div>`,
})
class DefaultCalloutTest {}

@Component({
  imports: [NbCallout],
  template: `
    <div
      nbCallout
      tone="pink"
      size="xl"
      layout="between"
      radius="md"
      shadow="default"
    >
      <span>$420K</span>
      <span>LISTING</span>
    </div>
  `,
})
class ValueCalloutTest {}

@Component({
  imports: [NbCallout],
  template: `
    <section style="--nb-callout-radius: var(--nb-radius-none); --nb-callout-shadow: none;">
      <div nbCallout [tone]="tone">Tone callout</div>
    </section>
  `,
})
class ToneCalloutTest {
  tone: NbCalloutTone = 'yellow';
}

@Component({
  imports: [NbCallout],
  template: `
    <section style="--nb-callout-radius: var(--nb-radius-none); --nb-callout-shadow: none;">
      <div nbCallout radius="lg" shadow="hard">Tone callout</div>
    </section>
  `,
})
class RadiusOverrideCalloutTest {}

@Component({
  imports: [NbCallout],
  template: `
    <section style="--nb-callout-radius: var(--nb-radius-none); --nb-callout-shadow: none;">
      <div nbCallout [radius]="radius()" [shadow]="shadow()">Tone callout</div>
    </section>
  `,
})
class MutableRadiusCalloutTest {
  readonly radius = signal<NbCalloutRadius | null>('lg');
  readonly shadow = signal<NbCalloutShadow | null>('hard');
}

describe('NbCallout', () => {
  it('applies default high-emphasis callout metadata without writing inline token vars', async () => {
    const fixture = await createFixture(DefaultCalloutTest);
    const callout = fixture.nativeElement.querySelector(
      '[nbCallout]'
    ) as HTMLElement;

    expect(callout.getAttribute('data-nb-callout')).toBe('');
    expect(callout.hasAttribute('data-radius')).toBe(false);
    expect(callout.getAttribute('data-nb-tone')).toBeNull();
    expect(callout.getAttribute('data-size')).toBe('lg');
    expect(callout.getAttribute('data-layout')).toBe('inline');
    expect(callout.style.getPropertyValue('--nb-callout-radius')).toBe('');
    expect(callout.style.getPropertyValue('--nb-callout-shadow')).toBe('');
    expect(callout.style.getPropertyValue('background')).toBe('');
    expect(callout.style.getPropertyValue('color')).toBe('');
    expect(callout.style.getPropertyValue('border-color')).toBe('');
    expect(callout.style.getPropertyValue('border-radius')).toBe('');
    expect(callout.style.getPropertyValue('box-shadow')).toBe('');
  });

  it('writes radius and shadow inputs to public CSS variables and data-nb-tone for tone', async () => {
    const fixture = await createFixture(ValueCalloutTest);
    const callout = fixture.nativeElement.querySelector(
      '[nbCallout]'
    ) as HTMLElement;

    expect(callout.getAttribute('data-nb-tone')).toBe('pink');
    expect(callout.getAttribute('data-size')).toBe('xl');
    expect(callout.getAttribute('data-layout')).toBe('between');
    expect(callout.hasAttribute('data-radius')).toBe(false);
    expect(callout.style.getPropertyValue('--nb-callout-radius')).toBe(
      'var(--nb-radius-md, 0.5rem)'
    );
    expect(callout.style.getPropertyValue('--nb-callout-shadow')).toBe(
      'var(--nb-shadow-offset-x) var(--nb-shadow-offset-y) 0 0 var(--nb-shadow)'
    );
    expect(callout.style.getPropertyValue('background')).toBe('');
    expect(callout.style.getPropertyValue('color')).toBe('');
    expect(callout.style.getPropertyValue('border-color')).toBe('');
    expect(callout.style.getPropertyValue('border-radius')).toBe('');
    expect(callout.style.getPropertyValue('box-shadow')).toBe('');
  });

  it.each([
    ['mint'],
    ['lavender'],
    ['blue'],
    ['black'],
  ] satisfies readonly [NbCalloutTone][])(
    'reflects tone as a semantic data attribute for %s',
    async (tone) => {
      const fixture = await createFixture(ToneCalloutTest, (instance) => {
        instance.tone = tone;
      });

      const callout = fixture.nativeElement.querySelector(
        '[nbCallout]'
      ) as HTMLElement;

      expect(callout.getAttribute('data-nb-tone')).toBe(tone);
      expect(callout.style.getPropertyValue('--nb-callout-radius')).toBe('');
      expect(callout.style.getPropertyValue('--nb-callout-shadow')).toBe('');
    }
  );

  it('lets inherited CSS variable customization stay in play when scalar inputs are absent', async () => {
    const fixture = await createFixture(ToneCalloutTest, (instance) => {
      instance.tone = 'warning';
    });

    const wrapper = fixture.nativeElement.querySelector('section') as HTMLElement;
    const callout = fixture.nativeElement.querySelector(
      '[nbCallout]'
    ) as HTMLElement;

    expect(wrapper.style.getPropertyValue('--nb-callout-radius')).toBe(
      'var(--nb-radius-none)'
    );
    expect(wrapper.style.getPropertyValue('--nb-callout-shadow')).toBe('none');
    expect(callout.style.getPropertyValue('--nb-callout-radius')).toBe('');
    expect(callout.style.getPropertyValue('--nb-callout-shadow')).toBe('');
    expect(callout.getAttribute('data-nb-tone')).toBe('warning');
  });

  it('lets scalar inputs win over inherited customization through inline CSS variables', async () => {
    const fixture = await createFixture(RadiusOverrideCalloutTest);
    const callout = fixture.nativeElement.querySelector(
      '[nbCallout]'
    ) as HTMLElement;

    expect(callout.style.getPropertyValue('--nb-callout-radius')).toBe(
      'var(--nb-radius-lg, 0.75rem)'
    );
    expect(callout.style.getPropertyValue('--nb-callout-shadow')).toBe(
      '6px 6px 0 0 var(--nb-shadow)'
    );
  });

  it('removes inline public CSS variables when bound scalar inputs become null', async () => {
    const fixture = await createFixture(MutableRadiusCalloutTest);
    const callout = fixture.nativeElement.querySelector(
      '[nbCallout]'
    ) as HTMLElement;

    expect(callout.style.getPropertyValue('--nb-callout-radius')).toBe(
      'var(--nb-radius-lg, 0.75rem)'
    );
    expect(callout.style.getPropertyValue('--nb-callout-shadow')).toBe(
      '6px 6px 0 0 var(--nb-shadow)'
    );

    fixture.componentInstance.radius.set(null);
    fixture.componentInstance.shadow.set(null);
    fixture.detectChanges();

    expect(callout.style.getPropertyValue('--nb-callout-radius')).toBe('');
    expect(callout.style.getPropertyValue('--nb-callout-shadow')).toBe('');
  });
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
