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
* ```constructor([key,value])```

### Add methods
* ```set(key,value)```
* ```push(key,value)```
* ```unshift(key, value)```
* ```arbitrarySetAfter(afterKey, key, value)```

### Remove & Retrieve methods 
* ```remove(key)```
* ```pop()```
* ```shift()```
* ```get(key)```
* ```has(key)```

### Iteration Methods
* ```forEach(callback)```
* ```forEachReverse(callback)```


## Future Work
* Async callback iterations
* Promise iterations
