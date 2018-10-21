
export { default as createPipes } from './createPipes';

class Dog {
    eat = food => console.log(`Eating ${food}`);

    bark(perfix) {
        alert(`${perfix} Bork!`);
    }
}

const { eat, bark } = create(['eat', 'bark']);

bark("Yo")(new Dog);
eat("Shit")(new Dog);
