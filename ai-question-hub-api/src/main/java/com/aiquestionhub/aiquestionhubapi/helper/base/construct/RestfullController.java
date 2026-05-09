package com.aiquestionhub.aiquestionhubapi.helper.base.construct;

import com.aiquestionhub.aiquestionhubapi.helper.base.construct.swagger.RestfullControllerSwagger;
import com.aiquestionhub.aiquestionhubapi.helper.base.model.BaseModel;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public abstract class RestfullController<T extends BaseModel, RQ, RS> implements RestfullControllerSwagger<RQ, RS> {

    protected abstract IRestfullService<T> getService();

    protected abstract T toModel(RQ request);

    protected abstract RS toResponse(T model);

    @Override
    @GetMapping
    public ResponseEntity<List<RS>> findAll() {
        List<RS> responses = getService().findAll()
                .stream()
                .map(this::toResponse)
                .toList();
        return ResponseEntity.ok(responses);
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<RS> findById(@PathVariable Long id) {
        RS response = toResponse(getService().findById(id));
        return ResponseEntity.ok(response);
    }

    @Override
    @PostMapping
    public ResponseEntity<RS> create(@RequestBody @Valid RQ request) {
        T entity = toModel(request);
        RS response = toResponse(getService().create(entity));
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Override
    @PutMapping("/{id}")
    public ResponseEntity<RS> update(@PathVariable Long id, @RequestBody @Valid RQ request) {
        T entity = toModel(request);
        RS response = toResponse(getService().update(id, entity));
        return ResponseEntity.ok(response);
    }

    @Override
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        getService().delete(id);
        return ResponseEntity.noContent().build();
    }
}
