package com.aiquestionhub.aiquestionhubapi.api.repository;

import com.aiquestionhub.aiquestionhubapi.api.model.Question;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface QuestionRepository {
    List<Question> findByTopicId(@Param("topicId") Long topicId);
}
