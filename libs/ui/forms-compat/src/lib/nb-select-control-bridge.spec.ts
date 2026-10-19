import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { describe, expect, it } from 'vitest';

import { NbSelect, NbSelectOption } from '@ng-brutalism/ui';
import type { NbSelectValue } from '@ng-brutalism/ui';

import { NbSelectControlBridge } from './nb-select-control-bridge';
import {
  NB_ERROR_STATE_MATCHER,
  type NbErrorStateMatcherContext,
} from './nb-error-state-matcher';

@Component({
  imports: [NbSelect, NbSelectOption, NbSelectControlBridge, ReactiveFormsModule],
  template: `
    <nb-select [formControl]="plan" placeholder="Pick one">
      <nb-select-option value="starter" label="Starter"
        >Starter</nb-select-option
      >
      <nb-select-option value="team" label="Team">Team</nb-select-option>
    </nb-select>
  `,
})
class SelectFormControlTest {
  readonly plan = new FormControl<NbSelectValue | null>('starter', {
    validators: Validators.required,
  });
}

@Component({
  imports: [NbSelect, NbSelectOption, NbSelectControlBridge, ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <nb-select formControlName="plan" placeholder="Pick one">
        <nb-select-option value="starter" label="Starter"
          >Starter</nb-select-option
        >
        <nb-select-option value="team" label="Team">Team</nb-select-option>
      </nb-select>
      <button type="submit">Submit</button>
    </form>
  `,
})
class SelectFormControlNameTest {
  readonly form = new FormGroup({
    plan: new FormControl<NbSelectValue | null>('starter', {
      validators: Validators.required,
    }),
  });
}

@Component({
  imports: [NbSelect, NbSelectOption, NbSelectControlBridge, FormsModule],
  template: `
    <nb-select [(ngModel)]="plan" placeholder="Pick one">
      <nb-select-option value="starter" label="Starter"
        >Starter</nb-select-option
      >
      <nb-select-option value="team" label="Team">Team</nb-select-option>
    </nb-select>
  `,
})
class SelectNgModelTest {
  plan: NbSelectValue | null = 'starter';
}

@Component({
  imports: [NbSelect, NbSelectOption, NbSelectControlBridge, FormsModule],
  template: `
    <form>
      <nb-select
        name="plan"
        required
        [(ngModel)]="plan"
        placeholder="Pick one"
      >
        <nb-select-option value="starter" label="Starter"
          >Starter</nb-select-option
        >
      </nb-select>
      <button type="submit">Submit</button>
    </form>
  `,
})
class SelectNgModelFormTest {
  plan: NbSelectValue | null = null;
}

@Component({
  imports: [NbSelect, NbSelectOption, NbSelectControlBridge, ReactiveFormsModule],
  providers: [
    {
      provide: NB_ERROR_STATE_MATCHER,
      useValue: {
        isErrorState: ({ control }: NbErrorStateMatcherContext) =>
          !!(control?.invalid && control.dirty),
      },
    },
  ],
  template: `
    <nb-select [formControl]="plan" placeholder="Pick one">
      <nb-select-option value="starter" label="Starter"
        >Starter</nb-select-option
      >
    </nb-select>
  `,
})
class SelectCustomMatcherTest {
  readonly plan = new FormControl<NbSelectValue | null>(null, {
    validators: Validators.required,
  });
}

describe('NbSelectControlBridge with formControl', () => {
  it('reflects the initial control value', async () => {
    const fixture = await createFixture(SelectFormControlTest);

    expect(findTrigger(fixture).textContent?.trim()).toBe('Starter');
  });

  it('propagates a selection into the control value', async () => {
    const fixture = await createFixture(SelectFormControlTest);

    pickOption(fixture, 1);

    expect(fixture.componentInstance.plan.value).toBe('team');
  });

  it('renders a value written through the control API', async () => {
    const fixture = await createFixture(SelectFormControlTest);

    fixture.componentInstance.plan.setValue('team');
    fixture.detectChanges();

    expect(findTrigger(fixture).textContent?.trim()).toBe('Team');
  });

  it('does not mark the control dirty when the control API writes a value', async () => {
    const fixture = await createFixture(SelectFormControlTest);

    fixture.componentInstance.plan.setValue('team');
    fixture.detectChanges();

    expect(fixture.componentInstance.plan.dirty).toBe(false);
  });

  it('disables the trigger via setDisabledState when the control is disabled', async () => {
    const fixture = await createFixture(SelectFormControlTest);
    const trigger = findTrigger(fixture);

    expect(trigger.disabled).toBe(false);

    fixture.componentInstance.plan.disable();
    fixture.detectChanges();

    expect(trigger.disabled).toBe(true);
  });

  it('marks the control touched when the listbox closes', async () => {
    const fixture = await createFixture(SelectFormControlTest);
    const trigger = findTrigger(fixture);

    expect(fixture.componentInstance.plan.touched).toBe(false);

    trigger.click();
    fixture.detectChanges();
    trigger.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    );
    fixture.detectChanges();
    await Promise.resolve();

    expect(fixture.componentInstance.plan.touched).toBe(true);
  });

  it('reflects invalid once the control is invalid and touched', async () => {
    const fixture = await createFixture(SelectFormControlTest);
    const trigger = findTrigger(fixture);

    fixture.componentInstance.plan.setValue(null);
    fixture.detectChanges();

    // Invalid, but not yet touched — should not surface as aria-invalid.
    expect(trigger.getAttribute('aria-invalid')).toBeNull();

    fixture.componentInstance.plan.markAsTouched();
    fixture.detectChanges();

    expect(trigger.getAttribute('aria-invalid')).toBe('true');
  });
});

describe('NbSelectControlBridge with formControlName', () => {
  it('propagates a selection into the named control', async () => {
    const fixture = await createFixture(SelectFormControlNameTest);

    pickOption(fixture, 1);

    expect(fixture.componentInstance.form.controls.plan.value).toBe('team');
  });

  it('reflects values written through the named control API', async () => {
    const fixture = await createFixture(SelectFormControlNameTest);

    fixture.componentInstance.form.controls.plan.setValue('team');
    fixture.detectChanges();

    expect(findTrigger(fixture).textContent?.trim()).toBe('Team');
  });

  it('reflects invalid after parent form submission', async () => {
    const fixture = await createFixture(SelectFormControlNameTest);
    const trigger = findTrigger(fixture);

    fixture.componentInstance.form.controls.plan.setValue(null);
    fixture.detectChanges();

    expect(trigger.getAttribute('aria-invalid')).toBeNull();

    findForm(fixture).dispatchEvent(new Event('submit', { bubbles: true }));
    fixture.detectChanges();

    expect(trigger.getAttribute('aria-invalid')).toBe('true');
  });
});

describe('NbSelectControlBridge with [(ngModel)]', () => {
  it('reflects the initial model value', async () => {
    const fixture = await createFixture(SelectNgModelTest);

    expect(findTrigger(fixture).textContent?.trim()).toBe('Starter');
  });

  it('propagates a selection back into the bound property', async () => {
    const fixture = await createFixture(SelectNgModelTest);

    pickOption(fixture, 1);

    expect(fixture.componentInstance.plan).toBe('team');
  });

  it('reflects invalid after template form submission', async () => {
    const fixture = await createFixture(SelectNgModelFormTest);
    const trigger = findTrigger(fixture);

    expect(trigger.getAttribute('aria-invalid')).toBeNull();

    findForm(fixture).dispatchEvent(new Event('submit', { bubbles: true }));
    fixture.detectChanges();

    expect(trigger.getAttribute('aria-invalid')).toBe('true');
  });
});

describe('NbSelectControlBridge with a custom error matcher', () => {
  it('uses the configured matcher instead of the default touched/submitted timing', async () => {
    const fixture = await createFixture(SelectCustomMatcherTest);
    const trigger = findTrigger(fixture);

    fixture.componentInstance.plan.markAsTouched();
    fixture.detectChanges();

    expect(trigger.getAttribute('aria-invalid')).toBeNull();

    fixture.componentInstance.plan.markAsDirty();
    fixture.detectChanges();

    expect(trigger.getAttribute('aria-invalid')).toBe('true');
  });
});

async function createFixture<T>(component: {
  new (): T;
}): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [component],
  }).compileComponents();

  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();

  // `NgModel` pushes its initial value into the control via a resolved-promise
  // microtask (`_updateValue`), not synchronously during the first CD pass — flush
  // it and re-render so `[(ngModel)]` fixtures reflect the initial value too.
  await Promise.resolve();
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

function findForm(fixture: ComponentFixture<unknown>): HTMLFormElement {
  return fixture.nativeElement.querySelector('form') as HTMLFormElement;
}
