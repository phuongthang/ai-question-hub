package com.aiquestionhub.aiquestionhubapi.api.request;

import com.aiquestionhub.aiquestionhubapi.helper.validation.ValidEmail;
import com.aiquestionhub.aiquestionhubapi.helper.validation.ValidFullName;
import com.aiquestionhub.aiquestionhubapi.helper.validation.ValidPassword;
import com.aiquestionhub.aiquestionhubapi.helper.validation.ValidPhone;
import com.aiquestionhub.aiquestionhubapi.helper.validation.ValidUsername;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRegisterRequest {

    @ValidUsername
    private String username;

    @ValidEmail
    private String email;

    @ValidPassword
    private String password;

    @ValidFullName
    private String fullName;

    @ValidPhone
    private String phoneNumber;
}
