// Interface discribes the structure of a object
// interface Person  {  // alternative type Person = { name: string... 
 
interface Named {
	readonly name?: string; // setting the value to readonly will insure that it can not be changed
	outputName?: string; // the ? defines a optional arrgument in a interface
}

interface Greatable extends Named {
	// Interfaces forces a specific implementation in your class | interfaces can extend each other
	greet(phrase: string): void;
}

class Person implements Greatable {
	// A class can implement multiple interfaces by using a comma separated list of interface names after the class name
	name?: string;
	age = 16;

	constructor(n?: string) {
		//  y   ou can either add a ? or a default value via n: string = 'default value'
		if (n) {
			this.name = n;
		}
	}

	greet(phrase: string) {
		if (this.name) {
			console.log(phrase + ' ' + this.name + 'from Minecraft');
		} else {
			console.log('Hi');
		}
	}
}

let user1: Greatable;

user1 = new Person('Steve');

user1.greet('I am');

 // type AddFn = (a: number, b: number) => number       // Define a type function
interface AddFn {
    (a: number, b:number): number
}


let add: AddFn

add = (a: number, b: number) => {
    return a + b
}