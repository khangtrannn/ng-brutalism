import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbStack } from './nb-stack';

@Component({
  imports: [NbStack],
  template: `<div nbStack>Default stack</div>`,
})
class DefaultStackTest {}

@Component({
  imports: [NbStack],
  template: `
    <div nbStack gap="xl" align="start" justify="center" separator="dashed">
      <span>One</span>
      <span>Two</span>
    </div>
  `,
})
class DashedStackTest {}

@Component({
  imports: [NbStack],
  template: `
    <div nbStack separator="solid">
      <span>One</span>
      <span>Two</span>
    </div>
  `,
})
class SolidStackTest {}

@Component({
  imports: [NbStack],
  template: `
    <div nbStack separator="thick">
      <span>One</span>
      <span>Two</span>
    </div>
  `,
})
class ThickStackTest {}

describe('NbStack', () => {
  it('applies default vertical rhythm classes and metadata', async () => {
    const fixture = await createFixture(DefaultStackTest);
    const stack = fixture.nativeElement.querySelector(
      '[nbStack]'
    ) as HTMLElement;

    expect(stack.getAttribute('data-nb-stack')).toBe('');
    expect(stack.getAttribute('data-gap')).toBe('md');
    expect(stack.getAttribute('data-align')).toBe('stretch');
    expect(stack.getAttribute('data-justify')).toBe('start');
    expect(stack.getAttribute('data-separator')).toBe('none');
    expect(stack.className).toBe('');
    expect(stack.style.getPropertyValue('gap')).toBe('');
    expect(stack.style.cssText).not.toContain('--nb-resolved');
  });

  it('maps gap, alignment, justification, and dashed separators', async () => {
    const fixture = await createFixture(DashedStackTest);
    const stack = fixture.nativeElement.querySelector(
      '[nbStack]'
    ) as HTMLElement;

    expect(stack.getAttribute('data-gap')).toBe('xl');
    expect(stack.getAttribute('data-align')).toBe('start');
    expect(stack.getAttribute('data-justify')).toBe('center');
    expect(stack.getAttribute('data-separator')).toBe('dashed');
    expect(stack.style.getPropertyValue('gap')).toBe('1.5rem');
    expect(stack.style.getPropertyValue('--nb-stack-separator-gap')).toBe(
      '1.5rem'
    );
    expect(stack.className).toBe('');
    expect(stack.style.cssText).not.toContain('--nb-resolved');
  });
  it('solid separator is reflected via the data attribute', async () => {
    const fixture = await createFixture(SolidStackTest);
    const stack = fixture.nativeElement.querySelector('[nbStack]') as HTMLElement;

    expect(stack.getAttribute('data-separator')).toBe('solid');
    expect(stack.className).toBe('');
  });

  it('thick separator is reflected via the data attribute', async () => {
    const fixture = await createFixture(ThickStackTest);
    const stack = fixture.nativeElement.querySelector('[nbStack]') as HTMLElement;

    expect(stack.getAttribute('data-separator')).toBe('thick');
    expect(stack.className).toBe('');
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
