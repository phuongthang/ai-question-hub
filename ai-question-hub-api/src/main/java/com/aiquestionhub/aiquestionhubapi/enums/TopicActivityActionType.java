package com.aiquestionhub.aiquestionhubapi.enums;

import lombok.Getter;

@Getter
public enum TopicActivityActionType {
    TOPIC_CREATED(1, "Tạo topic"),
    TOPIC_UPDATED(2, "Cập nhật topic"),
    TOPIC_DELETED(3, "Xóa topic"),
    QUESTION_GENERATED(4, "Sinh câu hỏi bằng AI"),
    QUESTION_ADDED(5, "Thêm câu hỏi"),
    QUESTION_UPDATED(6, "Cập nhật câu hỏi"),
    QUESTION_DELETED(7, "Xóa câu hỏi"),
    TOPIC_ADDED_TO_PROJECT(8, "Thêm topic vào dự án"),
    TOPIC_REMOVED_FROM_PROJECT(9, "Gỡ topic khỏi dự án"),
    TAG_ADDED(10, "Thêm tag"),
    TAG_REMOVED(11, "Gỡ tag");

    private final Integer value;
    private final String displayName;

    TopicActivityActionType(Integer value, String displayName) {
        this.value = value;
        this.displayName = displayName;
    }

    public static TopicActivityActionType fromValue(Integer value) {
        for (TopicActivityActionType type : values()) {
            if (type.value.equals(value)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Invalid TopicActivityActionType value: " + value);
    }
}
