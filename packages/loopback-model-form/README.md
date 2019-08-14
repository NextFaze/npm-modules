# Loopback Model Form

Generate a form from a loopback model definition.

## Setup

```typescript
import { LoopbackModelFormModule } from '@nextfaze/loopback-model-form';

@NgModule({
    imports: [ LoopbackModelFormModule ]
})
```

## Usage

### Example

_Component Class_ (`./my-input.component.ts`)

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'my-input'
    templateUrl: './my-input.component.html'
})
export class MyCustomFormComponent {
    form: FormGroup;
    username = {
        type: 'string',
        name: 'username'
    };

    constructor(public fb: FormBuilder) {
        this.form = this.fb.group({
            username: new FormControl()
        });
    }
}
```

_Component Template_ (`./my-input.component.html`)

```html
<form [formGroup]="form">
    <loopback-input [properties]="username" [formControlName]="username"></loopback-input>
</form>
```

### Form Example

The full loopback model can be used too.

_Component Class_ (`./my-form.component.ts`)

```typescript
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModelDefinition } from '@nextfaze/loopback-model-form';

@Component({
    selector: 'my-form'
    templateUrl: './my-form.component.html'
})
export class MyCustomFormComponent {
    form: FormGroup;
    modelDefinition: ModelDefinition = {
        name: 'CustomModel',
        properties: {
            color: {
                name: 'color',
                type: 'string',
                default: 'red'
            },
            age: {
                name: 'age',
                type: 'number',
                default: 20
            },
        }
    };

    constructor(public service: ModelFormService) {
        this.form = this.service.createFormForModel(this.modelDefinition);
    }

    get propertyNames() {
        // ['color', 'age']
        return Object.keys(this.modelDefinition.properties);
    }
}
```

_Component Template_ (`./my-form.component.html`)

```html
<form [formGroup]="form">
    <loopback-input
        *ngFor="let name of propertyNames"
        [properties]="modelDefinition.properties[name]"
        [formControlName]="modelDefinition.properties[name].name">
    </loopback-input>
</form>
```

## Renderers

For certain fields or types you may wish to use a custom form control renderer.

### Build-In Renderers

#### String

Renders the value in an `<input type="text" />`

### JSON

Renders the value in a `<textarea>`

### Boolean

Renders a `<input type="checkbox" />`

### Custom Renderers

Custom renderers can be provided into your `NgModule` to override the default ones.
All custom renderers implement `ControlValueAccessor` under the hood, and are used as wrapped inputs in the form.

Custom renderers should extend `ControlRendererComponent` from this package, as the `properties` object and a formatted `title` are passed into the component.

#### Example

In this example, a custom renderer is created for the `id` field of a model.

_Component Class_ (`./id-renderer.component.ts`)

```typescript
import { Component } from '@angular/core';
import { ControlRendererComponent } from '@nextfaze/loopback-model-form';

@Component({
  selector: 'id-renderer',
  template: `
    <!-- This title value is the nicely formatted version of the property.name -->
    <label>{{ title }}</label>

    <input [(ngModel)]="value" [disabled]="disabled" (ngModelChange)="onChange(value)"/>
    `,
})
export class CustomIDRenderer extends ControlRendererComponent {
  // Will use this renderer for any `id` or `Id` fields
  static DEFAULT_TYPES = ['id', 'Id'];
  value: string;
  disabled: boolean;

  // Properties inherited from ControlValueAccessor
  writeValue(value: string) {
    this.value = value;
  }
  onChange = (_: any) => {};
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched() {}
  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
}
```

Now this custom renderer needs to be registered in the module so it can be used. Make sure you add custom renderers to the `entryComponents` and `declarations`.

_Module Class_ (`./app.module.ts`)

```typescript
import { LoopbackModelFormModule } from '@nextfaze/loopback-model-form';

import { CustomIDRenderer } from './id-renderer.component';

const MY_CUSTOM_RENDERERS = [
    CustomIDRenderer,
];

@NgModule({
    imports: [ LoopbackModelFormModule ],
    entryComponents: MY_CUSTOM_RENDERERS,
    declarations: MY_CUSTOM_RENDERERS,
    providers: [
        { provide: HOST_RENDERERS, useValue: MY_CUSTOM_RENDERERS },
    ]
})
```

---

## Reference

### Components

#### Input (`<loopback-input>`)

The primary component provdied by the library. Renders a form input based on a provided model definition.

#### Renderer (`ControlRendererComponent`)

Extend this class to create custom renderers. This abstract component implements angulars `ControlValueAccessor`, so that the extended component can be used as a form control.

### Services

#### Serialiser (`SerialiserService`)

Serialises an object to a loopback model definition.
Provide your own `SerialiserService` to transform non-loopback models to a valid model definition that can be used in the form.

For example:

```typescript
import { Injectable } from '@angular/core';
import { ModelDefinition } from '@nextfaze/loopback-model-form';

@Injectable()
export class MySerialiserService {
    serialise(myWeirdModel: any): ModelDefinition {
        // Create a model definition from your model
        const modelDefinition: ModelDefinition = {
            name: myWeirdModel.modelName(),
            properties: myWeirdModel.stuff.properties
        };
        return modelDefinition;
    }
}
```

don't forget to provide your service in place of the default `SerialiserService`

```typescript
import { SerialiserService } from '@nextfaze/loopback-model-form';

@NgModule({
    providers: [
        { provide: SerialiserService, useValue: MySerialiserService },
    ]
    // ... other imports, declarations, etc
```