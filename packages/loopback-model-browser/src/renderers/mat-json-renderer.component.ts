import { Component } from '@angular/core';
import { JsonRenderer } from '@nextfaze/loopback-model-form';

@Component({
  selector: 'mat-json-renderer',
  template: `
  <mat-form-field class="container">
    <textarea
      matInput
      rows="8"
      [placeholder]="title"
      [ngModel]="value | json"
      (ngModelChange)="updateValue($event)"
      [disabled]="disabled">
    </textarea>
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
export class MaterialJsonRenderer extends JsonRenderer {}
