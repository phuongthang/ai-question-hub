package com.aiquestionhub.aiquestionhubapi.api.model;

import com.aiquestionhub.aiquestionhubapi.enums.TopicActivityActionType;
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
public class TopicActivityLog extends BaseModel {
    private Long topicId;
    private TopicActivityActionType actionType;
    private Long actorId;
    private Long projectId;
    private Long questionId;
    private Long tagId;
    /** JSON string — metadata phụ thuộc vào từng loại action */
    private String detail;
}
