import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbRating, type NbRatingTone } from './nb-rating';

@Component({
  imports: [NbRating],
  template: `<nb-rating [value]="value" [max]="max" [tone]="tone" />`,
})
class RatingTokenTest {
  value = 3;
  max = 5;
  tone: NbRatingTone | undefined = undefined;
}

describe('NbRating token surface', () => {
  it('leaves filled-star color to CSS token fallbacks', async () => {
    const fixture = await createFixture();
    const rating = findRating(fixture);
    const filledStar = findFilledStar(fixture);

    expect(rating.getAttribute('data-nb-tone')).toBeNull();
    expect(filledStar.style.getPropertyValue('color')).toBe('');
    expect(filledStar.getAttribute('data-filled')).toBe('');
  });

  it('reflects tone semantically without writing final colors inline', async () => {
    const fixture = await createFixture({ tone: 'success' });
    const rating = findRating(fixture);
    const filledStar = findFilledStar(fixture);

    expect(rating.getAttribute('data-nb-tone')).toBe('success');
    expect(filledStar.style.getPropertyValue('color')).toBe('');
  });

  it('keeps fill count as runtime data-filled state', async () => {
    const fixture = await createFixture({ value: 2 });
    const stars = findStars(fixture);

    expect(stars.filter((s) => s.hasAttribute('data-filled'))).toHaveLength(
      2
    );
  });
});

async function createFixture(
  inputs: Partial<Pick<RatingTokenTest, 'value' | 'max' | 'tone'>> = {}
): Promise<ComponentFixture<RatingTokenTest>> {
  await TestBed.configureTestingModule({
    imports: [RatingTokenTest],
  }).compileComponents();

  const fixture = TestBed.createComponent(RatingTokenTest);
  Object.assign(fixture.componentInstance, inputs);
  fixture.detectChanges();

  return fixture;
}

function findRating(fixture: ComponentFixture<RatingTokenTest>): HTMLElement {
  return fixture.nativeElement.querySelector('nb-rating') as HTMLElement;
}

function findStars(
  fixture: ComponentFixture<RatingTokenTest>
): HTMLElement[] {
  return Array.from(
    fixture.nativeElement.querySelectorAll('[data-slot="rating-star"]')
  );
}

function findFilledStar(
  fixture: ComponentFixture<RatingTokenTest>
): HTMLElement {
  return fixture.nativeElement.querySelector(
    '[data-slot="rating-star"][data-filled]'
  ) as HTMLElement;
}
