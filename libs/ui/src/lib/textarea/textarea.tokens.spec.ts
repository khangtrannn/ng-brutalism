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
  it('does not emit legacy capability marker classes', async () => {
    const fixture = await createFixture();
    const textarea = findTextarea(fixture);

    expect(textarea.className).not.toMatch(/(?:^|\s)nb-tone(?:\s|$)/);
    expect(textarea.className).not.toMatch(/(?:^|\s)nb-border-width(?:\s|$)/);
  });

  it('leaves default visuals to CSS token fallbacks', async () => {
    const fixture = await createFixture();
    const textarea = findTextarea(fixture);

    expect(textarea.style.getPropertyValue('background-color')).toBe('');
    expect(textarea.style.getPropertyValue('border-width')).toBe('');
    expect(textarea.style.cssText).not.toContain('--nb-resolved');
  });

  it('keeps scoped radius and shadow CSS vars as classes', async () => {
    const fixture = await createFixture();
    const textarea = findTextarea(fixture);
    const cls = textarea.className;

    expect(cls).toContain('[--nb-textarea-radius:var(--nb-radius)]');
    expect(cls).toContain(
      '[--nb-textarea-shadow:var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_var(--nb-shadow)]'
    );
    expect(cls).toContain('rounded-(--nb-textarea-radius)');
    expect(cls).toContain('shadow-[var(--nb-textarea-shadow)]');
  });

  it('uses public border-color fallback for focus ring', async () => {
    const fixture = await createFixture();
    const cls = findTextarea(fixture).className;

    expect(cls).toContain(
      'focus-visible:ring-[var(--nb-textarea-focus-ring-color,var(--nb-textarea-border-color,var(--nb-border)))]'
    );
    expect(cls).not.toContain('focus-visible:ring-(--nb-textarea-border)');
  });

  it('does not regress the default textarea class shape', async () => {
    const fixture = await createFixture();
    const textarea = findTextarea(fixture);
    const cls = textarea.className;

    expect(cls).toContain('flex');
    expect(cls).toContain('font-medium');
    expect(cls).toContain('placeholder:text-gray-400');
    expect(cls).toContain('disabled:opacity-50');
    expect(cls).toContain('disabled:cursor-not-allowed');
    expect(cls).toContain('resize-none');
    expect(cls).toContain('focus-visible:outline-none');
    expect(cls).toContain('focus-visible:ring-2');
    expect(cls).toContain('focus-visible:ring-offset-2');
    expect(cls).toContain('focus-visible:shadow-none');
  });

  it('no longer uses the old CSS var class declarations', async () => {
    const fixture = await createFixture();
    const cls = findTextarea(fixture).className;

    expect(cls).not.toContain('[--nb-textarea-bg:');
    expect(cls).not.toContain('[--nb-textarea-fg:');
    expect(cls).not.toContain('[--nb-textarea-border:');
    expect(cls).not.toContain('bg-(--nb-textarea-bg)');
    expect(cls).not.toContain('text-(--nb-textarea-fg)');
    expect(cls).not.toContain('border-2 border-(--nb-textarea-border)');
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
