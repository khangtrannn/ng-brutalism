import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbSelect } from './nb-select';
import { NbNativeSelect } from './nb-native-select';
import { NbSelectOption } from './nb-select-option';

@Component({
  imports: [NbSelect, NbSelectOption],
  template: `
    <nb-select placeholder="Pick one">
      <nb-select-option value="starter" label="Starter"
        >Starter</nb-select-option
      >
      <nb-select-option value="team" label="Team">Team</nb-select-option>
    </nb-select>
  `,
})
class SelectTokenTest {}

@Component({
  imports: [NbNativeSelect],
  template: `
    <select nbSelect aria-label="Plan">
      <option value="" disabled selected>Pick one</option>
      <option value="starter">Starter</option>
      <option value="team">Team</option>
    </select>
  `,
})
class NativeSelectTokenTest {}

describe('NbSelect token surface', () => {
  it('does not emit legacy capability marker classes', async () => {
    const fixture = await createFixture(SelectTokenTest);
    const select = findCustomSelect(fixture);

    expect(select.className).not.toMatch(/(?:^|\s)nb-tone(?:\s|$)/);
    expect(select.className).not.toMatch(/(?:^|\s)nb-border-width(?:\s|$)/);
  });

  it('leaves default visuals to CSS token fallbacks', async () => {
    const fixture = await createFixture(SelectTokenTest);
    const select = findCustomSelect(fixture);

    expect(select.style.getPropertyValue('background-color')).toBe('');
    expect(select.style.getPropertyValue('color')).toBe('');
    expect(select.style.getPropertyValue('border-color')).toBe('');
    expect(select.style.cssText).not.toContain('--nb-resolved');
  });

  it('keeps radius as a local class token only', async () => {
    const fixture = await createFixture(SelectTokenTest);
    const cls = findCustomSelect(fixture).className;

    expect(cls).not.toContain('--nb-resolved');
    expect(cls).not.toContain('[--nb-select-fg:');
    expect(cls).not.toContain('[--nb-select-border:');
    expect(cls).not.toContain('[--nb-select-listbox-bg:');
    expect(cls).toContain('[--nb-select-radius:var(--nb-radius)]');
  });

  it('reads scoped tokens instead of global tokens directly', async () => {
    const fixture = await createFixture(SelectTokenTest);
    const select = findCustomSelect(fixture);
    const trigger = findTrigger(fixture);

    expect(trigger.className).toContain(
      'text-[var(--nb-select-fg,var(--nb-surface-foreground))]'
    );
    expect(findTriggerText(fixture).className).toContain('text-gray-400');
    expect(select.className).not.toContain('bg-(--nb-input-bg');
    expect(select.className).not.toContain('bg-(--nb-field-bg)');
  });

  it('uses the scoped listbox background and border tokens', async () => {
    const fixture = await createFixture(SelectTokenTest);
    findTrigger(fixture).click();
    fixture.detectChanges();

    const listbox = fixture.nativeElement.querySelector(
      '[role="listbox"]'
    ) as HTMLElement;
    const option = fixture.nativeElement.querySelector(
      '[role="option"]'
    ) as HTMLButtonElement;
    const cls = listbox.className;
    const optionCls = option.className;

    expect(cls).toContain(
      'bg-[var(--nb-select-listbox-bg,var(--nb-select-bg,var(--nb-surface)))]'
    );
    expect(cls).toContain(
      'border-[var(--nb-select-border-color,var(--nb-border))]'
    );
    expect(cls).toContain('rounded-b-(--nb-select-radius)');
    expect(optionCls).toContain(
      'text-[var(--nb-select-fg,var(--nb-surface-foreground))]'
    );
    expect(optionCls).toContain(
      'focus-visible:ring-[var(--nb-select-option-focus-ring-color,var(--nb-select-border-color,var(--nb-border)))]'
    );
    expect(cls).not.toContain('bg-(--nb-surface');
    expect(optionCls).not.toContain('text-(--nb-foreground)');
    expect(optionCls).not.toContain('focus-visible:ring-(--nb-border)');
  });

  it('does not regress the default custom select class shape', async () => {
    const fixture = await createFixture(SelectTokenTest);
    const select = findCustomSelect(fixture);
    const trigger = findTrigger(fixture);
    const cls = select.className;

    expect(cls).toContain('relative');
    expect(cls).toContain('block');
    expect(cls).toContain('w-full');
    expect(cls).toContain('shadow-nb');
    expect(cls).toContain('focus-within:outline-none');
    expect(cls).toContain('focus-within:ring-2');
    expect(cls).toContain('focus-within:ring-offset-2');
    expect(cls).toContain('focus-within:shadow-none');
    expect(trigger.className).toContain('font-mono');
    expect(trigger.className).toContain('font-bold');
    expect(trigger.className).toContain('bg-transparent');
  });

  it('uses the same placeholder color as inputs and textareas', async () => {
    const fixture = await createFixture(SelectTokenTest);
    const value = findTriggerText(fixture);

    expect(value.textContent?.trim()).toBe('Pick one');
    expect(value.className).toContain('text-gray-400');
    expect(value.className).not.toContain('text-[var(--nb-select-fg');
  });
});

describe('NbNativeSelect directive token surface', () => {
  it('does not emit legacy capability marker classes', async () => {
    const fixture = await createFixture(NativeSelectTokenTest);
    const select = findNativeSelect(fixture);

    expect(select.className).not.toMatch(/(?:^|\s)nb-tone(?:\s|$)/);
    expect(select.className).not.toMatch(/(?:^|\s)nb-border-width(?:\s|$)/);
  });

  it('keeps radius as a local class token only', async () => {
    const fixture = await createFixture(NativeSelectTokenTest);
    const cls = findNativeSelect(fixture).className;

    expect(cls).not.toContain('--nb-resolved');
    expect(cls).not.toContain('[--nb-select-fg:');
    expect(cls).not.toContain('[--nb-select-border:');
    expect(cls).toContain('[--nb-select-radius:var(--nb-radius)]');
  });

  it('reads scoped tokens instead of global tokens directly', async () => {
    const fixture = await createFixture(NativeSelectTokenTest);
    const cls = findNativeSelect(fixture).className;

    expect(cls).toContain('rounded-(--nb-select-radius)');
    expect(cls).toContain(
      'focus-visible:ring-[var(--nb-select-focus-ring-color,var(--nb-select-border-color,var(--nb-border)))]'
    );
    expect(cls).not.toContain('bg-(--nb-input-bg');
    expect(cls).not.toContain('text-(--nb-foreground)');
    expect(cls).not.toContain('border-(--nb-border)');
    expect(cls).not.toContain('rounded-nb');
  });

  it('does not regress the default native select class shape', async () => {
    const fixture = await createFixture(NativeSelectTokenTest);
    const cls = findNativeSelect(fixture).className;

    expect(cls).toContain('flex');
    expect(cls).toContain('font-medium');
    expect(cls).toContain('appearance-none');
    expect(cls).toContain('pr-10');
    expect(cls).toContain('has-[option:disabled:checked]:text-gray-400');
    expect(cls).toContain('disabled:opacity-50');
    expect(cls).toContain('disabled:cursor-not-allowed');
    expect(cls).toContain('shadow-nb');
    expect(cls).toContain('focus-visible:outline-none');
    expect(cls).toContain('focus-visible:ring-2');
    expect(cls).toContain('focus-visible:ring-offset-2');
    expect(cls).toContain('focus-visible:shadow-none');
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

function findCustomSelect(
  fixture: ComponentFixture<SelectTokenTest>
): HTMLElement {
  return fixture.nativeElement.querySelector('nb-select') as HTMLElement;
}

function findTrigger(
  fixture: ComponentFixture<SelectTokenTest>
): HTMLButtonElement {
  return fixture.nativeElement.querySelector(
    'button[aria-haspopup="listbox"]'
  ) as HTMLButtonElement;
}

function findTriggerText(
  fixture: ComponentFixture<SelectTokenTest>
): HTMLSpanElement {
  return findTrigger(fixture).querySelector('span') as HTMLSpanElement;
}

function findNativeSelect(
  fixture: ComponentFixture<NativeSelectTokenTest>
): HTMLSelectElement {
  return fixture.nativeElement.querySelector(
    'select[nbSelect]'
  ) as HTMLSelectElement;
}
