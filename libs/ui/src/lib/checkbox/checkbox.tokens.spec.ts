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
  tone: NbToneToken = 'primary';
}

describe('NbCheckbox token surface', () => {
  it('sets --nb-checkbox-bg and --nb-checkbox-fg as inline styles from tone', async () => {
    const fixture = await createFixture();
    const checkbox = findCheckbox(fixture);

    expect(checkbox.style.getPropertyValue('--nb-checkbox-bg')).toBe(
      'var(--nb-primary)'
    );
    expect(checkbox.style.getPropertyValue('--nb-checkbox-fg')).toBe(
      'var(--nb-primary-foreground)'
    );
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

  it('reads its scoped tokens in checked state classes', async () => {
    const fixture = await createFixture();
    const checkbox = findCheckbox(fixture);
    const cls = checkbox.className;

    expect(cls).toContain('checked:bg-(--nb-checkbox-bg)');
    expect(cls).toContain('checked:text-(--nb-checkbox-fg)');
    expect(cls).not.toContain('checked:bg-(--nb-main)');
  });

  it('uses --nb-border directly for outline and focus ring', async () => {
    const fixture = await createFixture();
    const cls = findCheckbox(fixture).className;

    expect(cls).toContain('outline-(--nb-border)');
    expect(cls).toContain('focus-visible:ring-(--nb-border)');
    expect(cls).not.toContain('outline-(--nb-checkbox-border)');
    expect(cls).not.toContain('focus-visible:ring-(--nb-checkbox-border)');
  });

  it.each([
    ['sm', 'size-3.5'],
    ['md', 'size-4'],
    ['lg', 'size-5'],
  ] satisfies Array<[NbCheckboxSize, string]>)(
    'size="%s" keeps its expected size class',
    async (size, expectedClass) => {
      const fixture = await createFixture({ size });
      const cls = findCheckbox(fixture).className;

      expect(cls).toContain(expectedClass);
    }
  );

  it('does not regress the default checkbox class shape', async () => {
    const fixture = await createFixture();
    const checkbox = findCheckbox(fixture);
    const cls = checkbox.className;

    expect(cls).toContain('peer');
    expect(cls).toContain('grid');
    expect(cls).toContain('shrink-0');
    expect(cls).toContain('cursor-pointer');
    expect(cls).toContain('appearance-none');
    expect(cls).toContain('place-content-center');
    expect(cls).toContain('outline-2');
    expect(cls).toContain('ring-offset-white');
    expect(cls).toContain('focus-visible:outline-hidden');
    expect(cls).toContain('focus-visible:ring-2');
    expect(cls).toContain('focus-visible:ring-offset-2');
    expect(cls).toContain('disabled:opacity-50');
    expect(cls).toContain('disabled:cursor-not-allowed');
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
