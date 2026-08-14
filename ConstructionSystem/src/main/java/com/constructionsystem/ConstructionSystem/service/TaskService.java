package com.constructionsystem.ConstructionSystem.service;

import com.constructionsystem.ConstructionSystem.dto.TaskRequest;
import com.constructionsystem.ConstructionSystem.dto.TaskResponse;
import com.constructionsystem.ConstructionSystem.entity.Project;
import com.constructionsystem.ConstructionSystem.entity.Task;
import com.constructionsystem.ConstructionSystem.entity.User;
import com.constructionsystem.ConstructionSystem.repository.ProjectRepository;
import com.constructionsystem.ConstructionSystem.repository.TaskRepository;
import com.constructionsystem.ConstructionSystem.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public TaskService(
            TaskRepository taskRepository,
            ProjectRepository projectRepository,
            UserRepository userRepository) {

        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public List<TaskResponse> getAllTasks() {

        return taskRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public TaskResponse getTaskById(Long id) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Task not found with id: " + id));

        return convertToResponse(task);
    }

    public List<TaskResponse> getTasksByProject(
            Long projectId) {

        return taskRepository.findAll()
                .stream()
                .filter(task ->
                        task.getProject() != null
                        && task.getProject()
                                .getId()
                                .equals(projectId))
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public TaskResponse createTask(TaskRequest request) {

        Project project = projectRepository.findById(
                request.getProjectId()
        ).orElseThrow(() ->
                new RuntimeException("Project not found"));

        Task task = new Task();

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setProject(project);
        task.setPriority(
                request.getPriority() != null
                        ? request.getPriority()
                        : "MEDIUM"
        );
        task.setStatus(
                request.getStatus() != null
                        ? request.getStatus()
                        : "PENDING"
        );
        task.setStartDate(request.getStartDate());
        task.setDueDate(request.getDueDate());
        task.setProgress(
                request.getProgress() != null
                        ? request.getProgress()
                        : 0.0
        );

        if (request.getAssignedToId() != null) {

            User user = userRepository.findById(
                    request.getAssignedToId()
            ).orElseThrow(() ->
                    new RuntimeException(
                            "Assigned user not found"));

            task.setAssignedTo(user);
        }

        Task savedTask = taskRepository.save(task);

        return convertToResponse(savedTask);
    }

    public TaskResponse updateTask(
            Long id,
            TaskRequest request) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Task not found with id: " + id));

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setPriority(request.getPriority());
        task.setStatus(request.getStatus());
        task.setStartDate(request.getStartDate());
        task.setDueDate(request.getDueDate());
        task.setProgress(request.getProgress());

        if (request.getProjectId() != null) {

            Project project = projectRepository.findById(
                    request.getProjectId()
            ).orElseThrow(() ->
                    new RuntimeException(
                            "Project not found"));

            task.setProject(project);
        }

        if (request.getAssignedToId() != null) {

            User user = userRepository.findById(
                    request.getAssignedToId()
            ).orElseThrow(() ->
                    new RuntimeException(
                            "Assigned user not found"));

            task.setAssignedTo(user);
        }

        Task updatedTask = taskRepository.save(task);

        return convertToResponse(updatedTask);
    }

    public void deleteTask(Long id) {

        if (!taskRepository.existsById(id)) {

            throw new RuntimeException(
                    "Task not found with id: " + id);
        }

        taskRepository.deleteById(id);
    }

    private TaskResponse convertToResponse(Task task) {

        TaskResponse response = new TaskResponse();

        response.setId(task.getId());
        response.setTitle(task.getTitle());
        response.setDescription(task.getDescription());

        if (task.getProject() != null) {

            response.setProjectId(
                    task.getProject().getId());

            response.setProjectName(
                    task.getProject().getName());
        }

        if (task.getAssignedTo() != null) {

            response.setAssignedToId(
                    task.getAssignedTo().getId());

            response.setAssignedToName(
                    task.getAssignedTo().getName());
        }

        response.setPriority(task.getPriority());
        response.setStatus(task.getStatus());
        response.setStartDate(task.getStartDate());
        response.setDueDate(task.getDueDate());
        response.setProgress(task.getProgress());

        boolean overdue =
                task.getDueDate() != null
                && task.getDueDate().isBefore(LocalDate.now())
                && !"COMPLETED".equalsIgnoreCase(
                        task.getStatus());

        response.setOverdue(overdue);

        return response;
    }
}