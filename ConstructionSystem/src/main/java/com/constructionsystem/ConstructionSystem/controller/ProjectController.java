package com.constructionsystem.ConstructionSystem.controller;

import com.constructionsystem.ConstructionSystem.dto.ProjectRequest;
import com.constructionsystem.ConstructionSystem.dto.ProjectResponse;
import com.constructionsystem.ConstructionSystem.service.ProjectService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(
            ProjectService projectService) {

        this.projectService = projectService;
    }

    // =========================================================
    // GET ALL PROJECTS
    // GET /api/projects
    // =========================================================

    @GetMapping
    public ResponseEntity<List<ProjectResponse>>
    getAllProjects() {

        return ResponseEntity.ok(
                projectService.getAllProjects()
        );
    }

    // =========================================================
    // GET PROJECT BY ID
    // GET /api/projects/{id}
    // =========================================================

    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponse>
    getProjectById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                projectService.getProjectById(id)
        );
    }

    // =========================================================
    // GET PROJECTS BY STATUS
    // GET /api/projects/status?status=PLANNING
    // =========================================================

    @GetMapping("/status")
    public ResponseEntity<List<ProjectResponse>>
    getProjectsByStatus(
            @RequestParam String status) {

        return ResponseEntity.ok(
                projectService.getProjectsByStatus(
                        status
                )
        );
    }

    // =========================================================
    // CREATE
    // POST /api/projects
    // =========================================================

    @PostMapping
    public ResponseEntity<ProjectResponse>
    createProject(
            @Valid @RequestBody ProjectRequest request) {

        ProjectResponse project =
                projectService.createProject(
                        request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(project);
    }

    // =========================================================
    // UPDATE
    // PUT /api/projects/{id}
    // =========================================================

    @PutMapping("/{id}")
    public ResponseEntity<ProjectResponse>
    updateProject(
            @PathVariable Long id,
            @Valid @RequestBody ProjectRequest request) {

        return ResponseEntity.ok(
                projectService.updateProject(
                        id,
                        request
                )
        );
    }

    // =========================================================
    // DELETE
    // DELETE /api/projects/{id}
    // =========================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String>
    deleteProject(
            @PathVariable Long id) {

        projectService.deleteProject(id);

        return ResponseEntity.ok(
                "Project deleted successfully"
        );
    }
}