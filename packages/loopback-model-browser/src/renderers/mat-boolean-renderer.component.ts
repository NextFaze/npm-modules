import { Component } from '@angular/core';
import { BooleanRenderer } from '@nextfaze/loopback-model-form';

@Component({
  selector: 'mat-boolean-renderer',
  template: `
  <mat-checkbox
    [ngModel]="value"
    (ngModelChange)="propagateChange($event)"
    [disabled]="disabled">
    {{ title }}
  </mat-checkbox>
  `,
})
export class MaterialBooleanRenderer extends BooleanRenderer {}
