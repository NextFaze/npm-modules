import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { EntityAction } from './entity-action';
import { LocalEntityActions } from './local-entity.actions';

export class LocalEntityReducer<T> {
  public get initialState() {
    return this.adapter.getInitialState();
  }

  constructor(
    protected actions: LocalEntityActions<T>,
    protected adapter = createEntityAdapter<T>()
  ) {}

  public reducer(state: EntityState<T> = this.initialState, action: EntityAction): EntityState<T> {
    switch (action.type) {
      case this.actions.CLEAR_ALL:
        return this.adapter.removeAll(state);
      case this.actions.LOAD_ALL:
        return this.adapter.addAll(action.payload, state);

      case this.actions.ADD_ONE:
        return this.adapter.addOne(action.payload, state);
      case this.actions.UPSERT_ONE:
        return this.adapter.upsertOne(action.payload, state);
      case this.actions.UPDATE_ONE:
        return this.adapter.updateOne(action.payload, state);
      case this.actions.DELETE_ONE:
        return this.adapter.removeOne(action.payload, state);

      case this.actions.ADD_MANY:
        return this.adapter.addMany(action.payload, state);
      case this.actions.UPSERT_MANY:
        return this.adapter.upsertMany(action.payload, state);
      case this.actions.UPDATE_MANY:
        return this.adapter.updateMany(action.payload, state);
      case this.actions.DELETE_MANY:
        return this.adapter.removeMany(action.payload, state);
      default:
        return state;
    }
  }
}
