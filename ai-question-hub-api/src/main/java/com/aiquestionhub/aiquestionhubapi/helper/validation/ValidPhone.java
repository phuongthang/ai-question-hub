package com.aiquestionhub.aiquestionhubapi.helper.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.lang.annotation.*;

@NotBlank(message = "{E0014}")
@Pattern(regexp = "^\\+?[0-9\\s\\-\\(\\)]{7,20}$", message = "{E0015}")
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = {})
public @interface ValidPhone {
    String message() default "{E0015}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
