package com.aiquestionhub.aiquestionhubapi.api.service;

import com.aiquestionhub.aiquestionhubapi.api.model.TopicActivityLog;

import java.util.List;

public interface TopicActivityLogService {

    List<TopicActivityLog> findAll();

    TopicActivityLog findById(Long id);

    List<TopicActivityLog> findByTopicId(Long topicId);

    TopicActivityLog log(TopicActivityLog entity);
}
