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

  it('does not regress the default avatar class shape', async () => {
    const fixture = await createFixture();
    const avatar = findAvatar(fixture);
    const cls = avatar.className;

    expect(cls).toContain('relative');
    expect(cls).toContain('inline-flex');
    expect(cls).toContain('h-10');
    expect(cls).toContain('w-10');
    expect(cls).toContain('shrink-0');
    expect(cls).toContain('overflow-hidden');
    expect(cls).toContain('font-bold');
    expect(cls).toContain('text-sm');
    expect(cls).toContain('items-center');
    expect(cls).toContain('justify-center');
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
