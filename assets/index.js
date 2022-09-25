const inquirer = require("inquire");




//array of objects for menu question
const intro_questions =[
    {
        type: "list",
        message: "What would you like to do?",
        name: "menu",
        choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
    },
  
]

// array of objects to hold questions to add a department
const department_questions = [
    {
        type: "input",
        message: "What is the name of your new department?",
        name: "department_name",
        defualt: "Missing Deperatment Name"
    },

]

// array of objects to hold questions to add a new role
const role_questions =[
    {
        type: "input",
        message:"What is the name of the new role?",
        name: "role_name",
        default: "Missing role name",
    },
    {
        type: "input",
        message:"What is the salary for the new role?",
        name: "role_salary",
        default: "Missing salary",
    },
    {
        type: "list",
        message:"what department does this new role belong to?",
        name: "role_department",
        choices: [department_choices], // TO DO: create variable to hold departments
    },
]
// array of objects to hold questions to add a new employee
const employee_questions = [
    {
        type: "input",
        message:"What is the first name of the new employee?",
        name: "employee_firstname",
        default: "Missing employee first name",
    },
    {
        type: "input",
        message:"What is the last name of the new employee?",
        name: "employee_lastname",
        default: "Missing employee last name",
    },
    {
        type: "list",
        message:"What is the role of the new employee?",
        name: "employee_firstname",
        choices: [role_choices], // TO DO: create variable to hold roles
    },
    {
        type: "input",
        message:"Who is the manager of the new employee?",
        name: "employee_firstname",
        default: "Missing manager name",
    },

]



// function that starts inquirer with the menu
function init_menu() {
    inquirer.prompt(intro_questions)
            //
        .then(answer => {
            //debugging
            console.table(answer);
            //switch function to decide next action
            switch(answer.menu){
                case "View All Departments":
                    return ;//function to view departments
                case "view all roles":
                    return ;//function to  view roles
                case "view all employees":
                    return ;//function to view employees
                case "add a department":
                    return; //fuction to add department
                case "add a role":
                    return; //fuction to add role
            
                case "add an employee":
                    return; //fuction to add an employee
            
                case "update an employee role":
                    return; //fuction to update an employee
            }         
        })
}
// Function call to initialize app menu
init_menu();




// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids





// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role



// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to







// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database




// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database



// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database



// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database