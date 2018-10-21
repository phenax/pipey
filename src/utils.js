
// fromPairs :: [[String, b]] -> Object b
export const fromPairs = pairs =>
    pairs.reduce((acc, [ k, v ]) => ({ ...acc, [k]: v }), {});

// createMethod :: String -> (...*) -> * -> *
export const createMethod = method =>
    (...args) => obj =>
        obj[method].apply(obj, args);

// getMethods :: Class -> [String]
export const getMethods = Class =>
    !Class || !Class.prototype
        ? []
        : Object.getOwnPropertyNames(Class.prototype)
            .filter(key => key !== 'constructor')
            .filter(key => Class.prototype[key] instanceof Function);
