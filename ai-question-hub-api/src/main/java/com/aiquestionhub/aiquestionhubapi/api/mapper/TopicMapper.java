package com.aiquestionhub.aiquestionhubapi.api.mapper;

import com.aiquestionhub.aiquestionhubapi.api.model.Topic;
import com.aiquestionhub.aiquestionhubapi.api.request.TopicRequest;
import com.aiquestionhub.aiquestionhubapi.api.response.TopicResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TopicMapper {

    TopicResponse toResponse(Topic topic);

    Topic toEntity(TopicRequest request);
}
