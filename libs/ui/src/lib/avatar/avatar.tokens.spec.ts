import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import {
  NbAvatar,
  type NbAvatarBorder,
  type NbAvatarRadius,
  type NbAvatarShadow,
  type NbAvatarTone,
} from './nb-avatar';

@Component({
  imports: [NbAvatar],
  template: `<nb-avatar
    alt="John Doe"
    [tone]="tone"
    [radius]="radius"
    [shadow]="shadow"
    [border]="border"
  >JD</nb-avatar>`,
})
class AvatarTokenTest {
  tone: NbAvatarTone | undefined = undefined;
  radius: NbAvatarRadius | null = null;
  shadow: NbAvatarShadow | null = null;
  border: NbAvatarBorder | null = null;
}

describe('NbAvatar token surface', () => {
  it('leaves default visuals to CSS token fallbacks', async () => {
    const fixture = await createFixture();
    const avatar = findAvatar(fixture);

    expect(avatar.style.getPropertyValue('background')).toBe('');
    expect(avatar.style.getPropertyValue('color')).toBe('');
    expect(avatar.style.getPropertyValue('border-color')).toBe('');
    expect(avatar.style.getPropertyValue('--nb-avatar-bg')).toBe('');
    expect(avatar.style.getPropertyValue('border-radius')).toBe('');
    expect(avatar.style.getPropertyValue('box-shadow')).toBe('');
    expect(avatar.style.getPropertyValue('border-width')).toBe('');
    expect(avatar.style.getPropertyValue('--nb-avatar-radius')).toBe('');
    expect(avatar.style.getPropertyValue('--nb-avatar-shadow')).toBe('');
    expect(avatar.style.getPropertyValue('--nb-avatar-border-width')).toBe('');
    expect(avatar.style.cssText).not.toContain('--nb-resolved');
  });

  it('reflects tone semantically without writing final colors inline', async () => {
    const fixture = await createFixture({ tone: 'secondary' });
    const avatar = findAvatar(fixture);

    expect(avatar.getAttribute('data-nb-tone')).toBe('secondary');
    expect(avatar.style.getPropertyValue('background')).toBe('');
    expect(avatar.style.getPropertyValue('color')).toBe('');
    expect(avatar.style.getPropertyValue('border-color')).toBe('');
    expect(avatar.style.getPropertyValue('--nb-avatar-bg')).toBe('');
  });

  it('writes explicit scalar inputs to public CSS variables', async () => {
    const fixture = await createFixture({
      radius: 'full',
      shadow: 'sm',
      border: 'thin',
    });
    const avatar = findAvatar(fixture);

    expect(avatar.style.getPropertyValue('border-radius')).toBe('');
    expect(avatar.style.getPropertyValue('box-shadow')).toBe('');
    expect(avatar.style.getPropertyValue('border-width')).toBe('');
    expect(avatar.style.getPropertyValue('--nb-avatar-radius')).toBe(
      'var(--nb-radius-full, 9999px)'
    );
    expect(avatar.style.getPropertyValue('--nb-avatar-shadow')).toBe(
      'var(--nb-shadow-sm, calc(var(--nb-shadow-offset-x) * 0.5) calc(var(--nb-shadow-offset-y) * 0.5) 0 0 var(--nb-shadow))'
    );
    expect(avatar.style.getPropertyValue('--nb-avatar-border-width')).toBe(
      'var(--nb-border-width-thin, 1px)'
    );
  });

  it('does not emit legacy token utility classes', async () => {
    const fixture = await createFixture();
    const avatar = findAvatar(fixture);
    const cls = avatar.className;

    expect(cls).not.toMatch(/(?:^|\s)nb-tone(?:\s|$)/);
    expect(cls).not.toMatch(/(?:^|\s)nb-border-width(?:\s|$)/);
    expect(cls).not.toMatch(/(?:^|\s)nb-radius(?:\s|$)/);
    expect(cls).not.toMatch(/(?:^|\s)nb-shadow(?:\s|$)/);
    expect(cls).not.toContain('bg-(--nb-avatar-bg)');
    expect(cls).not.toContain('text-(--nb-avatar-fg)');
    expect(cls).not.toContain('border-(--nb-avatar-border-color)');
    expect(cls).not.toContain('bg-(--nb-secondary-background)');
    expect(cls).not.toContain('text-(--nb-foreground)');
    expect(cls).not.toContain('border-(--nb-border)');
    expect(cls).not.toContain('rounded-full');
  });

  it('keeps anatomy out of host classes', async () => {
    const fixture = await createFixture();
    const avatar = findAvatar(fixture);

    expect(avatar.className).toBe('');
    expect(avatar.getAttribute('data-slot')).toBe('avatar');
  });
});

async function createFixture(
  inputs: Partial<
    Pick<AvatarTokenTest, 'tone' | 'radius' | 'shadow' | 'border'>
  > = {}
): Promise<ComponentFixture<AvatarTokenTest>> {
  await TestBed.configureTestingModule({
    imports: [AvatarTokenTest],
  }).compileComponents();

  const fixture = TestBed.createComponent(AvatarTokenTest);
  Object.assign(fixture.componentInstance, inputs);
  fixture.detectChanges();

  return fixture;
}

function findAvatar(
  fixture: ComponentFixture<AvatarTokenTest>
): HTMLElement {
  return fixture.nativeElement.querySelector('nb-avatar') as HTMLElement;
}
