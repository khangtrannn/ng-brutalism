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
    <div nbSection padding="lg" border="top">
      <span>Footer</span>
    </div>
  `,
})
class TopBorderSectionTest {}

@Component({
  imports: [NbSection],
  template: `
    <div nbSection border="block" borderStyle="dashed" padding="xl">
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
    const fixture = await createFixture(DefaultSectionTest);
    const section = fixture.nativeElement.querySelector(
      '[nbSection]'
    ) as HTMLElement;

    expect(section.getAttribute('data-nb-section')).toBe('');
    expect(section.getAttribute('data-padding')).toBe('md');
    expect(section.getAttribute('data-border')).toBe('none');
    expect(section.getAttribute('data-border-style')).toBe('solid');
    expect(section.getAttribute('data-layout')).toBe('default');
    expect(section.getAttribute('data-align')).toBe('stretch');
    expect(section.getAttribute('data-flush')).toBeNull();
    expect(section.className).toContain('box-border');
    expect(section.className).toContain('min-w-0');
    expect(section.className).toContain('block');
    expect(section.className).toContain('p-[var(--nb-section-padding)]');
    expect(section.className).toContain('[--nb-section-padding:1rem]');
    expect(section.className).not.toContain('border-t-');
    expect(section.className).not.toContain('items-stretch');
  });

  it('renders a top border with the configured padding', async () => {
    const fixture = await createFixture(TopBorderSectionTest);
    const section = fixture.nativeElement.querySelector(
      '[nbSection]'
    ) as HTMLElement;

    expect(section.getAttribute('data-padding')).toBe('lg');
    expect(section.getAttribute('data-border')).toBe('top');
    expect(section.className).toContain('[--nb-section-padding:1.5rem]');
    expect(section.className).toContain(
      'border-t-(length:--nb-border-width)'
    );
    expect(section.className).toContain('border-(--nb-border)');
    expect(section.className).toContain('border-solid');
  });

  it('maps block border with dashed style', async () => {
    const fixture = await createFixture(DashedBlockSectionTest);
    const section = fixture.nativeElement.querySelector(
      '[nbSection]'
    ) as HTMLElement;

    expect(section.getAttribute('data-border')).toBe('block');
    expect(section.getAttribute('data-border-style')).toBe('dashed');
    expect(section.className).toContain('[--nb-section-padding:2rem]');
    expect(section.className).toContain(
      'border-y-(length:--nb-border-width)'
    );
    expect(section.className).toContain('border-dashed');
    expect(section.className).not.toContain('border-solid');
  });

  it('switches to flex with justify-between and align-items mapping', async () => {
    const fixture = await createFixture(BetweenLayoutSectionTest);
    const section = fixture.nativeElement.querySelector(
      '[nbSection]'
    ) as HTMLElement;

    expect(section.getAttribute('data-layout')).toBe('between');
    expect(section.getAttribute('data-align')).toBe('center');
    expect(section.className).toContain('flex');
    expect(section.className).toContain('justify-between');
    expect(section.className).toContain('items-center');
    expect(section.className).not.toContain('block');
  });

  it('applies negative inline margins when flush is set', async () => {
    const fixture = await createFixture(FlushSectionTest);
    const section = fixture.nativeElement.querySelector(
      '[nbSection]'
    ) as HTMLElement;

    expect(section.getAttribute('data-flush')).toBe('');
    expect(section.className).toContain(
      'mx-[calc(var(--nb-section-padding)*-1)]'
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
