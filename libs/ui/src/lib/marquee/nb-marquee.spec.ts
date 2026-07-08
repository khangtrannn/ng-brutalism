import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { NbMarquee } from './nb-marquee';

class MockResizeObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

@Component({
  imports: [NbMarquee],
  template: `<nb-marquee><span>Brutalist</span></nb-marquee>`,
})
class DefaultMarqueeTest {}

@Component({
  imports: [NbMarquee],
  template: `
    <nb-marquee duration="10s" reverse [pauseOnHover]="false">
      <span>Brutalist</span>
    </nb-marquee>
  `,
})
class ConfiguredMarqueeTest {}

describe('NbMarquee', () => {
  beforeEach(() => {
    vi.stubGlobal('ResizeObserver', MockResizeObserver);
  });

  it('duplicates the content strip into an aria-hidden clone for seamless looping', async () => {
    // Arrange
    const fixture = await createFixture(DefaultMarqueeTest);
    await Promise.resolve();
    fixture.detectChanges();

    const strips = fixture.nativeElement.querySelectorAll(
      '[data-slot="marquee-strip"]'
    );

    // Assert
    expect(strips.length).toBe(2);
    expect(strips[1].getAttribute('aria-hidden')).toBe('true');
    expect(strips[1].textContent?.trim()).toBe('Brutalist');
  });

  it('defaults to pause-on-hover with no reverse direction', async () => {
    // Arrange
    const fixture = await createFixture(DefaultMarqueeTest);
    const wrapper = fixture.nativeElement.querySelector(
      '[data-slot="marquee-wrapper"]'
    ) as HTMLElement;
    const strip = fixture.nativeElement.querySelector(
      '[data-slot="marquee-strip"]'
    ) as HTMLElement;

    // Assert
    expect(wrapper.getAttribute('data-pause-on-hover')).toBe('');
    expect(strip.getAttribute('data-reverse')).toBeNull();
  });

  it('reflects reverse and pauseOnHover inputs as data attributes', async () => {
    // Arrange
    const fixture = await createFixture(ConfiguredMarqueeTest);
    const wrapper = fixture.nativeElement.querySelector(
      '[data-slot="marquee-wrapper"]'
    ) as HTMLElement;
    const strip = fixture.nativeElement.querySelector(
      '[data-slot="marquee-strip"]'
    ) as HTMLElement;

    // Assert
    expect(wrapper.getAttribute('data-pause-on-hover')).toBeNull();
    expect(strip.getAttribute('data-reverse')).toBe('');
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
