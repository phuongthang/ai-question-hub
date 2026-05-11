package com.aiquestionhub.aiquestionhubapi.api.model;

import com.aiquestionhub.aiquestionhubapi.helper.base.model.BaseModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Topic extends BaseModel {
    private String title;
    private List<Long> tagIds;  // used on write path (from request)
    private List<Tag> tags;     // populated from DB on read path
}
