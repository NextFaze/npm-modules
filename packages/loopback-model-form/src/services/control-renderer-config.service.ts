import {
  Inject,
  Injectable,
  InjectionToken,
  Optional,
  Type,
} from '@angular/core';

import { RENDERERS } from '../renderers';
import { ControlRendererComponent, Renderers } from '../types';

export const HOST_RENDERERS = new InjectionToken<Renderers>('lbmf.renderer');

@Injectable()
export class ControlRendererConfig {
  private controlRenderers: Map<
    string,
    Type<ControlRendererComponent>
  > = new Map();

  constructor(
    @Optional()
    @Inject(HOST_RENDERERS)
    public hostRenderers: Renderers
  ) {
    this.registerRenderers(RENDERERS);
    if (this.hostRenderers) {
      this.registerRenderers(this.hostRenderers);
    }
  }

  registerRenderers(renderers: Renderers) {
    renderers.forEach((renderer: any) => {
      this.registerControlRenderer(renderer.DEFAULT_TYPES, renderer);
    });
  }

  registerControlRenderer(type: string | string[], component: any) {
    if (Array.isArray(type)) {
      type.forEach(typeValue =>
        this.controlRenderers.set(typeValue, component)
      );
    } else {
      this.controlRenderers.set(type, component);
    }
  }

  getControlRenderer(type: string) {
    return this.controlRenderers.get(type);
  }
}
