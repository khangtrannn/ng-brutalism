# @ng-brutalism/ui/forms-compat

Secondary entry point of `@ng-brutalism/ui`. It can be used by importing from `@ng-brutalism/ui/forms-compat`.

Bridges `nb-select` into classic Angular forms (`formControl`/`formControlName`/`ngModel`) and
gives `nb-field` automatic error visibility under a classic control. The default error matcher
matches Angular Material's timing: show invalid state when the control is invalid and either
touched or its parent form has been submitted. Override `NB_ERROR_STATE_MATCHER` for project-
specific timing. See ADR 0004 (`docs/adr/0004-forms-support.md`) for the design. Requires
`@angular/forms` as a peer.
