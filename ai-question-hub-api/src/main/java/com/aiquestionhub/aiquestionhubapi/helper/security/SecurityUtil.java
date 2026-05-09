package com.aiquestionhub.aiquestionhubapi.helper.security;

import com.aiquestionhub.aiquestionhubapi.api.user.model.User;
import com.aiquestionhub.aiquestionhubapi.api.user.repository.UserRepository;
import com.aiquestionhub.aiquestionhubapi.helper.exception.UnauthorizedException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SecurityUtil {

    private final UserRepository userRepository;

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UnauthorizedException();
        }
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(UnauthorizedException::new);
    }
}
