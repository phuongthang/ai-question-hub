package com.aiquestionhub.aiquestionhubapi.api.controller;

import com.aiquestionhub.aiquestionhubapi.api.mapper.TopicActivityLogDtoMapper;
import com.aiquestionhub.aiquestionhubapi.api.model.TopicActivityLog;
import com.aiquestionhub.aiquestionhubapi.api.response.TopicActivityLogResponse;
import com.aiquestionhub.aiquestionhubapi.api.service.TopicActivityLogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/topic-activity-logs")
@RequiredArgsConstructor
@Tag(name = "Topic Activity Logs", description = "Lịch sử hoạt động của topic")
public class TopicActivityLogController {

    private final TopicActivityLogService topicActivityLogService;
    private final TopicActivityLogDtoMapper topicActivityLogDtoMapper;

    @GetMapping
    @Operation(summary = "Lấy tất cả lịch sử hoạt động")
    public ResponseEntity<List<TopicActivityLogResponse>> findAll() {
        List<TopicActivityLogResponse> responses = topicActivityLogService.findAll()
                .stream()
                .map(topicActivityLogDtoMapper::toResponse)
                .toList();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Lấy chi tiết một log theo ID")
    public ResponseEntity<TopicActivityLogResponse> findById(@PathVariable Long id) {
        TopicActivityLog log = topicActivityLogService.findById(id);
        return ResponseEntity.ok(topicActivityLogDtoMapper.toResponse(log));
    }

    @GetMapping("/topic/{topicId}")
    @Operation(summary = "Lấy lịch sử hoạt động theo topic")
    public ResponseEntity<List<TopicActivityLogResponse>> findByTopicId(@PathVariable Long topicId) {
        List<TopicActivityLogResponse> responses = topicActivityLogService.findByTopicId(topicId)
                .stream()
                .map(topicActivityLogDtoMapper::toResponse)
                .toList();
        return ResponseEntity.ok(responses);
    }
}
