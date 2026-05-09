package com.aiquestionhub.aiquestionhubapi.helper.email;

public interface EmailService {

    void sendPasswordResetOtp(String to, String otp);
}
