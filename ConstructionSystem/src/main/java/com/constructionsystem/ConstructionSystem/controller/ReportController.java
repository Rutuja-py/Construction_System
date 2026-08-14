package com.constructionsystem.ConstructionSystem.controller;

import com.constructionsystem.ConstructionSystem.dto.ReportResponse;
import com.constructionsystem.ConstructionSystem.service.ReportService;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    // GET ALL PROJECT REPORTS
    @GetMapping("/projects")
    public ResponseEntity<List<ReportResponse>> getProjectReports() {

        return ResponseEntity.ok(
                reportService.getProjectReports()
        );
    }

    // GET REPORT FOR ONE PROJECT
    @GetMapping("/project/{projectId}")
    public ResponseEntity<ReportResponse> getProjectReport(
            @PathVariable Long projectId) {

        return ResponseEntity.ok(
                reportService.getProjectReport(projectId)
        );
    }
}