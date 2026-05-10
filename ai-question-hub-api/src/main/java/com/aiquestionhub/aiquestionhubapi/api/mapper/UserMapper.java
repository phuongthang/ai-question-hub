package com.aiquestionhub.aiquestionhubapi.api.mapper;

import com.aiquestionhub.aiquestionhubapi.api.model.User;
import com.aiquestionhub.aiquestionhubapi.api.request.UserRegisterRequest;
import com.aiquestionhub.aiquestionhubapi.api.response.UserResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserResponse toResponse(User user);

    User toEntity(UserRegisterRequest request);
}
