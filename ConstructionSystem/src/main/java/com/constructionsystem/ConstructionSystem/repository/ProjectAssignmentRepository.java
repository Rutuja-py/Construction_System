package com.constructionsystem.ConstructionSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.constructionsystem.ConstructionSystem.entity.ProjectAssignment;

import java.util.List;
import java.util.Optional;

public interface ProjectAssignmentRepository
        extends JpaRepository<ProjectAssignment, Long> {

    List<ProjectAssignment> findByProjectId(Long projectId);

    List<ProjectAssignment> findByUserId(Long userId);

    Optional<ProjectAssignment> findByProjectIdAndUserId(
            Long projectId,
            Long userId
    );

    boolean existsByProjectIdAndUserId(
            Long projectId,
            Long userId
    );

    void deleteByProjectIdAndUserId(
            Long projectId,
            Long userId
    );
}