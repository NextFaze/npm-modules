# NGRX Entity Helpers

NGRX Entity takes a big step towards standardising state shapes for collections of objects. However, it requires heaps of boilerplate for creating all your actions, reducers, etc. This module takes care of that for you by using templated action generator and reducer classes.

Inspired by CareApp's NGRX store, modified to work with `@ngrx/Entity`.

## tl; dr

1.  Create an Actions and Reducer object for your model:

```ts
export const userActions = new RemoteEntityActions<UserModel>('users');
export const userEntityReducer = new RemoteEntityReducer<UserModel>(actions);
```

2.  Add the reducer to your NGRX configuration

```ts
export const REDUCER = {
  // We wrap our class reducer in a function so the scope is correct
  users: (...args) => userReducer.reducer(args)
};
```

3.  Dispatch actions

```ts
this.store.dispatch(userActions.requestRetrieveAll());
```

## Remote Entities

Remote entities are collections where the Truth is stored on a remote server, and the client's store contains a subset of the collections. Remote Entities support CRUD operations in a request/response style flow.

### Dispatchable Actions

Actions that you can disatch are:

#### request create one / many

Dispatch when creating one or more objects. Set's `state.creating` true while the request is in progress.

#### request retrieve one / all

For retrieving all objects or a single entity by ID. Sets `state.loading` true while the request in progress.

#### request update one / many

For requesting updates to one or more objects. Sets `state.loadingIds[model.id]` true for each model being updated while the request is in progress.

#### request delete one / many

For requesting deletes to one or more objects. Sets `state.loadingIds[model.id]` true for each model being deleted while the request is in progress.

### Errors

FAIL actions should contain an error in the payload. The most recent error is stored in `state.error`. Any subsequent requests clear the error.

### Selectors

The selectors supported by `@ngrx/entity` can be retrieved from the reducer class:

    const selectors = userReducer.selectors;

### Implementing Effects

RemoteEntity takes care of the CRUD actions and the reducer to handle the state. However, the Effects for dealing with the remote server are up to you (MRs welcome for dealing with common APIs). You should implement effects for the actions you want to support:

```ts
import { Actions, Effect } from '@ngrx/effects';
import { actions as userActions } from './user-actions';
import { Observable } from 'rxjs/Observable';

export class UserEffects {
  @Effect()
  fetchAll = this.actions$.ofType(actions.REQUEST_RETREIVE_ALL).switchMap(action => {
    return this.api
      .getUsers()
      .map(users => userActions.successRetrieveAll(users))
      .catch(error => Observable.of(userActions.failRetrieveAll(error)));
  });

  // Not strictly required, but probably a good idea to map unsupported requests to the fail actions
  @Effect()
  deleteAll = this.actions$
    .ofType(actions.REQUEST_DELETE_ALL)
    .map(userActions.failDeleteAll('DELETE NOT SUPPORTED'));
  constructor(private actions$: Actions<EntityAction>, private api: MyAPIService) {}
}
```

Each `REQUEST` action types have corresponding `SUCCESS` and `FAIL` actions, and your Effects classes should map to these actions.

## LocalEntity

Local Entity works in a similar way to RemoteEntity, but assumes no asynchronous work. It simply generates the actions and reducer to support all the actions supported by `@ngrx/entity`.

## Extending Entity Reducers

Extending the entities with custom actions is easy.

### Extend your actions class

You can add support for new kinds of actions by extending the base classes and just adding support for what you need.

```ts
class MyCustomUserActions<T> extends RemoteEntityActions<T> {
  constructor(slice: string) {
    super(slice);
  }

  get DO_SOMETHING_COOL=`[${this.slice}] do something cool`;

  public doSomethingCool(payload) {
    return {type: this.DO_SOMETHING_COOL, payload}
  }
}

export const actions = new MyCustomUserActions<UserModel>('users');
```

### Extend the Reducer class

```ts
export interface MyCustomUserState<T> extends RemoteEntityState<T> {
  someCustomKey: any;
}

class MyCustomUserReducer<T> extends RemoteEntityReducer<T> {
  public get initialState() {
    return { ...super.initialState, someCustomKey: 'asdf' };
  }

  constructor(actions, adapter) {
    super(actions, adapter);
  }

  public reducer(
    state: MyCustomUserState<T> = this.initialState,
    action: EntityAction
  ): MyCustomUserState<T> {
    switch (action.type) {
      case actions.DO_SOMETHING_COOL:
        // do something cool here, return the new state
        break;
      default:
        return super.reducer(state, action);
    }
  }
}
```
