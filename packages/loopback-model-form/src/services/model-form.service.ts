import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { ModelFormConfig, ModelDefinition, PropertiesDefinition } from '../types';
import { SerialiserService } from './serialiser.service';

export const MODEL_FORMS = new InjectionToken<ModelFormConfig>('lbmf.forms');

@Injectable()
export class ModelFormService {
  modelForms: ModelFormConfig;

  constructor(
    @Optional()
    @Inject(MODEL_FORMS)
    public forms: ModelFormConfig,
    public fb: FormBuilder,
    public serialiser: SerialiserService
  ) {
    this.modelForms = forms || new Map();
  }

  /**
   * Serialises a model object and returns its form
   *
   * Will attempt to get the model from the provided MODEL_FORMS
   * first, and fall back to generating it based on the properties definition
   */
  createFormForModel(modelDefinition: ModelDefinition): FormGroup {
    const { name, properties } = this.serialiser.serialise(modelDefinition);

    const config = this.modelForms.get(name);
    let defaults, form;
    if (config) {
      // Use the existing form
      defaults = config.defaults;
      form = config.form;
    } else {
      // Generate and save a new model form from properties
      form = this.buildForm(properties);
      defaults = this.buildValue(properties);
      this.modelForms.set(name, { form, defaults });
    }
    form.patchValue(defaults);
    return form;
  }

  /**
   * Constructs a default form value
   *
   * e.g.
   *  {
   *    "username": "default-username-123",
   *    "password": undefined
   *  }
   */
  buildValue(propertiesDef: PropertiesDefinition) {
    let properties = {};
    for (let name in propertiesDef) {
      if (propertiesDef[name]) {
        const property = propertiesDef[name];
        properties[name] = property.default;
      }
    }
    return properties;
  }

  /**
   * Generates default form config from properties definition
   */
  buildForm(
    properties: PropertiesDefinition,
    initialData: any = {}
  ): FormGroup {
    let formControls = {};
    for (let name in properties) {
      if (properties[name]) {
        formControls[name] = new FormControl(initialData[name]);
      }
    }
    return this.fb.group(formControls);
  }
}
