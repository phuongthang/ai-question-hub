package com.aiquestionhub.aiquestionhubapi.api.auth.response;

import com.aiquestionhub.aiquestionhubapi.api.user.response.UserResponse;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AuthResponse {
    private String accessToken;
    private String tokenType;
    private long expiresIn;
    private UserResponse user;
}
