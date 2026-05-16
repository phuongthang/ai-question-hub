package com.aiquestionhub.aiquestionhubapi.api.service.impl;

import com.aiquestionhub.aiquestionhubapi.api.mapper.QuestionDtoMapper;
import com.aiquestionhub.aiquestionhubapi.api.mapper.TopicActivityLogDtoMapper;
import com.aiquestionhub.aiquestionhubapi.api.mapper.TopicMapper;
import com.aiquestionhub.aiquestionhubapi.api.model.Topic;
import com.aiquestionhub.aiquestionhubapi.api.model.TopicActivityLog;
import com.aiquestionhub.aiquestionhubapi.api.repository.QuestionRepository;
import com.aiquestionhub.aiquestionhubapi.api.repository.TopicRepository;
import com.aiquestionhub.aiquestionhubapi.api.repository.TopicTagRepository;
import com.aiquestionhub.aiquestionhubapi.api.response.QuestionResponse;
import com.aiquestionhub.aiquestionhubapi.api.response.TopicActivityLogResponse;
import com.aiquestionhub.aiquestionhubapi.api.response.TopicDetailResponse;
import com.aiquestionhub.aiquestionhubapi.api.service.TopicActivityLogService;
import com.aiquestionhub.aiquestionhubapi.api.service.TopicService;
import com.aiquestionhub.aiquestionhubapi.enums.TopicActivityActionType;
import com.aiquestionhub.aiquestionhubapi.helper.base.construct.RestfullService;
import com.aiquestionhub.aiquestionhubapi.helper.base.repository.IBaseRepository;
import com.aiquestionhub.aiquestionhubapi.helper.security.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TopicServiceImpl extends RestfullService<Topic> implements TopicService {

    private final TopicRepository topicRepository;
    private final TopicTagRepository topicTagRepository;
    private final TopicActivityLogService topicActivityLogService;
    private final QuestionRepository questionRepository;
    private final QuestionDtoMapper questionDtoMapper;
    private final TopicActivityLogDtoMapper topicActivityLogDtoMapper;
    private final TopicMapper topicMapper;
    private final SecurityUtils securityUtils;

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
        topicActivityLogService.log(buildLog(entity.getId(), TopicActivityActionType.TOPIC_CREATED, null));
        return entity;
    }

    @Override
    @Transactional
    public Topic update(Long id, Topic entity) {
        super.update(id, entity);
        topicTagRepository.deleteByTopicId(id);
        insertTopicTags(id, entity.getTagIds());
        topicActivityLogService.log(buildLog(id, TopicActivityActionType.TOPIC_UPDATED, null));
        return entity;
    }

    @Override
    @Transactional
    public void delete(Long id) {
        super.delete(id);
        topicActivityLogService.log(buildLog(id, TopicActivityActionType.TOPIC_DELETED, null));
    }

    private void insertTopicTags(Long topicId, List<Long> tagIds) {
        if (tagIds != null) {
            for (Long tagId : tagIds) {
                topicTagRepository.insertTopicTag(topicId, tagId);
            }
        }
    }

    private TopicActivityLog buildLog(Long topicId, TopicActivityActionType actionType, String detail) {
        return TopicActivityLog.builder()
                .topicId(topicId)
                .actionType(actionType)
                .actorId(securityUtils.getCurrentUserId())
                .detail(detail)
                .build();
    }

    @Override
    public List<Topic> findRecent(int limit) {
        return topicRepository.findRecent(limit);
    }

    @Override
    public TopicDetailResponse getDetail(Long id) {
        Topic topic = findById(id);

        List<QuestionResponse> questions = questionRepository.findByTopicId(id)
                .stream()
                .map(questionDtoMapper::toResponse)
                .toList();

        List<TopicActivityLogResponse> activityLogs = topicActivityLogService.findByTopicId(id)
                .stream()
                .map(topicActivityLogDtoMapper::toResponse)
                .toList();

        return TopicDetailResponse.builder()
                .id(topic.getId())
                .title(topic.getTitle())
                .tags(topicMapper.toResponse(topic).getTags())
                .questions(questions)
                .activityLogs(activityLogs)
                .createdAt(topic.getCreatedAt())
                .updatedAt(topic.getUpdatedAt())
                .build();
    }
}
