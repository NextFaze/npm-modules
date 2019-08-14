import { Inject, Injectable } from '@angular/core';

import { QUERY_FN, QueryFn } from '../queryfn.config';

@Injectable()
export class QuerializeService {
  constructor(@Inject(QUERY_FN) public queryFn: QueryFn) {}

  parse(values: Array<[string, { type: string; value: any }]>) {
    return values.reduce((query, [name, { type, value }]) => {
      const fn = this.queryFn[type];
      if (typeof fn !== 'function') {
        console.warn(name, 'skipped due to missing function to handle', type);
        return query;
      }
      return fn(query, name, value);
    }, {});
  }

  createDataModel(modelDefinition: any) {
    const dataModel = {};
    const types = {
      string: ['EQUAL', 'NOT_EQUAL', 'REGEX', 'INCLUDES', 'NOT_INCLUDES'],
      date: ['EQUAL', 'NOT_EQUAL', 'GREATER_THAN', 'LESS_THAN'],
      number: [
        'EQUAL',
        'NOT_EQUAL',
        'GREATER_THAN',
        'LESS_THAN',
        'INCLUDES',
        'NOT_INCLUDES',
      ],
      boolean: ['EQUAL'],
      geopoint: ['NEAR', 'EQUAL', 'NOT_EQUAL'],
      any: [
        'EQUAL',
        'NOT_EQUAL',
        'GREATER_THAN',
        'LESS_THAN',
        'NEAR',
        'REGEX',
        'INCLUDES',
        'NOT_INCLUDES',
      ],
    };
    for (let name in modelDefinition.properties) {
      if (modelDefinition.properties[name]) {
        const property = modelDefinition.properties[name];
        const propertyTypes = types[property.type.toLowerCase()];
        if (property && propertyTypes) {
          dataModel[property.name] = {
            types: propertyTypes,
          };
        }
      }
    }
    return dataModel;
  }
}
