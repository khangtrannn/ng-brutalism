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
  it('declares the expected default tokens on the base host', async () => {
    const fixture = await createFixture();
    const textarea = findTextarea(fixture);
    const cls = textarea.className;

    expect(cls).toContain(
      '[--nb-textarea-bg:var(--nb-input-bg,var(--nb-field-bg))]'
    );
    expect(cls).toContain('[--nb-textarea-fg:var(--nb-foreground)]');
    expect(cls).toContain('[--nb-textarea-border:var(--nb-border)]');
    expect(cls).toContain('[--nb-textarea-radius:var(--nb-radius)]');
    expect(cls).toContain(
      '[--nb-textarea-shadow:var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_var(--nb-shadow)]'
    );
  });

  it('reads its scoped tokens instead of global tokens directly', async () => {
    const fixture = await createFixture();
    const textarea = findTextarea(fixture);
    const cls = textarea.className;

    expect(cls).toContain('bg-(--nb-textarea-bg)');
    expect(cls).toContain('text-(--nb-textarea-fg)');
    expect(cls).toContain('border-(--nb-textarea-border)');
    expect(cls).toContain('rounded-(--nb-textarea-radius)');
    expect(cls).toContain('shadow-[var(--nb-textarea-shadow)]');
    expect(cls).toContain('focus-visible:ring-(--nb-textarea-border)');
    expect(cls).not.toContain('bg-[#faf3d6]');
    expect(cls).not.toContain('text-(--nb-foreground)');
    expect(cls).not.toContain('border-(--nb-border)');
    expect(cls).not.toContain('rounded-nb');
    expect(cls).not.toContain('shadow-nb');
  });

  it('does not regress the default textarea class shape', async () => {
    const fixture = await createFixture();
    const textarea = findTextarea(fixture);
    const cls = textarea.className;

    expect(cls).toContain('flex');
    expect(cls).toContain('border-2');
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
});

async function createFixture(): Promise<
  ComponentFixture<TextareaTokenTest>
> {
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
