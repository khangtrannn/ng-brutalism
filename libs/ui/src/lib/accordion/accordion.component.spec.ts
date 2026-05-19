import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbAccordionComponent } from './accordion';
import { NbAccordionContentComponent } from './accordion-content';
import { NbAccordionItemComponent } from './accordion-item';
import { NbAccordionTriggerComponent } from './accordion-trigger';

const imports = [
  NbAccordionComponent,
  NbAccordionItemComponent,
  NbAccordionTriggerComponent,
  NbAccordionContentComponent,
];

function buttons<T>(fixture: ComponentFixture<T>): HTMLButtonElement[] {
  return Array.from(fixture.nativeElement.querySelectorAll('button'));
}

function accordion<T>(fixture: ComponentFixture<T>): HTMLElement {
  return fixture.nativeElement.querySelector('nb-accordion');
}

function regions<T>(fixture: ComponentFixture<T>): HTMLElement[] {
  return Array.from(fixture.nativeElement.querySelectorAll('[role="region"]'));
}

function indicators<T>(fixture: ComponentFixture<T>): SVGPathElement[] {
  return Array.from(
    fixture.nativeElement.querySelectorAll('nb-accordion-trigger svg path')
  );
}

function expectIndicatorOpen(indicator: SVGPathElement, open: boolean): void {
  expect(indicator.getAttribute('d')).toBe(
    open ? 'm18 15-6-6-6 6' : 'm6 9 6 6 6-6'
  );
}

function expectRegionOpen(region: HTMLElement, open: boolean): void {
  expect(region.getAttribute('data-state')).toBe(open ? 'open' : 'closed');
  expect(region.getAttribute('aria-hidden')).toBe(open ? 'false' : 'true');
}

@Component({
  standalone: true,
  imports,
  template: `
    <nb-accordion>
      <nb-accordion-item value="one">
        <nb-accordion-trigger>One</nb-accordion-trigger>
        <nb-accordion-content>First panel</nb-accordion-content>
      </nb-accordion-item>
      <nb-accordion-item value="two">
        <nb-accordion-trigger>Two</nb-accordion-trigger>
        <nb-accordion-content>Second panel</nb-accordion-content>
      </nb-accordion-item>
    </nb-accordion>
  `,
})
class SingleAccordionTestComponent {}

@Component({
  standalone: true,
  imports,
  template: `
    <nb-accordion collapsible>
      <nb-accordion-item value="one">
        <nb-accordion-trigger>One</nb-accordion-trigger>
        <nb-accordion-content>First panel</nb-accordion-content>
      </nb-accordion-item>
    </nb-accordion>
  `,
})
class CollapsibleAccordionTestComponent {}

@Component({
  standalone: true,
  imports,
  template: `
    <nb-accordion type="multiple">
      <nb-accordion-item value="one">
        <nb-accordion-trigger>One</nb-accordion-trigger>
        <nb-accordion-content>First panel</nb-accordion-content>
      </nb-accordion-item>
      <nb-accordion-item value="two">
        <nb-accordion-trigger>Two</nb-accordion-trigger>
        <nb-accordion-content>Second panel</nb-accordion-content>
      </nb-accordion-item>
    </nb-accordion>
  `,
})
class MultipleAccordionTestComponent {}

@Component({
  standalone: true,
  imports,
  template: `
    <nb-accordion>
      <nb-accordion-item value="one" disabled>
        <nb-accordion-trigger>One</nb-accordion-trigger>
        <nb-accordion-content>First panel</nb-accordion-content>
      </nb-accordion-item>
    </nb-accordion>
  `,
})
class DisabledItemAccordionTestComponent {}

@Component({
  standalone: true,
  imports,
  template: `
    <nb-accordion [defaultValue]="defaultValue">
      <nb-accordion-item value="one">
        <nb-accordion-trigger>One</nb-accordion-trigger>
        <nb-accordion-content>First panel</nb-accordion-content>
      </nb-accordion-item>
    </nb-accordion>
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
    expect(accordion(fixture).getAttribute('data-orientation')).toBe(
      'vertical'
    );
    expect(region.getAttribute('data-orientation')).toBe('vertical');
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
