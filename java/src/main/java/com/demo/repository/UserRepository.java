package com.demo.repository;

import com.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for User entity.
 * Demonstrates Copilot's code suggestion for common repository methods.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    List<User> findByDepartment(String department);

    List<User> findByIsActiveTrue();

    @Query("SELECT u FROM User u WHERE u.department = :department AND u.isActive = true")
    List<User> findActiveUsersByDepartment(@Param("department") String department);

    List<User> findByDepartmentAndIsActiveTrue(String department);
}
