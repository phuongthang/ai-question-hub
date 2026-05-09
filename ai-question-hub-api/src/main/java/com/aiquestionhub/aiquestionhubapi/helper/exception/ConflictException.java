package com.aiquestionhub.aiquestionhubapi.helper.exception;

import org.springframework.http.HttpStatus;

public class ConflictException extends AppException {

    public ConflictException() {
        super(ErrorCode.CONFLICT, HttpStatus.CONFLICT);
    }

    public ConflictException(String message) {
        super(ErrorCode.CONFLICT, HttpStatus.CONFLICT, message);
    }

    public ConflictException(String fieldName, Object fieldValue) {
        super(ErrorCode.CONFLICT, HttpStatus.CONFLICT,
                fieldName + " already exists with value: " + fieldValue);
    }
}
