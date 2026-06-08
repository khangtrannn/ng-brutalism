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
  it('emits no internal styling classes — anatomy lives in styles.css and data-attrs', async () => {
    const fixture = await createFixture();
    const input = findInput(fixture);

    expect(input.className).toBe('');
    expect(input.getAttribute('data-size')).toBe('md');
    expect(input.getAttribute('data-in-group')).toBeNull();
  });

  it('leaves default visuals to CSS token fallbacks', async () => {
    const fixture = await createFixture();
    const input = findInput(fixture);

    expect(input.style.getPropertyValue('background-color')).toBe('');
    expect(input.style.getPropertyValue('border-width')).toBe('');
    expect(input.style.cssText).not.toContain('--nb-resolved');
  });

  it('does not funnel radius/shadow through local CSS vars — public hooks stay user-owned', async () => {
    const fixture = await createFixture();
    const input = findInput(fixture);

    expect(input.style.getPropertyValue('--nb-input-radius')).toBe('');
    expect(input.style.getPropertyValue('--nb-input-shadow')).toBe('');
    expect(input.style.getPropertyValue('border-radius')).toBe('');
    expect(input.style.getPropertyValue('box-shadow')).toBe('');
  });

  it('writes the focus ring color from the tone capability for CSS to consume', async () => {
    const fixture = await createFixture();
    const input = findInput(fixture);

    // No explicit tone — capability resolves nothing, CSS falls back to public hooks.
    expect(input.style.getPropertyValue('--nb-input-focus-ring-color')).toBe('');
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
