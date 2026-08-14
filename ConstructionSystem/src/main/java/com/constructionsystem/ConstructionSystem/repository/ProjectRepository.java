package com.constructionsystem.ConstructionSystem.repository;

import com.constructionsystem.ConstructionSystem.entity.Project;
import com.constructionsystem.ConstructionSystem.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository
        extends JpaRepository<Project, Long> {

    List<Project> findByProjectManager(
            User projectManager
    );

    List<Project> findByStatus(
            String status
    );

    List<Project> findByProjectManagerId(
            Long managerId
    );
}