import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbField } from '../field/nb-field';
import { NbLabel } from './nb-label';

@Component({
  imports: [NbLabel],
  template: `<label nbLabel>Name</label>`,
})
class BareLabelTest {}

@Component({
  imports: [NbLabel],
  template: `<label nbLabel for="explicit-id">Name</label>`,
})
class ExplicitForLabelTest {}

@Component({
  imports: [NbField, NbLabel],
  template: `
    <nb-field>
      <label nbLabel>Name</label>
      <input />
    </nb-field>
  `,
})
class FieldLabelTest {}

describe('NbLabel', () => {
  it('renders without a for attribute when standalone and unset', async () => {
    const fixture = await createFixture(BareLabelTest);

    expect(findLabel(fixture).getAttribute('for')).toBeNull();
  });

  it('keeps an explicit for attribute untouched', async () => {
    const fixture = await createFixture(ExplicitForLabelTest);

    expect(findLabel(fixture).getAttribute('for')).toBe('explicit-id');
  });

  it('adopts the enclosing NbField controlId when for is unset', async () => {
    const fixture = await createFixture(FieldLabelTest);
    const field = fixture.nativeElement.querySelector('nb-field');
    const label = findLabel(fixture);

    expect(label.getAttribute('for')).toBeTruthy();
    expect(label.getAttribute('for')).toContain('nb-field-control-');
    expect(field).not.toBeNull();
  });
});

async function createFixture<T>(
  component: new () => T
): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [component],
  }).compileComponents();

  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();

  return fixture;
}

function findLabel(fixture: ComponentFixture<unknown>): HTMLLabelElement {
  return fixture.nativeElement.querySelector('label') as HTMLLabelElement;
}
