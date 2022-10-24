INSERT INTO department (id, name)
VALUES (001, "Sales"),
        (002, "HR"),
        (003, "Management");
-- add into the table role with these parameters
INSERT INTO role (id, title, salary, department_id)
/*to do: how to write department id as a variable */
VALUES (01, 'Manager', 360000, 003),
        (02, 'HR_person', 100000, 002),
        (03, 'Sales_person', 100000, 001),
        (04, 'Ass_regional_manager', 200000, 001);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (001, "Micheal","Scott", 01, NULL),
        (002, "Toby", "Noname", 02, 01),
        (003, "Jim", "Halpert", 03, 01),
        (004, "Dwight", "Schrute", 04, 01);
