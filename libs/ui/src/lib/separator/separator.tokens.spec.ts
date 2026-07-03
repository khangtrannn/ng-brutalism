import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import {
  NbSeparator,
  type NbSeparatorOrientation,
  type NbSeparatorVariant,
} from './nb-separator';

@Component({
  imports: [NbSeparator],
  template: `<hr nbSeparator [orientation]="orientation" [variant]="variant" />`,
})
class SeparatorTokenTest {
  orientation: NbSeparatorOrientation = 'horizontal';
  variant: NbSeparatorVariant = 'solid';
}

describe('NbSeparator token surface', () => {
  it('leaves border/layout final properties to CSS, reflecting state as data attributes', async () => {
    const fixture = await createFixture();
    const separator = findSeparator(fixture);

    expect(separator.getAttribute('data-orientation')).toBe('horizontal');
    expect(separator.getAttribute('data-variant')).toBe('solid');
    expect(separator.getAttribute('aria-orientation')).toBe('horizontal');

    expect(separator.style.getPropertyValue('border-top')).toBe('');
    expect(separator.style.getPropertyValue('border-left')).toBe('');
    expect(separator.style.getPropertyValue('width')).toBe('');
    expect(separator.style.getPropertyValue('height')).toBe('');
    expect(separator.style.getPropertyValue('align-self')).toBe('');
  });

  it('reflects vertical orientation as a data attribute', async () => {
    const fixture = await createFixture({ orientation: 'vertical' });
    const separator = findSeparator(fixture);

    expect(separator.getAttribute('data-orientation')).toBe('vertical');
    expect(separator.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('reflects variant as a data attribute', async () => {
    const fixture = await createFixture({ variant: 'thick' });
    const separator = findSeparator(fixture);

    expect(separator.getAttribute('data-variant')).toBe('thick');
  });

  it('keeps anatomy out of host classes', async () => {
    const fixture = await createFixture();
    const separator = findSeparator(fixture);

    expect(separator.className).toBe('');
    expect(separator.getAttribute('data-nb-separator')).toBe('');
  });
});

async function createFixture(
  inputs: Partial<
    Pick<SeparatorTokenTest, 'orientation' | 'variant'>
  > = {}
): Promise<ComponentFixture<SeparatorTokenTest>> {
  await TestBed.configureTestingModule({
    imports: [SeparatorTokenTest],
  }).compileComponents();

  const fixture = TestBed.createComponent(SeparatorTokenTest);
  Object.assign(fixture.componentInstance, inputs);
  fixture.detectChanges();

  return fixture;
}

function findSeparator(
  fixture: ComponentFixture<SeparatorTokenTest>
): HTMLElement {
  return fixture.nativeElement.querySelector('hr[nbSeparator]') as HTMLElement;
}
