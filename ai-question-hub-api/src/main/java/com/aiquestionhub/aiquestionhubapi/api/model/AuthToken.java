package com.aiquestionhub.aiquestionhubapi.api.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthToken {
    private Long id;
    private Long userId;
    private String token;
    private Timestamp expiresAt;
    private boolean revoked;
    private Timestamp createdAt;
}
