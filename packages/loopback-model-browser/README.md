# Loopback Model Browser

Easy admin model browsing for a loopback application
Method 1): Providing at module level

## Setup

### Import Into Your App Module

```typescript
import {
  LoopbackModelBrowserModule,
  LoopbackModelBrowserConfig,
  MODEL_BROWSER_SDK_TOKEN
} from '@nextfaze/loopback-model-browser';
import { SDK_TOKEN, ModelApiService } from '@nextfaze/loopback-datatable';

import * as SDK from '@my-loopback/sdk';

export function sdkFactory() {
  return SDK;
}

@NgModule({
  imports: [MyAppRoutingModule, LoopbackModelBrowserModule],
  providers: [
    ModelApiService
    {
      provide: MODEL_BROWSER_SDK_TOKEN,
      useFactory: sdkFactory,
    },
    {
      provide: SDK_TOKEN,
      useExisting: MODEL_BROWSER_SDK_TOKEN,
    },
  ],
})
export class MyApp {}
```

### Attach Routes

```typescript
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { children } from '@nextfaze/loopback-model-browser';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'system',
        children: children,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class MyAppRoutingModule {}
```

## Config

You can override the default config to set your own routes and model settings.

```typescript
import {LoopbackModelBrowserConfig, MODEL_BROWSER_CONFIG} from '@nextfaze/loopback-model-browser';

const MY_CUSTOM_CONFIG: LoopbackModelBrowserConfig = {
  routerRoot: 'system',
  hidden: [/AccessToken/, /.*Request$/],
  modelGroups: [
    { title: 'User', icon: 'person', match: /.*User.*/ },
    { title: 'Organisation', icon: 'group', match: /.*Organisation.*/ },
  ],
  groupOther: { title: 'Miscellaneous Models', icon: 'folder' },
};

@NgModule({
  // ... imports, declarations, etc
  providers: [
    {
      provide: MODEL_BROWSER_CONFIG,
      useValue: MY_CUSTOM_CONFIG,
    },
```

Method 2): Providing at component level - useful when need multiple model-browser components

### Create a app module

```typescript
import { ModelBrowserComponent } from './components/model-browser';
import { NgModule } from '@angular/core';
import { LoopbackDatatableModule } from '@nextfaze/loopback-datatable';
import { LoopbackModelBrowserModule } from '@nextfaze/loopback-model-browser';
import { ModelBrowserRoutingModule } from '../model-browser/model-browser.routing-module';

@NgModule({
  imports: [
    LoopbackDatatableModule,
    LoopbackModelBrowserModule,
    ModelBrowserRoutingModule,
  ],
  exports: [LoopbackDatatableModule],
})
export class ModelBrowserModule {}
```

### Create a container component

```typescript
import { Component } from '@angular/core';
import * as SDK from '@rtd-loopback/sdk';

import {
  MODEL_BROWSER_SDK_TOKEN,
  MODEL_BROWSER_CONFIG,
  LoopbackModelBrowserConfig,
} from '@nextfaze/loopback-model-browser';
import { SDK_TOKEN, ModelApiService } from '@nextfaze/loopback-datatable';

@Component({
  selector: 'nf-model-browser',
  template: '<router-outlet></router-outlet>',
  providers: [
    ModelApiService,
    {
      provide: MODEL_BROWSER_SDK_TOKEN,
      useFactory: sdkFactory,
    },
    {
      provide: SDK_TOKEN,
      useExisting: MODEL_BROWSER_SDK_TOKEN,
    },
  ],
})
export class ModelBrowserComponent {}
```

NOTE: Container component for each new model-browser component

### Declare component into ngModule of earlier created module

```typescript
  declarations: [ModelBrowserComponent],
```

### Attach Routes

```typescript
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { children } from '@nextfaze/loopback-model-browser';
import { AuthModule, AuthGuard } from '@rtd-angular/auth';
import { ModelBrowserComponent } from './components/model-browser';

@NgModule({
  imports: [
    AuthModule,
    RouterModule.forChild([
      {
        path: 'model-browser',
        canActivate: [AuthGuard],
        component: ModelBrowserComponent,
        children: children,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ModelBrowserRoutingModule {}
```

Declare different routes with associated container components
as in Here : ModelBrowserComponent for path 'model-browser'

## Config

You can override the default config to set your own routes and model settings.
Provide it along with other providers in component

```typescript
import {LoopbackModelBrowserConfig, MODEL_BROWSER_CONFIG} from '@nextfaze/loopback-model-browser';

const MY_CUSTOM_CONFIG: LoopbackModelBrowserConfig = {
  routerRoot: 'system',
  hidden: [/AccessToken/, /.*Request$/],
  modelGroups: [
    { title: 'User', icon: 'person', match: /.*User.*/ },
    { title: 'Organisation', icon: 'group', match: /.*Organisation.*/ },
  ],
  groupOther: { title: 'Miscellaneous Models', icon: 'folder' },
};


@Component({
  selector: 'nf-model-browser',
  template: '<router-outlet></router-outlet>',
  providers: [
    {
      provide: MODEL_BROWSER_CONFIG,
      useValue: MY_CUSTOM_CONFIG,
    },
  ],
})
```

### Properties

### modelAPiService **(REQUIRED)**

ModelApiService must be provided in component or module for the model-browser to work

#### routerRoot **(REQUIRED)**

Set the router root in which to attach the loopback model browser to. Make sure this is the same route that you attach in your routing module.

#### hidden

A regex array to hide matching models.

#### modelGroups

An array of groups to order the models by.

##### title

Title of the model group.

##### groupOther

The group that contains all models not already grouped in modelGroups.

##### Icon

A valid [material icon](https://material.io/icons/).

##### Match

A regex to match. Will include any models that pass the test, including models that are already in another group.
Models that are not included in any group will be placed into a generic `Models` group at the bottom.
