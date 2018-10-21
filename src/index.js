
// type Accessors = Object Function
// type Class = Function

import { getMethods, fromPairs, createMethod } from './utils';

// createPipes :: [String] -> Accessors
export const createPipes = methodNames => fromPairs(
    methodNames
        .filter(Boolean)
        .map(method => [
            method,
            (...args) => obj => obj[method].apply(obj, args),
        ])
);

// fromClassPrototype :: Class -> Accessors
export const fromClassPrototype = Class => createPipes(getMethods(Class));
