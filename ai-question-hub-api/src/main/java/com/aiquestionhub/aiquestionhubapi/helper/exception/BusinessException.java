package com.aiquestionhub.aiquestionhubapi.helper.exception;

import org.springframework.http.HttpStatus;

public class BusinessException extends AppException {

    public BusinessException(String message) {
        super(ErrorCode.BUSINESS_ERROR, HttpStatus.BAD_REQUEST, message);
    }
}
