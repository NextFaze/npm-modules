import { LocalEntityActions } from './local-entity.actions';

describe('Store / Actions / LocalEntity', () => {
  describe('Action names', () => {
    it('Should have the correct actions', () => {
      const actions = new LocalEntityActions<any>('test');

      expect(actions.LOAD_ALL).toBe('[test] load all');
      expect(actions.CLEAR_ALL).toBe('[test] clear all');

      expect(actions.ADD_ONE).toBe('[test] add one');
      expect(actions.UPSERT_ONE).toBe('[test] upsert one');
      expect(actions.UPDATE_ONE).toBe('[test] update one');
      expect(actions.DELETE_ONE).toBe('[test] delete one');

      expect(actions.ADD_MANY).toBe('[test] add many');
      expect(actions.UPSERT_MANY).toBe('[test] upsert');
      expect(actions.UPDATE_MANY).toBe('[test] update many');
      expect(actions.DELETE_MANY).toBe('[test] delete many');
    });
  });

  describe('Action creators', () => {
    const actions = new LocalEntityActions<any>('test');
    it('loadAll', () => {
      const payload = [{ id: '123' }, { id: '432' }];
      const a = actions.loadAll(payload);
      expect(a.type).toBe(actions.LOAD_ALL);
      expect(a.payload).toEqual(payload);
    });

    it('clearAll', () => {
      const a = actions.clearAll();
      expect(a.type).toBe(actions.CLEAR_ALL);
    });

    it('addOne', () => {
      const payload = { id: '123' };
      const a = actions.addOne(payload);
      expect(a.type).toBe(actions.ADD_ONE);
      expect(a.payload).toEqual(payload);
    });
    it('upsertOne', () => {
      const payload = { id: '123' };
      const a = actions.upsertOne(payload);
      expect(a.type).toBe(actions.UPSERT_ONE);
      expect(a.payload).toEqual(payload);
    });
    it('updateOne', () => {
      const payload = { id: '123' };
      const a = actions.updateOne(payload);
      expect(a.type).toBe(actions.UPDATE_ONE);
      expect(a.payload).toEqual(payload);
    });
    it('deleteOne', () => {
      const payload = 'asdf';
      const a = actions.deleteOne(payload);
      expect(a.type).toBe(actions.DELETE_ONE);
      expect(a.payload).toEqual(payload);
    });

    it('addMany', () => {
      const payload = [{ id: '123' }, { id: '432' }];
      const a = actions.addMany(payload);
      expect(a.type).toBe(actions.ADD_MANY);
      expect(a.payload).toEqual(payload);
    });
    it('upsertMany', () => {
      const payload = [{ id: '123' }, { id: '432' }];
      const a = actions.upsertMany(payload);
      expect(a.type).toBe(actions.UPSERT_MANY);
      expect(a.payload).toEqual(payload);
    });
    it('updateMany', () => {
      const payload = [{ id: '123' }, { id: '432' }];
      const a = actions.updateMany(payload);
      expect(a.type).toBe(actions.UPDATE_MANY);
      expect(a.payload).toEqual(payload);
    });
    it('deleteMany', () => {
      const payload = ['123', '432'];
      const a = actions.deleteMany(payload);
      expect(a.type).toBe(actions.DELETE_MANY);
      expect(a.payload).toEqual(payload);
    });
  });
});
