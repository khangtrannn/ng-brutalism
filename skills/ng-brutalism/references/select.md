# Select

The neo-brutalist Angular Select component. A brutalist custom dropdown with projected option content, active states, selected checks, and a native select directive for simple forms.

## Import
```typescript
import { NbNativeSelect, NbSelect, NbSelectOption } from '@ng-brutalism/ui';
```

## API Reference

### nb-select (NbSelect)
| Attribute | Type | Default | Description |
|---|---|---|---|
| `placeholder` | `string` | `'Select an option'` | Text shown when no option is selected. |
| `value` | `ModelSignal<NbSelectValue \| null>` | `null` | Selected value for two-way binding. |
| `disabled` | `boolean` | `false` | Disables the trigger and all options. |
| `aria-label` | `string \| null` | `null` | Accessible label for the trigger. |
| `aria-labelledby` | `string \| null` | `null` | ID reference for an external label. |

### select[nbSelect] (NbNativeSelect)
Directive applied to a native `<select>` element to give it the brutal look without the custom listbox behaviour. Detects when nested inside an `<nb-input-group>` and adjusts its border and shadow accordingly. Has no inputs.

## Usage Examples

### Default
```html
<nb-select placeholder="Select an option">
  <nb-select-option value="worldwide" label="Worldwide">
    Worldwide
  </nb-select-option>
  <nb-select-option value="full-time" label="Full-time">
    Full-time
  </nb-select-option>
  <nb-select-option value="part-time" label="Part-time">
    Part-time
  </nb-select-option>
  <nb-select-option value="remote" label="Remote">
    Remote
  </nb-select-option>
</nb-select>
```

### With Label
```html
<div class="grid gap-2">
  <label nbLabel id="plan-label">Plan</label>
  <nb-select placeholder="Select a plan" aria-labelledby="plan-label">
    <nb-select-option value="starter" label="Starter">Starter</nb-select-option>
    <nb-select-option value="team" label="Team">Team</nb-select-option>
    <nb-select-option value="enterprise" label="Enterprise">Enterprise</nb-select-option>
  </nb-select>
</div>
```

### With Prefix
```html
<div>
  <label nbLabel id="subject-label" class="mb-2 block">Subject</label>
  <nb-input-group>
    <span nbInputPrefix>
      <!-- Prefix Icon -->
    </span>
    <nb-select placeholder="What is this regarding?" aria-labelledby="subject-label">
      <nb-select-option value="general" label="General Inquiry">General Inquiry</nb-select-option>
      <nb-select-option value="project" label="Project Proposal">Project Proposal</nb-select-option>
      <nb-select-option value="bug" label="Bug Report">Bug Report</nb-select-option>
      <nb-select-option value="other" label="Other">Other</nb-select-option>
    </nb-select>
  </nb-input-group>
</div>
```

### Custom Option Content
```html
<nb-select placeholder="Select location" [value]="'worldwide'">
  <nb-select-option label="Select location">
    Select location
  </nb-select-option>
  <nb-select-option value="worldwide" label="Worldwide">
    Worldwide
  </nb-select-option>
  <nb-select-option value="north-america" label="North America">
    North America
  </nb-select-option>
  <nb-select-option value="europe" label="Europe">
    Europe
  </nb-select-option>
</nb-select>
```

### Disabled
```html
<nb-select placeholder="Select an option" disabled>
  <nb-select-option value="one" label="One">One</nb-select-option>
</nb-select>
```

### Native Select
```html
<select
  nbSelect
  class="w-80"
  aria-label="Favorite accent"
>
  <option value="" disabled selected>Favorite accent</option>
  <option value="mint">Mint</option>
  <option value="yellow">Yellow</option>
  <option value="pink">Pink</option>
</select>
```
