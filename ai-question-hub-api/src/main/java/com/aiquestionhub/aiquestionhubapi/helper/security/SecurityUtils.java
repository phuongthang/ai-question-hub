package com.aiquestionhub.aiquestionhubapi.helper.security;

import com.aiquestionhub.aiquestionhubapi.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SecurityUtils {

    private final UserRepository userRepository;

    /**
     * Trả về ID của user đang đăng nhập, hoặc null nếu chưa xác thực.
     */
    public Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .map(user -> user.getId())
                .orElse(null);
    }
}
