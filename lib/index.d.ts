export declare type IteratorCallback<T> = (key: string, value: T, validator: IValidatorFunction<T>) => boolean;
export declare type IValidatorFunction<T> = (value: T) => void | boolean;
export declare type IDeepCloneFunction<T> = (value: T) => T;
export declare type NumberOrString = string | number;
export declare type IOFMLoptions<T> = {
    validator?: IValidatorFunction<T>;
    deepClone?: boolean;
    deepCloneMethod?: IDeepCloneFunction<T>;
};
export declare class OrderedTyoedFastLookupMap<T> {
    map: {
        [k: string]: T;
    };
    _array: any[];
    private deepClone;
    constructor(keys?: NumberOrString[] | number[], values?: T[], options?: IOFMLoptions<T>);
    private validator;
    set(key: NumberOrString, value: T): void;
    private deepCloneMethod;
    private deepCloneOrRef;
    push(key: NumberOrString, value: T): void;
    unshift(key: string, value: T): void;
    arbitrarySetAfter(afterKey: NumberOrString, key: NumberOrString, value: T): void;
    arbitrarySetBefore(beforeKey: NumberOrString, key: NumberOrString, value: T): void;
    remove(key: NumberOrString): void;
    pop(): T;
    shift(): T;
    get(key: NumberOrString): T;
    has(key: NumberOrString): boolean;
    forEach(callback: IteratorCallback<T>): void;
    forEachReverse(callback: IteratorCallback<T>): void;
}
export declare class OrderedFastLookupMap extends OrderedTyoedFastLookupMap<any> {
    constructor(keys: string[], values: any[]);
}
//# sourceMappingURL=index.d.ts.map