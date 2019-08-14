import { RemoteEntityActions } from './remote-entity.actions';
import { RemoteEntityReducer } from './remote-entity.reducer';

describe('Store / Reducers / RemoteEntity', () => {
  const actions = new RemoteEntityActions<any>('test');
  const reducer = new RemoteEntityReducer<any>(actions);

  describe('REQUEST CREATE ONE', () => {
    it('Should set creating true', () => {
      const result = reducer.reducer(undefined, actions.requestCreateOne({ name: 'test' }));
      expect(result.creating).toBe(true);
    });
    it('Should clear error', () => {
      const result = reducer.reducer(
        { ...reducer.initialState, error: 'testerror' },
        actions.requestCreateOne({ name: 'test' })
      );
      expect(result.error).toBeUndefined();
    });
  });
  describe('SUCCESS CREATE ONE', () => {
    it('new item should be added to store', () => {
      const result = reducer.reducer(
        undefined,
        actions.successCreateOne({ id: '2345', name: 'test' })
      );
      expect(result.entities['2345'].name).toEqual('test');
    });

    it('creating should be false', () => {
      const result = reducer.reducer(
        { ...reducer.initialState, creating: true },
        actions.successCreateOne({ id: '2345', name: 'test' })
      );
      expect(result.creating).toBe(false);
    });
  });
  describe('FAIL CREATE ONE', () => {
    it('creating should be false', () => {
      const result = reducer.reducer(
        { ...reducer.initialState, creating: true },
        actions.failCreateOne({ name: 'test' })
      );
      expect(result.creating).toBe(false);
    });
    it('should set the error', () => {
      const result = reducer.reducer(
        { ...reducer.initialState, creating: true },
        actions.failCreateOne('error')
      );
      expect(result.error).toEqual('error');
    });
  });

  describe('REQUEST CREATE MANY', () => {
    it('Should set creating true', () => {
      const result = reducer.reducer(
        undefined,
        actions.requestCreateMany([{ name: 'test' }, { name: 'asdf' }])
      );
      expect(result.creating).toBe(true);
    });
    it('Should clear error', () => {
      const result = reducer.reducer(
        { ...reducer.initialState, error: 'testerror' },
        actions.requestCreateMany([{ name: 'test' }])
      );
      expect(result.error).toBeUndefined();
    });
  });
  describe('SUCCESS CREATE MANY', () => {
    it('new items should be added to store', () => {
      const result = reducer.reducer(
        { ...reducer.initialState, creating: true },
        actions.successCreateMany([{ id: 'a', name: 'test' }, { id: 'b', name: 'asdf' }])
      );
      expect(result.entities['a'].name).toEqual('test');
      expect(result.entities['b'].name).toEqual('asdf');
    });
    it('creating should be false', () => {
      const result = reducer.reducer(
        { ...reducer.initialState, creating: true },
        actions.successCreateMany([{ id: 'a', name: 'test' }, { id: 'b', name: 'asdf' }])
      );
      expect(result.creating).toBe(false);
    });
  });
  describe('FAIL CREATE MANY', () => {
    it('creating should be false', () => {
      const result = reducer.reducer(
        { ...reducer.initialState, creating: true },
        actions.failCreateMany([{ id: 'a', name: 'test' }, { id: 'b', name: 'asdf' }])
      );
      expect(result.creating).toBe(false);
    });
    it('Should set the error', () => {
      const result = reducer.reducer(
        { ...reducer.initialState, creating: true },
        actions.failCreateMany('error')
      );
      expect(result.error).toEqual('error');
    });
  });

  describe('REQUEST RETRIEVE ONE', () => {
    it('Should set loading for element true', () => {
      const result = reducer.reducer(undefined, actions.requestRetrieveOne('asdf'));
      expect(result.loadingIds.asdf).toBe(true);
    });
    it('Should clear error', () => {
      const result = reducer.reducer(
        { ...reducer.initialState, error: 'testerror' },
        actions.requestRetrieveOne('test')
      );
      expect(result.error).toBeUndefined();
    });
  });
  describe('SUCCESS RETRIEVE ONE', () => {
    it('item should be added to store', () => {
      const result = reducer.reducer(
        { ...reducer.initialState, loadingIds: { a: true } },
        actions.successRetrieveOne({ id: 'a', name: 'test' })
      );
      expect(result.entities['a'].name).toEqual('test');
    });
    it('Should set loading for element false', () => {
      const result = reducer.reducer(
        { ...reducer.initialState, loadingIds: { a: true } },
        actions.successRetrieveOne({ id: 'a', name: 'test' })
      );
      expect(result.loadingIds.a).toBe(false);
    });
  });
  describe('FAIL RETRIEVE ONE', () => {
    it('Should set loading for element false', () => {
      const result = reducer.reducer(
        { ...reducer.initialState, loadingIds: { a: true } },
        actions.failRetrieveOne({ id: 'a', name: 'test' })
      );
      expect(result.loadingIds.a).toBe(false);
    });
    it('Should set the error', () => {
      const result = reducer.reducer(
        { ...reducer.initialState, loadingIds: { a: true } },
        actions.failRetrieveOne({ id: 'a', error: 'error' })
      );
      expect(result.error).toEqual('error');
    });
  });

  describe('REQUEST RETRIEVE ALL', () => {
    it('Should set loadingAll true', () => {
      const result = reducer.reducer(undefined, actions.requestRetrieveAll());
      expect(result.loadingAll).toBe(true);
    });
    it('Should clear error', () => {
      const result = reducer.reducer(
        { ...reducer.initialState, error: 'testerror' },
        actions.requestRetrieveAll()
      );
      expect(result.error).toBeUndefined();
    });
  });
  describe('SUCCESS RETRIEVE ALL', () => {
    it('items should be added to store', () => {
      const result = reducer.reducer(
        { ...reducer.initialState, loadingIds: { a: true, b: true, c: true } },
        actions.successRetrieveAll([
          { id: 'a', name: 'test' },
          { id: 'b', name: 'testb' },
          { id: 'c', name: 'testc' }
        ])
      );
      expect(result.entities['a'].name).toEqual('test');
      expect(result.entities['b'].name).toEqual('testb');
      expect(result.entities['c'].name).toEqual('testc');
    });
    it('Should set loadingAll false', () => {
      const result = reducer.reducer(
        { ...reducer.initialState, loadingIds: { a: true, b: true, c: true } },
        actions.successRetrieveAll([
          { id: 'a', name: 'test' },
          { id: 'b', name: 'testb' },
          { id: 'c', name: 'testc' }
        ])
      );
      expect(result.loadingAll).toBe(false);
    });
  });
  describe('FAIL RETRIEVE ALL', () => {
    it('Should set loadingAll false', () => {
      const result = reducer.reducer(
        { ...reducer.initialState, loadingIds: { a: true, b: true, c: true } },
        actions.failRetrieveAll('error')
      );
      expect(result.loadingAll).toBe(false);
    });
    it('Should set the error', () => {
      const result = reducer.reducer(
        { ...reducer.initialState, loadingIds: { a: true, b: true, c: true } },
        actions.failRetrieveAll('error')
      );
      expect(result.error).toBe('error');
    });
  });

  describe('REQUEST UPDATE ONE', () => {
    it('Should set loading for element true', () => {
      const result = reducer.reducer(
        undefined,
        actions.requestUpdateOne({ id: 'a', name: 'test' })
      );
      expect(result.loadingIds.a).toBe(true);
    });
    it('Should clear error', () => {
      const result = reducer.reducer(
        { ...reducer.initialState, error: 'testerror' },
        actions.requestUpdateOne({ id: 'a', name: 'test' })
      );
      expect(result.error).toBeUndefined();
    });
  });
  describe('SUCCESS UPDATE ONE', () => {
    it('item should be added to store', () => {
      const result = reducer.reducer(
        {
          creating: false,
          loadingAll: false,
          loadingIds: { a: true },
          entities: {
            a: { id: 'a', name: 'asdf' }
          },
          ids: ['a']
        },
        actions.successUpdateOne({ id: 'a', name: 'test' })
      );
      expect(result.entities.a.name).toEqual('test');
    });
    it('Should set loading for element false', () => {
      const result = reducer.reducer(
        {
          creating: false,
          loadingAll: false,
          loadingIds: { a: true },
          entities: {
            a: { id: 'a', name: 'asdf' }
          },
          ids: ['a']
        },
        actions.successUpdateOne({ id: 'a', name: 'test' })
      );
      expect(result.loadingIds.a).toBe(false);
    });
  });
  describe('FAIL UPDATE ONE', () => {
    it('Should set loading for element false', () => {
      const result = reducer.reducer(
        {
          creating: false,
          loadingAll: false,
          loadingIds: { a: true },
          entities: {
            a: { id: 'a', name: 'asdf' }
          },
          ids: ['a']
        },
        actions.failUpdateOne({ id: 'a', error: 'error' })
      );
      expect(result.loadingIds.a).toBe(false);
    });
    it('Should set the error', () => {
      const result = reducer.reducer(
        {
          creating: false,
          loadingAll: false,
          loadingIds: { a: true },
          entities: {
            a: { id: 'a', name: 'asdf' }
          },
          ids: ['a']
        },
        actions.failUpdateOne({ id: 'a', error: 'error' })
      );
      expect(result.error).toEqual('error');
    });
  });

  describe('REQUEST UPDATE MANY', () => {
    it('Should set loading for each element true', () => {
      const result = reducer.reducer(
        undefined,
        actions.requestUpdateMany([
          { id: 'a', name: 'testa' },
          { id: 'b', name: 'testb' },
          { id: 'c', name: 'testc' }
        ])
      );
      expect(result.loadingIds.a).toBe(true);
      expect(result.loadingIds.b).toBe(true);
      expect(result.loadingIds.c).toBe(true);
    });
    it('Should clear error', () => {
      const result = reducer.reducer(
        { ...reducer.initialState, error: 'testerror' },
        actions.requestUpdateMany([{ id: 'a', name: 'test' }])
      );
      expect(result.error).toBeUndefined();
    });
  });
  describe('SUCCESS UPDATE MANY', () => {
    it('items should be added to store', () => {
      const result = reducer.reducer(
        {
          creating: false,
          loadingAll: false,
          loadingIds: { a: true, b: true, c: true },
          entities: {
            a: { id: 'a', name: 'asdf1' },
            b: { id: 'b', name: 'asdf2' },
            c: { id: 'c', name: 'asdf3' }
          },
          ids: ['a', 'b', 'c']
        },
        actions.successUpdateMany([
          { id: 'a', name: 'testa' },
          { id: 'b', name: 'testb' },
          { id: 'c', name: 'testc' }
        ])
      );
      expect(result.entities.a.name).toEqual('testa');
      expect(result.entities.b.name).toEqual('testb');
      expect(result.entities.c.name).toEqual('testc');
    });
    it('Should set loading for each element false', () => {
      const result = reducer.reducer(
        {
          creating: false,
          loadingAll: false,
          loadingIds: { a: true, b: true, c: true },
          entities: {
            a: { id: 'a', name: 'asdf1' },
            b: { id: 'b', name: 'asdf2' },
            c: { id: 'c', name: 'asdf3' }
          },
          ids: ['a', 'b', 'c']
        },
        actions.successUpdateMany([
          { id: 'a', name: 'testa' },
          { id: 'b', name: 'testb' },
          { id: 'c', name: 'testc' }
        ])
      );
      expect(result.loadingIds.a).toBe(false);
      expect(result.loadingIds.b).toBe(false);
      expect(result.loadingIds.c).toBe(false);
    });
  });
  describe('FAIL UPDATE MANY', () => {
    it('Should set loading for each element false', () => {
      const result = reducer.reducer(
        {
          creating: false,
          loadingAll: false,
          loadingIds: { a: true, b: true, c: true },
          entities: {
            a: { id: 'a', name: 'asdf1' },
            b: { id: 'b', name: 'asdf2' },
            c: { id: 'c', name: 'asdf3' }
          },
          ids: ['a', 'b', 'c']
        },
        actions.failUpdateMany({ ids: ['a', 'b', 'c'], error: 'error' })
      );
      expect(result.loadingIds.a).toBe(false);
      expect(result.loadingIds.b).toBe(false);
      expect(result.loadingIds.c).toBe(false);
    });
    it('Should set the error', () => {
      const result = reducer.reducer(
        {
          creating: false,
          loadingAll: false,
          loadingIds: { a: true, b: true, c: true },
          entities: {
            a: { id: 'a', name: 'asdf1' },
            b: { id: 'b', name: 'asdf2' },
            c: { id: 'c', name: 'asdf3' }
          },
          ids: ['a', 'b', 'c']
        },
        actions.failUpdateMany({ ids: ['a', 'b', 'c'], error: 'error' })
      );
      expect(result.error).toEqual('error');
    });
  });

  describe('REQUEST DELETE ONE', () => {
    it('Should set loading for element true', () => {
      const result = reducer.reducer(undefined, actions.requestDeleteOne('a'));
      expect(result.loadingIds.a).toBe(true);
    });
    it('Should clear error', () => {
      const result = reducer.reducer(
        { ...reducer.initialState, error: 'testerror' },
        actions.requestDeleteOne('a')
      );
      expect(result.error).toBeUndefined();
    });
  });
  describe('SUCCESS DELETE ONE', () => {
    it('item should be removed from store', () => {
      const result = reducer.reducer(
        {
          creating: false,
          loadingAll: false,
          loadingIds: { a: true },
          entities: {
            a: { id: 'a', name: 'asdf1' },
            b: { id: 'b', name: 'asdf2' },
            c: { id: 'c', name: 'asdf3' }
          },
          ids: ['a', 'b', 'c']
        },

        actions.successDeleteOne('a')
      );
      expect(result.entities.a).toBeUndefined();
    });
    it('Should set loading for element false', () => {
      const result = reducer.reducer(
        {
          creating: false,
          loadingAll: false,
          loadingIds: { a: true },
          entities: {
            a: { id: 'a', name: 'asdf1' },
            b: { id: 'b', name: 'asdf2' },
            c: { id: 'c', name: 'asdf3' }
          },
          ids: ['a', 'b', 'c']
        },

        actions.successDeleteOne('a')
      );
      expect(result.loadingIds.a).toBe(false);
    });
  });
  describe('FAIL DELETE ONE', () => {
    it('Should set loading for element false', () => {
      const result = reducer.reducer(
        {
          creating: false,
          loadingAll: false,
          loadingIds: { a: true },
          entities: {
            a: { id: 'a', name: 'asdf1' },
            b: { id: 'b', name: 'asdf2' },
            c: { id: 'c', name: 'asdf3' }
          },
          ids: ['a', 'b', 'c']
        },

        actions.failDeleteOne({ id: 'a', error: 'error' })
      );
      expect(result.loadingIds.a).toBe(false);
    });
    it('Should set error', () => {
      const result = reducer.reducer(
        {
          creating: false,
          loadingAll: false,
          loadingIds: { a: true },
          entities: {
            a: { id: 'a', name: 'asdf1' },
            b: { id: 'b', name: 'asdf2' },
            c: { id: 'c', name: 'asdf3' }
          },
          ids: ['a', 'b', 'c']
        },

        actions.failDeleteOne({ id: 'a', error: 'error' })
      );
      expect(result.error).toBe('error');
    });
  });

  describe('REQUEST DELETE MANY', () => {
    it('Should set loading for each element true', () => {
      const result = reducer.reducer(undefined, actions.requestDeleteMany(['a', 'b', 'c']));
      expect(result.loadingIds.a).toBe(true);
      expect(result.loadingIds.b).toBe(true);
      expect(result.loadingIds.c).toBe(true);
    });
    it('Should clear error', () => {
      const result = reducer.reducer(
        { ...reducer.initialState, error: 'testerror' },
        actions.requestDeleteMany(['a', 'b'])
      );
      expect(result.error).toBeUndefined();
    });
  });
  describe('SUCCESS DELETE MANY', () => {
    it('items should be removed fromstore', () => {
      const result = reducer.reducer(
        {
          creating: false,
          loadingAll: false,
          loadingIds: { a: true },
          entities: {
            a: { id: 'a', name: 'asdf1' },
            b: { id: 'b', name: 'asdf2' },
            c: { id: 'c', name: 'asdf3' }
          },
          ids: ['a', 'b', 'c']
        },

        actions.successDeleteMany(['a', 'b', 'c'])
      );
      expect(result.entities.a).toBeUndefined();
      expect(result.entities.d).toBeUndefined();
      expect(result.entities.c).toBeUndefined();
    });
    it('Should set loading for each element false', () => {
      const result = reducer.reducer(
        {
          creating: false,
          loadingAll: false,
          loadingIds: { a: true, b: true, c: true },
          entities: {
            a: { id: 'a', name: 'asdf1' },
            b: { id: 'b', name: 'asdf2' },
            c: { id: 'c', name: 'asdf3' }
          },
          ids: ['a', 'b', 'c']
        },

        actions.successDeleteMany(['a', 'b', 'c'])
      );
      expect(result.loadingIds.a).toBe(false);
      expect(result.loadingIds.b).toBe(false);
      expect(result.loadingIds.c).toBe(false);
    });
  });
  describe('FAIL DELETE MANY', () => {
    it('Should set loading for each element false', () => {
      const result = reducer.reducer(
        {
          creating: false,
          loadingAll: false,
          loadingIds: { a: true, b: true, c: true },
          entities: {
            a: { id: 'a', name: 'asdf1' },
            b: { id: 'b', name: 'asdf2' },
            c: { id: 'c', name: 'asdf3' }
          },
          ids: ['a', 'b', 'c']
        },

        actions.failDeleteMany({ ids: ['a', 'b', 'c'] })
      );
      expect(result.loadingIds.a).toBe(false);
      expect(result.loadingIds.b).toBe(false);
      expect(result.loadingIds.c).toBe(false);
    });
    it('Should set error', () => {
      const result = reducer.reducer(
        {
          creating: false,
          loadingAll: false,
          loadingIds: { a: true, b: true, c: true },
          entities: {
            a: { id: 'a', name: 'asdf1' },
            b: { id: 'b', name: 'asdf2' },
            c: { id: 'c', name: 'asdf3' }
          },
          ids: ['a', 'b', 'c']
        },

        actions.failDeleteMany({ ids: ['a', 'b', 'c'], error: 'error' })
      );
      expect(result.error).toEqual('error');
    });
  });
});
