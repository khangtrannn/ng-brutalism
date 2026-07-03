import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbProgress, type NbProgressTone } from './nb-progress';

@Component({
  imports: [NbProgress],
  template: `<nb-progress
    [value]="value"
    [max]="max"
    [tone]="tone"
  />`,
})
class ProgressTokenTest {
  value = 40;
  max = 100;
  tone: NbProgressTone | undefined = undefined;
}

describe('NbProgress token surface', () => {
  it('leaves default fill color to CSS token fallbacks', async () => {
    const fixture = await createFixture();
    const progress = findProgress(fixture);
    const fill = findFill(fixture);

    expect(progress.getAttribute('data-nb-tone')).toBeNull();
    expect(fill.style.getPropertyValue('background-color')).toBe('');
  });

  it('reflects tone semantically without writing final colors inline', async () => {
    const fixture = await createFixture({ tone: 'danger' });
    const progress = findProgress(fixture);
    const fill = findFill(fixture);

    expect(progress.getAttribute('data-nb-tone')).toBe('danger');
    expect(fill.style.getPropertyValue('background-color')).toBe('');
  });

  it('keeps runtime fill width as the only inline style on the fill element', async () => {
    const fixture = await createFixture({ value: 25 });
    const fill = findFill(fixture);

    expect(fill.style.width).toBe('25%');
  });
});

async function createFixture(
  inputs: Partial<Pick<ProgressTokenTest, 'value' | 'max' | 'tone'>> = {}
): Promise<ComponentFixture<ProgressTokenTest>> {
  await TestBed.configureTestingModule({
    imports: [ProgressTokenTest],
  }).compileComponents();

  const fixture = TestBed.createComponent(ProgressTokenTest);
  Object.assign(fixture.componentInstance, inputs);
  fixture.detectChanges();

  return fixture;
}

function findProgress(
  fixture: ComponentFixture<ProgressTokenTest>
): HTMLElement {
  return fixture.nativeElement.querySelector('nb-progress') as HTMLElement;
}

function findFill(fixture: ComponentFixture<ProgressTokenTest>): HTMLElement {
  return fixture.nativeElement.querySelector(
    '[data-slot="progress-fill"]'
  ) as HTMLElement;
}
