package com.constructionsystem.ConstructionSystem.controller;

import com.constructionsystem.ConstructionSystem.dto.LoginRequest;
import com.constructionsystem.ConstructionSystem.dto.LoginResponse;
import com.constructionsystem.ConstructionSystem.dto.UserResponse;
import com.constructionsystem.ConstructionSystem.service.AuthService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // =========================================================
    // LOGIN
    // POST /api/auth/login
    // =========================================================

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {

        LoginResponse response =
                authService.login(request);

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // CURRENT USER
    // GET /api/auth/me
    // =========================================================

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(
            Authentication authentication) {

        UserResponse response =
                authService.getCurrentUser(
                        authentication.getName()
                );

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // LOGOUT
    // =========================================================

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {

        SecurityContextHolder.clearContext();

        return ResponseEntity.ok(
                "Logged out successfully"
        );
    }
}