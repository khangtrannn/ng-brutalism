import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import {
  NbCard,
  NbCardActions,
  NbCardContent,
  NbCardDescription,
  NbCardFooter,
  NbCardHeader,
  NbCardTitle,
} from './nb-card';

@Component({
  standalone: true,
  imports: [
    NbCard,
    NbCardHeader,
    NbCardTitle,
    NbCardDescription,
    NbCardContent,
    NbCardActions,
    NbCardFooter,
  ],
  template: `
    <nb-card>
      <nb-card-header>
        <nb-card-title>Notifications</nb-card-title>
        <nb-card-description>Unread messages</nb-card-description>
      </nb-card-header>
      <nb-card-content>Card content</nb-card-content>
      <nb-card-actions align="end">Card actions</nb-card-actions>
      <nb-card-footer>
        Card footer
        <nb-card-actions>Nested actions</nb-card-actions>
      </nb-card-footer>
    </nb-card>
  `,
})
class CardTokenTestComponent {}

describe('NbCard token surface', () => {
  it('declares the expected default tokens on the base host', async () => {
    const fixture = await createFixture();
    const card = findCard(fixture);
    const cls = card.className;

    expect(cls).toContain('[--nb-card-bg:var(--nb-background)]');
    expect(cls).toContain('[--nb-card-fg:var(--nb-foreground)]');
    expect(cls).toContain('[--nb-card-border:var(--nb-border)]');
    expect(cls).toContain('[--nb-card-radius:18px]');
    expect(cls).toContain(
      '[--nb-card-shadow:var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_var(--nb-shadow)]'
    );
  });

  it('reads its scoped tokens instead of global tokens directly', async () => {
    const fixture = await createFixture();
    const card = findCard(fixture);
    const cls = card.className;

    expect(cls).toContain('bg-(--nb-card-bg)');
    expect(cls).toContain('text-(--nb-card-fg)');
    expect(cls).toContain('border-(--nb-card-border)');
    expect(cls).toContain('rounded-(--nb-card-radius)');
    expect(cls).toContain('shadow-[var(--nb-card-shadow)]');
    expect(cls).not.toContain('bg-(--nb-background)');
    expect(cls).not.toContain('text-(--nb-foreground)');
    expect(cls).not.toContain('border-(--nb-border)');
    expect(cls).not.toContain('rounded-nb');
    expect(cls).not.toContain('shadow-nb');
  });

  it('does not regress the default card class shape', async () => {
    const fixture = await createFixture();
    const card = findCard(fixture);
    const cls = card.className;

    expect(cls).toContain('flex');
    expect(cls).toContain('flex-col');
    expect(cls).toContain('gap-6');
    expect(cls).toContain('py-6');
    expect(cls).toContain('border-2');
    expect(cls).toContain('font-medium');
  });

  it('does not regress the card sub-part class shape', async () => {
    const fixture = await createFixture();
    const host = fixture.nativeElement as HTMLElement;

    expect(findSlot(host, 'card-header').className).toContain('grid');
    expect(findSlot(host, 'card-header').className).toContain('auto-rows-min');
    expect(findSlot(host, 'card-title').className).toContain('font-bold');
    expect(findSlot(host, 'card-description').className).toContain('text-sm');
    expect(findSlot(host, 'card-content').className).toContain('px-6');
    expect(findSlot(host, 'card-actions').className).toContain('flex-wrap');
    expect(findSlot(host, 'card-actions').className).toContain('justify-end');
    expect(findSlot(host, 'card-footer').className).toContain('flex');
    expect(findSlot(host, 'card-footer').className).toContain(
      'has-[[data-slot=card-actions]]:justify-between'
    );
  });
});

async function createFixture(): Promise<
  ComponentFixture<CardTokenTestComponent>
> {
  await TestBed.configureTestingModule({
    imports: [CardTokenTestComponent],
  }).compileComponents();

  const fixture = TestBed.createComponent(CardTokenTestComponent);
  fixture.detectChanges();

  return fixture;
}

function findCard(
  fixture: ComponentFixture<CardTokenTestComponent>
): HTMLElement {
  return fixture.nativeElement.querySelector('nb-card') as HTMLElement;
}

function findSlot(host: HTMLElement, slot: string): HTMLElement {
  return host.querySelector(`[data-slot="${slot}"]`) as HTMLElement;
}
