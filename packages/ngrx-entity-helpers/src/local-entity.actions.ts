import { EntityAction } from './entity-action';

/**
 * Action Creator class for Local Entities
 */
export class LocalEntityActions<T> {
  constructor(protected slice: string) {}

  public get LOAD_ALL() {
    return `[${this.slice}] load all`;
  }
  public get CLEAR_ALL() {
    return `[${this.slice}] clear all`;
  }

  public get ADD_ONE() {
    return `[${this.slice}] add one`;
  }
  public get UPSERT_ONE() {
    return `[${this.slice}] upsert one`;
  }
  public get UPDATE_ONE() {
    return `[${this.slice}] update one`;
  }
  public get DELETE_ONE() {
    return `[${this.slice}] delete one`;
  }

  public get ADD_MANY() {
    return `[${this.slice}] add many`;
  }
  public get UPSERT_MANY() {
    return `[${this.slice}] upsert`;
  }
  public get UPDATE_MANY() {
    return `[${this.slice}] update many`;
  }
  public get DELETE_MANY() {
    return `[${this.slice}] delete many`;
  }

  public loadAll(payload: T[]): EntityAction {
    return { type: this.LOAD_ALL, payload };
  }
  public clearAll(): EntityAction {
    return { type: this.CLEAR_ALL };
  }

  public addOne(payload: T) {
    return { type: this.ADD_ONE, payload };
  }
  public upsertOne(payload: T) {
    return { type: this.UPSERT_ONE, payload };
  }
  public updateOne(payload: T) {
    return { type: this.UPDATE_ONE, payload };
  }
  public deleteOne(payload: string) {
    return { type: this.DELETE_ONE, payload };
  }

  public addMany(payload: T[]) {
    return { type: this.ADD_MANY, payload };
  }
  public upsertMany(payload: T[]) {
    return { type: this.UPSERT_MANY, payload };
  }
  public updateMany(payload: T[]) {
    return { type: this.UPDATE_MANY, payload };
  }
  public deleteMany(payload: string[]) {
    return { type: this.DELETE_MANY, payload };
  }
}
