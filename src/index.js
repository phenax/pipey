
// type Accessors = Object Function
// type Class = Function

import { getMethods, fromPairs, createMethod, compose, map, filter } from './utils';

export const P = (value, { fns = [] } = {}) => ({
    pipe: fn => P(value, { fns: fns.concat([fn]) }),
    getValue: () => compose(...fns.reverse())(value),
});

// createPipes :: [String] -> Accessors
export const createPipes = compose(
    fromPairs,
    map(method => [ method, createMethod(method) ]),
    filter(Boolean),
);

// fromClassPrototype :: Class -> Accessors
export const fromClassPrototype = compose(
    createPipes,
    getMethods,
);

export { compose };
