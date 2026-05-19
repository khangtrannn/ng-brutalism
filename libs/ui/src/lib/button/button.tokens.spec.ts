import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbButton } from './button.directive';
import type { NbButtonShadow, NbButtonVariant } from './button.types';

@Component({
  standalone: true,
  imports: [NbButton],
  template: `<button nbButton [variant]="variant" [shadow]="shadow">
    Button
  </button>`,
})
class ButtonTokenTestComponent {
  variant: NbButtonVariant = 'default';
  shadow: NbButtonShadow = 'default';
}

describe('NbButton token surface', () => {
  it('declares the expected default tokens on the base host', async () => {
    const fixture = await createFixture();
    const button = findButton(fixture);
    const cls = button.className;

    expect(cls).toContain('[--nb-button-bg:var(--nb-main)]');
    expect(cls).toContain('[--nb-button-fg:var(--nb-main-foreground)]');
    expect(cls).toContain('[--nb-button-border:var(--nb-border)]');
    expect(cls).toContain('[--nb-button-radius:var(--nb-radius)]');
    expect(cls).toContain(
      '[--nb-button-shadow:var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_var(--nb-shadow)]'
    );
  });

  it('reads its scoped tokens instead of global tokens directly', async () => {
    const fixture = await createFixture();
    const button = findButton(fixture);
    const cls = button.className;

    expect(cls).toContain('bg-(--nb-button-bg)');
    expect(cls).toContain('text-(--nb-button-fg)');
    expect(cls).toContain('border-(--nb-button-border)');
    expect(cls).toContain('rounded-(--nb-button-radius)');
    expect(cls).toContain('shadow-[var(--nb-button-shadow)]');
    expect(cls).not.toContain('bg-(--nb-main)');
    expect(cls).not.toContain('rounded-nb');
    expect(cls).not.toContain('shadow-nb');
  });

  it.each([
    ['neutral', 'var(--nb-background)', 'var(--nb-foreground)'],
    ['primary', 'var(--nb-primary)', 'var(--nb-primary-foreground)'],
    ['secondary', 'var(--nb-secondary)', 'var(--nb-secondary-foreground)'],
    ['accent', 'var(--nb-accent)', 'var(--nb-accent-foreground)'],
    ['danger', 'var(--nb-danger)', 'var(--nb-danger-foreground)'],
    ['success', 'var(--nb-success)', 'var(--nb-success-foreground)'],
    ['warning', 'var(--nb-warning)', 'var(--nb-warning-foreground)'],
  ] satisfies Array<[NbButtonVariant, string, string]>)(
    'variant="%s" reassigns expected color tokens',
    async (variant, bg, fg) => {
      const fixture = await createFixture({ variant });
      const cls = findButton(fixture).className;

      expect(cls).toContain(`[--nb-button-bg:${bg}]`);
      expect(cls).toContain(`[--nb-button-fg:${fg}]`);
    }
  );

  it('shadow="none" reassigns the button shadow token', async () => {
    const fixture = await createFixture({ shadow: 'none' });
    const cls = findButton(fixture).className;

    expect(cls).toContain('[--nb-button-shadow:none]');
    expect(cls).not.toContain('hover:translate-x-(--nb-shadow-offset-x)');
  });

  it('shadow="reverse" reassigns shadow and hover behavior', async () => {
    const fixture = await createFixture({ shadow: 'reverse' });
    const cls = findButton(fixture).className;

    expect(cls).toContain('[--nb-button-shadow:none]');
    expect(cls).toContain('hover:-translate-x-(--nb-reverse-shadow-offset-x)');
    expect(cls).toContain('hover:-translate-y-(--nb-reverse-shadow-offset-y)');
    expect(cls).toContain(
      'hover:shadow-[var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_var(--nb-shadow)]'
    );
  });

  it('does not regress the default button class shape', async () => {
    const fixture = await createFixture();
    const cls = findButton(fixture).className;

    expect(cls).toContain('inline-flex');
    expect(cls).toContain('items-center');
    expect(cls).toContain('justify-center');
    expect(cls).toContain('gap-2');
    expect(cls).toContain('font-bold');
    expect(cls).toContain('transition-all');
    expect(cls).toContain('focus-visible:ring-2');
    expect(cls).toContain('disabled:opacity-50');
    expect(cls).toContain('aria-disabled:opacity-50');
    expect(cls).toContain('h-10');
    expect(cls).toContain('px-4');
    expect(cls).toContain('py-2');
    expect(cls).toContain('text-sm');
  });
});

async function createFixture(
  inputs: Partial<Pick<ButtonTokenTestComponent, 'variant' | 'shadow'>> = {}
): Promise<ComponentFixture<ButtonTokenTestComponent>> {
  await TestBed.configureTestingModule({
    imports: [ButtonTokenTestComponent],
  }).compileComponents();

  const fixture = TestBed.createComponent(ButtonTokenTestComponent);
  Object.assign(fixture.componentInstance, inputs);
  fixture.detectChanges();

  return fixture;
}

function findButton(
  fixture: ComponentFixture<ButtonTokenTestComponent>
): HTMLButtonElement {
  return fixture.nativeElement.querySelector(
    'button[nbButton]'
  ) as HTMLButtonElement;
}
