// Interface discribes the structure of a object
interface Person  { 
    name: string,
    age: number
    
    greet(phrase: string): void
}

let user1: Person = {
    name: 'Steve',
    age: 16,
    greet(phrase:string) {
        console.log(phrase + ' ' + this.name + 'from Minecraft');
    }
}

user1.greet('I am');