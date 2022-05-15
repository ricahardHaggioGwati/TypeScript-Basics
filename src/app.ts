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

// This verson of the code will ensure that the decorator will render the templet only after the class has been declared
function withTamplet(templet: string, hookId: string) {
	return function<T extends {new(...args: any[]): {name: string}}> (originalConstructor: T) {
		return class extends originalConstructor {
			constructor(..._: any[]) {
				super();
				// (_) tell typescript that they is a value but it isnt required
				const hookEl = document.getElementById(hookId);
				console.log('Rendering'); // To see which decorator gets logged first
				if (hookEl) {
					hookEl.innerHTML = templet;
					hookEl.querySelector('h1')!.textContent = this.name;
				}
			}
		};
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

// adding decorators to accessers. Recieves 3 arguments. Can also return a value
function log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accesser decorator!')
    console.log(target)
    console.log(name)
    console.log(descriptor) 
}

// adding to a method. Can also return a value
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

// Creating a decorator that auto binds this to the surrounding class

function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this)   // this will refer to whatever is responsible for teiggering the get method
            return boundFn
        }
    }
    return adjustedDescriptor
}

class Printer {
    message = 'This works'

    @AutoBind
    showMessage() {
        console.log(this.message)   
    }
}

const p = new Printer

const button = document.querySelector('button')!
button.addEventListener('click', p.showMessage)

// Validation decorators

interface ValidatorConfig {
	[property: string]: {
		[validatableProp: string]: string[]	//['required', 'positive']
	}
}

const registeredValidators: ValidatorConfig = {}

function Required(target: any, propName: string) {
	registeredValidators[target.constructor.name] = {
		...registeredValidators[target.constructor.name],	//ensures that the exisiting prop aren't over ridden
		[propName]: ['required'] 	
	}
}

function PositiveNumber(target: any, propName: string) {
	registeredValidators[target.constructor.name] = {
		[propName]: ['positive']
	}
}

function validate(obj: any) {
	const objValidatorConfig = registeredValidators[obj.constructor.name]
	if (!objValidatorConfig) {
		return true
	}

	let isValid = true
	for (const prop in objValidatorConfig) {
		for (const validator of objValidatorConfig[prop]) {
			switch (validator) {	
				case 'required':
					isValid = isValid && !!obj[prop]		// !! converts value to a truthy value
					break
				case 'positive':
					isValid = isValid && obj[prop] > 0
					break
			}
		}
	} 
	return isValid
}

class Course {
	@Required
	title: string
	@PositiveNumber
	price: number

	constructor(t: string, p: number) {
		this.title = t
		this.price = p
	}
}

const courseForm = document.querySelector('form')!
courseForm.addEventListener('submit', event => {
	event.preventDefault()
	const titleEl = document.getElementById('title') as HTMLInputElement
	const priceEl = document.getElementById('price') as HTMLInputElement
	
	const title = titleEl.value
	const price = +priceEl.value

	const currentCourse = new Course(title, price)

	if (!validate(currentCourse)) {
		throw new Error('Inalid course')
	}

	console.log(currentCourse)
})