package com.aiquestionhub.aiquestionhubapi.api.mapper;

import com.aiquestionhub.aiquestionhubapi.api.model.TopicActivityLog;
import com.aiquestionhub.aiquestionhubapi.api.response.TopicActivityLogResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TopicActivityLogDtoMapper {

    @Mapping(target = "actionTypeName", expression = "java(log.getActionType() != null ? log.getActionType().getDisplayName() : null)")
    TopicActivityLogResponse toResponse(TopicActivityLog log);
}
