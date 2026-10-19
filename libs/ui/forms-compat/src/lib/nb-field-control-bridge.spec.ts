import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { describe, expect, it } from 'vitest';

import { NbField, NbFieldError, NbInput, NbSelect, NbSelectOption } from '@ng-brutalism/ui';
import type { NbSelectValue } from '@ng-brutalism/ui';

import { NbFieldControlBridge } from './nb-field-control-bridge';
import { NbSelectControlBridge } from './nb-select-control-bridge';
import {
  NB_ERROR_STATE_MATCHER,
  type NbErrorStateMatcherContext,
} from './nb-error-state-matcher';

@Component({
  imports: [
    NbField,
    NbFieldControlBridge,
    NbFieldError,
    NbSelect,
    NbSelectOption,
    NbSelectControlBridge,
    ReactiveFormsModule,
  ],
  template: `
    <nb-field>
      <nb-select [formControl]="plan" placeholder="Pick one">
        <nb-select-option value="starter" label="Starter"
          >Starter</nb-select-option
        >
      </nb-select>
      <p nbFieldError>Plan is required</p>
    </nb-field>
  `,
})
class SelectInFieldTest {
  readonly plan = new FormControl<NbSelectValue | null>(null, {
    validators: Validators.required,
  });
}

@Component({
  imports: [
    NbField,
    NbFieldControlBridge,
    NbFieldError,
    NbInput,
    ReactiveFormsModule,
  ],
  template: `
    <nb-field>
      <input nbInput [formControl]="name" />
      <p nbFieldError>Name is required</p>
    </nb-field>
  `,
})
class NativeInputInFieldTest {
  readonly name = new FormControl('', { validators: Validators.required });
}

@Component({
  imports: [
    NbField,
    NbFieldControlBridge,
    NbFieldError,
    NbInput,
    ReactiveFormsModule,
  ],
  template: `
    <form [formGroup]="form">
      <nb-field>
        <input nbInput formControlName="name" />
        <p nbFieldError>Name is required</p>
      </nb-field>
      <button type="submit">Submit</button>
    </form>
  `,
})
class NativeInputFormControlNameInFieldTest {
  readonly form = new FormGroup({
    name: new FormControl('', { validators: Validators.required }),
  });
}

@Component({
  imports: [
    NbField,
    NbFieldControlBridge,
    NbFieldError,
    NbInput,
    FormsModule,
  ],
  template: `
    <form>
      <nb-field>
        <input nbInput name="name" required [(ngModel)]="name" />
        <p nbFieldError>Name is required</p>
      </nb-field>
      <button type="submit">Submit</button>
    </form>
  `,
})
class NativeInputNgModelInFieldTest {
  name = '';
}

@Component({
  imports: [
    NbField,
    NbFieldControlBridge,
    NbFieldError,
    NbInput,
    ReactiveFormsModule,
  ],
  template: `
    <nb-field>
      <input nbInput type="checkbox" [formControl]="accepted" />
      <p nbFieldError>Accept terms</p>
    </nb-field>
  `,
})
class RequiredTrueInFieldTest {
  readonly accepted = new FormControl(false, {
    nonNullable: true,
    validators: Validators.requiredTrue,
  });
}

@Component({
  imports: [
    NbField,
    NbFieldControlBridge,
    NbFieldError,
    NbInput,
    ReactiveFormsModule,
  ],
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
    <nb-field>
      <input nbInput [formControl]="name" />
      <p nbFieldError>Name is required</p>
    </nb-field>
  `,
})
class CustomMatcherInFieldTest {
  readonly name = new FormControl('', { validators: Validators.required });
}

describe('NbFieldControlBridge with a classic nb-select control', () => {
  it('keeps the error hidden while untouched, even though the control is invalid', async () => {
    const fixture = await createFixture(SelectInFieldTest);

    expect(findError(fixture).hidden).toBe(true);
  });

  it('shows the error once the control is touched', async () => {
    const fixture = await createFixture(SelectInFieldTest);

    fixture.componentInstance.plan.markAsTouched();
    fixture.detectChanges();

    expect(findError(fixture).hidden).toBe(false);
  });

  it('marks the select trigger aria-invalid once touched', async () => {
    const fixture = await createFixture(SelectInFieldTest);

    fixture.componentInstance.plan.markAsTouched();
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector(
      'button[aria-haspopup="listbox"]'
    ) as HTMLButtonElement;
    expect(trigger.getAttribute('aria-invalid')).toBe('true');
  });

  it('hides the error again once the control becomes valid', async () => {
    const fixture = await createFixture(SelectInFieldTest);

    fixture.componentInstance.plan.markAsTouched();
    fixture.componentInstance.plan.setValue('starter');
    fixture.detectChanges();

    expect(findError(fixture).hidden).toBe(true);
  });
});

describe('NbFieldControlBridge with a native nbInput control', () => {
  it('shows the error once the control is touched and invalid', async () => {
    const fixture = await createFixture(NativeInputInFieldTest);

    expect(findError(fixture).hidden).toBe(true);

    fixture.componentInstance.name.markAsTouched();
    fixture.detectChanges();

    expect(findError(fixture).hidden).toBe(false);
  });

  it('shows the error after parent reactive form submission', async () => {
    const fixture = await createFixture(NativeInputFormControlNameInFieldTest);

    expect(findError(fixture).hidden).toBe(true);

    findForm(fixture).dispatchEvent(new Event('submit', { bubbles: true }));
    fixture.detectChanges();

    expect(findError(fixture).hidden).toBe(false);
  });

  it('shows the error after parent template form submission', async () => {
    const fixture = await createFixture(NativeInputNgModelInFieldTest);

    expect(findError(fixture).hidden).toBe(true);

    findForm(fixture).dispatchEvent(new Event('submit', { bubbles: true }));
    fixture.detectChanges();

    expect(findError(fixture).hidden).toBe(false);
  });

  it('treats requiredTrue as required metadata', async () => {
    const fixture = await createFixture(RequiredTrueInFieldTest);

    fixture.componentInstance.accepted.markAsTouched();
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.getAttribute('aria-required')).toBe('true');
    expect(findError(fixture).hidden).toBe(false);
  });

  it('uses the configured matcher for error visibility', async () => {
    const fixture = await createFixture(CustomMatcherInFieldTest);

    fixture.componentInstance.name.markAsTouched();
    fixture.detectChanges();

    expect(findError(fixture).hidden).toBe(true);

    fixture.componentInstance.name.markAsDirty();
    fixture.detectChanges();

    expect(findError(fixture).hidden).toBe(false);
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

  return fixture;
}

function findError(fixture: ComponentFixture<unknown>): HTMLElement {
  return fixture.nativeElement.querySelector('[nbFieldError]') as HTMLElement;
}

function findForm(fixture: ComponentFixture<unknown>): HTMLFormElement {
  return fixture.nativeElement.querySelector('form') as HTMLFormElement;
}
