import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbButton } from './nb-button';
import { NbButtonTrailingIcon } from './nb-button-trailing-icon';
import type {
  NbButtonPress,
  NbButtonShadow,
  NbButtonTone,
  NbButtonSize,
} from './button.types';

@Component({
  imports: [NbButton],
  template: `<button nbButton [tone]="tone" [shadow]="shadow" [size]="size">
    Button
  </button>`,
})
class ButtonTokenTest {
  tone: NbButtonTone | undefined = undefined;
  shadow: NbButtonShadow = 'default';
  size: NbButtonSize = 'md';
}

@Component({
  imports: [NbButton],
  template: `<button nbButton [press]="press">Button</button>`,
})
class ButtonPressTest {
  press: NbButtonPress = 'push';
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
  it('reads its scoped tokens instead of global tokens directly', async () => {
    const fixture = await createFixture();
    const button = findButton(fixture);
    const cls = button.className;

    expect(cls).toContain('nb-tone');
    expect(cls).toContain('nb-border-width');
    expect(cls).toContain('nb-radius');
    expect(cls).toContain('nb-shadow');
    expect(cls).not.toContain('bg-(--nb-button-bg)');
    expect(cls).not.toContain('text-(--nb-button-fg)');
    expect(cls).not.toContain('border-(--nb-button-border-color)');
    expect(cls).not.toContain('bg-(--nb-main)');
    expect(cls).not.toContain('rounded-nb');
    expect(cls).not.toContain('shadow-nb');
  });

  it('uses the default tone (primary) when tone is omitted', async () => {
    const fixture = await createFixture();
    const button = findButton(fixture);

    expect(button.style.getPropertyValue('--_nb-tone-bg-default')).toBe(
      'var(--nb-primary)'
    );
    expect(button.style.getPropertyValue('--_nb-tone-fg-default')).toBe(
      'var(--nb-primary-foreground)'
    );
    expect(button.style.getPropertyValue('--_nb-tone-border-color-default')).toBe(
      'var(--nb-border)'
    );
    expect(button.style.getPropertyValue('--_nb-tone-bg-token')).toBe(
      'var(--nb-button-bg, var(--_nb-tone-bg-default))'
    );
    expect(button.style.getPropertyValue('--nb-button-bg')).toBe('');
    expect(button.style.getPropertyValue('background-color')).toBe('');
  });

  it('writes private default border-width, radius, and shadow capability variables', async () => {
    const fixture = await createFixture();
    const button = findButton(fixture);

    expect(button.style.getPropertyValue('--_nb-border-width-default')).toBe(
      'var(--nb-border-width)'
    );
    expect(button.style.getPropertyValue('--_nb-radius-default')).toBe(
      'var(--nb-radius)'
    );
    expect(button.style.getPropertyValue('--_nb-shadow-default')).toBe(
      'var(--nb-shadow-offset-x) var(--nb-shadow-offset-y) 0 0 var(--nb-shadow)'
    );
  });

  it.each([
    ['lavender', 'var(--nb-lavender)', 'rgb(0, 0, 0)'],
    ['primary', 'var(--nb-primary)', 'var(--nb-primary-foreground)'],
    ['secondary', 'var(--nb-secondary)', 'var(--nb-secondary-foreground)'],
    ['accent', 'var(--nb-accent)', 'var(--nb-accent-foreground)'],
    ['danger', 'var(--nb-danger)', 'var(--nb-danger-foreground)'],
    ['success', 'var(--nb-success)', 'var(--nb-success-foreground)'],
    ['warning', 'var(--nb-warning)', 'var(--nb-warning-foreground)'],
    ['background', 'var(--nb-background)', 'var(--nb-foreground)'],
  ] satisfies Array<[NbButtonTone, string, string]>)(
    'tone="%s" writes final tone styles and leaves public tokens user-owned',
    async (tone, bg, fg) => {
      const fixture = await createFixture({ tone });
      const button = findButton(fixture);

      expect(button.style.getPropertyValue('background-color')).toBe(bg);
      expect(button.style.getPropertyValue('color')).toBe(fg);
      expect(button.style.getPropertyValue('border-color')).toBe(
        'var(--nb-border)'
      );
      expect(button.style.getPropertyValue('--nb-button-bg')).toBe('');
      expect(button.style.getPropertyValue('--nb-button-fg')).toBe('');
      expect(button.style.getPropertyValue('--nb-button-border-color')).toBe('');
    }
  );

  it('shadow="none" resolves through the shared shadow capability', async () => {
    const fixture = await createFixture({ shadow: 'none' });
    const button = findButton(fixture);

    expect(button.getAttribute('data-shadow')).toBe('none');
    expect(button.style.getPropertyValue('box-shadow')).toBe('none');
    expect(button.style.getPropertyValue('--nb-button-shadow')).toBe('');
  });

  it('shadow="hard" resolves through the shared shadow capability', async () => {
    const fixture = await createFixture({ shadow: 'hard' });
    const button = findButton(fixture);

    expect(button.getAttribute('data-shadow')).toBe('hard');
    expect(button.style.getPropertyValue('box-shadow')).toBe(
      '6px 6px 0 0 var(--nb-shadow)'
    );
  });

  it('press="reverse" changes only the interaction direction', async () => {
    const fixture = await createPressFixture('reverse');
    const button = findPressButton(fixture);
    const cls = button.className;

    expect(button.getAttribute('data-press')).toBe('reverse');
    expect(cls).toContain('hover:-translate-x-(--nb-reverse-shadow-offset-x)');
    expect(cls).toContain('hover:-translate-y-(--nb-reverse-shadow-offset-y)');
  });

  it('press="none" disables hover translation', async () => {
    const fixture = await createPressFixture('none');
    const button = findPressButton(fixture);
    const cls = button.className;

    expect(button.getAttribute('data-press')).toBe('none');
    expect(cls).not.toContain('hover:translate-x-(--nb-shadow-offset-x)');
    expect(cls).not.toContain('hover:-translate-x-(--nb-reverse-shadow-offset-x)');
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
  inputs: Partial<Pick<ButtonTokenTest, 'tone' | 'shadow' | 'size'>> = {}
): Promise<ComponentFixture<ButtonTokenTest>> {
  await TestBed.configureTestingModule({
    imports: [ButtonTokenTest],
  }).compileComponents();

  const fixture = TestBed.createComponent(ButtonTokenTest);
  Object.assign(fixture.componentInstance, inputs);
  fixture.detectChanges();

  return fixture;
}

async function createPressFixture(
  press: NbButtonPress
): Promise<ComponentFixture<ButtonPressTest>> {
  await TestBed.configureTestingModule({
    imports: [ButtonPressTest],
  }).compileComponents();

  const fixture = TestBed.createComponent(ButtonPressTest);
  fixture.componentInstance.press = press;
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

function findPressButton(
  fixture: ComponentFixture<ButtonPressTest>
): HTMLButtonElement {
  return fixture.nativeElement.querySelector(
    'button[nbButton]'
  ) as HTMLButtonElement;
}
