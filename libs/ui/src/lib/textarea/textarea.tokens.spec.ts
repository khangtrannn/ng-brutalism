import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbTextarea } from './nb-textarea';
import type { NbRadius, NbShadow } from '@ng-brutalism/ui/tokens';
@Component({
  imports: [NbTextarea],
  template: `<textarea nbTextarea placeholder="Message"></textarea>`,
})
class TextareaTokenTest {}

@Component({
  imports: [NbTextarea],
  template: `
    <textarea
      nbTextarea
      placeholder="Message"
      radius="lg"
      shadow="hard"
    ></textarea>
  `,
})
class ValueTextareaTokenTest {}

@Component({
  imports: [NbTextarea],
  template: `
    <textarea
      nbTextarea
      placeholder="Message"
      [radius]="radius()"
      [shadow]="shadow()"
    ></textarea>
  `,
})
class MutableRadiusTextareaTokenTest {
  readonly radius = signal<NbRadius | null>('lg');
  readonly shadow = signal<NbShadow | null>('hard');
}

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

  it('leaves radius/shadow to CSS token fallbacks when unset', async () => {
    const fixture = await createFixture();
    const textarea = findTextarea(fixture);

    expect(textarea.style.getPropertyValue('--nb-textarea-radius')).toBe('');
    expect(textarea.style.getPropertyValue('--nb-textarea-shadow')).toBe('');
    expect(textarea.style.getPropertyValue('border-radius')).toBe('');
    expect(textarea.style.getPropertyValue('box-shadow')).toBe('');
  });

  it('writes radius/shadow inputs to public CSS variables', async () => {
    const fixture = await createFixture(ValueTextareaTokenTest);
    const textarea = findTextarea(fixture);

    expect(textarea.style.getPropertyValue('--nb-textarea-radius')).toBe(
      'var(--nb-radius-lg)'
    );
    expect(textarea.style.getPropertyValue('--nb-textarea-shadow')).toBe(
      'var(--nb-shadow-hard)'
    );
    expect(textarea.style.getPropertyValue('border-radius')).toBe('');
    expect(textarea.style.getPropertyValue('box-shadow')).toBe('');
  });

  it('removes inline radius/shadow public CSS variables when bound inputs become null', async () => {
    const fixture = await createFixture(MutableRadiusTextareaTokenTest);
    const textarea = findTextarea(fixture);

    expect(textarea.style.getPropertyValue('--nb-textarea-radius')).toBe(
      'var(--nb-radius-lg)'
    );
    expect(textarea.style.getPropertyValue('--nb-textarea-shadow')).toBe(
      'var(--nb-shadow-hard)'
    );

    fixture.componentInstance.radius.set(null);
    fixture.componentInstance.shadow.set(null);
    fixture.detectChanges();

    expect(textarea.style.getPropertyValue('--nb-textarea-radius')).toBe('');
    expect(textarea.style.getPropertyValue('--nb-textarea-shadow')).toBe('');
  });

  it('writes the focus ring color from the tone capability for CSS to consume', async () => {
    const fixture = await createFixture();
    const textarea = findTextarea(fixture);

    // No explicit tone — capability resolves nothing, CSS falls back to public hooks.
    expect(
      textarea.style.getPropertyValue('--nb-textarea-focus-ring-color')
    ).toBe('');
  });
});

async function createFixture<T>(
  component: new () => T = TextareaTokenTest as never
): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [component],
  }).compileComponents();

  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();

  return fixture;
}

function findTextarea(fixture: ComponentFixture<unknown>): HTMLTextAreaElement {
  return fixture.nativeElement.querySelector(
    'textarea[nbTextarea]'
  ) as HTMLTextAreaElement;
}
