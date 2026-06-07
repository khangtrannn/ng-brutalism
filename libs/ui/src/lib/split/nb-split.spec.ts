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
    const fixture = await createFixture(DefaultSplitTest);
    const split = fixture.nativeElement.querySelector(
      '[nbSplit]'
    ) as HTMLElement;

    expect(split.getAttribute('data-nb-split')).toBe('');
    expect(split.getAttribute('data-ratio')).toBe('1:1');
    expect(split.getAttribute('data-gap')).toBe('lg');
    expect(split.getAttribute('data-padding')).toBe('none');
    expect(split.getAttribute('data-collapse')).toBe('md');
    expect(split.getAttribute('data-align')).toBe('stretch');
    expect(split.getAttribute('data-separator')).toBe('none');
    expect(split.className).toContain('grid');
    expect(split.className).toContain('min-w-0');
    expect(split.className).not.toMatch(/(?:^|\s)nb-gap(?:\s|$)/);
    expect(split.className).not.toMatch(/(?:^|\s)nb-padding(?:\s|$)/);
    expect(split.style.getPropertyValue('gap')).toBe('');
    expect(split.style.getPropertyValue('padding')).toBe('');
    expect(split.style.cssText).not.toContain('--nb-resolved');
    expect(split.className).toContain('items-stretch');
    expect(split.className).toContain(
      '[--nb-split-columns:minmax(0,1fr)_minmax(0,1fr)]'
    );
    expect(split.className).toContain('grid-cols-1');
    expect(split.className).toContain(
      'md:grid-cols-[var(--nb-split-columns)]'
    );
    expect(split.className).not.toContain('after:border-r-');
  });

  it('maps ratio, gap, padding, collapse, and alignment', async () => {
    const fixture = await createFixture(CustomSplitTest);
    const split = fixture.nativeElement.querySelector(
      '[nbSplit]'
    ) as HTMLElement;

    expect(split.getAttribute('data-ratio')).toBe('3:1');
    expect(split.getAttribute('data-gap')).toBe('2xl');
    expect(split.getAttribute('data-padding')).toBe('xl');
    expect(split.getAttribute('data-collapse')).toBe('lg');
    expect(split.getAttribute('data-align')).toBe('end');
    expect(split.getAttribute('data-separator')).toBe('none');
    expect(split.style.getPropertyValue('gap')).toBe('2rem');
    expect(split.style.getPropertyValue('padding')).toBe('2rem');
    expect(split.className).toContain('items-end');
    expect(split.className).toContain(
      '[--nb-split-columns:minmax(0,3fr)_minmax(0,1fr)]'
    );
    expect(split.className).toContain('grid-cols-1');
    expect(split.className).toContain(
      'lg:grid-cols-[var(--nb-split-columns)]'
    );
  });

  it('sizes the first column to fill and the second to its content', async () => {
    const fixture = await createFixture(FillAutoSplitTest);
    const split = fixture.nativeElement.querySelector(
      '[nbSplit]'
    ) as HTMLElement;

    expect(split.getAttribute('data-ratio')).toBe('fill:auto');
    expect(split.className).toContain(
      '[--nb-split-columns:minmax(0,1fr)_auto]'
    );
  });

  it('draws a solid separator, hidden until the collapse breakpoint', async () => {
    const fixture = await createFixture(SolidDividerSplitTest);
    const split = fixture.nativeElement.querySelector(
      '[nbSplit]'
    ) as HTMLElement;

    expect(split.getAttribute('data-separator')).toBe('solid');
    expect(split.className).toContain(
      '[&>*:first-child]:after:[border-inline-end-width:var(--nb-border-width)]'
    );
    expect(split.className).toContain(
      '[&>*:first-child]:after:[border-inline-end-color:var(--nb-border)]'
    );
    expect(split.className).toContain(
      '[&>*:first-child]:after:border-solid'
    );
    // Stacked on mobile, revealed once the columns appear at `md`.
    expect(split.className).toContain('[&>*:first-child]:after:hidden');
    expect(split.className).toContain('md:[&>*:first-child]:after:block');
    expect(classNames(split)).not.toContain(
      '[&>*:first-child]:after:border-dashed'
    );
  });

  it('draws a dashed separator that is always visible when it never collapses', async () => {
    const fixture = await createFixture(DashedDividerSplitTest);
    const split = fixture.nativeElement.querySelector(
      '[nbSplit]'
    ) as HTMLElement;

    expect(split.getAttribute('data-separator')).toBe('dashed');
    expect(split.className).toContain('[&>*:first-child]:after:border-dashed');
    expect(split.className).toContain(
      '[&>*:first-child]:after:[border-inline-end-width:var(--nb-border-width)]'
    );
    expect(split.className).toContain(
      '[&>*:first-child]:after:[border-inline-end-color:var(--nb-border)]'
    );
    // collapse="none" means no breakpoint gating.
    expect(classNames(split)).not.toContain('[&>*:first-child]:after:hidden');
  });

  it('draws a thick separator, revealed at the lg breakpoint', async () => {
    const fixture = await createFixture(ThickDividerSplitTest);
    const split = fixture.nativeElement.querySelector(
      '[nbSplit]'
    ) as HTMLElement;

    expect(split.getAttribute('data-separator')).toBe('thick');
    expect(split.className).toContain(
      '[&>*:first-child]:after:[border-inline-end-width:4px]'
    );
    expect(split.className).toContain('[&>*:first-child]:after:border-solid');
    expect(split.className).toContain(
      '[&>*:first-child]:after:[border-inline-end-color:var(--nb-border)]'
    );
    expect(split.className).toContain('lg:[&>*:first-child]:after:block');
    expect(classNames(split)).not.toContain(
      '[&>*:first-child]:after:border-dashed'
    );
  });
});

function classNames(element: HTMLElement): string[] {
  return element.className.split(/\s+/).filter(Boolean);
}

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
