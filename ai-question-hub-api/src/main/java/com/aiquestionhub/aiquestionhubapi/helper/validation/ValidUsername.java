package com.aiquestionhub.aiquestionhubapi.helper.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.lang.annotation.*;

@NotBlank(message = "{E0006}")
@Size(min = 3, max = 50, message = "{E0007}")
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = {})
public @interface ValidUsername {
    String message() default "{E0007}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
