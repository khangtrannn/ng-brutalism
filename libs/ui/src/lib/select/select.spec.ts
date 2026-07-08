import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { NbInputGroup } from '../input-group/nb-input-group';
import { NbInputPrefix } from '../input-group/nb-input-group-prefix';
import { NbSelect } from './nb-select';
import { NbNativeSelect } from './nb-native-select';
import { NbSelectOption } from './nb-select-option';
import type { NbSelectValue } from './select.types';

@Component({
  imports: [NbSelect, NbSelectOption],
  template: `
    <nb-select placeholder="Pick one">
      <nb-select-option value="worldwide" label="Worldwide">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
        </svg>
        Worldwide
      </nb-select-option>
      <nb-select-option value="remote" label="Remote">
        Remote
      </nb-select-option>
    </nb-select>
  `,
})
class SelectTest {}

@Component({
  imports: [NbSelect, NbSelectOption],
  template: `
    <nb-select placeholder="Select location" [value]="'worldwide'">
      <nb-select-option label="Select location"
        >Select location</nb-select-option
      >
      <nb-select-option value="worldwide" label="Worldwide"
        >Worldwide</nb-select-option
      >
    </nb-select>
  `,
})
class SelectWithResetOptionTest {}

@Component({
  imports: [NbSelect, NbSelectOption],
  template: `
    <nb-select placeholder="Pick one" disabled>
      <nb-select-option value="worldwide" label="Worldwide">
        Worldwide
      </nb-select-option>
    </nb-select>
  `,
})
class DisabledSelectTest {}

interface Country {
  id: string;
  name: string;
}

@Component({
  imports: [NbSelect, NbSelectOption],
  template: `
    <nb-select
      placeholder="Pick a country"
      [value]="selected"
      [compareWith]="compareById"
    >
      <nb-select-option [value]="us" label="United States"
        >United States</nb-select-option
      >
      <nb-select-option [value]="ca" label="Canada">Canada</nb-select-option>
    </nb-select>
  `,
})
class SelectObjectValueTest {
  readonly us: Country = { id: 'us', name: 'United States' };
  readonly ca: Country = { id: 'ca', name: 'Canada' };
  readonly selected: Country = { id: 'ca', name: 'Canada' };
  readonly compareById = (a: NbSelectValue | null, b: NbSelectValue | null) =>
    (a as Country | null)?.id === (b as Country | null)?.id;
}

describe('NbSelect', () => {
  it('uses the same focus treatment as inputs and textareas', async () => {
    // Arrange
    const fixture = await createFixture(SelectTest);
    const select = fixture.nativeElement.querySelector(
      'nb-select'
    ) as HTMLElement;

    // Assert
    expect(select.className).toBe('');
    expect(select.getAttribute('data-nb-select')).toBe('');
    expect(select.className).not.toContain('focus-within:ring-(--nb-focus');
  });

  it('keeps the border token consistent while open', async () => {
    // Arrange
    const fixture = await createFixture(SelectTest);
    const select = fixture.nativeElement.querySelector(
      'nb-select'
    ) as HTMLElement;
    const trigger = fixture.nativeElement.querySelector(
      'button[aria-haspopup="listbox"]'
    ) as HTMLButtonElement;

    // Act
    trigger.click();
    fixture.detectChanges();

    const listbox = fixture.nativeElement.querySelector(
      '[role="listbox"]'
    ) as HTMLElement;

    // Assert
    expect(select.className).toBe('');
    expect(listbox.className).toBe('');
    expect(listbox.getAttribute('data-slot')).toBe('select-listbox');
    expect(select.className).not.toContain('--nb-select-active-border');
    expect(listbox.className).not.toContain('--nb-select-active-border');
  });

  it('opens on trigger click and selects an option', async () => {
    // Arrange
    const fixture = await createFixture(SelectTest);
    const trigger = fixture.nativeElement.querySelector(
      'button[aria-haspopup="listbox"]'
    ) as HTMLButtonElement;

    // Assert
    expect(trigger.textContent?.trim()).toBe('Pick one');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');

    // Act
    trigger.click();
    fixture.detectChanges();

    // Assert
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(
      fixture.nativeElement.querySelector('[role="listbox"]')
    ).not.toBeNull();

    // Act
    const [firstOption] = Array.from(
      fixture.nativeElement.querySelectorAll('[role="option"]')
    ) as HTMLButtonElement[];

    firstOption.click();
    fixture.detectChanges();

    // Assert
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(fixture.nativeElement.querySelector('[role="listbox"]')).toBeNull();
    expect(trigger.textContent?.replace(/\s+/g, ' ').trim()).toBe('Worldwide');
  });

  it('closes when a click lands outside the select', async () => {
    // Arrange
    const fixture = await createFixture(SelectTest);
    const trigger = fixture.nativeElement.querySelector(
      'button[aria-haspopup="listbox"]'
    ) as HTMLButtonElement;

    // Act
    trigger.click();
    fixture.detectChanges();

    // Assert
    expect(trigger.getAttribute('aria-expanded')).toBe('true');

    // Act
    document.body.click();
    fixture.detectChanges();

    // Assert
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('highlights the reset option without showing a selected icon', async () => {
    // Arrange
    const fixture = await createFixture(SelectWithResetOptionTest);
    const trigger = fixture.nativeElement.querySelector(
      'button[aria-haspopup="listbox"]'
    ) as HTMLButtonElement;

    // Assert
    expect(trigger.textContent?.replace(/\s+/g, ' ').trim()).toBe('Worldwide');

    // Act
    trigger.click();
    fixture.detectChanges();

    // Assert
    let [resetOption, selectedOption] = Array.from(
      fixture.nativeElement.querySelectorAll('[role="option"]')
    ) as HTMLButtonElement[];

    expect(resetOption.getAttribute('aria-selected')).toBe('false');
    expect(resetOption.querySelector('svg')).toBeNull();
    expect(selectedOption.getAttribute('aria-selected')).toBe('true');
    expect(selectedOption.getAttribute('data-selected')).toBe('');
    expect(selectedOption.querySelector('svg')).not.toBeNull();

    // Act
    resetOption.click();
    fixture.detectChanges();

    // Assert
    expect(trigger.textContent?.replace(/\s+/g, ' ').trim()).toBe(
      'Select location'
    );

    // Act
    trigger.click();
    fixture.detectChanges();

    // Assert
    [resetOption, selectedOption] = Array.from(
      fixture.nativeElement.querySelectorAll('[role="option"]')
    ) as HTMLButtonElement[];

    expect(resetOption.getAttribute('aria-selected')).toBe('true');
    expect(resetOption.getAttribute('data-selected')).toBe('');
    expect(resetOption.querySelector('svg')).toBeNull();
    expect(selectedOption.getAttribute('aria-selected')).toBe('false');
  });

  it('reflects the disabled input on the trigger and host', async () => {
    // Arrange
    const fixture = await createFixture(DisabledSelectTest);
    const select = fixture.nativeElement.querySelector(
      'nb-select'
    ) as HTMLElement;
    const trigger = fixture.nativeElement.querySelector(
      'button[aria-haspopup="listbox"]'
    ) as HTMLButtonElement;

    // Assert
    expect(trigger.disabled).toBe(true);
    expect(select.getAttribute('data-disabled')).toBe('');

    // Act
    trigger.click();
    fixture.detectChanges();

    // Assert
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(fixture.nativeElement.querySelector('[role="listbox"]')).toBeNull();
  });

  it('has no axe violations, closed or open', async () => {
    // Arrange
    const fixture = await createFixture(SelectTest);

    // Assert
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();

    // Act
    const trigger = fixture.nativeElement.querySelector(
      'button[aria-haspopup="listbox"]'
    ) as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();

    // Assert
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });
});

describe('NbSelect with compareWith', () => {
  it('selects an object-valued option by structural equality', async () => {
    // Arrange
    const fixture = await createFixture(SelectObjectValueTest);
    const trigger = fixture.nativeElement.querySelector(
      'button[aria-haspopup="listbox"]'
    ) as HTMLButtonElement;

    // Assert
    expect(trigger.textContent?.replace(/\s+/g, ' ').trim()).toBe('Canada');

    // Act
    trigger.click();
    fixture.detectChanges();

    const options = Array.from(
      fixture.nativeElement.querySelectorAll('[role="option"]')
    ) as HTMLButtonElement[];
    const canada = options.find((option) =>
      option.textContent?.includes('Canada')
    );

    // Assert
    expect(canada?.getAttribute('aria-selected')).toBe('true');
  });
});

@Component({
  imports: [NbInputGroup, NbInputPrefix, NbSelect, NbSelectOption],
  template: `
    <nb-input-group>
      <span nbInputPrefix>
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        ></svg>
      </span>
      <nb-select placeholder="Pick one">
        <nb-select-option value="a" label="Option A">Option A</nb-select-option>
        <nb-select-option value="b" label="Option B">Option B</nb-select-option>
      </nb-select>
    </nb-input-group>
  `,
})
class SelectInGroupTest {}

@Component({
  imports: [NbInputGroup, NbInputPrefix, NbNativeSelect],
  template: `
    <nb-input-group>
      <span nbInputPrefix>
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        ></svg>
      </span>
      <select nbSelect aria-label="Plan">
        <option value="" disabled selected>Pick one</option>
        <option value="starter">Starter</option>
        <option value="team">Team</option>
      </select>
    </nb-input-group>
  `,
})
class NativeSelectInGroupTest {}

describe('NbSelect inside NbInputGroup', () => {
  it('strips its own border and shadow when inside a group', async () => {
    // Arrange
    const fixture = await createFixture(SelectInGroupTest);
    const trigger = fixture.nativeElement.querySelector(
      'button[aria-haspopup="listbox"]'
    ) as HTMLButtonElement;

    // Assert
    expect(trigger.className).not.toContain('border-2');
    expect(trigger.className).not.toContain('shadow-nb');
    expect(trigger.className).not.toContain('rounded-nb');
  });

  it('adopts flex-fill and transparent background when inside a group', async () => {
    // Arrange
    const fixture = await createFixture(SelectInGroupTest);
    const trigger = fixture.nativeElement.querySelector(
      'button[aria-haspopup="listbox"]'
    ) as HTMLButtonElement;

    // Assert
    expect(trigger.className).toBe('');
    expect(trigger.getAttribute('data-slot')).toBe('select-trigger');
  });

  it('uses the same focus-within treatment as grouped inputs', async () => {
    // Arrange
    const fixture = await createFixture(SelectInGroupTest);
    const group = fixture.nativeElement.querySelector(
      'nb-input-group'
    ) as HTMLElement;

    // Assert
    expect(group.className).toBe('');
    expect(group.style.getPropertyValue('--nb-input-group-border')).toBe('');
  });

  it('still opens and selects an option when inside a group', async () => {
    // Arrange
    const fixture = await createFixture(SelectInGroupTest);
    const trigger = fixture.nativeElement.querySelector(
      'button[aria-haspopup="listbox"]'
    ) as HTMLButtonElement;

    // Act
    trigger.click();
    fixture.detectChanges();

    // Assert
    expect(trigger.getAttribute('aria-expanded')).toBe('true');

    // Act
    const [firstOption] = Array.from(
      fixture.nativeElement.querySelectorAll('[role="option"]')
    ) as HTMLButtonElement[];

    firstOption.click();
    fixture.detectChanges();

    // Assert
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(trigger.textContent?.replace(/\s+/g, ' ').trim()).toBe('Option A');
  });
});

describe('NbNativeSelect directive inside NbInputGroup', () => {
  it('strips its own border and shadow when inside a group', async () => {
    // Arrange
    const fixture = await createFixture(NativeSelectInGroupTest);
    const select = fixture.nativeElement.querySelector(
      'select[nbSelect]'
    ) as HTMLSelectElement;

    // Assert
    expect(select.getAttribute('data-in-group')).toBe('');
    expect(select.style.borderWidth).toBe('');
    expect(select.className).not.toContain('shadow-nb');
    expect(select.className).not.toContain('rounded-(--nb-select-radius)');
  });

  it('adopts flex-fill and transparent background when inside a group', async () => {
    // Arrange
    const fixture = await createFixture(NativeSelectInGroupTest);
    const select = fixture.nativeElement.querySelector(
      'select[nbSelect]'
    ) as HTMLSelectElement;

    // Assert
    expect(select.getAttribute('data-in-group')).toBe('');
    expect(select.style.backgroundColor).toBe('');
  });

  it('uses the same focus-within treatment as grouped inputs', async () => {
    // Arrange
    const fixture = await createFixture(NativeSelectInGroupTest);
    const group = fixture.nativeElement.querySelector(
      'nb-input-group'
    ) as HTMLElement;

    // Assert
    expect(group.className).toBe('');
    expect(group.style.getPropertyValue('--nb-input-group-border')).toBe('');
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
