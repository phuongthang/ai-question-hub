package com.aiquestionhub.aiquestionhubapi.api.service;

import com.aiquestionhub.aiquestionhubapi.api.model.Topic;
import com.aiquestionhub.aiquestionhubapi.helper.base.construct.IRestfullService;

import java.util.List;

public interface TopicService extends IRestfullService<Topic> {
    List<Topic> findRecent(int limit);
}
