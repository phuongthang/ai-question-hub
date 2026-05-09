package com.aiquestionhub.aiquestionhubapi.helper.base.construct;

import com.aiquestionhub.aiquestionhubapi.helper.base.model.BaseModel;
import com.aiquestionhub.aiquestionhubapi.helper.exception.NotFoundException;

import java.util.List;

public interface IRestfullService<T extends BaseModel> {

    List<T> findAll();

    T findById(Long id);

    T create(T entity);

    T update(Long id, T entity);

    void delete(Long id);

    T findByCode(String code);
}
