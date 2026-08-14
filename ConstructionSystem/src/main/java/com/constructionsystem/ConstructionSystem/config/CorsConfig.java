package com.constructionsystem.ConstructionSystem.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        // =====================================================
        // FRONTEND
        // =====================================================

        configuration.setAllowedOrigins(
                Arrays.asList(
                        "http://localhost:5173"
                )
        );

        // =====================================================
        // METHODS
        // =====================================================

        configuration.setAllowedMethods(
                Arrays.asList(
                        "GET",
                        "POST",
                        "PUT",
                        "PATCH",
                        "DELETE",
                        "OPTIONS"
                )
        );

        // =====================================================
        // HEADERS
        // =====================================================

        configuration.setAllowedHeaders(
                Arrays.asList(
                        "Authorization",
                        "Content-Type",
                        "Accept",
                        "Origin",
                        "X-Requested-With"
                )
        );

        // =====================================================
        // RESPONSE HEADERS
        // =====================================================

        configuration.setExposedHeaders(
                Arrays.asList(
                        "Authorization"
                )
        );

        // =====================================================
        // CREDENTIALS
        // =====================================================

        configuration.setAllowCredentials(true);

        // =====================================================
        // CACHE
        // =====================================================

        configuration.setMaxAge(3600L);

        // =====================================================
        // REGISTER
        // =====================================================

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }
}