import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import {
  NbBadge,
  type NbBadgeBorder,
  type NbBadgeRadius,
  type NbBadgeShadow,
  type NbBadgeTone,
} from './nb-badge';

@Component({
  imports: [NbBadge],
  template: `<span
    nbBadge
    [tone]="tone"
    [radius]="radius"
    [shadow]="shadow"
    [border]="border"
  >Badge</span>`,
})
class BadgeTokenTest {
  tone: NbBadgeTone | undefined = undefined;
  radius: NbBadgeRadius | null = null;
  shadow: NbBadgeShadow | null = null;
  border: NbBadgeBorder | null = null;
}

describe('NbBadge token surface', () => {
  it('leaves default visuals to CSS token fallbacks', async () => {
    const fixture = await createFixture();
    const badge = findBadge(fixture);

    expect(badge.getAttribute('data-nb-tone')).toBeNull();
    expect(badge.style.getPropertyValue('background')).toBe('');
    expect(badge.style.getPropertyValue('color')).toBe('');
    expect(badge.style.getPropertyValue('border-color')).toBe('');
    expect(badge.style.getPropertyValue('--nb-badge-bg')).toBe('');
    expect(badge.style.cssText).not.toContain('--nb-resolved');
    expect(badge.style.getPropertyValue('border-radius')).toBe('');
    expect(badge.style.getPropertyValue('box-shadow')).toBe('');
    expect(badge.style.getPropertyValue('border-width')).toBe('');
    expect(badge.style.getPropertyValue('--nb-badge-radius')).toBe('');
    expect(badge.style.getPropertyValue('--nb-badge-shadow')).toBe('');
    expect(badge.style.getPropertyValue('--nb-badge-border-width')).toBe('');
  });

  it('does not emit legacy token utility classes', async () => {
    const fixture = await createFixture();
    const badge = findBadge(fixture);
    const cls = badge.className;

    expect(cls).not.toMatch(/(?:^|\s)nb-tone(?:\s|$)/);
    expect(cls).not.toMatch(/(?:^|\s)nb-border-width(?:\s|$)/);
    expect(cls).not.toMatch(/(?:^|\s)nb-radius(?:\s|$)/);
    expect(cls).not.toMatch(/(?:^|\s)nb-shadow(?:\s|$)/);
    expect(cls).not.toContain('bg-(--nb-badge-bg)');
    expect(cls).not.toContain('text-(--nb-badge-fg)');
    expect(cls).not.toContain('border-(--nb-badge-border-color)');
    expect(cls).not.toContain('bg-(--nb-accent)');
    expect(cls).not.toContain('border-(--nb-border)');
    expect(cls).not.toContain('rounded-nb');
    expect(cls).not.toContain('shadow-[2px_2px_0_0_var(--nb-shadow)]');
  });

  it.each([
    ['accent'],
    ['success'],
    ['warning'],
    ['danger'],
  ] satisfies Array<[NbBadgeTone]>)(
    'tone="%s" reflects semantically without writing final colors inline',
    async (tone) => {
      const fixture = await createFixture({ tone });
      const badge = findBadge(fixture);

      expect(badge.getAttribute('data-nb-tone')).toBe(tone);
      expect(badge.style.getPropertyValue('background')).toBe('');
      expect(badge.style.getPropertyValue('color')).toBe('');
      expect(badge.style.getPropertyValue('border-color')).toBe('');
      expect(badge.style.getPropertyValue('--nb-badge-bg')).toBe('');
      expect(badge.style.cssText).not.toContain('--nb-resolved');
    }
  );

  it('writes explicit scalar inputs to public CSS variables', async () => {
    const fixture = await createFixture({
      radius: 'sm',
      shadow: 'hard',
      border: 'strong',
    });
    const badge = findBadge(fixture);

    expect(badge.style.getPropertyValue('border-radius')).toBe('');
    expect(badge.style.getPropertyValue('box-shadow')).toBe('');
    expect(badge.style.getPropertyValue('border-width')).toBe('');
    expect(badge.style.getPropertyValue('--nb-badge-radius')).toBe(
      'var(--nb-radius-sm, 0.25rem)'
    );
    expect(badge.style.getPropertyValue('--nb-badge-shadow')).toBe(
      '6px 6px 0 0 var(--nb-shadow)'
    );
    expect(badge.style.getPropertyValue('--nb-badge-border-width')).toBe('3px');
  });

  it('keeps anatomy out of host classes', async () => {
    const fixture = await createFixture();
    const badge = findBadge(fixture);

    expect(badge.className).toBe('');
    expect(badge.getAttribute('data-nb-badge')).toBe('');
  });
});

async function createFixture(
  inputs: Partial<
    Pick<BadgeTokenTest, 'tone' | 'radius' | 'shadow' | 'border'>
  > = {}
): Promise<ComponentFixture<BadgeTokenTest>> {
  await TestBed.configureTestingModule({
    imports: [BadgeTokenTest],
  }).compileComponents();

  const fixture = TestBed.createComponent(BadgeTokenTest);
  Object.assign(fixture.componentInstance, inputs);
  fixture.detectChanges();

  return fixture;
}

function findBadge(
  fixture: ComponentFixture<BadgeTokenTest>
): HTMLSpanElement {
  return fixture.nativeElement.querySelector(
    'span[nbBadge]'
  ) as HTMLSpanElement;
}
