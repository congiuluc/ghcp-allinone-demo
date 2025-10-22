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

/**
 * REST Controller for User management.
 * Demonstrates Copilot generating REST endpoints and CRUD operations.
 */
@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = "*", maxAge = 3600)
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

    /**
     * DEMO Step 1: Generate endpoint for active users by department
     * 
     * Instructions for Copilot:
     * "Generate a REST endpoint that filters active users by their department.
     * The endpoint should:
     * - Accept department name as URL parameter
     * - Return list of active users in that department
     * - Use the userService.getActiveUsersByDepartment method
     * - Return 200 OK with list"
     * 
     * Expected: A @GetMapping endpoint calling userService.getActiveUsersByDepartment
     */
    @GetMapping("/filter/active/{department}")
    public ResponseEntity<List<User>> getActiveUsersByDepartment(@PathVariable String department) {
        // TODO: Let Copilot suggest the implementation
        throw new UnsupportedOperationException("TODO: Implement with Copilot suggestion");
    }

    /**
     * DEMO Step 2: Generate endpoint to search users by criteria
     * 
     * Instructions for Copilot:
     * "Generate a REST endpoint called search that:
     * - Accepts query parameter 'query' for search term
     * - Accepts optional query parameter 'department'
     * - Searches users by name, email, or department
     * - Returns 200 OK with matching users
     * - Returns empty list if no matches"
     */
    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUsers(
            @RequestParam String query,
            @RequestParam(required = false) String department) {
        // TODO: Let Copilot suggest the implementation
        throw new UnsupportedOperationException("TODO: Implement with Copilot suggestion");
    }

    /**
     * DEMO Step 3: Generate endpoint to get user count by department
     * 
     * Instructions for Copilot:
     * "Generate a REST endpoint called count-by-department that:
     * - Returns a map of department names to user counts
     * - Only includes active users
     * - Orders by department name alphabetically"
     */
    @GetMapping("/statistics/count-by-department")
    public ResponseEntity<?> countByDepartment() {
        // TODO: Let Copilot suggest the implementation
        throw new UnsupportedOperationException("TODO: Implement with Copilot suggestion");
    }
}
