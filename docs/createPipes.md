
# createPipes
This function allows you to create curried functions (pipes) from a list of function names

```haskell
createPipes :: [String] -> Object ((...args: [*]) -> (o: *) -> *);
```

## Example

#### Extract out methods
```js
import { createPipes } from 'pipey';

const { map, filter } = createPipes(['map', 'filter']);

const doubleOddNumbers = compose(map(x => x * 2), filter(x => x % 2));

doubleOddNumbers([ 2, 3, 4, 5 ]); // Returns [ 6, 10 ]
```


#### Using with the pipeline operators
```js
const { map, filter } = createPipes(['map', 'filter']);

const getInputData = () =>
  document.querySelectorAll('.js-input')
    |> Array.from
    |> map($input => [ $input.name, $input.value ])
    |> filter(([_, value]) => value)
    |> Object.fromEntries;

getInputData(); // Returns something like { email: 'han.solo@gmail.com', name: 'Han Solo' }
```

