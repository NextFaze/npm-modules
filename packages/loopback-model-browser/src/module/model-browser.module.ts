import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  LoopbackDatatableModule,
  SDK_TOKEN,
} from '@nextfaze/loopback-datatable';
import {
  HOST_RENDERERS,
  LoopbackModelFormModule,
} from '@nextfaze/loopback-model-form';
import { LoopbackQueryModule } from '@nextfaze/loopback-query';

import {
  BrowserComponent,
  CreateModelComponent,
  ModelComponent,
  ModelDefinitionComponent,
  ModelRelationsComponent,
  ModelsComponent,
  ToolbarComponent,
} from '../components';
import { ViewModelComponent } from '../components/view-model.component';
import { MODEL_BROWSER_CONFIG, MODEL_BROWSER_SDK_TOKEN } from '../config';
import { AlphaSortPipe, RootPipe } from '../pipes';
import { RENDERERS } from '../renderers';
import { MaterialModule } from './material.module';

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    MaterialModule,
    LoopbackDatatableModule,
    LoopbackModelFormModule,
    LoopbackQueryModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HOST_RENDERERS, useValue: RENDERERS },
    { provide: SDK_TOKEN, useExisting: MODEL_BROWSER_SDK_TOKEN },
    {
      provide: MODEL_BROWSER_CONFIG,
      useValue: {
        routerRoot: 'system',
        modelGroups: [],
      },
    },
  ],
  declarations: [
    ModelsComponent,
    ModelComponent,
    BrowserComponent,
    ToolbarComponent,
    ModelDefinitionComponent,
    ModelRelationsComponent,
    CreateModelComponent,
    ViewModelComponent,
    RootPipe,
    AlphaSortPipe,
    ...RENDERERS,
  ],
  entryComponents: RENDERERS,
})
export class LoopbackModelBrowserModule {}
