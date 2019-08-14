import { Injectable } from '@angular/core';

import { ModelDefinition } from '../types';

@Injectable()
export class SerialiserService {
  /**
   * Serialises a model to a model definition object
   *
   * Provide your own SerialiserService if your models do not match the
   * ModelDefinition type
   * @param modelDefinition
   */
  serialise(modelDefinition: any): ModelDefinition {
    return modelDefinition;
  }
}
