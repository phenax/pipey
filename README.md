
# Pipey
Utility functions to convert instance methods's to context-free functions ready for use with [esnext pipeline operator](https://github.com/tc39/proposal-pipeline-operator) and point-free functional programming. Convert any `x => x.whatever(...args)` to `whatever(...arg)(x)`.

[![CircleCI](https://img.shields.io/circleci/project/github/phenax/pipey/master.svg?style=for-the-badge)](https://circleci.com/gh/phenax/pipey)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/pipey.svg?style=for-the-badge)](https://www.npmjs.com/package/pipey)
[![Codecov](https://img.shields.io/codecov/c/github/phenax/pipey.svg?style=for-the-badge)](https://codecov.io/gh/phenax/pipey)


[Read the documentation for more information](https://github.com/phenax/pipey/tree/master/docs)


### Install it
```bash
yarn add pipey
```

### Import it to your file
```js
import { createPipe, createPipes, fromClassPrototype, compose } from 'pipey';
// Note: compose is a regular lodash-like compose function

import _ from 'pipey/proxy'; // For proxy-based api
```

### fromClassPrototype
```js
const { map, filter } = fromClassPrototype(Array);

const doubleNumbers = map(x => x * 2);
const doubleOddNumbers = compose(doubleNumbers, filter(x => x % 2));

doubleOddNumbers([ 2, 3, 4, 5 ]); // Returns [ 6, 10 ]
```

### createPipe
```js
const forEach = createPipe('forEach');
forEach(x => console.log(x))([ 1, 2, 3, 4 ]); // Logs 1 2 3 4
```

### createPipes
```js
const { map, filter, split } = createPipes(['map', 'filter', 'split']);
const head = ([ first ]) => first;
const compact = filter(Boolean);

const getFirstNames = names =>
  names
    |> compact
    |> map(split(' '))
    |> map(head);

getFirstNames([ '', null, 'Akshay Nair', 'John Doe', 'Bruce Fucking Lee' ]); // Returns ['Akshay', 'John', 'Bruce']
```

### Proxy based api
A proxy based alternative api for pipey
[Read the documentation](https://github.com/phenax/pipey/tree/master/docs/proxy.md)

```js
import _ from 'pipey/proxy';

const getInitials = compose(
  _.join(''),
  _.map(_.charAt(0)),
  _.split(' '),
  _.$prop('name'), // $prop is a pre-defined plugin
);

getInitials({ name: 'Akshay Nair' }) === 'AN';
```

### Example use cases

* Using with the amazing pipe operator
```js
const { map, filter, reduce } = fromClassPrototype(Array);

const getInputData = () =>
  document.querySelectorAll('.js-input')
    |> map($input => [ $input.name, $input.value ])
    |> filter(([_, value]) => value)
    |> Object.fromEntries
    |> Array.from;

getInputData(); // Returns something like { email: 'han.solo@gmail.com', name: 'Han Solo' }
```

* Working with collection methods
```js
// Two ways to extract methods out (createPipes & fromClassPrototype)
const { map, filter } = fromClassPrototype(Array);
const { split } = createPipes(['split']);

const getFirstNames = compose(
  map(xs => xs[0]),
  map(split(' ')),
  filter(Boolean),
);

getFirstNames([ '', null, 'Akshay Nair', 'John Doe', 'Bruce Fucking Lee' ]); // Returns ['Akshay', 'John', 'Bruce']
```


* Working with dom methods
```js
const { forEach, join } = fromClassPrototype(Array);
const { setAttribute } = fromClassPrototype(HTMLInputElement);
const inputs = ['.js-input-name', '.js-input-email'];

inputs
  |> join(', ')
  |> (selector => document.querySelectorAll(selector))
  |> forEach(setAttribute('disabled', 'disabled'));
```
