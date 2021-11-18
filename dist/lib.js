"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderedFastLookupMap = exports.OrderedTyoedFastLookupMap = void 0;
class OrderedTyoedFastLookupMap {
    constructor(keys, values, validator) {
        this.map = {};
        this._array = [];
        if (validator && validator instanceof Function) {
            this.validator = validator.bind(this);
        }
        for (const keyIndex in keys) {
            try {
                this.push(keys[keyIndex], values[keyIndex]);
            }
            catch (_) {
            }
        }
    }
    validator(value) {
        if (value === undefined) {
            throw new Error('Can not insert undefined. If you need empty entry use null isntead');
        }
    }
    set(key, value) {
        const check = this.validator(value);
        if (check === true || check === undefined) {
            if (`${key}` in this.map) {
                this.map[`${key}`] = value;
            }
            else {
                this._array.push(`${key}`);
                this.map[`${key}`] = value;
            }
        }
    }
    push(key, value) {
        this.set(key, value);
    }
    unshift(key, value) {
        const check = this.validator(value);
        if (check === true || check === undefined) {
            if (`${key}` in this.map) {
                this.map[`${key}`] = value;
            }
            else {
                this._array.unshift(`${key}`);
                this.map[`${key}`] = value;
            }
        }
    }
    arbitrarySetAfter(afterKey, key, value) {
        const check = this.validator(value);
        if (check === true || check === undefined) {
            let afterIndex = this._array.indexOf(`${afterKey}`) + 1;
            if (afterIndex == -1) {
                throw new Error('key does not exist');
            }
            this._array.splice(afterIndex, 0, `${key}`);
            this.map[`${key}`] = value;
        }
    }
    arbitrarySetBefore(beforeKey, key, value) {
        const check = this.validator(value);
        if (check === true || check === undefined) {
            let beforeIndex = this._array.indexOf(`${beforeKey}`);
            if (beforeIndex == -1) {
                throw new Error('key does not exist');
            }
            this._array.splice(beforeIndex, 0, `${key}`);
            this.map[`${key}`] = value;
        }
    }
    remove(key) {
        let index = this._array.indexOf(`${key}`);
        if (index == -1) {
            throw new Error('key does not exist');
        }
        this._array.splice(index, 1);
        delete this.map[`${key}`];
    }
    pop() {
        let index = this._array.length;
        if (index == -1) {
            return undefined;
        }
        let returnTmp = this.map[this._array[index - 1]];
        delete this.map[this._array[index - 1]];
        this._array.splice(index - 1, 1);
        return returnTmp;
    }
    shift() {
        let index = 1;
        if (this._array.length == 0) {
            return undefined;
        }
        let returnTmp = this.map[this._array[index - 1]];
        delete this.map[this._array[index - 1]];
        this._array.splice(index - 1, 1);
        return returnTmp;
    }
    get(key) {
        try {
            if (this.map[`${key}`] !== undefined) {
                return this.map[`${key}`];
            }
            else {
                return undefined;
            }
        }
        catch (e) {
            return undefined;
        }
    }
    has(key) {
        try {
            if (this.map[`${key}`] !== undefined) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (e) {
            return false;
        }
    }
    forEach(callback) {
        let key, value;
        for (var i = 0; i < this._array.length; i++) {
            key = this._array[i];
            value = this.map[`${key}`];
            const breakFlag = callback(key, value, this.validator.bind(this));
            if (breakFlag) {
                return;
            }
        }
    }
    ;
    forEachReverse(callback) {
        let key, value;
        for (var i = this._array.length - 1; i >= 0; i--) {
            key = this._array[i];
            value = this.map[`${key}`];
            const breakFlag = callback(key, value, this.validator.bind(this));
            if (breakFlag) {
                return;
            }
        }
    }
    ;
}
exports.OrderedTyoedFastLookupMap = OrderedTyoedFastLookupMap;
class OrderedFastLookupMap extends OrderedTyoedFastLookupMap {
    constructor(keys, values, validator) {
        super(keys, values, validator);
    }
}
exports.OrderedFastLookupMap = OrderedFastLookupMap;
//# sourceMappingURL=lib.js.map