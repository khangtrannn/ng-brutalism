import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbInput } from './input.directive';

@Component({
  standalone: true,
  imports: [NbInput],
  template: `<input nbInput placeholder="Email" />`,
})
class InputTokenTestComponent {}

describe('NbInput token surface', () => {
  it('declares the expected default tokens on the base host', async () => {
    const fixture = await createFixture();
    const input = findInput(fixture);
    const cls = input.className;

    expect(cls).toContain('[--nb-input-bg:var(--nb-field-bg)]');
    expect(cls).toContain('[--nb-input-fg:var(--nb-foreground)]');
    expect(cls).toContain('[--nb-input-border:var(--nb-border)]');
    expect(cls).toContain('[--nb-input-radius:var(--nb-radius)]');
    expect(cls).toContain(
      '[--nb-input-shadow:var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_var(--nb-shadow)]'
    );
  });

  it('reads its scoped tokens instead of global tokens directly', async () => {
    const fixture = await createFixture();
    const input = findInput(fixture);
    const cls = input.className;

    expect(cls).toContain('bg-(--nb-input-bg)');
    expect(cls).toContain('text-(--nb-input-fg)');
    expect(cls).toContain('border-(--nb-input-border)');
    expect(cls).toContain('rounded-(--nb-input-radius)');
    expect(cls).toContain('shadow-[var(--nb-input-shadow)]');
    expect(cls).toContain('focus-visible:ring-(--nb-input-border)');
    expect(cls).not.toContain('bg-[#faf3d6]');
    expect(cls).not.toContain('text-(--nb-foreground)');
    expect(cls).not.toContain('border-(--nb-border)');
    expect(cls).not.toContain('rounded-nb');
    expect(cls).not.toContain('shadow-nb');
  });

  it('does not regress the default input class shape', async () => {
    const fixture = await createFixture();
    const input = findInput(fixture);
    const cls = input.className;

    expect(cls).toContain('flex');
    expect(cls).toContain('border-2');
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
});

async function createFixture(): Promise<
  ComponentFixture<InputTokenTestComponent>
> {
  await TestBed.configureTestingModule({
    imports: [InputTokenTestComponent],
  }).compileComponents();

  const fixture = TestBed.createComponent(InputTokenTestComponent);
  fixture.detectChanges();

  return fixture;
}

function findInput(
  fixture: ComponentFixture<InputTokenTestComponent>
): HTMLInputElement {
  return fixture.nativeElement.querySelector(
    'input[nbInput]'
  ) as HTMLInputElement;
}
