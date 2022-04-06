class Department {
    // name: string;
    private employees: string[] = []; // sets a new array of employees with the type of string && private insures that the employees array is not accessible outside of the class

    constructor(private readonly id: string, public name: string) { // syntax for private: modifier variables without double declarations && readonly: modifier variables that cannot be changed
        // this.name = n;
    }
    describe(this: Department) {    // the this keyword is used to refer to the current instance of the class beimg called which is the Department
        console.log(`Department (${this.id}): ${this.name}`);
    }

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
        super(id, 'IT');
        this.admins = admins;
    }
}

class AccountingDepartment extends Department {
    constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
    }

    addReport(text: string) {
        this.reports.push(text);
    }

    printReports() {
        console.log(this.reports);
    }
}

const accounting = new Department("A1","Accounting");

accounting.addEmployee("Max");
accounting.addEmployee("Manu");

accounting.printEmployeeInformation();
accounting.describe();