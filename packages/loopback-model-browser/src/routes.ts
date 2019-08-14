import { Route } from '@angular/router';

import {
  BrowserComponent,
  CreateModelComponent,
  ModelComponent,
  ModelsComponent,
} from './components';

export const children: Route[] = [
  {
    path: '',
    component: BrowserComponent,
  },
  {
    path: ':modelName',
    component: ModelsComponent,
  },
  {
    path: ':modelName/__new',
    component: CreateModelComponent,
  },
  {
    path: ':modelName/:modelId',
    component: ModelComponent,
  },
];
