import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbSection } from './nb-section';

@Component({
  imports: [NbSection],
  template: `<div nbSection>Default section</div>`,
})
class DefaultSectionTest {}

@Component({
  imports: [NbSection],
  template: `
    <div nbSection padding="lg" divider="top">
      <span>Footer</span>
    </div>
  `,
})
class TopDividerSectionTest {}

@Component({
  imports: [NbSection],
  template: `
    <div nbSection divider="block" dividerStyle="dashed" padding="xl">
      <span>Block dashed</span>
    </div>
  `,
})
class DashedBlockSectionTest {}

@Component({
  imports: [NbSection],
  template: `
    <div nbSection layout="between" align="center" padding="md">
      <span>Title</span>
      <span>Tag</span>
    </div>
  `,
})
class BetweenLayoutSectionTest {}

@Component({
  imports: [NbSection],
  template: `<div nbSection padding="lg" flush>Flush</div>`,
})
class FlushSectionTest {}

describe('NbSection', () => {
  it('applies default classes and metadata', async () => {
    // Arrange
    const fixture = await createFixture(DefaultSectionTest);
    const section = fixture.nativeElement.querySelector(
      '[nbSection]'
    ) as HTMLElement;

    // Assert
    expect(section.getAttribute('data-nb-section')).toBe('');
    expect(section.getAttribute('data-padding')).toBeNull();
    expect(section.getAttribute('data-divider')).toBe('none');
    expect(section.getAttribute('data-divider-style')).toBe('solid');
    expect(section.getAttribute('data-layout')).toBe('default');
    expect(section.getAttribute('data-align')).toBe('stretch');
    expect(section.getAttribute('data-flush')).toBeNull();
    expect(section.className).toBe('');
    expect(section.className).not.toMatch(/(?:^|\s)nb-padding(?:\s|$)/);
    expect(section.style.getPropertyValue('padding')).toBe('');
    expect(section.style.getPropertyValue('--nb-section-padding')).toBe('');
    expect(section.style.cssText).not.toContain('--nb-resolved');
    expect(section.className).not.toContain('border-t-');
  });

  it('renders a top divider with the configured padding', async () => {
    // Arrange
    const fixture = await createFixture(TopDividerSectionTest);
    const section = fixture.nativeElement.querySelector(
      '[nbSection]'
    ) as HTMLElement;

    // Assert
    expect(section.getAttribute('data-divider')).toBe('top');
    expect(section.style.getPropertyValue('padding')).toBe('');
    expect(section.style.getPropertyValue('--nb-section-padding')).toBe(
      'var(--nb-padding-lg)'
    );
    expect(section.className).toBe('');
  });

  it('maps block divider with dashed style', async () => {
    // Arrange
    const fixture = await createFixture(DashedBlockSectionTest);
    const section = fixture.nativeElement.querySelector(
      '[nbSection]'
    ) as HTMLElement;

    // Assert
    expect(section.getAttribute('data-divider')).toBe('block');
    expect(section.getAttribute('data-divider-style')).toBe('dashed');
    expect(section.style.getPropertyValue('padding')).toBe('');
    expect(section.style.getPropertyValue('--nb-section-padding')).toBe(
      'var(--nb-padding-xl)'
    );
    expect(section.className).toBe('');
    expect(section.className).not.toContain('border-solid');
  });

  it('switches to flex with justify-between and align-items mapping', async () => {
    // Arrange
    const fixture = await createFixture(BetweenLayoutSectionTest);
    const section = fixture.nativeElement.querySelector(
      '[nbSection]'
    ) as HTMLElement;

    // Assert
    expect(section.getAttribute('data-layout')).toBe('between');
    expect(section.getAttribute('data-align')).toBe('center');
    expect(section.className).toBe('');
    expect(section.className).not.toContain('block');
  });

  it('applies negative inline margins when flush is set', async () => {
    // Arrange
    const fixture = await createFixture(FlushSectionTest);
    const section = fixture.nativeElement.querySelector(
      '[nbSection]'
    ) as HTMLElement;

    // Assert
    expect(section.getAttribute('data-flush')).toBe('');
    expect(section.className).toBe('');
    expect(section.style.getPropertyValue('margin-inline')).toBe('');
    expect(section.style.getPropertyValue('--nb-section-padding')).toBe(
      'var(--nb-padding-lg)'
    );
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
