import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSortModule, MatTableModule } from '@angular/material';

import { LoopbackDataTableComponent } from '../components';
import {
  CellPlaceholderDirective,
  CellRendererDirective,
  LoopbackDatatableDirective,
} from '../directives';
import { RENDERERS } from '../renderers';
import { ColumnRendererConfig } from '../services';

@NgModule({
  imports: [CommonModule, MatTableModule, MatSortModule, CdkTableModule],
  declarations: [
    LoopbackDataTableComponent,
    CellPlaceholderDirective,
    CellRendererDirective,
    LoopbackDatatableDirective,
    ...RENDERERS,
  ],
  entryComponents: RENDERERS,
  exports: [
    CommonModule,
    LoopbackDataTableComponent,
    CellPlaceholderDirective,
    CellRendererDirective,
    LoopbackDatatableDirective,
  ],
  providers: [ColumnRendererConfig],
})
export class LoopbackDatatableModule {}
