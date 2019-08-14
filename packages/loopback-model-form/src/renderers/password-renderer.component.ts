import { Component } from '@angular/core';

import { ControlRendererComponent } from '../types';

@Component({
  selector: 'control-password-renderer',
  template: `
  <label>{{ title }}</label>
  <input
    type="password"
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
export class PasswordRenderer extends ControlRendererComponent {
  static DEFAULT_TYPES = ['password'];
  value: string;
  disabled: boolean;

  writeValue(value: string) {
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
