import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbAvatar } from './nb-avatar';

@Component({
  imports: [NbAvatar],
  template: `<nb-avatar alt="John Doe">JD</nb-avatar>`,
})
class AvatarTokenTest {}

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
    expect(avatar.style.cssText).not.toContain('--nb-resolved');
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

async function createFixture(): Promise<
  ComponentFixture<AvatarTokenTest>
> {
  await TestBed.configureTestingModule({
    imports: [AvatarTokenTest],
  }).compileComponents();

  const fixture = TestBed.createComponent(AvatarTokenTest);
  fixture.detectChanges();

  return fixture;
}

function findAvatar(
  fixture: ComponentFixture<AvatarTokenTest>
): HTMLElement {
  return fixture.nativeElement.querySelector('nb-avatar') as HTMLElement;
}
