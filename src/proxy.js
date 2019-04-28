
const customPlugins = [];
export function definePlugin(pred, evaluator) {
  customPlugins.push({ pred, evaluator });
};

function evaluate(prop, obj, ...args) {
  for (let { pred, evaluator } of customPlugins)
    if (pred(prop, obj, ...args))
      return evaluator(prop, obj, ...args);

  if (typeof obj[prop] !== 'function')
    throw new Error(`${prop} is not a function in ${obj}`);
  return obj[prop](...args);
}

const pipey = new Proxy({}, {
  get: (_, prop) => (...args) => obj => evaluate(prop, obj, ...args),
});

definePlugin(
  key => key === '$prop',
  (_, obj, key, defaultVal) => obj !== undefined && key in obj ? obj[key] : defaultVal,
);

export default pipey;
