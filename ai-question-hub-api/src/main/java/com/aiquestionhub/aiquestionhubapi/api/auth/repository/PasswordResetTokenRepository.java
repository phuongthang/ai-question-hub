package com.aiquestionhub.aiquestionhubapi.api.auth.repository;

import com.aiquestionhub.aiquestionhubapi.api.auth.model.PasswordResetToken;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Optional;

@Mapper
public interface PasswordResetTokenRepository {

    Optional<PasswordResetToken> findLatestValidByEmail(@Param("email") String email);

    void insert(PasswordResetToken token);

    void markAllUsedByEmail(@Param("email") String email);

    void markUsedById(@Param("id") Long id);
}
