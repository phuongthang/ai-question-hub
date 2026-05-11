package com.aiquestionhub.aiquestionhubapi.api.service.impl;

import com.aiquestionhub.aiquestionhubapi.api.model.Tag;
import com.aiquestionhub.aiquestionhubapi.api.repository.TagRepository;
import com.aiquestionhub.aiquestionhubapi.api.service.TagService;
import com.aiquestionhub.aiquestionhubapi.helper.base.construct.RestfullService;
import com.aiquestionhub.aiquestionhubapi.helper.base.repository.IBaseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.UUID;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class TagServiceImpl extends RestfullService<Tag> implements TagService {

    private static final Pattern NON_LATIN   = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE  = Pattern.compile("[\\s]+");
    private static final Pattern MULTI_DASH  = Pattern.compile("-{2,}");

    private final TagRepository tagRepository;

    @Override
    protected IBaseRepository<Tag> getRepository() {
        return tagRepository;
    }

    @Override
    protected String getResourceName() {
        return "Tag";
    }

    @Override
    public Tag create(Tag entity) {
        entity.setCode(UUID.randomUUID().toString());
        entity.setSlug(toSlug(entity.getName()));
        return super.create(entity);
    }

    @Override
    public Tag update(Long id, Tag entity) {
        entity.setSlug(toSlug(entity.getName()));
        return super.update(id, entity);
    }

    private String toSlug(String input) {
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD);
        String slug = NON_LATIN.matcher(normalized).replaceAll("");
        slug = WHITESPACE.matcher(slug).replaceAll("-");
        slug = MULTI_DASH.matcher(slug).replaceAll("-");
        return slug.toLowerCase().replaceAll("^-|-$", "");
    }
}
