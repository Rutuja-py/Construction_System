package com.constructionsystem.ConstructionSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.constructionsystem.ConstructionSystem.entity.Expense;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByProjectId(Long projectId);

    List<Expense> findByCreatedById(Long userId);

    List<Expense> findByStatus(String status);

    List<Expense> findByCategory(String category);

    List<Expense> findByProjectIdAndStatus(
            Long projectId,
            String status
    );
}