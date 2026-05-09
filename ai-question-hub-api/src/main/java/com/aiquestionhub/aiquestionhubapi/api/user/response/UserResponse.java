package com.aiquestionhub.aiquestionhubapi.api.user.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserResponse {
    private Long id;
    private String username;
    private String userCode;
    private String email;
    private String fullName;
    private String avatarUrl;
    private String phoneNumber;
}
