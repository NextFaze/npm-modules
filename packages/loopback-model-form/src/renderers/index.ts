import { Renderers } from '../types';
import { BooleanRenderer } from './boolean-renderer.component';
import { JsonRenderer } from './json-renderer.component';
import { NumberRenderer } from './number-renderer.component';
import { PasswordRenderer } from './password-renderer.component';
import { StringRenderer } from './string-renderer.component';

export * from './string-renderer.component';
export * from './json-renderer.component';
export * from './boolean-renderer.component';
export * from './number-renderer.component';
export * from './password-renderer.component';

export const RENDERERS: Renderers = [
  StringRenderer,
  BooleanRenderer,
  JsonRenderer,
  NumberRenderer,
  PasswordRenderer,
];
