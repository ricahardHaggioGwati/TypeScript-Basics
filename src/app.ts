// Generics type is a type that is connected to another type and it needs to know what that other type is before it can be used.

// Built in generics
// Array type
const names: Array<string> = ['Steve']; // altr const names: string[] = []
names[0].split(' '); // names stores a generic string type

// Promise type

const promise: Promise<string> = new Promise((resolve, reject) => {
	// the built in generic is able to offer typescript more information about the return value, hence insuring we don't call the incorrect methods on the return value
	setTimeout(() => {
		resolve('All done 😄');
	}, 2000);
	reject(new Error(' Failed to load resources'));
});

promise.then((data) => {
	data.split(' ');
});

// Generic Functions

// extending will constrain the type an insure that it is not of type any
function merge<T extends Object, U extends Object>(objA: T, objB: U) {
	// typescript will be able to infer that T, U are of different types and the functions should return a union of both types. The data will be assigned dynamically.
	// using mege<object>(objA: Object, objB: Object) {....} mergedObj.game would have not worked
	return Object.assign(objA, objB);
}

const mergedObj = merge(
	{ name: 'Steve', game: 'Minecraft' },
	{ craeted: 'idk', cost: 120 },
); // typescript will infer each data type dynamically
console.log(mergedObj.game);

// stores the length property for elements.length
interface Lengthy {
	length: number;
}

function countAndDiscribe<T extends Lengthy>(elements: T) {
	let discription = 'Got no elements';
	if (elements.length === 1) {
		discription = 'Got one element';
	} else if (elements.length > 1) {
		discription = `Got ${elements.length} of elements`;
	}
	return [elements, discription];
}

console.log(countAndDiscribe('Hello world'));

//keyof operator/keyword ensures that the generic type of U will be a keywird in T

function extractAndConvert<T extends object, U extends keyof T>(
	obj: T,
	key: U,
) {
	return 'Value ' + obj[key];
}

extractAndConvert({ name: 'steve' }, 'name')

// Generic class

class DataStorage<T extends string | number | boolean> {          // will only work with primitive values
    private data: T[] = []      // will isnure that the data passed in is uniform

    addItem(item: T) {
        this.data.push(item)
    }

    removeItem(item: T) {
        this.data.splice(this.data.indexOf(item), 1)
    }

    getItems() {
        [...this.data]
    }
}

const textStorage = new DataStorage<string>()
textStorage.addItem('Stevens')
textStorage.addItem('Dave')
textStorage.addItem('Shawn')
textStorage.removeItem('Shawn')
console.log(textStorage.getItems())

// Built in types with Utilities

//Partial type
interface CourseGoal {
	title: string
	discription: string
	completeUntil: Date
}

function CreateCourseGoal(title: string, discription: string, date: Date): CourseGoal {
	// return {title: title, discription: discription, completeUntil: date}
	let courseGoal: Partial<CourseGoal> = {}
	// Partial raps arround the CourseGoal, all of the properties will become optionally, essentially removing the errors
	//Just in case they is extra validation

	courseGoal.title = title
	courseGoal.discription = discription
	courseGoal.completeUntil = date
	
	return courseGoal as CourseGoal		// Returning won't work as the value will still be a Partial type until its casted
}

// Readonly Type

const people: Readonly<string[]> = ['Dave', 'Steve']
 // people.push('John')		This would yield an error

// TODO: check for more utilities https://www.typescriptlang.org/docs/handbook/utility-types.html