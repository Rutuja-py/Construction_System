# Assumptions

The following assumptions were considered during the development of the Construction Project Management Platform:

1. The application is intended for authorized users involved in construction project management.

2. Users are assigned appropriate roles according to their responsibilities within the system.

3. The system uses the following roles:
   - ADMIN
   - PROJECT_MANAGER
   - SITE_ENGINEER

4. Users are expected to provide valid authentication credentials to access protected functionality.

5. The application is developed and tested in a local development environment using React.js, Spring Boot, Hibernate/JPA, and MySQL.

6. MySQL is assumed to be installed and running before starting the backend application.

7. The backend REST API is responsible for business logic, validation, authentication, authorization, and database communication.

8. The React frontend communicates with the Spring Boot backend through REST APIs.

9. Sample data is intended for development, demonstration, and testing purposes and should not be considered production data.

10. The system assumes that users have sufficient permissions to perform operations associated with their assigned roles.

11. The application is designed as a web-based project management platform and does not currently assume a dedicated mobile application.

12. Production deployment may require additional configuration for security, database credentials, environment variables, hosting, monitoring, and scalability.

13. Sensitive credentials such as database passwords and security secrets should be configured locally and should not be committed to the public GitHub repository.
