package com.aiquestionhub.aiquestionhubapi.helper.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.lang.annotation.*;

@NotBlank(message = "{E0008}")
@Email(message = "{E0009}")
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = {})
public @interface ValidEmail {
    String message() default "{E0009}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
