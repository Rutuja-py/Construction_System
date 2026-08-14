package com.constructionsystem.ConstructionSystem.security;

import com.constructionsystem.ConstructionSystem.entity.User;
import com.constructionsystem.ConstructionSystem.repository.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Component;

import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter
        extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    public JwtAuthenticationFilter(
            JwtService jwtService,
            UserRepository userRepository) {

        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        try {

            // =====================================================
            // GET AUTHORIZATION HEADER
            // =====================================================

            String authorizationHeader =
                    request.getHeader("Authorization");

            // No Authorization header
            if (authorizationHeader == null ||
                    !authorizationHeader.startsWith("Bearer ")) {

                filterChain.doFilter(request, response);
                return;
            }

            // =====================================================
            // EXTRACT JWT
            // =====================================================

            String token =
                    authorizationHeader.substring(7);

            // =====================================================
            // EXTRACT USERNAME
            // =====================================================

            String username =
                    jwtService.extractUsername(token);

            // =====================================================
            // CHECK WHETHER USER IS ALREADY AUTHENTICATED
            // =====================================================

            if (username != null &&
                    SecurityContextHolder
                            .getContext()
                            .getAuthentication() == null) {

                // =================================================
                // FIND USER
                // =================================================

                User user =
                        userRepository
                                .findByUsername(username)
                                .orElse(null);

                if (user != null &&
                        Boolean.TRUE.equals(user.getActive()) &&
                        jwtService.isTokenValid(
                                token,
                                user.getUsername())) {

                    // =============================================
                    // CREATE ROLE AUTHORITY
                    // =============================================

                    SimpleGrantedAuthority authority =
                            new SimpleGrantedAuthority(
                                    "ROLE_" +
                                            user.getRole().name()
                            );

                    // =============================================
                    // CREATE AUTHENTICATION
                    // =============================================

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    user.getUsername(),
                                    null,
                                    Collections.singletonList(
                                            authority
                                    )
                            );

                    // =============================================
                    // STORE AUTHENTICATION
                    // =============================================

                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(
                                    authentication
                            );
                }
            }

        } catch (Exception e) {

            // Invalid/expired token.
            // Do not authenticate the request.

            SecurityContextHolder
                    .clearContext();
        }

        // =========================================================
        // CONTINUE REQUEST
        // =========================================================

        filterChain.doFilter(request, response);
    }
}