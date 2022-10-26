// loading in neaded libraries
const inquirer = require("inquirer");
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();


const department_choices = [];
const role_choices = [];
const employee_choices = [];

// create the connection to database
const dbconnect = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        database: 'owner_db',
        password: process.env.DB_PASSWORD
    },
    console.log('Connected to the database owner_db')
);


// dbconnect.connect(err => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log('conneciton worked');
//     }
// })

//   --------------- Arrays holding questions for usuer input ------------------------
//array of objects for menu question
const menu_questions = [
    {
        type: "list",
        message: "What would you like to do?",
        name: "menu",
        choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "exit program"],
    },

]
//array of objects to hold questions to add a department
const department_questions = [
    {
        type: "input",
        message: "What is the name of your new department?",
        name: "department_name",
        defualt: "Missing Deperatment Name"
    },

]
// array of objects to hold questions to add a new role
const role_questions = [
    {
        type: "input",
        message: "What is the name of the new role?",
        name: "role_name",
        default: "Missing role name",
    },
    {
        type: "input",
        message: "What is the salary for the new role?",
        name: "role_salary",
        default: "Missing salary",
    },
    {
        type: "list",
        message: "what department does this new role belong to?",
        name: "role_department",
        choices: department_choices, // TO DO: create variable to hold departments
    },
]
// array of objects to hold questions to add a new employee
const employee_questions = [
    {
        type: "input",
        message: "What is the first name of the new employee?",
        name: "employee_firstname",
        default: "Missing employee first name",
    },
    {
        type: "input",
        message: "What is the last name of the new employee?",
        name: "employee_lastname",
        default: "Missing employee last name",
    },
    {
        type: "list",
        message: "What is the role of the new employee?",
        name: "employee_role",
        choices: role_choices, 
    },
    {
        type: "input",
        message: "Who is the manager of the new employee?",
        name: "employee_manager",
        choices: employee_choices,
    },

]

//  array of object to hold question to update the role of an employee
const role_update_qustions = [
    {
        type: "list",
        name: "new_role",
        choices: [role_choices],
    }
]

// ----------------------functions to deal with processing user input ----------------------------

// function that starts inquirer with the menu
function init_menu() {
    inquirer.prompt(menu_questions).then(answer => {
        //debugging
        console.table(answer);
        //switch function to decide next action
        switch (answer.menu) {
            case "view all departments":
                 showDepartments() //function to view departments
                 break;
            case "view all roles":
                 showRoles();//function to  view roles
                break;
            case "view all employees":
                showEmployees();//function to view employees
                break;
            case "add a department":
                addDepartment();//fuction to add department
                break;
            case "add a role":
                addRole(); //fuction to add role
                break;
            case "add an employee":
                addEmployee(); //fuction to add an employee
                break;
            case "update an employee role":
                updateEmployee(); //fuction to update an employee
                break;
            case "exit program":
                console.log("Goodbye");
                return process.exit(1);
            default:
                console.log('something went horribly wrong');
        }
    })
};


// function to show all departments in table
const showDepartments = () => {
    console.log('show department has started', '\n', '\n')
    dbconnect.query('SELECT id AS department_id, name AS department_name FROM department;', function (err, results) {
        console.table(results);
    });
    setTimeout(() => {
        init_menu();
    }, 3000);    
}

//function to show all roles in table 
function showRoles() {
    console.log('show roles has started', '\n', '\n')
    dbconnect.query('SELECT role.id AS role_id, role.title, role.salary, department.name AS department_name FROM role INNER JOIN department ON role.department_id =department.id;', function (err, results) {
        if(err){
            console.error(err);
        }
        console.table(results);
    } );
    setTimeout(() => {
        init_menu();
    }, 3000);   
};

//function to display all employees in table
function showEmployees() {
    console.log('show employees has started', '\n', '\n')
    //id, employee first name/last name, role title, salary, department, and manager name
    dbconnect.query(
        `SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS job_title, role.salary, department.name AS department_name, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager_name FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee Manager ON manager.id = employee.manager_id;`, function (err, results) {
        if(err){
            console.error(err);
        }
        console.table(results);
    });
    setTimeout(() => {
        init_menu();
    }, 3000);   
};

//function to create new department from user and add it to the db
async function addDepartment() {

    // Uses inquirer to get user input on new department name
       await inquirer.prompt(department_questions)
        .then(answer => {
            //adds new department into table
            dbconnect.query(      
                `INSERT INTO department (name) VALUES ('${answer.department_name}');`, function(err, results){
                    if(err){
                        console.error(err);
                    }
                console.log(`Adding the department ${answer.department_name} was successful`);
                }
            )
        });
            init_menu();      
};

// //function to create role from user input
async function addRole() {
   
    //adding in department name/id into empty array
     dbconnect.query(
        `SELECT * FROM department`, function(err, results){
            if(err){
                console.log('could not populate department array');
                console.error(err);
            }
            results.map((department) => department_choices.push({
            name: department.name,
            value: department.id
            }))
            console.log(department_choices);
        }
    )
    //debugging...why isn't this being called?
    console.log('role array should have been populated')
    
    await inquirer.prompt(role_questions)
    .then(answer => {
        //adds new role into table
        console.table(answer);
        dbconnect.query(      
            `INSERT INTO role (title, salary, department_id) VALUES ('${answer.role_name}', ${answer.role_salary}, ${answer.role_department});`, function(err, results){
                if(err){
                    console.error(err);
                }
                console.table(results);
                console.log(`Adding the new role of ${answer.role_name} was successful`);
                setTimeout(() => {
                    init_menu();
                }, 3000);   
            }
        )
    });
};

//fuction to create employee from user input
async function addEmployee() {
   
    //grab role ID/role name for user to select as a choice in empty array
    dbconnect.query(
        `SELECT id, title FROM role`, function(err, results){
            if(err){
                console.log('could not populate role array');
                console.error(err);
            }
            results.map((role) => role_choices.push({
            name: role.title,
            value: role.id
            }))
            console.log(role_choices);
        }
    )

    // THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
    await inquirer.prompt(employee_questions)
        .then(answer => {
            //write to database
            console.table(answer);
            dbconnect.query(
                `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answer.employee_firstname}', ${answer.employee_lastname}, ${answer.employee_role}, ${answer.employee_manager});`, function(err, results){
                    if(err){
                        console.error(err);
                    }
                    console.table(results);
                    console.log(`Adding the new employee, ${answer.employee_firstname} ${answer.employee_lastname} was successful`);
                    setTimeout(() => {
                        init_menu();
                    }, 3000);   
                }
            )
        })
};

// function to change an employee role and rewrite to database
function updateEmployee() {

    // WHEN I choose to update an employee role
    // THEN I am prompted to select an employee to update and their new role and this information is updated in the database
    inquirer.prompt(role_update_qustions)
        .then(answer => {
            //write to database
        })

};


// --------------------------------------Action Code --------------------------------------------------

// Function call to initialize app menu
init_menu();



