
import createPipes from '../src/createPipes';

describe('createPipes', () => {
    it('should return an object with all method accessors', () => {
        const methods = [ 'hello', 'world', '-', '+' ];
        const pipes = createPipes(methods);
        expect(Object.keys(pipes).sort()).toEqual(methods.sort());
    });

    it('should only create accessors for non-empty method names', () => {
        const methods = [ null, undefined, 0, '', NaN ];
        const pipes = createPipes(methods);
        expect(Object.keys(pipes)).toHaveLength(0);
    });

    it('should execute accessors correctly', () => {
        const methods = [ 'bork' ];
        const { bork } = createPipes([ 'bork' ]);
        const dog = { bork: bork => `${bork}!`.toUpperCase() };
        expect(bork('Bork Bork')(dog)).toBe('BORK BORK!');
    });

    it('should execute accessors with the correct context', () => {
        const methods = [ 'bork' ];
        const { bork } = createPipes([ 'bork' ]);
        const dog = {
            name: 'Doge',
            bork(bork) {
                return `${this.name} ${bork}!`.toUpperCase();
            },
        };
        expect(bork('Bork Bork')(dog)).toBe('DOGE BORK BORK!');
    });
});
