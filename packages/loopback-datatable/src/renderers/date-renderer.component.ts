import { Component } from '@angular/core';
import { CellRendererComponent } from '../types';

@Component({
  selector: 'string-renderer',
  template: `{{ row[columnName] | date }}`
})
export class DateRenderer extends CellRendererComponent<any> {
  static DEFAULT_TYPES = ['date', 'Date'];
}
