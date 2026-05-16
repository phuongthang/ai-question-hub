package com.aiquestionhub.aiquestionhubapi.api.response;

import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
@Builder
public class QuestionResponse {
    private Long id;
    private String code;
    private Long topicId;
    private String questionText;
    /** JSON string: {"A": "...", "B": "...", "C": "...", "D": "..."} */
    private String options;
    private String answer;
    private Short status;
    private Long aiModelId;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
