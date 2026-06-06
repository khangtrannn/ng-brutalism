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
  it('adds nb-tone and nb-border-width capability marker classes', async () => {
    const fixture = await createFixture();
    const input = findInput(fixture);

    expect(input.className).toContain('nb-tone');
    expect(input.className).toContain('nb-border-width');
  });

  it('sets capability default CSS variables as inline styles', async () => {
    const fixture = await createFixture();
    const input = findInput(fixture);

    expect(input.style.getPropertyValue('--_nb-tone-bg-default')).toBe(
      'var(--nb-surface)'
    );
    expect(input.style.getPropertyValue('--_nb-tone-bg-token')).toBe(
      'var(--nb-input-bg, var(--_nb-tone-bg-default))'
    );
    expect(input.style.getPropertyValue('--_nb-border-width-default')).toBe(
      'var(--nb-border-width)'
    );
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

  it('uses capability border-color token for focus ring', async () => {
    const fixture = await createFixture();
    const cls = findInput(fixture).className;

    expect(cls).toContain(
      'focus-visible:ring-[var(--_nb-tone-border-color-token,var(--_nb-tone-border-color-default))]'
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
