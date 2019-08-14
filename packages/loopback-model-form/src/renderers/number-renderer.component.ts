import { Component } from '@angular/core';

import { ControlRendererComponent } from '../types';

@Component({
  selector: 'control-number-renderer',
  template: `
  <label>{{ title }}</label>
  <input
    type="number"
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
      padding: 10px 20px 10px 20px;
      border: 0;
    }
  `,
  ],
})
export class NumberRenderer extends ControlRendererComponent {
  static DEFAULT_TYPES = ['number', 'Number'];
  value: number;
  disabled: boolean;

  writeValue(value: number) {
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
