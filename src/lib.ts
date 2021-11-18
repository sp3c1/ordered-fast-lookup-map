export type IteratorCallback<T> = (key: string, value: T, validator: IValidatorFunction<T>) => boolean;
export type IValidatorFunction<T> = (value: T) => void | boolean;
export type IDeepCloneFunction<T> = (value: T) => T;
export type NumberOrString = string | number;

export type IOFMLoptions<T> = {
    validator?: IValidatorFunction<T>
    deepClone?: boolean // default to false
    deepCloneMethod?: IDeepCloneFunction<T>

}

export class OrderedTyoedFastLookupMap<T> {
    public map: { [k: string]: T } = {}
    public _array = [];
    private deepClone = false;

    constructor(keys?: NumberOrString[] | number[], values?: T[], options: IOFMLoptions<T> = { deepClone: false }) {
        this.deepClone = !!options?.deepClone;


        if (options?.validator instanceof Function) {
            this.validator = options.validator.bind(this);
        }

        if (options?.deepCloneMethod instanceof Function) {
            this.deepCloneMethod = options.deepCloneMethod.bind(this);
        }

        for (const keyIndex in keys) {
            try {
                this.push(keys[keyIndex], values[keyIndex])
            } catch (_) {
                // ignore
            }
        }

    }

    private validator(value: T): void | boolean {
        if (value === undefined) {
            throw new Error('Can not insert undefined. If you need empty entry use null isntead');
        }
    }

    /** @brief method to set new value in the map
     *
     * @param key
     * @param value
     */
    set(key: NumberOrString, value: T): void {
        const check = this.validator(value);

        if (check === true || check === undefined) {
            if (`${key}` in this.map) { // if already exists
                this.map[`${key}`] = this.deepCloneOrRef(value);
            } else { // insert new key and value
                this._array.push(`${key}`);
                this.map[`${key}`] = this.deepCloneOrRef(value);
            }
        }
    }

    private deepCloneMethod(val: T): T {
        try {
            // let ref = Object.assign(Object.create(Object.getPrototypeOf(val)), JSON.parse(JSON.stringify(val)));
            let ref = Object.assign(Object.create(Object.getPrototypeOf(val)), val);
            return ref;
        } catch (_) {
            return val;
        }
    }

    private deepCloneOrRef(val: T): T {
        if (this.deepClone && typeof val === 'object') {
            return this.deepCloneMethod(val);
        }

        return val;
    }

    /** @brief alias to set - insert on the end */
    push(key: NumberOrString, value: T): void {
        this.set(key, value);
    }

    /** @brief adding the value on the start of map
     *
     * @param key
     * @param value
     */
    unshift(key: string, value: T): void {
        const check = this.validator(value);

        if (check === true || check === undefined) {
            if (`${key}` in this.map) {
                this.map[`${key}`] = this.deepCloneOrRef(value);
            } else { // insert new key and value
                this._array.unshift(`${key}`);
                this.map[`${key}`] = this.deepCloneOrRef(value);
            }
        }
    }

    /** @brief insert to map after given key
     *
     * @param afterKey
     * @param key
     * @param value
     */
    arbitrarySetAfter(afterKey: NumberOrString, key: NumberOrString, value: T): void {
        const check = this.validator(value);

        if (check === true || check === undefined) {
            let afterIndex = this._array.indexOf(`${afterKey}`) + 1;
            if (afterIndex == -1) {
                throw new Error('key does not exist');
            }
            this._array.splice(afterIndex, 0, `${key}`);
            this.map[`${key}`] = this.deepCloneOrRef(value);
        }
    }

    /** @brief insert to map before given key
     *
     * @param beforeKey
     * @param key
     * @param value
     */
    arbitrarySetBefore(beforeKey: NumberOrString, key: NumberOrString, value: T): void {
        const check = this.validator(value);

        if (check === true || check === undefined) {
            let beforeIndex = this._array.indexOf(`${beforeKey}`);
            if (beforeIndex == -1) {
                throw new Error('key does not exist');
            }
            this._array.splice(beforeIndex, 0, `${key}`);
            this.map[`${key}`] = this.deepCloneOrRef(value);
        }
    }

    /***========================================= REMOVE Methods ***/

    /** @brief removing element from map
     *
     * @param key
     */
    remove(key: NumberOrString): void {
        let index = this._array.indexOf(`${key}`);
        if (index == -1) {
            throw new Error('key does not exist');
        }
        this._array.splice(index, 1);
        delete this.map[`${key}`];
    }

    /** @brief works on map as array.pop()
     *
     * @returns {T}
     */
    pop(): T {
        let index = this._array.length;
        if (index == -1) {
            return undefined;
        }
        let returnTmp = this.map[this._array[index - 1]];

        delete this.map[this._array[index - 1]];
        this._array.splice(index - 1, 1);

        return returnTmp;
    }

    /** @brief works on map as array.shift()
     *
     * @returns {T}
     */
    shift(): T {
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
     * @returns {T}
     */
    get(key: NumberOrString): T {
        try {
            if (this.map[`${key}`] !== undefined) {
                return this.map[`${key}`];
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
     * @returns {boolean}
     */
    has(key: NumberOrString): boolean {
        try {
            if (this.map[`${key}`] !== undefined) {
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
    forEach(callback: IteratorCallback<T>): void {
        let key, value;
        for (var i = 0; i < this._array.length; i++) {
            key = this._array[i];
            value = this.map[`${key}`];

            const breakFlag = callback(key, value, this.validator.bind(this));
            if (breakFlag) {
                return;
            }
        }
    };

    /** @brief backwards iterator
     *
     * @param callback
     */
    forEachReverse(callback: IteratorCallback<T>): void {
        let key, value;
        for (var i = this._array.length - 1; i >= 0; i--) {
            key = this._array[i];
            value = this.map[`${key}`];

            const breakFlag = callback(key, value, this.validator.bind(this));
            if (breakFlag) {
                return;
            }
        }
    };

}

export class OrderedFastLookupMap extends OrderedTyoedFastLookupMap<any> {
    constructor(keys: string[], values: any[]) {
        super(keys, values);
    }
}
