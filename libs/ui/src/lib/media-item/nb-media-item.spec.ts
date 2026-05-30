import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { NbSurface } from '../surface';
import {
  NbMediaItem,
  NbMediaItemDescription,
  NbMediaItemIcon,
  NbMediaItemTitle,
} from './nb-media-item';

@Component({
  imports: [NbMediaItem, NbMediaItemTitle, NbMediaItemDescription, NbSurface],
  template: `
    <div nbMediaItem variant="plain" size="md">
      <span nbSurface tone="yellow" radius="base" shadow="none" size="lg" layout="center">
        <img src="/icons/calendar.png" alt="Date" />
      </span>
      <div>
        <span nbMediaItemTitle>Jun 20, 2026</span>
        <span nbMediaItemDescription>Saturday at 6:00 PM</span>
      </div>
    </div>
  `,
})
class SurfaceIconMediaItemTest {}

@Component({
  imports: [NbMediaItem],
  template: `
    <nb-media-item
      variant="plain"
      size="md"
      icon="/icons/ticket.png"
      iconAlt="Ticket"
      title="Seat 14A"
      description="Economy window"
    />
  `,
})
class InputMediaItemTest {}

@Component({
  imports: [NbMediaItem],
  template: `
    <nb-media-item
      variant="plain"
      size="md"
      icon="/icons/ticket.png"
      iconAlt="Ticket"
      title="Seat 14A"
      description="Economy window"
      iconBackground="#ff6aa2"
    />
  `,
})
class InputSurfaceIconMediaItemTest {}

@Component({
  imports: [NbMediaItem, NbMediaItemTitle],
  template: `
    <nb-media-item
      variant="plain"
      size="md"
      icon="/icons/plane.png"
      iconAlt="Flight"
      style="--nb-media-item-title-size: 3rem; --nb-media-item-title-font-family: var(--font-heading)"
      description="Jun 14 · 22:15 → 12:45+1"
    >
      <span nbMediaItemTitle>NYC → CDG</span>
    </nb-media-item>
  `,
})
class MixedInputAndProjectedTitleMediaItemTest {}

@Component({
  imports: [NbMediaItem, NbMediaItemTitle, NbMediaItemDescription],
  template: `
    <nb-media-item variant="plain" size="md">
      <img src="/icons/calendar.png" alt="Date" />
      <nb-media-item-title>Jun 20, 2026</nb-media-item-title>
      <nb-media-item-description>Saturday at 6:00 PM</nb-media-item-description>
    </nb-media-item>
  `,
})
class ElementMediaItemTest {}

@Component({
  imports: [
    NbMediaItem,
    NbMediaItemTitle,
    NbMediaItemDescription,
    NbMediaItemIcon,
  ],
  template: `
    <div nbMediaItem variant="plain" size="md">
      <span nbMediaItemIcon surface background="#ff6aa2">
        <img src="/icons/ticket.png" alt="Ticket" />
      </span>
      <div>
        <span nbMediaItemTitle>Seat 14A</span>
        <span nbMediaItemDescription>Economy window</span>
      </div>
    </div>
  `,
})
class SurfaceBooleanIconMediaItemTest {}

describe('NbMediaItem', () => {
  it('supports nbSurface as the media icon frame', async () => {
    const fixture = await createFixture(SurfaceIconMediaItemTest);
    const item = fixture.nativeElement.querySelector(
      '[nbMediaItem]'
    ) as HTMLElement;
    const surface = fixture.nativeElement.querySelector(
      '[nbSurface]'
    ) as HTMLElement;

    expect(item.getAttribute('data-nb-media-item')).toBe('');
    expect(item.className).toContain('[&_[nbSurface]]:shrink-0');
    expect(surface.getAttribute('data-nb-surface')).toBe('');
    expect(surface.getAttribute('data-size')).toBe('lg');
    expect(surface.getAttribute('data-layout')).toBe('center');
  });

  it('renders icon, title, and description from inputs', async () => {
    const fixture = await createFixture(InputMediaItemTest);
    const item = fixture.nativeElement.querySelector(
      'nb-media-item'
    ) as HTMLElement;
    const image = item.querySelector('img') as HTMLImageElement;
    const title = item.querySelector(
      '[data-nb-media-item-title]'
    ) as HTMLElement;
    const description = item.querySelector(
      '[data-nb-media-item-description]'
    ) as HTMLElement;

    expect(item.getAttribute('data-nb-media-item')).toBe('');
    expect(image.getAttribute('src')).toBe('/icons/ticket.png');
    expect(image.getAttribute('alt')).toBe('Ticket');
    expect(title.textContent?.trim()).toBe('Seat 14A');
    expect(description.textContent?.trim()).toBe('Economy window');
    expect(item.className).toContain('[--nb-media-item-gap:0.75rem]');
    expect(item.className).toContain(
      '[&_[data-nb-media-item-title]]:text-[var(--nb-media-item-title-size)]'
    );
  });

  it('renders a framed icon from inputs', async () => {
    const fixture = await createFixture(InputSurfaceIconMediaItemTest);
    const icon = fixture.nativeElement.querySelector(
      '[data-nb-media-item-icon]'
    ) as HTMLElement;

    expect(icon.getAttribute('data-surface')).toBe('true');
    expect(icon.getAttribute('data-background')).toBe('#ff6aa2');
    expect(icon.style.getPropertyValue('--nb-media-item-icon-bg')).toBe(
      '#ff6aa2'
    );
    expect(icon.className).toContain(
      'size-[var(--nb-media-item-surface-size)]'
    );
  });

  it('supports a projected title with input icon and description', async () => {
    const fixture = await createFixture(MixedInputAndProjectedTitleMediaItemTest);
    const item = fixture.nativeElement.querySelector(
      'nb-media-item'
    ) as HTMLElement;
    const image = item.querySelector('img') as HTMLImageElement;
    const title = item.querySelector(
      '[data-nb-media-item-title]'
    ) as HTMLElement;
    const description = item.querySelector(
      '[data-nb-media-item-description]'
    ) as HTMLElement;

    expect(image.getAttribute('src')).toBe('/icons/plane.png');
    expect(image.getAttribute('alt')).toBe('Flight');
    expect(item.style.getPropertyValue('--nb-media-item-title-size')).toBe(
      '3rem'
    );
    expect(
      item.style.getPropertyValue('--nb-media-item-title-font-family')
    ).toBe('var(--font-heading)');
    expect(title.textContent?.trim()).toBe('NYC → CDG');
    expect(description.textContent?.trim()).toBe(
      'Jun 14 · 22:15 → 12:45+1'
    );
  });

  it('supports element selectors for custom content', async () => {
    const fixture = await createFixture(ElementMediaItemTest);
    const item = fixture.nativeElement.querySelector(
      'nb-media-item'
    ) as HTMLElement;
    const title = item.querySelector('nb-media-item-title') as HTMLElement;
    const description = item.querySelector(
      'nb-media-item-description'
    ) as HTMLElement;

    expect(item.getAttribute('data-nb-media-item')).toBe('');
    expect(title.getAttribute('data-nb-media-item-title')).toBe('');
    expect(description.getAttribute('data-nb-media-item-description')).toBe('');
  });

  it('supports nbMediaItemIcon with a surface frame', async () => {
    const fixture = await createFixture(SurfaceBooleanIconMediaItemTest);
    const item = fixture.nativeElement.querySelector(
      '[nbMediaItem]'
    ) as HTMLElement;
    const icon = fixture.nativeElement.querySelector(
      '[nbMediaItemIcon]'
    ) as HTMLElement;

    expect(item.className).toContain('[&_[data-nb-media-item-icon]]:shrink-0');
    expect(icon.getAttribute('data-nb-media-item-icon')).toBe('');
    expect(icon.getAttribute('data-surface')).toBe('true');
    expect(icon.getAttribute('data-background')).toBe('#ff6aa2');
    expect(icon.style.getPropertyValue('--nb-media-item-icon-bg')).toBe(
      '#ff6aa2'
    );
    expect(icon.className).toContain('bg-(--nb-media-item-icon-bg)');
    expect(icon.className).toContain(
      'size-[var(--nb-media-item-surface-size)]'
    );
    expect(icon.className).toContain('rounded-lg');
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
