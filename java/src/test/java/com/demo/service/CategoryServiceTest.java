package com.demo.service;

import com.demo.model.Category;
import com.demo.repository.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

/**
 * Unit tests for CategoryService
 * Tests CRUD operations and search functionality for categories
 */
@ExtendWith(MockitoExtension.class)
class CategoryServiceTest {

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CategoryService categoryService;

    private Category testCategory1;
    private Category testCategory2;
    private Category testCategory3;

    @BeforeEach
    void setUp() {
        testCategory1 = new Category(1, "Electronics", "Electronic devices", true);
        testCategory2 = new Category(2, "Books", "Reading materials", true);
        testCategory3 = new Category(3, "Inactive Category", "Old category", false);
    }

    @Test
    void getAllCategories_ShouldReturnAllCategories() {
        // Arrange
        List<Category> categories = Arrays.asList(testCategory1, testCategory2, testCategory3);
        when(categoryRepository.findAll()).thenReturn(categories);

        // Act
        List<Category> result = categoryService.getAllCategories();

        // Assert
        assertNotNull(result);
        assertEquals(3, result.size());
        verify(categoryRepository, times(1)).findAll();
    }

    @Test
    void getAllCategories_ShouldReturnEmptyListWhenNoCategories() {
        // Arrange
        when(categoryRepository.findAll()).thenReturn(Collections.emptyList());

        // Act
        List<Category> result = categoryService.getAllCategories();

        // Assert
        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(categoryRepository, times(1)).findAll();
    }

    @Test
    void getCategoryById_ShouldReturnCategoryWhenExists() {
        // Arrange
        when(categoryRepository.findById(1)).thenReturn(Optional.of(testCategory1));

        // Act
        Optional<Category> result = categoryService.getCategoryById(1);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("Electronics", result.get().getName());
        verify(categoryRepository, times(1)).findById(1);
    }

    @Test
    void getCategoryById_ShouldReturnEmptyWhenNotExists() {
        // Arrange
        when(categoryRepository.findById(999)).thenReturn(Optional.empty());

        // Act
        Optional<Category> result = categoryService.getCategoryById(999);

        // Assert
        assertFalse(result.isPresent());
        verify(categoryRepository, times(1)).findById(999);
    }

    @Test
    void createCategory_ShouldSaveAndReturnCategory() {
        // Arrange
        Category newCategory = new Category(0, "Furniture", "Home furniture", true);
        Category savedCategory = new Category(4, "Furniture", "Home furniture", true);
        when(categoryRepository.save(any(Category.class))).thenReturn(savedCategory);

        // Act
        Category result = categoryService.createCategory(newCategory);

        // Assert
        assertNotNull(result);
        assertEquals(4, result.getId());
        assertEquals("Furniture", result.getName());
        verify(categoryRepository, times(1)).save(newCategory);
    }

    @Test
    void updateCategory_ShouldUpdateExistingCategory() {
        // Arrange
        Category updateData = new Category(0, "Electronics Updated", "Updated description", false);
        when(categoryRepository.findById(1)).thenReturn(Optional.of(testCategory1));
        when(categoryRepository.save(any(Category.class))).thenReturn(testCategory1);

        // Act
        Optional<Category> result = categoryService.updateCategory(1, updateData);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("Electronics Updated", result.get().getName());
        assertEquals("Updated description", result.get().getDescription());
        assertFalse(result.get().isActive());
        verify(categoryRepository, times(1)).findById(1);
        verify(categoryRepository, times(1)).save(any(Category.class));
    }

    @Test
    void updateCategory_ShouldReturnEmptyWhenCategoryNotExists() {
        // Arrange
        Category updateData = new Category(0, "Updated", "Updated desc", true);
        when(categoryRepository.findById(999)).thenReturn(Optional.empty());

        // Act
        Optional<Category> result = categoryService.updateCategory(999, updateData);

        // Assert
        assertFalse(result.isPresent());
        verify(categoryRepository, times(1)).findById(999);
        verify(categoryRepository, never()).save(any(Category.class));
    }

    @Test
    void deleteCategory_ShouldReturnTrueWhenCategoryExists() {
        // Arrange
        when(categoryRepository.existsById(1)).thenReturn(true);

        // Act
        boolean result = categoryService.deleteCategory(1);

        // Assert
        assertTrue(result);
        verify(categoryRepository, times(1)).existsById(1);
        verify(categoryRepository, times(1)).deleteById(1);
    }

    @Test
    void deleteCategory_ShouldReturnFalseWhenCategoryNotExists() {
        // Arrange
        when(categoryRepository.existsById(999)).thenReturn(false);

        // Act
        boolean result = categoryService.deleteCategory(999);

        // Assert
        assertFalse(result);
        verify(categoryRepository, times(1)).existsById(999);
        verify(categoryRepository, never()).deleteById(anyInt());
    }

    @Test
    void searchCategories_ShouldReturnMatchingCategories() {
        // Arrange
        List<Category> matchingCategories = Collections.singletonList(testCategory1);
        when(categoryRepository.searchByName("Electron")).thenReturn(matchingCategories);

        // Act
        List<Category> result = categoryService.searchCategories("Electron");

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Electronics", result.get(0).getName());
        verify(categoryRepository, times(1)).searchByName("Electron");
    }

    @Test
    void searchCategories_ShouldReturnEmptyListWhenNoMatch() {
        // Arrange
        when(categoryRepository.searchByName("xyz")).thenReturn(Collections.emptyList());

        // Act
        List<Category> result = categoryService.searchCategories("xyz");

        // Assert
        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(categoryRepository, times(1)).searchByName("xyz");
    }

    @Test
    void getActiveCategories_ShouldReturnOnlyActiveCategories() {
        // Arrange
        List<Category> activeCategories = Arrays.asList(testCategory1, testCategory2);
        when(categoryRepository.findByIsActiveTrue()).thenReturn(activeCategories);

        // Act
        List<Category> result = categoryService.getActiveCategories();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        assertTrue(result.stream().allMatch(Category::isActive));
        verify(categoryRepository, times(1)).findByIsActiveTrue();
    }

    @Test
    void getActiveCategories_ShouldReturnEmptyListWhenNoActiveCategories() {
        // Arrange
        when(categoryRepository.findByIsActiveTrue()).thenReturn(Collections.emptyList());

        // Act
        List<Category> result = categoryService.getActiveCategories();

        // Assert
        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(categoryRepository, times(1)).findByIsActiveTrue();
    }
}
