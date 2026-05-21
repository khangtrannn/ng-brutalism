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
class AccordionTokenTestComponent {}

describe('NbAccordion token surface', () => {
  it('declares the expected default tokens on the component parts', async () => {
    const fixture = await createFixture();
    const item = findItemBox(fixture);
    const trigger = findTrigger(fixture);
    const content = findContent(fixture);

    expect(item.className).toContain(
      '[--nb-accordion-item-bg:var(--nb-surface)]'
    );
    expect(item.className).toContain(
      '[--nb-accordion-item-fg:var(--nb-surface-foreground)]'
    );
    expect(item.className).toContain(
      '[--nb-accordion-item-border:var(--nb-border)]'
    );
    expect(item.className).toContain(
      '[--nb-accordion-item-radius:var(--nb-radius)]'
    );
    expect(item.className).toContain(
      '[--nb-accordion-item-shadow:var(--nb-shadow-offset-x)_var(--nb-shadow-offset-y)_0_var(--nb-shadow)]'
    );
    expect(trigger.className).toContain(
      '[--nb-accordion-trigger-bg:var(--nb-main)]'
    );
    expect(trigger.className).toContain(
      '[--nb-accordion-trigger-fg:var(--nb-main-foreground)]'
    );
    expect(content.className).toContain(
      '[--nb-accordion-content-bg:var(--nb-surface)]'
    );
    expect(content.className).toContain(
      '[--nb-accordion-content-fg:var(--nb-surface-foreground)]'
    );
  });

  it('reads scoped tokens instead of global tokens directly', async () => {
    const fixture = await createFixture();
    const itemClass = findItemBox(fixture).className;
    const triggerClass = findTrigger(fixture).className;
    const contentClass = findContent(fixture).className;

    expect(itemClass).toContain('bg-(--nb-accordion-item-bg)');
    expect(itemClass).toContain('text-(--nb-accordion-item-fg)');
    expect(itemClass).toContain('border-(--nb-accordion-item-border)');
    expect(itemClass).toContain('rounded-(--nb-accordion-item-radius)');
    expect(itemClass).toContain('shadow-[var(--nb-accordion-item-shadow)]');
    expect(triggerClass).toContain('bg-(--nb-accordion-trigger-bg)');
    expect(triggerClass).toContain('text-(--nb-accordion-trigger-fg)');
    expect(triggerClass).toContain(
      'focus-visible:ring-(--nb-accordion-item-border)'
    );
    expect(triggerClass).toContain('border-(--nb-accordion-item-border)');
    expect(contentClass).toContain('bg-(--nb-accordion-content-bg)');
    expect(contentClass).toContain('text-(--nb-accordion-content-fg)');
    expect(`${itemClass} ${triggerClass} ${contentClass}`).not.toContain(
      'bg-(--nb-main)'
    );
    expect(`${itemClass} ${triggerClass} ${contentClass}`).not.toContain(
      'bg-(--nb-surface)'
    );
    expect(itemClass).not.toContain('rounded-nb');
    expect(itemClass).not.toContain('shadow-nb');
  });

  it('does not regress the default item class shape', async () => {
    const fixture = await createFixture();
    const cls = findItemBox(fixture).className;

    expect(cls).toContain('overflow-hidden');
    expect(cls).toContain('border-2');
  });

  it('does not regress the default trigger class shape', async () => {
    const fixture = await createFixture();
    const cls = findTrigger(fixture).className;

    expect(cls).toContain('flex');
    expect(cls).toContain('min-h-14');
    expect(cls).toContain('justify-between');
    expect(cls).toContain('gap-4');
    expect(cls).toContain('p-4');
    expect(cls).toContain('text-left');
    expect(cls).toContain('text-base');
    expect(cls).toContain('font-bold');
    expect(cls).toContain('transition-all');
    expect(cls).toContain('focus-visible:outline-none');
    expect(cls).toContain('focus-visible:ring-2');
    expect(cls).toContain('disabled:opacity-50');
    expect(cls).toContain('border-b-2');
  });

  it('does not regress the default content class shape', async () => {
    const fixture = await createFixture();
    const cls = findContent(fixture).className;

    expect(cls).toContain('grid');
    expect(cls).toContain('overflow-hidden');
    expect(cls).toContain('text-sm');
    expect(cls).toContain('font-medium');
    expect(cls).toContain('transition-[grid-template-rows]');
    expect(cls).toContain('duration-200');
    expect(cls).toContain('ease-out');
    expect(cls).toContain('grid-rows-[1fr]');
  });
});

async function createFixture(): Promise<
  ComponentFixture<AccordionTokenTestComponent>
> {
  await TestBed.configureTestingModule({
    imports: [AccordionTokenTestComponent],
  }).compileComponents();

  const fixture = TestBed.createComponent(AccordionTokenTestComponent);
  fixture.detectChanges();

  return fixture;
}

function findItemBox(
  fixture: ComponentFixture<AccordionTokenTestComponent>
): HTMLElement {
  return fixture.nativeElement.querySelector(
    'nb-accordion-item > div'
  ) as HTMLElement;
}

function findTrigger(
  fixture: ComponentFixture<AccordionTokenTestComponent>
): HTMLButtonElement {
  return fixture.nativeElement.querySelector(
    'nb-accordion-trigger button'
  ) as HTMLButtonElement;
}

function findContent(
  fixture: ComponentFixture<AccordionTokenTestComponent>
): HTMLElement {
  return fixture.nativeElement.querySelector('[role="region"]') as HTMLElement;
}
