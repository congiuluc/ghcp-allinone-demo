package com.demo.service;

import com.demo.model.User;
import com.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service class for User business logic.
 * Demonstrates Copilot generating service layer methods.
 */
@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Retrieve all users
     * @return List of all users
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Retrieve user by ID
     * @param id User ID
     * @return Optional containing user if found
     */
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    /**
     * Create a new user
     * @param user User to create
     * @return Created user
     */
    public User createUser(User user) {
        user.setIsActive(true);
        return userRepository.save(user);
    }

    /**
     * Update existing user
     * @param id User ID
     * @param user Updated user data
     * @return Updated user
     */
    public Optional<User> updateUser(Long id, User user) {
        return userRepository.findById(id).map(existingUser -> {
            existingUser.setName(user.getName());
            existingUser.setEmail(user.getEmail());
            existingUser.setDepartment(user.getDepartment());
            existingUser.setIsActive(user.getIsActive());
            return userRepository.save(existingUser);
        });
    }

    /**
     * Delete user by ID
     * @param id User ID
     * @return true if deleted, false if not found
     */
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    /**
     * Find users by department
     * @param department Department name
     * @return List of users in department
     */
    public List<User> getUsersByDepartment(String department) {
        return userRepository.findByDepartment(department);
    }

    /**
     * Find all active users
     * @return List of active users
     */
    public List<User> getActiveUsers() {
        return userRepository.findByIsActiveTrue();
    }

    /**
     * DEMO 1: Type the implementation
     * Hint: Start typing: return userRepository.find
     * Watch Copilot suggest the rest
     */
    public List<User> getActiveUsersByDepartment(String department) {
        // TODO: DEMO - Type the implementation
    }

    /**
     * DEMO 2: Type the implementation
     * Hint: Start with return getAllUsers().stream().filter(
     * Watch Copilot suggest the method chain
     */
    public List<User> searchUsers(String searchTerm, String department) {
        // TODO: DEMO - Type the implementation
    }

    /**
     * DEMO 3: Type the implementation
     * Hint: Start with return getAllUsers().stream().collect(Collectors.groupingBy(
     * Watch Copilot suggest the grouping and counting
     */
    public java.util.Map<String, Long> getDepartmentStatistics() {
        // TODO: DEMO - Type the implementation
    }
}
