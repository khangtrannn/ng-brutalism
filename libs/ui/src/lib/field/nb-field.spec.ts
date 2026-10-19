import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { NbInput } from '../input/nb-input';
import { NbLabel } from '../label/nb-label';
import { NbField } from './nb-field';
import { NbFieldDescription } from './nb-field-description';
import { NbFieldError } from './nb-field-error';

@Component({
  imports: [NbField, NbFieldDescription, NbFieldError, NbInput, NbLabel],
  template: `
    <nb-field [invalid]="invalid()" [required]="required()">
      <label nbLabel>Email</label>
      <input nbInput type="email" />
      <p nbFieldDescription>We'll never share your email.</p>
      <p nbFieldError>Email is required.</p>
    </nb-field>
  `,
})
class FieldTest {
  readonly invalid = signal(false);
  readonly required = signal(false);
}

describe('NbField', () => {
  it('links the label to the control via for/id', async () => {
    // Arrange
    const fixture = await createFixture();
    const label = findLabel(fixture);
    const input = findInput(fixture);

    // Assert
    expect(label.getAttribute('for')).toBe(input.id);
    expect(input.id).toBeTruthy();
  });

  it('links the description into aria-describedby immediately', async () => {
    // Arrange
    const fixture = await createFixture();
    const input = findInput(fixture);
    const description = findDescription(fixture);

    // Assert
    expect(input.getAttribute('aria-describedby')).toBe(description.id);
    expect(input.getAttribute('aria-invalid')).toBeNull();
  });

  it('adds the error id to aria-describedby and sets aria-invalid when marked invalid', async () => {
    // Arrange
    const fixture = await createFixture();
    const input = findInput(fixture);
    const description = findDescription(fixture);
    const error = findError(fixture);

    expect(error.hidden).toBe(true);

    // Act
    fixture.componentInstance.invalid.set(true);
    fixture.detectChanges();

    // Assert
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-describedby')).toBe(
      `${description.id} ${error.id}`
    );
    expect(error.hidden).toBe(false);
  });

  it('reflects aria-required from the required input', async () => {
    // Arrange
    const fixture = await createFixture();
    const input = findInput(fixture);

    // Act
    fixture.componentInstance.required.set(true);
    fixture.detectChanges();

    // Assert
    expect(input.getAttribute('aria-required')).toBe('true');
  });

  it('has no axe violations, valid or invalid', async () => {
    // Arrange
    const fixture = await createFixture();

    // Assert
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();

    // Act
    fixture.componentInstance.invalid.set(true);
    fixture.detectChanges();

    // Assert
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });
});

async function createFixture(): Promise<ComponentFixture<FieldTest>> {
  await TestBed.configureTestingModule({
    imports: [FieldTest],
  }).compileComponents();

  const fixture = TestBed.createComponent(FieldTest);
  fixture.detectChanges();

  return fixture;
}

function findInput(fixture: ComponentFixture<FieldTest>): HTMLInputElement {
  return fixture.nativeElement.querySelector('input') as HTMLInputElement;
}

function findLabel(fixture: ComponentFixture<FieldTest>): HTMLLabelElement {
  return fixture.nativeElement.querySelector('label') as HTMLLabelElement;
}

function findDescription(
  fixture: ComponentFixture<FieldTest>
): HTMLParagraphElement {
  return fixture.nativeElement.querySelector(
    '[nbFieldDescription]'
  ) as HTMLParagraphElement;
}

function findError(fixture: ComponentFixture<FieldTest>): HTMLParagraphElement {
  return fixture.nativeElement.querySelector(
    '[nbFieldError]'
  ) as HTMLParagraphElement;
}
