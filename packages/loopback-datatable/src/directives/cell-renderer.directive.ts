import { Input, Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[cellRenderer]'
})
export class CellRendererDirective {
  @Input('cellRenderer') cellRenderer: string;
  constructor(public template: TemplateRef<any>) {}
}
