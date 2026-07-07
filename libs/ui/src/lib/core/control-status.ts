import { computed, effect, signal, type Signal } from '@angular/core';
import { Validators, type NgControl } from '@angular/forms';

export interface NbControlStatus {
  readonly invalid: Signal<boolean>;
  readonly required: Signal<boolean>;
}

export function trackControlStatus(
  ngControl: () => NgControl | null | undefined
): NbControlStatus {
  const status = signal<string | undefined>(undefined);
  const touched = signal(false);
  const dirty = signal(false);

  effect((onCleanup) => {
    const control = ngControl()?.control;

    if (!control) {
      return;
    }

    const sync = () => {
      status.set(control.status);
      touched.set(control.touched);
      dirty.set(control.dirty);
    };

    sync();
    const subscription = control.events.subscribe(sync);

    onCleanup(() => subscription.unsubscribe());
  });

  return {
    invalid: computed(() => status() === 'INVALID' && (touched() || dirty())),
    required: computed(
      () => ngControl()?.control?.hasValidator(Validators.required) ?? false
    ),
  };
}
