package com.aiquestionhub.aiquestionhubapi.api.service.impl;

import com.aiquestionhub.aiquestionhubapi.api.model.TopicActivityLog;
import com.aiquestionhub.aiquestionhubapi.api.repository.TopicActivityLogRepository;
import com.aiquestionhub.aiquestionhubapi.api.service.TopicActivityLogService;
import com.aiquestionhub.aiquestionhubapi.helper.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TopicActivityLogServiceImpl implements TopicActivityLogService {

    private final TopicActivityLogRepository topicActivityLogRepository;

    @Override
    public List<TopicActivityLog> findAll() {
        return topicActivityLogRepository.findAll();
    }

    @Override
    public TopicActivityLog findById(Long id) {
        return topicActivityLogRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("TopicActivityLog", id));
    }

    @Override
    public List<TopicActivityLog> findByTopicId(Long topicId) {
        return topicActivityLogRepository.findByTopicId(topicId);
    }

    @Override
    public TopicActivityLog log(TopicActivityLog entity) {
        topicActivityLogRepository.insert(entity);
        return entity;
    }
}
