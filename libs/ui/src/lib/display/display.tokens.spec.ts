import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbDisplay, type NbDisplaySize } from './nb-display';

@Component({
  imports: [NbDisplay],
  template: `<h1 nbDisplay [size]="size" [fluid]="fluid">Display</h1>`,
})
class DisplayTokenTest {
  size: NbDisplaySize = 'md';
  fluid = false;
}

describe('NbDisplay token surface', () => {
  it('reflects typography state as data attributes, leaving final properties to CSS', async () => {
    // Arrange
    const fixture = await createFixture();
    const display = findDisplay(fixture);

    // Assert
    expect(display.style.getPropertyValue('font-size')).toBe('');
    expect(display.style.getPropertyValue('font-weight')).toBe('');
    expect(display.style.getPropertyValue('color')).toBe('');
    expect(display.style.getPropertyValue('letter-spacing')).toBe('');
    expect(display.style.getPropertyValue('line-height')).toBe('');

    expect(display.getAttribute('data-size')).toBe('md');
    expect(display.getAttribute('data-weight')).toBe('black');
    expect(display.getAttribute('data-tracking')).toBe('tight');
    expect(display.getAttribute('data-leading')).toBe('none');
    expect(display.hasAttribute('data-fluid')).toBe(false);
  });

  it('reflects fluid as a boolean data attribute', async () => {
    // Arrange
    const fixture = await createFixture({ fluid: true });
    const display = findDisplay(fixture);

    // Assert
    expect(display.getAttribute('data-fluid')).toBe('');
    expect(display.style.getPropertyValue('font-size')).toBe('');
  });

  it('allows local --nb-display-size customization since no inline style is written', async () => {
    // Arrange
    const fixture = await createFixture();
    const display = findDisplay(fixture);

    // Act
    display.style.setProperty('--nb-display-size', '6rem');

    // Assert
    expect(display.style.getPropertyValue('--nb-display-size')).toBe('6rem');
  });
});

async function createFixture(
  inputs: Partial<Pick<DisplayTokenTest, 'size' | 'fluid'>> = {}
): Promise<ComponentFixture<DisplayTokenTest>> {
  await TestBed.configureTestingModule({
    imports: [DisplayTokenTest],
  }).compileComponents();

  const fixture = TestBed.createComponent(DisplayTokenTest);
  Object.assign(fixture.componentInstance, inputs);
  fixture.detectChanges();

  return fixture;
}

function findDisplay(
  fixture: ComponentFixture<DisplayTokenTest>
): HTMLElement {
  return fixture.nativeElement.querySelector('[nbDisplay]') as HTMLElement;
}
