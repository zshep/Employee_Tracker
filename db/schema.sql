DROP DATABASE IF EXISTS owner_db;
CREATE DATABASE owner_db;


USE owner_db;

-- table of department
CREATE TABLE department(
    id INT,
    name VARCHAR(30), --hold department name
    PRIMARY KEY (id)

);

--table of role
CREATE TABLE role(
    id INT,
    title VARCHAR(30), --hold role title
    salary DECIMAL -- hold role salery
    department_id INT,  --hold reference to department role begins to
    PRIMARY KEY (id)
    FOREIGN KEY (department_id)
    REFERENCES department(id)

);

--table of employee
CREATE TABLE employee(
    id INT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id: INT,
    manager_id INT,
    PRimary KEY (id)
    FOREIGN KEY (role_id)
    REFERENCES role(id)


):


