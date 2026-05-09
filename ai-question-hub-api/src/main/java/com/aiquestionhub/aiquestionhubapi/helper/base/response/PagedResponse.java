package com.aiquestionhub.aiquestionhubapi.helper.base.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PagedResponse<T> {

    private List<T> items;
    private long total;
    private int page;
    private int size;
    private boolean hasMore;

    public static <T> PagedResponse<T> of(List<T> items, long total, int page, int size) {
        boolean hasMore = (long) (page + 1) * size < total;
        return new PagedResponse<>(items, total, page, size, hasMore);
    }
}
