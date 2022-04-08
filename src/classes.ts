abstract class Department { // an abstarct class can not be instantiated
    protected employees: string[] = []; // sets a new array of employees with the type of string && private insures that the employees array is not accessible outside of the class. Employees can be set to protected which allows the employees array to be accessed by the class and its subclasses

    constructor(protected readonly id: string, public name: string) { // syntax for private: modifier variables without double declarations && readonly: modifier variables that cannot be changed
        // this.name = n;
    }

    static createEmployee(name: string) { 
        return { name: name };              // returns A method that can be called on the class itself e.g. Department.createEmployee(name). In order to access a static method/property of a class, you must call the class name followed by the dot operator. e.g. console.log(Department.fiscalYear)
    }

    abstract describe(this: Department): void;  // the this keyword is used to refer to the current instance of the class beimg called which is the Department. Setting a method as abstract means that the method must be implemented in the subclasses.
    

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

class ITDepartment extends Department {
    admins: string[];
    constructor(id: string, admins: string[]) {
        super(id, 'IT');        // Super should be usaed before any this bindings
        this.admins = admins;
    }

    describe() {
        console.log(`Accounting Department - ID: ${this.id}`);
    }
}

class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment;

    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found');
    }

    set mostRecentReport(value: string) { 
        if (!value) { 
            throw new Error('Please pass in a valid value');
        }
        this.addReport(value);
    }

    private constructor(id: string, private reports: string[]) {        // Singly patterned class
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }

/* The cpde below and above displays the Singly pattern which insiues that a class can only be instanciated once and after that, any attempts to instanciate a new class with return the same class */
    static getInstance() {
        if (AccountingDepartment.instance) {        // if the instance is not null, return the instance
            return this.instance;
        }
        this.instance = new AccountingDepartment('d2', []);
        return this.instance;
    }

    addEmployee(employee: string) { // Employees now works because it is a subclass of Department and has been switched from private to protected  
        if (employee === 'Max') {
            return;
        }
        this.employees.push(employee);  
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }

    describe() {
        console.log(`Accounting Department - ID: ${this.id}`);
    }
}

 //const accounting = new AccountingDepartment("A1",[]);
const accounting = AccountingDepartment.getInstance();

accounting.mostRecentReport = 'Year End Report';  // this is a setter
accounting.addEmployee("Max");
accounting.addEmployee("Manu");
accounting.addReport("Something went wrong");
console.log(accounting.mostRecentReport);       // this is a getter, it msut no be executed like a function
accounting.printEmployeeInformation();
accounting.describe();