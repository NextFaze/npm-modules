import { Component } from '@angular/core';

import { ControlRendererComponent } from '../types';

@Component({
  selector: 'control-string-renderer',
  template: `
  <label>{{ title }}</label>
  <input
    [placeholder]="title"
    [ngModel]="value"
    (ngModelChange)="propagateChange($event)"
    [disabled]="disabled">
  `,
  styles: [
    `
    input {
      width: 100%
      box-sizing: border-box;
      margin: 10px 0;
      padding: 10px 20px 10px 20px;
      border: 0;
    }
  `,
  ],
})
export class StringRenderer extends ControlRendererComponent {
  static DEFAULT_TYPES = ['string', 'String'];
  value: string;
  disabled: boolean;

  writeValue(value: any) {
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
