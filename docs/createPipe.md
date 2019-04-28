
# createPipe
This function allows you to create a curried function (pipe) from then method's name

```haskell
createPipe :: String -> (...args: [*]) -> (o: *) -> *;
```

## Example

#### Extract out methods
```js
import { createPipe } from 'pipey';

const map = createPipe('map');
const filter = createPipe('filter');

const doubleOddNumbers = compose(map(x => x * 2), filter(x => x % 2));

doubleOddNumbers([ 2, 3, 4, 5 ]); // Returns [ 6, 10 ]
```


#### Using with the pipeline operators
```js
const map = createPipe('map');
const filter = createPipe('filter');

const getInputData = () =>
  document.querySelectorAll('.js-input')
    |> Array.from
    |> map($input => [ $input.name, $input.value ])
    |> filter(([_, value]) => value)
    |> Object.fromEntries;

getInputData(); // Returns something like { email: 'han.solo@gmail.com', name: 'Han Solo' }
```

