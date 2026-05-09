package com.aiquestionhub.aiquestionhubapi.api.user.repository;

import com.aiquestionhub.aiquestionhubapi.api.user.model.User;
import com.aiquestionhub.aiquestionhubapi.helper.base.repository.IBaseRepository;
import org.apache.ibatis.annotations.Mapper;

import java.util.Optional;

@Mapper
public interface UserRepository extends IBaseRepository<User> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
