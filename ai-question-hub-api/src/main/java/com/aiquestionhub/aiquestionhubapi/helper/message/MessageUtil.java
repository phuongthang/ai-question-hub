package com.aiquestionhub.aiquestionhubapi.helper.message;

import com.aiquestionhub.aiquestionhubapi.constants.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Component;

import java.util.Locale;

@Component
@RequiredArgsConstructor
public class MessageUtil {

    private final MessageSource messageSource;

    public String get(String code) {
        return messageSource.getMessage(code, null, LocaleContextHolder.getLocale());
    }

    public String get(Message message) {
        return get(message.getCode());
    }

    public String get(String code, Object... args) {
        return messageSource.getMessage(code, args, LocaleContextHolder.getLocale());
    }

    public String get(String code, Locale locale) {
        return messageSource.getMessage(code, null, locale);
    }

    public String get(String code, Locale locale, Object... args) {
        return messageSource.getMessage(code, args, locale);
    }

    public String getEn(String code) {
        return messageSource.getMessage(code, null, Locale.ENGLISH);
    }

    public String getVi(String code) {
        return messageSource.getMessage(code, null, new Locale("vi", "VN"));
    }
}
