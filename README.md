
# Pipey
Utility functions to convert class-based api's to parameter-based functions compatible with functional point-free style of programming.

[![CircleCI](https://img.shields.io/circleci/project/github/phenax/pipey/master.svg?style=for-the-badge)](https://circleci.com/gh/phenax/pipey)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/pipey.svg?style=for-the-badge)](https://www.npmjs.com/package/pipey)
[![Codecov](https://img.shields.io/codecov/c/github/phenax/pipey.svg?style=for-the-badge)](https://codecov.io/gh/phenax/pipey)


[Read the documentation for more information](https://github.com/phenax/pipey/tree/master/docs)

## Install

#### To add the project to your project
```bash
yarn add pipey
```

## Usage

#### Import it to your file
```js
import { createPipes, fromClassPrototype } from 'pipey';
```

#### createPipes

```js
const { bork } = createPipes([ 'bork' ]);

const dog = {
    name: 'Doge',
    bork(bork) {
        return `${this.name} ${bork}!`.toUpperCase();
    },
};

bork('Bork')(dog) // returns 'DOGE BORK!'
```

#### fromClassPrototype

```js

class Dog {
    constructor(name) {
        this.name = name;
    }

    bork(borkSound) {
        return `${this.name} ${borkSound}!`.toUpperCase();
    }
}

const { bork } = fromClassPrototype(Dog);

const dog = new Dog('Doge');

bork('Bork')(dog) // returns 'DOGE BORK!'
```

#### Using with collection methods

* Working with dom methods
```js
import fromClassPrototype from 'pipey/fromClassPrototype';

const { setAttribute } = fromClassPrototype(HTMLInputElement);
const inputs = ['.js-input-name', '.js-input-email'];

inputs
    .map(selector => document.querySelector(selector))
    .forEach(setAttribute('disabled', 'disabled'));
```
