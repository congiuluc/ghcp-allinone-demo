package com.demo.service;

import com.demo.model.User;
import com.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * DEMO Service - For GitHub Copilot Code Suggestions Demonstration
 * 
 * This service demonstrates Copilot code completions:
 * 1. Type method name and signature
 * 2. Copilot suggests implementation (grey text)
 * 3. Press Tab to accept
 * 4. Press Ctrl+K for "Next Edit" suggestions
 * 
 * Demo Methods Below - DELETE implementation to see Copilot suggest
 */
@Service
@Transactional
public class UserServiceDemo {

    @Autowired
    private UserRepository userRepository;

    /**
     * DEMO 1: Stream API filtering
     * 
     * Try typing: return getAllUsers().stream().filter(
     */
    public List<User> getActiveUsers() {
        // DEMO TODO: Delete implementation and type above
        return getAllUsers().stream().filter(u -> u.getIsActive()).collect(java.util.stream.Collectors.toList());
    }

    /**
     * DEMO 2: Multiple filter conditions
     * 
     * Try typing: return getAllUsers().stream().filter(u ->
     */
    public List<User> getActiveUsersByDepartment(String department) {
        // DEMO TODO: Delete implementation and type above
        return getAllUsers().stream()
            .filter(u -> u.getIsActive())
            .filter(u -> u.getDepartment().equals(department))
            .collect(java.util.stream.Collectors.toList());
    }

    /**
     * DEMO 3: Map transformation
     * 
     * Try typing: return getAllUsers().stream().map(
     */
    public List<String> getUserNames() {
        // DEMO TODO: Delete implementation and type above
        return getAllUsers().stream().map(u -> u.getName()).collect(java.util.stream.Collectors.toList());
    }

    /**
     * DEMO 4: Collectors.groupingBy
     * 
     * Try typing: return getAllUsers().stream().collect(Collectors.groupingBy(
     */
    public java.util.Map<String, Long> getDepartmentStatistics() {
        // DEMO TODO: Delete implementation and type above
        return getAllUsers().stream()
            .collect(java.util.stream.Collectors.groupingBy(
                User::getDepartment,
                java.util.stream.Collectors.counting()
            ));
    }

    private List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
