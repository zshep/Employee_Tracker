INSERT INTO department (department_id, name)
VALUES (001, "Sales"),
        (002, "HR"),
        (003, "Management");
-- add into the table role with these parameters
INSERT INTO role (role_id, title, salary, department_id)
/*to do: how to write department id as a variable */
VALUES (01, 'Manager', 360000, 001); 

INSERT INTO employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (001, "Jack","Skelington", 01, 01);