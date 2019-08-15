import { DataSource } from '@angular/cdk/table';
import { MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject ,  Observable ,  merge } from 'rxjs';
import { map ,  switchMap } from 'rxjs/operators';

export interface AbstractModelApi {
  model: {
    getModelDefinition: () => any;
  };
  count: (where: any) => Observable<{ count: number }>;
  find: (filter: any) => Observable<any | any[]>;
  // Override how pagination query gets constructed.
  buildPaginationQuery?: (
    paginationData: {
      limit: number;
      page: number;
      skip: number;
      sort: string;
      direction: string;
    },
  ) => any;
  [key: string]: any;
}

export class LoopbackDatasource implements DataSource<any> {
  private _page = 0;
  private _pageSize = 25;
  public get page() {
    return this._page;
  }
  public get pageSize() {
    return this._pageSize;
  }

  private queryChanges = new BehaviorSubject({});
  private _query: any = {};
  set query(value: any) {
    this._query = value;
    this.queryChanges.next(value);
  }
  get query() {
    return this._query;
  }

  constructor(
    private api: AbstractModelApi, // a Loopback Model API
    private paginator?: MatPaginator,
    private sort?: MatSort,
  ) {}

  connect(): any {
    return merge(...this.constructObservables().filter(Boolean)).pipe(
      switchMap(() => {
        if (this.paginator) {
          this._page = this.paginator.pageIndex || 0;
          this._pageSize = this.paginator.pageSize;
        }

        const query: any = this.api.buildPaginationQuery
          ? this.api.buildPaginationQuery({
              limit: this._pageSize,
              page: this._page,
              skip: this._page * this._pageSize,
              sort: this.sort && this.sort.active,
              direction: this.sort && this.sort.direction,
            })
          : {
              // Default to loopback style pagination query
              limit: this._pageSize,
              skip: this._page * this._pageSize,
              order:
                this.sort && this.sort.active && this.sort.direction
                  ? `${this.sort.active} ${this.sort.direction}`
                  : undefined,
            };
        return this.api
          .find({ ...query, ...this.query })
          .pipe(map(result => (Array.isArray(result) ? result : [result])));
      }),
    );
  }

  constructObservables() {
    const obs: any[] = [this.queryChanges];
    if (this.paginator) {
      obs.push(this.paginator.page);
    }
    if (this.sort) {
      obs.push(this.sort.sortChange);
    }
    return obs;
  }

  disconnect() {}
}
