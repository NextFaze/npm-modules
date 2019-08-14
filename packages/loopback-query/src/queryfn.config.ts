import { InjectionToken } from '@angular/core';

export const QUERY_FN = new InjectionToken<QueryFn>('lbq.query-fn');

export interface QueryFn {
  [KEY: string]: (query: any, name: string, value: any) => any;
}
