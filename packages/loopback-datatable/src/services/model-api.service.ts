import { Inject, Injectable, InjectionToken, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SDK_TOKEN } from '../config';

@Injectable()
export class ModelApiService {
  public readonly models: any;
  constructor(
    @Inject(SDK_TOKEN) private lbSDK: any,
    private injector: Injector
  ) {
    this.models = new this.lbSDK.SDKModels().models;
  }

  get modelNames(): string[] {
    return Object.keys(this.models);
  }

  getModelDefinition(modelName: string) {
    return this.models[modelName].getModelDefinition();
  }

  getModelRelations(modelName: string) {
    return this.getModelDefinition(modelName).relations;
  }

  getModelApi(modelName: string) {
    if (!modelName) {
      throw new Error(`Model name is required`);
    }
    try {
      return this.injector.get(this.lbSDK[modelName + 'Api']);
    } catch (ex) {
      throw new Error(`Failed to get ${modelName} API from the injector`);
    }
  }

  relationNameFromForeignKey(modelDef: any, fk: string) {
    const relations = modelDef.relations;
    const relationNames = Object.keys(relations);
    const relationName = relationNames.find(
      (name: string) => relations[name].keyFrom === fk
    );
    return relationName;
  }

  fetchBelongsToData(modelDef: any, instance: any, relationName: string) {
    const relation = modelDef.relations[relationName];
    const relationGetter = `${relationName[0].toUpperCase()}${relationName.slice(
      1
    )}`;

    const getterFn = `get${relationGetter}`;
    const modelApi = this.getModelApi(modelDef.name);
    const refresh = true;
    if (modelApi && modelApi[getterFn]) {
      // Try to fetch using normal relation getter i.e. /{models}/{id}/{related}
      return modelApi[getterFn](instance[modelDef.idName], refresh);
    } else if (relation.model) {
      // Fetch off the base model instead using findById i.e. /{related}/{fk}
      const sourceModel = this.getModelApi(relation.model);
      return sourceModel.findById(instance[relation.keyFrom]);
    } else {
      // Some weird relation that doesn't have a model
      return of([]);
    }
  }

  relationGetter(modelDef: any, relation: any) {
    return `${relation.name[0].toUpperCase()}${relation.name.slice(1)}`;
  }

  relationGetterFn(modelDef, instance, relation, operation) {
    const modelApi = this.getModelApi(modelDef.name);
    const relationGetter = this.relationGetter(modelDef, relation);
    const getterFn = `${operation}${relationGetter}`;
    // Try to fetch using normal relation getter i.e. /{models}/{id}/{related}
    if (!modelApi[getterFn]) {
      return;
    }
    switch (relation.relationType) {
      case 'hasOne':
      case 'belongsTo':
        return () => modelApi[getterFn](instance[modelDef.idName]);
    }
    return modelApi[getterFn].bind(modelApi, instance[modelDef.idName]);
  }

  relationGetterFnFromSourceModel(modelDef, instance, relation, operation) {
    // Fetch off the base model instead using findById i.e. /{related}/{fk}
    const sourceModel = this.getModelApi(relation.model);
    switch (relation.relationType) {
      case 'belongsTo':
      case 'hasOne':
        return operation === 'count'
          ? () => of({ count: 1 })
          : sourceModel.findById.bind(sourceModel, instance[relation.keyFrom]);
      case 'hasMany':
        return (query = {}, ...args) =>
          sourceModel[operation](
            {
              ...query,
              [relation.keyTo]: instance[modelDef.idName],
            },
            ...args
          );
      default:
        return operation === 'count' ? () => of({ count: 0 }) : () => of([]);
    }
  }

  relationFinder(
    modelDef: any,
    instance: any,
    relationName: string
  ): () => Observable<any> {
    const relation = modelDef.relations[relationName];
    const getterFn = this.relationGetterFn(modelDef, instance, relation, 'get');

    if (getterFn) {
      return getterFn;
    } else if (relation.model) {
      return this.relationGetterFnFromSourceModel(
        modelDef,
        instance,
        relation,
        'find'
      );
    } else {
      // Some weird relation that doesn't have a model
      return () => of([]);
    }
  }

  relationCounter(modelDef: any, instance: any, relationName: string) {
    const relation = modelDef.relations[relationName];
    const getterFn = this.relationGetterFn(
      modelDef,
      instance,
      relation,
      'count'
    );
    if (getterFn) {
      return getterFn;
    } else if (relation.model) {
      return this.relationGetterFnFromSourceModel(
        modelDef,
        instance,
        relation,
        'count'
      );
    }

    return () => of({ count: 0 });
  }
}
