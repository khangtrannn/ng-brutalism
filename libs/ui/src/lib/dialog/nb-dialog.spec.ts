import { Component, signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';

import { NbDialog } from './nb-dialog';
import { NbDialogActions } from './nb-dialog-actions';
import { NbDialogClose } from './nb-dialog-close';
import { NbDialogContent } from './nb-dialog-content';
import { NbDialogDescription } from './nb-dialog-description';
import { NbDialogTitle } from './nb-dialog-title';

@Component({
  imports: [NbDialog],
  template: `<nb-dialog (closed)="onClosed()" />`,
})
class DialogClosedTest {
  closedCount = 0;

  onClosed(): void {
    this.closedCount++;
  }
}

@Component({
  imports: [
    NbDialog,
    NbDialogTitle,
    NbDialogDescription,
    NbDialogContent,
    NbDialogActions,
    NbDialogClose,
  ],
  template: `
    <nb-dialog>
      <h2 nbDialogTitle>Delete item</h2>
      <p nbDialogDescription>This action cannot be undone.</p>
      <nb-dialog-content>Are you sure you want to continue?</nb-dialog-content>
      <nb-dialog-actions>
        <button type="button" nbDialogClose>Cancel</button>
        <button type="button">Delete</button>
      </nb-dialog-actions>
    </nb-dialog>
  `,
})
class DialogContentTest {}

@Component({
  imports: [NbDialog],
  template: `<nb-dialog [dismissible]="dismissible()" />`,
})
class DialogDismissibleTest {
  readonly dialog = viewChild.required(NbDialog);
  readonly dismissible = signal(true);
}

describe('NbDialog', () => {
  it('emits closed whenever the native dialog fires its close event', async () => {
    // Arrange
    const fixture = await createFixture();
    const dialogEl = findDialogEl(fixture);

    // Act
    dialogEl.dispatchEvent(new Event('close'));

    // Assert
    expect(fixture.componentInstance.closedCount).toBe(1);
  });

  it('closes on backdrop click by default (dismissible)', async () => {
    // Arrange
    const fixture = await createDismissibleFixture();
    const dialogEl = findDialogEl(fixture);
    const closeSpy = vi
      .spyOn(fixture.componentInstance.dialog(), 'close')
      .mockImplementation(() => undefined);

    // Act
    dialogEl.dispatchEvent(
      new MouseEvent('click', { bubbles: true, cancelable: true })
    );

    // Assert
    expect(closeSpy).toHaveBeenCalledTimes(1);
  });

  it('does not close on backdrop click when dismissible is false', async () => {
    // Arrange
    const fixture = await createDismissibleFixture();
    fixture.componentInstance.dismissible.set(false);
    fixture.detectChanges();
    const dialogEl = findDialogEl(fixture);
    const closeSpy = vi
      .spyOn(fixture.componentInstance.dialog(), 'close')
      .mockImplementation(() => undefined);

    // Act
    dialogEl.dispatchEvent(
      new MouseEvent('click', { bubbles: true, cancelable: true })
    );

    // Assert
    expect(closeSpy).not.toHaveBeenCalled();
  });

  it('has no axe violations while open', async () => {
    // Arrange
    const fixture = await createContentFixture();
    const dialogEl = fixture.nativeElement.querySelector(
      'dialog'
    ) as HTMLDialogElement;

    // Act
    dialogEl.setAttribute('open', '');
    fixture.detectChanges();

    // Assert
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });
});

async function createFixture(): Promise<ComponentFixture<DialogClosedTest>> {
  await TestBed.configureTestingModule({
    imports: [DialogClosedTest],
  }).compileComponents();

  const fixture = TestBed.createComponent(DialogClosedTest);
  fixture.detectChanges();

  return fixture;
}

async function createContentFixture(): Promise<
  ComponentFixture<DialogContentTest>
> {
  await TestBed.configureTestingModule({
    imports: [DialogContentTest],
  }).compileComponents();

  const fixture = TestBed.createComponent(DialogContentTest);
  fixture.detectChanges();

  return fixture;
}

async function createDismissibleFixture(): Promise<
  ComponentFixture<DialogDismissibleTest>
> {
  await TestBed.configureTestingModule({
    imports: [DialogDismissibleTest],
  }).compileComponents();

  const fixture = TestBed.createComponent(DialogDismissibleTest);
  fixture.detectChanges();

  return fixture;
}

function findDialogEl(
  fixture: ComponentFixture<DialogClosedTest | DialogDismissibleTest>
): HTMLDialogElement {
  return fixture.nativeElement.querySelector('dialog') as HTMLDialogElement;
}
