package com.fwrt.dashboard.repository;

import com.fwrt.dashboard.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository  extends JpaRepository<User, Long> {

    @Query( value = "SELECT * FROM users f WHERE f.user_name  = :username", nativeQuery = true)
    Optional<User> findByUserName(@Param("username")String username);

    @Query( value = "SELECT * FROM users f WHERE f.email  = :email", nativeQuery = true)
    Optional<User> findUserByEmail(@Param("email")String email);


    @Query (value = "SELECT COUNT(*) as count FROM users", nativeQuery = true)
    Integer getAllUsersCount();
}
