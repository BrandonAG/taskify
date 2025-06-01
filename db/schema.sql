SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS priority;
CREATE TABLE priority (
    id int AUTO_INCREMENT UNIQUE,
    level varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS status;
CREATE TABLE status (
    id int AUTO_INCREMENT UNIQUE,
    status varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS permission;
CREATE TABLE permission (
    id int AUTO_INCREMENT UNIQUE,
    level varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS user;
CREATE TABLE user (
    id int AUTO_INCREMENT UNIQUE,
    user_name varchar(255) NOT NULL UNIQUE,
    user_password varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS project;
CREATE TABLE project (
    id int AUTO_INCREMENT UNIQUE,
    project_name varchar(255) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS user_project;
CREATE TABLE user_project (
    id int AUTO_INCREMENT UNIQUE,
    user_id int NOT NULL,
    project_id int NOT NULL,
    permission_id int NOT NULL,
    UNIQUE (user_id, project_id),
    FOREIGN KEY (user_id)
        REFERENCES user(id)
        ON DELETE CASCADE,
    FOREIGN KEY (project_id)
        REFERENCES project(id)
        ON DELETE CASCADE,
    FOREIGN KEY (permission_id)
        REFERENCES permission(id),
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS task;
CREATE TABLE task (
    id int AUTO_INCREMENT UNIQUE,
    task_name varchar(255) NOT NULL,
    task_description varchar(255) NOT NULL,
    project_id int NOT NULL,
    assigned_to_id int,
    priority_id int,
    status_id int,
    FOREIGN KEY (project_id)
        REFERENCES project(id)
        ON DELETE CASCADE,
    FOREIGN KEY (assigned_to_id)
        REFERENCES user(id)
        ON DELETE SET NULL,
    FOREIGN KEY (priority_id)
        REFERENCES priority(id)
        ON DELETE SET NULL,
    FOREIGN KEY (status_id)
        REFERENCES status(id)
        ON DELETE SET NULL,
    PRIMARY KEY (id)
);

SET FOREIGN_KEY_CHECKS = 1;