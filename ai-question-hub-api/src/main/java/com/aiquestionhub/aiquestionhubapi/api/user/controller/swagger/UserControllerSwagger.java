package com.aiquestionhub.aiquestionhubapi.api.user.controller.swagger;

import com.aiquestionhub.aiquestionhubapi.api.user.response.UserResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

@Tag(name = "User", description = "User management APIs")
@SecurityRequirement(name = "bearerAuth")
public interface UserControllerSwagger {

    @Operation(summary = "Get current user info", responses = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    ResponseEntity<UserResponse> getUserInfo();
}
