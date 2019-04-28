# Pipey

Utility functions to convert instance methods's to context-free functions ready for use with [esnext pipeline operator](https://github.com/tc39/proposal-pipeline-operator) and point-free functional programming. Convert any `x => x.whatever(1, '2', 3)` to `whatever(1, '2', 3)(x)`.


## Install it
```bash
yarn add pipey
```

## Import it to your file

```js
import { createPipe, createPipes, fromClassPrototype, compose } from 'pipey';
// Note: compose is a regular lodash-like compose function
```

For the proxy-based alternate api
```js
import _ from 'pipey/proxy';
```

## API Reference

* [fromClassPrototype](./docs/fromClassPrototype.md)
* [createPipe](./docs/createPipe.md)
* [createPipes](./docs/createPipes.md)
* [Proxy based api](./docs/proxy.md)
