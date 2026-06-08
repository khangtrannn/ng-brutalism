import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbHalftone } from './nb-halftone';

@Component({
  imports: [NbHalftone],
  template: `<div nbHalftone></div>`,
})
class DefaultHalftoneTest {}

@Component({
  imports: [NbHalftone],
  template: `<nb-halftone />`,
})
class LegacyElementHalftoneTest {}

@Component({
  imports: [NbHalftone],
  template: `<div nbHalftone shape="rectangle"></div>`,
})
class RectangleHalftoneTest {}

@Component({
  imports: [NbHalftone],
  template: `
    <div nbHalftone shape="rectangle" [rows]="4" [columns]="10"></div>
  `,
})
class CustomRectangleHalftoneTest {}

@Component({
  imports: [NbHalftone],
  template: `
    <div
      nbHalftone
      shape="rectangle"
      style="--nb-halftone-dot-size: 10px"
    ></div>
  `,
})
class CustomCssVariableHalftoneTest {}

@Component({
  imports: [NbHalftone],
  template: `
    <div
      nbHalftone
      shape="rectangle"
      [size]="8"
      [gapX]="28"
      [gapY]="27"
    ></div>
  `,
})
class CustomInputHalftoneTest {}

@Component({
  imports: [NbHalftone],
  template: `<div nbHalftone shape="rectangle" [gap]="24"></div>`,
})
class SharedGapInputHalftoneTest {}

describe('NbHalftone', () => {
  it('keeps the existing default corner halftone behavior', async () => {
    const fixture = await createFixture(DefaultHalftoneTest);
    const halftone = fixture.nativeElement.querySelector(
      '[nbHalftone]'
    ) as HTMLElement;

    expect(halftone.getAttribute('data-nb-halftone')).toBe('');
    expect(halftone.getAttribute('data-shape')).toBe('square');
    expect(halftone.className).toBe('');
    expect(halftone.style.getPropertyValue('--nb-halftone-rows')).toBe('7');
    expect(halftone.style.getPropertyValue('--nb-halftone-columns')).toBe('7');
    expect(halftone.querySelectorAll('circle')).toHaveLength(49);
  });

  it('keeps legacy element selector compatibility', async () => {
    const fixture = await createFixture(LegacyElementHalftoneTest);
    const halftone = fixture.nativeElement.querySelector(
      'nb-halftone'
    ) as HTMLElement;

    expect(halftone.getAttribute('data-nb-halftone')).toBe('');
    expect(halftone.querySelectorAll('circle')).toHaveLength(49);
  });

  it('applies the rectangle shape class and accessibility metadata', async () => {
    const fixture = await createFixture(RectangleHalftoneTest);
    const halftone = fixture.nativeElement.querySelector(
      '[nbHalftone]'
    ) as HTMLElement;

    expect(halftone.getAttribute('data-nb-halftone')).toBe('');
    expect(halftone.getAttribute('data-shape')).toBe('rectangle');
    expect(halftone.classList).not.toContain('absolute');
    expect(halftone.getAttribute('aria-hidden')).toBe('true');
    expect(halftone.querySelector('circle')).toBeNull();
  });

  it('sets rectangle default rows and columns', async () => {
    const fixture = await createFixture(RectangleHalftoneTest);
    const halftone = fixture.nativeElement.querySelector(
      '[nbHalftone]'
    ) as HTMLElement;

    expect(halftone.style.getPropertyValue('--nb-halftone-rows')).toBe('3');
    expect(halftone.style.getPropertyValue('--nb-halftone-columns')).toBe('13');
  });

  it('sets custom rectangle rows and columns', async () => {
    const fixture = await createFixture(CustomRectangleHalftoneTest);
    const halftone = fixture.nativeElement.querySelector(
      '[nbHalftone]'
    ) as HTMLElement;

    expect(halftone.style.getPropertyValue('--nb-halftone-rows')).toBe('4');
    expect(halftone.style.getPropertyValue('--nb-halftone-columns')).toBe('10');
  });

  it('allows CSS custom properties to tune the rectangle rhythm', async () => {
    const fixture = await createFixture(CustomCssVariableHalftoneTest);
    const halftone = fixture.nativeElement.querySelector(
      '[nbHalftone]'
    ) as HTMLElement;

    expect(halftone.style.getPropertyValue('--nb-halftone-dot-size')).toBe('10px');
  });

  it('allows inputs to tune the rectangle rhythm', async () => {
    const fixture = await createFixture(CustomInputHalftoneTest);
    const halftone = fixture.nativeElement.querySelector(
      '[nbHalftone]'
    ) as HTMLElement;

    expect(halftone.style.getPropertyValue('--nb-halftone-dot-size')).toBe('8px');
    expect(halftone.style.getPropertyValue('--nb-halftone-gap-x')).toBe('28px');
    expect(halftone.style.getPropertyValue('--nb-halftone-gap-y')).toBe('27px');
  });

  it('uses gap as the shared rectangle rhythm fallback', async () => {
    const fixture = await createFixture(SharedGapInputHalftoneTest);
    const halftone = fixture.nativeElement.querySelector(
      '[nbHalftone]'
    ) as HTMLElement;

    expect(halftone.style.getPropertyValue('--nb-halftone-gap-x')).toBe('24px');
    expect(halftone.style.getPropertyValue('--nb-halftone-gap-y')).toBe('24px');
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
