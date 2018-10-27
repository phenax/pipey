
import { createPipe } from '../src';

describe('createPipe', () => {
        
    it('should create methods out of objects', () => {
        const obj = { mul2: v => v * 2 };
        expect(createPipe('mul2')(22)(obj)).toEqual(44);
    });

    it('should create context-independent methods', () => {
        const obj = {
            MULTIPLIER: 2,
            mul2(v) { return v * this.MULTIPLIER; }
        };
        expect(createPipe('mul2')(22)(obj)).toEqual(44);
    });
});
