import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbTextarea } from './nb-textarea';

@Component({
  imports: [NbTextarea],
  template: `<textarea nbTextarea placeholder="Message"></textarea>`,
})
class TextareaTokenTest {}

describe('NbTextarea token surface', () => {
  it('emits no internal styling classes — anatomy lives in styles.css and data-attrs', async () => {
    const fixture = await createFixture();
    const textarea = findTextarea(fixture);

    expect(textarea.className).toBe('');
    expect(textarea.getAttribute('data-size')).toBe('md');
    expect(textarea.getAttribute('data-in-group')).toBeNull();
  });

  it('leaves default visuals to CSS token fallbacks', async () => {
    const fixture = await createFixture();
    const textarea = findTextarea(fixture);

    expect(textarea.style.getPropertyValue('background-color')).toBe('');
    expect(textarea.style.getPropertyValue('border-width')).toBe('');
    expect(textarea.style.cssText).not.toContain('--nb-resolved');
  });

  it('does not funnel radius/shadow through local CSS vars — public hooks stay user-owned', async () => {
    const fixture = await createFixture();
    const textarea = findTextarea(fixture);

    expect(textarea.style.getPropertyValue('--nb-textarea-radius')).toBe('');
    expect(textarea.style.getPropertyValue('--nb-textarea-shadow')).toBe('');
    expect(textarea.style.getPropertyValue('border-radius')).toBe('');
    expect(textarea.style.getPropertyValue('box-shadow')).toBe('');
  });

  it('writes the focus ring color from the tone capability for CSS to consume', async () => {
    const fixture = await createFixture();
    const textarea = findTextarea(fixture);

    // No explicit tone — capability resolves nothing, CSS falls back to public hooks.
    expect(textarea.style.getPropertyValue('--nb-textarea-focus-ring-color')).toBe('');
  });
});

async function createFixture(): Promise<ComponentFixture<TextareaTokenTest>> {
  await TestBed.configureTestingModule({
    imports: [TextareaTokenTest],
  }).compileComponents();

  const fixture = TestBed.createComponent(TextareaTokenTest);
  fixture.detectChanges();

  return fixture;
}

function findTextarea(
  fixture: ComponentFixture<TextareaTokenTest>
): HTMLTextAreaElement {
  return fixture.nativeElement.querySelector(
    'textarea[nbTextarea]'
  ) as HTMLTextAreaElement;
}
