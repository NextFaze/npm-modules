import { Component } from '@angular/core';
import { ControlRendererComponent } from '@nextfaze/loopback-model-form';

@Component({
  selector: 'mat-date-renderer',
  template: `
  <mat-form-field class="container">
    <input
        matInput
        [matDatepicker]="datepicker"
        [placeholder]="title"
        (ngModelChange)="propagateChange($event)"
        [(ngModel)]="value"
        [disabled]="disabled" />
    <mat-datepicker-toggle matSuffix [for]="datepicker"></mat-datepicker-toggle>
    <mat-datepicker #datepicker></mat-datepicker>
  </mat-form-field>
  `,
  styles: [
    `
    .container {
      width: 100%;
    }
  `,
  ],
})
export class MaterialDateRenderer extends ControlRendererComponent {
  static DEFAULT_TYPES = ['date', 'Date', 'datetime', 'Datetime'];
  value: any;
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
