package com.aiquestionhub.aiquestionhubapi.helper.base.repository;

import com.aiquestionhub.aiquestionhubapi.helper.base.model.BaseModel;

import java.util.List;
import java.util.Optional;

public interface IBaseRepository<T extends BaseModel> {

    Optional<T> findById(Long id);

    List<T> findAll();

    int insert(T entity);

    int update(T entity);

    int deleteById(Long id);

    Optional<T> findByCode(String code);
}
