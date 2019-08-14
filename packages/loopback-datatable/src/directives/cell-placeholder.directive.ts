import { Input, Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[cellPlaceholder]'
})
export class CellPlaceholderDirective {
  @Input('cellPlaceholder') cellPlaceholder: string;
  @Input() payload: any;
  constructor(public viewContainer: ViewContainerRef) {}
}
