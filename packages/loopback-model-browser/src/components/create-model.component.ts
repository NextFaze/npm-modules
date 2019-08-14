import { map } from 'rxjs/operators';

import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelApiService } from '@nextfaze/loopback-datatable';
import { ModelFormService } from '@nextfaze/loopback-model-form';

import { LoopbackModelBrowserConfig, MODEL_BROWSER_CONFIG } from '../config';

@Component({
  selector: 'lbmb-create-model',
  templateUrl: './create-model.component.html',
  styleUrls: ['./create-model.component.scss'],
})
export class CreateModelComponent implements OnInit {
  modelDefinition$: any;
  error: string;
  form: FormGroup;

  constructor(
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private modelApi: ModelApiService,
    private modelForm: ModelFormService,
    private router: Router,
    @Inject(MODEL_BROWSER_CONFIG) public config: LoopbackModelBrowserConfig
  ) {}

  ngOnInit() {
    this.modelDefinition$ = this.route.params.pipe(
      map(({ modelName }: any) => {
        const modelDef = this.modelApi.getModelDefinition(modelName);
        this.form = this.modelForm.createFormForModel(modelDef);
        return modelDef;
      })
    );
  }

  create(modelName: any, data: any) {
    const api = this.modelApi.getModelApi(modelName);
    if (!api.create) {
      this.error = 'Model SDK does not implement create';
    }
    api.create(data).subscribe(
      () => {
        this.snackBar.open('Created', null, { duration: 2000 });
        this.router.navigate([this.config.routerRoot, modelName, data.id]);
      },
      err => {
        this.error = err.message || err || 'Request failed';
        this.snackBar.open(this.error, 'DISMISS', { duration: 10000 });
      }
    );
  }

  getProperties(properties: any) {
    return Object.keys(properties).map(property => properties[property]);
  }
}
