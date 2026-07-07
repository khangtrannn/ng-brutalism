import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbAvatarGroup } from './nb-avatar-group';

@Component({
  imports: [NbAvatarGroup],
  template: `<nb-avatar-group><span>A</span><span>B</span></nb-avatar-group>`,
})
class DefaultAvatarGroupTest {}

@Component({
  imports: [NbAvatarGroup],
  template: `<nb-avatar-group [overflow]="3"><span>A</span></nb-avatar-group>`,
})
class OverflowAvatarGroupTest {}

describe('NbAvatarGroup', () => {
  it('does not render an overflow badge by default', async () => {
    const fixture = await createFixture(DefaultAvatarGroupTest);
    const group = findGroup(fixture);

    expect(group.getAttribute('data-nb-avatar-group')).toBe('');
    expect(group.querySelector('[data-slot="avatar-group-overflow"]')).toBeNull();
  });

  it('renders an accessible overflow badge when overflow > 0', async () => {
    const fixture = await createFixture(OverflowAvatarGroupTest);
    const overflow = findGroup(fixture).querySelector(
      '[data-slot="avatar-group-overflow"]'
    ) as HTMLElement;

    expect(overflow.textContent?.trim()).toBe('+3');
    expect(overflow.getAttribute('aria-label')).toBe('3 more');
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

function findGroup(fixture: ComponentFixture<unknown>): HTMLElement {
  return fixture.nativeElement.querySelector('nb-avatar-group') as HTMLElement;
}
