import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbInput } from './nb-input';

@Component({
  imports: [NbInput],
  template: `<input nbInput placeholder="Email" />`,
})
class InputTokenTest {}

describe('NbInput token surface', () => {
  it('does not emit legacy capability marker classes', async () => {
    const fixture = await createFixture();
    const input = findInput(fixture);

    expect(input.className).not.toMatch(/(?:^|\s)nb-tone(?:\s|$)/);
    expect(input.className).not.toMatch(/(?:^|\s)nb-border-width(?:\s|$)/);
  });

  it('leaves default visuals to CSS token fallbacks', async () => {
    const fixture = await createFixture();
    const input = findInput(fixture);

    expect(input.style.getPropertyValue('background-color')).toBe('');
    expect(input.style.getPropertyValue('border-width')).toBe('');
    expect(input.style.cssText).not.toContain('--nb-resolved');
  });

  it('keeps scoped radius and shadow CSS vars as classes', async () => {
    const fixture = await createFixture();
    const input = findInput(fixture);
    const cls = input.className;

    expect(cls).toContain('[--nb-input-radius:var(--nb-radius)]');
    expect(cls).toContain(
      '[--nb-input-shadow:var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_var(--nb-shadow)]'
    );
    expect(cls).toContain('rounded-(--nb-input-radius)');
    expect(cls).toContain('shadow-[var(--nb-input-shadow)]');
  });

  it('uses public border-color fallback for focus ring', async () => {
    const fixture = await createFixture();
    const cls = findInput(fixture).className;

    expect(cls).toContain(
      'focus-visible:ring-[var(--nb-input-focus-ring-color,var(--nb-input-border-color,var(--nb-border)))]'
    );
    expect(cls).not.toContain('focus-visible:ring-(--nb-input-border)');
  });

  it('does not regress the default input class shape', async () => {
    const fixture = await createFixture();
    const input = findInput(fixture);
    const cls = input.className;

    expect(cls).toContain('flex');
    expect(cls).toContain('font-medium');
    expect(cls).toContain('placeholder:text-gray-400');
    expect(cls).toContain('file:h-full');
    expect(cls).toContain('file:cursor-pointer');
    expect(cls).toContain('file:bg-(--nb-main)');
    expect(cls).toContain('disabled:opacity-50');
    expect(cls).toContain('disabled:cursor-not-allowed');
    expect(cls).toContain('focus-visible:outline-none');
    expect(cls).toContain('focus-visible:ring-2');
    expect(cls).toContain('focus-visible:ring-offset-2');
    expect(cls).toContain('focus-visible:shadow-none');
  });

  it('no longer uses the old CSS var class declarations', async () => {
    const fixture = await createFixture();
    const cls = findInput(fixture).className;

    expect(cls).not.toContain('[--nb-input-bg:');
    expect(cls).not.toContain('[--nb-input-fg:');
    expect(cls).not.toContain('[--nb-input-border:');
    expect(cls).not.toContain('bg-(--nb-input-bg)');
    expect(cls).not.toContain('text-(--nb-input-fg)');
    expect(cls).not.toContain('border-2 border-(--nb-input-border)');
  });
});

async function createFixture(): Promise<ComponentFixture<InputTokenTest>> {
  await TestBed.configureTestingModule({
    imports: [InputTokenTest],
  }).compileComponents();

  const fixture = TestBed.createComponent(InputTokenTest);
  fixture.detectChanges();

  return fixture;
}

function findInput(
  fixture: ComponentFixture<InputTokenTest>
): HTMLInputElement {
  return fixture.nativeElement.querySelector(
    'input[nbInput]'
  ) as HTMLInputElement;
}
