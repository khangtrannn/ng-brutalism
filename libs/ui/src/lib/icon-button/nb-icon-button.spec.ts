import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbIconButton } from './nb-icon-button';

@Component({
  imports: [NbIconButton],
  template: `<button nbIconButton aria-label="Close">&times;</button>`,
})
class DefaultIconButtonTest {}

@Component({
  imports: [NbIconButton],
  template: `
    <button
      nbIconButton
      shape="circle"
      size="lg"
      icon="/icons/star.svg"
      aria-label="Favorite"
    ></button>
  `,
})
class IconSlotButtonTest {}

describe('NbIconButton', () => {
  it('defaults to a square, md button with no icon slot', async () => {
    // Arrange
    const fixture = await createFixture(DefaultIconButtonTest);
    const button = findButton(fixture);

    // Assert
    expect(button.getAttribute('data-nb-icon-button')).toBe('');
    expect(button.getAttribute('data-shape')).toBe('square');
    expect(button.getAttribute('data-size')).toBe('md');
    expect(button.querySelector('[nbIcon]')).toBeNull();
  });

  it('renders a decorative icon slot sized to match the size input', async () => {
    // Arrange
    const fixture = await createFixture(IconSlotButtonTest);
    const button = findButton(fixture);
    const icon = button.querySelector('[nbIcon]') as HTMLElement;

    // Assert
    expect(button.getAttribute('data-shape')).toBe('circle');
    expect(button.getAttribute('data-size')).toBe('lg');
    expect(icon).not.toBeNull();
    expect(icon.getAttribute('data-size')).toBe('lg');
    expect(icon.getAttribute('aria-hidden')).toBe('true');
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

function findButton(fixture: ComponentFixture<unknown>): HTMLButtonElement {
  return fixture.nativeElement.querySelector(
    'button[nbIconButton]'
  ) as HTMLButtonElement;
}
