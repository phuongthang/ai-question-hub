package com.aiquestionhub.aiquestionhubapi.api.service.impl;

import com.aiquestionhub.aiquestionhubapi.api.mapper.UserMapper;
import com.aiquestionhub.aiquestionhubapi.api.response.UserResponse;
import com.aiquestionhub.aiquestionhubapi.api.service.UserService;
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
