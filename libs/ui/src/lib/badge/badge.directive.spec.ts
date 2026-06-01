import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbBadge } from './nb-badge';

@Component({
  imports: [NbBadge],
  template: `<span nbBadge>New</span>`,
})
class BadgeTest {}

describe('NbBadge', () => {
  it('uses the shared radius marker with a badge-specific default', async () => {
    const fixture = await createFixture(BadgeTest);
    const badge = fixture.nativeElement.querySelector(
      'span[nbBadge]'
    ) as HTMLSpanElement;

    expect(badge.className).toContain('nb-radius');
    expect(badge.style.getPropertyValue('--_nb-radius-default')).toBe('9999px');
    expect(badge.style.getPropertyValue('--nb-radius-token')).toBe(
      'var(--nb-badge-radius, var(--_nb-radius-default))'
    );
    expect(badge.className).not.toContain('rounded-nb');
  });
});

async function createFixture<T>(
  component: new () => T
): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [component],
  }).compileComponents();

  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();

  return fixture;
}
