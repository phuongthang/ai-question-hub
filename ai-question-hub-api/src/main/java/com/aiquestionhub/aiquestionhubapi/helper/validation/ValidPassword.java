package com.aiquestionhub.aiquestionhubapi.helper.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.lang.annotation.*;

@NotBlank(message = "{E0010}")
@Size(min = 8, message = "{E0011}")
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = {})
public @interface ValidPassword {
    String message() default "{E0011}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
