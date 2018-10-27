
import { createPipes, compose } from '../src';

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

    it('should work with pipe operator', () => {
        // Two ways to extract methods out (createPipes & fromClassPrototype)
        const { map, filter } = createPipes(['map', 'filter']);
        const { split } = createPipes(['split']);
        const head = ([fst]) => fst;
        const compact = filter(Boolean);

        const getFirstNames = names =>
            names
                |> compact
                |> map(split(' '))
                |> map(head);

        const result = getFirstNames([ '', 'Akshay Nair', null, 'John Doe', 'Bruce Fucking Lee' ]);
        expect(result).toEqual(['Akshay', 'John', 'Bruce']);
    });
});
