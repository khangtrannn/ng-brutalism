import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbChip, NbChipGroup } from './nb-chip';

@Component({
  imports: [NbChip],
  template: `<span nbChip>New</span>`,
})
class DefaultChipTest {}

@Component({
  imports: [NbChip],
  template: `<span nbChip size="lg" icon="/icons/star.svg">Featured</span>`,
})
class IconChipTest {}

@Component({
  imports: [NbChipGroup, NbChip],
  template: `
    <div nbChipGroup direction="vertical" align="center">
      <span nbChip>A</span>
      <span nbChip>B</span>
    </div>
  `,
})
class ChipGroupTest {}

describe('NbChip', () => {
  it('renders projected content without an icon slot by default', async () => {
    const fixture = await createFixture(DefaultChipTest);
    const chip = fixture.nativeElement.querySelector(
      'span[nbChip]'
    ) as HTMLElement;

    expect(chip.getAttribute('data-nb-chip')).toBe('');
    expect(chip.textContent?.trim()).toBe('New');
    expect(chip.querySelector('[nbIcon]')).toBeNull();
  });

  it('renders a leading icon in mask mode, decorative, when icon is set', async () => {
    const fixture = await createFixture(IconChipTest);
    const icon = fixture.nativeElement.querySelector('[nbIcon]') as HTMLElement;

    expect(icon).not.toBeNull();
    expect(icon.getAttribute('aria-hidden')).toBe('true');
    expect(icon.getAttribute('data-size')).toBe('sm');
  });

  it('writes the size input to the shared --nb-chip-padding variable', async () => {
    const fixture = await createFixture(IconChipTest);
    const chip = fixture.nativeElement.querySelector(
      'span[nbChip]'
    ) as HTMLElement;

    expect(chip.style.getPropertyValue('--nb-chip-padding')).toBe(
      '0.5rem 1rem'
    );
  });
});

describe('NbChipGroup', () => {
  it('reflects direction and align as data attributes', async () => {
    const fixture = await createFixture(ChipGroupTest);
    const group = fixture.nativeElement.querySelector(
      '[nbChipGroup]'
    ) as HTMLElement;

    expect(group.getAttribute('data-direction')).toBe('vertical');
    expect(group.getAttribute('data-align')).toBe('center');
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
