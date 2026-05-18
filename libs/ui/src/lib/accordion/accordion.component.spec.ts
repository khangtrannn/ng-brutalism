import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbAccordionComponent } from './accordion.component';
import { NbAccordionContentComponent } from './accordion-content.component';
import { NbAccordionItemComponent } from './accordion-item.component';
import { NbAccordionTriggerComponent } from './accordion-trigger.component';

const imports = [
  NbAccordionComponent,
  NbAccordionItemComponent,
  NbAccordionTriggerComponent,
  NbAccordionContentComponent,
];

function buttons<T>(fixture: ComponentFixture<T>): HTMLButtonElement[] {
  return Array.from(fixture.nativeElement.querySelectorAll('button'));
}

function regions<T>(fixture: ComponentFixture<T>): HTMLElement[] {
  return Array.from(fixture.nativeElement.querySelectorAll('[role="region"]'));
}

function indicators<T>(fixture: ComponentFixture<T>): HTMLElement[] {
  return Array.from(
    fixture.nativeElement.querySelectorAll('[data-slot="accordion-indicator"]')
  );
}

function expectIndicatorOpen(indicator: HTMLElement, open: boolean): void {
  expect(indicator.classList.contains('rotate-180')).toBe(open);
}

function expectRegionOpen(region: HTMLElement, open: boolean): void {
  expect(region.getAttribute('data-state')).toBe(open ? 'open' : 'closed');
  expect(region.getAttribute('aria-hidden')).toBe(open ? 'false' : 'true');
}

@Component({
  standalone: true,
  imports,
  template: `
    <neo-accordion>
      <neo-accordion-item value="one">
        <neo-accordion-trigger>One</neo-accordion-trigger>
        <neo-accordion-content>First panel</neo-accordion-content>
      </neo-accordion-item>
      <neo-accordion-item value="two">
        <neo-accordion-trigger>Two</neo-accordion-trigger>
        <neo-accordion-content>Second panel</neo-accordion-content>
      </neo-accordion-item>
    </neo-accordion>
  `,
})
class SingleAccordionTestComponent {}

@Component({
  standalone: true,
  imports,
  template: `
    <neo-accordion collapsible>
      <neo-accordion-item value="one">
        <neo-accordion-trigger>One</neo-accordion-trigger>
        <neo-accordion-content>First panel</neo-accordion-content>
      </neo-accordion-item>
    </neo-accordion>
  `,
})
class CollapsibleAccordionTestComponent {}

@Component({
  standalone: true,
  imports,
  template: `
    <neo-accordion type="multiple">
      <neo-accordion-item value="one">
        <neo-accordion-trigger>One</neo-accordion-trigger>
        <neo-accordion-content>First panel</neo-accordion-content>
      </neo-accordion-item>
      <neo-accordion-item value="two">
        <neo-accordion-trigger>Two</neo-accordion-trigger>
        <neo-accordion-content>Second panel</neo-accordion-content>
      </neo-accordion-item>
    </neo-accordion>
  `,
})
class MultipleAccordionTestComponent {}

@Component({
  standalone: true,
  imports,
  template: `
    <neo-accordion>
      <neo-accordion-item value="one" disabled>
        <neo-accordion-trigger>One</neo-accordion-trigger>
        <neo-accordion-content>First panel</neo-accordion-content>
      </neo-accordion-item>
    </neo-accordion>
  `,
})
class DisabledItemAccordionTestComponent {}

@Component({
  standalone: true,
  imports,
  template: `
    <neo-accordion [defaultValue]="defaultValue">
      <neo-accordion-item value="one">
        <neo-accordion-trigger>One</neo-accordion-trigger>
        <neo-accordion-content>First panel</neo-accordion-content>
      </neo-accordion-item>
    </neo-accordion>
  `,
})
class DefaultValueAccordionTestComponent {
  defaultValue = 'one';
}

describe('NbAccordion', () => {
  it('opens one item at a time in single mode', async () => {
    const fixture = await createFixture(SingleAccordionTestComponent);
    const [firstButton, secondButton] = buttons(fixture);
    const [firstRegion, secondRegion] = regions(fixture);

    firstButton.click();
    fixture.detectChanges();

    expect(firstButton.getAttribute('aria-expanded')).toBe('true');
    expect(secondButton.getAttribute('aria-expanded')).toBe('false');
    expectIndicatorOpen(indicators(fixture)[0], true);
    expectIndicatorOpen(indicators(fixture)[1], false);
    expectRegionOpen(firstRegion, true);
    expectRegionOpen(secondRegion, false);

    secondButton.click();
    fixture.detectChanges();

    expect(firstButton.getAttribute('aria-expanded')).toBe('false');
    expect(secondButton.getAttribute('aria-expanded')).toBe('true');
    expectIndicatorOpen(indicators(fixture)[0], false);
    expectIndicatorOpen(indicators(fixture)[1], true);
    expectRegionOpen(firstRegion, false);
    expectRegionOpen(secondRegion, true);
  });

  it('keeps the open single item open when collapsible is false', async () => {
    const fixture = await createFixture(SingleAccordionTestComponent);
    const [button] = buttons(fixture);

    button.click();
    fixture.detectChanges();
    button.click();
    fixture.detectChanges();

    expect(button.getAttribute('aria-expanded')).toBe('true');
    expectRegionOpen(regions(fixture)[0], true);
  });

  it('closes the open single item when collapsible is true', async () => {
    const fixture = await createFixture(CollapsibleAccordionTestComponent);
    const [button] = buttons(fixture);

    button.click();
    fixture.detectChanges();
    button.click();
    fixture.detectChanges();

    expect(button.getAttribute('aria-expanded')).toBe('false');
    expectRegionOpen(regions(fixture)[0], false);
  });

  it('allows multiple items to stay open in multiple mode', async () => {
    const fixture = await createFixture(MultipleAccordionTestComponent);
    const [firstButton, secondButton] = buttons(fixture);
    const [firstRegion, secondRegion] = regions(fixture);

    firstButton.click();
    secondButton.click();
    fixture.detectChanges();

    expect(firstButton.getAttribute('aria-expanded')).toBe('true');
    expect(secondButton.getAttribute('aria-expanded')).toBe('true');
    expectRegionOpen(firstRegion, true);
    expectRegionOpen(secondRegion, true);
  });

  it('does not toggle a disabled item', async () => {
    const fixture = await createFixture(DisabledItemAccordionTestComponent);
    const [button] = buttons(fixture);

    button.click();
    fixture.detectChanges();

    expect(button.disabled).toBe(true);
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expectRegionOpen(regions(fixture)[0], false);
  });

  it('opens the default value and connects trigger and content ids', async () => {
    const fixture = await createFixture(DefaultValueAccordionTestComponent);
    const [button] = buttons(fixture);
    const [region] = regions(fixture);

    expect(button.getAttribute('aria-expanded')).toBe('true');
    expectRegionOpen(region, true);
    expect(button.getAttribute('aria-controls')).toBe(region.id);
    expect(region.getAttribute('aria-labelledby')).toBe(button.id);
    expect(button.getAttribute('data-orientation')).toBe('vertical');
    expect(region.getAttribute('data-orientation')).toBe('vertical');
  });
});

async function createFixture<T>(component: new () => T): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [component],
  }).compileComponents();

  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();

  return fixture;
}
