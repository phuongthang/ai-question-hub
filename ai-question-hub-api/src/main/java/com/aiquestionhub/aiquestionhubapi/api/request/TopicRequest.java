package com.aiquestionhub.aiquestionhubapi.api.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class TopicRequest {

    @NotBlank(message = "validation.topic.title.required")
    @Size(max = 255, message = "validation.topic.title.size")
    private String title;

    private List<Long> tagIds = new ArrayList<>();
}
