import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbCluster } from './nb-cluster';

@Component({
  imports: [NbCluster],
  template: `<div nbCluster>Default cluster</div>`,
})
class DefaultClusterTest {}

@Component({
  imports: [NbCluster],
  template: `
    <div nbCluster gap="xl" align="baseline" justify="between" wrap="nowrap">
      <span>One</span>
      <span>Two</span>
    </div>
  `,
})
class CustomClusterTest {}

@Component({
  imports: [NbCluster],
  template: `<div nbCluster padding="lg">Padded cluster</div>`,
})
class PaddedClusterTest {}

@Component({
  imports: [NbCluster],
  template: `
    <div nbCluster gap="lg" separator="dashed">
      <span>A</span>
      <span>B</span>
    </div>
  `,
})
class DashedDividerClusterTest {}

@Component({
  imports: [NbCluster],
  template: `<div nbCluster separator="solid"><span>A</span><span>B</span></div>`,
})
class SolidDividerClusterTest {}

@Component({
  imports: [NbCluster],
  template: `<div nbCluster separator="thick"><span>A</span><span>B</span></div>`,
})
class ThickDividerClusterTest {}

describe('NbCluster', () => {
  it('applies default horizontal rhythm classes and metadata', async () => {
    const fixture = await createFixture(DefaultClusterTest);
    const cluster = fixture.nativeElement.querySelector(
      '[nbCluster]'
    ) as HTMLElement;

    expect(cluster.getAttribute('data-nb-cluster')).toBe('');
    expect(cluster.getAttribute('data-gap')).toBe('md');
    expect(cluster.getAttribute('data-align')).toBe('center');
    expect(cluster.getAttribute('data-justify')).toBe('start');
    expect(cluster.getAttribute('data-wrap')).toBe('wrap');
    expect(cluster.getAttribute('data-padding')).toBe('none');
    expect(cluster.className).toContain('flex');
    expect(cluster.className).toContain('min-w-0');
    expect(cluster.className).toContain('gap-[var(--nb-cluster-gap)]');
    expect(cluster.style.getPropertyValue('--nb-cluster-gap')).toBe('0.75rem');
    expect(cluster.className).toContain('items-center');
    expect(cluster.className).toContain('justify-start');
    expect(cluster.className).toContain('flex-wrap');
  });

  it('separator is none by default', async () => {
    const fixture = await createFixture(DefaultClusterTest);
    const cluster = fixture.nativeElement.querySelector('[nbCluster]') as HTMLElement;

    expect(cluster.getAttribute('data-separator')).toBe('none');
    expect(cluster.className).not.toContain('border-inline-start');
    expect(cluster.className).toContain('gap-[var(--nb-cluster-gap)]');
  });

  it('dashed separator switches to row-gap-only mode and renders separators', async () => {
    const fixture = await createFixture(DashedDividerClusterTest);
    const cluster = fixture.nativeElement.querySelector('[nbCluster]') as HTMLElement;

    expect(cluster.getAttribute('data-separator')).toBe('dashed');
    expect(cluster.className).toContain('gap-y-[var(--nb-cluster-gap)]');
    expect(cluster.className).toContain('gap-x-0');
    expect(cluster.style.getPropertyValue('--nb-cluster-gap')).toBe('1rem');
    expect(cluster.className).toContain(
      '[--nb-cluster-separator-gap:calc(var(--nb-cluster-gap)*0.5)]'
    );
    expect(cluster.className).toContain('[&>*+*]:[margin-inline-start:var(--nb-cluster-separator-gap)]');
    expect(cluster.className).toContain('[--nb-cluster-separator-color:var(--nb-border)]');
    expect(cluster.className).toContain('[--nb-cluster-separator-thickness:2px]');
    expect(cluster.className).toContain(
      '[&>*+*]:[border-inline-start-color:var(--nb-cluster-separator-color)]'
    );
    expect(cluster.className).toContain('[&>*+*]:[border-inline-start-style:dashed]');
    expect(cluster.className).toContain(
      '[&>*+*]:[border-inline-start-width:var(--nb-cluster-separator-thickness)]'
    );
    expect(cluster.className).toContain('[&>*+*]:[padding-inline-start:var(--nb-cluster-separator-gap)]');
    expect(cluster.className).not.toContain('gap-[var(--nb-cluster-gap)]');
  });

  it('solid separator renders with solid style', async () => {
    const fixture = await createFixture(SolidDividerClusterTest);
    const cluster = fixture.nativeElement.querySelector('[nbCluster]') as HTMLElement;

    expect(cluster.getAttribute('data-separator')).toBe('solid');
    expect(cluster.className).toContain('[&>*+*]:[border-inline-start-style:solid]');
    expect(cluster.className).toContain('[--nb-cluster-separator-thickness:2px]');
    expect(cluster.className).toContain(
      '[&>*+*]:[border-inline-start-width:var(--nb-cluster-separator-thickness)]'
    );
  });

  it('thick separator renders with 4px thickness token', async () => {
    const fixture = await createFixture(ThickDividerClusterTest);
    const cluster = fixture.nativeElement.querySelector('[nbCluster]') as HTMLElement;

    expect(cluster.getAttribute('data-separator')).toBe('thick');
    expect(cluster.className).toContain('[--nb-cluster-separator-thickness:4px]');
    expect(cluster.className).toContain(
      '[&>*+*]:[border-inline-start-width:var(--nb-cluster-separator-thickness)]'
    );
    expect(cluster.className).toContain('[&>*+*]:[border-inline-start-style:solid]');
  });

  it('applies padding scale when set', async () => {
    const fixture = await createFixture(PaddedClusterTest);
    const cluster = fixture.nativeElement.querySelector('[nbCluster]') as HTMLElement;

    expect(cluster.getAttribute('data-padding')).toBe('lg');
    expect(cluster.className).toContain('p-[var(--nb-cluster-padding)]');
    expect(cluster.style.getPropertyValue('--nb-cluster-padding')).toBe('1.5rem');
  });

  it('maps gap, alignment, justification, and wrapping', async () => {
    const fixture = await createFixture(CustomClusterTest);
    const cluster = fixture.nativeElement.querySelector(
      '[nbCluster]'
    ) as HTMLElement;

    expect(cluster.getAttribute('data-gap')).toBe('xl');
    expect(cluster.getAttribute('data-align')).toBe('baseline');
    expect(cluster.getAttribute('data-justify')).toBe('between');
    expect(cluster.getAttribute('data-wrap')).toBe('nowrap');
    expect(cluster.style.getPropertyValue('--nb-cluster-gap')).toBe('1.5rem');
    expect(cluster.className).toContain('items-baseline');
    expect(cluster.className).toContain('justify-between');
    expect(cluster.className).toContain('flex-nowrap');
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
