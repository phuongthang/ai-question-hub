package com.aiquestionhub.aiquestionhubapi.api.request;

import com.aiquestionhub.aiquestionhubapi.helper.validation.ValidPassword;
import com.aiquestionhub.aiquestionhubapi.helper.validation.ValidUsername;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {

    @ValidUsername
    private String username;

    @ValidPassword
    private String password;
}
