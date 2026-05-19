import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbInputGroup } from '../input-group/input-group';
import { NbInputPrefix } from '../input-group/input-group-prefix';
import { NbSelectComponent } from './select';
import { NbSelect } from './select.directive';
import { NbSelectOption } from './select-option';

@Component({
  standalone: true,
  imports: [NbSelectComponent, NbSelectOption],
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
class SelectTestComponent {}

@Component({
  standalone: true,
  imports: [NbSelectComponent, NbSelectOption],
  template: `
    <nb-select placeholder="Select location" defaultValue="worldwide">
      <nb-select-option label="Select location"
        >Select location</nb-select-option
      >
      <nb-select-option value="worldwide" label="Worldwide"
        >Worldwide</nb-select-option
      >
    </nb-select>
  `,
})
class SelectWithResetOptionTestComponent {}

describe('NbSelectComponent', () => {
  it('uses the same focus treatment as inputs and textareas', async () => {
    const fixture = await createFixture(SelectTestComponent);
    const select = fixture.nativeElement.querySelector(
      'nb-select'
    ) as HTMLElement;

    expect(select.className).toContain('focus-within:ring-2');
    expect(select.className).toContain(
      'focus-within:ring-(--nb-select-border)'
    );
    expect(select.className).toContain('focus-within:ring-offset-2');
    expect(select.className).toContain('focus-within:shadow-none');
    expect(select.className).not.toContain('focus-within:ring-(--nb-focus');
  });

  it('keeps the border token consistent while open', async () => {
    const fixture = await createFixture(SelectTestComponent);
    const select = fixture.nativeElement.querySelector(
      'nb-select'
    ) as HTMLElement;
    const trigger = fixture.nativeElement.querySelector(
      'button[aria-haspopup="listbox"]'
    ) as HTMLButtonElement;

    trigger.click();
    fixture.detectChanges();

    const listbox = fixture.nativeElement.querySelector(
      '[role="listbox"]'
    ) as HTMLElement;

    expect(select.className).toContain('border-(--nb-select-border)');
    expect(listbox.className).toContain('border-(--nb-select-border)');
    expect(select.className).not.toContain('--nb-select-active-border');
    expect(listbox.className).not.toContain('--nb-select-active-border');
  });

  it('opens on trigger click and selects an option', async () => {
    const fixture = await createFixture(SelectTestComponent);
    const trigger = fixture.nativeElement.querySelector(
      'button[aria-haspopup="listbox"]'
    ) as HTMLButtonElement;

    expect(trigger.textContent?.trim()).toBe('Pick one');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');

    trigger.click();
    fixture.detectChanges();

    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(
      fixture.nativeElement.querySelector('[role="listbox"]')
    ).not.toBeNull();

    const [firstOption] = Array.from(
      fixture.nativeElement.querySelectorAll('[role="option"]')
    ) as HTMLButtonElement[];

    firstOption.click();
    fixture.detectChanges();

    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(fixture.nativeElement.querySelector('[role="listbox"]')).toBeNull();
    expect(trigger.textContent?.replace(/\s+/g, ' ').trim()).toBe('Worldwide');
  });

  it('highlights the reset option without showing a selected icon', async () => {
    const fixture = await createFixture(SelectWithResetOptionTestComponent);
    const trigger = fixture.nativeElement.querySelector(
      'button[aria-haspopup="listbox"]'
    ) as HTMLButtonElement;

    expect(trigger.textContent?.replace(/\s+/g, ' ').trim()).toBe('Worldwide');

    trigger.click();
    fixture.detectChanges();

    let [resetOption, selectedOption] = Array.from(
      fixture.nativeElement.querySelectorAll('[role="option"]')
    ) as HTMLButtonElement[];

    expect(resetOption.getAttribute('aria-selected')).toBe('false');
    expect(resetOption.querySelector('svg')).toBeNull();
    expect(selectedOption.getAttribute('aria-selected')).toBe('true');
    expect(selectedOption.className).toContain('bg-(--nb-select-selected-bg');
    expect(selectedOption.querySelector('svg')).not.toBeNull();

    resetOption.click();
    fixture.detectChanges();

    expect(trigger.textContent?.replace(/\s+/g, ' ').trim()).toBe(
      'Select location'
    );

    trigger.click();
    fixture.detectChanges();

    [resetOption, selectedOption] = Array.from(
      fixture.nativeElement.querySelectorAll('[role="option"]')
    ) as HTMLButtonElement[];

    expect(resetOption.getAttribute('aria-selected')).toBe('true');
    expect(resetOption.className).toContain('bg-(--nb-select-selected-bg');
    expect(resetOption.querySelector('svg')).toBeNull();
    expect(selectedOption.getAttribute('aria-selected')).toBe('false');
  });
});

@Component({
  standalone: true,
  imports: [NbInputGroup, NbInputPrefix, NbSelectComponent, NbSelectOption],
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
class SelectInGroupTestComponent {}

@Component({
  standalone: true,
  imports: [NbInputGroup, NbInputPrefix, NbSelect],
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
class NativeSelectInGroupTestComponent {}

describe('NbSelectComponent inside NbInputGroup', () => {
  it('strips its own border and shadow when inside a group', async () => {
    const fixture = await createFixture(SelectInGroupTestComponent);
    const trigger = fixture.nativeElement.querySelector(
      'button[aria-haspopup="listbox"]'
    ) as HTMLButtonElement;

    expect(trigger.className).not.toContain('border-2');
    expect(trigger.className).not.toContain('shadow-nb');
    expect(trigger.className).not.toContain('rounded-nb');
  });

  it('adopts flex-fill and transparent background when inside a group', async () => {
    const fixture = await createFixture(SelectInGroupTestComponent);
    const trigger = fixture.nativeElement.querySelector(
      'button[aria-haspopup="listbox"]'
    ) as HTMLButtonElement;

    expect(trigger.className).toContain('flex-1');
    expect(trigger.className).toContain('min-w-0');
    expect(trigger.className).toContain('bg-transparent');
  });

  it('uses the same focus-within treatment as grouped inputs', async () => {
    const fixture = await createFixture(SelectInGroupTestComponent);
    const group = fixture.nativeElement.querySelector(
      'nb-input-group'
    ) as HTMLElement;

    expect(group.className).toContain('focus-within:ring-2');
    expect(group.className).toContain('focus-within:ring-(--nb-border)');
    expect(group.className).toContain('focus-within:shadow-none');
    expect(group.className).not.toContain('focus-within:ring-(--nb-focus');
  });

  it('still opens and selects an option when inside a group', async () => {
    const fixture = await createFixture(SelectInGroupTestComponent);
    const trigger = fixture.nativeElement.querySelector(
      'button[aria-haspopup="listbox"]'
    ) as HTMLButtonElement;

    trigger.click();
    fixture.detectChanges();

    expect(trigger.getAttribute('aria-expanded')).toBe('true');

    const [firstOption] = Array.from(
      fixture.nativeElement.querySelectorAll('[role="option"]')
    ) as HTMLButtonElement[];

    firstOption.click();
    fixture.detectChanges();

    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(trigger.textContent?.replace(/\s+/g, ' ').trim()).toBe('Option A');
  });
});

describe('NbSelect directive inside NbInputGroup', () => {
  it('strips its own border and shadow when inside a group', async () => {
    const fixture = await createFixture(NativeSelectInGroupTestComponent);
    const select = fixture.nativeElement.querySelector(
      'select[nbSelect]'
    ) as HTMLSelectElement;

    expect(select.className).toContain('border-0');
    expect(select.className).not.toContain('shadow-nb');
    expect(select.className).not.toContain('rounded-(--nb-select-radius)');
  });

  it('adopts flex-fill and transparent background when inside a group', async () => {
    const fixture = await createFixture(NativeSelectInGroupTestComponent);
    const select = fixture.nativeElement.querySelector(
      'select[nbSelect]'
    ) as HTMLSelectElement;

    expect(select.className).toContain('flex-1');
    expect(select.className).toContain('min-w-0');
    expect(select.className).toContain('bg-transparent');
  });

  it('uses the same focus-within treatment as grouped inputs', async () => {
    const fixture = await createFixture(NativeSelectInGroupTestComponent);
    const group = fixture.nativeElement.querySelector(
      'nb-input-group'
    ) as HTMLElement;

    expect(group.className).toContain('focus-within:ring-2');
    expect(group.className).toContain('focus-within:ring-(--nb-border)');
    expect(group.className).toContain('focus-within:shadow-none');
    expect(group.className).not.toContain('focus-within:ring-(--nb-focus');
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
