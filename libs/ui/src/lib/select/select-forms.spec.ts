import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  FormField,
  disabled,
  form,
  required,
  type FormValueControl,
} from '@angular/forms/signals';
import { SignalFormControl } from '@angular/forms/signals/compat';
import { describe, expect, it } from 'vitest';

import { NbField } from '../field/nb-field';
import { NbSelect } from './nb-select';
import { NbSelectOption } from './nb-select-option';
import type { NbSelectValue } from './select.types';

// Structural conformance to signal-forms' `FormValueControl`, without an `implements`
// clause so `@angular/forms` types stay out of the published `.d.ts` (see ADR 0004).
// Vitest transpiles specs without type-checking, so this assignment only trips in the
// dedicated `pnpm forms-contract-check` gate (tsconfig.forms-contract.json), not `nx test`.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _formValueControlConformance: FormValueControl<NbSelectValue | null> =
  null as unknown as NbSelect;

@Component({
  imports: [NbSelect, NbSelectOption],
  template: `
    <nb-select
      [(value)]="value"
      [invalid]="invalid()"
      [required]="required()"
      (touch)="touchedCount.set(touchedCount() + 1)"
      placeholder="Pick one"
    >
      <nb-select-option value="starter" label="Starter"
        >Starter</nb-select-option
      >
      <nb-select-option value="team" label="Team">Team</nb-select-option>
    </nb-select>
  `,
})
class SelectModelTest {
  readonly value = signal<NbSelectValue | null>('starter');
  readonly invalid = signal(false);
  readonly required = signal(false);
  readonly touchedCount = signal(0);
}

@Component({
  imports: [NbField, NbSelect, NbSelectOption],
  template: `
    <nb-field [invalid]="fieldInvalid()" [required]="fieldRequired()">
      <nb-select [invalid]="ownInvalid()" [required]="ownRequired()">
        <nb-select-option value="starter" label="Starter"
          >Starter</nb-select-option
        >
      </nb-select>
    </nb-field>
  `,
})
class SelectInFieldTest {
  readonly fieldInvalid = signal(false);
  readonly fieldRequired = signal(false);
  readonly ownInvalid = signal(false);
  readonly ownRequired = signal(false);
}

describe('NbSelect as a model-based form control', () => {
  it('reflects the initial value via [(value)]', async () => {
    // Arrange
    const fixture = await createSelectFixture();
    const trigger = findTrigger(fixture);

    // Assert
    expect(trigger.textContent?.trim()).toBe('Starter');
  });

  it('propagates a selection back through [(value)]', async () => {
    // Arrange
    const fixture = await createSelectFixture();
    const trigger = findTrigger(fixture);

    // Act
    trigger.click();
    fixture.detectChanges();

    const options = Array.from(
      fixture.nativeElement.querySelectorAll('[role="option"]')
    ) as HTMLButtonElement[];
    options[1].click();
    fixture.detectChanges();

    // Assert
    expect(fixture.componentInstance.value()).toBe('team');
  });

  it('emits touched when the listbox closes', async () => {
    // Arrange
    const fixture = await createSelectFixture();
    const trigger = findTrigger(fixture);

    // Assert
    expect(fixture.componentInstance.touchedCount()).toBe(0);

    // Act
    trigger.click();
    fixture.detectChanges();
    trigger.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    );
    fixture.detectChanges();
    await Promise.resolve();

    // Assert
    expect(fixture.componentInstance.touchedCount()).toBe(1);
  });

  it('emits touched when focus leaves the component without opening', async () => {
    // Arrange
    const fixture = await createSelectFixture();
    const host = fixture.nativeElement.querySelector(
      'nb-select'
    ) as HTMLElement;

    // Assert
    expect(fixture.componentInstance.touchedCount()).toBe(0);

    // Act: tab away from the trigger to something outside the component
    host.dispatchEvent(
      new FocusEvent('focusout', {
        relatedTarget: document.body,
        bubbles: true,
      })
    );
    fixture.detectChanges();

    // Assert
    expect(fixture.componentInstance.touchedCount()).toBe(1);
  });

  it('does not emit touched when focus moves within the component', async () => {
    // Arrange
    const fixture = await createSelectFixture();
    const host = fixture.nativeElement.querySelector(
      'nb-select'
    ) as HTMLElement;
    const trigger = findTrigger(fixture);

    // Act: focus moving to an element inside the component (e.g. opening the listbox)
    host.dispatchEvent(
      new FocusEvent('focusout', { relatedTarget: trigger, bubbles: true })
    );
    fixture.detectChanges();

    // Assert
    expect(fixture.componentInstance.touchedCount()).toBe(0);
  });

  it('reflects invalid and required inputs as aria attributes', async () => {
    // Arrange
    const fixture = await createSelectFixture();
    const trigger = findTrigger(fixture);

    // Assert
    expect(trigger.getAttribute('aria-invalid')).toBeNull();
    expect(trigger.getAttribute('aria-required')).toBeNull();

    // Act
    fixture.componentInstance.invalid.set(true);
    fixture.componentInstance.required.set(true);
    fixture.detectChanges();

    // Assert
    expect(trigger.getAttribute('aria-invalid')).toBe('true');
    expect(trigger.getAttribute('aria-required')).toBe('true');
  });
});

describe('NbSelect nested in nb-field', () => {
  it('is invalid when either its own input or the field marks it invalid', async () => {
    // Arrange
    const fixture = await createSelectInFieldFixture();
    const trigger = findTrigger(fixture);

    // Assert
    expect(trigger.getAttribute('aria-invalid')).toBeNull();

    // Act: field marks invalid
    fixture.componentInstance.fieldInvalid.set(true);
    fixture.detectChanges();

    // Assert
    expect(trigger.getAttribute('aria-invalid')).toBe('true');

    // Act: field clears, select's own input marks invalid
    fixture.componentInstance.fieldInvalid.set(false);
    fixture.componentInstance.ownInvalid.set(true);
    fixture.detectChanges();

    // Assert
    expect(trigger.getAttribute('aria-invalid')).toBe('true');
  });

  it('is required when either its own input or the field marks it required', async () => {
    // Arrange
    const fixture = await createSelectInFieldFixture();
    const trigger = findTrigger(fixture);

    // Act
    fixture.componentInstance.fieldRequired.set(true);
    fixture.detectChanges();

    // Assert
    expect(trigger.getAttribute('aria-required')).toBe('true');
  });
});

// The two suites below are the behavioral tripwire for ADR 0004: they pin the
// interop that actually exists in the installed @angular/forms (signal forms'
// `[formField]` driving the FormValueControl members, and `SignalFormControl`
// bridging into a classic FormGroup). If an upstream 22.x minor changes
// either mechanism, these fail before consumers do.
@Component({
  imports: [NbSelect, NbSelectOption, FormField],
  template: `
    <nb-select [formField]="planForm.plan">
      <nb-select-option value="starter" label="Starter"
        >Starter</nb-select-option
      >
      <nb-select-option value="team" label="Team">Team</nb-select-option>
    </nb-select>
  `,
})
class SelectSignalFormsTest {
  readonly planDisabled = signal(false);
  readonly model = signal<{ plan: NbSelectValue | null }>({ plan: 'starter' });
  readonly planForm = form(this.model, (path) => {
    required(path.plan);
    disabled(path.plan, () => this.planDisabled());
  });
}

@Component({
  imports: [NbSelect, NbSelectOption, FormField, ReactiveFormsModule],
  template: `
    <form [formGroup]="checkout">
      <input formControlName="name" />
      <nb-select [formField]="plan.fieldTree">
        <nb-select-option value="starter" label="Starter"
          >Starter</nb-select-option
        >
        <nb-select-option value="team" label="Team">Team</nb-select-option>
      </nb-select>
    </form>
  `,
})
class SelectReactiveMixTest {
  readonly plan = new SignalFormControl<NbSelectValue | null>('starter', (p) =>
    required(p)
  );
  readonly checkout = new FormGroup({
    name: new FormControl('Ada'),
    plan: this.plan,
  });
}

describe('NbSelect driven by signal forms via [formField]', () => {
  it('renders the initial field value and reflects required as aria-required', async () => {
    // Arrange
    const fixture = await createFixture(SelectSignalFormsTest);
    const trigger = findTrigger(fixture);

    // Assert
    expect(trigger.textContent?.trim()).toBe('Starter');
    expect(trigger.getAttribute('aria-required')).toBe('true');
  });

  it('writes a selection back into the field state', async () => {
    // Arrange
    const fixture = await createFixture(SelectSignalFormsTest);

    // Act
    pickOption(fixture, 1);

    // Assert
    expect(fixture.componentInstance.model().plan).toBe('team');
    expect(fixture.componentInstance.planForm.plan().value()).toBe('team');
  });

  it('disables the trigger when the schema disables the field', async () => {
    // Arrange
    const fixture = await createFixture(SelectSignalFormsTest);
    const trigger = findTrigger(fixture);

    // Assert
    expect(trigger.disabled).toBe(false);

    // Act
    fixture.componentInstance.planDisabled.set(true);
    fixture.detectChanges();

    // Assert
    expect(trigger.disabled).toBe(true);
  });

  it('marks the field touched when the listbox closes', async () => {
    // Arrange
    const fixture = await createFixture(SelectSignalFormsTest);
    const trigger = findTrigger(fixture);

    // Assert
    expect(fixture.componentInstance.planForm.plan().touched()).toBe(false);

    // Act
    trigger.click();
    fixture.detectChanges();
    trigger.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    );
    fixture.detectChanges();
    await Promise.resolve();

    // Assert
    expect(fixture.componentInstance.planForm.plan().touched()).toBe(true);
  });

  it('reflects required-empty invalidity as aria-invalid', async () => {
    // Arrange
    const fixture = await createFixture(SelectSignalFormsTest);
    const trigger = findTrigger(fixture);

    // Assert
    expect(trigger.getAttribute('aria-invalid')).toBeNull();

    // Act
    fixture.componentInstance.model.set({ plan: null });
    fixture.detectChanges();

    // Assert
    expect(trigger.getAttribute('aria-invalid')).toBe('true');
  });
});

describe('NbSelect inside a classic FormGroup via SignalFormControl', () => {
  it('contributes its value to the FormGroup', async () => {
    // Arrange
    const fixture = await createFixture(SelectReactiveMixTest);
    const trigger = findTrigger(fixture);

    // Assert
    expect(trigger.textContent?.trim()).toBe('Starter');
    expect(fixture.componentInstance.checkout.value).toEqual({
      name: 'Ada',
      plan: 'starter',
    });
  });

  it('propagates a selection into the FormGroup value', async () => {
    // Arrange
    const fixture = await createFixture(SelectReactiveMixTest);

    // Act
    pickOption(fixture, 1);

    // Assert
    expect(fixture.componentInstance.checkout.value.plan).toBe('team');
  });

  it('renders a value set through the control API', async () => {
    // Arrange
    const fixture = await createFixture(SelectReactiveMixTest);

    // Act
    fixture.componentInstance.plan.setValue('team');
    fixture.detectChanges();

    // Assert
    expect(findTrigger(fixture).textContent?.trim()).toBe('Team');
  });

  it('propagates touched and validity into the FormGroup', async () => {
    // Arrange
    const fixture = await createFixture(SelectReactiveMixTest);
    const trigger = findTrigger(fixture);

    // Assert
    expect(fixture.componentInstance.plan.touched).toBe(false);
    expect(fixture.componentInstance.checkout.valid).toBe(true);

    // Act: open then close the listbox
    trigger.click();
    fixture.detectChanges();
    trigger.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    );
    fixture.detectChanges();
    await Promise.resolve();

    // Assert
    expect(fixture.componentInstance.plan.touched).toBe(true);

    // Act: empty a required control
    fixture.componentInstance.plan.setValue(null);
    fixture.detectChanges();

    // Assert
    expect(fixture.componentInstance.plan.invalid).toBe(true);
    expect(fixture.componentInstance.checkout.invalid).toBe(true);
  });
});

async function createSelectFixture(): Promise<
  ComponentFixture<SelectModelTest>
> {
  await TestBed.configureTestingModule({
    imports: [SelectModelTest],
  }).compileComponents();

  const fixture = TestBed.createComponent(SelectModelTest);
  fixture.detectChanges();

  return fixture;
}

async function createSelectInFieldFixture(): Promise<
  ComponentFixture<SelectInFieldTest>
> {
  await TestBed.configureTestingModule({
    imports: [SelectInFieldTest],
  }).compileComponents();

  const fixture = TestBed.createComponent(SelectInFieldTest);
  fixture.detectChanges();

  return fixture;
}

async function createFixture<T>(component: {
  new (): T;
}): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [component],
  }).compileComponents();

  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();

  return fixture;
}

function pickOption(fixture: ComponentFixture<unknown>, index: number): void {
  findTrigger(fixture).click();
  fixture.detectChanges();

  const options = Array.from(
    fixture.nativeElement.querySelectorAll('[role="option"]')
  ) as HTMLButtonElement[];
  options[index].click();
  fixture.detectChanges();
}

function findTrigger(fixture: ComponentFixture<unknown>): HTMLButtonElement {
  return fixture.nativeElement.querySelector(
    'button[aria-haspopup="listbox"]'
  ) as HTMLButtonElement;
}
