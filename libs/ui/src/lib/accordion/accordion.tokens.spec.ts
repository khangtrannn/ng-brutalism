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
    <nb-accordion [value]="'one'">
      <nb-accordion-item value="one">
        <nb-accordion-trigger>One</nb-accordion-trigger>
        <nb-accordion-content>First panel</nb-accordion-content>
      </nb-accordion-item>
    </nb-accordion>
  `,
})
class AccordionTokenTest {}

@Component({
  imports: [
    NbAccordion,
    NbAccordionItem,
    NbAccordionTrigger,
    NbAccordionContent,
  ],
  template: `
    <nb-accordion [value]="'one'">
      <nb-accordion-item
        value="one"
        style="--nb-accordion-trigger-bg: red"
      >
        <nb-accordion-trigger tone="yellow">One</nb-accordion-trigger>
        <nb-accordion-content>First panel</nb-accordion-content>
      </nb-accordion-item>
    </nb-accordion>
  `,
})
class TriggerToneAccordionTokenTest {}

@Component({
  imports: [
    NbAccordion,
    NbAccordionItem,
    NbAccordionTrigger,
    NbAccordionContent,
  ],
  template: `
    <nb-accordion [value]="'one'">
      <nb-accordion-item
        value="one"
        tone="cream"
        radius="lg"
        shadow="hard"
        border="strong"
      >
        <nb-accordion-trigger>One</nb-accordion-trigger>
        <nb-accordion-content>First panel</nb-accordion-content>
      </nb-accordion-item>
    </nb-accordion>
  `,
})
class ItemCapabilityAccordionTokenTest {}

describe('NbAccordion token surface', () => {
  it('leaves default item visuals to component CSS token fallbacks', async () => {
    const fixture = await createFixture();
    const itemHost = findItemHost(fixture);

    expect(itemHost.style.cssText).not.toContain('--nb-resolved');
    expect(itemHost.style.getPropertyValue('background')).toBe('');
    expect(itemHost.style.getPropertyValue('color')).toBe('');
    expect(itemHost.style.getPropertyValue('border-color')).toBe('');
    expect(itemHost.style.getPropertyValue('--nb-accordion-item-bg')).toBe('');
    expect(itemHost.style.getPropertyValue('border-radius')).toBe('');
    expect(itemHost.style.getPropertyValue('box-shadow')).toBe('');
    expect(itemHost.style.getPropertyValue('border-width')).toBe('');
  });

  it('item host is the surface slot with no inner surface wrapper', async () => {
    const fixture = await createFixture();
    const itemHost = findItemHost(fixture);

    expect(itemHost.getAttribute('data-slot')).toBe('accordion-item-surface');
    expect(itemHost.className.trim()).toBe('');
    expect(itemHost.className).not.toContain('nb-main');
    expect(itemHost.className).not.toContain('bg-(--nb-surface)');
    expect(
      itemHost.querySelector('[data-slot="accordion-item-surface"]')
    ).toBeNull();
  });

  it('item host does not carry legacy capability marker classes', async () => {
    const fixture = await createFixture();
    const itemHost = findItemHost(fixture);

    expect(itemHost.classList.contains('nb-tone')).toBe(false);
    expect(itemHost.classList.contains('nb-radius')).toBe(false);
    expect(itemHost.classList.contains('nb-border-width')).toBe(false);
  });

  it('trigger button has no reactive class binding — styling is in component CSS', async () => {
    const fixture = await createFixture();
    const trigger = findTrigger(fixture);

    expect(trigger.className.trim()).toBe('');
    expect(trigger.style.getPropertyValue('background-color')).toBe('');
    expect(trigger.style.getPropertyValue('color')).toBe('');
    expect(trigger.className).not.toContain('nb-main');
  });

  it('trigger tone writes actual trigger colors without repainting item or content', async () => {
    const fixture = await createFixture(TriggerToneAccordionTokenTest);
    const itemHost = findItemHost(fixture);
    const trigger = findTrigger(fixture);
    const content = findContent(fixture);

    expect(trigger.style.getPropertyValue('background-color')).toBe(
      'var(--nb-yellow)'
    );
    expect(trigger.style.getPropertyValue('color')).toBeTruthy();
    expect(trigger.style.getPropertyValue('--nb-accordion-trigger-bg')).toBe('');
    expect(itemHost.style.getPropertyValue('background')).toBe('');
    expect(content.style.getPropertyValue('background-color')).toBe('');
    expect(trigger.style.cssText).not.toContain('--nb-resolved');
  });

  it('item visual inputs are composed onto the host surface', async () => {
    const fixture = await createFixture(ItemCapabilityAccordionTokenTest);
    const itemHost = findItemHost(fixture);

    expect(itemHost.style.getPropertyValue('background')).toBe(
      'var(--nb-cream)'
    );
    expect(itemHost.style.getPropertyValue('color')).toBeTruthy();
    expect(itemHost.style.getPropertyValue('border-color')).toBe(
      'var(--nb-border)'
    );
    expect(itemHost.style.getPropertyValue('border-radius')).toBe('0.75rem');
    expect(itemHost.style.getPropertyValue('box-shadow')).toBe(
      '6px 6px 0 0 var(--nb-shadow)'
    );
    expect(itemHost.style.getPropertyValue('border-width')).toBe('3px');
    expect(itemHost.style.getPropertyValue('--nb-accordion-item-bg')).toBe('');
    expect(itemHost.style.cssText).not.toContain('--nb-resolved');
  });

  it('content region has no reactive class binding and tracks state via data-state', async () => {
    const fixture = await createFixture();
    const content = findContent(fixture);

    expect(content.className.trim()).toBe('');
    expect(content.getAttribute('data-state')).toBe('open');
    expect(content.getAttribute('aria-hidden')).toBe('false');
  });
});

async function createFixture<T = AccordionTokenTest>(
  component: new () => T = AccordionTokenTest as new () => T
): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [component],
  }).compileComponents();

  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();

  return fixture;
}

function findItemHost(
  fixture: ComponentFixture<unknown>
): HTMLElement {
  return fixture.nativeElement.querySelector(
    'nb-accordion-item'
  ) as HTMLElement;
}

function findTrigger(
  fixture: ComponentFixture<unknown>
): HTMLButtonElement {
  return fixture.nativeElement.querySelector(
    'nb-accordion-trigger button'
  ) as HTMLButtonElement;
}

function findContent(
  fixture: ComponentFixture<unknown>
): HTMLElement {
  return fixture.nativeElement.querySelector('[role="region"]') as HTMLElement;
}
