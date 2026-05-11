package com.aiquestionhub.aiquestionhubapi.api.repository;

import com.aiquestionhub.aiquestionhubapi.api.model.Topic;
import com.aiquestionhub.aiquestionhubapi.helper.base.repository.IBaseRepository;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface TopicRepository extends IBaseRepository<Topic> {
    List<Topic> findRecent(@Param("limit") int limit);
}
