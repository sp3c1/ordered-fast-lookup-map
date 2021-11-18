export declare class OrderedTyoedFastLookupMap<T> {
    map: {
        [k: string]: T;
    };
    _array: any[];
    constructor(keys?: string[], values?: T[], validator?: IValidatorFunction<T>);
    validator(value: T): void | boolean;
    set(key: string, value: T): void;
    push(key: string, value: T): void;
    unshift(key: string, value: T): void;
    arbitrarySetAfter(afterKey: string, key: string, value: T): void;
    arbitrarySetBefore(beforeKey: string, key: string, value: T): void;
    remove(key: string): void;
    pop(): T;
    shift(): T;
    get(key: string): T;
    has(key: string): boolean;
    forEach(callback: IteratorCallback<T>): void;
    forEachReverse(callback: IteratorCallback<T>): void;
}
declare type IteratorCallback<T> = (key: string, value: T, validator: IValidatorFunction<T>) => boolean;
declare type IValidatorFunction<T> = (value: T) => void | boolean;
export declare class OrderedFastLookupMap extends OrderedTyoedFastLookupMap<any> {
    constructor(keys: string[], values: any[], validator?: IValidatorFunction<any>);
}
export {};
//# sourceMappingURL=lib.d.ts.map