# Ordered Fast Lookup Map

Map with order functionality, providing fast look ups and ordering in the same time with `O(n)` complexity. Newer TS implementation. DeepClones with typesafety. Customizable validator/marshaller and deepClone available.

## Installation

`npm install ordered-fast-lookup-map`

## Usage

### Compatibility mode

Runs with default `validator` and `deepClone` set to `false`;

```
var orderedMap = require("ordered-fast-lookup-map")
var userMap = new orderedMap();
```

### TS / Types

We are now providing the types in the lib.

# Available methods

## Constructor

- `constructor(keys?: NumberOrString[] | number[], values?: T[], options: IOFMLoptions<T> = { deepClone: false })` - when supplied with `keys` and `values` initiates
  structure and perform `push` on pair of keys. Exampple:` var hashMap = OrderedTyoedFastLookupMap<string>([1,2,3],["a","b","c"]);`. Additionally `options:IOFMLoptions` object can be passed, to set custom validator, to set deep clone and provide custom deep link handler.

## Add methods

- `set(key: NumberOrString, value: T)` sets the value on the end of structure
- `push(key: NumberOrString, value: T)` alias for set
- `unshift(key: NumberOrString, value: T)` sets the value on the beginning of structure
- `arbitrarySetAfter(afterKey: NumberOrString, key: NumberOrString, value: T)`sets the value after arbitrary supplied keys. If the arbitrary key is
  not found it throws `Error`.
- `arbitrarySetBefore(beforeKey: NumberOrString, key: NumberOrString, value: T)`sets the value before arbitrary supplied keys. If the arbitrary key is
  not found it throws `Error`.

Note if inserting `undefined` any method will throw exception. Please use null instead. Or change the `validator` methods. Validator now can either `throw` or return `true/false`. This applies to all places where method is marked as throwable

## Remove & Retrieve methods

- `remove(key: NumberOrString)` remove arbitrary value on the key. If the arbitrary key is not found it throws`Error`.
- `pop(): T` returns last element of structure and removes it. If list is empty returns `undefined`
- `shift(): T` returns first element of structure and removes it. If list is empty returns `undefined`
- `get(key: NumberOrString): T` returns value on the key without deleting it (return reference). If element is not found returns `undefined`
- `has(key: NumberOrString): boolean` checks if key exists (`true/false`)

## Iteration Methods

- `forEach(callback: IteratorCallback<T>): void` for each element in `asc` order executes user supplied `function(index,value,validatorFunction)`.
  To break in user function return `true`. We are now exposing the validator method out.
- `forEachReverse(callback: IteratorCallback<T>): void`for each element in `desc` order executes user supplied `function(index,value,validatorFunction)`.
  To break in user function return `true`. We are now exposing the validator method out.

## Validator and deepClone

- `private validator(value: T): void | boolean` by default, throws error is value is `undefined`. Can be replaced with `IOFMLoptions`

- `private deepCloneMethod(val: T): T` when deepClone is set to `true` (by default is `false`) this gets executed to clone object with keeping the `constructor.name` to preserve es6 object type/instance type. Can be replaced with `IOFMLoptions`

<br><hr/><br>

## Inhouse types

```
type IteratorCallback<T> = (key: string, value: T, validator: IValidatorFunction<T>) => boolean;
type IValidatorFunction<T> = (value: T) => void | boolean;
type IDeepCloneFunction<T> = (value: T) => T;
type NumberOrString = string | number;

type IOFMLoptions<T> = {
    validator?: IValidatorFunction<T>
    deepClone?: boolean // default to false
    deepCloneMethod?: IDeepCloneFunction<T>

}
```

<br><hr/><br>

## Migration / Example use

New TS implementation should work as previous v1.1.2 when accessed through `require`. It assumes `OrderedTyoedFastLookupMap<any>` with default validator that throws error only when you try to set `undefined`. Also the `key` is always forced to be a string in the map (this might be breaking for some).

```
import { OrderedTypedFastLookupMap, OrderedFastLookupMap } from "ordered-fast-lookup-map/lib";

// this is equivalent to const oflm = new OrderedFastLookupMap([`key`], [[{ "foo": "bar" }]]);
const oflm = new OrderedTypedFastLookupMap<any[]>([`key`], [[{ "foo": "bar" }]]);

console.log(oflm._array) // ["key"];
console.log(oflm.map); // { "key": [{ "foo": "bar" }] }
```

when imported in TS should allow for strict control of stored types, and the `validator` method. validator now can `throw(default)` or return `true/false`.
<br><br>

```
import { OrderedTyoedFastLookupMap, IOFMLoptions } from "../lib";

class testClass {
    constructor(public x: string) { }
}

class testClassWrong {
    constructor(public x: string) { }
}


const foo = new testClass('bar');
const noo = new testClassWrong('bar');

// adds foo t map
const oflm =  new OrderedTyoedFastLookupMap<testClass>([1], foo);

...

// ts error
const fail = new OrderedTyoedFastLookupMap<testClass>([1], noo);

...

// silently fails to add and just intiates the map
const fail = new OrderedTyoedFastLookupMap<testClass>([1], <any>noo);

...

// changes default validator
const opts: IOFMLoptions<testClass> = {
    validator: (val) => {
        if (!(<any>val instanceof testClass)) {
            return false;
        }
        return true;
    }
};


// silently fails to add and just intiates the map
const oflmValidatr = new OrderedTyoedFastLookupMap<testClass>([1], <testClass>noo, opts);

...

// changes default validator
const opts: IOFMLoptions<testClass> = {
    validator: (val) => {
        return true;
    }
};


// This will allow to create testClassWrong in the map and ignore marshalling
// checks, ts still will assumed the templated type
const oflmValidatr = new OrderedTyoedFastLookupMap<testClass>([1], <testClass>noo, opts);

...

const opts: IOFMLoptions<testClass> = {
    // deepCloneMethod <====== hookup custom method
    deepClone: true,
    validator: (val) => {
        if (!(<any>val instanceof testClass)) {
            return false;
        }
        return true;
    }
};

```
