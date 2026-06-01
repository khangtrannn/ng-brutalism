import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbBadge, type NbBadgeTone } from './nb-badge';

@Component({
  imports: [NbBadge],
  template: `<span nbBadge [tone]="tone">Badge</span>`,
})
class BadgeTokenTest {
  tone: NbBadgeTone = 'white';
}

describe('NbBadge token surface', () => {
  it('declares the expected default tokens on the base host', async () => {
    const fixture = await createFixture();
    const badge = findBadge(fixture);

    expect(badge.style.getPropertyValue('--nb-badge-bg')).toBe('#ffffff');
    expect(badge.style.getPropertyValue('--nb-badge-fg')).toBe('#000000');
    expect(badge.style.getPropertyValue('--nb-badge-border-color')).toBe(
      'var(--nb-border)'
    );
    expect(badge.style.getPropertyValue('--_nb-radius-default')).toBe(
      '9999px'
    );
    expect(badge.style.getPropertyValue('--_nb-shadow-default')).toBe(
      '2px 2px 0 0 var(--nb-shadow)'
    );
    expect(badge.style.getPropertyValue('--_nb-border-width-default')).toBe(
      'var(--nb-border-width)'
    );
  });

  it('reads its scoped tokens instead of global tokens directly', async () => {
    const fixture = await createFixture();
    const badge = findBadge(fixture);
    const cls = badge.className;

    expect(cls).toContain('bg-(--nb-badge-bg)');
    expect(cls).toContain('text-(--nb-badge-fg)');
    expect(cls).toContain('nb-border-width');
    expect(cls).toContain('border-(--nb-badge-border-color)');
    expect(cls).toContain('nb-radius');
    expect(cls).toContain('nb-shadow');
    expect(cls).not.toContain('bg-(--nb-accent)');
    expect(cls).not.toContain('border-(--nb-border)');
    expect(cls).not.toContain('rounded-nb');
    expect(cls).not.toContain('shadow-[2px_2px_0_0_var(--nb-shadow)]');
  });

  it.each([
    ['accent', 'var(--nb-accent)', 'var(--nb-accent-foreground)'],
    ['success', 'var(--nb-success)', 'var(--nb-success-foreground)'],
    ['warning', 'var(--nb-warning)', 'var(--nb-warning-foreground)'],
    ['danger', 'var(--nb-danger)', 'var(--nb-danger-foreground)'],
  ] satisfies Array<[NbBadgeTone, string, string]>)(
    'tone="%s" resolves shared color tokens',
    async (tone, bg, fg) => {
      const fixture = await createFixture({ tone });
      const badge = findBadge(fixture);

      expect(badge.style.getPropertyValue('--nb-badge-bg')).toBe(bg);
      expect(badge.style.getPropertyValue('--nb-badge-fg')).toBe(fg);
    }
  );

  it('does not regress the default badge class shape', async () => {
    const fixture = await createFixture();
    const cls = findBadge(fixture).className;

    expect(cls).toContain('inline-flex');
    expect(cls).toContain('items-center');
    expect(cls).toContain('nb-border-width');
    expect(cls).toContain('px-2.5');
    expect(cls).toContain('py-0.5');
    expect(cls).toContain('text-xs');
    expect(cls).toContain('font-bold');
  });
});

async function createFixture(
  inputs: Partial<Pick<BadgeTokenTest, 'tone'>> = {}
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
