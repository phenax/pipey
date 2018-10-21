
// type Accessors = Object Function
// type Class = Function

import { getMethods, fromPairs, createMethod } from './utils';

// createPipes :: [String] -> Accessors
export const createPipes = methods =>
    fromPairs(
        methods
            .filter(Boolean)
            .map(method => [ method, createMethod(method) ])
    );

// fromClassPrototype :: Class -> Accessors
export const fromClassPrototype = Class =>
    createPipes(getMethods(Class));
