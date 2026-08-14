package com.constructionsystem.ConstructionSystem.service;

import com.constructionsystem.ConstructionSystem.dto.ProjectRequest;
import com.constructionsystem.ConstructionSystem.dto.ProjectResponse;
import com.constructionsystem.ConstructionSystem.entity.Project;
import com.constructionsystem.ConstructionSystem.entity.User;
import com.constructionsystem.ConstructionSystem.repository.ProjectRepository;
import com.constructionsystem.ConstructionSystem.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectService(
            ProjectRepository projectRepository,
            UserRepository userRepository) {

        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    // =========================================================
    // GET ALL
    // =========================================================

    public List<ProjectResponse> getAllProjects() {

        return projectRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // =========================================================
    // GET BY ID
    // =========================================================

    public ProjectResponse getProjectById(Long id) {

        Project project =
                projectRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Project not found with id: "
                                                + id
                                )
                        );

        return convertToResponse(project);
    }

    // =========================================================
    // GET BY STATUS
    // =========================================================

    public List<ProjectResponse> getProjectsByStatus(
            String status) {

        return projectRepository
                .findByStatus(status)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // =========================================================
    // CREATE
    // =========================================================

    public ProjectResponse createProject(
            ProjectRequest request) {

        Project project = new Project();

        project.setName(request.getName());
        project.setDescription(request.getDescription());
        project.setLocation(request.getLocation());
        project.setBudget(request.getBudget());
        project.setStartDate(request.getStartDate());
        project.setEndDate(request.getEndDate());

        project.setStatus(
                request.getStatus() != null
                        ? request.getStatus()
                        : "PLANNING"
        );

        project.setProgress(
                request.getProgress() != null
                        ? request.getProgress()
                        : 0.0
        );

        // -----------------------------------------------------
        // PROJECT MANAGER
        // -----------------------------------------------------

        if (request.getProjectManagerId() != null) {

            User manager =
                    userRepository.findById(
                            request.getProjectManagerId()
                    ).orElseThrow(() ->
                            new RuntimeException(
                                    "Project manager not found"
                            )
                    );

            project.setProjectManager(manager);
        }

        Project savedProject =
                projectRepository.save(project);

        return convertToResponse(savedProject);
    }

    // =========================================================
    // UPDATE
    // =========================================================

    public ProjectResponse updateProject(
            Long id,
            ProjectRequest request) {

        Project project =
                projectRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Project not found with id: "
                                                + id
                                )
                        );

        project.setName(request.getName());
        project.setDescription(request.getDescription());
        project.setLocation(request.getLocation());
        project.setBudget(request.getBudget());
        project.setStartDate(request.getStartDate());
        project.setEndDate(request.getEndDate());

        if (request.getStatus() != null) {

            project.setStatus(
                    request.getStatus()
            );
        }

        if (request.getProgress() != null) {

            project.setProgress(
                    request.getProgress()
            );
        }

        if (request.getProjectManagerId() != null) {

            User manager =
                    userRepository.findById(
                            request.getProjectManagerId()
                    ).orElseThrow(() ->
                            new RuntimeException(
                                    "Project manager not found"
                            )
                    );

            project.setProjectManager(manager);
        }

        Project updatedProject =
                projectRepository.save(project);

        return convertToResponse(updatedProject);
    }

    // =========================================================
    // DELETE
    // =========================================================

    public void deleteProject(Long id) {

        if (!projectRepository.existsById(id)) {

            throw new RuntimeException(
                    "Project not found with id: " + id
            );
        }

        projectRepository.deleteById(id);
    }

    // =========================================================
    // ENTITY → RESPONSE
    // =========================================================

    private ProjectResponse convertToResponse(
            Project project) {

        ProjectResponse response =
                new ProjectResponse();

        response.setId(project.getId());
        response.setName(project.getName());
        response.setDescription(project.getDescription());
        response.setLocation(project.getLocation());
        response.setBudget(project.getBudget());
        response.setStartDate(project.getStartDate());
        response.setEndDate(project.getEndDate());
        response.setStatus(project.getStatus());
        response.setProgress(project.getProgress());

        if (project.getProjectManager() != null) {

            response.setProjectManagerId(
                    project.getProjectManager().getId()
            );

            response.setProjectManagerName(
                    project.getProjectManager().getName()
            );
        }

        return response;
    }
}