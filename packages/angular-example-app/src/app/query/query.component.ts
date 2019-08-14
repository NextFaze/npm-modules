import { Component } from '@angular/core';

@Component({
  templateUrl: './query.component.html',
})
export class QueryComponent {
  query: any;
  dataModel = {
    accountType: {
      types: ['REGEX', 'INCLUDES', 'NOT_INCLUDES'],
    },
    ownerId: {
      types: ['INCLUDES', 'REGEX', 'EQUAL', 'INCLUDES'],
    },
    id: {
      types: ['REGEX', 'EQUAL', 'NOT_EQUAL'],
    },
  };

  constructor(public orgInternal: OrganisationInternalApi) {}

  update(query: any) {
    this.query = query;
  }
}
