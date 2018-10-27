import { getMethods, fromPairs, compose, createMethod } from './utils';

// type Accessor = (a) -> Object ((a) -> b) -> b
// type Class = Function

// createPipe :: String -> Accessor
export const createPipe = method => (...args) => obj => obj[method].apply(obj, args);

// createPipes :: [String] -> Object Accessor
export const createPipes = compose(
    fromPairs,
    x => x.map(method => [method, createPipe(method)]),
    x => x.filter(Boolean),
);

// fromClassPrototype :: Class -> Accessors
export const fromClassPrototype = compose(createPipes, getMethods);
