'use strict';

class OrderedFastLookupMap {
    constructor(keys, values) {
        var self = this;
        //console.log('constructor', keys, values);
        this.map = {};
        this._array = [];

        try {
            keys.forEach(function(index, val) {
                self.push(keys[val], values[val]);
            });
        } catch (e) {
            //init empty
        }
    }

    /***============================================ ADD Methods ***/

    /** @brief method to set new value in the map
     *
     * @param key
     * @param value
     */
    set(key, value) {
        this.undefinedCheck(value);

        if (key in this.map) { // if already exists
            this.map[key] = value;
        } else { // insert new key and value
            this._array.push(key);
            this.map[key] = value;
        }
    }

    /** @brief alias to set - insert on the end */
    push(key, value) {
        this.undefinedCheck(value);

        this.set(key, value);
    }

    /** @brief adding the value on the start of map
     *
     * @param key
     * @param value
     */
    unshift(key, value) {
        this.undefinedCheck(value);

        if (key in this.map) {
            this.map[key] = value;
        } else { // insert new key and value
            this._array.unshift(key);
            this.map[key] = value;
        }
    }

    /** @brief insert to map after given key
     *
     * @param afterKey
     * @param key
     * @param value
     */
    arbitrarySetAfter(afterKey, key, value) {
        this.undefinedCheck(value);

        let afterIndex = this._array.indexOf(afterKey) + 1;
        if (afterIndex == -1) {
            throw new Error('key does not exist');
        }
        this._array.splice(afterIndex, 0, key);
        this.map[key] = value;
    }

    /** @brief insert to map before given key
     *
     * @param beforeKey
     * @param key
     * @param value
     */
    arbitrarySetBefore(beforeKey, key, value) {
        this.undefinedCheck(value);

        let beforeIndex = this._array.indexOf(beforeKey);
        if (beforeIndex == -1) {
            throw new Error('key does not exist');
        }
        this._array.splice(beforeIndex, 0, key);
        this.map[key] = value;
    }

    /***========================================= REMOVE Methods ***/

    /** @brief removing element from map
     *
     * @param key
     */
    remove(key) {
        let index = this._array.indexOf(key);
        if (index == -1) {
            throw new Error('key does not exist');
        }
        this._array.splice(index, 1);
        delete this.map[key];
    }

    /** @brief works on map as array.pop()
     *
     * @returns {*}
     */
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

    /***====================================== RETRIEVE Methods ***/

    /** @brief get entry with particular hey
     *
     * @param key
     * @returns {*}
     */
    get(key) {
        try {
            if (this.map[key] !== undefined) {
                return this.map[key];
            } else {
                return undefined;
            }
        } catch (e) {
            return undefined;
        }
    }

    /** @brief checking if key exists
     *
     * @param key
     * @returns {*}
     */
    has(key) {
        try {
            if (this.map[key] !== undefined) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    }


    /***====================================== ITERATION Methods ***/

    /** @brief iteration method over map
     *
     * @param callback callback function(key, value)
     */
    forEach(callback) {
        let key, value;
        for (var i = 0; i < this._array.length; i++) {
            key = this._array[i];
            value = this.map[key];

            let breakFlag = callback(key, value);
            if (breakFlag) {
                return;
            }
        }
    };

    /** @brief backwards iterator
     *
     * @param callback
     */
    forEachReverse(callback) {
        let key, value;
        for (var i = this._array.length - 1; i >= 0; i--) {
            key = this._array[i];
            value = this.map[key];

            let breakFlag = callback(key, value);
            if (breakFlag) {
                return;
            }
        }
    };

    /***====================================== CHECK Methods ***/
    undefinedCheck(value) {
        if (value === undefined) {
            throw new Error('Can not insert undefined. If you need empty entry use null isntead');
        }
    }

}

module.exports = OrderedFastLookupMap;