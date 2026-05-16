package com.aiquestionhub.aiquestionhubapi.api.model;

import com.aiquestionhub.aiquestionhubapi.helper.base.model.BaseModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Question extends BaseModel {
    private String code;
    private Long topicId;
    private String questionText;
    /** JSON string: {"A": "...", "B": "...", "C": "...", "D": "..."} */
    private String options;
    private String answer;
    private Short status;
    private Long aiModelId;
    private String prompt;
}
