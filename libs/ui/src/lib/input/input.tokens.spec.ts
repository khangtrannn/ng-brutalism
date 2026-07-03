import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import {
  NbInput,
  type NbInputBorder,
  type NbInputRadius,
  type NbInputShadow,
  type NbInputTone,
} from './nb-input';

@Component({
  imports: [NbInput],
  template: `<input nbInput placeholder="Email" />`,
})
class InputTokenTest {}

@Component({
  imports: [NbInput],
  template: `
    <input
      nbInput
      placeholder="Email"
      size="lg"
      tone="warning"
      border="strong"
      radius="lg"
      shadow="hard"
    />
  `,
})
class ValueInputTokenTest {}

@Component({
  imports: [NbInput],
  template: `<input nbInput [tone]="tone" placeholder="Email" />`,
})
class ToneInputTokenTest {
  tone: NbInputTone = 'surface';
}

@Component({
  imports: [NbInput],
  template: `<input nbInput [border]="border()" placeholder="Email" />`,
})
class MutableBorderInputTokenTest {
  readonly border = signal<NbInputBorder | null>('thick');
}

@Component({
  imports: [NbInput],
  template: `
    <input
      nbInput
      [radius]="radius()"
      [shadow]="shadow()"
      placeholder="Email"
    />
  `,
})
class MutableRadiusInputTokenTest {
  readonly radius = signal<NbInputRadius | null>('lg');
  readonly shadow = signal<NbInputShadow | null>('hard');
}

describe('NbInput token surface', () => {
  it('emits no internal styling classes — anatomy lives in styles.css and data-attrs', async () => {
    const fixture = await createFixture();
    const input = findInput(fixture);

    expect(input.className).toBe('');
    expect(input.getAttribute('data-size')).toBe('md');
    expect(input.getAttribute('data-nb-tone')).toBeNull();
    expect(input.getAttribute('data-in-group')).toBeNull();
  });

  it('leaves default visuals to CSS token fallbacks', async () => {
    const fixture = await createFixture();
    const input = findInput(fixture);

    expect(input.style.getPropertyValue('background-color')).toBe('');
    expect(input.style.getPropertyValue('border-color')).toBe('');
    expect(input.style.getPropertyValue('border-width')).toBe('');
    expect(input.style.getPropertyValue('--nb-input-border-width')).toBe('');
    expect(input.style.cssText).not.toContain('--nb-resolved');
  });

  it('leaves radius/shadow to CSS token fallbacks when unset', async () => {
    const fixture = await createFixture();
    const input = findInput(fixture);

    expect(input.style.getPropertyValue('--nb-input-radius')).toBe('');
    expect(input.style.getPropertyValue('--nb-input-shadow')).toBe('');
    expect(input.style.getPropertyValue('border-radius')).toBe('');
    expect(input.style.getPropertyValue('box-shadow')).toBe('');
  });

  it('does not write the focus ring color inline', async () => {
    const fixture = await createFixture();
    const input = findInput(fixture);

    expect(input.style.getPropertyValue('--nb-input-focus-ring-color')).toBe('');
  });

  it('reflects tone semantically and writes border/radius/shadow inputs to public CSS variables', async () => {
    const fixture = await createFixture(ValueInputTokenTest);
    const input = findInput(fixture);

    expect(input.getAttribute('data-size')).toBe('lg');
    expect(input.getAttribute('data-nb-tone')).toBe('warning');
    expect(input.style.getPropertyValue('--nb-input-border-width')).toBe('3px');
    expect(input.style.getPropertyValue('--nb-input-radius')).toBe(
      'var(--nb-radius-lg, 0.75rem)'
    );
    expect(input.style.getPropertyValue('--nb-input-shadow')).toBe(
      '6px 6px 0 0 var(--nb-shadow)'
    );
    expect(input.style.getPropertyValue('background-color')).toBe('');
    expect(input.style.getPropertyValue('border-color')).toBe('');
    expect(input.style.getPropertyValue('border-width')).toBe('');
    expect(input.style.getPropertyValue('border-radius')).toBe('');
    expect(input.style.getPropertyValue('box-shadow')).toBe('');
  });

  it.each([
    ['surface'],
    ['mint'],
    ['danger'],
  ] satisfies readonly [NbInputTone][])(
    'reflects %s as semantic tone state without writing final colors',
    async (tone) => {
      const fixture = await createFixture(ToneInputTokenTest, (instance) => {
        instance.tone = tone;
      });
      const input = findInput(fixture);

      expect(input.getAttribute('data-nb-tone')).toBe(tone);
      expect(input.style.getPropertyValue('background-color')).toBe('');
      expect(input.style.getPropertyValue('border-color')).toBe('');
      expect(input.style.getPropertyValue('--nb-input-focus-ring-color')).toBe(
        ''
      );
    }
  );

  it('removes inline public CSS variables when bound scalar inputs become null', async () => {
    const fixture = await createFixture(MutableBorderInputTokenTest);
    const input = findInput(fixture);

    expect(input.style.getPropertyValue('--nb-input-border-width')).toBe('4px');

    fixture.componentInstance.border.set(null);
    fixture.detectChanges();

    expect(input.style.getPropertyValue('--nb-input-border-width')).toBe('');
  });

  it('removes inline radius/shadow public CSS variables when bound inputs become null', async () => {
    const fixture = await createFixture(MutableRadiusInputTokenTest);
    const input = findInput(fixture);

    expect(input.style.getPropertyValue('--nb-input-radius')).toBe(
      'var(--nb-radius-lg, 0.75rem)'
    );
    expect(input.style.getPropertyValue('--nb-input-shadow')).toBe(
      '6px 6px 0 0 var(--nb-shadow)'
    );

    fixture.componentInstance.radius.set(null);
    fixture.componentInstance.shadow.set(null);
    fixture.detectChanges();

    expect(input.style.getPropertyValue('--nb-input-radius')).toBe('');
    expect(input.style.getPropertyValue('--nb-input-shadow')).toBe('');
  });
});

async function createFixture<T>(
  component: new () => T = InputTokenTest as never,
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

function findInput(
  fixture: ComponentFixture<unknown>
): HTMLInputElement {
  return fixture.nativeElement.querySelector(
    'input[nbInput]'
  ) as HTMLInputElement;
}
