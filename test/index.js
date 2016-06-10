'use strict';
var mocha = require('mocha');
var expect = require('expect.js');

describe('Ordered Fast Look Up Map', function () {

    var OFLM = require('..');

    describe('initation', function () {
        it('should create empty map', function () {
            let oflm = new OFLM();
            expect(oflm._array).to.be.empty();
            expect(oflm.map).to.be.empty();
        });

        it('should create map with one value', function () {
            let oflm = new OFLM([1], ["a"]);

            expect(oflm._array).to.be.eql(['1']);
            expect(oflm.map).to.be.eql({"1": "a"});
        });

        it('should create map with one value', function () {
            let oflm = new OFLM([1, 2], ["a", "b"]);

            expect(oflm._array).to.be.eql(['1', '2']);
            expect(oflm.map).to.be.eql({"1": "a", "2": "b"});
        });

        it('should throw exceptions for uneven number of elements', function () {

        });


    });

    describe('adding elements', function () {
        it('should push element on the back when empty (alias set)', function () {
            let oflm = new OFLM();
            oflm.push("1", "a");
            expect(oflm._array).to.be.eql(['1']);
            expect(oflm.map).to.be.eql({"1": "a"});
        });


        it('should push second elements on the back', function () {
            let oflm = new OFLM();
            oflm.push("1", "a");
            oflm.push("2", "b");
            expect(oflm._array).to.be.eql(['1', '2']);
            expect(oflm.map).to.be.eql({"1": "a", "2": "b"});
        });

        it('should push element on the front when empty', function () {
            let oflm = new OFLM();
            oflm.unshift("1", "a");
            expect(oflm._array).to.be.eql(['1']);
            expect(oflm.map).to.be.eql({"1": "a"});
        });

        it('should push second element on the front ', function () {
            let oflm = new OFLM();
            oflm.unshift("1", "a");
            oflm.unshift("2", "b");
            expect(oflm._array).to.be.eql(['2', '1']);
            expect(oflm.map).to.be.eql({"1": "a", "2": "b"});
        });

        it('should failt to push as there is not afterKey ', function () {
            let oflm = new OFLM();
            try {
                oflm.arbitrarySetAfter('1', '2', "b");
                expect(false).to.be.ok();
            } catch (e) {
                expect(typeof e).to.be.equal(typeof (new Error()));
            }
        });

        it('should push emtry between two other', function () {
            let oflm = new OFLM();
            oflm.push("1", "a");
            oflm.push("2", "b");
            oflm.arbitrarySetAfter('1', '3', "c");
            expect(oflm._array).to.be.eql(['1', '3', '2']);
            expect(oflm.map).to.be.eql({"1": "a", "2": "b", "3": "c"});
        });
    });


    describe('removing', function () {
        it('remove element form back', function () {
            let oflm = new OFLM([1, 2, 3, 4], ["a", "b", "c", "d"]);
            let element = oflm.pop();
            expect(element).to.be.equal("d");
            expect(oflm._array).to.be.eql(['1', '2', '3']);
            expect(oflm.map).to.be.eql({"1": "a", "2": "b", "3": "c"});
        });

        it('remove two elements form back', function () {
            let oflm = new OFLM([1, 2, 3, 4], ["a", "b", "c", "d"]);
            let element = oflm.pop();
            let elementB = oflm.pop();
            expect(element).to.be.equal("d");
            expect(elementB).to.be.equal("c");
            expect(oflm._array).to.be.eql(['1', '2']);
            expect(oflm.map).to.be.eql({"1": "a", "2": "b"});
        });

        it('remove form back where no elements are in', function () {
            let oflm = new OFLM();
            let element = oflm.pop();
            expect(element).to.not.ok();
        });

        it('remove form back where no elements are in after removal', function () {
            let oflm = new OFLM([1], ["a"]);
            oflm.pop();
            let element = oflm.pop();
            expect(element).to.not.ok();
        });

        it('remove element form the front', function () {
            let oflm = new OFLM([1, 2, 3, 4], ["a", "b", "c", "d"]);
            let element = oflm.shift();
            expect(element).to.be.equal("a");
            expect(oflm._array).to.be.eql(['2', '3', '4']);
            expect(oflm.map).to.be.eql({"2": "b", "3": "c", "4": "d"});
        });

        it('remove two elements form the front', function () {
            let oflm = new OFLM([1, 2, 3, 4], ["a", "b", "c", "d"]);
            let element = oflm.shift();
            let elementB = oflm.shift();
            expect(element).to.be.equal("a");
            expect(elementB).to.be.equal("b");
            expect(oflm._array).to.be.eql(['3', '4']);
            expect(oflm.map).to.be.eql({"3": "c", "4": "d"});
        });

        it('remove form from where no elements are in', function () {
            let oflm = new OFLM();
            let element = oflm.shift();
            expect(element).to.not.ok();
        });

        it('remove form from where no elements are in after removal', function () {
            let oflm = new OFLM([1], ["a"]);
            oflm.shift();
            let element = oflm.shift();
            expect(element).to.not.ok();
        });

        it('remove element from arbitrary key', function () {
            let oflm = new OFLM(["1", "2", "3"], ["a", "b", "c"]);
            oflm.remove("2");
            expect(oflm._array).to.be.eql(['1', '3']);
            expect(oflm.map).to.be.eql({"1": "a", "3": "c"});
        });

        it('remove element from arbitrary key first one', function () {
            let oflm = new OFLM([1, 2, 3], ["a", "b", "c"]);
            oflm.remove(1);
            expect(oflm._array).to.be.eql(['2', '3']);
            expect(oflm.map).to.be.eql({"2": "b", "3": "c"});
        });

        it('remove element from arbitrary key lest one', function () {
            let oflm = new OFLM([1, 2, 3], ["a", "b", "c"]);
            oflm.remove(3);
            expect(oflm._array).to.be.eql(['1', '2']);
            expect(oflm.map).to.be.eql({"1": "a", "2": "b"});
        });

        it('remove 2 element from middle', function () {
            let oflm = new OFLM([1, 2, 3, 4, 5], ["a", "b", "c", "d", "e"]);
            oflm.remove(3);
            oflm.remove(4);
            expect(oflm._array).to.be.eql(['1', '2', '5']);
            expect(oflm.map).to.be.eql({"1": "a", "2": "b", "5": 'e'});
        });

        it('remove from arbitrary key where no elements are present', function () {
            let oflm = new OFLM();
            try {
                oflm.remove(2);
                expect(false).to.be.ok();
            } catch (e) {
                expect(typeof e).to.be.equal(typeof (new Error()));
            }
        });

        it('remove from arbitrary key where specyfic key is not present', function () {
            let oflm = new OFLM([1, 2, 3, 4, 5], ["a", "b", "c", "d", "e"]);
            try {
                oflm.remove(6);
                expect(false).to.be.ok();
            } catch (e) {
                expect(typeof e).to.be.equal(typeof (new Error()));
            }
        });

        it('remove from front, back and middle', function () {
            let oflm = new OFLM([1, 2, 3, 4, 5], ["a", "b", "c", "d", "e"]);
            let elementFront = oflm.shift();
            let elementBack = oflm.pop();
            let elementMiddle = oflm.get(3);
            oflm.remove(3);

            expect(elementFront).to.be.eql("a");
            expect(elementBack).to.be.eql("e");
            expect(elementMiddle).to.be.eql("c");

            expect(oflm._array).to.be.eql(['2', '4']);
            expect(oflm.map).to.be.eql({"2": "b", "4": "d"});
        });

    });

    describe('access', function () {

        it('should check access to elements fresh after insert', function () {
            let oflm = new OFLM([1, 2, 3, 4, 5], ["a", "b", "c", "d", "e"]);

            expect(oflm.has(1)).to.be.ok();
            expect(oflm.has(2)).to.be.ok();
            expect(oflm.has(3)).to.be.ok();
            expect(oflm.has(4)).to.be.ok();
            expect(oflm.has(5)).to.be.ok();

            expect(oflm.get(1)).to.be.equal("a");
            expect(oflm.get(2)).to.be.equal("b");
            expect(oflm.get(3)).to.be.equal("c");
            expect(oflm.get(4)).to.be.equal("d");
            expect(oflm.get(5)).to.be.equal("e");
        });


        it('should check access to elements after operation', function () {

            let oflm = new OFLM([1, 2, 3, 4, 5], ["a", "b", "c", "d", "e"]);
            oflm.shift();
            oflm.pop();
            oflm.remove(3);
            oflm.unshift(6, "f");
            oflm.push(7, "g");
            oflm.arbitrarySetAfter(2, 8, "h");

            expect(oflm._array).to.be.eql(['6', '2', '8', '4', '7']);
            expect(oflm.map).to.be.eql({"2": "b", "4": "d", "6": "f", "7": "g", "8": "h"});

            expect(oflm.has(1)).to.not.be.ok();
            expect(oflm.has(2)).to.be.ok();
            expect(oflm.has(3)).to.not.be.ok();
            expect(oflm.has(4)).to.be.ok();
            expect(oflm.has(5)).to.not.be.ok();
            expect(oflm.has(6)).to.be.ok();
            expect(oflm.has(7)).to.be.ok();
            expect(oflm.has(8)).to.be.ok();

            expect(oflm.get(1)).to.be.equal(undefined);
            expect(oflm.get(2)).to.be.equal("b");
            expect(oflm.get(3)).to.be.equal(undefined);
            expect(oflm.get(4)).to.be.equal("d");
            expect(oflm.get(5)).to.be.equal(undefined);
            expect(oflm.get(6)).to.be.equal("f");
            expect(oflm.get(7)).to.be.equal("g");
            expect(oflm.get(8)).to.be.equal("h");
        });

    });

    describe('iterating', function () {

        it('should not iterate over empty', function () {
            let oflm = new OFLM();

            var iteration = 0;
            oflm.forEach(function () {
                iteration++;
            });

            expect(iteration).to.be.equal(0);

        });

        it('should iterate over simple', function () {
            let keysCheck = [1, 2, 3, 4, 5];
            let valuesCheck = ["a", "b", "c", "d", "e"]
            let oflm = new OFLM(keysCheck, valuesCheck);

            var iteration = 0;
            var keys = [];
            var values = [];
            oflm.forEach(function (key, value) {
                iteration++;
                keys.push(key);
                values.push(value);
            });
            expect(iteration).to.be.equal(5);
            expect(keys).to.be.eql(keysCheck);
            expect(values).to.be.eql(valuesCheck);
        });

        it('should iterate over complicated set', function () {
            let keysCheck = [6, 2, 8, 4, 7];
            let valuesCheck = ["f", "b", "h", "d", "g"]
            let oflm = new OFLM([1, 2, 3, 4, 5], ["a", "b", "c", "d", "e"]);

            oflm.shift();
            oflm.pop();
            oflm.remove(3);
            oflm.unshift(6, "f");
            oflm.push(7, "g");
            oflm.arbitrarySetAfter(2, 8, "h");


            var iteration = 0;
            var keys = [];
            var values = [];
            oflm.forEach(function (key, value) {
                iteration++;
                keys.push(key);
                values.push(value);
            });
            expect(iteration).to.be.equal(5);
            expect(keys).to.be.eql(keysCheck);
            expect(values).to.be.eql(valuesCheck);
        });

        it('should iterate and break', function () {
            let keysCheck = [1, 2, 3, 4, 5];
            let valuesCheck = ["a", "b", "c", "d", "e"]
            let oflm = new OFLM(keysCheck, valuesCheck);

            var iteration = 0;
            var breakValue = 2;
            var keys = [];
            var values = [];
            oflm.forEach(function (key, value) {
                if (iteration >= breakValue) {
                    return true;
                }

                iteration++;
                keys.push(key);
                values.push(value);
            });

            expect(iteration).to.be.equal(2);
            expect(keys).to.be.eql(keysCheck.slice(0, breakValue));
            expect(values).to.be.eql(valuesCheck.slice(0, breakValue));

        });

        it('should not iterate over empty backwards', function () {
            let oflm = new OFLM();

            var iteration = 0;
            oflm.forEachReverse(function () {
                iteration++;
            });

            expect(iteration).to.be.equal(0);
        })

        it('should iterate backwards', function () {
            let keysCheck = [1, 2, 3, 4, 5];
            let valuesCheck = ["a", "b", "c", "d", "e"]
            let oflm = new OFLM(keysCheck, valuesCheck);

            var iteration = 0;
            var keys = [];
            var values = [];
            oflm.forEachReverse(function (key, value) {
                iteration++;
                keys.push(key);
                values.push(value);
            });
            expect(iteration).to.be.equal(5);
            expect(keys).to.be.eql(keysCheck.reverse());
            expect(values).to.be.eql(valuesCheck.reverse());
        })

        it('should iterate backwards and break', function () {
            let keysCheck = [1, 2, 3, 4, 5];
            let valuesCheck = ["a", "b", "c", "d", "e"]
            let oflm = new OFLM(keysCheck, valuesCheck);

            var iteration = 0;
            var breakValue = 2;
            var keys = [];
            var values = [];
            oflm.forEachReverse(function (key, value) {
                if (iteration >= breakValue) {
                    return true;
                }

                iteration++;
                keys.push(key);
                values.push(value);
            });

            expect(iteration).to.be.equal(2);
            expect(keys).to.be.eql(keysCheck.reverse().slice(0, breakValue));
            expect(values).to.be.eql(valuesCheck.reverse().slice(0, breakValue));
        })

    });
});