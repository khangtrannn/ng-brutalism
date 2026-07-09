import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import {
  NbCallout,
  type NbCalloutBorder,
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
      shadow="md"
      border="thick"
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
      <div nbCallout radius="lg" shadow="hard" border="strong">Tone callout</div>
    </section>
  `,
})
class RadiusOverrideCalloutTest {}

@Component({
  imports: [NbCallout],
  template: `
    <section style="--nb-callout-radius: var(--nb-radius-none); --nb-callout-shadow: none;">
      <div
        nbCallout
        [radius]="radius()"
        [shadow]="shadow()"
        [border]="border()"
      >
        Tone callout
      </div>
    </section>
  `,
})
class MutableRadiusCalloutTest {
  readonly radius = signal<NbCalloutRadius | null>('lg');
  readonly shadow = signal<NbCalloutShadow | null>('hard');
  readonly border = signal<NbCalloutBorder | null>('strong');
}

describe('NbCallout', () => {
  it('applies default high-emphasis callout metadata without writing inline token vars', async () => {
    // Arrange
    const fixture = await createFixture(DefaultCalloutTest);
    const callout = fixture.nativeElement.querySelector(
      '[nbCallout]'
    ) as HTMLElement;

    // Assert
    expect(callout.getAttribute('data-nb-callout')).toBe('');
    expect(callout.hasAttribute('data-radius')).toBe(false);
    expect(callout.getAttribute('data-nb-tone')).toBeNull();
    expect(callout.getAttribute('data-size')).toBe('md');
    expect(callout.getAttribute('data-layout')).toBe('inline');
    expect(callout.style.getPropertyValue('--nb-callout-radius')).toBe('');
    expect(callout.style.getPropertyValue('--nb-callout-shadow')).toBe('');
    expect(callout.style.getPropertyValue('--nb-callout-border-width')).toBe('');
    expect(callout.style.getPropertyValue('background')).toBe('');
    expect(callout.style.getPropertyValue('color')).toBe('');
    expect(callout.style.getPropertyValue('border-color')).toBe('');
    expect(callout.style.getPropertyValue('border-radius')).toBe('');
    expect(callout.style.getPropertyValue('border-width')).toBe('');
    expect(callout.style.getPropertyValue('box-shadow')).toBe('');
  });

  it('writes radius and shadow inputs to public CSS variables and data-nb-tone for tone', async () => {
    // Arrange
    const fixture = await createFixture(ValueCalloutTest);
    const callout = fixture.nativeElement.querySelector(
      '[nbCallout]'
    ) as HTMLElement;

    // Assert
    expect(callout.getAttribute('data-nb-tone')).toBe('pink');
    expect(callout.getAttribute('data-size')).toBe('xl');
    expect(callout.getAttribute('data-layout')).toBe('between');
    expect(callout.hasAttribute('data-radius')).toBe(false);
    expect(callout.style.getPropertyValue('--nb-callout-radius')).toBe(
      'var(--nb-radius-md)'
    );
    expect(callout.style.getPropertyValue('--nb-callout-shadow')).toBe(
      'var(--nb-shadow-offset-x) var(--nb-shadow-offset-y) 0 0 var(--nb-shadow)'
    );
    expect(callout.style.getPropertyValue('--nb-callout-border-width')).toBe(
      'var(--nb-border-width-thick)'
    );
    expect(callout.style.getPropertyValue('background')).toBe('');
    expect(callout.style.getPropertyValue('color')).toBe('');
    expect(callout.style.getPropertyValue('border-color')).toBe('');
    expect(callout.style.getPropertyValue('border-radius')).toBe('');
    expect(callout.style.getPropertyValue('border-width')).toBe('');
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
      // Arrange
      const fixture = await createFixture(ToneCalloutTest, (instance) => {
        instance.tone = tone;
      });

      const callout = fixture.nativeElement.querySelector(
        '[nbCallout]'
      ) as HTMLElement;

      // Assert
      expect(callout.getAttribute('data-nb-tone')).toBe(tone);
      expect(callout.style.getPropertyValue('--nb-callout-radius')).toBe('');
      expect(callout.style.getPropertyValue('--nb-callout-shadow')).toBe('');
      expect(callout.style.getPropertyValue('--nb-callout-border-width')).toBe(
        ''
      );
    }
  );

  it('lets inherited CSS variable customization stay in play when scalar inputs are absent', async () => {
    // Arrange
    const fixture = await createFixture(ToneCalloutTest, (instance) => {
      instance.tone = 'warning';
    });

    const wrapper = fixture.nativeElement.querySelector('section') as HTMLElement;
    const callout = fixture.nativeElement.querySelector(
      '[nbCallout]'
    ) as HTMLElement;

    // Assert
    expect(wrapper.style.getPropertyValue('--nb-callout-radius')).toBe(
      'var(--nb-radius-none)'
    );
    expect(wrapper.style.getPropertyValue('--nb-callout-shadow')).toBe('none');
    expect(callout.style.getPropertyValue('--nb-callout-radius')).toBe('');
    expect(callout.style.getPropertyValue('--nb-callout-shadow')).toBe('');
    expect(callout.getAttribute('data-nb-tone')).toBe('warning');
  });

  it('lets scalar inputs win over inherited customization through inline CSS variables', async () => {
    // Arrange
    const fixture = await createFixture(RadiusOverrideCalloutTest);
    const callout = fixture.nativeElement.querySelector(
      '[nbCallout]'
    ) as HTMLElement;

    // Assert
    expect(callout.style.getPropertyValue('--nb-callout-radius')).toBe(
      'var(--nb-radius-lg)'
    );
    expect(callout.style.getPropertyValue('--nb-callout-shadow')).toBe(
      'var(--nb-shadow-hard)'
    );
    expect(callout.style.getPropertyValue('--nb-callout-border-width')).toBe(
      'var(--nb-border-width-strong)'
    );
  });

  it('removes inline public CSS variables when bound scalar inputs become null', async () => {
    // Arrange
    const fixture = await createFixture(MutableRadiusCalloutTest);
    const callout = fixture.nativeElement.querySelector(
      '[nbCallout]'
    ) as HTMLElement;

    // Assert
    expect(callout.style.getPropertyValue('--nb-callout-radius')).toBe(
      'var(--nb-radius-lg)'
    );
    expect(callout.style.getPropertyValue('--nb-callout-shadow')).toBe(
      'var(--nb-shadow-hard)'
    );
    expect(callout.style.getPropertyValue('--nb-callout-border-width')).toBe(
      'var(--nb-border-width-strong)'
    );

    // Act
    fixture.componentInstance.radius.set(null);
    fixture.componentInstance.shadow.set(null);
    fixture.componentInstance.border.set(null);
    fixture.detectChanges();

    // Assert
    expect(callout.style.getPropertyValue('--nb-callout-radius')).toBe('');
    expect(callout.style.getPropertyValue('--nb-callout-shadow')).toBe('');
    expect(callout.style.getPropertyValue('--nb-callout-border-width')).toBe(
      ''
    );
  });

  it('keeps the public border-width variable in every size rule', () => {
    // Arrange
    const css = readCalloutCss();
    const sizeBlocks = css.match(/\[data-size='[a-z]+'\]\)\s*\{[^}]*\}/g) ?? [];
    const borderBlocks = sizeBlocks.filter((block) =>
      block.includes('border-width:')
    );

    // Assert
    expect(borderBlocks.length).toBeGreaterThan(0);
    for (const block of borderBlocks) {
      expect(block).toMatch(/border-width:\s*var\(--nb-callout-border-width,/);
    }
  });
});

function readCalloutCss(): string {
  const candidates = [
    join(process.cwd(), 'src/lib/callout/nb-callout.css'),
    join(process.cwd(), 'libs/ui/src/lib/callout/nb-callout.css'),
  ];
  const path = candidates.find((candidate) => existsSync(candidate));

  if (!path) {
    throw new Error('Unable to locate nb-callout.css for the cascade guard.');
  }

  return readFileSync(path, 'utf8');
}

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
