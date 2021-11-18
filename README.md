# Ordered Fast Lookup Map
Map with order functionality, providing fast look ups and ordering in the same time wiht ```O(n)``` complexity. Newer TS implementation.

## Installation
```npm install ordered-fast-lookup-map```

### Test
```npm run test```.

## Usage

### Compatibility mode

```
var orderedMap = require("ordered-fast-lookup-map")
var userMap = new orderedMap();
```

### TS
We are now providing the types in the lib. 

## Migration / Example use
New TS implementation should work as provious v1.1.2 when accessed through `require`. It assumes `OrderedTyoedFastLookupMap<any>` with default validator that throws error only when you try to set `undefined`. Also the `key` is always forced to be a string in the map (this might be breaking for some).

```
import { OrderedTyoedFastLookupMap, OrderedFastLookupMap } from "../lib";

// this is equivalent to const oflm = new OrderedFastLookupMapconst oflm = new OrderedTyoedFastLookupMap<any[]>([`1`], [[{ "a": 1 }]]);
const oflm = new OrderedTyoedFastLookupMap<any[]>([`1`], [[{ "a": 1 }]]);

console.log(oflm._array) // ["1"];
constole.log(oflm.map); // { "1": [{ "a": 1 }] }
```


when imported in TS should allow for strict controll of storred types, and the `validator` method. validator now can `throw(default)` or return `true/false`. 

```
import { OrderedTyoedFastLookupMap } from "../lib";

class testClass {
    constructor(public x: string) { }
}

class testClassWrong {
    constructor(public x: string) { }
}


const foo = new testClass('bar');
const noo = new testClass('bar');

// adds foo t map
const oflm =  new OrderedTyoedFastLookupMap<testClass>([1], foo);

...

// silently fails to add and just intiates the map
const fail = new OrderedTyoedFastLookupMap<testClass>([1], noo);

...

// changes default validator
const validator = (val) => {
    if (!(<any>val instanceof testClass)) {
        return false;
    }
    return true;
}

// silently fails to add and just intiates the map
const oflmValidatr = new OrderedTyoedFastLookupMap<testClass>([1], <testClass>noo, validator);
```



