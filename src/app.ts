// Advanced Types

// Intersection types

type Admin = {
	// Altr interface Admin {}
	name: string;
	privilage: string[];
};

type Employee = {
	// Altr interface Employee {}
	name: string;
	startingDate: Date;
};

// Altr interface ElevatedEmployee extends Admin, Employee {}

type ElevatedEmployee = Admin & Employee; // Within type object a intersection(&) will combine the objects

const e1: ElevatedEmployee = {
	name: 'Steve',
	privilage: ['can_create_sever'],
	startingDate: new Date(),
};

type Combinable = number | string;
type Numeric = number | boolean;
// Intersection
type Universal = Combinable & Numeric; // within this context the intersection will be number, thats the type Universal will adopt

// Type Guards help us with vheck whether we have recieved the correct type

function sum(a: Combinable, b: Combinable) {
	if (typeof a === 'string' || typeof b === 'string') {
		// this is our type guard insuring we recieve the correct type during runtime
		return a.toString() + b.toString();
	}
	return a + b;
}

// Different type of type guard using the in keyword

type UnkownEmployee = Admin | Employee;

function printEmployeeInformation(emp: UnkownEmployee) {
	console.log('Name: ' + emp.name); // name works because both Afmin and Employee have a name property
	if ('privilage' in emp) {
		console.log('Privilages: ' + emp.privilage); // works because we use in to check whether that properety exisits
	}
	if ('startingDate' in emp) {
		console.log('Starting Date: ' + emp.startingDate);
	}
}

// Instance of type Guard

class Car {
	drive() {
		console.log('Driving....');
	}
}
class Truck {
	drive() {
		console.log('Driving a truck....');
	}

	loadCargo(amount: number) {
		console.log('Loading Cargo + ...' + amount);
	}
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
	vehicle.drive();
	if (vehicle instanceof Truck) {
		// Altr if('loadCargo' in vehicle) {...}, instanceof does not work with interfaces
		vehicle.loadCargo(7445);
	}
}

useVehicle(v1);
useVehicle(v2);

// Discriminated Union

interface Bird {
	type: 'bird'; // literal type
	flyingSpeed: number;
}

interface Horse {
	type: 'horse';
	groundSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
	let speed: number;
	switch (animal.type) {
		case 'bird':
			speed = animal.flyingSpeed;
			break;
		case 'horse':
			speed = animal.groundSpeed;
	}
	console.log('Moving at spedd: ' + speed);
}

moveAnimal({ type: 'horse', groundSpeed: 14 });

// Type Casting basically informs the browser of the specific type that a partcular operation will yield

//const userInputElement = <HTMLInputElement>document.getElementById('user_input')!   // JSX method in React so we need an altr  & the (!) tells TypeScript the the value will never yield null
//const userInputElement = document.getElementById('user_input')! as HTMLInputElement     // tells ts the return value type
const userInputElement = document.getElementById('user_input');

if (userInputElement) {
	(userInputElement as HTMLInputElement).value = 'Hi there'; // ALTR TO THE (!)
}

// Index types
