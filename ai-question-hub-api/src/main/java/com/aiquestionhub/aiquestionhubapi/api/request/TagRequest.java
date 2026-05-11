package com.aiquestionhub.aiquestionhubapi.api.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TagRequest {

    @NotBlank(message = "validation.tag.name.required")
    @Size(max = 100, message = "validation.tag.name.size")
    private String name;
}
