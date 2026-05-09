package com.aiquestionhub.aiquestionhubapi.api.auth.request;

import com.aiquestionhub.aiquestionhubapi.helper.validation.ValidEmail;
import com.aiquestionhub.aiquestionhubapi.helper.validation.ValidOtp;
import com.aiquestionhub.aiquestionhubapi.helper.validation.ValidPassword;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPasswordRequest {

    @ValidEmail
    private String email;

    @ValidOtp
    private String otp;

    @ValidPassword
    private String newPassword;
}
