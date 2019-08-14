import { RemoteEntityActions } from './remote-entity.actions';

describe('Store / Actions / LocalEntity', () => {
  describe('Action names', () => {
    it('Should have the correct actions', () => {
      const actions = new RemoteEntityActions<any>('test');

      expect(actions.REQUEST_CREATE_ONE).toBe('[test][Request] create one');
      expect(actions.SUCCESS_CREATE_ONE).toBe('[test][Success] create one');
      expect(actions.FAIL_CREATE_ONE).toBe('[test][Fail] create one');

      expect(actions.REQUEST_CREATE_MANY).toBe('[test][Request] create many');
      expect(actions.SUCCESS_CREATE_MANY).toBe('[test][Success] create many');
      expect(actions.FAIL_CREATE_MANY).toBe('[test][Fail] create many');

      expect(actions.REQUEST_RETRIEVE_ONE).toBe('[test][Request] retrieve one');
      expect(actions.SUCCESS_RETRIEVE_ONE).toBe('[test][Success] retrieve one');
      expect(actions.FAIL_RETRIEVE_ONE).toBe('[test][Fail] retrieve one');

      expect(actions.REQUEST_RETRIEVE_ALL).toBe('[test][Request] retrieve all');
      expect(actions.SUCCESS_RETRIEVE_ALL).toBe('[test][Success] retrieve all');
      expect(actions.FAIL_RETRIEVE_ALL).toBe('[test][Fail] retrieve all');

      expect(actions.REQUEST_UPDATE_ONE).toBe('[test][Request] update one');
      expect(actions.SUCCESS_UPDATE_ONE).toBe('[test][Success] update one');
      expect(actions.FAIL_UPDATE_ONE).toBe('[test][Fail] update one');

      expect(actions.REQUEST_UPDATE_MANY).toBe('[test][Request] update many');
      expect(actions.SUCCESS_UPDATE_MANY).toBe('[test][Success] update many');
      expect(actions.FAIL_UPDATE_MANY).toBe('[test][Fail] update many');

      expect(actions.REQUEST_DELETE_ONE).toBe('[test][Request] delete one');
      expect(actions.SUCCESS_DELETE_ONE).toBe('[test][Success] delete one');
      expect(actions.FAIL_DELETE_ONE).toBe('[test][Fail] delete one');

      expect(actions.REQUEST_DELETE_MANY).toBe('[test][Request] delete many');
      expect(actions.SUCCESS_DELETE_MANY).toBe('[test][Success] delete many');
      expect(actions.FAIL_DELETE_MANY).toBe('[test][Fail] delete many');
    });
  });

  describe('Action creators', () => {
    const actions = new RemoteEntityActions<any>('test');

    describe('create', () => {
      it('requestCreateOne', () => {
        const payload = [{ id: '123' }, { id: '432' }];
        const a = actions.requestCreateOne(payload);
        expect(a.type).toBe(actions.REQUEST_CREATE_ONE);
        expect(a.payload).toEqual(payload);
      });
      it('successCreateOne', () => {
        const payload = [{ id: '123' }, { id: '432' }];
        const a = actions.successCreateOne(payload);
        expect(a.type).toBe(actions.SUCCESS_CREATE_ONE);
        expect(a.payload).toEqual(payload);
      });
      it('failCreateOne', () => {
        const payload = [{ id: '123' }, { id: '432' }];
        const a = actions.failCreateOne(payload);
        expect(a.type).toBe(actions.FAIL_CREATE_ONE);
        expect(a.payload).toEqual(payload);
      });

      it('requestCreateMany', () => {
        const payload = [{ id: '123' }, { id: '432' }];
        const a = actions.requestCreateMany(payload);
        expect(a.type).toBe(actions.REQUEST_CREATE_MANY);
        expect(a.payload).toEqual(payload);
      });
      it('successCreateMany', () => {
        const payload = [{ id: '123' }, { id: '432' }];
        const a = actions.successCreateMany(payload);
        expect(a.type).toBe(actions.SUCCESS_CREATE_MANY);
        expect(a.payload).toEqual(payload);
      });
      it('failCreateMany', () => {
        const payload = [{ id: '123' }, { id: '432' }];
        const a = actions.failCreateMany(payload);
        expect(a.type).toBe(actions.FAIL_CREATE_MANY);
        expect(a.payload).toEqual(payload);
      });
    });
    describe('retrieve', () => {
      it('requestRetrieveOne', () => {
        const a = actions.requestRetrieveOne('a');
        expect(a.type).toBe(actions.REQUEST_RETRIEVE_ONE);
        expect(a.payload).toEqual('a');
      });
      it('successRetrieveOne', () => {
        const payload = [{ id: '123' }, { id: '432' }];
        const a = actions.successRetrieveOne(payload);
        expect(a.type).toBe(actions.SUCCESS_RETRIEVE_ONE);
        expect(a.payload).toEqual(payload);
      });
      it('failRetrieveOne', () => {
        const payload = [{ id: '123' }, { id: '432' }];
        const a = actions.failCreateOne(payload);
        expect(a.type).toBe(actions.FAIL_CREATE_ONE);
        expect(a.payload).toEqual(payload);
      });

      it('requestRetrieveAll', () => {
        const a = actions.requestRetrieveAll();
        expect(a.type).toBe(actions.REQUEST_RETRIEVE_ALL);
      });
      it('successRetrieveAll', () => {
        const payload = [{ id: '123' }, { id: '432' }];
        const a = actions.successRetrieveAll(payload);
        expect(a.type).toBe(actions.SUCCESS_RETRIEVE_ALL);
        expect(a.payload).toEqual(payload);
      });
      it('failRetrieveAll', () => {
        const payload = [{ id: '123' }, { id: '432' }];
        const a = actions.failRetrieveAll(payload);
        expect(a.type).toBe(actions.FAIL_RETRIEVE_ALL);
        expect(a.payload).toEqual(payload);
      });
    });
    describe('update', () => {
      it('requestUpdateOne', () => {
        const payload = [{ id: '123' }, { id: '432' }];
        const a = actions.requestUpdateOne(payload);
        expect(a.type).toBe(actions.REQUEST_UPDATE_ONE);
        expect(a.payload).toEqual(payload);
      });
      it('successUpdateOne', () => {
        const payload = [{ id: '123' }, { id: '432' }];
        const a = actions.successUpdateOne(payload);
        expect(a.type).toBe(actions.SUCCESS_UPDATE_ONE);
        expect(a.payload).toEqual(payload);
      });
      it('failUpdateOne', () => {
        const payload = [{ id: '123' }, { id: '432' }];
        const a = actions.failUpdateOne({ id: 'a', error: payload });
        expect(a.type).toBe(actions.FAIL_UPDATE_ONE);
        expect(a.payload).toEqual({ id: 'a', error: payload });
      });

      it('requestUpdateMany', () => {
        const payload = [{ id: '123' }, { id: '432' }];
        const a = actions.requestUpdateMany(payload);
        expect(a.type).toBe(actions.REQUEST_UPDATE_MANY);
        expect(a.payload).toEqual(payload);
      });
      it('successUpdateMany', () => {
        const payload = [{ id: '123' }, { id: '432' }];
        const a = actions.successUpdateMany(payload);
        expect(a.type).toBe(actions.SUCCESS_UPDATE_MANY);
        expect(a.payload).toEqual(payload);
      });
      it('failUpdateMany', () => {
        const payload = [{ id: '123' }, { id: '432' }];
        const a = actions.failUpdateMany({ ids: ['a', 'b'] });
        expect(a.type).toBe(actions.FAIL_UPDATE_MANY);
        expect(a.payload).toEqual({ ids: ['a', 'b'] });
      });
    });
    describe('delete', () => {
      it('requestDeleteOne', () => {
        const a = actions.requestDeleteOne('a');
        expect(a.type).toBe(actions.REQUEST_DELETE_ONE);
        expect(a.payload).toEqual('a');
      });
      it('successDeleteOne', () => {
        const a = actions.successDeleteOne('a');
        expect(a.type).toBe(actions.SUCCESS_DELETE_ONE);
        expect(a.payload).toEqual('a');
      });
      it('failDeleteOne', () => {
        const a = actions.failDeleteOne({ id: 'a', error: 'error' });
        expect(a.type).toBe(actions.FAIL_DELETE_ONE);
        expect(a.payload).toEqual({ id: 'a', error: 'error' });
      });

      it('requestDeleteMany', () => {
        const a = actions.requestDeleteMany(['a', 'b']);
        expect(a.type).toBe(actions.REQUEST_DELETE_MANY);
        expect(a.payload).toEqual(['a', 'b']);
      });
      it('successUpdateMany', () => {
        const a = actions.successDeleteMany(['a', 'b']);
        expect(a.type).toBe(actions.SUCCESS_DELETE_MANY);
        expect(a.payload).toEqual(['a', 'b']);
      });
      it('failDeleteMany', () => {
        const a = actions.failDeleteMany({ ids: ['a', 'b'], error: 'error' });
        expect(a.type).toBe(actions.FAIL_DELETE_MANY);
        expect(a.payload).toEqual({ ids: ['a', 'b'], error: 'error' });
      });
    });
  });
});
