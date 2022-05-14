// Without a decorator

// function Logger(target: Function) {
//     //console.log('Logging....')
//     console.log(target)
// }

// Decorator factory        Aloows for more dynamtic execution
function Logger(logString: string) {
	return function (constructor: Function) {
		console.log(logString);
		console.log(constructor);
	};
}

function withTamplet(templet: string, hookId: string) {
	return function (constructor: any) {
		// (_) tell typescript that they is a value but it isnt required
		const hookEl = document.getElementById(hookId);
		const p = new constructor();
		console.log('Rendering'); // To see which decorator gets logged first
		if (hookEl) {
			hookEl.innerHTML = templet;
			hookEl.querySelector('h1')!.textContent = p.name;
		}
	};
}

@Logger('Logging Person') // Decorator points at a function and does not execute it. The @ is a special keyword reserved for decorators.Decorators are executed when a class is created not when it is created with the new keyword
@withTamplet('<h1> Person Objects </h1>', 'app')
class Persons {
	name = 'Steve';

	constructor() {
		console.log('Creating pesron object...');
	}
}

const pers = new Persons();

console.log(pers);

// More places tp add decorators

// added to a class property
function log(target: any, propertyName: string) {//the number of arguments a decorator gets is dependent on where it is called
    console.log('Property decorator!') // target will refer to the prototype. if title was static target would the constructor
    console.log(target, propertyName)
}

// adding decorators to accessers. Recieves 3 arguments
function log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accesser decorator!')
    console.log(target)
    console.log(name)
    console.log(descriptor)
}

// adding to a method
function log3(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Method decorator!')
    console.log(target)
    console.log(name)
    console.log(descriptor)
}

// adding to a parameter. Can be added to any class parameter you have in a class
function log4(target: any, name: string | Symbol, position: number) {
    console.log('Parameter decorator!')
    console.log(target)
    console.log(name)
    console.log(position)
}

class Product {
	@log        // recieves 2 arguments, executes when the class is defined
    title: string;
	private _price: number;

	constructor(t: string, p: number) {
		this.title = t;
		this._price = p;
	}

    @log2   // recieves 3 arguments
	set price(val: number) {
		if (val > 0) {
			this._price = val;
		} else {
			throw new Error('Inavlid price');
		}
	}

    @log3   // recieves 3 arguments
	getPriceWithTax(@log4 tax: number) {
		return this._price * (1 + tax);
	}
}
