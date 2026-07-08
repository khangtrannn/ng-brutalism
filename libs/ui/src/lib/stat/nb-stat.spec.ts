import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbStat } from './nb-stat';

@Component({
  imports: [NbStat],
  template: `<nb-stat value="4.9" label="Rating" />`,
})
class DefaultStatTest {}

@Component({
  imports: [NbStat],
  template: `<nb-stat value="128" label="Reviews" direction="row" />`,
})
class RowStatTest {}

describe('NbStat', () => {
  it('renders the value and label in the default column direction', async () => {
    // Arrange
    const fixture = await createFixture(DefaultStatTest);
    const stat = findStat(fixture);

    // Assert
    expect(stat.getAttribute('data-direction')).toBe('column');
    expect(
      stat.querySelector('[data-slot="stat-value"]')?.textContent?.trim()
    ).toBe('4.9');
    expect(
      stat.querySelector('[data-slot="stat-label"]')?.textContent?.trim()
    ).toBe('Rating');
  });

  it('reflects the direction input as a data attribute', async () => {
    // Arrange
    const fixture = await createFixture(RowStatTest);

    // Assert
    expect(findStat(fixture).getAttribute('data-direction')).toBe('row');
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

function findStat(fixture: ComponentFixture<unknown>): HTMLElement {
  return fixture.nativeElement.querySelector('nb-stat') as HTMLElement;
}
