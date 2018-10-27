
import { fromClassPrototype, compose } from '../src';

class Dog {
    constructor(name) {
        this.name = name;
    }

    eat(...foodList) {
        return `Nom Nom Nom. Eating ${foodList.join(' and ')}`;
    }

    bork(borkSound) {
        return `${this.name} ${borkSound}!`.toUpperCase();
    }
}

describe('fromClassPrototype', () => {
    it('should return an object with all method accessors', () => {
        const pipes = fromClassPrototype(Dog);
        expect(Object.keys(pipes).sort()).toEqual(['eat', 'bork'].sort());
    });

    it('should not include class properties (arrow methods) or getter/setters', () => {
        const pipes = fromClassPrototype(class {
            get val() { return this.v; }
            set val(v) { this.v = v; }
            method = () => {};
        });
        expect(Object.keys(pipes)).toHaveLength(0);
    });

    it('should return empty object for class with no methods', () => {
        const pipes = fromClassPrototype(() => {});
        expect(Object.keys(pipes)).toHaveLength(0);
    });

    it('should return empty object for non-class values', () => {
        expect(Object.keys(fromClassPrototype({}))).toHaveLength(0);
        expect(Object.keys(fromClassPrototype(null))).toHaveLength(0);
        expect(Object.keys(fromClassPrototype())).toHaveLength(0);
        expect(Object.keys(fromClassPrototype(''))).toHaveLength(0);
        expect(Object.keys(fromClassPrototype(2))).toHaveLength(0);
    });

    it('should execute accessors correctly', () => {
        const { eat } = fromClassPrototype(Dog);
        const dog = new Dog('Fluffy');
        expect(eat('Bone', 'Rice')(dog)).toBe('Nom Nom Nom. Eating Bone and Rice');
    });

    it('should execute accessors with the correct context', () => {
        const { bork } = fromClassPrototype(Dog);
        const dog = new Dog('Fluffy');
        expect(bork('Bork Bork')(dog)).toBe('FLUFFY BORK BORK!');
    });

    it('should extract functions out of collection methods', () => {
        const { map, filter, sort, forEach } = fromClassPrototype(Array);
        const head = ([x]) => x;
        const echo = jest.fn();

        const tellDogsToFetch = compose(
            forEach(x => echo(x)),
            map(name => `${name}, fetch!`),
            sort(),
            filter(Boolean),
            map(dog => dog.name),
        );

        const dogs = [ new Dog(), new Dog('Fluffy'), new Dog('Tuffy'), new Dog('Jeffry'), new Dog('Terminator'), ];
        const expectedResult = ['Fluffy, fetch!', 'Jeffry, fetch!', 'Terminator, fetch!', 'Tuffy, fetch!'];
        tellDogsToFetch(dogs);
        expect(echo).toBeCalledTimes(4);
        expect(echo.mock.calls.map(head)).toEqual(expectedResult);
    });
});
