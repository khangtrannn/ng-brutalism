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
    // No gap/padding inputs set — capability attrs stay absent; CSS fallback owns
    // the visual defaults. Attribute presence means "consumer chose this".
    expect(cluster.getAttribute('data-gap')).toBeNull();
    expect(cluster.getAttribute('data-align')).toBe('center');
    expect(cluster.getAttribute('data-justify')).toBe('start');
    expect(cluster.getAttribute('data-wrap')).toBe('wrap');
    expect(cluster.getAttribute('data-padding')).toBeNull();
    expect(cluster.className).toBe('');
    expect(cluster.style.getPropertyValue('gap')).toBe('');
    expect(cluster.style.getPropertyValue('padding')).toBe('');
    expect(cluster.style.cssText).not.toContain('--nb-resolved');
  });

  it('separator is none by default', async () => {
    const fixture = await createFixture(DefaultClusterTest);
    const cluster = fixture.nativeElement.querySelector('[nbCluster]') as HTMLElement;

    expect(cluster.getAttribute('data-separator')).toBe('none');
    expect(cluster.style.getPropertyValue('column-gap')).toBe('');
    expect(cluster.style.getPropertyValue('--nb-cluster-separator-gap')).toBe('');
    expect(cluster.className).toBe('');
  });

  it('dashed separator switches to row-gap-only mode and exposes separator metrics', async () => {
    const fixture = await createFixture(DashedDividerClusterTest);
    const cluster = fixture.nativeElement.querySelector('[nbCluster]') as HTMLElement;

    expect(cluster.getAttribute('data-separator')).toBe('dashed');
    expect(cluster.style.getPropertyValue('gap')).toBe('1rem');
    expect(cluster.style.getPropertyValue('column-gap')).toBe('0px');
    expect(cluster.style.getPropertyValue('--nb-cluster-separator-gap')).toBe(
      'calc(1rem * 0.5)'
    );
    expect(cluster.className).toBe('');
  });

  it('solid separator is reflected via the data attribute', async () => {
    const fixture = await createFixture(SolidDividerClusterTest);
    const cluster = fixture.nativeElement.querySelector('[nbCluster]') as HTMLElement;

    expect(cluster.getAttribute('data-separator')).toBe('solid');
    expect(cluster.className).toBe('');
  });

  it('thick separator is reflected via the data attribute', async () => {
    const fixture = await createFixture(ThickDividerClusterTest);
    const cluster = fixture.nativeElement.querySelector('[nbCluster]') as HTMLElement;

    expect(cluster.getAttribute('data-separator')).toBe('thick');
    expect(cluster.className).toBe('');
  });

  it('applies padding scale when set', async () => {
    const fixture = await createFixture(PaddedClusterTest);
    const cluster = fixture.nativeElement.querySelector('[nbCluster]') as HTMLElement;

    expect(cluster.style.getPropertyValue('padding')).toBe('1.5rem');
    expect(cluster.style.cssText).not.toContain('--nb-resolved');
    expect(cluster.className).toBe('');
  });

  it('maps gap, alignment, justification, and wrapping', async () => {
    const fixture = await createFixture(CustomClusterTest);
    const cluster = fixture.nativeElement.querySelector(
      '[nbCluster]'
    ) as HTMLElement;

    expect(cluster.getAttribute('data-align')).toBe('baseline');
    expect(cluster.getAttribute('data-justify')).toBe('between');
    expect(cluster.getAttribute('data-wrap')).toBe('nowrap');
    expect(cluster.style.getPropertyValue('gap')).toBe('1.5rem');
    expect(cluster.className).toBe('');
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
