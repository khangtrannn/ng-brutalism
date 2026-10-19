import * as i0 from '@angular/core';
import { DoCheck, OnDestroy, InjectionToken } from '@angular/core';
import { ControlValueAccessor, AbstractControl, NgForm, FormGroupDirective } from '@angular/forms';
import { NbSelectValue } from '@ng-brutalism/ui';

declare class NbSelectControlBridge implements ControlValueAccessor, DoCheck, OnDestroy {
    private readonly nbSelect;
    private readonly errorStateMatcher;
    private readonly ngControl;
    private readonly parentForm;
    private readonly parentFormGroup;
    private writingValue;
    private statusSubscription?;
    private readonly valueSubscription;
    private readonly touchSubscription;
    constructor();
    ngDoCheck(): void;
    ngOnDestroy(): void;
    private onChange;
    private onTouched;
    writeValue(value: NbSelectValue | null): void;
    registerOnChange(fn: (value: NbSelectValue | null) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    private watchControlStatusOnce;
    private updateInvalid;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbSelectControlBridge, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NbSelectControlBridge, "nb-select[formControl], nb-select[formControlName], nb-select[ngModel]", never, {}, {}, never, never, true, never>;
}

declare class NbFieldControlBridge implements DoCheck {
    private readonly nbField;
    private readonly errorStateMatcher;
    private readonly parentForm;
    private readonly parentFormGroup;
    private readonly ngControl;
    constructor();
    ngDoCheck(): void;
    private update;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbFieldControlBridge, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NbFieldControlBridge, "nb-field", never, {}, {}, ["ngControl"], never, true, never>;
}

interface NbErrorStateMatcherContext {
    control: AbstractControl | null;
    parentForm: NgForm | null;
    parentFormGroup: FormGroupDirective | null;
}
interface NbErrorStateMatcher {
    isErrorState(context: NbErrorStateMatcherContext): boolean;
}
declare const nbDefaultErrorStateMatcher: NbErrorStateMatcher;
declare const NB_ERROR_STATE_MATCHER: InjectionToken<NbErrorStateMatcher>;

export { NB_ERROR_STATE_MATCHER, NbFieldControlBridge, NbSelectControlBridge, nbDefaultErrorStateMatcher };
export type { NbErrorStateMatcher, NbErrorStateMatcherContext };
