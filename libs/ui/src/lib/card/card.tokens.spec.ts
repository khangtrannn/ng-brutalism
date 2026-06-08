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
class CardTokenTest {}

describe('NbCard token surface', () => {
  it('leaves default visuals to CSS token fallbacks', async () => {
    const fixture = await createFixture();
    const card = findCard(fixture);

    expect(card.style.getPropertyValue('background')).toBe('');
    expect(card.style.getPropertyValue('color')).toBe('');
    expect(card.style.getPropertyValue('border-color')).toBe('');
    expect(card.style.getPropertyValue('--nb-card-bg')).toBe('');
    expect(card.style.getPropertyValue('border-radius')).toBe('');
    expect(card.style.getPropertyValue('box-shadow')).toBe('');
    expect(card.style.getPropertyValue('border-width')).toBe('');
    expect(card.style.cssText).not.toContain('--nb-resolved');
  });

  it('does not emit legacy token utility classes', async () => {
    const fixture = await createFixture();
    const card = findCard(fixture);
    const cls = card.className;

    expect(cls).not.toMatch(/(?:^|\s)nb-tone(?:\s|$)/);
    expect(cls).not.toMatch(/(?:^|\s)nb-border-width(?:\s|$)/);
    expect(cls).not.toMatch(/(?:^|\s)nb-radius(?:\s|$)/);
    expect(cls).not.toMatch(/(?:^|\s)nb-shadow(?:\s|$)/);
    expect(cls).not.toContain('bg-(--nb-card-bg)');
    expect(cls).not.toContain('text-(--nb-card-fg)');
    expect(cls).not.toContain('border-(--nb-card-border-color)');
    expect(cls).not.toContain('bg-(--nb-background)');
    expect(cls).not.toContain('text-(--nb-foreground)');
    expect(cls).not.toContain('border-(--nb-border)');
    expect(cls).not.toContain('rounded-nb');
    expect(cls).not.toContain('shadow-nb');
  });

  it('keeps host anatomy out of classes', async () => {
    const fixture = await createFixture();
    const card = findCard(fixture);

    expect(card.className).toBe('');
    expect(card.getAttribute('data-slot')).toBe('card');
  });

  it('keeps sub-part anatomy out of classes while retaining slots', async () => {
    const fixture = await createFixture();
    const host = fixture.nativeElement as HTMLElement;

    expect(findSlot(host, 'card-header').className).toBe('');
    expect(findSlot(host, 'card-title').className).toBe('');
    expect(findSlot(host, 'card-description').className).toBe('');
    expect(findSlot(host, 'card-content').className).toBe('');
    expect(findSlot(host, 'card-actions').className).toBe('');
    expect(findSlot(host, 'card-actions').getAttribute('data-align')).toBe('end');
    expect(findSlot(host, 'card-footer').className).toBe('');
  });
});

async function createFixture(): Promise<
  ComponentFixture<CardTokenTest>
> {
  await TestBed.configureTestingModule({
    imports: [CardTokenTest],
  }).compileComponents();

  const fixture = TestBed.createComponent(CardTokenTest);
  fixture.detectChanges();

  return fixture;
}

function findCard(
  fixture: ComponentFixture<CardTokenTest>
): HTMLElement {
  return fixture.nativeElement.querySelector('nb-card') as HTMLElement;
}

function findSlot(host: HTMLElement, slot: string): HTMLElement {
  return host.querySelector(`[data-slot="${slot}"]`) as HTMLElement;
}
