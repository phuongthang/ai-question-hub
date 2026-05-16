package com.aiquestionhub.aiquestionhubapi.api.response;

import com.aiquestionhub.aiquestionhubapi.enums.TopicActivityActionType;
import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
@Builder
public class TopicActivityLogResponse {
    private Long id;
    private Long topicId;
    private TopicActivityActionType actionType;
    private String actionTypeName;
    private Long actorId;
    private Long projectId;
    private Long questionId;
    private Long tagId;
    private String detail;
    private Timestamp createdAt;
}
