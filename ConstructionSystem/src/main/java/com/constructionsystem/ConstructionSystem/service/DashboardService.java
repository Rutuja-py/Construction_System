
package com.constructionsystem.ConstructionSystem.service;

import com.constructionsystem.ConstructionSystem.dto.DashboardResponse;
import com.constructionsystem.ConstructionSystem.repository.ProjectRepository;
import com.constructionsystem.ConstructionSystem.repository.TaskRepository;

import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;

    public DashboardService(
            ProjectRepository projectRepository,
            TaskRepository taskRepository) {

        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
    }

    // =========================================================
    // COMPLETE DASHBOARD SUMMARY
    // =========================================================

    public DashboardResponse getDashboardSummary(
            String username) {

        long totalProjects =
                projectRepository.count();

        long totalTasks =
                taskRepository.count();

        return new DashboardResponse(

                totalProjects,   // totalProjects
                0L,              // activeProjects
                0L,              // completedProjects
                0L,              // pendingProjects

                totalTasks,      // totalTasks
                0L,              // completedTasks
                0L,              // pendingTasks
                0L,              // overdueTasks

                0.0,             // totalExpenses
                0.0,             // approvedExpenses
                0.0,             // pendingExpenses

                0.0,             // totalBudget
                0.0              // remainingBudget
        );
    }

    // =========================================================
    // PROJECT SUMMARY
    // =========================================================

    public DashboardResponse getProjectSummary(
            String username) {

        long totalProjects =
                projectRepository.count();

        return new DashboardResponse(

                totalProjects,
                0L,
                0L,
                0L,

                0L,
                0L,
                0L,
                0L,

                0.0,
                0.0,
                0.0,

                0.0,
                0.0
        );
    }

    // =========================================================
    // TASK SUMMARY
    // =========================================================

    public DashboardResponse getTaskSummary(
            String username) {

        long totalTasks =
                taskRepository.count();

        return new DashboardResponse(

                0L,
                0L,
                0L,
                0L,

                totalTasks,
                0L,
                0L,
                0L,

                0.0,
                0.0,
                0.0,

                0.0,
                0.0
        );
    }

    // =========================================================
    // EXPENSE SUMMARY
    // =========================================================

    public DashboardResponse getExpenseSummary(
            String username) {

        return new DashboardResponse(

                0L,
                0L,
                0L,
                0L,

                0L,
                0L,
                0L,
                0L,

                0.0,
                0.0,
                0.0,

                0.0,
                0.0
        );
    }
}
