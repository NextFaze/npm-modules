import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  forwardRef,
  Input,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ControlRendererConfig } from '../services';
import { ControlRendererComponent, Property } from '../types';

@Component({
  selector: 'loopback-input',
  template: '<ng-container #placeholder></ng-container>',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  // Placeholder where the input will be created at
  @ViewChild('placeholder', { read: ViewContainerRef, static: true })
  placeholder: ViewContainerRef;

  @Input('formControlName') formControlName: string;

  @Input()
  set property(val: Property) {
    if (!this.comp) {
      // Resolve the component
      const component =
        this.config.getControlRenderer(val.name) ||
        this.config.getControlRenderer(val.type) ||
        this.config.getControlRenderer(this.formControlName) ||
        this.config.getControlRenderer('object');
      const factory = this.componentFactoryResolver.resolveComponentFactory(
        component
      );
      this.comp = this.placeholder.createComponent(factory);
    }
    // Set component
    this.comp.instance.properties = val;
    this.comp.instance.title = this.title(val.name || this.formControlName);
  }

  // Reference to the created component
  comp: ComponentRef<ControlRendererComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    public config: ControlRendererConfig
  ) {}

  writeValue = (obj: any) => this.comp.instance.writeValue(obj);
  registerOnChange = (fn: any) => this.comp.instance.registerOnChange(fn);
  registerOnTouched = (fn: any) => this.comp.instance.registerOnTouched(fn);
  setDisabledState = (isDisabled: boolean) =>
    this.comp.instance.setDisabledState(isDisabled);

  title(value: string) {
    // Convert to title case except the value 'id' when it is on its own which becomes 'ID'
    return `${value[0].toUpperCase()}${value
      .slice(1)
      .replace(/([A-Z])/g, ' $1')}`.replace(/\b(id)\b/gi, 'ID');
  }
}
