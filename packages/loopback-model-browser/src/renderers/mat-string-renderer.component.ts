import { Component } from '@angular/core';
import { StringRenderer } from '@nextfaze/loopback-model-form';

@Component({
  selector: 'mat-string-renderer',
  template: `
  <mat-form-field class="container">
    <input
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
export class MaterialStringRenderer extends StringRenderer {}
