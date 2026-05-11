package com.aiquestionhub.aiquestionhubapi.api.service.impl;

import com.aiquestionhub.aiquestionhubapi.api.model.Topic;
import com.aiquestionhub.aiquestionhubapi.api.repository.TopicRepository;
import com.aiquestionhub.aiquestionhubapi.api.repository.TopicTagRepository;
import com.aiquestionhub.aiquestionhubapi.api.service.TopicService;
import com.aiquestionhub.aiquestionhubapi.helper.base.construct.RestfullService;
import com.aiquestionhub.aiquestionhubapi.helper.base.repository.IBaseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TopicServiceImpl extends RestfullService<Topic> implements TopicService {

    private final TopicRepository topicRepository;
    private final TopicTagRepository topicTagRepository;

    @Override
    protected IBaseRepository<Topic> getRepository() {
        return topicRepository;
    }

    @Override
    protected String getResourceName() {
        return "Topic";
    }

    @Override
    @Transactional
    public Topic create(Topic entity) {
        super.create(entity);
        insertTopicTags(entity.getId(), entity.getTagIds());
        return entity;
    }

    @Override
    @Transactional
    public Topic update(Long id, Topic entity) {
        super.update(id, entity);
        topicTagRepository.deleteByTopicId(id);
        insertTopicTags(id, entity.getTagIds());
        return entity;
    }

    private void insertTopicTags(Long topicId, List<Long> tagIds) {
        if (tagIds != null) {
            for (Long tagId : tagIds) {
                topicTagRepository.insertTopicTag(topicId, tagId);
            }
        }
    }

    @Override
    public List<Topic> findRecent(int limit) {
        return topicRepository.findRecent(limit);
    }
}
