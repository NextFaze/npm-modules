import { Component } from '@angular/core';
import { CellRendererComponent } from '../types';

@Component({
  selector: 'json-renderer',
  styles: [`button { display: block; } span { white-space: pre-wrap }`],
  template: `<span *ngIf="shouldRender">{{ row[columnName] | json }}</span>
  <button (click)="shouldRender = !shouldRender">{{ shouldRender ? 'Hide' : 'Show' }}</button>
  `
})
export class JsonRenderer extends CellRendererComponent<any> {
  static DEFAULT_TYPES = ['object', 'any', 'Object'];
  shouldRender: boolean;
}
