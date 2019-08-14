import { Component } from '@angular/core';

import { ControlRendererComponent } from '../types';

@Component({
  selector: 'control-boolean-renderer',
  template: `
  <label>{{ title }}</label>
  <input
    type="checkbox"
    [placeholder]="title"
    [ngModel]="value"
    (ngModelChange)="propagateChange($event)"
    [disabled]="disabled">
  `,
  styles: [
    `
    input {
      width: 100%;
      box-sizing: border-box;
      margin: 10px 0;
    }
  `,
  ],
})
export class BooleanRenderer extends ControlRendererComponent {
  static DEFAULT_TYPES = ['boolean', 'Boolean'];
  value: boolean;
  disabled: boolean;

  writeValue(value: boolean) {
    this.value = value;
  }
  propagateChange = (_: any) => {};
  registerOnChange(fn) {
    this.propagateChange = fn;
  }
  registerOnTouched() {}
  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
}
