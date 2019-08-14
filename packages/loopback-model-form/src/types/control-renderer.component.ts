import { Type } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { Property } from '.';

export abstract class ControlRendererComponent implements ControlValueAccessor {
  // Types to associate this renderer with
  static DEFAULT_TYPES: string[] = [];

  // Model definition properties
  properties: Property;
  // Human readable formatted field name
  title: string;

  // Control value accessor fields
  abstract writeValue(obj: any): void;
  abstract registerOnChange(fn: any): void;
  abstract registerOnTouched(fn: any): void;
  abstract setDisabledState(isDisabled: boolean): void;
}

export type Renderers = Array<Type<ControlRendererComponent>>;
