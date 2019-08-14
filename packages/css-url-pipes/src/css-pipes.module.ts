import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CssUrlPipe } from './pipes/css-url.pipe';

declare const process;

@NgModule({
  imports: [CommonModule],
  declarations: [CssUrlPipe],
  exports: [CssUrlPipe],
  providers: []
})
export class CssUrlPipesModule {}
