import { Component } from '@angular/core';
import { ColumnConfig } from '@nextfaze/loopback-datatable';

@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.css'],
})
export class ChildComponentComponent {
  columnsToDisplay = ['accountType', 'ownerId'];
  columnConfig: Map<string, ColumnConfig> = new Map([
    [
      'accountType',
      {
        key: 'accountType',
        type: 'string',
        title: 'My Account Type (Unsortable)',
        sortable: false,
      },
    ],
    [
      'id',
      {
        key: 'id',
        type: 'string',
        title: 'Identifier (Sortable)',
        sortable: true,
      },
    ],
  ]);
  query: any = null;
  constructor(public orgInternal: OrganisationInternalApi) {}
}
