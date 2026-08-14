package com.constructionsystem.ConstructionSystem.config;

import com.constructionsystem.ConstructionSystem.security.JwtAuthenticationFilter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter) {

        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    // =========================================================
    // PASSWORD ENCODER
    // =========================================================

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }

    // =========================================================
    // SECURITY FILTER CHAIN
    // =========================================================

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http

                // -------------------------------------------------
                // CSRF
                // -------------------------------------------------

                .csrf(csrf -> csrf.disable())

                // -------------------------------------------------
                // CORS
                // -------------------------------------------------

                .cors(cors -> {})

                // -------------------------------------------------
                // SESSION
                // -------------------------------------------------

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                // -------------------------------------------------
                // AUTHORIZATION
                // -------------------------------------------------

                .authorizeHttpRequests(auth -> auth

                        // =========================================
                        // PUBLIC ENDPOINTS
                        // =========================================

                        .requestMatchers(
                                "/api/auth/login",
                                "/api/auth/register",
                                "/api/health",
                                "/error"
                        ).permitAll()

                        // =========================================
                        // USERS
                        // =========================================

                        .requestMatchers(
                                "/api/users",
                                "/api/users/**"
                        ).hasRole("ADMIN")

                        // =========================================
                        // PROJECTS
                        // =========================================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/projects",
                                "/api/projects/**"
                        ).hasAnyRole(
                                "ADMIN",
                                "PROJECT_MANAGER",
                                "SITE_ENGINEER"
                        )

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/projects",
                                "/api/projects/**"
                        ).hasAnyRole(
                                "ADMIN",
                                "PROJECT_MANAGER"
                        )

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/projects",
                                "/api/projects/**"
                        ).hasAnyRole(
                                "ADMIN",
                                "PROJECT_MANAGER"
                        )

                        .requestMatchers(
                                HttpMethod.PATCH,
                                "/api/projects",
                                "/api/projects/**"
                        ).hasAnyRole(
                                "ADMIN",
                                "PROJECT_MANAGER"
                        )

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/projects",
                                "/api/projects/**"
                        ).hasRole("ADMIN")

                        // =========================================
                        // TASKS
                        // =========================================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/tasks",
                                "/api/tasks/**"
                        ).hasAnyRole(
                                "ADMIN",
                                "PROJECT_MANAGER",
                                "SITE_ENGINEER"
                        )

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/tasks",
                                "/api/tasks/**"
                        ).hasAnyRole(
                                "ADMIN",
                                "PROJECT_MANAGER"
                        )

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/tasks",
                                "/api/tasks/**"
                        ).hasAnyRole(
                                "ADMIN",
                                "PROJECT_MANAGER",
                                "SITE_ENGINEER"
                        )

                        .requestMatchers(
                                HttpMethod.PATCH,
                                "/api/tasks",
                                "/api/tasks/**"
                        ).hasAnyRole(
                                "ADMIN",
                                "PROJECT_MANAGER",
                                "SITE_ENGINEER"
                        )

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/tasks",
                                "/api/tasks/**"
                        ).hasAnyRole(
                                "ADMIN",
                                "PROJECT_MANAGER"
                        )

                        // =========================================
                        // EXPENSES
                        // =========================================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/expenses",
                                "/api/expenses/**"
                        ).hasAnyRole(
                                "ADMIN",
                                "PROJECT_MANAGER",
                                "SITE_ENGINEER"
                        )

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/expenses",
                                "/api/expenses/**"
                        ).hasAnyRole(
                                "ADMIN",
                                "PROJECT_MANAGER"
                        )

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/expenses",
                                "/api/expenses/**"
                        ).hasAnyRole(
                                "ADMIN",
                                "PROJECT_MANAGER"
                        )

                        .requestMatchers(
                                HttpMethod.PATCH,
                                "/api/expenses",
                                "/api/expenses/**"
                        ).hasAnyRole(
                                "ADMIN",
                                "PROJECT_MANAGER"
                        )

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/expenses",
                                "/api/expenses/**"
                        ).hasRole("ADMIN")

                        // =========================================
                        // EXPENSE APPROVAL
                        // =========================================

                        .requestMatchers(
                                "/api/expenses/*/approve",
                                "/api/expenses/*/reject"
                        ).hasAnyRole(
                                "ADMIN",
                                "PROJECT_MANAGER"
                        )

                        // =========================================
                        // DASHBOARD
                        // =========================================

                        .requestMatchers(
                                "/api/dashboard",
                                "/api/dashboard/**"
                        ).hasAnyRole(
                                "ADMIN",
                                "PROJECT_MANAGER",
                                "SITE_ENGINEER"
                        )

                        // =========================================
                        // REPORTS
                        // =========================================

                        .requestMatchers(
                                "/api/reports",
                                "/api/reports/**"
                        ).hasAnyRole(
                                "ADMIN",
                                "PROJECT_MANAGER",
                                "SITE_ENGINEER"
                        )

                        // =========================================
                        // EVERYTHING ELSE
                        // =========================================

                        .anyRequest().authenticated()
                )

                // -------------------------------------------------
                // JWT FILTER
                // -------------------------------------------------

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}