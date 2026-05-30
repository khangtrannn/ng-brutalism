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
    <div nbStack gap="xl" align="start" justify="center" divider="dashed">
      <span>One</span>
      <span>Two</span>
    </div>
  `,
})
class DashedStackTest {}

@Component({
  imports: [NbStack],
  template: `
    <div nbStack divider="solid">
      <span>One</span>
      <span>Two</span>
    </div>
  `,
})
class SolidStackTest {}

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
    expect(stack.getAttribute('data-divider')).toBe('none');
    expect(stack.className).toContain('flex');
    expect(stack.className).toContain('min-w-0');
    expect(stack.className).toContain('flex-col');
    expect(stack.className).toContain('gap-[var(--nb-stack-gap)]');
    expect(stack.className).toContain('[--nb-stack-gap:0.75rem]');
    expect(stack.className).toContain('items-stretch');
    expect(stack.className).toContain('justify-start');
    expect(stack.className).not.toContain('[&>*+*]:border-t');
  });

  it('maps gap, alignment, justification, and dashed dividers', async () => {
    const fixture = await createFixture(DashedStackTest);
    const stack = fixture.nativeElement.querySelector(
      '[nbStack]'
    ) as HTMLElement;

    expect(stack.getAttribute('data-gap')).toBe('xl');
    expect(stack.getAttribute('data-align')).toBe('start');
    expect(stack.getAttribute('data-justify')).toBe('center');
    expect(stack.getAttribute('data-divider')).toBe('dashed');
    expect(stack.className).toContain('[--nb-stack-gap:1.5rem]');
    expect(stack.className).toContain('items-start');
    expect(stack.className).toContain('justify-center');
    expect(stack.className).toContain(
      '[&>*+*]:border-t-(length:--nb-border-width)'
    );
    expect(stack.className).toContain('[&>*+*]:border-dashed');
    expect(stack.className).toContain('[&>*+*]:[border-top-color:var(--nb-border)]');
    expect(stack.className).toContain('[&>*+*]:pt-[var(--nb-stack-gap)]');
  });
  it('solid divider uses explicit border-solid and explicit color', async () => {
    const fixture = await createFixture(SolidStackTest);
    const stack = fixture.nativeElement.querySelector('[nbStack]') as HTMLElement;

    expect(stack.getAttribute('data-divider')).toBe('solid');
    expect(stack.className).toContain('[&>*+*]:border-solid');
    expect(stack.className).toContain('[&>*+*]:[border-top-color:var(--nb-border)]');
    expect(stack.className).not.toContain('[&>*+*]:border-dashed');
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
