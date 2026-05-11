package com.aiquestionhub.aiquestionhubapi.api.controller;

import com.aiquestionhub.aiquestionhubapi.api.mapper.TopicMapper;
import com.aiquestionhub.aiquestionhubapi.api.model.Topic;
import com.aiquestionhub.aiquestionhubapi.api.request.TopicRequest;
import com.aiquestionhub.aiquestionhubapi.api.response.TopicResponse;
import com.aiquestionhub.aiquestionhubapi.api.service.TopicService;
import com.aiquestionhub.aiquestionhubapi.helper.base.construct.IRestfullService;
import com.aiquestionhub.aiquestionhubapi.helper.base.construct.RestfullController;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/topics")
@RequiredArgsConstructor
@Tag(name = "Topics", description = "Quản lý chủ đề")
public class TopicController extends RestfullController<Topic, TopicRequest, TopicResponse> {

    private final TopicService topicService;
    private final TopicMapper topicMapper;

    @Override
    protected IRestfullService<Topic> getService() {
        return topicService;
    }

    @Override
    protected Topic toModel(TopicRequest request) {
        return topicMapper.toEntity(request);
    }

    @Override
    protected TopicResponse toResponse(Topic model) {
        return topicMapper.toResponse(model);
    }

    @GetMapping("/recent")
    public ResponseEntity<List<TopicResponse>> findRecent(
            @RequestParam(value = "limit", defaultValue = "5") int limit) {
        List<TopicResponse> responses = topicService.findRecent(limit)
                .stream()
                .map(this::toResponse)
                .toList();
        return ResponseEntity.ok(responses);
    }
}
