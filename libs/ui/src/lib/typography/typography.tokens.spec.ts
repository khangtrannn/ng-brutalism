import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbTypography, type NbTypographyFont } from './nb-typography';

@Component({
  imports: [NbTypography],
  template: `<div nbTypography [font]="font">Content</div>`,
})
class TypographyTokenTest {
  font: NbTypographyFont = 'inherit';
}

describe('NbTypography token surface', () => {
  it('inherit role writes no font-family override', async () => {
    // Arrange
    const fixture = await createFixture();
    const host = findHost(fixture);

    // Assert
    expect(host.getAttribute('data-nb-typography')).toBe('inherit');
    expect(host.style.getPropertyValue('--nb-typography-font')).toBe('');
    expect(host.style.getPropertyValue('font-family')).toBe('');
  });

  it.each([
    ['body', 'var(--nb-font-body)'],
    ['display', 'var(--nb-font-display)'],
    ['accent', 'var(--nb-font-accent)'],
    ['mono', 'var(--nb-font-mono)'],
  ] satisfies Array<[NbTypographyFont, string]>)(
    'font="%s" writes the resolved stack to --nb-typography-font',
    async (font, expected) => {
      // Arrange
      const fixture = await createFixture({ font });
      const host = findHost(fixture);

      // Assert
      expect(host.getAttribute('data-nb-typography')).toBe(font);
      expect(host.style.getPropertyValue('--nb-typography-font')).toBe(
        expected
      );
      expect(host.style.getPropertyValue('font-family')).toBe('');
    }
  );
});

async function createFixture(
  inputs: Partial<Pick<TypographyTokenTest, 'font'>> = {}
): Promise<ComponentFixture<TypographyTokenTest>> {
  await TestBed.configureTestingModule({
    imports: [TypographyTokenTest],
  }).compileComponents();

  const fixture = TestBed.createComponent(TypographyTokenTest);
  Object.assign(fixture.componentInstance, inputs);
  fixture.detectChanges();

  return fixture;
}

function findHost(
  fixture: ComponentFixture<TypographyTokenTest>
): HTMLDivElement {
  return fixture.nativeElement.querySelector(
    '[nbTypography]'
  ) as HTMLDivElement;
}
