package com.aiquestionhub.aiquestionhubapi.helper.exception;

import org.springframework.http.HttpStatus;

public class InternalServerException extends AppException {

    public InternalServerException() {
        super(ErrorCode.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public InternalServerException(String message) {
        super(ErrorCode.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR, message);
    }
}
