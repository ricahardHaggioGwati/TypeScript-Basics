// Generics type is a type that is connected to another type and it needs to know what that other type is before it can be used.

// Built in generics
// Array type
const names: Array<string> = []         // altr const names: string[] = []
names[0].split(' ')                     // names stores a generic string type

// Promise type

const promise: Promise<string> = new Promise((resolve, reject) => {     // the built in generic is able to offer typescript more information about the return value, hence insuring we don't call the incorrect methods on the return value
    setTimeout(() => {
        resolve('All done 😄')
    }, 2000);
    reject(new Error(' Failed to load'))
})

promise.then(data => {
    data.split(' ')
})

// Generic Functions
// extending will constrain the type an insure that it is not of type any
function merge<T extends Object, U extends Object>(objA: T, objB: U) {    // typescript will be able to infer that T, U are of different types and the functions should return a union of both types. The data will be assigned dynamically.
    // using mege<object>(objA: Object, objB: Object) {....} mergedObj.game would have not worked
    return Object.assign(objA, objB)
}

const mergedObj = merge({ name: 'Steve', game: 'Minecraft' }, { craeted: 'idk', cost: 120 }) // typescript will infer each data type dynamically 
console.log(mergedObj.game)