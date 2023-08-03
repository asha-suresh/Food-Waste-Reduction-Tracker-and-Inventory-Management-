package com.fwrt.dashboard.repository;

import com.fwrt.dashboard.entity.User;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository  extends JpaRepository<User, Long> {

    @Query( value = "SELECT * FROM users f WHERE f.user_name  = :username and f.password = :password ", nativeQuery = true)
    Optional<User> findByUserNameAndPassword(@Param("username")String username, @Param("password")String password);

    @Query (value = "SELECT COUNT(*) as count FROM users", nativeQuery = true)
    Integer getAllUsersCount();
}
