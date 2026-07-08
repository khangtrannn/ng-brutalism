import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbAccordion } from './nb-accordion';
import { NbAccordionContent } from './nb-accordion-content';
import { NbAccordionItem } from './nb-accordion-item';
import { NbAccordionTrigger } from './nb-accordion-trigger';

@Component({
  imports: [
    NbAccordion,
    NbAccordionItem,
    NbAccordionTrigger,
    NbAccordionContent,
  ],
  template: `
    <nb-accordion type="multiple">
      <nb-accordion-item value="one">
        <nb-accordion-trigger>One</nb-accordion-trigger>
        <nb-accordion-content>First panel</nb-accordion-content>
      </nb-accordion-item>
      <nb-accordion-item value="two" disabled>
        <nb-accordion-trigger>Two</nb-accordion-trigger>
        <nb-accordion-content>Second panel</nb-accordion-content>
      </nb-accordion-item>
      <nb-accordion-item value="three">
        <nb-accordion-trigger>Three</nb-accordion-trigger>
        <nb-accordion-content>Third panel</nb-accordion-content>
      </nb-accordion-item>
    </nb-accordion>
  `,
})
class AccordionKeyboardTest {}

describe('NbAccordion keyboard completion (APG)', () => {
  it('ArrowDown/ArrowUp move focus between headers, skipping disabled items and wrapping at the ends', async () => {
    const fixture = await createFixture();
    const [first, , third] = triggers(fixture);

    first.focus();
    first.dispatchEvent(keydown('ArrowDown'));
    fixture.detectChanges();
    expect(document.activeElement).toBe(third);

    third.dispatchEvent(keydown('ArrowDown'));
    fixture.detectChanges();
    expect(document.activeElement).toBe(first);

    first.dispatchEvent(keydown('ArrowUp'));
    fixture.detectChanges();
    expect(document.activeElement).toBe(third);
  });

  it('Home/End move focus to the first/last header', async () => {
    const fixture = await createFixture();
    const [first, , third] = triggers(fixture);

    first.focus();
    first.dispatchEvent(keydown('End'));
    fixture.detectChanges();
    expect(document.activeElement).toBe(third);

    third.dispatchEvent(keydown('Home'));
    fixture.detectChanges();
    expect(document.activeElement).toBe(first);
  });
});

function keydown(key: string): KeyboardEvent {
  return new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
}

async function createFixture(): Promise<
  ComponentFixture<AccordionKeyboardTest>
> {
  await TestBed.configureTestingModule({
    imports: [AccordionKeyboardTest],
  }).compileComponents();

  const fixture = TestBed.createComponent(AccordionKeyboardTest);
  fixture.detectChanges();

  return fixture;
}

function triggers(
  fixture: ComponentFixture<AccordionKeyboardTest>
): HTMLButtonElement[] {
  return Array.from(
    fixture.nativeElement.querySelectorAll(
      'nb-accordion-trigger [data-slot="accordion-trigger-button"]'
    )
  );
}
