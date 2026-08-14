package com.constructionsystem.ConstructionSystem.service;

import com.constructionsystem.ConstructionSystem.dto.ReportResponse;
import com.constructionsystem.ConstructionSystem.entity.Project;
import com.constructionsystem.ConstructionSystem.repository.ExpenseRepository;
import com.constructionsystem.ConstructionSystem.repository.ProjectRepository;
import com.constructionsystem.ConstructionSystem.repository.TaskRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportService {

    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;
    private final ExpenseRepository expenseRepository;

    public ReportService(
            ProjectRepository projectRepository,
            TaskRepository taskRepository,
            ExpenseRepository expenseRepository) {

        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
        this.expenseRepository = expenseRepository;
    }

    public List<ReportResponse> getProjectReports() {

        return projectRepository.findAll()
                .stream()
                .map(this::generateReport)
                .collect(Collectors.toList());
    }

    public ReportResponse getProjectReport(Long projectId) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Project not found with id: "
                                        + projectId));

        return generateReport(project);
    }

    private ReportResponse generateReport(
            Project project) {

        ReportResponse response =
                new ReportResponse();

        Long projectId = project.getId();

        response.setProjectId(projectId);
        response.setProjectName(project.getName());
        response.setProjectStatus(project.getStatus());
        response.setProjectBudget(project.getBudget());
        response.setProjectProgress(project.getProgress());
        response.setStartDate(project.getStartDate());
        response.setEndDate(project.getEndDate());

        List<com.constructionsystem.ConstructionSystem.entity.Task> tasks =
                taskRepository.findAll()
                        .stream()
                        .filter(task ->
                                task.getProject() != null
                                && task.getProject()
                                        .getId()
                                        .equals(projectId))
                        .toList();

        long totalTasks = tasks.size();

        long completedTasks =
                tasks.stream()
                        .filter(task ->
                                "COMPLETED".equalsIgnoreCase(
                                        task.getStatus()))
                        .count();

        long pendingTasks =
                tasks.stream()
                        .filter(task ->
                                !"COMPLETED".equalsIgnoreCase(
                                        task.getStatus()))
                        .count();

        long overdueTasks =
                tasks.stream()
                        .filter(task ->
                                task.getDueDate() != null
                                && task.getDueDate()
                                        .isBefore(
                                                LocalDate.now())
                                && !"COMPLETED"
                                        .equalsIgnoreCase(
                                                task.getStatus()))
                        .count();

        response.setTotalTasks(totalTasks);
        response.setCompletedTasks(completedTasks);
        response.setPendingTasks(pendingTasks);
        response.setOverdueTasks(overdueTasks);

        List<com.constructionsystem.ConstructionSystem.entity.Expense> expenses =
                expenseRepository.findAll()
                        .stream()
                        .filter(expense ->
                                expense.getProject() != null
                                && expense.getProject()
                                        .getId()
                                        .equals(projectId))
                        .toList();

        double totalExpenses =
                expenses.stream()
                        .mapToDouble(
                                expense -> expense.getAmount() != null
                                        ? expense.getAmount()
                                        : 0.0)
                        .sum();

        double approvedExpenses =
                expenses.stream()
                        .filter(expense ->
                                "APPROVED".equalsIgnoreCase(
                                        expense.getStatus()))
                        .mapToDouble(
                                expense -> expense.getAmount() != null
                                        ? expense.getAmount()
                                        : 0.0)
                        .sum();

        double pendingExpenses =
                expenses.stream()
                        .filter(expense ->
                                "PENDING".equalsIgnoreCase(
                                        expense.getStatus()))
                        .mapToDouble(
                                expense -> expense.getAmount() != null
                                        ? expense.getAmount()
                                        : 0.0)
                        .sum();

        response.setTotalExpenses(totalExpenses);
        response.setApprovedExpenses(approvedExpenses);
        response.setPendingExpenses(pendingExpenses);

        double budget =
                project.getBudget() != null
                        ? project.getBudget()
                        : 0.0;

        response.setRemainingBudget(
                budget - approvedExpenses);

        return response;
    }
}