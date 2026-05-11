package com.aiquestionhub.aiquestionhubapi.api.mapper;

import com.aiquestionhub.aiquestionhubapi.api.model.Tag;
import com.aiquestionhub.aiquestionhubapi.api.request.TagRequest;
import com.aiquestionhub.aiquestionhubapi.api.response.TagResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TagMapper {

    TagResponse toResponse(Tag tag);

    Tag toEntity(TagRequest request);
}
