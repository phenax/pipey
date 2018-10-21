
import { compose, getMethods, fromPairs, createMethod } from '../src/utils';

describe('Utils', () => {

    describe('compose', () => {

        it('should obey composition laws', () => {
            const add2 = a => a + 2;
            const sub2 = a => a - 2;
            const mul2 = a => a * 2;

            const addMulSub2 = compose(add2, mul2, sub2);
            const addMul2 = compose(add2, mul2);
            const addMul2Sub2 = compose(addMul2, sub2);

            expect(addMul2Sub2(5)).toBe(addMulSub2(5));
        });
        
        it('should compose functions in the right order', () => {
            const fn = compose(
                a => a + 2,
                a => a * 2,
                a => a - 2,
            );
            expect(fn(5)).toBe(8);
        });
    });

    describe('getMethods', () => {

        it('should return the list of methods', () => {
            class A { a() {}; b() {}; }
            expect(getMethods(A).sort()).toEqual(['a','b'].sort());
        });

        it('should return empty array for non-class', () => {
            expect(getMethods({})).toEqual([]);
            expect(getMethods()).toEqual([]);
            expect(getMethods(null)).toEqual([]);
            expect(getMethods(1)).toEqual([]);
            expect(getMethods('')).toEqual([]);
        });
    });

    describe('createMethod', () => {
        
        it('should create methods out of objects', () => {
            const obj = { mul2: v => v * 2 };
            expect(createMethod('mul2')(22)(obj)).toEqual(44);
        });

        it('should create context-independent methods', () => {
            const obj = {
                MULTIPLIER: 2,
                mul2(v) { return v * this.MULTIPLIER; }
            };
            expect(createMethod('mul2')(22)(obj)).toEqual(44);
        });
    });

    describe('getMethods', () => {

        it('should return an object from pairs', () => {
            const pairs = [
                [ 'a', 'b' ],
                [ 'c', 'd' ],
            ];
            expect(fromPairs(pairs)).toEqual({
                a: 'b',
                c: 'd',
            });
        });
    });
});
