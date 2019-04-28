
# Proxy based api
A proxy based alternative api for pipey.

This will generate the required methods on runtime using the [`Proxy` api](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

Because this uses the `Proxy` api with dynamic properties, you have to use [`babel-plugin-proxy`](https://www.npmjs.com/package/babel-plugin-proxy) to extend support to older browsers.

This api allows you to use functions without defining them explicitly with an api that looks a lot like `lodash-fp`
```js
import { compose } from 'pipey';
import _ from 'pipey/proxy';

const getInitials = compose(
  _.join(''),
  _.map(_.charAt(0)),
  _.split(' '),
  _.$prop('name'), // $prop is a pre-defined plugin
);

getInitials({ name: 'Akshay Nair' }) === 'AN';
```


## Plugins

#### `$prop` plugin
```js
import _ from 'pipey/proxy';

const getUserCity = user => user
  |> _.$prop('addresses')
  |> _.$prop(0)
  |> _.$prop('city');

const city = getUserCity({
  name: 'Yoyo',
  addresses: [
    { city: 'Gotham' },
    { city: 'Wowo' },
  ],
});

city === 'Gotham'
```

#### Define a custom plugin
```js
import { definePlugin } from 'pipey/proxy';

// Custom plugin that doesn't do anything (identity plugin)
definePlugin(
  methodName => methodName === '$id',
  (_, value) => value,
);
```


## Example

#### Simple example
```js
import { compose } from 'pipey';
import _ from 'pipey/proxy';

const doubleOddNumbers = compose(_.map(x => x * 2), _.filter(x => x % 2));

doubleOddNumbers([ 2, 3, 4, 5 ]); // Returns [ 6, 10 ]
```


#### Using with the pipeline operators
```js
const getInputData = () =>
  document.querySelectorAll('.js-input')
    |> Array.from
    |> _.map($input => [ $input.name, $input.value ])
    |> _.filter(([_, value]) => value)
    |> Object.fromEntries;

getInputData(); // Returns something like { email: 'han.solo@gmail.com', name: 'Han Solo' }
```

