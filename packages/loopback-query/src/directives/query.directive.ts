import {
  ComponentFactoryResolver,
  Directive,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import { WrapperComponent } from '../components';
import { QuerializeService } from '../services';

@Directive({
  selector: '[lbQuery]',
  providers: [QueryDirective],
})
export class QueryDirective {
  @Output('lbQueryOutput') output = new EventEmitter();
  @Input('lbQueryInput') inputTpl: TemplateRef<any>;
  @Input('lbQuerySelector') selectorTpl: any;
  @Input('lbQuery')
  set dataModel(value: any) {
    const component = this.vcr.createComponent(
      this.factory.resolveComponentFactory(WrapperComponent)
    );
    component.instance.dataModel = value;
    component.instance.inputTpl = this.inputTpl;
    component.instance.selectorTpl = this.selectorTpl;
    component.instance.content = this.template;
    component.instance.onSubmit = val => {
      const entries: Array<[string, any]> = Object.keys(val).map(
        key => <[string, any]>[key, val[key]]
      );
      return this.output.emit(this.service.parse(entries));
    };
  }

  constructor(
    private template: TemplateRef<any>,
    private vcr: ViewContainerRef,
    private factory: ComponentFactoryResolver,
    private service: QuerializeService
  ) {}
}
