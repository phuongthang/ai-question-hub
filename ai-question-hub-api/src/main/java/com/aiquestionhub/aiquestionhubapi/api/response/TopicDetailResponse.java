package com.aiquestionhub.aiquestionhubapi.api.response;

import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Builder
public class TopicDetailResponse {
    private Long id;
    private String title;
    private List<TagResponse> tags;
    private List<QuestionResponse> questions;
    private List<TopicActivityLogResponse> activityLogs;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
