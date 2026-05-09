package com.aiquestionhub.aiquestionhubapi.helper.exception;

import org.springframework.http.HttpStatus;

public class ValidateException extends AppException {

    public ValidateException(String message) {
        super(ErrorCode.VALIDATION_ERROR, HttpStatus.BAD_REQUEST, message);
    }
}
