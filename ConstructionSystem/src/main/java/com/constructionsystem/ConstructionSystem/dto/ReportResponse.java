package com.constructionsystem.ConstructionSystem.dto;

import java.time.LocalDate;

public class ReportResponse {

    private Long projectId;

    private String projectName;

    private String projectStatus;

    private Double projectBudget;

    private Double projectProgress;

    private Long totalTasks;

    private Long completedTasks;

    private Long pendingTasks;

    private Long overdueTasks;

    private Double totalExpenses;

    private Double approvedExpenses;

    private Double pendingExpenses;

    private Double remainingBudget;

    private LocalDate startDate;

    private LocalDate endDate;

    public ReportResponse() {
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getProjectStatus() {
        return projectStatus;
    }

    public void setProjectStatus(String projectStatus) {
        this.projectStatus = projectStatus;
    }

    public Double getProjectBudget() {
        return projectBudget;
    }

    public void setProjectBudget(Double projectBudget) {
        this.projectBudget = projectBudget;
    }

    public Double getProjectProgress() {
        return projectProgress;
    }

    public void setProjectProgress(Double projectProgress) {
        this.projectProgress = projectProgress;
    }

    public Long getTotalTasks() {
        return totalTasks;
    }

    public void setTotalTasks(Long totalTasks) {
        this.totalTasks = totalTasks;
    }

    public Long getCompletedTasks() {
        return completedTasks;
    }

    public void setCompletedTasks(Long completedTasks) {
        this.completedTasks = completedTasks;
    }

    public Long getPendingTasks() {
        return pendingTasks;
    }

    public void setPendingTasks(Long pendingTasks) {
        this.pendingTasks = pendingTasks;
    }

    public Long getOverdueTasks() {
        return overdueTasks;
    }

    public void setOverdueTasks(Long overdueTasks) {
        this.overdueTasks = overdueTasks;
    }

    public Double getTotalExpenses() {
        return totalExpenses;
    }

    public void setTotalExpenses(Double totalExpenses) {
        this.totalExpenses = totalExpenses;
    }

    public Double getApprovedExpenses() {
        return approvedExpenses;
    }

    public void setApprovedExpenses(Double approvedExpenses) {
        this.approvedExpenses = approvedExpenses;
    }

    public Double getPendingExpenses() {
        return pendingExpenses;
    }

    public void setPendingExpenses(Double pendingExpenses) {
        this.pendingExpenses = pendingExpenses;
    }

    public Double getRemainingBudget() {
        return remainingBudget;
    }

    public void setRemainingBudget(Double remainingBudget) {
        this.remainingBudget = remainingBudget;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
}