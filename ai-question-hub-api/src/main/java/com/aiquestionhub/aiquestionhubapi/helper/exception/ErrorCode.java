package com.aiquestionhub.aiquestionhubapi.helper.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    BUSINESS_ERROR("ERR_400_BUSINESS", "Business logic error"),
    VALIDATION_ERROR("ERR_400_VALIDATION", "Validation failed"),
    UNAUTHORIZED("ERR_401", "Unauthorized - authentication is required"),
    FORBIDDEN("ERR_403", "Forbidden - you do not have permission to access this resource"),
    NOT_FOUND("ERR_404", "Resource not found"),
    METHOD_NOT_ALLOWED("ERR_405", "HTTP method not supported"),
    CONFLICT("ERR_409", "Conflict - resource already exists"),
    INTERNAL_SERVER_ERROR("ERR_500", "Internal server error");

    private final String code;
    private final String defaultMessage;
}
