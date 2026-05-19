import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbInputGroup } from '../input-group/input-group';
import { NbInputPrefix } from '../input-group/input-group-prefix';
import { NbSelectComponent } from './select';
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
      <nb-select-option label="Select location">Select location</nb-select-option>
      <nb-select-option value="worldwide" label="Worldwide">Worldwide</nb-select-option>
    </nb-select>
  `,
})
class SelectWithResetOptionTestComponent {}

describe('NbSelectComponent', () => {
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
    expect(fixture.nativeElement.querySelector('[role="listbox"]')).not.toBeNull();

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
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24"></svg>
      </span>
      <nb-select placeholder="Pick one">
        <nb-select-option value="a" label="Option A">Option A</nb-select-option>
        <nb-select-option value="b" label="Option B">Option B</nb-select-option>
      </nb-select>
    </nb-input-group>
  `,
})
class SelectInGroupTestComponent {}

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

async function createFixture<T>(component: new () => T): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [component],
  }).compileComponents();

  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();

  return fixture;
}
