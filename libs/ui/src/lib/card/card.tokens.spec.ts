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
  type NbCardBorder,
  type NbCardRadius,
  type NbCardShadow,
  type NbCardTone,
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
    <nb-card
      [tone]="tone"
      [radius]="radius"
      [shadow]="shadow"
      [border]="border"
    >
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
class CardTokenTest {
  tone: NbCardTone | undefined = undefined;
  radius: NbCardRadius | null = null;
  shadow: NbCardShadow | null = null;
  border: NbCardBorder | null = null;
}

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
    expect(card.style.getPropertyValue('--nb-card-radius')).toBe('');
    expect(card.style.getPropertyValue('--nb-card-shadow')).toBe('');
    expect(card.style.getPropertyValue('--nb-card-border-width')).toBe('');
    expect(card.style.cssText).not.toContain('--nb-resolved');
  });

  it('writes explicit scalar inputs to public CSS variables', async () => {
    const fixture = await createFixture({
      radius: 'xl',
      shadow: 'heavy',
      border: 'thick',
    });
    const card = findCard(fixture);

    expect(card.style.getPropertyValue('border-radius')).toBe('');
    expect(card.style.getPropertyValue('box-shadow')).toBe('');
    expect(card.style.getPropertyValue('border-width')).toBe('');
    expect(card.style.getPropertyValue('--nb-card-radius')).toBe(
      'var(--nb-radius-xl, 1rem)'
    );
    expect(card.style.getPropertyValue('--nb-card-shadow')).toBe(
      '10px 10px 0 0 var(--nb-shadow)'
    );
    expect(card.style.getPropertyValue('--nb-card-border-width')).toBe('4px');
    expect(card.style.cssText).not.toContain('--nb-resolved');
  });

  it('reflects tone semantically without writing final colors inline', async () => {
    const fixture = await createFixture({ tone: 'mint' });
    const card = findCard(fixture);

    expect(card.getAttribute('data-nb-tone')).toBe('mint');
    expect(card.style.getPropertyValue('background')).toBe('');
    expect(card.style.getPropertyValue('color')).toBe('');
    expect(card.style.getPropertyValue('border-color')).toBe('');
    expect(card.style.getPropertyValue('--nb-card-bg')).toBe('');
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

async function createFixture(
  inputs: Partial<
    Pick<CardTokenTest, 'tone' | 'radius' | 'shadow' | 'border'>
  > = {}
): Promise<ComponentFixture<CardTokenTest>> {
  await TestBed.configureTestingModule({
    imports: [CardTokenTest],
  }).compileComponents();

  const fixture = TestBed.createComponent(CardTokenTest);
  Object.assign(fixture.componentInstance, inputs);
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
