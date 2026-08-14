
package com.constructionsystem.ConstructionSystem.dto;

public class DashboardResponse {

    private Long totalProjects;
    private Long activeProjects;
    private Long completedProjects;
    private Long pendingProjects;

    private Long totalTasks;
    private Long completedTasks;
    private Long pendingTasks;
    private Long overdueTasks;

    private Double totalExpenses;
    private Double approvedExpenses;
    private Double pendingExpenses;

    private Double totalBudget;
    private Double remainingBudget;

    public DashboardResponse() {
    }

    public DashboardResponse(
            Long totalProjects,
            Long activeProjects,
            Long completedProjects,
            Long pendingProjects,
            Long totalTasks,
            Long completedTasks,
            Long pendingTasks,
            Long overdueTasks,
            Double totalExpenses,
            Double approvedExpenses,
            Double pendingExpenses,
            Double totalBudget,
            Double remainingBudget) {

        this.totalProjects = totalProjects;
        this.activeProjects = activeProjects;
        this.completedProjects = completedProjects;
        this.pendingProjects = pendingProjects;

        this.totalTasks = totalTasks;
        this.completedTasks = completedTasks;
        this.pendingTasks = pendingTasks;
        this.overdueTasks = overdueTasks;

        this.totalExpenses = totalExpenses;
        this.approvedExpenses = approvedExpenses;
        this.pendingExpenses = pendingExpenses;

        this.totalBudget = totalBudget;
        this.remainingBudget = remainingBudget;
    }

    public Long getTotalProjects() {
        return totalProjects;
    }

    public void setTotalProjects(Long totalProjects) {
        this.totalProjects = totalProjects;
    }

    public Long getActiveProjects() {
        return activeProjects;
    }

    public void setActiveProjects(Long activeProjects) {
        this.activeProjects = activeProjects;
    }

    public Long getCompletedProjects() {
        return completedProjects;
    }

    public void setCompletedProjects(Long completedProjects) {
        this.completedProjects = completedProjects;
    }

    public Long getPendingProjects() {
        return pendingProjects;
    }

    public void setPendingProjects(Long pendingProjects) {
        this.pendingProjects = pendingProjects;
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

    public Double getTotalBudget() {
        return totalBudget;
    }

    public void setTotalBudget(Double totalBudget) {
        this.totalBudget = totalBudget;
    }

    public Double getRemainingBudget() {
        return remainingBudget;
    }

    public void setRemainingBudget(Double remainingBudget) {
        this.remainingBudget = remainingBudget;
    }
}

