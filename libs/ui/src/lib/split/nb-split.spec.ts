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
    expect(split.className).toContain('grid');
    expect(split.className).toContain('min-w-0');
    expect(split.className).toContain('gap-[var(--nb-split-gap)]');
    expect(split.className).toContain('p-[var(--nb-split-padding)]');
    expect(split.className).toContain('[--nb-split-gap:1rem]');
    expect(split.className).toContain('[--nb-split-padding:0px]');
    expect(split.className).toContain('items-stretch');
    expect(split.className).toContain(
      '[--nb-split-columns:minmax(0,1fr)_minmax(0,1fr)]'
    );
    expect(split.className).toContain('grid-cols-1');
    expect(split.className).toContain(
      'md:grid-cols-[var(--nb-split-columns)]'
    );
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
    expect(split.className).toContain('[--nb-split-gap:2rem]');
    expect(split.className).toContain('[--nb-split-padding:2rem]');
    expect(split.className).toContain('items-end');
    expect(split.className).toContain(
      '[--nb-split-columns:minmax(0,3fr)_minmax(0,1fr)]'
    );
    expect(split.className).toContain('grid-cols-1');
    expect(split.className).toContain(
      'lg:grid-cols-[var(--nb-split-columns)]'
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
