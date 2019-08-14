import { LocalEntityActions } from './local-entity.actions';
import { LocalEntityReducer } from './local-entity.reducer';

describe('Store / Reducers / LocalEntity', () => {
  let mockAdapter;
  let reducer: LocalEntityReducer<any>;
  let actions = new LocalEntityActions('test');

  beforeEach(() => {
    mockAdapter = {
      getInitialState: () => ({}),
      removeAll: jasmine.createSpy('removeAll'),
      addAll: jasmine.createSpy('addAll'),
      addOne: jasmine.createSpy('addOne'),
      upsertOne: jasmine.createSpy('upsertOne'),
      updateOne: jasmine.createSpy('updateOne'),
      removeOne: jasmine.createSpy('removeOne'),
      addMany: jasmine.createSpy('addMany'),
      upsertMany: jasmine.createSpy('upsertMany'),
      updateMany: jasmine.createSpy('updateMany'),
      removeMany: jasmine.createSpy('removeMany')
    };
    reducer = new LocalEntityReducer<any>(actions, mockAdapter);
  });
  describe('CLEAR ALL', () => {
    it('Calls the correct adapter function', () => {
      reducer.reducer(undefined, actions.clearAll());
      expect(mockAdapter.removeAll).toHaveBeenCalled();
    });
  });
  describe('LOAD ALL', () => {
    it('Calls the correct adapter function', () => {
      reducer.reducer(undefined, actions.loadAll([]));
      expect(mockAdapter.addAll).toHaveBeenCalled();
    });
  });
  describe('Add One', () => {
    it('Calls the correct adapter function', () => {
      reducer.reducer(undefined, actions.addOne({ id: 'asdf' }));
      expect(mockAdapter.addOne).toHaveBeenCalled();
    });
  });
  describe('Upsert One', () => {
    it('Calls the correct adapter function', () => {
      reducer.reducer(undefined, actions.upsertOne({ id: 'asdf' }));
      expect(mockAdapter.upsertOne).toHaveBeenCalled();
    });
  });
  describe('Update One', () => {
    it('Calls the correct adapter function', () => {
      reducer.reducer(undefined, actions.updateOne({ id: 'asdf' }));
      expect(mockAdapter.updateOne).toHaveBeenCalled();
    });
  });
  describe('Delete One', () => {
    it('Calls the correct adapter function', () => {
      reducer.reducer(undefined, actions.deleteOne('asdf'));
      expect(mockAdapter.removeOne).toHaveBeenCalled();
    });
  });

  describe('Add many', () => {
    it('Calls the correct adapter function', () => {
      reducer.reducer(undefined, actions.addMany([{ id: 'asdf' }]));
      expect(mockAdapter.addMany).toHaveBeenCalled();
    });
  });
  describe('Upsert Many', () => {
    it('Calls the correct adapter function', () => {
      reducer.reducer(undefined, actions.upsertMany([{ id: 'asdf' }]));
      expect(mockAdapter.upsertMany).toHaveBeenCalled();
    });
  });
  describe('Update Many', () => {
    it('Calls the correct adapter function', () => {
      reducer.reducer(undefined, actions.updateMany([{ id: 'asdf' }]));
      expect(mockAdapter.updateMany).toHaveBeenCalled();
    });
  });
  describe('Delete Many', () => {
    it('Calls the correct adapter function', () => {
      reducer.reducer(undefined, actions.deleteMany(['fasdf', 'asdf']));
      expect(mockAdapter.removeMany).toHaveBeenCalled();
    });
  });
});
