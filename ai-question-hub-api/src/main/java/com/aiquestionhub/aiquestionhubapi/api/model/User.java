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
public class User extends BaseModel {
    private String username;
    private String userCode;
    private String email;
    private String password;
    private String fullName;
    private String avatarUrl;
    private String phoneNumber;
    private Integer role;
}
