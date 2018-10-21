
export const fromPairs = pairs =>
    pairs.reduce((acc, [ k, v ]) => ({ ...acc, [k]: v }), {});

export const createMethod = method =>
    (...args) => obj =>
        obj[method].apply(obj, args);

export const getMethods = Class =>
    !Class || !Class.prototype
        ? []
        : Object.getOwnPropertyNames(Class.prototype)
            .filter(key => key !== 'constructor')
            .filter(key => Class.prototype[key] instanceof Function);
