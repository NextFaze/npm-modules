import { Component } from '@angular/core';
import { PasswordRenderer } from '@nextfaze/loopback-model-form';

@Component({
  selector: 'mat-password-renderer',
  template: `
  <mat-form-field class="container">
    <input
      matInput
      type="password"
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
export class MaterialPasswordRenderer extends PasswordRenderer {}
