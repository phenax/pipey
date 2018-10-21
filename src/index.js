
// type Accessors = Object Function
// type Class = Function

import { getMethods, fromPairs, createMethod, compose, map, filter } from './utils';

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
