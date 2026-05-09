package com.aiquestionhub.aiquestionhubapi.api.user.mapper;

import com.aiquestionhub.aiquestionhubapi.api.user.model.User;
import com.aiquestionhub.aiquestionhubapi.api.user.request.UserRegisterRequest;
import com.aiquestionhub.aiquestionhubapi.api.user.response.UserResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserResponse toResponse(User user);

    User toEntity(UserRegisterRequest request);
}
