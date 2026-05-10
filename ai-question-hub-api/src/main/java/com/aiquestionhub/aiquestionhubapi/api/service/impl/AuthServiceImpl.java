package com.aiquestionhub.aiquestionhubapi.api.service.impl;

import com.aiquestionhub.aiquestionhubapi.api.model.AuthToken;
import com.aiquestionhub.aiquestionhubapi.api.model.PasswordResetToken;
import com.aiquestionhub.aiquestionhubapi.api.repository.AuthTokenRepository;
import com.aiquestionhub.aiquestionhubapi.api.repository.PasswordResetTokenRepository;
import com.aiquestionhub.aiquestionhubapi.api.request.ForgotPasswordRequest;
import com.aiquestionhub.aiquestionhubapi.api.request.LoginRequest;
import com.aiquestionhub.aiquestionhubapi.api.request.ResetPasswordRequest;
import com.aiquestionhub.aiquestionhubapi.api.response.AuthResponse;
import com.aiquestionhub.aiquestionhubapi.api.response.ForgotPasswordResponse;
import com.aiquestionhub.aiquestionhubapi.api.response.LogoutResponse;
import com.aiquestionhub.aiquestionhubapi.api.service.AuthService;
import com.aiquestionhub.aiquestionhubapi.api.mapper.UserMapper;
import com.aiquestionhub.aiquestionhubapi.api.model.User;
import com.aiquestionhub.aiquestionhubapi.api.repository.UserRepository;
import com.aiquestionhub.aiquestionhubapi.api.request.UserRegisterRequest;
import com.aiquestionhub.aiquestionhubapi.constants.MessageCode;
import com.aiquestionhub.aiquestionhubapi.enums.UserRoleEnum;
import com.aiquestionhub.aiquestionhubapi.helper.email.EmailService;
import com.aiquestionhub.aiquestionhubapi.helper.exception.BusinessException;
import com.aiquestionhub.aiquestionhubapi.helper.exception.ConflictException;
import com.aiquestionhub.aiquestionhubapi.helper.message.MessageUtil;
import com.aiquestionhub.aiquestionhubapi.properties.OtpProperties;
import com.aiquestionhub.aiquestionhubapi.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final AuthTokenRepository authTokenRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final UserMapper userMapper;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final MessageUtil messageUtil;
    private final OtpProperties otpProperties;

    @Override
    @Transactional
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new BusinessException(messageUtil.get(MessageCode.E0101)));

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        String token = jwtUtil.generateToken(userDetails);

        // Revoke old tokens
        authTokenRepository.revokeAllByUserId(user.getId());

        // Save new token
        AuthToken authToken = AuthToken.builder()
                .userId(user.getId())
                .token(token)
                .expiresAt(Timestamp.from(Instant.now().plusSeconds(jwtUtil.getExpirationSeconds())))
                .revoked(false)
                .build();
        authTokenRepository.insert(authToken);

        return AuthResponse.builder()
                .accessToken(token)
                .tokenType("Bearer")
                .expiresIn(jwtUtil.getExpirationSeconds())
                .user(userMapper.toResponse(user))
                .build();
    }

    @Override
    @Transactional
    public AuthResponse register(UserRegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new ConflictException(messageUtil.get(MessageCode.E0102));
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ConflictException(messageUtil.get(MessageCode.E0103));
        }

        User user = userMapper.toEntity(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setUserCode(UUID.randomUUID().toString());
        user.setRole(UserRoleEnum.USER.getValue());
        userRepository.insert(user);

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        String token = jwtUtil.generateToken(userDetails);

        AuthToken authToken = AuthToken.builder()
                .userId(user.getId())
                .token(token)
                .expiresAt(Timestamp.from(Instant.now().plusSeconds(jwtUtil.getExpirationSeconds())))
                .revoked(false)
                .build();
        authTokenRepository.insert(authToken);

        return AuthResponse.builder()
                .accessToken(token)
                .tokenType("Bearer")
                .expiresIn(jwtUtil.getExpirationSeconds())
                .user(userMapper.toResponse(user))
                .build();
    }

    @Override
    @Transactional
    public ForgotPasswordResponse forgotPassword(ForgotPasswordRequest request) {
        // Always respond with success to avoid user enumeration
        userRepository.findByEmail(request.getEmail()).ifPresent(user -> {
            String otp = generateOtp();
            passwordResetTokenRepository.markAllUsedByEmail(request.getEmail());

            PasswordResetToken resetToken = new PasswordResetToken();
            resetToken.setEmail(request.getEmail());
            resetToken.setOtp(passwordEncoder.encode(otp));
            resetToken.setExpiresAt(Timestamp.from(
                    Instant.now().plus(otpProperties.getExpirationMinutes(), ChronoUnit.MINUTES)));
            resetToken.setUsed(false);
            passwordResetTokenRepository.insert(resetToken);

            emailService.sendPasswordResetOtp(request.getEmail(), otp);
        });

        return ForgotPasswordResponse.builder()
                .message(messageUtil.get(MessageCode.I0004))
                .build();
    }

    @Override
    @Transactional
    public LogoutResponse resetPassword(ResetPasswordRequest request) {
        PasswordResetToken resetToken = passwordResetTokenRepository
                .findLatestValidByEmail(request.getEmail())
                .orElseThrow(() -> new BusinessException(messageUtil.get(MessageCode.E0105)));

        if (!passwordEncoder.matches(request.getOtp(), resetToken.getOtp())) {
            throw new BusinessException(messageUtil.get(MessageCode.E0105));
        }

        if (resetToken.getExpiresAt().toInstant().isBefore(Instant.now())) {
            throw new BusinessException(messageUtil.get(MessageCode.E0106));
        }

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BusinessException(messageUtil.get(MessageCode.E0101)));

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.update(user);

        passwordResetTokenRepository.markUsedById(resetToken.getId());
        authTokenRepository.revokeAllByUserId(user.getId());

        return LogoutResponse.builder()
                .message(messageUtil.get(MessageCode.I0005))
                .build();
    }

    @Override
    @Transactional
    public LogoutResponse logout(String bearerToken) {
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            String token = bearerToken.substring(7);
            authTokenRepository.revokeByToken(token);
        }
        return LogoutResponse.builder()
                .message(messageUtil.get(MessageCode.I0003))
                .build();
    }

    private String generateOtp() {
        SecureRandom random = new SecureRandom();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }
}
