package com.aiquestionhub.aiquestionhubapi.api.repository;

import com.aiquestionhub.aiquestionhubapi.api.model.TopicActivityLog;
import com.aiquestionhub.aiquestionhubapi.helper.base.repository.IBaseRepository;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface TopicActivityLogRepository extends IBaseRepository<TopicActivityLog> {
    List<TopicActivityLog> findByTopicId(@Param("topicId") Long topicId);
}
