# Ordered Fast Lookup Map
Map with order functionality, providing fast look ups and ordering in the same time wiht ```O(n)``` complexity. 

## Requirements
Was written on ```4.4.0``` and is using some of the es6 features:
* ```Class```
* ```let```

## Installation
```npm install ordered-fast-lookup-map```

## Testing

### Dev Dependecies
* ```mocha```
* ```expect```

### Test
Run ```mocha``` or ```npm run test```.

## Usage
```
var orderedMap = require("ordered-fast-lookup-map")
var userMap = new orderedMap();
```

## Available methods

### Constructor
* ```constructor([keysArray,valuesArrays])``` - when supplied with ```keysArray``` and ```valuesArrays``` initiates
structure and perform ```push``` on pair of keys. Exampple:``` var hashMap = orderedMap([1,2,3],["a","b","c"]);```

### Add methods
* ```set(key,value)``` sets the value on the end of structure
* ```push(key,value)``` alias for set
* ```unshift(key, value)``` sets the value on the beginning of structure
* ```arbitrarySetAfter(afterKey, key, value)```sets the value after arbitrary supplied keys. If the arbitrary key is
not found it throws ```Error```.
* ```arbitrarySetBefore(beforeKey, key, value)```sets the value before arbitrary supplied keys. If the arbitrary key is
not found it throws ```Error```.

### Remove & Retrieve methods 
* ```remove(key)``` remove arbitrary value on the key. If the arbitrary key is not found it throws```Error```.
* ```pop()``` returns last element of structure and removes it. If list is empty returns ```undefined```
* ```shift()``` returns first element of structure and removes it. If list is empty returns ```undefined```
* ```get(key)``` returns value on the key without deleting it (return reference). If the arbitrary key is not
found it throws ```Error```.
* ```has(key)``` checks if key exists (```true/false```)

### Iteration Methods
* ```forEach(callback)``` for each element in ```asc``` order executes user supplied ```function(index,value)```.
To break in user function return ```true```.
* ```forEachReverse(callback)```for each element in ```desc``` order executes user supplied ```function(index,value)```.
To break in user function return ```true```.


## Future Work
* Async callback iterations
* Promise iterations
* weakGet
* first
* last
* length
* merge
