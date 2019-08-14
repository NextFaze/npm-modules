import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatOptionModule,
  MatPaginatorModule,
  MatRadioModule,
  MatSelectModule,
} from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CssUrlPipesModule } from '@nextfaze/css-url-pipes';
import {
  LoopbackDatatableModule,
  ModelApiService,
  SDK_TOKEN,
} from '@nextfaze/loopback-datatable';
import {
  LoopbackModelBrowserConfig,
  LoopbackModelBrowserModule,
  MODEL_BROWSER_CONFIG,
} from '@nextfaze/loopback-model-browser';
import {
  LoopbackModelFormModule,
  MODEL_FORMS,
} from '@nextfaze/loopback-model-form';
import { LoopbackQueryModule } from '@nextfaze/loopback-query';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing-module';
import { ApplicationService } from './app.service';
import { ChildComponentComponent } from './child-component/child-component.component';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';
import { QueryComponent } from './query/query.component';
import { UrlPipesDemoComponent } from './url-pipes-demo/url-pipes-demo.component';

export const CONFIG: LoopbackModelBrowserConfig = {
  routerRoot: 'system',
  hidden: [/Credentials/, /.*Request/, /.*Response/, /.*Module/],
  groupOther: { title: 'My Ungrouped Models', icon: 'folder' },
  modelGroups: [
    { title: 'Request Models', icon: 'call_made', match: /.*Request$/ },
    { title: 'Organisation', icon: 'group', match: /.*Organisation.*/ },
  ],
};

export function sdkFactory() {
  return {};
}

@NgModule({
  declarations: [
    AppComponent,
    ChildComponentComponent,
    HomeComponent,
    QueryComponent,
    FormComponent,
    UrlPipesDemoComponent,
  ],
  imports: [
    CssUrlPipesModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    RouterModule.forRoot([]),
    SDKBrowserModule.forRoot(),
    AppRoutingModule,
    LoopbackModelBrowserModule,
    HttpClientModule,
    LoopbackModelFormModule,
    LoopbackDatatableModule,
    LoopbackQueryModule,
    MatCardModule,
    NoopAnimationsModule,
    MatDialogModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatOptionModule,
  ],
  providers: [
    ApplicationService,
    ModelApiService,
    {
      provide: MODEL_BROWSER_CONFIG,
      useValue: CONFIG,
    },
    {
      provide: SDK_TOKEN,
      useFactory: sdkFactory,
    },
    {
      provide: MODEL_FORMS,
      useFactory: () => {
        const modelForms = new Map();
        const form = new FormGroup({
          hello: new FormControl(),
          notes: new FormControl({ disabled: true, value: '' }),
        });
        const defaults = {
          hello: 'Hi there',
          notes: 'Check out ./app.module.ts file for this custom provided form',
        };
        modelForms.set('ModelWithCustomForm', { form, defaults });
        return modelForms;
      },
    },
    {
      provide: 'str',
      useValue: 'NextFaze Module Showcase',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
