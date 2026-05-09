package com.aiquestionhub.aiquestionhubapi.api.auth.service;

import com.aiquestionhub.aiquestionhubapi.api.auth.request.ForgotPasswordRequest;
import com.aiquestionhub.aiquestionhubapi.api.auth.request.LoginRequest;
import com.aiquestionhub.aiquestionhubapi.api.auth.request.ResetPasswordRequest;
import com.aiquestionhub.aiquestionhubapi.api.auth.response.AuthResponse;
import com.aiquestionhub.aiquestionhubapi.api.auth.response.ForgotPasswordResponse;
import com.aiquestionhub.aiquestionhubapi.api.auth.response.LogoutResponse;
import com.aiquestionhub.aiquestionhubapi.api.user.request.UserRegisterRequest;

public interface AuthService {

    AuthResponse login(LoginRequest request);

    AuthResponse register(UserRegisterRequest request);

    ForgotPasswordResponse forgotPassword(ForgotPasswordRequest request);

    LogoutResponse resetPassword(ResetPasswordRequest request);

    LogoutResponse logout(String bearerToken);
}
