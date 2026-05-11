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
public class Tag extends BaseModel {
    private String code;
    private String name;
    private String slug;
}
