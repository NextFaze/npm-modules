import { ContentChild, Directive, Host, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { map } from 'rxjs/operators';

import { AbstractModelApi, LoopbackDatasource } from '../loopback-datasource';

@Directive({
  selector: '[loopbackDatatable]',
})
export class LoopbackDatatableDirective {
  @Input('loopbackDatatable') api: AbstractModelApi; // a Loopback Model API
  @Input() paginator: MatPaginator;
  _query: any;
  @Input()
  set query(query: any) {
    this._query = query;
    this.updateQuery();
    this.updatePageCount();
  }
  @ContentChild(MatTable, { static: true }) table: any;
  @ContentChild(MatSort, { static: true }) sort: MatSort;

  constructor(@Host() public host: MatTable<any>) {}

  ngOnInit() {
    this.table.dataSource = new LoopbackDatasource(
      this.api,
      this.paginator,
      this.sort
    );
    this.updateQuery();
    this.updatePageCount();
  }

  async updatePageCount() {
    if (this.paginator) {
      this.paginator.length = await this.api
        .count(this._query ? this._query.where : {})
        .pipe(map(res => res.count))
        .toPromise();
    }
  }

  updateQuery() {
    if (this.table && this.table.dataSource) {
      this.table.dataSource.query = this._query;
    }
  }
}
