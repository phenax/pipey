
# fromClassPrototype
This function allows you to extract all methods of a class to curried functions.

```haskell
fromClassPrototype :: Function -> Object ((...args: [*]) -> (o: *) -> *);
```

## Example

#### Extract out methods
```js
import { fromClassPrototype } from 'pipey';

const { map, filter } = fromClassPrototype(Array);

const doubleOddNumbers = compose(map(x => x * 2), filter(x => x % 2));

doubleOddNumbers([ 2, 3, 4, 5 ]); // Returns [ 6, 10 ]
```


#### Using with the pipeline operators
```js
const { map, filter } = fromClassPrototype(Array);

const getInputData = () =>
  document.querySelectorAll('.js-input')
    |> Array.from
    |> map($input => [ $input.name, $input.value ])
    |> filter(([_, value]) => value)
    |> Object.fromEntries;

getInputData(); // Returns something like { email: 'han.solo@gmail.com', name: 'Han Solo' }
```

