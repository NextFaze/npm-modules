export interface ModelDefinition {
  name: string;
  properties: PropertiesDefinition;
}
export interface PropertiesDefinition {
  [key: string]: Property;
}
export interface Property {
  // Required fields
  type: LoopbackType;
  // Optional fields
  name?: string;
  default?: any;
  required?: boolean;

  // Not yet implemented
  // description?: string | string[];
  // id?: boolean;
}

/**
 * A model with values
 *
 * Example:
 * {
 *   "id": "000-111",
 *   "username": "johnsmith",
 * }
 */
export interface Value {
  [key: string]: any;
}

/**
 * Any type, including array, object, Date, or GeoPoint
 *
 * https://loopback.io/doc/en/lb3/LoopBack-types.html
 */
export type LoopbackType =
  | 'any'
  | 'array'
  | 'Boolean'
  | 'buffer'
  | 'date'
  | 'GeoPoint'
  | 'DateString'
  | 'number'
  | 'Object'
  | 'String'
  | null
  | string;
