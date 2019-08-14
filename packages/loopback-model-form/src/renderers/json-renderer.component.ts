import { Component } from '@angular/core';

import { ControlRendererComponent } from '../types';

@Component({
  selector: 'control-json-renderer',
  template: `
  <label>{{ title }}</label>
  <textarea
    rows="5"
    [placeholder]="title"
    [ngModel]="value | json"
    (ngModelChange)="updateValue($event)"
    [disabled]="disabled">
  </textarea>
  `,
  styles: [
    `
    textarea {
      width: 100%;
      box-sizing: border-box;
      margin: 10px 0;
      padding: 10px 20px 10px 20px;
      border: 0;
    }
  `,
  ],
})
export class JsonRenderer extends ControlRendererComponent {
  static DEFAULT_TYPES = ['any', 'object', 'Object'];
  value: string;
  disabled: boolean;

  writeValue(value: any) {
    this.value = value;
  }

  updateValue(value: string) {
    try {
      this.value = JSON.parse(value);
    } catch (ex) {}
    this.propagateChange(this.value);
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
