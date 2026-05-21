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
  it('declares the expected default tokens on the base host', async () => {
    const fixture = await createFixture(SelectTokenTest);
    const select = findCustomSelect(fixture);
    const cls = select.className;

    expect(cls).toContain(
      '[--nb-select-bg:var(--nb-input-bg,var(--nb-field-bg))]'
    );
    expect(cls).toContain('[--nb-select-fg:var(--nb-foreground)]');
    expect(cls).toContain('[--nb-select-border:var(--nb-border)]');
    expect(cls).toContain('[--nb-select-radius:var(--nb-radius)]');
    expect(cls).toContain('[--nb-select-listbox-bg:var(--nb-select-bg)]');
  });

  it('reads its scoped tokens instead of global tokens directly', async () => {
    const fixture = await createFixture(SelectTokenTest);
    const select = findCustomSelect(fixture);
    const trigger = findTrigger(fixture);
    const cls = select.className;

    expect(cls).toContain('bg-(--nb-select-bg)');
    expect(cls).toContain('border-(--nb-select-border)');
    expect(cls).toContain('rounded-(--nb-select-radius)');
    expect(cls).toContain('focus-within:ring-(--nb-select-border)');
    expect(trigger.className).toContain('text-(--nb-select-fg)');
    expect(findTriggerText(fixture).className).toContain('text-gray-400');
    expect(cls).not.toContain('bg-(--nb-input-bg');
    expect(cls).not.toContain('bg-(--nb-field-bg)');
    expect(cls).not.toContain('border-(--nb-border)');
    expect(cls).not.toContain('rounded-nb');
  });

  it('uses the scoped listbox background token', async () => {
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

    expect(cls).toContain('bg-(--nb-select-listbox-bg)');
    expect(cls).toContain('border-(--nb-select-border)');
    expect(cls).toContain('rounded-b-(--nb-select-radius)');
    expect(optionCls).toContain('text-(--nb-select-fg)');
    expect(optionCls).toContain('focus-visible:ring-(--nb-select-border)');
    expect(optionCls).not.toContain('--nb-select-selected-bg');
    expect(optionCls).not.toContain('--nb-select-option-hover-bg');
    expect(cls).not.toContain('bg-(--nb-surface');
    expect(cls).not.toContain('border-(--nb-border)');
    expect(cls).not.toContain('rounded-b-nb');
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
    expect(cls).toContain('border-2');
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
    expect(value.className).not.toContain('text-(--nb-select-fg)');
  });
});

describe('NbNativeSelect directive token surface', () => {
  it('declares the expected default tokens on the base host', async () => {
    const fixture = await createFixture(NativeSelectTokenTest);
    const select = findNativeSelect(fixture);
    const cls = select.className;

    expect(cls).toContain(
      '[--nb-select-bg:var(--nb-input-bg,var(--nb-field-bg))]'
    );
    expect(cls).toContain('[--nb-select-fg:var(--nb-foreground)]');
    expect(cls).toContain('[--nb-select-border:var(--nb-border)]');
    expect(cls).toContain('[--nb-select-radius:var(--nb-radius)]');
  });

  it('reads its scoped tokens instead of global tokens directly', async () => {
    const fixture = await createFixture(NativeSelectTokenTest);
    const select = findNativeSelect(fixture);
    const cls = select.className;

    expect(cls).toContain('bg-(--nb-select-bg)');
    expect(cls).toContain('text-(--nb-select-fg)');
    expect(cls).toContain('border-(--nb-select-border)');
    expect(cls).toContain('rounded-(--nb-select-radius)');
    expect(cls).toContain('focus-visible:ring-(--nb-select-border)');
    expect(cls).not.toContain('bg-(--nb-input-bg');
    expect(cls).not.toContain('text-(--nb-foreground)');
    expect(cls).not.toContain('border-(--nb-border)');
    expect(cls).not.toContain('rounded-nb');
  });

  it('does not regress the default native select class shape', async () => {
    const fixture = await createFixture(NativeSelectTokenTest);
    const select = findNativeSelect(fixture);
    const cls = select.className;

    expect(cls).toContain('flex');
    expect(cls).toContain('border-2');
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
