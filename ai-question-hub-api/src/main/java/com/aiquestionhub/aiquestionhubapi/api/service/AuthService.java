package com.aiquestionhub.aiquestionhubapi.api.service;

import com.aiquestionhub.aiquestionhubapi.api.request.ForgotPasswordRequest;
import com.aiquestionhub.aiquestionhubapi.api.request.LoginRequest;
import com.aiquestionhub.aiquestionhubapi.api.request.ResetPasswordRequest;
import com.aiquestionhub.aiquestionhubapi.api.response.AuthResponse;
import com.aiquestionhub.aiquestionhubapi.api.response.ForgotPasswordResponse;
import com.aiquestionhub.aiquestionhubapi.api.response.LogoutResponse;
import com.aiquestionhub.aiquestionhubapi.api.request.UserRegisterRequest;

public interface AuthService {

    AuthResponse login(LoginRequest request);

    AuthResponse register(UserRegisterRequest request);

    ForgotPasswordResponse forgotPassword(ForgotPasswordRequest request);

    LogoutResponse resetPassword(ResetPasswordRequest request);

    LogoutResponse logout(String bearerToken);
}
