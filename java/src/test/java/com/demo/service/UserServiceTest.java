package com.demo.service;

import com.demo.model.User;
import com.demo.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

/**
 * Unit tests for UserService
 * Tests CRUD operations and business logic for User management
 */
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private User testUser1;
    private User testUser2;
    private User testUser3;

    @BeforeEach
    void setUp() {
        testUser1 = new User(1L, "John Doe", "john@example.com", "Engineering", true);
        testUser2 = new User(2L, "Jane Smith", "jane@example.com", "Marketing", true);
        testUser3 = new User(3L, "Bob Johnson", "bob@example.com", "Engineering", false);
    }

    @Test
    void getAllUsers_ShouldReturnAllUsers() {
        // Arrange
        List<User> users = Arrays.asList(testUser1, testUser2, testUser3);
        when(userRepository.findAll()).thenReturn(users);

        // Act
        List<User> result = userService.getAllUsers();

        // Assert
        assertNotNull(result);
        assertEquals(3, result.size());
        verify(userRepository, times(1)).findAll();
    }

    @Test
    void getAllUsers_ShouldReturnEmptyListWhenNoUsers() {
        // Arrange
        when(userRepository.findAll()).thenReturn(Collections.emptyList());

        // Act
        List<User> result = userService.getAllUsers();

        // Assert
        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(userRepository, times(1)).findAll();
    }

    @Test
    void getUserById_ShouldReturnUserWhenExists() {
        // Arrange
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser1));

        // Act
        Optional<User> result = userService.getUserById(1L);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("John Doe", result.get().getName());
        verify(userRepository, times(1)).findById(1L);
    }

    @Test
    void getUserById_ShouldReturnEmptyWhenNotExists() {
        // Arrange
        when(userRepository.findById(999L)).thenReturn(Optional.empty());

        // Act
        Optional<User> result = userService.getUserById(999L);

        // Assert
        assertFalse(result.isPresent());
        verify(userRepository, times(1)).findById(999L);
    }

    @Test
    void createUser_ShouldSetActiveAndSaveUser() {
        // Arrange
        User newUser = new User(null, "New User", "new@example.com", "Sales", null);
        User savedUser = new User(4L, "New User", "new@example.com", "Sales", true);
        when(userRepository.save(any(User.class))).thenReturn(savedUser);

        // Act
        User result = userService.createUser(newUser);

        // Assert
        assertNotNull(result);
        assertEquals(4L, result.getId());
        assertTrue(result.getIsActive());
        verify(userRepository, times(1)).save(newUser);
    }

    @Test
    void updateUser_ShouldUpdateExistingUser() {
        // Arrange
        User updateData = new User(null, "John Updated", "john.updated@example.com", "Sales", false);
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser1));
        when(userRepository.save(any(User.class))).thenReturn(testUser1);

        // Act
        Optional<User> result = userService.updateUser(1L, updateData);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("John Updated", result.get().getName());
        assertEquals("john.updated@example.com", result.get().getEmail());
        assertEquals("Sales", result.get().getDepartment());
        assertEquals(false, result.get().getIsActive());
        verify(userRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void updateUser_ShouldReturnEmptyWhenUserNotExists() {
        // Arrange
        User updateData = new User(null, "Updated", "updated@example.com", "IT", true);
        when(userRepository.findById(999L)).thenReturn(Optional.empty());

        // Act
        Optional<User> result = userService.updateUser(999L, updateData);

        // Assert
        assertFalse(result.isPresent());
        verify(userRepository, times(1)).findById(999L);
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void deleteUser_ShouldReturnTrueWhenUserExists() {
        // Arrange
        when(userRepository.existsById(1L)).thenReturn(true);

        // Act
        boolean result = userService.deleteUser(1L);

        // Assert
        assertTrue(result);
        verify(userRepository, times(1)).existsById(1L);
        verify(userRepository, times(1)).deleteById(1L);
    }

    @Test
    void deleteUser_ShouldReturnFalseWhenUserNotExists() {
        // Arrange
        when(userRepository.existsById(999L)).thenReturn(false);

        // Act
        boolean result = userService.deleteUser(999L);

        // Assert
        assertFalse(result);
        verify(userRepository, times(1)).existsById(999L);
        verify(userRepository, never()).deleteById(anyLong());
    }

    @Test
    void getUsersByDepartment_ShouldReturnUsersInDepartment() {
        // Arrange
        List<User> engineeringUsers = Arrays.asList(testUser1, testUser3);
        when(userRepository.findByDepartment("Engineering")).thenReturn(engineeringUsers);

        // Act
        List<User> result = userService.getUsersByDepartment("Engineering");

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        assertTrue(result.stream().allMatch(u -> u.getDepartment().equals("Engineering")));
        verify(userRepository, times(1)).findByDepartment("Engineering");
    }

    @Test
    void getUsersByDepartment_ShouldReturnEmptyListWhenNoDepartmentMatch() {
        // Arrange
        when(userRepository.findByDepartment("NonExistent")).thenReturn(Collections.emptyList());

        // Act
        List<User> result = userService.getUsersByDepartment("NonExistent");

        // Assert
        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(userRepository, times(1)).findByDepartment("NonExistent");
    }

    @Test
    void getActiveUsers_ShouldReturnOnlyActiveUsers() {
        // Arrange
        List<User> activeUsers = Arrays.asList(testUser1, testUser2);
        when(userRepository.findByIsActiveTrue()).thenReturn(activeUsers);

        // Act
        List<User> result = userService.getActiveUsers();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        assertTrue(result.stream().allMatch(User::getIsActive));
        verify(userRepository, times(1)).findByIsActiveTrue();
    }

    @Test
    void getActiveUsersByDepartment_ShouldReturnActiveUsersInDepartment() {
        // Arrange
        List<User> activeEngineers = Collections.singletonList(testUser1);
        when(userRepository.findByDepartmentAndIsActiveTrue("Engineering")).thenReturn(activeEngineers);

        // Act
        List<User> result = userService.getActiveUsersByDepartment("Engineering");

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("John Doe", result.get(0).getName());
        assertTrue(result.get(0).getIsActive());
        assertEquals("Engineering", result.get(0).getDepartment());
        verify(userRepository, times(1)).findByDepartmentAndIsActiveTrue("Engineering");
    }

    @Test
    void searchUsers_ShouldReturnMatchingUsers() {
        // Arrange
        List<User> allUsers = Arrays.asList(testUser1, testUser2, testUser3);
        when(userRepository.findAll()).thenReturn(allUsers);

        // Act
        List<User> result = userService.searchUsers("john", "Engineering");

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size()); // John Doe and Bob Johnson both match
        assertTrue(result.stream().anyMatch(u -> u.getName().equals("John Doe")));
        assertTrue(result.stream().anyMatch(u -> u.getName().equals("Bob Johnson")));
    }

    @Test
    void searchUsers_ShouldReturnEmptyWhenNoMatch() {
        // Arrange
        List<User> allUsers = Arrays.asList(testUser1, testUser2, testUser3);
        when(userRepository.findAll()).thenReturn(allUsers);

        // Act
        List<User> result = userService.searchUsers("xyz", "Engineering");

        // Assert
        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    void searchUsers_ShouldBeCaseInsensitive() {
        // Arrange
        List<User> allUsers = Arrays.asList(testUser1, testUser2, testUser3);
        when(userRepository.findAll()).thenReturn(allUsers);

        // Act
        List<User> result = userService.searchUsers("JOHN", "engineering");

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size()); // John Doe and Bob Johnson both match
        assertTrue(result.stream().anyMatch(u -> u.getName().equals("John Doe")));
        assertTrue(result.stream().anyMatch(u -> u.getName().equals("Bob Johnson")));
    }

    @Test
    void getDepartmentStatistics_ShouldReturnCorrectCounts() {
        // Arrange
        List<User> allUsers = Arrays.asList(testUser1, testUser2, testUser3);
        when(userRepository.findAll()).thenReturn(allUsers);

        // Act
        Map<String, Long> result = userService.getDepartmentStatistics();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(2L, result.get("Engineering"));
        assertEquals(1L, result.get("Marketing"));
    }

    @Test
    void getDepartmentStatistics_ShouldReturnEmptyMapWhenNoUsers() {
        // Arrange
        when(userRepository.findAll()).thenReturn(Collections.emptyList());

        // Act
        Map<String, Long> result = userService.getDepartmentStatistics();

        // Assert
        assertNotNull(result);
        assertTrue(result.isEmpty());
    }
}
