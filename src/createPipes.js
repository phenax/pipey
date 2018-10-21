
import { fromPairs, createMethod } from './utils';

// createPipes :: [String] -> Accessors
const createPipes = methods =>
    fromPairs(
        methods
            .filter(Boolean)
            .map(method => [ method, createMethod(method) ])
    );

export default createPipes;
