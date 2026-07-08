import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbSplit } from './nb-split';

@Component({
  imports: [NbSplit],
  template: `<div nbSplit>Default split</div>`,
})
class DefaultSplitTest {}

@Component({
  imports: [NbSplit],
  template: `
    <div nbSplit ratio="3:1" gap="2xl" padding="xl" collapse="lg" align="end">
      <span>Main</span>
      <span>Aside</span>
    </div>
  `,
})
class CustomSplitTest {}

@Component({
  imports: [NbSplit],
  template: `
    <div nbSplit ratio="fill:auto">
      <span>Main</span>
      <span>Aside</span>
    </div>
  `,
})
class FillAutoSplitTest {}

@Component({
  imports: [NbSplit],
  template: `
    <div nbSplit collapse="md" separator="solid">
      <span>Main</span>
      <span>Aside</span>
    </div>
  `,
})
class SolidDividerSplitTest {}

@Component({
  imports: [NbSplit],
  template: `
    <div nbSplit collapse="none" separator="dashed">
      <span>Main</span>
      <span>Aside</span>
    </div>
  `,
})
class DashedDividerSplitTest {}

@Component({
  imports: [NbSplit],
  template: `
    <div nbSplit collapse="lg" separator="thick">
      <span>Main</span>
      <span>Aside</span>
    </div>
  `,
})
class ThickDividerSplitTest {}

describe('NbSplit', () => {
  it('applies default split classes and metadata', async () => {
    // Arrange
    const fixture = await createFixture(DefaultSplitTest);
    const split = fixture.nativeElement.querySelector(
      '[nbSplit]'
    ) as HTMLElement;

    // Assert
    expect(split.getAttribute('data-nb-split')).toBe('');
    expect(split.getAttribute('data-ratio')).toBe('1:1');
    expect(split.getAttribute('data-gap')).toBeNull();
    expect(split.getAttribute('data-padding')).toBeNull();
    expect(split.getAttribute('data-collapse')).toBe('md');
    expect(split.getAttribute('data-align')).toBe('stretch');
    expect(split.getAttribute('data-separator')).toBe('none');
    expect(split.className).toBe('');
    expect(split.style.getPropertyValue('gap')).toBe('');
    expect(split.style.getPropertyValue('padding')).toBe('');
    expect(split.style.getPropertyValue('--nb-split-gap')).toBe('');
    expect(split.style.getPropertyValue('--nb-split-padding')).toBe('');
    expect(split.style.cssText).not.toContain('--nb-resolved');
  });

  it('maps ratio, gap, padding, collapse, and alignment', async () => {
    // Arrange
    const fixture = await createFixture(CustomSplitTest);
    const split = fixture.nativeElement.querySelector(
      '[nbSplit]'
    ) as HTMLElement;

    // Assert
    expect(split.getAttribute('data-ratio')).toBe('3:1');
    expect(split.getAttribute('data-collapse')).toBe('lg');
    expect(split.getAttribute('data-align')).toBe('end');
    expect(split.getAttribute('data-separator')).toBe('none');
    expect(split.style.getPropertyValue('gap')).toBe('');
    expect(split.style.getPropertyValue('padding')).toBe('');
    expect(split.style.getPropertyValue('--nb-split-gap')).toBe(
      'var(--nb-space-2xl)'
    );
    expect(split.style.getPropertyValue('--nb-split-padding')).toBe(
      'var(--nb-padding-xl)'
    );
    expect(split.className).toBe('');
  });

  it('sizes the first column to fill and the second to its content', async () => {
    // Arrange
    const fixture = await createFixture(FillAutoSplitTest);
    const split = fixture.nativeElement.querySelector(
      '[nbSplit]'
    ) as HTMLElement;

    // Assert
    expect(split.getAttribute('data-ratio')).toBe('fill:auto');
    expect(split.className).toBe('');
  });

  it('draws a solid separator, hidden until the collapse breakpoint', async () => {
    // Arrange
    const fixture = await createFixture(SolidDividerSplitTest);
    const split = fixture.nativeElement.querySelector(
      '[nbSplit]'
    ) as HTMLElement;

    // Assert
    expect(split.getAttribute('data-separator')).toBe('solid');
    expect(split.getAttribute('data-collapse')).toBe('md');
    expect(split.className).toBe('');
  });

  it('draws a dashed separator that is always visible when it never collapses', async () => {
    // Arrange
    const fixture = await createFixture(DashedDividerSplitTest);
    const split = fixture.nativeElement.querySelector(
      '[nbSplit]'
    ) as HTMLElement;

    // Assert
    expect(split.getAttribute('data-separator')).toBe('dashed');
    expect(split.getAttribute('data-collapse')).toBe('none');
    expect(split.className).toBe('');
  });

  it('draws a thick separator, revealed at the lg breakpoint', async () => {
    // Arrange
    const fixture = await createFixture(ThickDividerSplitTest);
    const split = fixture.nativeElement.querySelector(
      '[nbSplit]'
    ) as HTMLElement;

    // Assert
    expect(split.getAttribute('data-separator')).toBe('thick');
    expect(split.getAttribute('data-collapse')).toBe('lg');
    expect(split.className).toBe('');
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
