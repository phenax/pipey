
const customPlugins = [];

function evaluate(prop, obj, ...args) {
  for (let { pred, evaluator } of customPlugins) {
    if (pred(prop, obj, ...args)) {
      return evaluator(prop, obj, ...args);
    }
  }

  if (typeof obj[prop] !== 'function') throw new Error(`${prop} is not a method in ${obj}`);
  return obj[prop](...args);
}

const pipey = new Proxy({}, {
  get: (_, prop) => (...args) => obj => evaluate(prop, obj, ...args),
});

export function definePlugin(pred, evaluator) {
  customPlugins.push({ pred, evaluator });
};

definePlugin(key => key === '$prop', (_, obj, key) => obj[key]);

export default pipey;
