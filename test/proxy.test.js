import { compose } from '../src/utils';
import _ from '../src/proxy';

describe('Proxy api', () => {
  it('should work in cobination', () => {
    const getInitials = compose(
      _.join(''),
      _.map(([ h ]) => h),
      _.split(' '),
      _.$prop('name'),
    );

    expect(getInitials({ name: 'Hello World' })).toBe('HW');
  });
});

