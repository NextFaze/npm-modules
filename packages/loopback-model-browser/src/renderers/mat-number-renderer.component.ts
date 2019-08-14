import { Component } from '@angular/core';
import { NumberRenderer } from '@nextfaze/loopback-model-form';

@Component({
  selector: 'mat-number-renderer',
  template: `
  <mat-form-field class="container">
    <input
      type="number"
      matInput
      [placeholder]="title"
      [ngModel]="value"
      (ngModelChange)="propagateChange($event)"
      [disabled]="disabled">
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
export class MaterialNumberRenderer extends NumberRenderer {}
