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
    expect(cluster.className).toContain('flex');
    expect(cluster.className).toContain('min-w-0');
    expect(cluster.className).toContain('gap-[var(--nb-cluster-gap)]');
    expect(cluster.className).toContain('[--nb-cluster-gap:0.75rem]');
    expect(cluster.className).toContain('items-center');
    expect(cluster.className).toContain('justify-start');
    expect(cluster.className).toContain('flex-wrap');
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
    expect(cluster.className).toContain('[--nb-cluster-gap:1.5rem]');
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
