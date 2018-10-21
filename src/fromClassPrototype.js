
import createPipes from './createPipes';
import { getMethods } from './utils';

// fromClassPrototype :: Class -> Accessors
const fromClassPrototype = Class => createPipes(getMethods(Class));

export default fromClassPrototype;
