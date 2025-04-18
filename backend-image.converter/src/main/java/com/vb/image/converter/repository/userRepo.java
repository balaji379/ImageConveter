package com.vb.image.converter.repository;

import com.vb.image.converter.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface userRepo extends JpaRepository<User, Long> {
    public Optional<User> findByusername(String userName);
    public boolean existsByusername(String username);
}
