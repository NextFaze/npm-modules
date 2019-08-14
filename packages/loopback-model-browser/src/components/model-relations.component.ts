import { Component, Inject, Input } from '@angular/core';
import { ModelApiService } from '@nextfaze/loopback-datatable';

import { LoopbackModelBrowserConfig, MODEL_BROWSER_CONFIG } from '../config';

@Component({
  selector: 'lbmb-model-relations',
  templateUrl: './model-relations.component.html',
  styleUrls: ['./model-relations.component.scss'],
})
export class ModelRelationsComponent {
  relations;
  _modelDefinition;
  _modelInstance;

  @Input()
  set modelDefinition(value: any) {
    this._modelDefinition = value;
    this.rebuildRelations();
  }
  get modelDefinition() {
    return this._modelDefinition;
  }

  @Input()
  set modelInstance(value: any) {
    this._modelInstance = value;
    this.rebuildRelations();
  }
  get modelInstance() {
    return this._modelInstance;
  }

  opened: { [key: string]: boolean } = {};

  rebuildRelations() {
    if (!this.modelDefinition || !this.modelInstance) {
      return;
    }
    const relations = this.modelDefinition.relations;
    this.relations = Object.keys(relations).map(name => ({
      ...relations[name],
      modelApi: this.modelApiForRelation(relations[name]),
    }));
  }

  modelApiForRelation(relation: any): any {
    try {
      return {
        model: this.modelApi.getModelApi(relation.model).model,
        find: this.modelApi.relationFinder(
          this.modelDefinition,
          this.modelInstance,
          relation.name
        ),
        count: this.modelApi.relationCounter(
          this.modelDefinition,
          this.modelInstance,
          relation.name
        ),
      };
    } catch (ex) {
      // console.warn(ex);
      return;
    }
  }

  relationQuery(relation: any) {
    return {
      // hasMany
      where: {
        [relation.keyTo]: this.modelInstance[this.modelDefinition.idName],
      },
    };
  }

  trackByName(index, item) {
    return item.name;
  }

  constructor(
    private modelApi: ModelApiService,
    @Inject(MODEL_BROWSER_CONFIG) public config: LoopbackModelBrowserConfig
  ) {}
}
