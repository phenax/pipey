
// compose :: (...Function) -> Function
export const compose = (...fns) =>
    fns.reduce((a, b) => (...args) => a(b(...args)));

// getMethods :: Class -> [String]
export const getMethods = Class =>
    Object.getOwnPropertyNames((Class || {}).prototype || {})
        .filter(key => (
            key !== 'constructor' &&
            Class.prototype[key] instanceof Function
        ));
