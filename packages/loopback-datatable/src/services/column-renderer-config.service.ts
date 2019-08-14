import { Injectable } from '@angular/core';

import { CellRendererDirective } from '../directives';
import { RENDERERS } from '../renderers';

@Injectable()
export class ColumnRendererConfig {
  private cellRenderers: Map<string, CellRendererDirective> = new Map();

  constructor() {
    this.registerDefaultRenderers();
  }

  registerDefaultRenderers() {
    RENDERERS.forEach(renderer => {
      this.registerCellRenderer(renderer.DEFAULT_TYPES, renderer);
    });
  }

  registerCellRenderer(type: string | string[], component: any) {
    if (Array.isArray(type)) {
      type.forEach(typeValue => this.cellRenderers.set(typeValue, component));
    } else {
      this.cellRenderers.set(type, component);
    }
  }

  getCellRenderer(type: string) {
    return this.cellRenderers.get(type);
  }
}
