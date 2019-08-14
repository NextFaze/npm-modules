import { InjectionToken } from '@angular/core';

export interface BaseAPI {
  [key: string]: any;
}

export const SDK_TOKEN = new InjectionToken<BaseAPI>('lbd.loopback-sdk');
