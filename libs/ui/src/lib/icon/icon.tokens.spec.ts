import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbIcon, type NbIconSize, type NbIconTone } from './nb-icon';

@Component({
  imports: [NbIcon],
  template: `<span
    nbIcon
    src="/icons/star.svg"
    decorative
    [size]="size"
    [tone]="tone"
  ></span>`,
})
class IconTokenTest {
  size: NbIconSize = 'md';
  tone: NbIconTone | undefined = undefined;
}

describe('NbIcon token surface', () => {
  it('reflects size as a data attribute, leaving width/height to CSS', async () => {
    // Arrange
    const fixture = await createFixture();
    const icon = findIcon(fixture);

    // Assert
    expect(icon.getAttribute('data-size')).toBe('md');
    expect(icon.style.getPropertyValue('width')).toBe('');
    expect(icon.style.getPropertyValue('height')).toBe('');
  });

  it('does not write --nb-icon-color when tone is unset', async () => {
    // Arrange
    const fixture = await createFixture();
    const icon = findIcon(fixture);

    // Assert
    expect(icon.getAttribute('data-icon-tone')).toBeNull();
    expect(icon.style.getPropertyValue('--nb-icon-color')).toBe('');
    expect(icon.style.getPropertyValue('color')).toBe('');
  });

  it('writes --nb-icon-color when tone is explicit', async () => {
    // Arrange
    const fixture = await createFixture({ tone: 'danger' });
    const icon = findIcon(fixture);

    // Assert
    expect(icon.getAttribute('data-icon-tone')).toBe('danger');
    expect(icon.style.getPropertyValue('--nb-icon-color')).toBe(
      'var(--nb-danger)'
    );
  });

  it('reflects an explicit size change as a data attribute', async () => {
    // Arrange
    const fixture = await createFixture({ size: 'xl' });
    const icon = findIcon(fixture);

    // Assert
    expect(icon.getAttribute('data-size')).toBe('xl');
  });
});

async function createFixture(
  inputs: Partial<Pick<IconTokenTest, 'size' | 'tone'>> = {}
): Promise<ComponentFixture<IconTokenTest>> {
  await TestBed.configureTestingModule({
    imports: [IconTokenTest],
  }).compileComponents();

  const fixture = TestBed.createComponent(IconTokenTest);
  Object.assign(fixture.componentInstance, inputs);
  fixture.detectChanges();

  return fixture;
}

function findIcon(fixture: ComponentFixture<IconTokenTest>): HTMLElement {
  return fixture.nativeElement.querySelector('[nbIcon]') as HTMLElement;
}
