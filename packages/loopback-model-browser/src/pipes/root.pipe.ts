import { Inject, Pipe, PipeTransform } from '@angular/core';

import { LoopbackModelBrowserConfig, MODEL_BROWSER_CONFIG } from '../config';

/**
 * If the consumer decides to provide routerRoot that has characters
 * that Angular would strip out (e.g. '/', '.', etc), the routerLink value
 * can be passed through this pipe to get a routerLink array relative
 * to the routerRoot.
 */
@Pipe({ name: 'root', pure: true })
export class RootPipe implements PipeTransform {
  constructor(
    @Inject(MODEL_BROWSER_CONFIG) public config: LoopbackModelBrowserConfig
  ) {}

  transform(routes: string[] = []) {
    return ['/', ...this.config.routerRoot.split('/'), ...routes];
  }
}
