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
  NbButtonRadius,
} from './button.types';
import type { NbBorderStrength } from '../tokens/border';

@Component({
  imports: [NbButton],
  template: `<button
    nbButton
    [tone]="tone"
    [radius]="radius"
    [shadow]="shadow"
    [border]="border"
    [size]="size"
  >
    Button
  </button>`,
})
class ButtonTokenTest {
  tone: NbButtonTone | undefined = undefined;
  radius: NbButtonRadius | null = null;
  shadow: NbButtonShadow | null = null;
  border: NbBorderStrength | null = null;
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
  imports: [NbButton],
  template: `<button nbButton tone="yellow">Yellow</button>`,
})
class ToneInputButtonTokenTest {}

@Component({
  imports: [NbButton],
  template: `
    <button id="local" nbButton style="--nb-button-bg: red">Local red</button>
    <button id="sibling" nbButton>Default</button>
  `,
})
class LocalScopedButtonTokenTest {}

@Component({
  imports: [NbButton],
  template: `
    <div id="scope" style="--nb-button-bg: red">
      <button id="first" nbButton>First red</button>
      <button id="second" nbButton>Second red</button>
    </div>
  `,
})
class ParentScopedButtonTokenTest {}

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

@Component({
  imports: [NbButton, NbButtonTrailingIcon],
  template: `
    <button nbButton>
      Continue
      <span nbButtonTrailingIcon shape="square" tone="inverse" size="lg">
        Icon
      </span>
    </button>
  `,
})
class TrailingIconTokenTest {}

describe('NbButton token surface', () => {
  it('reads its scoped tokens instead of global tokens directly', async () => {
    const fixture = await createFixture();
    const button = findButton(fixture);
    const cls = button.className;

    expect(cls).not.toMatch(/(?:^|\s)nb-tone(?:\s|$)/);
    expect(cls).not.toMatch(/(?:^|\s)nb-border-width(?:\s|$)/);
    expect(cls).not.toMatch(/(?:^|\s)nb-radius(?:\s|$)/);
    expect(cls).not.toMatch(/(?:^|\s)nb-shadow(?:\s|$)/);
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

    expect(button.style.getPropertyValue('background')).toBe('');
    expect(button.style.getPropertyValue('color')).toBe('');
    expect(button.style.getPropertyValue('border-color')).toBe('');
    expect(button.style.getPropertyValue('--nb-button-bg')).toBe('');
    expect(button.style.cssText).not.toContain('--nb-resolved');
  });

  it('reflects tone semantically without writing final colors inline', async () => {
    await TestBed.configureTestingModule({
      imports: [ToneInputButtonTokenTest],
    }).compileComponents();
    const fixture = TestBed.createComponent(ToneInputButtonTokenTest);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector(
      'button[nbButton]'
    ) as HTMLButtonElement;

    expect(button.getAttribute('data-nb-tone')).toBe('yellow');
    expect(button.style.getPropertyValue('background')).toBe('');
    expect(button.style.getPropertyValue('color')).toBe('');
    expect(button.style.getPropertyValue('border-color')).toBe('');
    expect(button.style.getPropertyValue('--nb-button-bg')).toBe('');
    expect(button.style.cssText).not.toContain('--nb-resolved');
  });

  it('keeps an inline button token local to that button', async () => {
    await TestBed.configureTestingModule({
      imports: [LocalScopedButtonTokenTest],
    }).compileComponents();
    const fixture = TestBed.createComponent(LocalScopedButtonTokenTest);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const local = host.querySelector<HTMLButtonElement>('#local')!;
    const sibling = host.querySelector<HTMLButtonElement>('#sibling')!;

    expect(local.style.getPropertyValue('--nb-button-bg')).toBe('red');
    expect(local.style.getPropertyValue('background')).toBe('');
    expect(sibling.style.getPropertyValue('--nb-button-bg')).toBe('');
    expect(sibling.style.getPropertyValue('background')).toBe('');
    expect(local.style.cssText).not.toContain('--nb-resolved');
    expect(sibling.style.cssText).not.toContain('--nb-resolved');
  });

  it('lets parent-scoped button tokens apply to all descendant buttons', async () => {
    await TestBed.configureTestingModule({
      imports: [ParentScopedButtonTokenTest],
    }).compileComponents();
    const fixture = TestBed.createComponent(ParentScopedButtonTokenTest);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const scope = host.querySelector<HTMLElement>('#scope')!;
    const buttons = Array.from(
      scope.querySelectorAll<HTMLButtonElement>('button[nbButton]')
    );

    expect(scope.style.getPropertyValue('--nb-button-bg')).toBe('red');
    expect(buttons).toHaveLength(2);
    for (const button of buttons) {
      expect(button.style.getPropertyValue('--nb-button-bg')).toBe('');
      expect(button.style.getPropertyValue('background')).toBe('');
      expect(button.style.cssText).not.toContain('--nb-resolved');
    }
  });

  it('leaves scalar visual defaults to CSS token fallbacks', async () => {
    const fixture = await createFixture();
    const button = findButton(fixture);

    expect(button.style.getPropertyValue('border-width')).toBe('');
    expect(button.style.getPropertyValue('border-radius')).toBe('');
    expect(button.style.getPropertyValue('box-shadow')).toBe('');
    expect(button.style.getPropertyValue('--nb-button-radius')).toBe('');
    expect(button.style.getPropertyValue('--nb-button-shadow')).toBe('');
    expect(button.style.getPropertyValue('--nb-button-border-width')).toBe('');
    expect(button.style.cssText).not.toContain('--nb-resolved');
  });

  it.each([
    ['surface', 'var(--nb-surface)', 'var(--nb-surface-foreground)'],
    ['lavender', 'var(--nb-lavender)', '#000000'],
    ['primary', 'var(--nb-primary)', 'var(--nb-primary-foreground)'],
    ['secondary', 'var(--nb-secondary)', 'var(--nb-secondary-foreground)'],
    ['accent', 'var(--nb-accent)', 'var(--nb-accent-foreground)'],
    ['danger', 'var(--nb-danger)', 'var(--nb-danger-foreground)'],
    ['success', 'var(--nb-success)', 'var(--nb-success-foreground)'],
    ['warning', 'var(--nb-warning)', 'var(--nb-warning-foreground)'],
    ['background', 'var(--nb-background)', 'var(--nb-foreground)'],
  ] satisfies Array<[NbButtonTone, string, string]>)(
    'tone="%s" reflects semantically and leaves public tokens user-owned',
    async (tone) => {
      const fixture = await createFixture({ tone });
      const button = findButton(fixture);

      expect(button.getAttribute('data-nb-tone')).toBe(tone);
      expect(button.style.getPropertyValue('background')).toBe('');
      expect(button.style.getPropertyValue('color')).toBe('');
      expect(button.style.getPropertyValue('border-color')).toBe('');
      expect(button.style.getPropertyValue('--nb-button-bg')).toBe('');
      expect(button.style.getPropertyValue('--nb-button-fg')).toBe('');
      expect(button.style.getPropertyValue('--nb-button-border-color')).toBe('');
      expect(button.style.cssText).not.toContain('--nb-resolved');
    }
  );

  it('shadow="none" writes the public shadow variable', async () => {
    const fixture = await createFixture({ shadow: 'none' });
    const button = findButton(fixture);

    expect(button.style.getPropertyValue('box-shadow')).toBe('');
    expect(button.style.getPropertyValue('--nb-button-shadow')).toBe('none');
    expect(button.style.cssText).not.toContain('--nb-resolved');
  });

  it('explicit scalar inputs write public CSS variables', async () => {
    const fixture = await createFixture({
      radius: 'md',
      shadow: 'hard',
      border: 'strong',
    });
    const button = findButton(fixture);

    expect(button.style.getPropertyValue('border-radius')).toBe('');
    expect(button.style.getPropertyValue('box-shadow')).toBe('');
    expect(button.style.getPropertyValue('border-width')).toBe('');
    expect(button.style.getPropertyValue('--nb-button-radius')).toBe(
      'var(--nb-radius-md, 0.5rem)'
    );
    expect(button.style.getPropertyValue('--nb-button-shadow')).toBe(
      'var(--nb-shadow-hard, calc(var(--nb-shadow-offset-x) * 1.5) calc(var(--nb-shadow-offset-y) * 1.5) 0 0 var(--nb-shadow))'
    );
    expect(button.style.getPropertyValue('--nb-button-border-width')).toBe(
      'var(--nb-border-width-strong, 3px)'
    );
    expect(button.style.cssText).not.toContain('--nb-resolved');
  });

  it('press="reverse" changes only the interaction direction', async () => {
    const fixture = await createPressFixture('reverse');
    const button = findPressButton(fixture);

    expect(button.getAttribute('data-press')).toBe('reverse');
  });

  it('press="none" disables hover translation', async () => {
    const fixture = await createPressFixture('none');
    const button = findPressButton(fixture);

    expect(button.getAttribute('data-press')).toBe('none');
  });

  it('fullWidth bare attribute makes the button full width', async () => {
    await TestBed.configureTestingModule({
      imports: [FullWidthButtonTest],
    }).compileComponents();
    const fixture = TestBed.createComponent(FullWidthButtonTest);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button[nbButton]') as HTMLButtonElement;

    expect(button.getAttribute('data-full-width')).toBe('');
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

    expect(icon.className).toBe('');
    expect(icon.getAttribute('data-push')).toBe('none');
    expect(icon.getAttribute('data-size')).toBe('md');
    expect(icon.style.getPropertyValue('width')).toBe('');
    expect(icon.style.getPropertyValue('height')).toBe('');
    expect(icon.style.getPropertyValue('border-radius')).toBe('');
    expect(icon.style.getPropertyValue('--nb-button-trailing-icon-size')).toBe(
      '2rem'
    );
    expect(icon.style.getPropertyValue('--nb-button-trailing-icon-radius')).toBe(
      ''
    );
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

    expect(icon.className).toBe('');
    expect(icon.getAttribute('data-push')).toBe('end');
  });

  it('writes trailing icon scalar inputs to public CSS variables', async () => {
    await TestBed.configureTestingModule({
      imports: [TrailingIconTokenTest],
    }).compileComponents();
    const fixture = TestBed.createComponent(TrailingIconTokenTest);
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector(
      '[nbButtonTrailingIcon]'
    ) as HTMLElement;

    expect(icon.getAttribute('data-size')).toBe('lg');
    expect(icon.getAttribute('data-shape')).toBe('square');
    expect(icon.getAttribute('data-tone')).toBe('inverse');
    expect(icon.style.getPropertyValue('width')).toBe('');
    expect(icon.style.getPropertyValue('height')).toBe('');
    expect(icon.style.getPropertyValue('border-radius')).toBe('');
    expect(icon.style.getPropertyValue('background')).toBe('');
    expect(icon.style.getPropertyValue('color')).toBe('');
    expect(icon.style.getPropertyValue('--nb-button-trailing-icon-size')).toBe(
      '2.5rem'
    );
    expect(icon.style.getPropertyValue('--nb-button-trailing-icon-radius')).toBe(
      'var(--nb-radius-sm, 0.25rem)'
    );
  });

  it('does not regress the default button anatomy data attributes', async () => {
    const fixture = await createFixture();
    const button = findButton(fixture);

    expect(button.getAttribute('data-press')).toBe('push');
    expect(button.getAttribute('data-size')).toBe('md');
    expect(button.getAttribute('data-full-width')).toBeNull();
    expect(button.className).toBe('');
  });
});

async function createFixture(
  inputs: Partial<
    Pick<ButtonTokenTest, 'tone' | 'radius' | 'shadow' | 'border' | 'size'>
  > = {}
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
