import { OrderedTyoedFastLookupMap, OrderedFastLookupMap, IOFMLoptions } from "../lib";
const OFLM = require('..');

describe('Ordered Fast Look Up Map', () => {

    describe("type string", () => {
        it("Inits", () => {
            const oflm = new OrderedTyoedFastLookupMap<string>();

            expect(oflm._array.length).toBe(0);
            expect(Object.values(oflm.map).length).toBe(0);
        });

        it("Inits null", () => {
            const oflm = new OrderedTyoedFastLookupMap<string>(null, null);

            expect(oflm._array.length).toBe(0);
            expect(Object.values(oflm.map).length).toBe(0);
        });

        it("Inits force non string without validator", () => {
            const oflm = new OrderedTyoedFastLookupMap<string>([`1`], [<any>false]);

            expect(oflm._array).toStrictEqual(["1"]);
            expect(oflm.map).toStrictEqual({ "1": false });
        });

        it("Inits force non string with validator that throws", () => {
            const opts: IOFMLoptions<string> = {
                validator: (val) => {
                    if (typeof val !== 'string' && !(<any>val instanceof String)) {
                        throw new Error('We expcted string');
                    }
                }
            };
            const oflm = new OrderedTyoedFastLookupMap<string>([`1`], [<any>false], opts);

            expect(oflm._array).toStrictEqual([]);
            expect(oflm.map).toStrictEqual({});
        });

        it("Inits force non string with validator that not throw", () => {
            const opts: IOFMLoptions<string> = {
                validator: (val) => {
                    if (typeof val !== 'string' && !(<any>val instanceof String)) {
                        return false;
                    }
                    return true;
                }
            };

            const oflm = new OrderedTyoedFastLookupMap<string>([`1`], [<any>false], opts);

            expect(oflm._array).toStrictEqual([]);
            expect(oflm.map).toStrictEqual({});
        });

        it("Inits string", () => {
            const oflm = new OrderedTyoedFastLookupMap<string>([`1`], ["a"]);

            expect(oflm._array).toStrictEqual(["1"]);
            expect(oflm.map).toStrictEqual({ "1": "a" });
        });
    });

    describe("type array", () => {
        it("Inits ", () => {
            const oflm = new OrderedTyoedFastLookupMap<string[]>([`1`], [["a"]]);

            expect(oflm._array).toStrictEqual(["1"]);
            expect(oflm.map).toStrictEqual({ "1": ["a"] });
        });
    });

    describe("custom type", () => {
        class testClass {
            constructor(public x: string) { }
        }

        class testClassWrong {
            constructor(public x: string) { }
        }

        const opts: IOFMLoptions<testClass> = {
            validator: (val) => {
                if (!(<any>val instanceof testClass)) {
                    return false;
                }
                return true;
            }
        };

        it("instatentiate correct class", () => {
            const foo = new testClass('bar');
            const oflm = new OrderedTyoedFastLookupMap<testClass>([`1`], [foo]);

            expect(oflm._array).toStrictEqual(["1"]);
            expect(oflm.map).toStrictEqual({ "1": foo });
        });

        it("instatentiate correct class with custom  validator", () => {
            const foo = new testClass('bar');
            const oflm = new OrderedTyoedFastLookupMap<testClass>([`1`], [foo], opts);

            expect(oflm._array).toStrictEqual(["1"]);
            expect(oflm.map).toStrictEqual({ "1": foo });
        });

        it("refuse to instantiate wrong type", () => {
            const foo = new testClassWrong('bar');
            const oflm = new OrderedTyoedFastLookupMap<testClass>([`1`], [foo], opts);

            expect(oflm._array).toStrictEqual([]);
            expect(oflm.map).toStrictEqual({});
        });

    });

    describe("any", () => {
        it("Inits manual", () => {
            const oflm = new OrderedTyoedFastLookupMap<any[]>([`1`], [[{ "a": 1 }]]);

            expect(oflm._array).toStrictEqual(["1"]);
            expect(oflm.map).toStrictEqual({ "1": [{ "a": 1 }] });
        });

        it("Inits type", () => {
            const oflm = new OrderedFastLookupMap([`1`], [[{ "a": 1 }]]);

            expect(oflm._array).toStrictEqual(["1"]);
            expect(oflm.map).toStrictEqual({ "1": [{ "a": 1 }] });
        });
    });

    // non ts usage ignores private
    describe("Legacy/Compatibility", () => {
        describe('initation', () => {
            it('should create empty map', () => {
                const oflm = new OFLM();

                expect(oflm._array.length).toBe(0);
                expect(Object.values(oflm.map).length).toBe(0);
            });

            it('should create map with one value', () => {
                const oflm = new OFLM([1], ["a"]);

                expect(oflm._array).toStrictEqual(["1"]);
                expect(oflm.map).toStrictEqual({ "1": "a" });
            });

            it('should create map with one value', () => {
                const oflm = new OFLM([1, 2], ["a", "b"]);

                expect(oflm._array).toStrictEqual(['1', '2']);
                expect(oflm.map).toStrictEqual({ "1": "a", "2": "b" });
            });

        });

        describe('adding elements', () => {
            it('should push element on the back when empty (alias set)', () => {
                const oflm = new OFLM();
                oflm.push("1", "a");
                expect(oflm._array).toStrictEqual(['1']);
                expect(oflm.map).toStrictEqual({ "1": "a" });
            });


            it('should push second elements on the back', () => {
                const oflm = new OFLM();
                oflm.push("1", "a");
                oflm.push("2", "b");
                expect(oflm._array).toStrictEqual(['1', '2']);
                expect(oflm.map).toStrictEqual({ "1": "a", "2": "b" });
            });

            it('should push element on the front when empty', () => {
                const oflm = new OFLM();
                oflm.unshift("1", "a");
                expect(oflm._array).toStrictEqual(['1']);
                expect(oflm.map).toStrictEqual({ "1": "a" });
            });

            it('should push second element on the front ', () => {
                const oflm = new OFLM();
                oflm.unshift("1", "a");
                oflm.unshift("2", "b");
                expect(oflm._array).toStrictEqual(['2', '1']);
                expect(oflm.map).toStrictEqual({ "1": "a", "2": "b" });
            });

            it('should failt to push as there is not afterKey in empty', () => {
                const oflm = new OFLM();
                try {
                    oflm.arbitrarySetAfter('1', '2', "b");
                    expect(false).toBeTruthy();
                } catch (e) {
                    expect(typeof e).toMatch(typeof (new Error()));
                }
            });

            it('should failt to push as there is not afterKey in non empty', () => {
                const oflm = new OFLM([4], ["e"]);
                try {
                    oflm.arbitrarySetAfter('1', '2', "b");
                    expect(false).toBeTruthy();
                } catch (e) {
                    expect(typeof e).toMatch(typeof (new Error()));
                }
            });

            it('should push entry between two other', () => {
                const oflm = new OFLM();
                oflm.push("1", "a");
                oflm.push("2", "b");
                oflm.arbitrarySetAfter('1', '3', "c");
                expect(oflm._array).toStrictEqual(['1', '3', '2']);
                expect(oflm.map).toStrictEqual({ "1": "a", "2": "b", "3": "c" });
            });

            it('should push entry before first element', () => {
                const oflm = new OFLM(["1", "2"], ["a", "b"]);

                oflm.arbitrarySetBefore('1', '3', "c");
                expect(oflm._array).toStrictEqual(['3', '1', '2']);
                expect(oflm.map).toStrictEqual({ "3": "c", "1": "a", "2": "b" });
            });

            it('should push entry inbetween', () => {
                const oflm = new OFLM(["1", "2"], ["a", "b"]);

                oflm.arbitrarySetBefore('2', '3', "c");
                expect(oflm._array).toStrictEqual(['1', '3', '2']);
                expect(oflm.map).toStrictEqual({ "1": "a", "2": "b", "3": "c" });
            });

            it('should try to push before and throw error', () => {
                const oflm = new OFLM(["1", "2"], ["a", "b"]);

                try {
                    oflm.arbitrarySetBefore('4', '3', "c");
                    expect(false).toBeTruthy();
                } catch (e) {
                    expect(typeof e).toMatch(typeof (new Error()));
                }
            });

            it('should try to push before in empty', () => {
                const oflm = new OFLM();

                try {
                    oflm.arbitrarySetBefore('4', '3', "c");
                    expect(false).toBeTruthy();
                } catch (e) {
                    expect(typeof e).toMatch(typeof (new Error()));
                }
            });
        });


        describe('removing', () => {
            it('remove element form back', () => {
                const oflm = new OFLM([1, 2, 3, 4], ["a", "b", "c", "d"]);
                const element = oflm.pop();
                expect(element).toMatch("d");
                expect(oflm._array).toStrictEqual(['1', '2', '3']);
                expect(oflm.map).toStrictEqual({ "1": "a", "2": "b", "3": "c" });
            });

            it('remove two elements form back', () => {
                const oflm = new OFLM([1, 2, 3, 4], ["a", "b", "c", "d"]);
                const element = oflm.pop();
                const elementB = oflm.pop();
                expect(element).toMatch("d");
                expect(elementB).toMatch("c");
                expect(oflm._array).toStrictEqual(['1', '2']);
                expect(oflm.map).toStrictEqual({ "1": "a", "2": "b" });
            });

            it('remove form back where no elements are in', () => {
                const oflm = new OFLM();
                const element = oflm.pop();
                // expect(element).to.not.ok();
            });

            it('remove form back where no elements are in after removal', () => {
                const oflm = new OFLM([1], ["a"]);
                oflm.pop();
                const element = oflm.pop();
                expect(element).toBeFalsy();
            });

            it('remove element form the front', () => {
                const oflm = new OFLM([1, 2, 3, 4], ["a", "b", "c", "d"]);
                const element = oflm.shift();
                expect(element).toMatch("a");
                expect(oflm._array).toStrictEqual(['2', '3', '4']);
                expect(oflm.map).toStrictEqual({ "2": "b", "3": "c", "4": "d" });
            });

            it('remove two elements form the front', () => {
                const oflm = new OFLM([1, 2, 3, 4], ["a", "b", "c", "d"]);
                const element = oflm.shift();
                const elementB = oflm.shift();
                expect(element).toMatch("a");
                expect(elementB).toMatch("b");
                expect(oflm._array).toStrictEqual(['3', '4']);
                expect(oflm.map).toStrictEqual({ "3": "c", "4": "d" });
            });

            it('remove form from where no elements are in', () => {
                const oflm = new OFLM();
                const element = oflm.shift();
                expect(element).toBeFalsy();
            });

            it('remove form from where no elements are in after removal', () => {
                const oflm = new OFLM([1], ["a"]);
                oflm.shift();
                const element = oflm.shift();
                expect(element).toBeFalsy();
            });

            it('remove element from arbitrary key', () => {
                const oflm = new OFLM(["1", "2", "3"], ["a", "b", "c"]);
                oflm.remove("2");
                expect(oflm._array).toStrictEqual(['1', '3']);
                expect(oflm.map).toStrictEqual({ "1": "a", "3": "c" });
            });

            it('remove element from arbitrary key first one', () => {
                const oflm = new OFLM([1, 2, 3], ["a", "b", "c"]);
                oflm.remove(1);
                expect(oflm._array).toStrictEqual(['2', '3']);
                expect(oflm.map).toStrictEqual({ "2": "b", "3": "c" });
            });

            it('remove element from arbitrary key lest one', () => {
                const oflm = new OFLM([1, 2, 3], ["a", "b", "c"]);
                oflm.remove(3);
                expect(oflm._array).toStrictEqual(['1', '2']);
                expect(oflm.map).toStrictEqual({ "1": "a", "2": "b" });
            });

            it('remove 2 element from middle', () => {
                const oflm = new OFLM([1, 2, 3, 4, 5], ["a", "b", "c", "d", "e"]);
                oflm.remove(3);
                oflm.remove(4);
                expect(oflm._array).toStrictEqual(['1', '2', '5']);
                expect(oflm.map).toStrictEqual({ "1": "a", "2": "b", "5": 'e' });
            });

            it('remove from arbitrary key where no elements are present', () => {
                const oflm = new OFLM();
                try {
                    oflm.remove(2);
                    expect(false).toBeTruthy();
                } catch (e) {
                    expect(typeof e).toMatch(typeof (new Error()));
                }
            });

            it('remove from arbitrary key where specyfic key is not present', () => {
                const oflm = new OFLM([1, 2, 3, 4, 5], ["a", "b", "c", "d", "e"]);
                try {
                    oflm.remove(6);
                    expect(false).toBeTruthy();
                } catch (e) {
                    expect(typeof e).toMatch(typeof (new Error()));
                }
            });

            it('remove from front, back and middle', () => {
                const oflm = new OFLM([1, 2, 3, 4, 5], ["a", "b", "c", "d", "e"]);
                const elementFront = oflm.shift();
                const elementBack = oflm.pop();
                const elementMiddle = oflm.get(3);
                oflm.remove(3);

                expect(elementFront).toBe("a");
                expect(elementBack).toBe("e");
                expect(elementMiddle).toBe("c");

                expect(oflm._array).toStrictEqual(['2', '4']);
                expect(oflm.map).toStrictEqual({ "2": "b", "4": "d" });
            });

        });

        describe('access', () => {

            it('should check access to elements fresh after insert', () => {
                const oflm = new OFLM([1, 2, 3, 4, 5], ["a", "b", "c", "d", "e"]);

                expect(oflm.has(1)).toBeTruthy();
                expect(oflm.has(2)).toBeTruthy();
                expect(oflm.has(3)).toBeTruthy();
                expect(oflm.has(4)).toBeTruthy();
                expect(oflm.has(5)).toBeTruthy();

                expect(oflm.get(1)).toMatch("a");
                expect(oflm.get(2)).toMatch("b");
                expect(oflm.get(3)).toMatch("c");
                expect(oflm.get(4)).toMatch("d");
                expect(oflm.get(5)).toMatch("e");
            });


            it('should check access to elements after operation', () => {

                const oflm = new OFLM([1, 2, 3, 4, 5], ["a", "b", "c", "d", "e"]);
                oflm.shift();
                oflm.pop();
                oflm.remove(3);
                oflm.unshift(6, "f");
                oflm.push(7, "g");
                oflm.arbitrarySetAfter(2, 8, "h");

                expect(oflm._array).toStrictEqual(['6', '2', '8', '4', '7']);
                expect(oflm.map).toStrictEqual({ "2": "b", "4": "d", "6": "f", "7": "g", "8": "h" });

                expect(oflm.has(1)).toBeFalsy();;
                expect(oflm.has(2)).toBeTruthy();
                expect(oflm.has(3)).toBeFalsy();;
                expect(oflm.has(4)).toBeTruthy();
                expect(oflm.has(5)).toBeFalsy();;
                expect(oflm.has(6)).toBeTruthy();
                expect(oflm.has(7)).toBeTruthy();
                expect(oflm.has(8)).toBeTruthy();

                expect(oflm.get(1)).toStrictEqual(undefined);
                expect(oflm.get(2)).toMatch("b");
                expect(oflm.get(3)).toStrictEqual(undefined);
                expect(oflm.get(4)).toMatch("d");
                expect(oflm.get(5)).toStrictEqual(undefined);
                expect(oflm.get(6)).toMatch("f");
                expect(oflm.get(7)).toMatch("g");
                expect(oflm.get(8)).toMatch("h");
            });

            it('should find false, 0, null', () => {
                var oflm = new OFLM();

                oflm.set('key1', 0);
                oflm.set('key2', false);
                oflm.set('key3', null);
                try {
                    oflm.set('key4', undefined)
                    expect('Do not allow to pass undefined').toMatch(' yet it went through');
                } catch (e) {
                    expect(typeof e).toMatch(typeof (new Error()));
                }

                expect(oflm.has('key1')).toStrictEqual(true);
                expect(oflm.has('key2')).toStrictEqual(true);
                expect(oflm.has('key3')).toStrictEqual(true);
                expect(oflm.has('key4')).toStrictEqual(false);

                expect(oflm.get('key1')).toStrictEqual(0);
                expect(oflm.get('key2')).toStrictEqual(false);
                expect(oflm.get('key3')).toStrictEqual(null);

                oflm.remove('key3');
                expect(oflm.has('key3')).toStrictEqual(false);

                expect(oflm.pop()).toStrictEqual(false);
                expect(oflm.shift()).toStrictEqual(0);

                expect(oflm.has('key2')).toStrictEqual(false);
                expect(oflm.has('key2')).toStrictEqual(false);
            });

        });

        describe('iterating', () => {

            it('should not iterate over empty', () => {
                const oflm = new OFLM();

                let iteration = 0;
                oflm.forEach(() => {
                    iteration++;
                });

                expect(iteration).toStrictEqual(0);

            });

            it('should iterate over simple', () => {
                const keysCheck = [1, 2, 3, 4, 5];
                const keysCheckString = [`1`, `2`, `3`, `4`, `5`];
                const valuesCheck = ["a", "b", "c", "d", "e"]
                const oflm = new OFLM(keysCheck, valuesCheck);

                let iteration = 0;
                const keys = [];
                const values = [];
                oflm.forEach((key, value) => {
                    iteration++;
                    keys.push(key);
                    values.push(value);
                });
                expect(iteration).toStrictEqual(5);
                expect(keys).toStrictEqual(keysCheckString);
                expect(values).toStrictEqual(valuesCheck);
            });

            it('should iterate over complicated set', () => {
                const keysCheck = [6, 2, 8, 4, 7];
                const keysCheckString = [`6`, `2`, `8`, `4`, `7`];
                const valuesCheck = ["f", "b", "h", "d", "g"]
                const oflm = new OFLM([1, 2, 3, 4, 5], ["a", "b", "c", "d", "e"]);

                oflm.shift();
                oflm.pop();
                oflm.remove(3);
                oflm.unshift(6, "f");
                oflm.push(7, "g");
                oflm.arbitrarySetAfter(2, 8, "h");


                let iteration = 0;
                const keys = [];
                const values = [];
                oflm.forEach(function (key, value) {
                    iteration++;
                    keys.push(key);
                    values.push(value);
                });
                expect(iteration).toStrictEqual(5);
                expect(keys).toStrictEqual(keysCheckString);
                expect(values).toStrictEqual(valuesCheck);
            });

            it('should iterate and break', () => {
                const keysCheck = [1, 2, 3, 4, 5];
                const keysCheckString = [`1`, `2`, `3`, `4`, `5`];
                const valuesCheck = ["a", "b", "c", "d", "e"]
                const oflm = new OFLM(keysCheck, valuesCheck);

                let iteration = 0;
                const breakValue = 2;
                const keys = [];
                const values = [];
                oflm.forEach(function (key, value) {
                    if (iteration >= breakValue) {
                        return true;
                    }

                    iteration++;
                    keys.push(key);
                    values.push(value);
                });

                expect(iteration).toStrictEqual(2);
                expect(keys).toStrictEqual(keysCheckString.slice(0, breakValue));
                expect(values).toStrictEqual(valuesCheck.slice(0, breakValue));

            });

            it('should not iterate over empty backwards', () => {
                const oflm = new OFLM();

                let iteration = 0;
                oflm.forEachReverse(function () {
                    iteration++;
                });

                expect(iteration).toStrictEqual(0);
            })

            it('should iterate backwards', () => {
                const keysCheck = [1, 2, 3, 4, 5];
                const keysCheckString = [`1`, `2`, `3`, `4`, `5`];
                const valuesCheck = ["a", "b", "c", "d", "e"]
                const oflm = new OFLM(keysCheck, valuesCheck);

                let iteration = 0;
                const keys = [];
                const values = [];
                oflm.forEachReverse(function (key, value) {
                    iteration++;
                    keys.push(key);
                    values.push(value);
                });

                expect(iteration).toStrictEqual(5);
                expect(keys).toStrictEqual(keysCheckString.reverse());
                expect(values).toStrictEqual(valuesCheck.reverse());
            })

            it('should iterate backwards and break', () => {
                const keysCheck = [1, 2, 3, 4, 5];
                const keysCheckString = [`1`, `2`, `3`, `4`, `5`];
                const valuesCheck = ["a", "b", "c", "d", "e"]
                const oflm = new OFLM(keysCheck, valuesCheck);

                let iteration = 0;
                const breakValue = 2;
                const keys = [];
                const values = [];
                oflm.forEachReverse(function (key, value) {
                    if (iteration >= breakValue) {
                        return true;
                    }

                    iteration++;
                    keys.push(key);
                    values.push(value);
                });

                expect(iteration).toStrictEqual(2);
                expect(keys).toStrictEqual(keysCheckString.reverse().slice(0, breakValue));
                expect(values).toStrictEqual(valuesCheck.reverse().slice(0, breakValue));
            })

        });
    })

});