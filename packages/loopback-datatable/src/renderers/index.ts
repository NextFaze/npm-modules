import { BelongsToRenderer } from './belongs-to-renderer.component';
import { DateRenderer } from './date-renderer.component';
import { JsonRenderer } from './json-renderer.component';
import { StringRenderer } from './string-renderer.component';

export * from './belongs-to-renderer.component';
export * from './date-renderer.component';
export * from './json-renderer.component';
export * from './string-renderer.component';

export const RENDERERS = [
  BelongsToRenderer,
  DateRenderer,
  JsonRenderer,
  StringRenderer
];
