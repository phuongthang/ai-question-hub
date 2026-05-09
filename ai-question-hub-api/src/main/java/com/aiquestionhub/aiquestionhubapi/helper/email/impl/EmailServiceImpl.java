package com.aiquestionhub.aiquestionhubapi.helper.email.impl;

import com.aiquestionhub.aiquestionhubapi.helper.email.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Override
    public void sendPasswordResetOtp(String to, String otp) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject("AI Question Hub - Password Reset OTP");
            message.setText(
                    "You have requested to reset your password for AI Question Hub.\n\n"
                    + "Your OTP code is: " + otp + "\n\n"
                    + "This OTP is valid for 10 minutes. Do not share it with anyone.\n\n"
                    + "If you did not request a password reset, please ignore this email.\n\n"
                    + "— AI Question Hub Team"
            );
            mailSender.send(message);
            log.info("Password reset OTP sent to: {}", to);
        } catch (Exception ex) {
            log.error("Failed to send OTP email to {}: {}", to, ex.getMessage(), ex);
            throw ex;
        }
    }
}
