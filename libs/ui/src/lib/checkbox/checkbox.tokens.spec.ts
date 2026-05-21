import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbCheckbox } from './nb-checkbox';
import type { NbCheckboxSize } from './checkbox.types';

@Component({
  standalone: true,
  imports: [NbCheckbox],
  template: `<input type="checkbox" nbCheckbox [size]="size" />`,
})
class CheckboxTokenTestComponent {
  size: NbCheckboxSize = 'default';
}

describe('NbCheckbox token surface', () => {
  it('declares the expected default tokens on the base host', async () => {
    const fixture = await createFixture();
    const checkbox = findCheckbox(fixture);
    const cls = checkbox.className;

    expect(cls).toContain('[--nb-checkbox-bg:var(--nb-main)]');
    expect(cls).toContain('[--nb-checkbox-fg:#fff]');
    expect(cls).toContain('[--nb-checkbox-border:var(--nb-border)]');
    expect(cls).toContain('[--nb-checkbox-radius:0]');
  });

  it('reads its scoped tokens instead of global tokens directly', async () => {
    const fixture = await createFixture();
    const checkbox = findCheckbox(fixture);
    const cls = checkbox.className;

    expect(cls).toContain('checked:bg-(--nb-checkbox-bg)');
    expect(cls).toContain('checked:text-(--nb-checkbox-fg)');
    expect(cls).toContain('outline-(--nb-checkbox-border)');
    expect(cls).toContain('rounded-(--nb-checkbox-radius)');
    expect(cls).toContain('focus-visible:ring-(--nb-checkbox-border)');
    expect(cls).not.toContain('checked:bg-(--nb-main)');
    expect(cls).not.toContain('outline-(--nb-border)');
    expect(cls).not.toContain('focus-visible:ring-(--nb-border)');
  });

  it.each([
    ['sm', 'size-3.5'],
    ['default', 'size-4'],
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
  inputs: Partial<Pick<CheckboxTokenTestComponent, 'size'>> = {}
): Promise<ComponentFixture<CheckboxTokenTestComponent>> {
  await TestBed.configureTestingModule({
    imports: [CheckboxTokenTestComponent],
  }).compileComponents();

  const fixture = TestBed.createComponent(CheckboxTokenTestComponent);
  Object.assign(fixture.componentInstance, inputs);
  fixture.detectChanges();

  return fixture;
}

function findCheckbox(
  fixture: ComponentFixture<CheckboxTokenTestComponent>
): HTMLInputElement {
  return fixture.nativeElement.querySelector(
    'input[nbCheckbox]'
  ) as HTMLInputElement;
}
