package com.aiquestionhub.aiquestionhubapi.api.repository;

import com.aiquestionhub.aiquestionhubapi.api.model.Tag;
import com.aiquestionhub.aiquestionhubapi.helper.base.repository.IBaseRepository;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TagRepository extends IBaseRepository<Tag> {
}
