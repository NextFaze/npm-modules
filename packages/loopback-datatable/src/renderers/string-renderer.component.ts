import { Component } from '@angular/core';

import { CellRendererComponent } from '../types';

@Component({
  selector: 'string-renderer',
  template: `{{ row[columnName] }}`
})
export class StringRenderer extends CellRendererComponent<any> {
  static DEFAULT_TYPES = ['string', 'number', 'boolean'];
}
