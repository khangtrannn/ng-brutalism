import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbButton } from './nb-button';
import { NbButtonTrailingIcon } from './nb-button-trailing-icon';
import type { NbButtonShadow, NbButtonVariant } from './button.types';

@Component({
  imports: [NbButton],
  template: `<button nbButton [variant]="variant" [shadow]="shadow">
    Button
  </button>`,
})
class ButtonTokenTest {
  variant: NbButtonVariant = 'default';
  shadow: NbButtonShadow = 'default';
}

@Component({
  imports: [NbButton],
  template: `<button nbButton fullWidth>Save</button>`,
})
class FullWidthButtonTest {}

@Component({
  imports: [NbButton, NbButtonTrailingIcon],
  template: `
    <button nbButton>
      Continue
      <span nbButtonTrailingIcon size="md">Icon</span>
    </button>
  `,
})
class TrailingIconDefaultTest {}

@Component({
  imports: [NbButton, NbButtonTrailingIcon],
  template: `
    <button nbButton fullWidth>
      Continue
      <span nbButtonTrailingIcon push="end" size="md">Icon</span>
    </button>
  `,
})
class TrailingIconPushEndTest {}

describe('NbButton token surface', () => {
  it('declares the expected default tokens on the base host', async () => {
    const fixture = await createFixture();
    const button = findButton(fixture);
    const cls = button.className;

    expect(cls).toContain('[--nb-button-bg:var(--nb-main)]');
    expect(cls).toContain('[--nb-button-fg:var(--nb-main-foreground)]');
    expect(cls).toContain('[--nb-button-border-color:var(--nb-border)]');
    // Border width is now written as a component variable by the border
    // capability (default strength -> var(--nb-border-width)).
    expect(button.style.getPropertyValue('--nb-button-border-width')).toBe(
      'var(--nb-border-width)'
    );
    // Radius is now written as a component variable by the radius capability.
    expect(button.style.getPropertyValue('--nb-button-radius')).toBe(
      'var(--nb-radius)'
    );
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
    expect(cls).toContain('border-(length:--nb-button-border-width)');
    expect(cls).toContain('border-(--nb-button-border-color)');
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

  it('fullWidth bare attribute makes the button full width', async () => {
    await TestBed.configureTestingModule({
      imports: [FullWidthButtonTest],
    }).compileComponents();
    const fixture = TestBed.createComponent(FullWidthButtonTest);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button[nbButton]') as HTMLButtonElement;

    expect(button.className).toContain('w-full');
  });

  it('does not push trailing icons by default', async () => {
    await TestBed.configureTestingModule({
      imports: [TrailingIconDefaultTest],
    }).compileComponents();
    const fixture = TestBed.createComponent(TrailingIconDefaultTest);
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector(
      '[nbButtonTrailingIcon]'
    ) as HTMLElement;

    expect(icon.className).not.toContain('ml-auto');
    expect(icon.className).toContain('inline-flex');
  });

  it('pushes trailing icons to the end when requested', async () => {
    await TestBed.configureTestingModule({
      imports: [TrailingIconPushEndTest],
    }).compileComponents();
    const fixture = TestBed.createComponent(TrailingIconPushEndTest);
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector(
      '[nbButtonTrailingIcon]'
    ) as HTMLElement;

    expect(icon.className).toContain('ml-auto');
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
    expect(cls).toContain('h-11');
    expect(cls).toContain('px-4');
    expect(cls).toContain('text-base');
  });
});

async function createFixture(
  inputs: Partial<Pick<ButtonTokenTest, 'variant' | 'shadow'>> = {}
): Promise<ComponentFixture<ButtonTokenTest>> {
  await TestBed.configureTestingModule({
    imports: [ButtonTokenTest],
  }).compileComponents();

  const fixture = TestBed.createComponent(ButtonTokenTest);
  Object.assign(fixture.componentInstance, inputs);
  fixture.detectChanges();

  return fixture;
}

function findButton(
  fixture: ComponentFixture<ButtonTokenTest>
): HTMLButtonElement {
  return fixture.nativeElement.querySelector(
    'button[nbButton]'
  ) as HTMLButtonElement;
}
