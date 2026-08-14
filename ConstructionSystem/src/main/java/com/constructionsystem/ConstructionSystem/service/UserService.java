package com.constructionsystem.ConstructionSystem.service;

import com.constructionsystem.ConstructionSystem.dto.UserResponse;
import com.constructionsystem.ConstructionSystem.entity.User;
import com.constructionsystem.ConstructionSystem.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserResponse> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public UserResponse getUserById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found with id: " + id));

        return convertToResponse(user);
    }

    public UserResponse getUserByUsername(String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return convertToResponse(user);
    }

    public List<UserResponse> getUsersByRole(String role) {

        return userRepository.findAll()
                .stream()
                .filter(user ->
                        user.getRole().name().equalsIgnoreCase(role))
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private UserResponse convertToResponse(User user) {

        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getUsername(),
                user.getEmail(),
                user.getRole().name()
        );
    }
}