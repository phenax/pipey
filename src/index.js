import { getMethods, fromPairs, compose, createMethod } from './utils';

// type Accessor = (a) -> Object ((a) -> b) -> b
// type Class = Function

// createPipe :: String -> Accessor
export const createPipe = method => (...args) => obj => obj[method].apply(obj, args);

// This is beautiful. My library in action.
const map = createPipe('map');
const filter = createPipe('filter');

// createPipes :: [String] -> Object Accessor
export const createPipes = compose(
    fromPairs,
    map(method => [method, createPipe(method)]),
    filter(Boolean),
);

// fromClassPrototype :: Class -> Accessors
export const fromClassPrototype = compose(createPipes, getMethods);

export { compose };
