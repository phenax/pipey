
// compose :: (...Function) -> Function
export const compose = (...fns) =>
    fns.reduce((a, b) => (...args) => a(b(...args)));
// map :: (a -> b) -> [a] -> [b]
export const map = fn => arr => arr.map(fn);
// filter :: (a -> Bool) -> [a] -> [a]
export const filter = fn => arr => arr.filter(fn);

// fromPairs :: [[String, b]] -> Object b
export const fromPairs = pairs =>
    pairs.reduce((acc, [ k, v ]) => ({ ...acc, [k]: v }), {});

// createMethod :: String -> (...*) -> * -> *
export const createMethod = method =>
    (...args) => obj =>
        obj[method].apply(obj, args);

// isFunction :: * -> Bool
const isFunction = fn => fn && fn instanceof Function;

const isMethod = Class => key =>
    key !== 'constructor' && isFunction(Class.prototype[key]);

// getMethods :: Class -> [String]
export const getMethods = Class =>
    !Class || !Class.prototype
        ? []
        : compose(
            filter(isMethod(Class)),
            Object.getOwnPropertyNames,
        )(Class.prototype);
