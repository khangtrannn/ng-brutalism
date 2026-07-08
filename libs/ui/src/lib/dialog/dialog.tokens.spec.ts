import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import {
  NbDialogActions,
  NbDialog,
  NbDialogContent,
  NbDialogDescription,
  NbDialogTitle,
} from './index';

@Component({
  imports: [
    NbDialog,
    NbDialogTitle,
    NbDialogDescription,
    NbDialogContent,
    NbDialogActions,
  ],
  template: `
    <nb-dialog>
      <h2 nbDialogTitle>Dialog title</h2>
      <p nbDialogDescription>Dialog description</p>
      <nb-dialog-content>Dialog content</nb-dialog-content>
      <nb-dialog-actions>Dialog actions</nb-dialog-actions>
    </nb-dialog>
  `,
})
class DialogTokenTest {}

describe('NbDialog token surface', () => {
  it('leaves default visuals to CSS token fallbacks on the dialog element', async () => {
    // Arrange
    const fixture = await createFixture();
    const dialog = findDialog(fixture);

    // Assert
    expect(dialog.style.getPropertyValue('background')).toBe('');
    expect(dialog.style.getPropertyValue('color')).toBe('');
    expect(dialog.style.getPropertyValue('border-color')).toBe('');
    expect(dialog.style.getPropertyValue('--nb-dialog-bg')).toBe('');
    expect(dialog.style.getPropertyValue('border-radius')).toBe('');
    expect(dialog.style.getPropertyValue('box-shadow')).toBe('');
    expect(dialog.style.getPropertyValue('border-width')).toBe('');
    expect(dialog.style.cssText).not.toContain('--nb-resolved');
  });

  it('does not emit legacy token utility classes', async () => {
    // Arrange
    const fixture = await createFixture();
    const cls = findDialog(fixture).className;

    // Assert
    expect(cls).not.toMatch(/(?:^|\s)nb-tone(?:\s|$)/);
    expect(cls).not.toContain('bg-(--nb-dialog-bg)');
    expect(cls).not.toContain('text-(--nb-dialog-fg)');
    expect(cls).not.toContain('border-(--nb-dialog-border-color)');
    expect(findDialogHost(fixture).className).not.toMatch(/(?:^|\s)nb-border-width(?:\s|$)/);
    expect(findDialogHost(fixture).className).not.toMatch(/(?:^|\s)nb-radius(?:\s|$)/);
    expect(findDialogHost(fixture).className).not.toMatch(/(?:^|\s)nb-shadow(?:\s|$)/);
    expect(cls).not.toContain('bg-white');
    expect(cls).not.toContain('text-(--nb-foreground)');
    expect(cls).not.toContain('border-(--nb-border)');
    expect(cls).not.toContain('rounded-lg');
    expect(cls).not.toContain('shadow-[8px_8px_0_0_var(--nb-shadow)]');
  });

  it('declares and reads the dialog sub-part tokens', async () => {
    // Arrange
    const fixture = await createFixture();
    const host = fixture.nativeElement as HTMLElement;

    const description = findSlot(host, 'dialog-description');
    const content = findSlot(host, 'dialog-content');
    const actions = findSlot(host, 'dialog-actions');

    // Assert
    expect(description.className).toBe('');
    expect(description.getAttribute('data-slot')).toBe('dialog-description');

    expect(content.className).toBe('');
    expect(content.getAttribute('data-slot')).toBe('dialog-content');

    expect(actions.className).toBe('');
    expect(actions.getAttribute('data-slot')).toBe('dialog-actions');
  });

  it('keeps dialog surface anatomy out of classes', async () => {
    // Arrange
    const fixture = await createFixture();
    const dialog = findDialog(fixture);

    // Assert
    expect(dialog.className).toBe('');
    expect(dialog.getAttribute('data-slot')).toBe('dialog-surface');
  });
});

async function createFixture(): Promise<
  ComponentFixture<DialogTokenTest>
> {
  await TestBed.configureTestingModule({
    imports: [DialogTokenTest],
  }).compileComponents();

  const fixture = TestBed.createComponent(DialogTokenTest);
  fixture.detectChanges();

  return fixture;
}

function findDialog(
  fixture: ComponentFixture<DialogTokenTest>
): HTMLDialogElement {
  return fixture.nativeElement.querySelector('dialog') as HTMLDialogElement;
}

function findDialogHost(
  fixture: ComponentFixture<DialogTokenTest>
): HTMLElement {
  return fixture.nativeElement.querySelector('nb-dialog') as HTMLElement;
}

function findSlot(host: HTMLElement, slot: string): HTMLElement {
  return host.querySelector(`[data-slot="${slot}"]`) as HTMLElement;
}
