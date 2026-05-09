package com.aiquestionhub.aiquestionhubapi.helper.base.construct;

import com.aiquestionhub.aiquestionhubapi.helper.base.model.BaseModel;
import com.aiquestionhub.aiquestionhubapi.helper.base.repository.IBaseRepository;
import com.aiquestionhub.aiquestionhubapi.helper.exception.NotFoundException;

import java.util.List;

public abstract class RestfullService<T extends BaseModel> implements IRestfullService<T> {

    protected abstract IBaseRepository<T> getRepository();

    protected abstract String getResourceName();

    public List<T> findAll() {
        return getRepository().findAll();
    }

    public T findById(Long id) {
        return getRepository().findById(id)
                .orElseThrow(() -> new NotFoundException(getResourceName(), id));
    }

    public T create(T entity) {
        getRepository().insert(entity);
        return entity;
    }

    public T update(Long id, T entity) {
        findById(id);
        entity.setId(id);
        getRepository().update(entity);
        return entity;
    }

    public void delete(Long id) {
        findById(id);
        getRepository().deleteById(id);
    }

    public T findByCode(String code) {
        return getRepository().findByCode(code)
                .orElseThrow(() -> new NotFoundException(getResourceName(), code));
    }
}
