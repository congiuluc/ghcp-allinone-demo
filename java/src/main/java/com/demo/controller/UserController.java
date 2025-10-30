package com.demo.controller;

import com.demo.model.User;
import com.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.Map;

/**
 * REST Controller for User management.
 * Demonstrates Copilot generating REST endpoints and CRUD operations.
 */
@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = "${allowed.origins:http://localhost:3000,http://localhost:5173}", maxAge = 3600)
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * GET all users
     * @return List of all users
     */
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    /**
     * GET user by ID
     * @param id User ID
     * @return User if found, 404 otherwise
     */
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * POST - Create new user
     * @param user User data
     * @return Created user with 201 status
     */
    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        User createdUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    /**
     * PUT - Update user
     * @param id User ID
     * @param user Updated user data
     * @return Updated user or 404
     */
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @Valid @RequestBody User user) {
        Optional<User> updatedUser = userService.updateUser(id, user);
        return updatedUser.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * DELETE user
     * @param id User ID
     * @return 204 if deleted, 404 if not found
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userService.deleteUser(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * GET users by department
     * @param department Department name
     * @return List of users in department
     */
    @GetMapping("/department/{department}")
    public ResponseEntity<List<User>> getUsersByDepartment(@PathVariable String department) {
        List<User> users = userService.getUsersByDepartment(department);
        return ResponseEntity.ok(users);
    }

    /**
     * GET active users
     * @return List of active users
     */
    @GetMapping("/filter/active")
    public ResponseEntity<List<User>> getActiveUsers() {
        List<User> activeUsers = userService.getActiveUsers();
        return ResponseEntity.ok(activeUsers);
    }

    // DEMO 1: Type the implementation
    // Hint: Start with: List<User> users = userService.getActiveUsersByDepartment(department);
    @GetMapping("/filter/active/{department}")
    public ResponseEntity<List<User>> getActiveUsersByDepartment(@PathVariable String department) {
        // TODO: DEMO - Type the implementation
        return ResponseEntity.ok(List.of());
    }

    // DEMO 2: Type the implementation
    // Hint: Start with: List<User> users = userService.searchUsers(query, department);
    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUsers(
            @RequestParam String query,
            @RequestParam(required = false) String department) {
        // TODO: DEMO - Type the implementation
        return ResponseEntity.ok(List.of());
    }

    // DEMO 3: Type the implementation
    // Hint: Start with: return ResponseEntity.ok(userService.getDepartmentStatistics());
    @GetMapping("/statistics/count-by-department")
    public ResponseEntity<?> countByDepartment() {
        // TODO: DEMO - Type the implementation
        return ResponseEntity.ok(Map.of());
    }
}
