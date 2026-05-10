package com.aiquestionhub.aiquestionhubapi.api.response;

import com.aiquestionhub.aiquestionhubapi.api.response.UserResponse;
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
