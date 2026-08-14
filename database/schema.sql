-- Construction Project Management Platform
-- MySQL database schema matching the current Spring Boot JPA entities.
-- Database: construction_system

CREATE DATABASE IF NOT EXISTS construction_system;
USE construction_system;

CREATE TABLE IF NOT EXISTS users (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (id),
    UNIQUE KEY uk_users_username (username),
    UNIQUE KEY uk_users_email (email)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS projects (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    location VARCHAR(255) NOT NULL,
    budget DOUBLE NOT NULL,
    start_date DATE,
    end_date DATE,
    status VARCHAR(255) NOT NULL,
    progress DOUBLE NOT NULL DEFAULT 0.0,
    project_manager_id BIGINT,
    PRIMARY KEY (id),
    CONSTRAINT fk_projects_manager
        FOREIGN KEY (project_manager_id) REFERENCES users(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS project_assignments (
    id BIGINT NOT NULL AUTO_INCREMENT,
    project_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    assignment_role VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_project_user (project_id, user_id),
    CONSTRAINT fk_assignments_project
        FOREIGN KEY (project_id) REFERENCES projects(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_assignments_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS tasks (
    id BIGINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    project_id BIGINT NOT NULL,
    assigned_to_id BIGINT,
    priority VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    start_date DATE,
    due_date DATE,
    progress DOUBLE NOT NULL DEFAULT 0.0,
    PRIMARY KEY (id),
    CONSTRAINT fk_tasks_project
        FOREIGN KEY (project_id) REFERENCES projects(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_tasks_assigned_user
        FOREIGN KEY (assigned_to_id) REFERENCES users(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS expenses (
    id BIGINT NOT NULL AUTO_INCREMENT,
    project_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    amount DOUBLE NOT NULL,
    category VARCHAR(255) NOT NULL,
    expense_date DATE,
    payment_method VARCHAR(255),
    status VARCHAR(255) NOT NULL DEFAULT 'PENDING',
    created_by_id BIGINT,
    PRIMARY KEY (id),
    CONSTRAINT fk_expenses_project
        FOREIGN KEY (project_id) REFERENCES projects(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_expenses_created_by
        FOREIGN KEY (created_by_id) REFERENCES users(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

-- The application uses Hibernate/JPA with spring.jpa.hibernate.ddl-auto=update,
-- so Hibernate can also create/update these tables automatically.
