import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { EntityAction } from './entity-action';
import { RemoteEntityActions } from './remote-entity.actions';

export interface RemoteEntityState<T> extends EntityState<T> {
  loadingAll: boolean;
  loadingIds: { [id: string]: boolean };
  creating: boolean;
  error?: any;
}

export class RemoteEntityReducer<T> {
  public get initialState() {
    return this.adapter.getInitialState({
      loadingAll: false,
      loadingIds: {},
      creating: false
    });
  }
  constructor(
    protected actions: RemoteEntityActions<T>,
    protected adapter = createEntityAdapter<T>()
  ) {}

  get selectors() {
    return this.adapter.getSelectors();
  }

  public reducer(
    state: RemoteEntityState<T> = this.initialState,
    action: EntityAction
  ): RemoteEntityState<T> {
    const actions = <RemoteEntityActions<T>>this.actions;
    switch (action.type) {
      case actions.REQUEST_CREATE_ONE:
      case actions.REQUEST_CREATE_MANY: {
        const newState = { ...state, creating: true };
        delete newState.error;
        return newState;
      }
      case actions.FAIL_CREATE_ONE:
      case actions.FAIL_CREATE_MANY:
        return { ...state, creating: false, error: action.payload };
      case actions.SUCCESS_CREATE_ONE:
        return this.adapter.addOne(action.payload, {
          ...state,
          creating: false
        });
      case actions.SUCCESS_CREATE_MANY:
        return this.adapter.addMany(action.payload, {
          ...state,
          creating: false
        });

      case actions.REQUEST_RETRIEVE_ONE:
      case actions.REQUEST_DELETE_ONE: {
        const newState = {
          ...state,
          loadingIds: { ...state.loadingIds, [action.payload]: true }
        };
        delete newState.error;
        return newState;
      }
      case actions.REQUEST_UPDATE_ONE: {
        const newState = {
          ...state,
          loadingIds: { ...state.loadingIds, [action.payload.id]: true }
        };
        delete newState.error;
        return newState;
      }
      case actions.REQUEST_RETRIEVE_ALL: {
        const newState = { ...state, loadingAll: true };
        delete newState.error;
        return newState;
      }
      case actions.FAIL_RETRIEVE_ONE:
      case actions.FAIL_UPDATE_ONE:
        return {
          ...state,
          loadingIds: { ...state.loadingIds, [action.payload.id]: false },
          error: action.payload.error
        };
      case actions.FAIL_DELETE_ONE:
        return {
          ...state,
          loadingIds: { ...state.loadingIds, [action.payload.id]: false },
          error: action.payload.error
        };

      case actions.FAIL_RETRIEVE_ALL:
        return { ...state, loadingAll: false, error: action.payload };
      case actions.SUCCESS_UPDATE_ONE:
      case actions.SUCCESS_RETRIEVE_ONE:
        return this.adapter.upsertOne(
          { id: action.payload.id, changes: action.payload },
          {
            ...state,
            loadingIds: { ...state.loadingIds, [action.payload.id]: false }
          }
        );
      case actions.SUCCESS_RETRIEVE_ALL:
        const updates = action.payload.map(entity => ({ id: entity.id, changes: entity }));
        return this.adapter.upsertMany(updates, {
          ...state,
          loadingAll: false
        });

      case actions.REQUEST_DELETE_MANY: {
        const loadingIds = action.payload.reduce((map, element) => {
          map[element] = true;
          return map;
        }, {});
        const newState = {
          ...state,
          loadingIds: { ...state.loadingIds, ...loadingIds }
        };
        delete newState.error;
        return newState;
      }

      case actions.REQUEST_UPDATE_MANY: {
        const loadingIds = action.payload.reduce((map, element) => {
          map[element.id] = true;
          return map;
        }, {});
        const newState = {
          ...state,
          loadingIds: { ...state.loadingIds, ...loadingIds }
        };
        delete newState.error;
        return newState;
      }
      case actions.FAIL_DELETE_MANY:
      case actions.FAIL_UPDATE_MANY: {
        const loadingIds = action.payload.ids.reduce((map, element) => {
          map[element] = false;
          return map;
        }, {});
        return {
          ...state,
          loadingIds: { ...state.loadingIds, ...loadingIds },
          error: action.payload.error
        };
      }
      case actions.SUCCESS_UPDATE_MANY: {
        const updates = action.payload.map(entity => ({ id: entity.id, changes: entity }));
        const loadingIds = action.payload.reduce((map, element) => {
          map[element.id] = false;
          return map;
        }, {});
        return this.adapter.updateMany(updates, {
          ...state,
          loadingIds: { ...state.loadingIds, ...loadingIds }
        });
      }

      case actions.SUCCESS_DELETE_ONE: {
        return this.adapter.removeOne(action.payload, {
          ...state,
          loadingIds: { ...state.loadingIds, [action.payload]: false }
        });
      }

      case actions.SUCCESS_DELETE_MANY: {
        const loadingIds = action.payload.reduce((map, element) => {
          map[element] = false;
          return map;
        }, {});
        return this.adapter.removeMany(action.payload, {
          ...state,
          loadingIds: { ...state.loadingIds, ...loadingIds }
        });
      }

      default:
        return state;
    }
  }
}
