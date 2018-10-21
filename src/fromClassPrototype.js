
import createPipes from './createPipes';
import { getMethods } from './utils';

const fromClassPrototype = Class => {
    return createPipes(getMethods(Class));
};

export default fromClassPrototype;
