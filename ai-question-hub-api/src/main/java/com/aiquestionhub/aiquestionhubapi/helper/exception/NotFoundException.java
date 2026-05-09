package com.aiquestionhub.aiquestionhubapi.helper.exception;

import org.springframework.http.HttpStatus;

public class NotFoundException extends AppException {

    public NotFoundException() {
        super(ErrorCode.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    public NotFoundException(String message) {
        super(ErrorCode.NOT_FOUND, HttpStatus.NOT_FOUND, message);
    }

    public NotFoundException(String resourceName, Object identifier) {
        super(ErrorCode.NOT_FOUND, HttpStatus.NOT_FOUND,
                resourceName + " not found with identifier: " + identifier);
    }
}
