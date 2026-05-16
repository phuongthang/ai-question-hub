package com.aiquestionhub.aiquestionhubapi.api.mapper;

import com.aiquestionhub.aiquestionhubapi.api.model.Question;
import com.aiquestionhub.aiquestionhubapi.api.response.QuestionResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface QuestionDtoMapper {

    QuestionResponse toResponse(Question question);
}
