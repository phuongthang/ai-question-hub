package com.aiquestionhub.aiquestionhubapi.api.response;

import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
@Builder
public class TagResponse {
    private Long id;
    private String code;
    private String name;
    private String slug;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
