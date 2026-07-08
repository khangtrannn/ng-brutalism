import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbInput } from '../input/nb-input';
import { NbInputGroup } from './nb-input-group';
import { NbInputPrefix } from './nb-input-group-prefix';
import { NbInputSuffix } from './nb-input-group-suffix';

@Component({
  imports: [NbInput, NbInputGroup, NbInputPrefix, NbInputSuffix],
  template: `
    <nb-input-group>
      <span nbInputPrefix>&#64;</span>
      <input nbInput placeholder="username" />
      <span nbInputSuffix>USD</span>
    </nb-input-group>
  `,
})
class InputGroupTokenTest {}

@Component({
  imports: [NbInput, NbInputGroup, NbInputPrefix, NbInputSuffix],
  template: `
    <nb-input-group>
      <span nbInputPrefix align="stretch">&#64;</span>
      <input nbInput placeholder="username" />
      <span nbInputSuffix align="stretch">USD</span>
    </nb-input-group>
  `,
})
class StretchAlignTest {}

@Component({
  imports: [NbInput, NbInputGroup, NbInputPrefix, NbInputSuffix],
  template: `
    <nb-input-group radius="lg">
      <span nbInputPrefix>&#64;</span>
      <input nbInput placeholder="username" />
      <span nbInputSuffix>USD</span>
    </nb-input-group>
  `,
})
class RadiusInputGroupTest {}

describe('NbInputGroup token surface', () => {
  it('emits no internal styling classes — anatomy lives in styles.css and data-attrs', async () => {
    // Arrange
    const fixture = await createFixture();
    const group = findGroup(fixture);
    const prefix = findPrefix(fixture);
    const suffix = findSuffix(fixture);

    // Assert
    expect(group.className).toBe('');
    expect(prefix.className).toBe('');
    expect(suffix.className).toBe('');
    expect(prefix.getAttribute('data-align')).toBe('center');
    expect(suffix.getAttribute('data-align')).toBe('center');
  });

  it('does not funnel radius/background through local CSS vars — public hooks stay user-owned', async () => {
    // Arrange
    const fixture = await createFixture();
    const group = findGroup(fixture);
    const prefix = findPrefix(fixture);
    const suffix = findSuffix(fixture);

    // Assert
    expect(group.style.getPropertyValue('--nb-input-group-bg')).toBe('');
    expect(group.style.getPropertyValue('--nb-input-group-border')).toBe('');
    expect(group.style.getPropertyValue('--nb-input-group-radius')).toBe('');
    expect(group.style.getPropertyValue('background')).toBe('');
    expect(group.style.getPropertyValue('border-radius')).toBe('');
    expect(prefix.style.getPropertyValue('--nb-input-group-addon-bg')).toBe('');
    expect(prefix.style.getPropertyValue('--nb-input-group-prefix-bg')).toBe('');
    expect(suffix.style.getPropertyValue('--nb-input-group-suffix-bg')).toBe('');
  });

  it('reflects alignment through the data attribute', async () => {
    // Arrange
    const fixture = await createFixture(StretchAlignTest);
    const prefix = findPrefix(fixture);
    const suffix = findSuffix(fixture);

    // Assert
    expect(prefix.getAttribute('data-align')).toBe('stretch');
    expect(suffix.getAttribute('data-align')).toBe('stretch');
    expect(prefix.className).toBe('');
    expect(suffix.className).toBe('');
  });

  it('writes the radius input to the public CSS variable', async () => {
    // Arrange
    const fixture = await createFixture(RadiusInputGroupTest);
    const group = findGroup(fixture);

    // Assert
    expect(group.style.getPropertyValue('--nb-input-group-radius')).toBe(
      'var(--nb-radius-lg)'
    );
    expect(group.style.getPropertyValue('border-radius')).toBe('');
  });
});

async function createFixture<T extends object = InputGroupTokenTest>(
  component: new (...args: never[]) => T = InputGroupTokenTest as never
): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [component],
  }).compileComponents();

  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();

  return fixture;
}

function findGroup(fixture: ComponentFixture<unknown>): HTMLElement {
  return fixture.nativeElement.querySelector('nb-input-group') as HTMLElement;
}

function findPrefix(fixture: ComponentFixture<unknown>): HTMLElement {
  return fixture.nativeElement.querySelector('[nbInputPrefix]') as HTMLElement;
}

function findSuffix(fixture: ComponentFixture<unknown>): HTMLElement {
  return fixture.nativeElement.querySelector('[nbInputSuffix]') as HTMLElement;
}
