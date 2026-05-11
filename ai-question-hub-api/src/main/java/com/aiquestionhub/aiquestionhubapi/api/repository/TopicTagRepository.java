package com.aiquestionhub.aiquestionhubapi.api.repository;

import com.aiquestionhub.aiquestionhubapi.api.model.Tag;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface TopicTagRepository {
    int insertTopicTag(@Param("topicId") Long topicId, @Param("tagId") Long tagId);
    int deleteByTopicId(@Param("topicId") Long topicId);
    List<Long> findTagIdsByTopicId(@Param("topicId") Long topicId);
    List<Tag> findTagsByTopicId(@Param("topicId") Long topicId);
}
