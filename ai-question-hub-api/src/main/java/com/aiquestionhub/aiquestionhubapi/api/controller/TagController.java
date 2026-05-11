package com.aiquestionhub.aiquestionhubapi.api.controller;

import com.aiquestionhub.aiquestionhubapi.api.mapper.TagMapper;
import com.aiquestionhub.aiquestionhubapi.api.model.Tag;
import com.aiquestionhub.aiquestionhubapi.api.request.TagRequest;
import com.aiquestionhub.aiquestionhubapi.api.response.TagResponse;
import com.aiquestionhub.aiquestionhubapi.api.service.TagService;
import com.aiquestionhub.aiquestionhubapi.helper.base.construct.IRestfullService;
import com.aiquestionhub.aiquestionhubapi.helper.base.construct.RestfullController;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/tags")
@RequiredArgsConstructor
@io.swagger.v3.oas.annotations.tags.Tag(name = "Tags", description = "Quản lý tags")
public class TagController extends RestfullController<Tag, TagRequest, TagResponse> {

    private final TagService tagService;
    private final TagMapper tagMapper;

    @Override
    protected IRestfullService<Tag> getService() {
        return tagService;
    }

    @Override
    protected Tag toModel(TagRequest request) {
        return tagMapper.toEntity(request);
    }

    @Override
    protected TagResponse toResponse(Tag model) {
        return tagMapper.toResponse(model);
    }
}
