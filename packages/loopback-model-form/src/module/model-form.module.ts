import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';

import { InputComponent } from '../components';
import { RENDERERS } from '../renderers';
import { ModelFormService, SerialiserService } from '../services';
import { ControlRendererConfig } from '../services/control-renderer-config.service';

@NgModule({
  imports: [ReactiveFormsModule, FormsModule, CommonModule, MatInputModule],
  declarations: [InputComponent, InputComponent, ...RENDERERS],
  entryComponents: RENDERERS,
  providers: [SerialiserService, ControlRendererConfig, ModelFormService],
  exports: [InputComponent],
})
export class LoopbackModelFormModule {}
