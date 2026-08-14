package com.constructionsystem.ConstructionSystem.service;

import com.constructionsystem.ConstructionSystem.dto.LoginRequest;
import com.constructionsystem.ConstructionSystem.dto.LoginResponse;
import com.constructionsystem.ConstructionSystem.dto.UserResponse;
import com.constructionsystem.ConstructionSystem.entity.User;
import com.constructionsystem.ConstructionSystem.repository.UserRepository;
import com.constructionsystem.ConstructionSystem.security.JwtService;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    // =========================================================
    // CONSTRUCTOR
    // =========================================================

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    // =========================================================
    // LOGIN
    // =========================================================

    public LoginResponse login(LoginRequest request) {

        // -----------------------------------------------------
        // FIND USER
        // -----------------------------------------------------

        User user =
                userRepository
                        .findByUsername(
                                request.getUsername()
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid username or password"
                                )
                        );

        // -----------------------------------------------------
        // CHECK ACTIVE
        // -----------------------------------------------------

        if (!Boolean.TRUE.equals(user.getActive())) {

            throw new RuntimeException(
                    "User account is inactive"
            );
        }

        // -----------------------------------------------------
        // CHECK PASSWORD
        // -----------------------------------------------------

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException(
                    "Invalid username or password"
            );
        }

        // -----------------------------------------------------
        // GENERATE JWT
        // -----------------------------------------------------

        String token =
                jwtService.generateToken(user);

        // -----------------------------------------------------
        // USER RESPONSE
        // -----------------------------------------------------

        UserResponse userResponse =
                new UserResponse(
                        user.getId(),
                        user.getName(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getRole().name()
                );

        // -----------------------------------------------------
        // RETURN LOGIN RESPONSE
        // -----------------------------------------------------

        return new LoginResponse(
                token,
                userResponse
        );
    }

    // =========================================================
    // CURRENT USER
    // =========================================================

    public UserResponse getCurrentUser(
            String username) {

        User user =
                userRepository
                        .findByUsername(username)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );

        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getUsername(),
                user.getEmail(),
                user.getRole().name()
        );
    }
}