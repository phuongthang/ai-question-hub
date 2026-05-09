package com.aiquestionhub.aiquestionhubapi.api.user.controller;

import com.aiquestionhub.aiquestionhubapi.api.user.controller.swagger.UserControllerSwagger;
import com.aiquestionhub.aiquestionhubapi.api.user.response.UserResponse;
import com.aiquestionhub.aiquestionhubapi.api.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController implements UserControllerSwagger {

    private final UserService userService;

    @Override
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getUserInfo() {
        return ResponseEntity.ok(userService.getUserInfo());
    }
}
