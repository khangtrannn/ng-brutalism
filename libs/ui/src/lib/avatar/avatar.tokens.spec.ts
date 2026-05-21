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
  it('declares the expected default tokens on the base host', async () => {
    const fixture = await createFixture();
    const avatar = findAvatar(fixture);
    const cls = avatar.className;

    expect(cls).toContain('[--nb-avatar-bg:var(--nb-secondary-background)]');
    expect(cls).toContain('[--nb-avatar-fg:var(--nb-foreground)]');
    expect(cls).toContain('[--nb-avatar-border:var(--nb-border)]');
    expect(cls).toContain('[--nb-avatar-radius:9999px]');
    expect(cls).toContain('[--nb-avatar-shadow:2px_2px_0_0_var(--nb-shadow)]');
  });

  it('reads its scoped tokens instead of global tokens directly', async () => {
    const fixture = await createFixture();
    const avatar = findAvatar(fixture);
    const cls = avatar.className;

    expect(cls).toContain('bg-(--nb-avatar-bg)');
    expect(cls).toContain('text-(--nb-avatar-fg)');
    expect(cls).toContain('border-(--nb-avatar-border)');
    expect(cls).toContain('rounded-(--nb-avatar-radius)');
    expect(cls).toContain('shadow-[var(--nb-avatar-shadow)]');
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
    expect(cls).toContain('border-2');
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
