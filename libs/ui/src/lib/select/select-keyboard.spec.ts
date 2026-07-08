import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';

import { NbSelect } from './nb-select';
import { NbSelectOption } from './nb-select-option';

@Component({
  imports: [NbSelect, NbSelectOption],
  template: `
    <nb-select placeholder="Pick one">
      <nb-select-option value="apple" label="Apple">Apple</nb-select-option>
      <nb-select-option value="banana" label="Banana" disabled
        >Banana</nb-select-option
      >
      <nb-select-option value="cherry" label="Cherry"
        >Cherry</nb-select-option
      >
    </nb-select>
  `,
})
class SelectKeyboardTest {}

describe('NbSelect keyboard completion (APG listbox)', () => {
  it('Home/End move focus to the first/last option', async () => {
    // Arrange
    const fixture = await createFixture();
    const options = openAndGetOptions(fixture);

    // Act
    options[1].focus();
    options[1].dispatchEvent(keydown('End'));
    fixture.detectChanges();

    // Assert
    expect(document.activeElement).toBe(options[2]);

    // Act
    options[2].dispatchEvent(keydown('Home'));
    fixture.detectChanges();

    // Assert
    expect(document.activeElement).toBe(options[0]);
  });

  it('typeahead jumps to the option whose label starts with the typed letter', async () => {
    // Arrange
    const fixture = await createFixture();
    const options = openAndGetOptions(fixture);

    // Act
    options[0].focus();
    options[0].dispatchEvent(keydown('c'));
    fixture.detectChanges();

    // Assert
    expect(document.activeElement).toBe(options[2]);
  });

  it('Tab closes the popup without preventing default focus movement', async () => {
    // Arrange
    const fixture = await createFixture();
    const options = openAndGetOptions(fixture);
    const trigger = findTrigger(fixture);

    const event = keydown('Tab');
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    // Act
    options[0].dispatchEvent(event);
    fixture.detectChanges();

    // Assert
    expect(preventDefaultSpy).not.toHaveBeenCalled();
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('Escape on the trigger closes an open listbox', async () => {
    // Arrange
    const fixture = await createFixture();
    const trigger = findTrigger(fixture);

    // Act
    trigger.click();
    fixture.detectChanges();

    // Assert
    expect(trigger.getAttribute('aria-expanded')).toBe('true');

    // Act
    trigger.dispatchEvent(keydown('Escape'));
    fixture.detectChanges();

    // Assert
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('marks a disabled option aria-disabled but keeps it focusable and reachable via arrow keys', async () => {
    // Arrange
    const fixture = await createFixture();
    const options = openAndGetOptions(fixture);

    // Assert
    expect(options[1].hasAttribute('disabled')).toBe(false);
    expect(options[1].getAttribute('aria-disabled')).toBe('true');

    // Act
    options[0].focus();
    options[0].dispatchEvent(keydown('ArrowDown'));
    fixture.detectChanges();

    // Assert
    expect(document.activeElement).toBe(options[1]);
  });

  it('does not select a disabled option on click', async () => {
    // Arrange
    const fixture = await createFixture();
    const trigger = findTrigger(fixture);
    const options = openAndGetOptions(fixture);

    // Act
    options[1].click();
    fixture.detectChanges();

    // Assert
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(trigger.textContent?.trim()).toBe('Pick one');
  });
});

function keydown(key: string): KeyboardEvent {
  return new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
}

async function createFixture(): Promise<ComponentFixture<SelectKeyboardTest>> {
  await TestBed.configureTestingModule({
    imports: [SelectKeyboardTest],
  }).compileComponents();

  const fixture = TestBed.createComponent(SelectKeyboardTest);
  fixture.detectChanges();

  return fixture;
}

function findTrigger(
  fixture: ComponentFixture<SelectKeyboardTest>
): HTMLButtonElement {
  return fixture.nativeElement.querySelector(
    'button[aria-haspopup="listbox"]'
  ) as HTMLButtonElement;
}

function openAndGetOptions(
  fixture: ComponentFixture<SelectKeyboardTest>
): HTMLButtonElement[] {
  findTrigger(fixture).click();
  fixture.detectChanges();

  return Array.from(
    fixture.nativeElement.querySelectorAll('[role="option"]')
  ) as HTMLButtonElement[];
}
