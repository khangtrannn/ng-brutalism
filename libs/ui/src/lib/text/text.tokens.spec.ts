import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import {
  NbText,
  type NbTextSize,
  type NbTextTone,
  type NbTextTransform,
} from './nb-text';

@Component({
  imports: [NbText],
  template: `<span
    nbText
    [size]="size"
    [tone]="tone"
    [transform]="transform"
  >Text</span>`,
})
class TextTokenTest {
  size: NbTextSize = 'md';
  tone: NbTextTone | undefined = undefined;
  transform: NbTextTransform = 'none';
}

describe('NbText token surface', () => {
  it('leaves final typography properties to CSS, reflecting state as data attributes', async () => {
    const fixture = await createFixture();
    const text = findText(fixture);

    expect(text.style.getPropertyValue('color')).toBe('');
    expect(text.style.getPropertyValue('font-size')).toBe('');
    expect(text.style.getPropertyValue('font-weight')).toBe('');
    expect(text.style.getPropertyValue('line-height')).toBe('');
    expect(text.style.getPropertyValue('text-transform')).toBe('');
    expect(text.style.getPropertyValue('letter-spacing')).toBe('');
    expect(text.style.getPropertyValue('max-width')).toBe('');

    expect(text.getAttribute('data-size')).toBe('md');
    expect(text.getAttribute('data-weight')).toBe('normal');
  });

  it('does not write --nb-text-color or data-nb-tone when tone is unset', async () => {
    const fixture = await createFixture();
    const text = findText(fixture);

    expect(text.getAttribute('data-nb-tone')).toBeNull();
    expect(text.style.getPropertyValue('--nb-text-color')).toBe('');
  });

  it('reflects semantic tone members through data-nb-tone and writes the resolved color', async () => {
    const fixture = await createFixture({ tone: 'danger' });
    const text = findText(fixture);

    expect(text.getAttribute('data-nb-tone')).toBe('danger');
    expect(text.style.getPropertyValue('--nb-text-color')).toBe(
      'var(--nb-danger)'
    );
  });

  it('supports text-specific color intents that are not part of the shared tone recipe', async () => {
    const fixture = await createFixture({ tone: 'muted' });
    const text = findText(fixture);

    expect(text.getAttribute('data-nb-tone')).toBe('muted');
    expect(text.style.getPropertyValue('--nb-text-color')).toContain(
      'color-mix'
    );
  });

  it('reflects size as a data attribute, not a final inline style', async () => {
    const fixture = await createFixture({ size: 'xl' });
    const text = findText(fixture);

    expect(text.getAttribute('data-size')).toBe('xl');
    expect(text.style.getPropertyValue('font-size')).toBe('');
  });

  it('reflects transform as a data attribute', async () => {
    const fixture = await createFixture({ transform: 'uppercase' });
    const text = findText(fixture);

    expect(text.getAttribute('data-transform')).toBe('uppercase');
    expect(text.style.getPropertyValue('text-transform')).toBe('');
  });

  it('keeps anatomy out of host classes', async () => {
    const fixture = await createFixture();
    const text = findText(fixture);

    expect(text.className).toBe('');
    expect(text.getAttribute('data-nb-text')).toBe('');
  });
});

async function createFixture(
  inputs: Partial<Pick<TextTokenTest, 'size' | 'tone' | 'transform'>> = {}
): Promise<ComponentFixture<TextTokenTest>> {
  await TestBed.configureTestingModule({
    imports: [TextTokenTest],
  }).compileComponents();

  const fixture = TestBed.createComponent(TextTokenTest);
  Object.assign(fixture.componentInstance, inputs);
  fixture.detectChanges();

  return fixture;
}

function findText(fixture: ComponentFixture<TextTokenTest>): HTMLSpanElement {
  return fixture.nativeElement.querySelector('span[nbText]') as HTMLSpanElement;
}
