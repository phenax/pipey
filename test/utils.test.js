
import { compose, getMethods } from '../src/utils';

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
});
