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
  imports: [NbSelect, NbSelectOption],
  template: `
    <nb-select placeholder="Pick one" radius="lg" shadow="hard">
      <nb-select-option value="starter" label="Starter"
        >Starter</nb-select-option
      >
      <nb-select-option value="team" label="Team">Team</nb-select-option>
    </nb-select>
  `,
})
class ValueSelectTokenTest {}

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
    expect(select.style.getPropertyValue('--nb-select-radius')).toBe('');
    expect(select.style.getPropertyValue('--nb-select-shadow')).toBe('');
    expect(select.style.getPropertyValue('border-radius')).toBe('');
    expect(select.style.getPropertyValue('box-shadow')).toBe('');
    expect(select.style.cssText).not.toContain('--nb-resolved');
  });

  it('writes radius/shadow inputs to public CSS variables', async () => {
    const fixture = await createFixture(ValueSelectTokenTest);
    const select = findCustomSelect(fixture);

    expect(select.style.getPropertyValue('--nb-select-radius')).toBe(
      'var(--nb-radius-lg, 0.75rem)'
    );
    expect(select.style.getPropertyValue('--nb-select-shadow')).toBe(
      '6px 6px 0 0 var(--nb-shadow)'
    );
    expect(select.style.getPropertyValue('border-radius')).toBe('');
    expect(select.style.getPropertyValue('box-shadow')).toBe('');
  });

  it('keeps radius in CSS instead of local class tokens', async () => {
    const fixture = await createFixture(SelectTokenTest);
    const cls = findCustomSelect(fixture).className;

    expect(cls).not.toContain('--nb-resolved');
    expect(cls).not.toContain('[--nb-select-fg:');
    expect(cls).not.toContain('[--nb-select-border:');
    expect(cls).not.toContain('[--nb-select-listbox-bg:');
    expect(cls).not.toContain('[--nb-select-radius:var(--nb-radius)]');
  });

  it('uses data slots instead of trigger token classes', async () => {
    const fixture = await createFixture(SelectTokenTest);
    const select = findCustomSelect(fixture);
    const trigger = findTrigger(fixture);

    expect(trigger.className).toBe('');
    expect(trigger.getAttribute('data-slot')).toBe('select-trigger');
    expect(findTriggerText(fixture).className).toBe('');
    expect(findTriggerText(fixture).getAttribute('data-placeholder')).toBe('');
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

    expect(cls).toBe('');
    expect(listbox.getAttribute('data-slot')).toBe('select-listbox');
    expect(optionCls).toBe('');
    expect(option.getAttribute('data-slot')).toBe('select-option-button');
    expect(cls).not.toContain('bg-(--nb-surface');
    expect(optionCls).not.toContain('text-(--nb-foreground)');
    expect(optionCls).not.toContain('focus-visible:ring-(--nb-border)');
  });

  it('keeps custom select anatomy out of classes', async () => {
    const fixture = await createFixture(SelectTokenTest);
    const select = findCustomSelect(fixture);
    const trigger = findTrigger(fixture);
    const cls = select.className;

    expect(cls).toBe('');
    expect(select.getAttribute('data-nb-select')).toBe('');
    expect(trigger.className).toBe('');
  });

  it('uses the same placeholder color as inputs and textareas', async () => {
    const fixture = await createFixture(SelectTokenTest);
    const value = findTriggerText(fixture);

    expect(value.textContent?.trim()).toBe('Pick one');
    expect(value.className).toBe('');
    expect(value.getAttribute('data-placeholder')).toBe('');
    expect(value.className).not.toContain('text-[var(--nb-select-fg');
  });
});

describe('NbNativeSelect directive token surface', () => {
  it('emits no internal styling classes — anatomy lives in styles.css and data-attrs', async () => {
    const fixture = await createFixture(NativeSelectTokenTest);
    const select = findNativeSelect(fixture);

    expect(select.className).toBe('');
    expect(select.getAttribute('data-in-group')).toBeNull();
  });

  it('leaves radius and shadow to CSS token fallbacks instead of local class vars', async () => {
    const fixture = await createFixture(NativeSelectTokenTest);
    const select = findNativeSelect(fixture);

    expect(select.style.getPropertyValue('--nb-select-radius')).toBe('');
    expect(select.style.getPropertyValue('border-radius')).toBe('');
    expect(select.style.getPropertyValue('box-shadow')).toBe('');
    expect(select.style.cssText).not.toContain('--nb-resolved');
  });

  it('writes the focus ring color from the tone capability for CSS to consume', async () => {
    const fixture = await createFixture(NativeSelectTokenTest);
    const select = findNativeSelect(fixture);

    // No explicit tone — capability resolves nothing, CSS falls back to public hooks.
    expect(select.style.getPropertyValue('--nb-select-focus-ring-color')).toBe('');
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

function findCustomSelect(fixture: ComponentFixture<unknown>): HTMLElement {
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
