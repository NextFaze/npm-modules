import { Component } from '@angular/core';

import { ModelApiService } from '../services/model-api.service';
import { JsonRenderer } from './json-renderer.component';

@Component({
  selector: 'belongsto-renderer',
  styles: [
    `button { display: block; } span { white-space: pre-wrap; font-family: monospace; }`
  ],
  template: `<span *ngIf="shouldRender">{{ result | async | json }}</span>
  <ng-container *ngIf="!shouldRender">{{ row[columnName] }}</ng-container>
  <button (click)="shouldRender = !shouldRender">{{ shouldRender ? 'Hide' : 'Load Related' }}</button>
  `
})
export class BelongsToRenderer extends JsonRenderer {
  static DEFAULT_TYPES = ['belongsTo'];
  result: any;
  relationGetter: string;

  constructor(public modelApi: ModelApiService) {
    super();
  }

  ngOnInit() {
    this.result = this.modelApi.fetchBelongsToData(
      this.api.model.getModelDefinition(),
      this.row,
      this.modelApi.relationNameFromForeignKey(
        this.api.model.getModelDefinition(),
        this.columnName
      )
    );
  }
}
