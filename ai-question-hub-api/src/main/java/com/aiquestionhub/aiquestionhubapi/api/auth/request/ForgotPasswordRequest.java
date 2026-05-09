package com.aiquestionhub.aiquestionhubapi.api.auth.request;

import com.aiquestionhub.aiquestionhubapi.helper.validation.ValidEmail;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ForgotPasswordRequest {

    @ValidEmail
    private String email;
}
