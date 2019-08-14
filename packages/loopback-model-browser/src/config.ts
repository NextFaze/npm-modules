import { InjectionToken } from '@angular/core';
import { BaseAPI } from '@nextfaze/loopback-datatable';

export interface LoopbackModelBrowserConfig {
  routerRoot?: string;
  hidden?: Array<RegExp>;
  modelGroups?: Array<{ title: string; icon?: string; match: RegExp }>;
  groupOther?: { title: string; icon?: string };
}

export const MODEL_BROWSER_CONFIG = new InjectionToken<
  LoopbackModelBrowserConfig
>('lbmb.config');

export const MODEL_BROWSER_SDK_TOKEN = new InjectionToken<BaseAPI>(
  'lbmb.loopback-sdk'
);
