
// compose :: (...Function) -> Function
export const compose = (...fns) =>
    fns.reduce((a, b) => (...args) => a(b(...args)));

// fromPairs :: [[String, b]] -> Object b
export const fromPairs = pairs =>
    pairs.reduce((acc, [ k, v ]) => ({ ...acc, [k]: v }), {});

// getMethods :: Class -> [String]
export const getMethods = Class =>
    Object.getOwnPropertyNames((Class || {}).prototype || {})
        .filter(key => (
            key !== 'constructor' &&
            Class.prototype[key] instanceof Function
        ));
