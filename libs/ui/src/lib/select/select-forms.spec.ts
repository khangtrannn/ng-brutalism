import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { describe, expect, it } from 'vitest';

import { NbSelect } from './nb-select';
import { NbSelectOption } from './nb-select-option';
import type { NbSelectValue } from './select.types';

@Component({
  imports: [NbSelect, NbSelectOption, ReactiveFormsModule],
  template: `
    <nb-select [formControl]="control" placeholder="Pick one">
      <nb-select-option value="starter" label="Starter"
        >Starter</nb-select-option
      >
      <nb-select-option value="team" label="Team">Team</nb-select-option>
    </nb-select>
  `,
})
class SelectFormTest {
  readonly control = new FormControl<NbSelectValue | null>('starter', {
    validators: Validators.required,
  });
}

describe('NbSelect as a ControlValueAccessor', () => {
  it('reflects the initial FormControl value via writeValue', async () => {
    const fixture = await createFixture();
    const trigger = findTrigger(fixture);

    expect(trigger.textContent?.trim()).toBe('Starter');
  });

  it('propagates a selection back to the FormControl (onChange)', async () => {
    const fixture = await createFixture();
    const trigger = findTrigger(fixture);

    trigger.click();
    fixture.detectChanges();

    const options = Array.from(
      fixture.nativeElement.querySelectorAll('[role="option"]')
    ) as HTMLButtonElement[];
    options[1].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.control.value).toBe('team');
  });

  it('marks the control touched when the listbox closes (onTouched)', async () => {
    const fixture = await createFixture();
    const trigger = findTrigger(fixture);

    expect(fixture.componentInstance.control.touched).toBe(false);

    trigger.click();
    fixture.detectChanges();
    trigger.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    );
    fixture.detectChanges();
    await Promise.resolve();

    expect(fixture.componentInstance.control.touched).toBe(true);
  });

  it('disables the trigger when the FormControl is disabled (setDisabledState)', async () => {
    const fixture = await createFixture();
    const trigger = findTrigger(fixture);

    expect(trigger.disabled).toBe(false);

    fixture.componentInstance.control.disable();
    fixture.detectChanges();

    expect(trigger.disabled).toBe(true);
  });

  it('reflects required and invalid state from NgControl', async () => {
    const fixture = await createFixture();
    const trigger = findTrigger(fixture);

    expect(trigger.getAttribute('aria-required')).toBe('true');
    expect(trigger.getAttribute('aria-invalid')).toBeNull();

    fixture.componentInstance.control.setValue(null);
    fixture.detectChanges();
    await Promise.resolve();
    fixture.detectChanges();

    // Invalid state is gated on touched/dirty (no error shown before the
    // user has interacted with the control), matching the field-level
    // convention used by NbField.
    expect(trigger.getAttribute('aria-invalid')).toBeNull();

    fixture.componentInstance.control.markAsTouched();
    fixture.detectChanges();
    await Promise.resolve();
    fixture.detectChanges();

    expect(trigger.getAttribute('aria-invalid')).toBe('true');
  });
});

async function createFixture(): Promise<ComponentFixture<SelectFormTest>> {
  await TestBed.configureTestingModule({
    imports: [SelectFormTest],
  }).compileComponents();

  const fixture = TestBed.createComponent(SelectFormTest);
  fixture.detectChanges();

  return fixture;
}

function findTrigger(
  fixture: ComponentFixture<SelectFormTest>
): HTMLButtonElement {
  return fixture.nativeElement.querySelector(
    'button[aria-haspopup="listbox"]'
  ) as HTMLButtonElement;
}
