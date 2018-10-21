
export const fromPairs = pairs =>
pairs.reduce((acc, [ k, v ]) => ({ ...acc, [k]: v }), {});

export const createMethod = method => (...args) => obj => obj[method].apply(obj, args);
