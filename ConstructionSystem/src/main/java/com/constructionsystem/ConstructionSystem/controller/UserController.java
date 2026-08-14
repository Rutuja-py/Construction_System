package com.constructionsystem.ConstructionSystem.controller;

import com.constructionsystem.ConstructionSystem.dto.UserResponse;
import com.constructionsystem.ConstructionSystem.service.UserService;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // GET ALL USERS
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {

        return ResponseEntity.ok(
                userService.getAllUsers()
        );
    }

    // GET USER BY ID
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                userService.getUserById(id)
        );
    }

    // GET USER BY USERNAME
    @GetMapping("/username")
    public ResponseEntity<UserResponse> getUserByUsername(
            @RequestParam String username) {

        return ResponseEntity.ok(
                userService.getUserByUsername(username)
        );
    }

    // GET USERS BY ROLE
    @GetMapping("/role/{role}")
    public ResponseEntity<List<UserResponse>> getUsersByRole(
            @PathVariable String role) {

        return ResponseEntity.ok(
                userService.getUsersByRole(role)
        );
    }
}