package com.aiquestionhub.aiquestionhubapi.api.repository;

import com.aiquestionhub.aiquestionhubapi.api.model.AuthToken;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Optional;

@Mapper
public interface AuthTokenRepository {

    void insert(AuthToken authToken);

    Optional<AuthToken> findByToken(@Param("token") String token);

    void revokeByToken(@Param("token") String token);

    void revokeAllByUserId(@Param("userId") Long userId);
}
