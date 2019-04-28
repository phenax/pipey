import { compose } from '../src/utils';
import _ from '../src/proxy';

describe('Proxy api', () => {

  it('should return a 2 arity curried function',  () => {
    const words = _.split(' ');
    expect(words('Hello world')).toEqual(['Hello', 'world']);
  });

  it('should compose well',  () => {
    const slugifyAll = _.map(compose(_.join('-'), _.split(' ')));
    expect(slugifyAll([ 'Hello world', 'nicety nice' ])).toEqual([ 'Hello-world', 'nicety-nice' ]);
  });

  it('should work in cobination', () => {
    const getInitials = compose(
      _.join(''),
      _.map(_.charAt(0)),
      _.split(' '),
      _.$prop('name'),
    );

    expect(getInitials({ name: 'Hello World' })).toBe('HW');
  });

  describe('Plugin - $props', () => {
    it('should select prop from a given object', () => {
      const getName = _.$prop('name');
      expect(getName({ name: 'Hello' })).toEqual('Hello');
    });

    it('should select length from a given array', () => {
      const getLength = _.$prop('length');
      expect(getLength([ 1, 2, 3, 4 ])).toEqual(4);
    });

    it('should select prop from a undefined', () => {
      const getName = _.$prop('name', 'Myname');
      expect(getName(undefined)).toEqual('Myname');
      expect(getName({})).toEqual('Myname');
    });
  });
});

