package com.constructionsystem.ConstructionSystem.controller;

import com.constructionsystem.ConstructionSystem.dto.TaskRequest;
import com.constructionsystem.ConstructionSystem.dto.TaskResponse;
import com.constructionsystem.ConstructionSystem.service.TaskService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // GET ALL TASKS
    @GetMapping
    public ResponseEntity<List<TaskResponse>> getAllTasks() {

        return ResponseEntity.ok(
                taskService.getAllTasks()
        );
    }

    // GET TASK BY ID
    @GetMapping("/{id}")
    public ResponseEntity<TaskResponse> getTaskById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                taskService.getTaskById(id)
        );
    }

    // GET TASKS BY PROJECT
    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<TaskResponse>> getTasksByProject(
            @PathVariable Long projectId) {

        return ResponseEntity.ok(
                taskService.getTasksByProject(projectId)
        );
    }

    // CREATE TASK
    @PostMapping
    public ResponseEntity<TaskResponse> createTask(
            @Valid @RequestBody TaskRequest request) {

        TaskResponse task =
                taskService.createTask(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(task);
    }

    // UPDATE TASK
    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> updateTask(
            @PathVariable Long id,
            @Valid @RequestBody TaskRequest request) {

        return ResponseEntity.ok(
                taskService.updateTask(id, request)
        );
    }

    // DELETE TASK
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(
            @PathVariable Long id) {

        taskService.deleteTask(id);

        return ResponseEntity.ok(
                "Task deleted successfully"
        );
    }
}