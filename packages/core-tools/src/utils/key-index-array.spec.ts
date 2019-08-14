import { keyIndexArray } from '../';
import { expect } from 'chai';

describe('Core Tools' , () => {
  context('keyIndexArray()', () => {
    const arr = [{
      id: '1234',
      name: 'Marty'
    }, {
      id: '5432',
      name: 'McFly'
    }];

    it('turns an array to a keyed map', () => {
      expect(keyIndexArray(arr, 'name')).to.eql({
        Marty: { id: '1234', name: 'Marty' },
        McFly: { id: '5432', name: 'McFly' }
      });
    });

    it('uses id by default', () => {
      expect(keyIndexArray(arr)).to.eql({
        '1234': { id: '1234', name: 'Marty' },
        '5432': { id: '5432', name: 'McFly' }
      });
    });
  });
});