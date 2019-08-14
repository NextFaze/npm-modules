# Loopback Datatable

Easy Material datatable for a Loopback model.

At the moment - you need to provide your loopback SDK to the module:

## Setup

import { SDK_TOKEN } from '@nextfaze/loopback-datatable';
import \* as SDK from '@project/your-loopback-angular-sdk';

```typescript
export function sdkFactory() {
  return SDK;
}

@NgModule({
  imports: [LoopbackDatatableModule],
  providers: [
    {
      provide: SDK_TOKEN,
      useFactory: sdkFactory
    }
  ]
})
export class MyAdminModule {}
```

## Registering Cell Renderers

Register custom cell renderers.

```typescript
class Something {
  constructor(public config: ColumnRendererConfig) {
    // MyDateComponent must be registered in `entryComponents`
    this.config.registerCellRenderer('Date', MyDateComponent);

    // You can also reigster custom cell renderers for column names
    this.config.registerCellRenderer('ownerId', MyCustomAsyncRelationRenderer);

    // Or arrays of values to use a component for to do many at once
    this.config.registerCellRenderer(
      ['object', 'any', 'Object', 'metadata', 'payload'],
      MyJsonComponent
    );
  }
}
```

Then add in the datatable component with a model that extends `BaseLoopbackAPI`:

```html
<loopback-datatable [model]="organisationApi" [paginator]="paginator"></loopback-datatable>
<mat-paginator #paginator [pageSizeOptions]="[25, 50, 100]">
</mat-paginator>
```

### Built-In Renderers

#### String

Just renders the value of the column after calling `.toString()` on it. Applies to boolean, and number types as well

#### Date

Same as string but uses the Angular Date pipe

#### JSON

Renders a button which, when clicked, will render the data using the default angular `| json` pipe.

This is the default if no other renderers for a data type are found.

#### BelongsTo

Renders the foreign key, with a button to asynchronously fetch the related data and render it as json.

---

## Reference

### Components

#### DataTable (`<loopback-datatable> | <loopback-data-table>`)

The primary component provided by the library. Plugin a loopback model that extends `BaseLoopbackAPI` into the `model` input and it 'just works'.

The default behaviour is to render all column and values as the `toString()` value of each property on the model.

`@Input() model` - The loopback api model

`@Input() paginator` - Reference to a `MatPaginator` component to enable pagination

### Services

#### ColumnRendererConfig

Allows registering arbitrary components as the renderer for a given property type (e.g. 'string').

### Directives

#### Cell Renderer (`[cellRenderer]`)

Place on a component inside a `<loopback-datatable>` to tell the table how to render cells for that column. Input the column
name string and output the row to get the actual row being rendered.

Example:

```html
  <loopback-data-table [model]="orgInternal" [paginator]="paginator">
    <!-- Custom renderer for the 'ownerId' column  -->
    <strong *cellRenderer="'ownerId'; let row;">
      {{row.ownerId.toUpperCase()}}
    </strong>
    <!-- Other columns are automatically rendered as default  -->
  </loopback-data-table>
```

#### Cell Placeholder (`[cellPlaceholder]`)

Used internally by the data table to create empty cells that are later filled with actual component data. This is a temporary workaround
until Angular Material 5.1.0 is released and column/cell defs can be dynamically registered in code.

#### Loopback Datatable (`[loopbackDatatable]`)

Maps a Loopback API model to a mat datatable datasource - handles data fetching and pagination.

When Angular Material 5.1.0 is released this will hopefully be all that is needed (no need for `loopback-datatable` wrapper component).
