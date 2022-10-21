// loading in neaded libraries
const inquirer = require("inquirer");
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();


let department_choices = [];
let role_choices = [];

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
        choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
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
        choices: [department_choices], // TO DO: create variable to hold departments
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
        name: "employee_firstname",
        choices: [role_choices], // TO DO: create variable to hold roles...database
    },
    {
        type: "input",
        message: "Who is the manager of the new employee?",
        name: "employee_firstname",
        default: "Missing manager name",
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
                console.log('does this work?')
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
            default:
                console.log('something went horribly wrong');
        }
    })
};

// function to display all departments


// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids

const showDepartments = () => {
    console.log('show department has started')
    dbconnect.query('SELECT * FROM department;', function (err, results) {
        console.table(results);
    } );
    setTimeout(() => {
        init_menu();
    }, 1000);    
}


//function to display table of roles displaying title, role id, department, salaray
function showRoles() {
    // WHEN I choose to view all roles
    // THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
    console.log('show roles has started')
    dbconnect.query('SELECT * FROM role;', function (err, results) {
        console.table(results);
    } );
    setTimeout(() => {
        init_menu();
    }, 1000);   

};

//function to display table displaying employee id, first name, last name, job titles, departments, salaries, manager
function showEmployees() {
    // WHEN I choose to view all employees
    // THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    return process.exit(1);
};

//function to create new department from user and add it to the db
function addDepartment() {

    // WHEN I choose to add a department
    // THEN I am prompted to enter the name of the department and that department is added to the database
    inquirer.prompt(department_questions)
        .then(answer => {
            //write to database        

        })
};

// //function to create role from user input
function addRole() {
    // WHEN I choose to add a role
    // THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
    inquirer.prompt(role_questions)
        .then(answer => {
            //write to database

        })
};

//fuction to create employee from user input
function addEmployee() {
    // WHEN I choose to add an employee
    // THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
    inquirer.prompt(employee_questions)
        .then(answer => {
            //write to database
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



