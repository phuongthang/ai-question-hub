package com.aiquestionhub.aiquestionhubapi.api.model;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class PasswordResetToken {
    private Long id;
    private String email;
    private String otp;
    private Timestamp expiresAt;
    private Boolean used;
    private Timestamp createdAt;
}
