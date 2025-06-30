package com.freshtreads.store.laundry_service.controller;

import io.jsonwebtoken.Claims;
import com.freshtreads.store.laundry_service.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/me")
@RequiredArgsConstructor
public class UserController {

    private final JwtUtil jwtUtil;

    @GetMapping
    public ResponseEntity<?> getCurrentUser(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Missing or invalid token");
        }

        try {
            String token = authHeader.substring(7);
            Claims claims = jwtUtil.parseToken(token);

            String phone = claims.getSubject();
            String role = claims.get("role", String.class);

            return ResponseEntity.ok(new UserResponse(phone, role));
        } catch (Exception e) {
            return ResponseEntity.status(403).body("Unauthorized: " + e.getMessage());
        }
    }

    record UserResponse(String phone, String role) {
    }
}
