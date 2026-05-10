package com.aiquestionhub.aiquestionhubapi.api.controller.swagger;

import com.aiquestionhub.aiquestionhubapi.api.request.ForgotPasswordRequest;
import com.aiquestionhub.aiquestionhubapi.api.request.LoginRequest;
import com.aiquestionhub.aiquestionhubapi.api.request.ResetPasswordRequest;
import com.aiquestionhub.aiquestionhubapi.api.response.AuthResponse;
import com.aiquestionhub.aiquestionhubapi.api.response.ForgotPasswordResponse;
import com.aiquestionhub.aiquestionhubapi.api.response.LogoutResponse;
import com.aiquestionhub.aiquestionhubapi.api.request.UserRegisterRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@Tag(name = "Authentication", description = "Authentication APIs")
public interface AuthControllerSwagger {

    @SecurityRequirements
    @Operation(summary = "Login", responses = {
            @ApiResponse(responseCode = "200", description = "Login successful"),
            @ApiResponse(responseCode = "400", description = "Invalid credentials or input")
    })
    ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request);

    @SecurityRequirements
    @Operation(summary = "Register", responses = {
            @ApiResponse(responseCode = "200", description = "Registration successful"),
            @ApiResponse(responseCode = "400", description = "Invalid input"),
            @ApiResponse(responseCode = "409", description = "Username or email already exists")
    })
    ResponseEntity<AuthResponse> register(@RequestBody UserRegisterRequest request);

    @SecurityRequirements
    @Operation(summary = "Forgot password - send OTP", responses = {
            @ApiResponse(responseCode = "200", description = "OTP sent if email exists")
    })
    ResponseEntity<ForgotPasswordResponse> forgotPassword(@RequestBody ForgotPasswordRequest request);

    @SecurityRequirements
    @Operation(summary = "Reset password with OTP", responses = {
            @ApiResponse(responseCode = "200", description = "Password reset successful"),
            @ApiResponse(responseCode = "400", description = "Invalid OTP or expired")
    })
    ResponseEntity<LogoutResponse> resetPassword(@RequestBody ResetPasswordRequest request);

    @Operation(summary = "Logout", responses = {
            @ApiResponse(responseCode = "200", description = "Logout successful"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    ResponseEntity<LogoutResponse> logout(@RequestHeader("Authorization") String authorization);
}
