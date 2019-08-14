/**
 * Remote Entities have their source of truth on a server
 */
export class RemoteEntityActions<T> {
  constructor(protected slice: string) {}

  public get REQUEST_CREATE_ONE() {
    return `[${this.slice}][Request] create one`;
  }
  public get SUCCESS_CREATE_ONE() {
    return `[${this.slice}][Success] create one`;
  }
  public get FAIL_CREATE_ONE() {
    return `[${this.slice}][Fail] create one`;
  }
  public get REQUEST_CREATE_MANY() {
    return `[${this.slice}][Request] create many`;
  }
  public get SUCCESS_CREATE_MANY() {
    return `[${this.slice}][Success] create many`;
  }
  public get FAIL_CREATE_MANY() {
    return `[${this.slice}][Fail] create many`;
  }

  public get REQUEST_RETRIEVE_ONE() {
    return `[${this.slice}][Request] retrieve one`;
  }
  public get SUCCESS_RETRIEVE_ONE() {
    return `[${this.slice}][Success] retrieve one`;
  }
  public get FAIL_RETRIEVE_ONE() {
    return `[${this.slice}][Fail] retrieve one`;
  }
  public get REQUEST_RETRIEVE_ALL() {
    return `[${this.slice}][Request] retrieve all`;
  }
  public get SUCCESS_RETRIEVE_ALL() {
    return `[${this.slice}][Success] retrieve all`;
  }
  public get FAIL_RETRIEVE_ALL() {
    return `[${this.slice}][Fail] retrieve all`;
  }

  public get REQUEST_UPDATE_ONE() {
    return `[${this.slice}][Request] update one`;
  }
  public get SUCCESS_UPDATE_ONE() {
    return `[${this.slice}][Success] update one`;
  }
  public get FAIL_UPDATE_ONE() {
    return `[${this.slice}][Fail] update one`;
  }
  public get REQUEST_UPDATE_MANY() {
    return `[${this.slice}][Request] update many`;
  }
  public get SUCCESS_UPDATE_MANY() {
    return `[${this.slice}][Success] update many`;
  }
  public get FAIL_UPDATE_MANY() {
    return `[${this.slice}][Fail] update many`;
  }

  public get REQUEST_DELETE_ONE() {
    return `[${this.slice}][Request] delete one`;
  }
  public get SUCCESS_DELETE_ONE() {
    return `[${this.slice}][Success] delete one`;
  }
  public get FAIL_DELETE_ONE() {
    return `[${this.slice}][Fail] delete one`;
  }
  public get REQUEST_DELETE_MANY() {
    return `[${this.slice}][Request] delete many`;
  }
  public get SUCCESS_DELETE_MANY() {
    return `[${this.slice}][Success] delete many`;
  }
  public get FAIL_DELETE_MANY() {
    return `[${this.slice}][Fail] delete many`;
  }

  // Crud
  public requestCreateOne(payload: T) {
    return { type: this.REQUEST_CREATE_ONE, payload };
  }
  public successCreateOne(payload: T) {
    return { type: this.SUCCESS_CREATE_ONE, payload };
  }
  public failCreateOne(payload?: any) {
    return { type: this.FAIL_CREATE_ONE, payload };
  }
  public requestCreateMany(payload: T[]) {
    return { type: this.REQUEST_CREATE_MANY, payload };
  }
  public successCreateMany(payload: T[]) {
    return { type: this.SUCCESS_CREATE_MANY, payload };
  }
  public failCreateMany(payload?: any) {
    return { type: this.FAIL_CREATE_MANY, payload };
  }

  // cRud
  public requestRetrieveOne(id: string) {
    return { type: this.REQUEST_RETRIEVE_ONE, payload: id };
  }
  public successRetrieveOne(entity: T) {
    return { type: this.SUCCESS_RETRIEVE_ONE, payload: entity };
  }
  public failRetrieveOne(payload?: any) {
    return { type: this.FAIL_RETRIEVE_ONE, payload };
  }
  public requestRetrieveAll() {
    return { type: this.REQUEST_RETRIEVE_ALL };
  }
  public successRetrieveAll(entities: T[]) {
    return { type: this.SUCCESS_RETRIEVE_ALL, payload: entities };
  }
  public failRetrieveAll(payload?: any) {
    return { type: this.FAIL_RETRIEVE_ALL, payload };
  }

  // crUd
  public requestUpdateOne(payload: T) {
    return { type: this.REQUEST_UPDATE_ONE, payload };
  }
  public successUpdateOne(payload: T) {
    return { type: this.SUCCESS_UPDATE_ONE, payload };
  }
  public failUpdateOne(payload: { id: string; error?: any }) {
    return { type: this.FAIL_UPDATE_ONE, payload };
  }
  public requestUpdateMany(payload: T[]) {
    return { type: this.REQUEST_UPDATE_MANY, payload };
  }
  public successUpdateMany(payload: T[]) {
    return { type: this.SUCCESS_UPDATE_MANY, payload };
  }
  public failUpdateMany(payload: { ids: string[]; error?: any }) {
    return { type: this.FAIL_UPDATE_MANY, payload };
  }

  // cruD
  public requestDeleteOne(payload: string) {
    return { type: this.REQUEST_DELETE_ONE, payload };
  }
  public successDeleteOne(payload: string) {
    return { type: this.SUCCESS_DELETE_ONE, payload };
  }
  public failDeleteOne(payload: { id: string; error?: any }) {
    return { type: this.FAIL_DELETE_ONE, payload };
  }
  public requestDeleteMany(payload: string[]) {
    return { type: this.REQUEST_DELETE_MANY, payload };
  }
  public successDeleteMany(payload: string[]) {
    return { type: this.SUCCESS_DELETE_MANY, payload };
  }

  public failDeleteMany(payload: { ids: string[]; error?: any }) {
    return { type: this.FAIL_DELETE_MANY, payload };
  }
}
