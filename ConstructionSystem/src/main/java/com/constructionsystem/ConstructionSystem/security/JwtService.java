package com.constructionsystem.ConstructionSystem.security;

import com.constructionsystem.ConstructionSystem.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;

import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    private static final String SECRET_KEY =
            "ConstructionSystemSecretKeyForJwtAuthentication2026SecureKey12345";

    private static final long EXPIRATION_TIME =
            1000L * 60 * 60 * 10;

    // =========================================================
    // SIGNING KEY
    // =========================================================

    private SecretKey getSigningKey() {

        return Keys.hmacShaKeyFor(
                SECRET_KEY.getBytes(StandardCharsets.UTF_8)
        );
    }

    // =========================================================
    // GENERATE TOKEN
    // =========================================================

    public String generateToken(User user) {

        return Jwts.builder()

                .subject(user.getUsername())

                .claim(
                        "role",
                        user.getRole().name()
                )

                .issuedAt(new Date())

                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + EXPIRATION_TIME
                        )
                )

                .signWith(getSigningKey())

                .compact();
    }

    // =========================================================
    // EXTRACT USERNAME
    // =========================================================

    public String extractUsername(String token) {

        return extractAllClaims(token)
                .getSubject();
    }

    // =========================================================
    // EXTRACT ROLE
    // =========================================================

    public String extractRole(String token) {

        return extractAllClaims(token)
                .get("role", String.class);
    }

    // =========================================================
    // VALIDATE TOKEN
    // =========================================================

    public boolean isTokenValid(
            String token,
            String username) {

        try {

            String tokenUsername =
                    extractUsername(token);

            return tokenUsername.equals(username)
                    && !isTokenExpired(token);

        } catch (Exception e) {

            return false;
        }
    }

    // =========================================================
    // CHECK EXPIRATION
    // =========================================================

    public boolean isTokenExpired(String token) {

        return extractExpiration(token)
                .before(new Date());
    }

    // =========================================================
    // GET EXPIRATION
    // =========================================================

    private Date extractExpiration(String token) {

        return extractAllClaims(token)
                .getExpiration();
    }

    // =========================================================
    // GET CLAIMS
    // =========================================================

    private Claims extractAllClaims(String token) {

        return Jwts.parser()

                .verifyWith(getSigningKey())

                .build()

                .parseSignedClaims(token)

                .getPayload();
    }
}