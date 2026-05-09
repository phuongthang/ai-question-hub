package com.aiquestionhub.aiquestionhubapi.api.user.service.impl;

import com.aiquestionhub.aiquestionhubapi.api.user.mapper.UserMapper;
import com.aiquestionhub.aiquestionhubapi.api.user.response.UserResponse;
import com.aiquestionhub.aiquestionhubapi.api.user.service.UserService;
import com.aiquestionhub.aiquestionhubapi.helper.security.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final SecurityUtil securityUtil;
    private final UserMapper userMapper;

    @Override
    public UserResponse getUserInfo() {
        return userMapper.toResponse(securityUtil.getCurrentUser());
    }
}
