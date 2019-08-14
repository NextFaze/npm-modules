import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelApiService } from '@nextfaze/loopback-datatable';
import { Observable } from 'rxjs';

import { LoopbackModelBrowserConfig, MODEL_BROWSER_CONFIG } from '../config';

@Component({
  selector: 'lbmb-model',
  templateUrl: './model.component.html',
})
export class ModelComponent implements OnInit {
  modelApi: any;
  modelDefinition: any;
  modelInstance$: Observable<any>;
  modelName: string;
  modelId: string;

  loading: boolean;
  error: any;

  relationsOpened: Object = {};
  sub;

  constructor(
    public apiService: ModelApiService,
    public location: Location,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(MODEL_BROWSER_CONFIG) public config: LoopbackModelBrowserConfig
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(({ modelName, modelId }) => {
      this.modelId = modelId;
      this.modelName = modelName;
      this.modelApi = this.apiService.getModelApi(modelName);
      this.modelInstance$ = this.modelApi.findById(modelId);
      this.modelDefinition = this.apiService.getModelDefinition(modelName);
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  toggleRelation({ key, open }: any) {
    this.relationsOpened[key] = open;
  }

  runApiMethod(method, success, ...args) {
    this.error = '';
    this.loading = true;
    method(...args).subscribe(
      success.bind(this),
      err => {
        this.error = err.message || err;
        this.snackBar.open(this.error, 'DISMISS', { duration: 10000 });
      },
      () => {
        this.loading = false;
      }
    );
  }

  patchAttributes(id: string, value: any) {
    this.runApiMethod(
      this.modelApi.patchAttributes.bind(this.modelApi),
      () => {
        this.snackBar.open('Updated', null, { duration: 2000 });
      },
      id,
      value
    );
  }

  deleteById(id: string) {
    this.runApiMethod(
      this.modelApi.deleteById.bind(this.modelApi),
      () => {
        this.snackBar.open('Deleted', null, { duration: 2000 });
        this.router.navigate(['/', this.config.routerRoot, this.modelName]);
      },
      id
    );
  }

  filterChanged(current: any = {}, updated: any = {}) {
    if (
      updated.skip === current.skip &&
      updated.order === current.order &&
      updated.limit === current.limit
    ) {
      return true;
    } else {
      return false;
    }
  }
}
