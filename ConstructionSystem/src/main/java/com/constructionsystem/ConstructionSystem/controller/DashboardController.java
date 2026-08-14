
package com.constructionsystem.ConstructionSystem.controller;

import com.constructionsystem.ConstructionSystem.dto.DashboardResponse;
import com.constructionsystem.ConstructionSystem.service.DashboardService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(
            DashboardService dashboardService) {

        this.dashboardService = dashboardService;
    }

    // GET /api/dashboard/summary

    @GetMapping("/summary")
    public ResponseEntity<DashboardResponse> getSummary(
            Authentication authentication) {

        String username =
                authentication.getName();

        DashboardResponse response =
                dashboardService.getDashboardSummary(
                        username
                );

        return ResponseEntity.ok(response);
    }

    // GET /api/dashboard/projects

    @GetMapping("/projects")
    public ResponseEntity<DashboardResponse> getProjectSummary(
            Authentication authentication) {

        String username =
                authentication.getName();

        DashboardResponse response =
                dashboardService.getProjectSummary(
                        username
                );

        return ResponseEntity.ok(response);
    }

    // GET /api/dashboard/tasks

    @GetMapping("/tasks")
    public ResponseEntity<DashboardResponse> getTaskSummary(
            Authentication authentication) {

        String username =
                authentication.getName();

        DashboardResponse response =
                dashboardService.getTaskSummary(
                        username
                );

        return ResponseEntity.ok(response);
    }

    // GET /api/dashboard/expenses

    @GetMapping("/expenses")
    public ResponseEntity<DashboardResponse> getExpenseSummary(
            Authentication authentication) {

        String username =
                authentication.getName();

        DashboardResponse response =
                dashboardService.getExpenseSummary(
                        username
                );

        return ResponseEntity.ok(response);
    }
}
