-- ============================================================
-- Construction Project Management Platform
-- Sample Test Data
-- ============================================================

USE construction_system;

-- ============================================================
-- SAMPLE USERS
-- ============================================================
-- NOTE:
-- Use the password values generated/configured by your application.
-- Do not use real production passwords in this file.

INSERT INTO users (username, password, role)
VALUES
('admin', '$2a$10$EXAMPLE_HASH_REPLACE_WITH_YOUR_BCRYPT_HASH', 'ADMIN'),
('projectmanager', '$2a$10$EXAMPLE_HASH_REPLACE_WITH_YOUR_BCRYPT_HASH', 'PROJECT_MANAGER'),
('siteengineer', '$2a$10$EXAMPLE_HASH_REPLACE_WITH_YOUR_BCRYPT_HASH', 'SITE_ENGINEER');

-- ============================================================
-- SAMPLE PROJECTS
-- ============================================================

INSERT INTO projects
(name, description, start_date, end_date, status)
VALUES
(
    'Riverside Commercial Building',
    'Construction of a commercial building with office and retail facilities.',
    '2026-01-15',
    '2027-06-30',
    'ACTIVE'
),
(
    'Green Valley Residential Project',
    'Residential construction project consisting of multiple housing units.',
    '2026-03-01',
    '2027-03-31',
    'PLANNED'
),
(
    'City Infrastructure Development',
    'Infrastructure development and site improvement project.',
    '2026-02-10',
    '2026-12-31',
    'IN_PROGRESS'
);

-- ============================================================
-- SAMPLE DATA NOTES
-- ============================================================
-- Additional task, expense, and assignment records should be
-- created through the application APIs so that the correct
-- foreign-key relationships and entity mappings are maintained.