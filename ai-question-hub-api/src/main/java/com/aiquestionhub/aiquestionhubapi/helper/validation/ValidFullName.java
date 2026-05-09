package com.aiquestionhub.aiquestionhubapi.helper.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.lang.annotation.*;

@NotBlank(message = "{E0012}")
@Size(min = 3, max = 100, message = "{E0013}")
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = {})
public @interface ValidFullName {
    String message() default "{E0013}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
