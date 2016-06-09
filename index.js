'use strict';

class OFLM {
    constructor(keys, values) {
        var self = this;
        //console.log('constructor', keys, values);
        this.map = {};
        this._array = [];

        try {
            keys.forEach(function (index, val) {
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
        if (key in this.map) { // if already exists
            this.map[key] = value;
        } else { // insert new key and value
            this._array.push(key);
            this.map[key] = value;
        }
    }

    /** @brief alias to set - insert on the end */
    push(key, value) {
        this.set(key, value);
    }

    /** @brief adding the value on the start of map
     *
     * @param key
     * @param value
     */
    unshift(key, value) {
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
        let afterIndex = this._array.indexOf(afterKey) + 1;
        if (afterIndex == -1) {
            throw new Error('key does not exist');
        }
        this._array.splice(afterIndex, 0, key);
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
            if (this.map[key]) {
                return this.map[key];
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    }

    /** @brief checking if key exists
     *
     * @param key
     * @returns {*}
     */
    has(key) {
        try {
            if (this.map[key]) {
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
     * @param f callback function(key, value)
     */
    forEach(f) {
        let key, value;
        for (var i = 0; i < this._array.length; i++) {
            key = this._array[i];
            value = this.map[key];

            let breakFlag = f(key, value);
            if (breakFlag) {
                return;
            }
        }
    };

    /** @brief backwards iterator
     *
     * @param f
     */
    forEachReverse(f) {
        let key, value;
        for (var i = this._array.length - 1; i >= 0; i--) {
            key = this._array[i];
            value = this.map[key];

            let breakFlag = f(key, value);
            if (breakFlag) {
                return;
            }
        }
    };
}

module.exports = function () {
    return OFLM;
};
