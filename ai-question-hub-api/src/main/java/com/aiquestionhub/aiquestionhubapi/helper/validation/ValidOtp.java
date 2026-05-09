package com.aiquestionhub.aiquestionhubapi.helper.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.lang.annotation.*;

@NotBlank(message = "{E0016}")
@Pattern(regexp = "\\d{6}", message = "{E0017}")
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = {})
public @interface ValidOtp {
    String message() default "{E0017}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
