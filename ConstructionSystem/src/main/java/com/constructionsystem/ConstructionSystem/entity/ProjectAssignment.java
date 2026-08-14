package com.constructionsystem.ConstructionSystem.entity;

import jakarta.persistence.*;

@Entity
@Table(
        name = "project_assignments",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {
                                "project_id",
                                "user_id"
                        }
                )
        }
)
public class ProjectAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "project_id",
            nullable = false
    )
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "user_id",
            nullable = false
    )
    private User user;

    @Column(nullable = false)
    private String assignmentRole;

    public ProjectAssignment() {
    }

    public ProjectAssignment(
            Project project,
            User user,
            String assignmentRole) {

        this.project = project;
        this.user = user;
        this.assignmentRole = assignmentRole;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getAssignmentRole() {
        return assignmentRole;
    }

    public void setAssignmentRole(String assignmentRole) {
        this.assignmentRole = assignmentRole;
    }
}