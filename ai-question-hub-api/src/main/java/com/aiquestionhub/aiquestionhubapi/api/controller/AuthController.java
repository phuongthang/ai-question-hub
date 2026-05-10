package com.aiquestionhub.aiquestionhubapi.api.controller;

import com.aiquestionhub.aiquestionhubapi.api.controller.swagger.AuthControllerSwagger;
import com.aiquestionhub.aiquestionhubapi.api.request.ForgotPasswordRequest;
import com.aiquestionhub.aiquestionhubapi.api.request.LoginRequest;
import com.aiquestionhub.aiquestionhubapi.api.request.ResetPasswordRequest;
import com.aiquestionhub.aiquestionhubapi.api.response.AuthResponse;
import com.aiquestionhub.aiquestionhubapi.api.response.ForgotPasswordResponse;
import com.aiquestionhub.aiquestionhubapi.api.response.LogoutResponse;
import com.aiquestionhub.aiquestionhubapi.api.service.AuthService;
import com.aiquestionhub.aiquestionhubapi.api.request.UserRegisterRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController implements AuthControllerSwagger {

    private final AuthService authService;

    @Override
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @Override
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody @Valid UserRegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @Override
    @PostMapping("/forgot-password")
    public ResponseEntity<ForgotPasswordResponse> forgotPassword(@RequestBody @Valid ForgotPasswordRequest request) {
        return ResponseEntity.ok(authService.forgotPassword(request));
    }

    @Override
    @PostMapping("/reset-password")
    public ResponseEntity<LogoutResponse> resetPassword(@RequestBody @Valid ResetPasswordRequest request) {
        return ResponseEntity.ok(authService.resetPassword(request));
    }

    @Override
    @PostMapping("/logout")
    public ResponseEntity<LogoutResponse> logout(@RequestHeader("Authorization") String authorization) {
        return ResponseEntity.ok(authService.logout(authorization));
    }
}
