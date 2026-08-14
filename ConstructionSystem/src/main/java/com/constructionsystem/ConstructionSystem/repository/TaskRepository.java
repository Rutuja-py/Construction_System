package com.constructionsystem.ConstructionSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.constructionsystem.ConstructionSystem.entity.Task;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByProjectId(Long projectId);

    List<Task> findByAssignedToId(Long userId);

    List<Task> findByStatus(String status);

    List<Task> findByPriority(String priority);

    List<Task> findByProjectIdAndStatus(
            Long projectId,
            String status
    );

    List<Task> findByAssignedToIdAndStatus(
            Long userId,
            String status
    );
}