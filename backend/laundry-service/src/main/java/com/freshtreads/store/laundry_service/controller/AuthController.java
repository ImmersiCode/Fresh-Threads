package com.freshtreads.store.laundry_service.controller;

import com.freshtreads.store.laundry_service.config.AdminConfig;
import com.freshtreads.store.laundry_service.service.TwilioService;
import com.freshtreads.store.laundry_service.util.JwtUtil;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    private final TwilioService twilioService;
    private final JwtUtil jwtUtil;

    @Autowired
    private AdminConfig adminConfig;

    @PostMapping("/request-otp")
    public ResponseEntity<?> sendOtp(@RequestBody PhoneRequest request) {
        twilioService.sendOtp(request.getPhone());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody verifyRequest request) {
        boolean valid = twilioService.verifyOtp(request.getPhone(), request.getOtp());
        if (!valid) return ResponseEntity.status(401).body("Invalid OTP");

        twilioService.clearOtp(request.getPhone());
        String token = jwtUtil.generateToken(request.getPhone(), "USER");
        return ResponseEntity.ok(new TokenResponse(token));
    }

    @PostMapping("/admin-login")
    public ResponseEntity<?> adminLogin(@RequestBody AdminLoginRequest request) {
        String savedPass = String.valueOf(adminConfig.getUsers().get(request.getPhone()));
        if (savedPass == null || !savedPass.equals(request.getPassword())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        String token = jwtUtil.generateToken(request.getPhone(), "ADMIN");
        return ResponseEntity.ok(new TokenResponse(token));
    }

    @Data
    static class AdminLoginRequest {
        private String phone;
        private String password;
    }


    @Data
    static class PhoneRequest {
        private String phone;
    }

    @Data
    static class verifyRequest {
        private String phone, otp;
    }

    @Data
    static class TokenResponse {
        private final String token;
    }
}
