
import { fromPairs, createMethod } from './utils';

// createPipes :: [String] -> Object Function
const createPipes = methods =>
    fromPairs(methods.filter(Boolean).map(method => [ method, createMethod(method) ]));

export default createPipes;
