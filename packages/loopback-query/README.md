# Loopback Query

Framework that constructs a user interface for generating server queries.

## Setup

```typescript
import { LoopbackQueryModule } from '@nextfaze/loopback-query';

@NgModule({
    imports: [ LoopbackQueryModule ]
})
```

## Usage

### Example

_Component Class_ (`./my-component.component.ts`)

```typescript
import { Component } from '@angular/core';
import { ModelFromSDK } from '@my-custom/sdk';

@Component({
    selector: 'my-component'
    templateUrl: './my-component.component.html'
})
export class MyComponent {
    dataModel = {
        accountType: {
            types: ['REGEX', 'ILIKE'],
        },
    };
    query: any;

    constructor(public model: ModelFromSDK) {}

    onSubmit(value: any) {
        this.query = value;
    }
}
```

_Component Template_ (`./my-input.component.html`)

```html
<ng-template
  [lbQuery]="dataModel"
  [lbQuerySelector]="selector"
  [lbQueryInput]="input"
  (lbQueryOutput)="update($event)"
>
  <!-- A method of submitting the query form such as a buttom -->
  <button>Submit</button>
</ng-template>

<!-- The input template for your field -->
<ng-template #input let-formControl="formControl" let-name="name">
  <input [formControl]="formControl" [placeholder]="name" />
</ng-template>

<!-- The query type selector template -->
<ng-template #selector let-types="types" let-formControl="formControl">
  <select [formControl]="formControl">
    <option *ngFor="let type of types" [value]="type">{{ type }}</option>
  </select>
</ng-template>
```

## Reference

### Components

#### WrapperComponent

Internal library wrapper component to handle the form and generate the inputs.

### Directives

#### QueryDirective (`lbQuery`)

**@Input() lbQuery**

The data model to give to the query.

**@Input() lbQuerySelector**

A `TemplateRef` of the selector to be created for each field.

**@Input() lbQueryInput**

A `TemplateRef` of the field input to be created.

**@Output() lbQueryOutput**

The querialized output event that is emitted upon submission.

### Services

#### Querializer (`QuerializerService`)

Responsible for changing the form value into a query upon submission.

### Config

#### QUERY_FN

Provide your own query type functions to the querializer to reduce the value into the query.

For example:

```typescript
import { QueryFn } from '@nextfaze/loopback-query';

const MY_QUERY_FN: QueryFn = {
  EQUALS: (query, name, value) => Object.assign(query, { [name]: value }),
  SIMILAR_TO: (query, name, value) =>
    Object.assign(query, { [name]: { similarTo: value } }),
};
```
