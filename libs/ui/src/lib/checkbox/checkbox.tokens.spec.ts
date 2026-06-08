import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbCheckbox } from './nb-checkbox';
import type { NbCheckboxSize } from './checkbox.types';
import type { NbToneToken } from '../tokens/tone';

@Component({
  imports: [NbCheckbox],
  template: `<input type="checkbox" nbCheckbox [size]="size" [tone]="tone" />`,
})
class CheckboxTokenTest {
  size: NbCheckboxSize = 'md';
  tone: NbToneToken | undefined = undefined;
}

describe('NbCheckbox token surface', () => {
  it('leaves checked color tokens unset when tone is omitted', async () => {
    const fixture = await createFixture();
    const checkbox = findCheckbox(fixture);

    expect(checkbox.style.getPropertyValue('--nb-checkbox-bg')).toBe('');
    expect(checkbox.style.getPropertyValue('--nb-checkbox-fg')).toBe('');
    expect(checkbox.getAttribute('data-tone')).toBe('primary');
  });

  it('updates inline styles when tone changes', async () => {
    const fixture = await createFixture({ tone: 'success' });
    const checkbox = findCheckbox(fixture);

    expect(checkbox.style.getPropertyValue('--nb-checkbox-bg')).toBe(
      'var(--nb-success)'
    );
    expect(checkbox.style.getPropertyValue('--nb-checkbox-fg')).toBe(
      'var(--nb-success-foreground)'
    );
    expect(checkbox.getAttribute('data-tone')).toBe('success');
  });

  it('keeps checked state styling in CSS instead of classes', async () => {
    const fixture = await createFixture();
    const checkbox = findCheckbox(fixture);

    expect(checkbox.className).toBe('');
    expect(checkbox.getAttribute('data-tone')).toBe('primary');
  });

  it('uses CSS for outline and focus ring anatomy', async () => {
    const fixture = await createFixture();
    const cls = findCheckbox(fixture).className;

    expect(cls).toBe('');
    expect(cls).not.toContain('outline-(--nb-checkbox-border)');
    expect(cls).not.toContain('focus-visible:ring-(--nb-checkbox-border)');
  });

  it.each([
    ['sm'],
    ['md'],
    ['lg'],
  ] satisfies Array<[NbCheckboxSize, string]>)(
    'size="%s" is reflected as a data attribute',
    async (size) => {
      const fixture = await createFixture({ size });
      const checkbox = findCheckbox(fixture);

      expect(checkbox.getAttribute('data-size')).toBe(size);
      expect(checkbox.className).toBe('');
    }
  );

  it('keeps default checkbox anatomy out of classes', async () => {
    const fixture = await createFixture();
    const checkbox = findCheckbox(fixture);

    expect(checkbox.className).toBe('');
    expect(checkbox.getAttribute('data-size')).toBe('md');
  });
});

async function createFixture(
  inputs: Partial<Pick<CheckboxTokenTest, 'size' | 'tone'>> = {}
): Promise<ComponentFixture<CheckboxTokenTest>> {
  await TestBed.configureTestingModule({
    imports: [CheckboxTokenTest],
  }).compileComponents();

  const fixture = TestBed.createComponent(CheckboxTokenTest);
  Object.assign(fixture.componentInstance, inputs);
  fixture.detectChanges();

  return fixture;
}

function findCheckbox(
  fixture: ComponentFixture<CheckboxTokenTest>
): HTMLInputElement {
  return fixture.nativeElement.querySelector(
    'input[nbCheckbox]'
  ) as HTMLInputElement;
}
